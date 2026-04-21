import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, RotateCcw, Download, Plus, Search, Database, 
  ShieldCheck, Clock, MoreVertical, Calendar, AlertCircle,
  HardDrive, Trash2, X, Filter, ChevronLeft, ChevronRight,
  Loader2, CheckCircle, Server, Activity, Zap
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

// ---------- Mock Data & Helpers ----------
const generateMockBackups = (count = 12) => {
  const types = ['Automated', 'Snapshot', 'Manual'];
  const statuses = ['Healthy', 'Archived', 'Verifying'];
  const dates = [];
  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i * 2);
    dates.push(date);
  }
  return dates.map((date, idx) => ({
    id: `BK-${(9000 + idx).toString()}`,
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    timestamp: date.getTime(),
    size: `${(10 + Math.random() * 15).toFixed(1)} GB`,
    type: types[idx % types.length],
    status: statuses[idx % statuses.length],
    version: `v${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 5)}.${Math.floor(Math.random() * 10)}`,
  }));
};

// Simulated API functions
const api = {
  fetchBackups: () => new Promise(resolve => {
    setTimeout(() => resolve(generateMockBackups(12)), 800);
  }),
  createBackup: (data) => new Promise(resolve => {
    setTimeout(() => {
      const newBackup = {
        id: `BK-${Math.floor(Math.random() * 9000 + 1000)}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        timestamp: Date.now(),
        size: `${(8 + Math.random() * 10).toFixed(1)} GB`,
        type: data.type,
        status: 'Healthy',
        version: 'v2.5.0',
      };
      resolve(newBackup);
    }, 1500);
  }),
  restoreBackup: (id) => new Promise(resolve => setTimeout(resolve, 2000)),
  deleteBackup: (id) => new Promise(resolve => setTimeout(resolve, 1000)),
};

// ---------- Toast Context (simple) ----------
const Toast = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl border ${
      type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
    }`}
  >
    {type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
    <span className="text-sm font-medium">{message}</span>
    <button onClick={onClose} className="ml-4 opacity-60 hover:opacity-100">
      <X size={16} />
    </button>
  </motion.div>
);

// ---------- Main Component ----------
const BackupManager = () => {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date_desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [restoreTarget, setRestoreTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [createType, setCreateType] = useState('Manual');

  // Load backups
  useEffect(() => {
    api.fetchBackups().then(data => {
      setBackups(data);
      setLoading(false);
    });
  }, []);

  // Filtering & Sorting
  const filteredBackups = useMemo(() => {
    let filtered = backups.filter(bk => {
      const matchesSearch = bk.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            bk.date.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || bk.type.toLowerCase() === typeFilter.toLowerCase();
      return matchesSearch && matchesType;
    });

    // Sort
    switch (sortBy) {
      case 'date_asc': filtered.sort((a,b) => a.timestamp - b.timestamp); break;
      case 'date_desc': filtered.sort((a,b) => b.timestamp - a.timestamp); break;
      case 'size_asc': filtered.sort((a,b) => parseFloat(a.size) - parseFloat(b.size)); break;
      case 'size_desc': filtered.sort((a,b) => parseFloat(b.size) - parseFloat(a.size)); break;
      default: break;
    }
    return filtered;
  }, [backups, searchTerm, typeFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredBackups.length / pageSize);
  const paginatedBackups = filteredBackups.slice((currentPage-1)*pageSize, currentPage*pageSize);

  // Handlers
  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleCreateBackup = async () => {
    setActionLoading(true);
    try {
      const newBackup = await api.createBackup({ type: createType });
      setBackups(prev => [newBackup, ...prev]);
      showToast(`Backup ${newBackup.id} created successfully`, 'success');
      setShowCreateModal(false);
    } catch (err) {
      showToast('Failed to create backup', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRestore = async () => {
    setActionLoading(true);
    try {
      await api.restoreBackup(restoreTarget.id);
      showToast(`Restore of ${restoreTarget.id} started`, 'success');
      setRestoreTarget(null);
    } catch (err) {
      showToast('Restore failed', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    setActionLoading(true);
    try {
      await api.deleteBackup(deleteTarget.id);
      setBackups(prev => prev.filter(b => b.id !== deleteTarget.id));
      showToast(`Backup ${deleteTarget.id} deleted`, 'success');
      setDeleteTarget(null);
      if (paginatedBackups.length === 1 && currentPage > 1) setCurrentPage(prev => prev-1);
    } catch (err) {
      showToast('Delete failed', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Chart data for storage usage (mock)
  const chartData = [
    { name: 'Week 1', usage: 28 }, { name: 'Week 2', usage: 32 },
    { name: 'Week 3', usage: 36 }, { name: 'Week 4', usage: 36.3 },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <History className="text-indigo-600" size={32} /> Backup Manager
          </h1>
          <p className="text-slate-500 mt-1">Manage your VPS snapshots and automated recovery points.</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 active:scale-95"
        >
          <Plus size={18} /> Create Manual Backup
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={ShieldCheck} label="Auto-Backup" value="Enabled" color="emerald" />
        <StatCard icon={Clock} label="Retention Period" value="30 Days" color="blue" />
        <StatCard icon={Database} label="Storage Used" value="36.3 GB / 100 GB" color="indigo" />
        <StatCard icon={Activity} label="Success Rate" value="99.97%" color="purple" />
      </div>

      {/* Storage Usage Chart */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-800">Storage Consumption Trend</h3>
          <span className="text-xs text-slate-400">Last 4 weeks</span>
        </div>
        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '12px' }} />
              <Area type="monotone" dataKey="usage" stroke="#4F46E5" strokeWidth={2} fill="#EEF2FF" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-1 gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[180px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search by ID or date..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium"
            >
              <option value="all">All Types</option>
              <option value="automated">Automated</option>
              <option value="snapshot">Snapshot</option>
              <option value="manual">Manual</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium"
            >
              <option value="date_desc">Newest First</option>
              <option value="date_asc">Oldest First</option>
              <option value="size_desc">Largest Size</option>
              <option value="size_asc">Smallest Size</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 text-slate-500 hover:bg-white rounded-lg border border-transparent hover:border-slate-200">
              <Calendar size={18} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50">
                <th className="px-6 py-4">Backup ID</th>
                <th className="px-6 py-4">Creation Date</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
              ) : paginatedBackups.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-16 text-slate-400">
                    <Database className="mx-auto mb-3 opacity-40" size={48} />
                    No backups found
                  </td>
                </tr>
              ) : (
                paginatedBackups.map((bk, idx) => (
                  <motion.tr
                    key={bk.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="hover:bg-slate-50/80 group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-[10px]">ID</div>
                        <span className="font-bold text-slate-700 text-sm">{bk.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-700">{bk.date}</p>
                      <p className="text-xs text-slate-400">{bk.time}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                        bk.type === 'Automated' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        bk.type === 'Snapshot' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {bk.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-slate-600">{bk.size}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                        bk.status === 'Healthy' ? 'text-emerald-600' : bk.status === 'Archived' ? 'text-slate-500' : 'text-amber-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          bk.status === 'Healthy' ? 'bg-emerald-500' : bk.status === 'Archived' ? 'bg-slate-400' : 'bg-amber-500'
                        }`} />
                        {bk.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => window.open('#', '_blank')}
                          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                          title="Download"
                        >
                          <Download size={16} />
                        </button>
                        <button
                          onClick={() => setRestoreTarget(bk)}
                          className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                          title="Restore"
                        >
                          <RotateCcw size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(bk)}
                          className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && filteredBackups.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3 bg-white">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Rows per page:</span>
              <select
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                className="border border-slate-200 rounded-lg px-2 py-1 text-sm"
              >
                {[5, 10, 20].map(size => <option key={size}>{size}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p-1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm text-slate-600">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Important Note Footer */}
        <div className="p-5 bg-amber-50 border-t border-amber-100 flex items-start gap-3">
          <AlertCircle className="text-amber-600 shrink-0" size={18} />
          <div>
            <h4 className="text-sm font-bold text-amber-900">Important Note</h4>
            <p className="text-xs text-amber-700 mt-0.5">
              Restoring a backup will overwrite all current data. We recommend taking a <strong>Manual Snapshot</strong> before restoring. Backups older than 30 days are automatically purged.
            </p>
          </div>
        </div>
      </div>

      {/* Off-site & Schedule Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 text-white relative overflow-hidden">
          <HardDrive className="absolute right-4 bottom-4 opacity-10" size={100} />
          <h3 className="text-lg font-bold mb-2">Off-site Storage</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            All backups are stored in a geographically separate data center. Triple replication ensures durability.
          </p>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {['DC1', 'DC2', 'DC3'].map((dc, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">{dc}</div>
              ))}
            </div>
            <span className="text-xs font-semibold text-emerald-400">Active Replication</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Schedule Backups</h3>
          <p className="text-slate-500 text-sm mb-4">Customize automated backup frequency.</p>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide">Next scheduled</p>
              <p className="font-mono text-sm font-bold text-slate-700">Tonight, 02:00 AM</p>
            </div>
            <button className="text-indigo-600 text-sm font-bold hover:underline">Change →</button>
          </div>
        </div>
      </div>

      {/* ---------- MODALS ---------- */}
      <AnimatePresence>
        {showCreateModal && (
          <Modal onClose={() => setShowCreateModal(false)} title="Create New Backup">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Backup Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" value="Manual" checked={createType === 'Manual'} onChange={() => setCreateType('Manual')} /> Manual
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" value="Snapshot" checked={createType === 'Snapshot'} onChange={() => setCreateType('Snapshot')} /> Snapshot
                  </label>
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl text-sm text-slate-600">
                ⚡ A manual backup will capture the current state of your VPS. Snapshots are faster but use incremental storage.
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm">Cancel</button>
                <button onClick={handleCreateBackup} disabled={actionLoading} className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold flex items-center gap-2">
                  {actionLoading ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
                  Create Backup
                </button>
              </div>
            </div>
          </Modal>
        )}

        {restoreTarget && (
          <Modal onClose={() => setRestoreTarget(null)} title="Confirm Restore">
            <div className="space-y-4">
              <p className="text-slate-600">You are about to restore backup <strong>{restoreTarget.id}</strong> from {restoreTarget.date}. This will overwrite all current data.</p>
              <div className="flex justify-end gap-3">
                <button onClick={() => setRestoreTarget(null)} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button onClick={handleRestore} disabled={actionLoading} className="px-5 py-2 bg-amber-600 text-white rounded-lg flex items-center gap-2">
                  {actionLoading ? <Loader2 className="animate-spin" size={16} /> : <RotateCcw size={16} />}
                  Restore
                </button>
              </div>
            </div>
          </Modal>
        )}

        {deleteTarget && (
          <Modal onClose={() => setDeleteTarget(null)} title="Delete Backup">
            <div className="space-y-4">
              <p className="text-slate-600">Permanently delete backup <strong>{deleteTarget.id}</strong>? This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button onClick={handleDelete} disabled={actionLoading} className="px-5 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2">
                  {actionLoading ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={16} />}
                  Delete
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
};

// ---------- Subcomponents ----------
const StatCard = ({ icon: Icon, label, value, color }) => {
  const colorClasses = {
    emerald: 'bg-emerald-50 text-emerald-600',
    blue: 'bg-blue-50 text-blue-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    purple: 'bg-purple-50 text-purple-600',
  };
  return (
    <div className="flex items-center gap-4 p-5 bg-white border border-slate-200/60 rounded-2xl shadow-sm">
      <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-lg font-extrabold text-slate-800">{value}</p>
      </div>
    </div>
  );
};

const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-4"><div className="h-4 w-24 bg-slate-200 rounded"></div></td>
    <td className="px-6 py-4"><div className="h-4 w-28 bg-slate-200 rounded"></div></td>
    <td className="px-6 py-4"><div className="h-6 w-20 bg-slate-200 rounded-full"></div></td>
    <td className="px-6 py-4"><div className="h-4 w-16 bg-slate-200 rounded"></div></td>
    <td className="px-6 py-4"><div className="h-4 w-20 bg-slate-200 rounded"></div></td>
    <td className="px-6 py-4"><div className="flex gap-2 justify-end"><div className="h-8 w-8 bg-slate-200 rounded"></div><div className="h-8 w-8 bg-slate-200 rounded"></div></div></td>
  </tr>
);

const Modal = ({ onClose, title, children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
      </div>
      {children}
    </motion.div>
  </motion.div>
);

export default BackupManager;