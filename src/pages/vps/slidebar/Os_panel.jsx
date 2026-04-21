import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Database, HardDrive, Zap, Bell, ShieldCheck, 
  Terminal, Activity, Power, RefreshCcw, LayoutGrid, 
  Globe, AlertCircle, Trash2, Save, ChevronRight,
  Monitor, Info, Clock, Box
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

const OS_OPTIONS = [
  { id: "ubuntu24", label: "Ubuntu 24.04 LTS", category: "Linux", icon: "🐧" },
  { id: "debian12", label: "Debian 12 Bookworm", category: "Linux", icon: "🌀" },
  { id: "win2022", label: "Windows Server 2022", category: "Windows", icon: "🪟" },
];

// --- REUSABLE COMPONENTS ---

const StatusBadge = ({ status }) => {
  const config = {
    running: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', dot: 'bg-emerald-500' },
    stopped: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', dot: 'bg-rose-500' },
    restarting: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', dot: 'bg-amber-500' }
  };
  const s = config[status] || config.running;
  return (
    <div className={`${s.bg} ${s.text} ${s.border} border px-3 py-1 rounded-full flex items-center gap-2 text-[11px] font-black uppercase tracking-wider`}>
      <div className={`w-1.5 h-1.5 rounded-full ${s.dot} ${status === 'running' ? 'animate-pulse' : ''}`} />
      {status}
    </div>
  );
};

const ActionCard = ({ icon: Icon, label, sub, variant = "default", onClick, loading }) => {
  const styles = {
    danger: "hover:border-rose-300 hover:bg-rose-50/50 text-rose-600",
    primary: "hover:border-indigo-300 hover:bg-indigo-50/50 text-indigo-600",
    default: "hover:border-slate-300 hover:bg-slate-50 text-slate-600"
  };
  return (
    <motion.button
      whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
      onClick={onClick} disabled={loading}
      className={`p-4 bg-white border border-slate-200 rounded-2xl flex flex-col gap-3 text-left transition-all shadow-sm ${styles[variant]}`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 border border-inherit`}>
        {loading ? <RefreshCcw className="animate-spin" size={18} /> : <Icon size={20} />}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-900">{label}</p>
        <p className="text-[11px] text-slate-400 font-medium">{sub}</p>
      </div>
    </motion.button>
  );
};

// --- MAIN PAGE ---

export default function OSPanel() {
  const [status, setStatus] = useState('running');
  const [activeModal, setActiveModal] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAction = (type) => {
    setLoading(true);
    setActiveModal(null);
    setTimeout(() => {
      setLoading(false);
      if (type === 'shutdown') setStatus('stopped');
      if (type === 'start') setStatus('running');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans text-slate-900">
      
      {/* Header Area */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
            <h1 className="text-2xl font-black tracking-tight text-slate-900">OS Management</h1>
          </div>
          <p className="text-slate-500 text-sm ml-4 font-medium">Control and configure your virtual environment</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          <StatusBadge status={status} />
          <div className="h-4 w-[1px] bg-slate-200 mx-1" />
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-600 px-2">
            <Globe size={14} className="text-indigo-500" /> {SERVER_DATA.ip}
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2">
            <Terminal size={14} /> SSH Access
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        
        {/* Main Info Card */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
              <Monitor size={200} />
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-4xl shadow-inner">
                🐧
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-black text-slate-900">Ubuntu 24.04 LTS</h2>
                  <span className="bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded font-black tracking-widest uppercase">Active</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {SERVER_DATA.specs.map((s, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">{s.label}</span>
                      <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
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
            <ActionCard icon={RefreshCcw} label="Reinstall" sub="Fresh OS wipe" variant="danger" onClick={() => setActiveModal('reinstall')} />
            <ActionCard icon={Box} label="Change OS" sub="Switch Distro" variant="primary" onClick={() => setActiveModal('change')} />
            {status === 'running' ? (
              <ActionCard icon={Power} label="Shutdown" sub="Power off" variant="danger" onClick={() => setActiveModal('shutdown')} />
            ) : (
              <ActionCard icon={Zap} label="Start" sub="Power on" variant="primary" onClick={() => handleAction('start')} />
            )}
            <ActionCard icon={Save} label="Snapshot" sub="Backup disk" />
          </div>

          {/* Logs Area (Terminal Style) */}
          <div className="bg-[#0F172A] rounded-3xl p-6 shadow-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest ml-2">System Logs</span>
              </div>
              <Activity size={16} className="text-emerald-500 animate-pulse" />
            </div>
            <div className="font-mono text-[12px] space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-4 text-slate-400">
              <p><span className="text-emerald-500">[OK]</span> systemd[1]: Started Nginx Web Server.</p>
              <p><span className="text-indigo-400">[INFO]</span> sshd: Accepted publickey for root from 192.168.1.1</p>
              <p><span className="text-amber-500">[WARN]</span> kernel: TCP: out of memory threshold reached.</p>
              <p className="opacity-50"><span className="text-slate-500">[08:42:11]</span> cron[1847]: Running daily apt update...</p>
            </div>
          </div>
        </div>

        {/* Sidebar Health Stats */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2">
              <Activity size={18} className="text-indigo-600" /> Live Health
            </h3>
            
            <div className="space-y-6">
              <HealthProgress label="CPU Load" value={42} color="bg-indigo-600" />
              <HealthProgress label="Memory" value={78} color="bg-cyan-500" />
              <HealthProgress label="IOPS" value={25} color="bg-emerald-500" />
              <HealthProgress label="Bandwidth" value={61} color="bg-amber-500" />
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Uptime</p>
                <p className="text-sm font-black text-slate-900">14d 7h 23m</p>
              </div>
              <div className="h-10 w-10 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center">
                 <span className="text-[10px] font-black text-emerald-600">94%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full relative z-10 shadow-2xl border border-slate-200"
            >
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-6">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Are you absolutely sure?</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                This action is irreversible. It will reboot the server and all unsaved progress on active services will be lost.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setActiveModal(null)} className="py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all text-sm">Cancel</button>
                <button 
                  onClick={() => handleAction(activeModal)}
                  className="py-3 rounded-xl font-bold bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-200 transition-all text-sm"
                >
                  Confirm Action
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HealthProgress({ label, value, color }) {
  return (
    <div>
      <div className="flex justify-between text-xs font-bold mb-2">
        <span className="text-slate-500 uppercase tracking-wider">{label}</span>
        <span className="text-slate-900">{value}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }} animate={{ width: `${value}%` }}
          className={`h-full ${color} rounded-full shadow-sm`} 
        />
      </div>
    </div>
  );
}