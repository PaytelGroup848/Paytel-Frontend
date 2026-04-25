import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Server,
  Activity,
  Calendar,
  Cpu,
  Layers,
  ExternalLink,
  Globe,
  Database,
  MoreVertical,
  Trash2,
  FolderOpen,
  X,
  Edit,
  CheckCircle,
  AlertCircle,
  Clock,
  HardDrive,
  Terminal,
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  Code
} from 'lucide-react';

// ============================================================
// Skeleton Loader (Row style)
// ============================================================
const SkeletonRow = () => (
  <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-5 animate-pulse">
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-slate-100 rounded-xl"></div>
        <div className="space-y-2">
          <div className="h-5 w-40 bg-slate-100 rounded-lg"></div>
          <div className="h-3 w-64 bg-slate-100 rounded-md"></div>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="h-8 w-24 bg-slate-100 rounded-lg"></div>
        <div className="h-8 w-28 bg-slate-100 rounded-lg"></div>
        <div className="h-8 w-8 bg-slate-100 rounded-lg"></div>
      </div>
    </div>
  </div>
);

// ============================================================
// Mock Data & Hook
// ============================================================
const MOCK_INSTANCES = [
  { id: "php_1", domain: "hyperphp.io", status: "active", planType: "Enterprise", createdAt: "2025-02-10T10:00:00Z", phpVersion: "8.3", visitors: 87400, database: "hyperphp_db", storage: "25GB" },
  { id: "php_2", domain: "fastapi-labs.com", status: "provisioning", planType: "Pro", createdAt: "2025-03-01T12:30:00Z", phpVersion: "8.2", visitors: 1200, database: null, storage: "10GB" },
  { id: "php_3", domain: "legacy-php.net", status: "failed", planType: "Starter", createdAt: "2025-02-18T09:15:00Z", phpVersion: "7.4", visitors: 439, database: "legacy_db", storage: "5GB" },
  { id: "php_4", domain: "cloud-php.dev", status: "active", planType: "Pro", createdAt: "2025-01-22T14:45:00Z", phpVersion: "8.2", visitors: 32600, database: "cloudphp_db", storage: "20GB" },
  { id: "php_5", domain: "resonance-app.com", status: "pending_dns", planType: "Starter", createdAt: "2025-03-12T08:00:00Z", phpVersion: "8.1", visitors: 0, database: null, storage: "5GB" },
  { id: "php_6", domain: "staticserve.com", status: "active", planType: "Enterprise", createdAt: "2025-02-28T16:20:00Z", phpVersion: "8.3", visitors: 125400, database: "staticserve_db", storage: "50GB" }
];

const usePhpInstances = (statusFilter) => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      let filtered = [...MOCK_INSTANCES];
      if (statusFilter && statusFilter !== '') {
        filtered = filtered.filter(inst => inst.status === statusFilter);
      }
      setItems(filtered);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [statusFilter]);

  return { data: { items }, isLoading, setItems };
};

// ============================================================
// Toast Component
// ============================================================
const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2800);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle size={16} className="text-emerald-400" />,
    error: <AlertCircle size={16} className="text-red-400" />,
    info: <Clock size={16} className="text-blue-400" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white/95 backdrop-blur-md text-slate-800 px-4 py-2.5 rounded-xl shadow-lg border border-slate-100 text-sm font-medium">
      {icons[type]}
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-slate-400 hover:text-slate-600"><X size={12} /></button>
    </div>
  );
};

// ============================================================
// Main Dashboard Component
// ============================================================
export default function PhpCloudDashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const { data, isLoading, setItems } = usePhpInstances(filter || undefined);
  const [instances, setInstances] = useState([]);
  const [toast, setToast] = useState(null);

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingInstance, setEditingInstance] = useState(null);
  const [databaseModal, setDatabaseModal] = useState({ open: false, instance: null });
  const [dropdownOpenId, setDropdownOpenId] = useState(null);

  const siteLimit = 10;

  useEffect(() => {
    if (data?.items) setInstances(data.items);
  }, [data]);

  const filteredInstances = useMemo(() => {
    return instances.filter(site => site.domain?.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, instances]);

  const showToast = (message, type = 'success') => setToast({ message, type });

  // CRUD
  const addInstance = (newInstance) => {
    if (instances.length >= siteLimit) {
      showToast(`Limit reached (${siteLimit}). Upgrade plan.`, 'error');
      return false;
    }
    const newInst = {
      ...newInstance,
      id: `php_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      createdAt: new Date().toISOString(),
      visitors: 0,
      database: null
    };
    const updated = [newInst, ...instances];
    setInstances(updated);
    setItems(updated);
    showToast(`Instance "${newInstance.domain}" created`, 'success');
    return true;
  };

  const updateInstance = (id, updatedData) => {
    const updated = instances.map(inst => inst.id === id ? { ...inst, ...updatedData } : inst);
    setInstances(updated);
    setItems(updated);
    showToast(`Instance updated`, 'success');
  };

  const deleteInstance = (id) => {
    if (window.confirm('Delete this PHP environment permanently? All data will be lost.')) {
      const updated = instances.filter(inst => inst.id !== id);
      setInstances(updated);
      setItems(updated);
      setDropdownOpenId(null);
      showToast('Instance removed', 'info');
    }
  };

  // Handlers
  const openPhpMyAdmin = (instance) => {
    if (instance.status !== 'active') {
      showToast('Instance not active', 'error');
      return;
    }
    showToast(`Opening phpMyAdmin for ${instance.domain}...`, 'info');
    setTimeout(() => window.open(`https://${instance.domain}/phpmyadmin`, '_blank'), 300);
  };

  const openFileManager = (instance) => {
    if (instance.status !== 'active') {
      showToast('Instance not active', 'error');
      return;
    }
    showToast(`File Manager for ${instance.domain} (demo)`, 'info');
  };

  const openDatabaseManager = (instance) => {
    setDatabaseModal({ open: true, instance });
    setDropdownOpenId(null);
  };

  const createDatabaseForInstance = (instance) => {
    const dbName = `${instance.domain.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_db`;
    const updated = instances.map(inst => inst.id === instance.id ? { ...inst, database: dbName } : inst);
    setInstances(updated);
    setItems(updated);
    setDatabaseModal({ open: false, instance: null });
    showToast(`Database "${dbName}" created`, 'success');
  };

  const handleManageRedirect = (instanceId) => {
    navigate(`/php/instance/${instanceId}/dashboard`);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownOpenId && !e.target.closest('.dropdown-container')) setDropdownOpenId(null);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [dropdownOpenId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="pt-20 pb-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Header with glassmorphism */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-500 text-[11px] font-semibold uppercase tracking-wider">
              <Cpu size={12} />
              <span>CLUSTER · EU-MULTI-ZONE · 99.99% SLA</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-slate-800 to-indigo-600 bg-clip-text text-transparent">
              PHP Cloud
            </h1>
            <p className="text-slate-400 text-sm max-w-xl">Enterprise‑grade managed PHP runtimes with auto‑scaling, opcache, and integrated database management.</p>
          </div>

          {/* Quota + New Button */}
          <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm p-1.5">
            <div className="px-4 py-1.5">
              <div className="text-[10px] font-medium text-slate-400 uppercase">Slots used</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-sm font-semibold text-slate-700">{instances.length}<span className="text-slate-300">/{siteLimit}</span></span>
                <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500" style={{ width: `${(instances.length / siteLimit) * 100}%` }}></div>
                </div>
              </div>
            </div>
            <button onClick={() => setIsCreateModalOpen(true)}
                    className="bg-slate-800 hover:bg-indigo-600 text-white px-5 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all active:scale-95 shadow-sm">
              <Plus size={14} /> New Instance
            </button>
          </div>
        </div>

        {/* Search + Filters (glass) */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                   placeholder="Search by domain or ID..." 
                   className="w-full pl-9 pr-4 py-2.5 bg-white/70 backdrop-blur-sm border border-slate-100 rounded-xl focus:ring-1 focus:ring-indigo-300 outline-none text-sm text-slate-600" />
          </div>
          <div className="flex gap-1 bg-white/70 backdrop-blur-sm p-1 rounded-xl border border-slate-100 shadow-sm">
            {[
              { label: 'All', value: '' },
              { label: 'Active', value: 'active' },
              { label: 'Pending', value: 'pending_dns' },
              { label: 'Deploying', value: 'provisioning' },
              { label: 'Failed', value: 'failed' }
            ].map(tab => (
              <button key={tab.label} onClick={() => setFilter(tab.value)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        filter === tab.value ? 'bg-indigo-100 text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                      }`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Instances List (Rows) */}
        {isLoading ? (
          <div className="space-y-4">
            {[1,2,3,4].map(i => <SkeletonRow key={i} />)}
          </div>
        ) : filteredInstances.length === 0 ? (
          <EmptyState onCreate={() => setIsCreateModalOpen(true)} />
        ) : (
          <div className="space-y-4">
            {filteredInstances.map(site => (
              <InstanceRow
                key={site.id}
                site={site}
                onEdit={() => { setEditingInstance(site); setIsCreateModalOpen(true); }}
                onDelete={() => deleteInstance(site.id)}
                onManage={() => handleManageRedirect(site.id)}
                onPhpMyAdmin={() => openPhpMyAdmin(site)}
                onCPanel={()=> openCPanel(site)}
                onFileManager={() => openFileManager(site)}
                onDatabaseManager={() => openDatabaseManager(site)}
                dropdownOpenId={dropdownOpenId}
                setDropdownOpenId={setDropdownOpenId}
              />
            ))}
          </div>
        )}

        {/* PHP Related Content Section (Extra eye candy) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/40 rounded-2xl p-6 border border-indigo-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3"><Zap size={20} className="text-indigo-500" /><h3 className="font-semibold text-slate-700">PHP 8.3 Ready</h3></div>
            <p className="text-sm text-slate-600">Latest JIT compilation, readonly properties, and native type declarations for 40% faster execution.</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/40 rounded-2xl p-6 border border-emerald-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3"><Shield size={20} className="text-emerald-600" /><h3 className="font-semibold text-slate-700">Secure by Default</h3></div>
            <p className="text-sm text-slate-600">Automated security patches, WAF integration, and isolated containers for each tenant.</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/40 rounded-2xl p-6 border border-amber-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3"><TrendingUp size={20} className="text-amber-600" /><h3 className="font-semibold text-slate-700">Auto‑scaling</h3></div>
            <p className="text-sm text-slate-600">Horizontal pod autoscaling based on real‑time CPU & memory usage. Handles traffic spikes seamlessly.</p>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-slate-400 border-t border-slate-100 pt-6">
          <span className="inline-flex items-center gap-1"><Code size={12} /> Powered by PHP 8.3 + MySQL 8.0 + Redis • Enterprise SLA 99.99%</span>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {isCreateModalOpen && (
        <InstanceModal
          instance={editingInstance}
          onClose={() => { setIsCreateModalOpen(false); setEditingInstance(null); }}
          onSave={(data) => {
            if (editingInstance) updateInstance(editingInstance.id, data);
            else addInstance(data);
            setIsCreateModalOpen(false);
            setEditingInstance(null);
          }}
        />
      )}

      {/* Database Modal */}
      {databaseModal.open && (
        <DatabaseModal
          instance={databaseModal.instance}
          onClose={() => setDatabaseModal({ open: false, instance: null })}
          onCreateDatabase={() => createDatabaseForInstance(databaseModal.instance)}
        />
      )}

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}

// ============================================================
// Instance Row Component (one row per website)
// ============================================================
function InstanceRow({ site, onEdit, onDelete, onManage, onPhpMyAdmin,onCPanel, onFileManager, onDatabaseManager, dropdownOpenId, setDropdownOpenId }) {
  const isActive = site.status === 'active';
  const isDropdownOpen = dropdownOpenId === site.id;

  const statusConfig = {
    active: { label: 'Active', dot: 'bg-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700' },
    provisioning: { label: 'Deploying', dot: 'bg-amber-500', bg: 'bg-amber-50', text: 'text-amber-700' },
    pending_dns: { label: 'Pending DNS', dot: 'bg-blue-500', bg: 'bg-blue-50', text: 'text-blue-700' },
    failed: { label: 'Failed', dot: 'bg-red-500', bg: 'bg-red-50', text: 'text-red-700' }
  }[site.status] || { label: site.status, dot: 'bg-slate-400', bg: 'bg-slate-50', text: 'text-slate-600' };

  return (
    <div className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300">
      <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Icon + Details */}
        <div className="flex items-center gap-4 flex-1">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isActive ? 'bg-indigo-100 text-indigo-600 shadow-sm' : 'bg-slate-100 text-slate-400'}`}>
            <Server size={22} />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-slate-800 text-lg">{site.domain}</h3>
              <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`}></span>
                {statusConfig.label}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Layers size={12} /> {site.planType}</span>
              <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(site.createdAt).toLocaleDateString()}</span>
              <span className="flex items-center gap-1"><Activity size={12} /> {site.visitors.toLocaleString()} req/mo</span>
              <span className="flex items-center gap-1"><Globe size={12} /> PHP {site.phpVersion}</span>
              <span className="flex items-center gap-1"><HardDrive size={12} /> {site.storage}</span>
            </div>
          </div>
        </div>

        {/* Right: Action Buttons + 3dots */}



        <div className="flex items-center gap-2">
          <button onClick={onPhpMyAdmin} disabled={!isActive}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                    isActive ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-slate-50 text-slate-300 cursor-not-allowed'
                  }`}>
            <Database size={12} /> phpMyAdmin
          </button>

         < button onclick ={onCPanel} disabled={!isActive}
      className={`px-4 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
            isActive ? 'bg-gray-50 text-gray-700 hover:bg-gray-300 shadow-sm': 'bg-slate-100 text-slate-300 cursor-not-allowed'
           }`}>
             C-Panel <ExternalLink size={ 12} />
           </button>
        
          <button onClick={onManage} disabled={!isActive}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                    isActive ? 'bg-slate-800 text-white hover:bg-slate-600 shadow-sm' : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  }`}>
            Dashboard <ArrowRight size={12} />
          </button>

          {/* 3 Dots Dropdown */}
          <div className="relative dropdown-container">
            <button onClick={(e) => { e.stopPropagation(); setDropdownOpenId(isDropdownOpen ? null : site.id); }}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition">
              <MoreVertical size={16} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-10">
                <button onClick={onDelete} className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2">
                  <Trash2 size={12} /> Delete
                </button>
                <button onClick={onFileManager} className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-2">
                  <FolderOpen size={12} /> File Manager
                </button>
                <button onClick={onDatabaseManager} className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-2">
                  <Database size={12} /> Database
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Empty State
// ============================================================
const EmptyState = ({ onCreate }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-dashed border-indigo-200 p-12 text-center">
    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-300">
      <Terminal size={32} />
    </div>
    <h3 className="text-lg font-medium text-slate-700">No PHP instances deployed</h3>
    <p className="text-slate-400 text-sm mt-1">Get started by creating your first cloud environment</p>
    <button onClick={onCreate} className="mt-5 bg-indigo-50 text-indigo-700 px-5 py-2 rounded-xl text-sm font-medium inline-flex items-center gap-2 hover:bg-indigo-100 transition">
      <Plus size={14} /> Create Instance
    </button>
  </div>
);

// ============================================================
// Create/Edit Modal (Minimal & clean)
// ============================================================
const InstanceModal = ({ instance, onClose, onSave }) => {
  const [form, setForm] = useState({
    domain: instance?.domain || '',
    phpVersion: instance?.phpVersion || '8.3',
    planType: instance?.planType || 'Starter',
    status: instance?.status || 'active',
    storage: instance?.storage || '10GB'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center p-5 border-b">
          <h3 className="text-lg font-medium">{instance ? 'Edit Instance' : 'New PHP Instance'}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="p-5 space-y-4">
          <input type="text" placeholder="Domain name" value={form.domain} onChange={e => setForm({...form, domain: e.target.value})}
                 className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-indigo-300" required />
          <div className="grid grid-cols-2 gap-3">
            <select value={form.phpVersion} onChange={e => setForm({...form, phpVersion: e.target.value})} className="p-2.5 border rounded-lg text-sm">
              <option>8.3</option><option>8.2</option><option>8.1</option><option>7.4</option>
            </select>
            <select value={form.planType} onChange={e => setForm({...form, planType: e.target.value})} className="p-2.5 border rounded-lg text-sm">
              <option>Starter</option><option>Pro</option><option>Enterprise</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select value={form.storage} onChange={e => setForm({...form, storage: e.target.value})} className="p-2.5 border rounded-lg text-sm">
              <option>5GB</option><option>10GB</option><option>25GB</option><option>50GB</option>
            </select>
            <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="p-2.5 border rounded-lg text-sm">
              <option value="active">Active</option><option value="provisioning">Deploying</option><option value="pending_dns">Pending DNS</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition">
              {instance ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ============================================================
// Database Modal (existing or create)
// ============================================================
const DatabaseModal = ({ instance, onClose, onCreateDatabase }) => {
  const hasDb = instance.database && instance.database.trim() !== '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        <div className="p-5 border-b flex justify-between items-center">
          <h3 className="text-lg font-medium flex gap-2 items-center"><Database size={18} className="text-indigo-500" /> Database Manager</h3>
          <button onClick={onClose}><X size={18} className="text-slate-400" /></button>
        </div>
        <div className="p-5">
          <p className="text-sm text-slate-600 mb-3">{instance.domain}</p>
          {hasDb ? (
            <div className="bg-emerald-50 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-emerald-700 text-sm font-medium"><CheckCircle size={14} /> Existing Database</div>
              <p className="font-mono text-sm mt-1 bg-white p-2 rounded border border-emerald-100">{instance.database}</p>
              <button className="mt-3 text-indigo-600 text-xs font-medium flex items-center gap-1 hover:underline" onClick={() => alert(`Connect via phpMyAdmin`)}>
                Manage <ExternalLink size={10} />
              </button>
            </div>
          ) : (
            <div className="bg-amber-50 p-4 rounded-xl text-center">
              <p className="text-amber-700 text-sm">No database attached to this instance.</p>
              <button onClick={onCreateDatabase} className="mt-3 bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 mx-auto">
                <Plus size={12} /> Create Database
              </button>
            </div>
          )}
        </div>
        <div className="p-4 border-t bg-slate-50 flex justify-end">
          <button onClick={onClose} className="px-4 py-1.5 text-sm text-slate-600">Close</button>
        </div>
      </div>
    </div>
  );
};