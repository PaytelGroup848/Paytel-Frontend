import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, Database, HardDrive, Zap, Bell, ShieldCheck,
  Terminal, Activity, Power, RefreshCcw, LayoutGrid,
  Globe, AlertCircle, Trash2, Save, ChevronRight,
  Monitor, Info, Clock, Box, Search, CheckCircle2,
  AlertTriangle, X, Server, Cloud, Apple, Laptop,
  CircleDot, RotateCw
} from 'lucide-react';

// --- DATA CONSTANTS ---
const SERVER_DATA = {
  name: "vps-prod-alpha-01",
  ip: "185.234.72.109",
  region: "Frankfurt, DE",
  plan: "Pro Titan",
  specs: [
    { label: "CPU", val: "8 vCPU", icon: Cpu, color: "blue" },
    { label: "RAM", val: "32 GB", icon: Database, color: "indigo" },
    { label: "Storage", val: "400 GB NVMe", icon: HardDrive, color: "cyan" },
    { label: "Bandwidth", val: "10 Gbps", icon: Zap, color: "emerald" },
  ]
};

// Extended OS Catalog - Fully Dynamic
const OS_CATALOG = [
  { id: "ubuntu-24-04", label: "Ubuntu 24.04 LTS", category: "Linux", version: "Noble Numbat", icon: "🐧", popularity: 98, recommended: true },
  { id: "ubuntu-22-04", label: "Ubuntu 22.04 LTS", category: "Linux", version: "Jammy Jellyfish", icon: "🐧", popularity: 95 },
  { id: "debian-12", label: "Debian 12 Bookworm", category: "Linux", version: "Stable", icon: "🌀", popularity: 92 },
  { id: "debian-11", label: "Debian 11 Bullseye", category: "Linux", version: "Old Stable", icon: "🌀", popularity: 85 },
  { id: "rocky-9", label: "Rocky Linux 9", category: "Linux", version: "Blue Onyx", icon: "🪨", popularity: 88 },
  { id: "almalinux-9", label: "AlmaLinux 9", category: "Linux", version: "Emerald", icon: "🌿", popularity: 86 },
  { id: "centos-stream-9", label: "CentOS Stream 9", category: "Linux", version: "Stream", icon: "🟠", popularity: 80 },
  { id: "fedora-40", label: "Fedora 40", category: "Linux", version: "Workstation", icon: "🎩", popularity: 87 },
  { id: "arch-latest", label: "Arch Linux", category: "Linux", version: "Rolling", icon: "🎲", popularity: 78 },
  { id: "alpine-3-19", label: "Alpine Linux 3.19", category: "Linux", version: "Minimal", icon: "🏔️", popularity: 82 },
  { id: "opensuse-15", label: "openSUSE Leap 15.5", category: "Linux", version: "Green", icon: "🦎", popularity: 79 },
  { id: "windows-2025", label: "Windows Server 2025", category: "Windows", version: "Datacenter", icon: "🪟", popularity: 93 },
  { id: "windows-2022", label: "Windows Server 2022", category: "Windows", version: "Standard", icon: "🪟", popularity: 91 },
  { id: "kali-latest", label: "Kali Linux", category: "Security", version: "Rolling", icon: "💀", popularity: 76 }
];

// --- REUSABLE COMPONENTS ---

const StatusBadge = ({ status }) => {
  const config = {
    running: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', dot: 'bg-emerald-500', label: 'Running' },
    stopped: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', dot: 'bg-rose-500', label: 'Stopped' },
    restarting: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', dot: 'bg-amber-500', label: 'Restarting' },
    changing: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', dot: 'bg-indigo-500', label: 'Changing OS' }
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
    danger: "hover:border-rose-300 hover:bg-rose-50/50 text-rose-600 dark:hover:bg-rose-950/30",
    primary: "hover:border-indigo-300 hover:bg-indigo-50/50 text-indigo-600 dark:hover:bg-indigo-950/30",
    default: "hover:border-slate-300 hover:bg-slate-50 text-slate-600 dark:hover:bg-slate-800"
  };
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }}
      onClick={onClick} disabled={loading || disabled}
      className={`p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col gap-3 text-left transition-all shadow-sm ${styles[variant]} ${(loading || disabled) ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-800 border border-inherit`}>
        {loading ? <RefreshCcw className="animate-spin" size={18} /> : <Icon size={20} />}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{label}</p>
        <p className="text-[11px] text-slate-400 font-medium">{sub}</p>
      </div>
    </motion.button>
  );
};

const HealthProgress = ({ label, value, color }) => {
  return (
    <div>
      <div className="flex justify-between text-xs font-bold mb-2">
        <span className="text-slate-500 uppercase tracking-wider">{label}</span>
        <span className="text-slate-900 dark:text-slate-300">{value}%</span>
      </div>
      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }} animate={{ width: `${value}%` }}
          className={`h-full ${color} rounded-full shadow-sm`}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};


// OS Selection Modal Component
const OSSelectionModal = ({ isOpen, onClose, onConfirm, currentOSId, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOSId, setSelectedOSId] = useState(currentOSId);
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    if (isOpen) {
      setSelectedOSId(currentOSId);
      setSearchTerm('');
      setCategoryFilter('all');
    }
  }, [isOpen, currentOSId]);

  const categories = ['all', 'Linux', 'Windows', 'Security'];
  const filteredOS = OS_CATALOG.filter(os => {
    const matchesSearch = os.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      os.version.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || os.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const selectedOS = OS_CATALOG.find(os => os.id === selectedOSId);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 30 }}
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full relative z-10 shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-950/30 dark:to-slate-900">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl">
                  <Box className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">Change Operating System</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Select a new OS for your virtual server</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto custom-scrollbar">

              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800 dark:text-amber-300">
                  <p className="font-bold">⚠️ Data will be erased</p>
                  <p className="text-xs opacity-90">Changing the OS will permanently erase all data on your VPS. Make sure to back up important files before proceeding.</p>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search OS (Ubuntu, Debian, Windows...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${categoryFilter === cat
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* OS Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredOS.map((os) => (
                  <motion.div
                    key={os.id}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setSelectedOSId(os.id)}
                    className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${selectedOSId === os.id
                        ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 shadow-md'
                        : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 bg-white dark:bg-slate-900'
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{os.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-bold text-slate-900 dark:text-white">{os.label}</p>
                          {os.recommended && (
                            <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">RECOMMENDED</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Version {os.version} • {os.category}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1">
                            <CircleDot size={12} className="text-indigo-500" />
                            <span className="text-[11px] text-slate-500">{os.popularity}% compatible</span>
                          </div>
                        </div>
                      </div>
                      {selectedOSId === os.id && <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />}
                    </div>
                  </motion.div>
                ))}
              </div>
              {filteredOS.length === 0 && (
                <div className="text-center py-12 text-slate-500">No operating systems match your search.</div>
              )}
            </div>

            <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
              <div className="text-xs text-slate-500">
                Selected: <span className="font-bold text-slate-700 dark:text-slate-300">{selectedOS?.label || 'None'}</span>
              </div>
              <div className="flex gap-3">
                <button onClick={onClose} className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-all">Cancel</button>
                <button
                  onClick={() => onConfirm(selectedOSId)}
                  disabled={!selectedOSId || loading}
                  className="px-6 py-2.5 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? <RefreshCcw className="animate-spin" size={16} /> : <RotateCw size={16} />}
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

// Reinstall Confirmation Modal
const ReinstallModal = ({ isOpen, onClose, onConfirm, currentOSLabel, loading }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full relative z-10 shadow-2xl border border-slate-200 dark:border-slate-700"
          >
            <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center mb-6">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Reinstall {currentOSLabel}?</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
              This will perform a fresh installation of <span className="font-bold text-slate-700">{currentOSLabel}</span>. All existing data will be permanently erased.
            </p>
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-3 mb-6 flex gap-2 text-xs text-amber-700 dark:text-amber-400">
              <AlertTriangle size={14} className="shrink-0 mt-0.5" />
              This action is irreversible. Please ensure backups are complete.
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={onClose} className="py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-sm">Cancel</button>
              <button
                onClick={onConfirm}
                className="py-3 rounded-xl font-bold bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-200 transition-all text-sm flex items-center justify-center gap-2"
                disabled={loading}
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
};

// Simple Confirmation Modal (Shutdown)
const SimpleConfirmModal = ({ isOpen, onClose, onConfirm, title, message, loading, variant = "danger" }) => {
  const colors = variant === 'danger'
    ? { bg: 'bg-rose-50 dark:bg-rose-950/40', text: 'text-rose-600', button: 'bg-rose-600 hover:bg-rose-700 shadow-rose-200' }
    : { bg: 'bg-indigo-50 dark:bg-indigo-950/40', text: 'text-indigo-600', button: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full relative z-10 shadow-2xl border border-slate-200 dark:border-slate-700"
          >
            <div className={`w-14 h-14 rounded-2xl ${colors.bg} ${colors.text} flex items-center justify-center mb-6`}>
              <Power size={32} />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">{message}</p>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={onClose} className="py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-sm">Cancel</button>
              <button
                onClick={onConfirm}
                className={`py-3 rounded-xl font-bold text-white ${colors.button} transition-all text-sm flex items-center justify-center gap-2`}
                disabled={loading}
              >
                {loading ? <RefreshCcw className="animate-spin" size={14} /> : <CheckCircle2 size={14} />}
                Confirm{variant === 'danger' ? 'shutdown' : 'restart'}

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
  const [status, setStatus] = useState('running');
  const [currentOS, setCurrentOS] = useState(OS_CATALOG.find(os => os.id === 'ubuntu-24-04'));
  const [modalState, setModalState] = useState({ type: null, open: false });
  const [loading, setLoading] = useState(false);
  const [systemLogs, setSystemLogs] = useState([
    { time: new Date().toLocaleTimeString(), type: 'ok', message: 'systemd[1]: Started Nginx Web Server.' },
    { time: new Date().toLocaleTimeString(), type: 'info', message: 'sshd: Accepted publickey for root from 192.168.1.1' },
    { time: new Date().toLocaleTimeString(), type: 'warn', message: 'kernel: TCP: out of memory threshold reached.' },
  ]);

  const addLog = (type, message) => {
    setSystemLogs(prev => [{ time: new Date().toLocaleTimeString(), type, message }, ...prev.slice(0, 9)]);
  };

  const handlePowerAction = async (action) => {
    setLoading(true);
    setModalState({ type: null, open: false });
    addLog('info', `Initiating ${action} sequence...`);
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (action === 'shutdown') {
      setStatus('stopped');
      addLog('ok', 'System shutdown complete. Server is offline.');
    } else if (action === 'start') {
      setStatus('running');
      addLog('ok', 'System boot sequence completed. All services online.');
    }
    setLoading(false);
  };

  const handleReinstall = async () => {
    setLoading(true);
    setModalState({ type: null, open: false });
    addLog('warn', `Starting reinstallation of ${currentOS.label}... This will erase all data.`);
    await new Promise(resolve => setTimeout(resolve, 2500));
    addLog('ok', `${currentOS.label} reinstalled successfully. Server ready for provisioning.`);
    setStatus('running');
    setLoading(false);
  };

  const handleOSChange = async (newOSId) => {
    const newOS = OS_CATALOG.find(os => os.id === newOSId);
    if (!newOS) return;

    setLoading(true);
    setModalState({ type: null, open: false });
    setStatus('changing');
    addLog('warn', `Changing OS from ${currentOS.label} to ${newOS.label}... Data wipe in progress.`);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setCurrentOS(newOS);
    setStatus('running');
    addLog('ok', `Operating system successfully changed to ${newOS.label} (${newOS.version}). System rebooted.`);
    setLoading(false);
  };

  const openModal = (type) => setModalState({ type, open: true });
  const closeModal = () => setModalState({ type: null, open: false });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 p-4 md:p-10 font-sans text-slate-900 dark:text-slate-100">

      {/* Header Area */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
            <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">OS Management</h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm ml-4 font-medium">Control and configure your virtual environment</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <StatusBadge status={status} />
          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1" />
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-600 dark:text-slate-300 px-2">
            <Globe size={14} className="text-indigo-500" /> {SERVER_DATA.ip}
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md">
            <Terminal size={14} /> SSH Access
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">

        {/* Main Info Card */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden transition-all">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
              <Monitor size={200} />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/60 dark:to-indigo-900/30 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-4xl shadow-inner">
                {currentOS.icon}
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">{currentOS.label}</h2>
                  <span className="bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-[10px] px-2 py-0.5  rounded-full font-black tracking-widest uppercase border border-emerald-200 dark:border-emerald-800">Active</span>
                  <span className="text-xs text-slate-400 font-mono">v{currentOS.version}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {SERVER_DATA.specs.map((s, i) => (
                    <div key={i} className="flex flex-col p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">{s.label}</span>
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <s.icon size={14} className="text-slate-400" /> {s.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Control Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ActionCard icon={RefreshCcw} label="Reinstall" sub="Fresh OS wipe" variant="danger" onClick={() => openModal('reinstall')} loading={loading} disabled={loading} />
            <ActionCard icon={Box} label="Change OS" sub="Switch Distro" variant="primary" onClick={() => openModal('change')} loading={loading} disabled={loading} />
            {status === 'running' ? (
              <ActionCard icon={Power} label="Shutdown" sub="Power off" variant="danger" onClick={() => openModal('shutdown')} loading={loading} disabled={loading} />
            ) : (
              <ActionCard icon={Zap} label="Start" sub="Power on" variant="primary" onClick={() => handlePowerAction('start')} loading={loading} disabled={loading} />
            )}
            <ActionCard icon={Save} label="Snapshot" sub="Backup disk" variant="default" disabled={loading} />
          </div>

          {/* Logs Area (Terminal Style) */}
          <div className="bg-slate-900 dark:bg-black/80 rounded-3xl p-6 shadow-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest ml-2">System Logs (Live)</span>
              </div>
              <Activity size={16} className="text-emerald-500 animate-pulse" />
            </div>
            <div className="font-mono text-[12px] space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-4">
              {systemLogs.map((log, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <span className="text-slate-500 shrink-0">[{log.time}]</span>
                  {log.type === 'ok' && <span className="text-emerald-500">[OK]</span>}
                  {log.type === 'info' && <span className="text-indigo-400">[INFO]</span>}
                  {log.type === 'warn' && <span className="text-amber-500">[WARN]</span>}
                  <span className="text-slate-300 break-all">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Health Stats */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Activity size={18} className="text-indigo-600" /> Live Health Metrics
            </h3>

            <div className="space-y-6">
              <HealthProgress label="CPU Load" value={23} color="bg-indigo-600" />
              <HealthProgress label="Memory" value={76} color="bg-cyan-500" />
              <HealthProgress label="IOPS" value={42} color="bg-emerald-500" />
              <HealthProgress label="Bandwidth" value={90} color="bg-amber-500" />
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Uptime</p>
                <p className="text-sm font-black text-slate-900 dark:text-white">14d 7h 23m</p>
              </div>
              <div className="h-10 w-10 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center animate-spin-slow">
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400">94%</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck size={20} />
              <span className="font-bold text-sm">Security Status</span>
            </div>
            <p className="text-lg font-black">Active Protection</p>
            <p className="text-indigo-100 text-xs mt-1">DDoS mitigation • Firewall active</p>
            <div className="mt-4 flex gap-2">
              <span className="bg-white/20 rounded-full px-2 py-1 text-[10px] font-bold">SSL/TLS</span>
              <span className="bg-white/20 rounded-full px-2 py-1 text-[10px] font-bold">WAF</span>
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
        loading={loading}
        variant="danger"
      />
    </div>
  );
}
