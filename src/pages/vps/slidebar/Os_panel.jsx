import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, Database, HardDrive, Zap, ShieldCheck,
  Terminal, Activity, Power, RefreshCcw,
  Globe, AlertCircle, Trash2, Save,
  Monitor, Clock, Box, Search, CheckCircle2,
  AlertTriangle, X, RotateCw, CircleDot
} from 'lucide-react';
import { usePoweroffVps, useRebootVps, useStartVps, useStopVps, useVpsInstance, useVpsMetrics, useVpsStats, useVpsStatus, useOsTemplates } from '../../../hooks/useVps';
import { useNavigate, useParams } from 'react-router-dom';
import RebuildVpsModal from './RebuildVpsModal';
import { FaCentos, FaUbuntu, FaWindows } from 'react-icons/fa';
import { SiAlmalinux } from 'react-icons/si';
import { FcDebian } from 'react-icons/fc';

// --- REUSABLE COMPONENTS ---

const StatusBadge = ({ status }) => {
  const config = {
    running:   { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500', label: 'Running'    },
    stopped:   { bg: 'bg-rose-50',    text: 'text-rose-700',    border: 'border-rose-200',    dot: 'bg-rose-500',    label: 'Stopped'    },
    restarting:{ bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200',   dot: 'bg-amber-500',   label: 'Restarting' },
    changing:  { bg: 'bg-indigo-50',  text: 'text-indigo-700',  border: 'border-indigo-200',  dot: 'bg-indigo-500',  label: 'Changing OS'},
  };
  const s = config[status] || config.running;
  return (
    <div className={`${s.bg} ${s.text} ${s.border} border px-3 py-1.5 rounded-full flex items-center gap-2 text-[11px] font-black uppercase tracking-wider shadow-sm`}>
      <div className={`w-1.5 h-1.5 rounded-full ${s.dot} ${status === 'running' ? 'animate-pulse' : ''}`} />
      {s.label}
    </div>
  );
};

const ActionCard = ({ icon: Icon, label, sub, variant = "default", onClick, loading, disabled }) => {
  const styles = {
    danger:  "hover:border-rose-300   hover:bg-rose-50/70   hover:shadow-rose-100   text-rose-600",
    primary: "hover:border-indigo-300 hover:bg-indigo-50/70 hover:shadow-indigo-100 text-indigo-600",
    default: "hover:border-slate-300  hover:bg-slate-50     text-slate-600",
  };
  const iconBg = {
    danger:  "bg-rose-50   border-rose-100",
    primary: "bg-indigo-50 border-indigo-100",
    default: "bg-slate-50  border-slate-200",
  };
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={loading || disabled}
      className={`p-4 bg-white border border-slate-200 rounded-2xl flex flex-col gap-3 text-left transition-all shadow-sm hover:shadow-md ${styles[variant]} ${(loading || disabled) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${iconBg[variant]}`}>
        {loading ? <RefreshCcw className="animate-spin" size={18} /> : <Icon size={19} />}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-800">{label}</p>
        <p className="text-[11px] text-slate-400 font-medium mt-0.5">{sub}</p>
      </div>
    </motion.button>
  );
};

const HealthProgress = ({ label, value, color }) => (
  <div>
    <div className="flex justify-between text-xs font-bold mb-2">
      <span className="text-slate-500 uppercase tracking-wider">{label}</span>
      <span className="text-slate-800">{value}%</span>
    </div>
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  </div>
);

// --- OS SELECTION MODAL ---
const OSSelectionModal = ({ isOpen, onClose, onConfirm, currentOSId, loading, osTemplates }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOSId, setSelectedOSId] = useState(currentOSId);
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Convert OS templates to catalog format
  const osCatalog = Object.values(osTemplates || {}).map(template => ({
    id: template.osid,
    label: template.name,
    category: template.distro?.charAt(0)?.toUpperCase() + template.distro?.slice(1) || 'Linux',
    version: template.name?.split('-').pop() || 'Latest',
    icon: getIconForDistro(template.distro),
    popularity: 85,
    recommended: template.distro === 'ubuntu'
  }));

  useEffect(() => {
    if (isOpen) { setSelectedOSId(currentOSId); setSearchTerm(''); setCategoryFilter('all'); }
  }, [isOpen, currentOSId]);

  const categories = ['all', ...new Set(osCatalog.map(os => os.category))];
  const filteredOS = osCatalog.filter(os => {
    const matchSearch = os.label?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
                        os.version?.toLowerCase().includes(searchTerm?.toLowerCase());
    const matchCat = categoryFilter === 'all' || os.category === categoryFilter;
    return matchSearch && matchCat;
  });
  const selectedOS = osCatalog.find(os => os.id === selectedOSId);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-800/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="bg-white rounded-3xl max-w-4xl w-full relative z-10 shadow-2xl border border-slate-200 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-indigo-50/80 to-white">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-100 rounded-xl">
                  <Box className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Change Operating System</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Select a new OS for your virtual server</p>
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[58vh] overflow-y-auto">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-amber-800">Data will be permanently erased</p>
                  <p className="text-xs text-amber-600 mt-0.5">Changing the OS wipes all data on your VPS. Back up files before proceeding.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search OS…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all capitalize ${
                        categoryFilter === cat
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredOS.map((os) => (
                  <motion.div
                    key={os.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedOSId(os.id)}
                    className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
                      selectedOSId === os.id
                        ? 'border-indigo-500 bg-indigo-50/60 shadow-md shadow-indigo-100'
                        : 'border-slate-200 hover:border-indigo-300 bg-white hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl leading-none">{os.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-bold text-slate-800 text-sm">{os.label}</p>
                          {os.recommended && (
                            <span className="text-[9px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wider">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{os.category}</p>
                      </div>
                      {selectedOSId === os.id && (
                        <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                      )}
                    </div>
                  </motion.div>
                ))}
                {filteredOS.length === 0 && (
                  <div className="col-span-2 text-center py-10 text-slate-400 text-sm">
                    No operating systems match your search.
                  </div>
                )}
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 bg-slate-50/80 flex justify-between items-center">
              <div className="text-xs text-slate-400">
                Selected: <span className="font-bold text-slate-700">{selectedOS?.label || 'None'}</span>
              </div>
              <div className="flex gap-3">
                <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-200 transition-all">
                  Cancel
                </button>
                <button
                  onClick={() => onConfirm(selectedOSId)}
                  disabled={!selectedOSId || loading}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? <RefreshCcw className="animate-spin" size={14} /> : <RotateCw size={14} />}
                  Change OS
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Helper function to get icon for distro
const getIconForDistro = (distro) => {
  const icons = {
    ubuntu: <FaUbuntu className='text-orange-500 text-4xl'/>, 
    debian: <FcDebian/>,
    centos:<FaCentos className='text-purple-600'/>,
    rocky: '🪨',
    almalinux: <SiAlmalinux className='text-blue-600' />,
    fedora: '🎩',
    arch: '🎲',
    alpine: '🏔️',
    opensuse: '🦎',
    windows: <FaWindows className='text-blue-600'/>,
    kali: '💀'
  };
  return icons[distro?.toLowerCase()] || <FaUbuntu className='text-orange-500 text-4xl' />;
};

// --- REINSTALL MODAL ---
const ReinstallModal = ({ isOpen, onClose, onConfirm, currentOSLabel, loading }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-800/40 backdrop-blur-sm"
        />
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full relative z-10 shadow-2xl border border-slate-200"
        >
          <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mb-5">
            <AlertCircle size={28} className="text-rose-500" />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-2">Reinstall {currentOSLabel}?</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-5">
            A fresh installation of <span className="font-bold text-slate-700">{currentOSLabel}</span> will be performed.
            All existing data will be permanently erased.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 flex gap-2">
            <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 font-medium">This action is irreversible. Ensure backups are complete.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={onClose} className="py-3 rounded-xl font-semibold text-slate-500 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all text-sm">
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="py-3 rounded-xl font-bold bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-200 transition-all text-sm flex items-center justify-center gap-2"
            >
              {loading ? <RefreshCcw className="animate-spin" size={14} /> : <Trash2 size={14} />}
              Confirm Reinstall
            </button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// --- SHUTDOWN CONFIRM MODAL ---
const SimpleConfirmModal = ({ isOpen, onClose, onConfirm, title, message, loading, variant = "danger" }) => {
  const isDanger = variant === 'danger';
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-800/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full relative z-10 shadow-2xl border border-slate-200"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${isDanger ? 'bg-rose-50 border border-rose-100' : 'bg-indigo-50 border border-indigo-100'}`}>
              <Power size={28} className={isDanger ? 'text-rose-500' : 'text-indigo-500'} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">{message}</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={onClose} className="py-3 rounded-xl font-semibold text-slate-500 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all text-sm">
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className={`py-3 rounded-xl font-bold text-white transition-all text-sm flex items-center justify-center gap-2 shadow-lg ${
                  isDanger
                    ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-200'
                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                }`}
              >
                {loading ? <RefreshCcw className="animate-spin" size={14} /> : <CheckCircle2 size={14} />}
                {isDanger ? 'Confirm Shutdown' : 'Confirm Restart'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- MAIN PAGE ---
export default function OSPanel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: instance, isLoading: isInstanceLoading } = useVpsInstance(id);
  const { data: statsData, isLoading: isStatsLoading } = useVpsStats(id);
  const { data: metricsData, isLoading: isMetricsLoading } = useVpsMetrics(id, 5000);
  const { data: statusData, isLoading: isStatusLoading, refetch: refetchStatus } = useVpsStatus(id);
  const { data: osTemplates, isLoading: isOsLoading } = useOsTemplates();
  const [showRebuildModal, setShowRebuildModal] = useState(false);

  const poweroffVps = usePoweroffVps();
  const startVps = useStartVps();
  const stopVps = useStopVps();
  const rebootVps = useRebootVps();

  const vpsStatus = statusData?.status === 'running' ? 'running' : 'stopped';
  const isActionLoading = startVps.isPending || stopVps.isPending || rebootVps.isPending || poweroffVps.isPending;

  // Get current OS info from instance
  const currentOS = {
    id: instance?.osTemplate || 'ubuntu-24.04-x86_64',
    label: instance?.os || 'Ubuntu 24.04 LTS',
    category: 'Linux',
    version: instance?.os?.split(' ')[1] || 'Latest',
    icon: getIconForDistro(instance?.os?.toLowerCase()),
    popularity: 90
  };

useEffect(() => {
  if (instance) {
    console.log('Instance from API:', instance);
    console.log('Instance _id:', instance._id);
    console.log('Instance id:', instance.id);
    console.log('Instance keys:', Object.keys(instance));
  }
}, [instance]);

  // Get metrics from API
  const metrics = {
    cpu: metricsData?.cpu || 0,
    ram: metricsData?.ram || 0,
    disk: metricsData?.disk || 0,
    bandwidth: metricsData?.bandwidth || 0
  };

  const [modalState, setModalState] = useState({ type: null, open: false });
  const [loading, setLoading] = useState(false);
  const [systemLogs, setSystemLogs] = useState([]);

  const addLog = (type, message) =>
    setSystemLogs(prev => [{ time: new Date().toLocaleTimeString(), type, message }, ...prev.slice(0, 9)]);

  const handlePowerAction = async (action) => {
    setLoading(true);
    setModalState({ type: null, open: false });
    addLog('info', `Initiating ${action} sequence…`);
    
    try {
      if (action === 'shutdown') {
        await poweroffVps.mutateAsync(id);
        addLog('ok', 'System shutdown complete. Server is offline.');
      }
      if (action === 'start') {
        await startVps.mutateAsync(id);
        addLog('ok', 'Boot sequence completed. All services online.');
      }
      if (action === 'restart') {
        await rebootVps.mutateAsync(id);
        addLog('ok', 'Restart sequence completed. System rebooting.');
      }
      setTimeout(() => refetchStatus(), 3000);
    } catch (error) {
      addLog('error', `${action} failed: ${error.message}`);
    }
    setLoading(false);
  };

  const handleReinstall = async () => {
    setLoading(true);
    setModalState({ type: null, open: false });
    addLog('warn', `Reinstalling ${currentOS.label}… All data will be erased.`);
    // Call reinstall API here
    await new Promise(r => setTimeout(r, 2500));
    addLog('ok', `${currentOS.label} reinstalled successfully.`);
    setLoading(false);
  };

  const handleOSChange = async (newOSId) => {
    setLoading(true);
    setModalState({ type: null, open: false });
    addLog('warn', `Changing OS to ${newOSId}…`);
    // Call change OS API here
    await new Promise(r => setTimeout(r, 3000));
    addLog('ok', `OS successfully changed. System rebooted.`);
    setLoading(false);
  };

  const openModal = (type) => setModalState({ type, open: true });
  const closeModal = () => setModalState({ type: null, open: false });

  const handleOpenRebuildModal = () => {
  console.log('Opening rebuild modal with instance:', instance);
  console.log('Instance ID:', instance?._id);
  setShowRebuildModal(true);
};

  if (isInstanceLoading) {
    return <div className="p-8 text-center">Loading instance details...</div>;
  }

  if (!instance) {
    return <div className="p-8 text-center text-red-500">Instance not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
            <h1 className="text-2xl font-black tracking-tight text-slate-900">OS Management</h1>
          </div>
          <p className="text-slate-400 text-sm ml-4 font-medium">Control and configure your virtual environment</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          <StatusBadge status={vpsStatus} />
          <div className="h-4 w-px bg-slate-200 mx-1" />
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-600 px-2">
            <Globe size={13} className="text-indigo-500" /> {instance?.publicIp || instance?.ip}
          </div>
          {/* <button className="bg-indigo-600 hover:bg-indigo-700 active:scale-[0.97] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-indigo-200">
            <Terminal size={13} /> SSH Access
          </button> */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Current OS Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.025] pointer-events-none select-none">
              <Monitor size={200} />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-100 flex items-center justify-center text-4xl shadow-inner flex-shrink-0">
                {currentOS.icon}
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h2 className="text-xl font-black text-slate-900">{currentOS.label}</h2>
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2.5 py-0.5 rounded-full font-black tracking-widest uppercase border border-emerald-200">
                    Active
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-4">{instance?.osTemplate}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">CPU</span>
                    <span className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                      <Cpu size={13} className="text-indigo-600" />
                      {instance?.planId?.vcpu || 1} vCPU
                    </span>
                  </div>
                  <div className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">RAM</span>
                    <span className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                      <Database size={13} className="text-cyan-600" />
                      {instance?.planId?.ram || 4} GB
                    </span>
                  </div>
                  <div className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">Storage</span>
                    <span className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                      <HardDrive size={13} className="text-emerald-600" />
                      {instance?.planId?.storage || 80} GB
                    </span>
                  </div>
                  <div className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">Location</span>
                    <span className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                      <Globe size={13} className="text-amber-600" />
                      {instance?.location || 'Mumbai, IN'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <ActionCard 
  icon={RefreshCcw} 
  label="Rebuild" 
  sub="Fresh OS wipe" 
  variant="danger" 
  onClick={handleOpenRebuildModal} 
  loading={loading} 
  disabled={loading} 
/>
         <ActionCard 
  icon={RotateCw} 
  label="Restart" 
  sub="Reboot server" 
  variant="primary" 
  onClick={() => openModal('restart')} 
  loading={isActionLoading} 
  disabled={isActionLoading} 
/>
            {vpsStatus === 'running' ? (
              <ActionCard icon={Power} label="Shutdown" sub="Power off" variant="danger" onClick={() => openModal('shutdown')} loading={isActionLoading} disabled={isActionLoading} />
            ) : (
              <ActionCard icon={Zap} label="Start" sub="Power on" variant="primary" onClick={() => handlePowerAction('start')} loading={isActionLoading} disabled={isActionLoading} />
            )}
            <ActionCard icon={Save} label="Snapshot" sub="Backup disk" variant="default" disabled={loading} />
          </div>

    
          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
  {/* Header */}
  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
    <div className="flex items-center gap-2">
      <div className="p-1.5 bg-indigo-50 rounded-lg">
        <Globe size={15} className="text-indigo-600" />
      </div>
      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
        Data Center Locations
      </span>
    </div>
    <div className="flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      <span className="text-[10px] font-bold text-emerald-600">3 Active Regions</span>
    </div>
  </div>

  {/* Map Image */}
  <div className="relative w-full mt-[80px]  h-[300px]">
    <img
      src="/paytel map.jpg"
      alt="Data Center Locations"
      className="w-full h-auto object-contain block"
    />
  </div>

  {/* Footer badges */}
  <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex flex-wrap gap-3">
    {[
      { city: 'Delhi',     latency: '2ms'  },
      { city: 'Hyderabad', latency: '4ms'  },
      { city: 'Mumbai',    latency: '3ms'  },
    ].map(({ city, latency }) => (
      <div key={city} className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-1.5 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-amber-400" />
        <span className="text-xs font-bold text-slate-700">{city}</span>
        <span className="text-[10px] text-slate-400 font-medium">{latency}</span>
      </div>
    ))}
  </div>
</div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Live Health */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-lg">
            <h3 className="font-black text-slate-800 mb-6 flex items-center gap-2 text-sm">
              <Activity size={17} className="text-indigo-600" /> Live Health Metrics
            </h3>
            <div className="space-y-5">
              <HealthProgress label="CPU Load" value={Math.min(metrics.cpu, 100)} color="bg-indigo-500" />
              <HealthProgress label="RAM Used" value={Math.min((metrics.ram / 4096) * 100, 100)} color="bg-cyan-500" />
              <HealthProgress label="Disk Used" value={Math.min((metrics.disk / 80) * 100, 100)} color="bg-emerald-500" />
              <HealthProgress label="Bandwidth" value={Math.min(metrics.bandwidth, 100)} color="bg-amber-500" />
            </div>
            <div className="mt-7 pt-5 border-t border-slate-100 flex items-center justify-between">
             
              
            </div>
          </div>

          {/* Security Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-24 h-24 rounded-full border-2 border-white" />
              <div className="absolute top-8 right-8 w-14 h-14 rounded-full border border-white" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  <ShieldCheck size={18} />
                </div>
                <span className="font-bold text-sm">Security Status</span>
              </div>
              <p className="text-xl font-black mb-1">Active Protection</p>
              <p className="text-indigo-100 text-xs">DDoS mitigation · Firewall active</p>
              <div className="mt-4 flex gap-2">
                <span className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 text-[10px] font-bold">SSL/TLS</span>
                <span className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 text-[10px] font-bold">WAF</span>
                <span className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 text-[10px] font-bold">DDoS</span>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="font-black text-slate-800 text-sm mb-4">Server Info</h3>
            <div className="space-y-3">
              {[
                { label: 'Hostname', value: instance?.hostname },
                { label: 'IP Address', value: instance?.publicIp || instance?.ip },
                { label: 'Plan', value: instance?.planId?.name },
                { label: 'Expires', value: instance?.expiresAt ? new Date(instance.expiresAt).toLocaleDateString() : 'N/A' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                  <span className="text-xs text-slate-400 font-medium">{label}</span>
                  <span className="text-xs font-bold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <OSSelectionModal
        isOpen={modalState.type === 'change'}
        onClose={closeModal}
        onConfirm={handleOSChange}
        currentOSId={currentOS.id}
        loading={loading}
        osTemplates={osTemplates}
      />
      <ReinstallModal
        isOpen={modalState.type === 'reinstall'}
        onClose={closeModal}
        onConfirm={handleReinstall}
        currentOSLabel={currentOS.label}
        loading={loading}
      />
      <SimpleConfirmModal
        isOpen={modalState.type === 'shutdown'}
        onClose={closeModal}
        onConfirm={() => handlePowerAction('shutdown')}
        title="Shutdown Server"
        message="This will power off your VPS. All running services will be terminated. You can start it again from the dashboard."
        loading={isActionLoading}
        variant="danger"
      />
      <SimpleConfirmModal
        isOpen={modalState.type === 'restart'}
        onClose={closeModal}
        onConfirm={() => handlePowerAction('restart')}
        title="Restart Server"
        message="This will reboot your VPS. Services will be temporarily unavailable during the restart process."
        loading={isActionLoading}
        variant="primary"
      />
      <RebuildVpsModal 
  isOpen={showRebuildModal}
  onClose={() => setShowRebuildModal(false)}
  instance={instance}
  onRebuildComplete={() => {
    refetchStatus();

  }}
/>
    </div>
  );
}