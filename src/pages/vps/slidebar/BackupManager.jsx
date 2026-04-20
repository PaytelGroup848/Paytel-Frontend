import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, 
  RotateCcw, 
  Download, 
  Plus, 
  Search, 
  Database, 
  ShieldCheck, 
  Clock, 
  MoreVertical,
  Calendar,
  AlertCircle,
  HardDrive
} from 'lucide-react';

const BackupManager = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data: Backups
  const backups = [
    { id: 'BK-9921', date: 'Oct 24, 2026', time: '02:15 AM', size: '12.4 GB', type: 'Automated', status: 'Healthy', version: 'v2.4.1' },
    { id: 'BK-9855', date: 'Oct 23, 2026', time: '02:10 AM', size: '12.1 GB', type: 'Snapshot', status: 'Healthy', version: 'v2.4.0' },
    { id: 'BK-9712', date: 'Oct 20, 2026', time: '11:45 PM', size: '11.8 GB', type: 'Manual', status: 'Archived', version: 'v2.3.9' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <History className="text-indigo-600" size={32} /> Backup Manager
          </h1>
          <p className="text-slate-500 mt-1">Manage your VPS snapshots and automated recovery points.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 active:scale-95">
          <Plus size={18} /> Create Manual Backup
        </button>
      </div>

      {/* Info Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Auto-Backup', val: 'Enabled', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Retention Period', val: '30 Days', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Storage Used', val: '36.3 GB / 100 GB', icon: Database, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        ].map((stat, i) => (
          <div key={i} className="flex items-center gap-4 p-5 bg-white border border-slate-200/60 rounded-2xl shadow-sm">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-lg font-extrabold text-slate-800">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by backup ID or date..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 text-slate-500 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all">
              <Calendar size={18} />
            </button>
            <button className="p-2.5 text-slate-500 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Backups Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50">
                <th className="px-8 py-4">Backup ID</th>
                <th className="px-6 py-4">Creation Date</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {backups.map((bk) => (
                <motion.tr 
                  key={bk.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-[10px]">
                        ID
                      </div>
                      <span className="font-bold text-slate-700 text-sm">{bk.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-semibold text-slate-700">{bk.date}</p>
                    <p className="text-xs text-slate-400">{bk.time}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      bk.type === 'Automated' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                      bk.type === 'Snapshot' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                      'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {bk.type}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-mono text-sm text-slate-600">{bk.size}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-600 rounded-lg text-xs font-bold transition-all active:scale-95 shadow-sm">
                        <Download size={14} /> Download
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-xs font-bold transition-all active:scale-95 shadow-md shadow-indigo-100">
                        <RotateCcw size={14} /> Restore
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Warning Footer */}
        <div className="p-6 bg-amber-50 border-t border-amber-100 flex items-start gap-4">
          <AlertCircle className="text-amber-600 shrink-0" size={20} />
          <div>
            <h4 className="text-sm font-bold text-amber-900">Important Note</h4>
            <p className="text-xs text-amber-700 mt-1 leading-relaxed">
              Restoring a backup will overwrite all current data on your VPS. We recommend taking a <strong>Manual Snapshot</strong> before performing a restore. Backups older than 30 days are automatically purged.
            </p>
          </div>
        </div>
      </div>

      {/* Additional Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="p-8 rounded-[2rem] bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <HardDrive size={120} />
          </div>
          <h3 className="text-xl font-bold mb-4">Off-site Storage</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            All CloudeData backups are stored in a physically separate data center. Even in the event of a primary infrastructure failure, your data remains safe.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-indigo-500 flex items-center justify-center text-[10px] font-bold">DC{i}</div>)}
            </div>
            <span className="text-xs font-bold text-emerald-400">Triple Replication Active</span>
          </div>
        </div>

        <div className="p-8 rounded-[2rem] bg-white border border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Schedule Backups</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Customize when your server takes automated snapshots. High-frequency backups are available for Enterprise plans.
            </p>
          </div>
          <div className="mt-8 flex items-center justify-between">
             <div className="flex flex-col">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Next Scheduled</span>
               <span className="text-sm font-bold text-slate-800">Tonight, 02:00 AM</span>
             </div>
             <button className="text-indigo-600 text-sm font-bold hover:underline">Change Schedule →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupManager;