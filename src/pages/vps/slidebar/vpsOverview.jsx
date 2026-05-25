import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import {
  LayoutDashboard, Cpu, HardDrive, Clock, Bell,
  ChevronDown, ChevronRight, Server, Shield, Key, Lock,
  Container, BookOpen, Rss, Archive, LifeBuoy,
  TerminalSquare, Globe, Wifi, Activity, RefreshCw, Power,
  TrendingUp, Database, BarChart3, Rocket, Construction,
  Upload, Download, ExternalLink, Calendar, RotateCw, Square,
  Fingerprint, BadgeCheck, AlertCircle, FolderArchive,
  Pause, Play, Eye, EyeOff, Menu, X
} from "lucide-react";
import { GoSidebarCollapse } from "react-icons/go";

import BackupManager from "./BackupManager";
import SnapShot from "./SnapShot";
import OSPanel from "./Os_panel";
import DocumentationPage from "./docs";
import VpsSettings from "./setting";
import firewall from "./security/firewall";
import {
  useVpsInstance, useVpsStats, useStartVps,
  useStopVps, useRebootVps, useVpsStatus, usePoweroffVps, useVpsMetrics,
  useVpsInstances
} from '../../../hooks/useVps';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Docker from "../Docker";
import { api } from "../../../services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchBackups = (id) => api.get(`/vps/instances/${id}/backups`).then(r => r.data?.data?.backups || []);

function useBreakpoint() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return { isMobile: w < 768, isTablet: w >= 768 && w < 1024, isDesktop: w >= 1024 };
}

/* ─── MetricGraph ─────────────────────────────────────────────────────── */
const MetricGraph = ({ title, icon: Icon, unit, currentValue, data }) => (
  <div className="bg-white rounded-xl border border-black/20 shadow-sm p-4 transition-all hover:shadow-md">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-blue-50">
          <Icon size={14} className="text-blue-600" />
        </div>
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{title}</span>
      </div>
      <span className="text-xl font-black text-slate-800">{currentValue}{unit}</span>
    </div>
    <div className="h-12 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fill="transparent" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

/* ─── DetailItem ─────────────────────────────────────────────────────────── */
const DetailItem = ({ label, value, icon, action, valueClassName = "" }) => (
  <div className="flex flex-wrap justify-between items-center py-3 border-b border-gray-100 last:border-0 gap-2">
    <span className="text-slate-500 text-[13px] font-medium">{label}:</span>
    <div className="flex items-center gap-2 flex-wrap">
      <span className={`text-slate-800 text-sm font-semibold flex items-center gap-1 ${valueClassName}`}>{icon} {value}</span>
      {action && action}
    </div>
  </div>
);

/* ─── SecurityCard ───────────────────────────────────────────────────────── */
const SecurityCard = ({ title, value, icon: Icon, status, bgColor }) => (
  <div className="bg-white rounded-xl border border-black/10 shadow-sm p-4 flex items-center justify-between w-full">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${bgColor}`}>
        <Icon size={18} className="text-indigo-600" />
      </div>
      <div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{title}</p>
        <p className="text-lg font-black text-slate-800">{value}</p>
      </div>
    </div>
    <div className={`text-xs font-semibold px-2 py-1 rounded-full ${status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
      {status}
    </div>
  </div>
);


function Dashboard({ setActive }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: instance, isLoading: isInstanceLoading } = useVpsInstance(id);
  const { data: statsData }   = useVpsStats(id);
  const { data: metricsData } = useVpsMetrics(id, 5000);
  const { data: statusData, isLoading: isStatusLoading, refetch: refetchStatus } = useVpsStatus(id);
  const queryClient = useQueryClient();
  // Query for backups
  const { data: backups = [], isLoading, refetch } = useQuery({
    queryKey: ['vps', 'backups', id],
    queryFn: () => fetchBackups(id),
    enabled: !!id,
  });

  const poweroffVps = usePoweroffVps();
  const startVps    = useStartVps();
  const stopVps     = useStopVps();
  const rebootVps   = useRebootVps();

  const vpsStatus       = statusData?.status === 'running' ? 'running' : 'stopped';
  const isActionLoading = startVps.isPending || stopVps.isPending || rebootVps.isPending || poweroffVps.isPending;

  const [cpuHistory,       setCpuHistory]       = useState([]);
  const [ramHistory,       setRamHistory]       = useState([]);
  const [diskHistory,      setDiskHistory]      = useState([]);
  const [incomingHistory,  setIncomingHistory]  = useState([]);
  const [outgoingHistory,  setOutgoingHistory]  = useState([]);
  const [bandwidthHistory, setBandwidthHistory] = useState([]);
  const [showPassword,     setShowPassword]     = useState(false);
  const [currentMetrics,   setCurrentMetrics]   = useState({ cpu:0, ram:0, disk:0, incoming:0, outgoing:0, bandwidth:0 });

  const timeCounter = useRef(0);

  useEffect(() => {
    const init = Array.from({ length: 12 }, (_, i) => ({ time: i, value: 0 }));
    setCpuHistory(init); setRamHistory(init); setDiskHistory(init);
    setIncomingHistory(init); setOutgoingHistory(init); setBandwidthHistory(init);
  }, []);

  useEffect(() => {
    if (!metricsData) return;
    const nm = {
      cpu: metricsData.cpu || 0, ram: metricsData.ram || 0, disk: metricsData.disk || 0,
      incoming: metricsData.incoming || 0, outgoing: metricsData.outgoing || 0, bandwidth: metricsData.bandwidth || 0,
    };
    setCurrentMetrics(nm);
    const t = ++timeCounter.current;
    setCpuHistory      (p => [...p.slice(-11), { time: t, value: nm.cpu       }]);
    setRamHistory      (p => [...p.slice(-11), { time: t, value: nm.ram       }]);
    setDiskHistory     (p => [...p.slice(-11), { time: t, value: nm.disk      }]);
    setIncomingHistory (p => [...p.slice(-11), { time: t, value: nm.incoming  }]);
    setOutgoingHistory (p => [...p.slice(-11), { time: t, value: nm.outgoing  }]);
    setBandwidthHistory(p => [...p.slice(-11), { time: t, value: nm.bandwidth }]);
  }, [metricsData]);

  const fm = {
    cpu:       currentMetrics.cpu.toFixed(1),
    ram:       (currentMetrics.ram / 1024).toFixed(2),
    disk:      currentMetrics.disk.toFixed(1),
    incoming:  (currentMetrics.incoming / 1024).toFixed(1),
    outgoing:  (currentMetrics.outgoing / 1024).toFixed(1),
    bandwidth: (currentMetrics.bandwidth / 1024).toFixed(3),
  };

  const getStatusConfig = () => {
    if (isStatusLoading) return { color: 'bg-yellow-500', text: 'Checking...', pulse: true };
    return vpsStatus === 'running'
      ? { color: 'bg-green-500',  text: 'Running', pulse: true  }
      : { color: 'bg-red-500',    text: 'Stopped', pulse: false };
  };
  const statusConfig = getStatusConfig();

  const handleToggleVPS = async () => {
    vpsStatus === 'running' ? await stopVps.mutateAsync(id) : await startVps.mutateAsync(id);
    setTimeout(() => refetchStatus(), 3000);
  };
  const handleReboot = async () => {
    await rebootVps.mutateAsync(id);
    setTimeout(() => refetchStatus(), 5000);
  };
  const handlePowerOff = () => {
    if (window.confirm('Are you sure you want to power off the VPS? This may cause data loss.')) {
      poweroffVps.mutate(id, { onSuccess: () => setTimeout(() => refetchStatus(), 3000) });
    }
  };


  if (isInstanceLoading) return <div className="p-8 text-center">Loading instance details...</div>;
  if (!instance)         return <div className="p-8 text-center text-red-500">Instance not found.</div>;

  const lastThree = instance?.ip ? instance.ip.split('.').pop() : '';

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full space-y-5 bg-gradient-to-br from-slate-50 to-white">

      {/* ── Page header ── */}
      <div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-800">VPS</span>
          <span className="text-slate-300 text-xl font-light">/</span>
          <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Overview</span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">VPS management</p>
      </div>

      {/* ── Status card ── */}
      <div className="bg-white rounded-2xl border border-black/10 shadow-lg overflow-hidden">
        <div className="p-4 sm:p-5 flex flex-col gap-5">

          {/* Top row: info + actions */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

            {/* Left: OS + badges */}
            <div className="space-y-3 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <Globe size={18} className="text-indigo-500 shrink-0" />
                  <span className="font-bold text-slate-800 text-base sm:text-lg truncate">{instance?.os}</span>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                  vpsStatus === 'running'
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-red-50   text-red-700   border-red-200'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.color} ${statusConfig.pulse ? 'animate-pulse' : ''}`} />
                  {statusConfig.text}
                </div>
              </div>

              {/* SSH */}
              <div className="flex items-center gap-2 flex-wrap">
                <Key  size={14} className="text-indigo-500 shrink-0" />
                <span className="text-xs font-medium text-slate-500">SSH Access:</span>
                <code className="text-xs bg-slate-100 px-2 py-1 rounded font-mono break-all">
                  ssh root@210.56.147.{lastThree}
                </code>
              </div>

              {/* Password */}
              <div className="flex items-center gap-2 flex-wrap">
                <Lock size={14} className="text-amber-500 shrink-0" />
                <span className="text-xs font-medium text-slate-500">Root password:</span>
                <div className="flex items-center gap-2 bg-slate-100 px-2 py-1 rounded-lg">
                  <code className="text-xs font-mono">
                    {showPassword ? instance.rootPassword : '•'.repeat(instance?.rootPassword?.length || 8)}
                  </code>
                  <button onClick={() => setShowPassword(v => !v)} className="text-slate-500 hover:text-indigo-600 transition-colors">
                    {showPassword ? <EyeOff size={14}/> : <Eye size={14}/>}
                  </button>
                </div>
                <button
                  onClick={() => setActive("setting")}
                  className="text-sm font-semibold cursor-pointer text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  Change <ExternalLink size={12}/>
                </button>
              </div>
            </div>

            {/* Right: action buttons */}
            <div className="flex flex-row sm:flex-col gap-2 flex-wrap sm:flex-nowrap shrink-0">
              {/* Start / Stop */}
              <button
                onClick={handleToggleVPS}
                disabled={isActionLoading || isStatusLoading}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap
                  ${vpsStatus === 'running'
                    ? 'bg-red-50   border border-red-200   hover:bg-red-100   text-red-700'
                    : 'bg-green-50 border border-green-200 hover:bg-green-100 text-green-700'}
                  ${(isActionLoading || isStatusLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {(startVps.isPending || stopVps.isPending) ? (
                  <><div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"/>
                    {vpsStatus === 'running' ? 'Stopping...' : 'Starting...'}</>
                ) : (
                  <>{vpsStatus === 'running' ? <Pause size={16}/> : <Play size={14}/>}
                    {vpsStatus === 'running' ? 'Stop VPS' : 'Start VPS'}</>
                )}
              </button>

              {/* Restart (only when running) */}
              {vpsStatus === 'running' && (
                <button
                  onClick={handleReboot}
                  disabled={isActionLoading}
                  className={`flex items-center gap-1.5 px-4 py-2 bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-700 text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap
                    ${isActionLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {rebootVps.isPending
                    ? <><div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"/>Rebooting...</>
                    : <><RotateCw size={14}/>Restart VPS</>}
                </button>
              )}

              {/* Power Off */}
              <button
                onClick={handlePowerOff}
                disabled={isActionLoading || isStatusLoading || vpsStatus !== 'running'}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap
                  ${poweroffVps.isPending
                    ? 'bg-gray-100 text-gray-500 border border-gray-200'
                    : 'bg-emerald-100 border border-emerald-300 hover:bg-emerald-200 text-black-700'}
                  ${(isActionLoading || isStatusLoading || vpsStatus !== 'running') ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {poweroffVps.isPending
                  ? <><div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"/>Powering Off...</>
                  : <><Power size={14}/>Power Off</>}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Metric graphs ── */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricGraph title="CPU Usage"        icon={Cpu}      unit="%"   currentValue={fm.cpu}       data={cpuHistory}       />
        <MetricGraph title="RAM Used"         icon={Database} unit=" GB" currentValue={fm.ram}       data={ramHistory}       />
        <MetricGraph title="Disk Used"        icon={HardDrive}unit=" GB" currentValue={fm.disk}      data={diskHistory}      />
        <MetricGraph title="Incoming Traffic" icon={Download} unit=" MB" currentValue={fm.incoming}  data={incomingHistory}  />
        <MetricGraph title="Outgoing Traffic" icon={Upload}   unit=" MB" currentValue={fm.outgoing}  data={outgoingHistory}  />
        <MetricGraph title="Bandwidth"        icon={Wifi}     unit=" GB" currentValue={fm.bandwidth} data={bandwidthHistory} />
      </div>

      {/* ── Expiry + Snapshot ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-wrap gap-3 justify-between items-center bg-white/80 rounded-xl p-4 border border-black/10 shadow-sm">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-500 text-sm font-medium">Expiration date:</span>
            <span className="text-sm font-semibold text-red-500/90">
              {instance?.expiresAt
                ? new Date(instance.expiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                : 'N/A'}
            </span>
          </div>
          <button onClick={()=>navigate("/vps")} className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold rounded-lg border border-blue-200 transition-all">
            <TrendingUp size={14}/> Upgrade
          </button>
        </div>

        <button onClick={() => setActive("SnapShot")} className="text-left w-full">
          <SecurityCard title="Snapshot & backups" value={backups?.length} icon={FolderArchive} status="Active" bgColor="bg-purple-50"/>
        </button>
      </div>

      {/* ── VPS details + Plan details ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-black/10 shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 px-5 py-4 bg-gray-50/50">
            <div className="flex items-center gap-2"><Server size={18} className="text-indigo-500"/><h3 className="font-extrabold text-slate-800">VPS details</h3></div>
          </div>
          <div className="p-5">
            <DetailItem label="Server location" value={instance?.location}               icon={<Globe size={12}/>}/>
            <DetailItem label="OS"              value={instance?.os}/>
            <DetailItem label="Hostname"        value={instance?.hostname}/>
            <DetailItem label="SSH username"    value={instance?.sshUsername || 'root'}/>
            <DetailItem label="IPv4"            value={instance?.ip}/>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-black/10 shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 px-5 py-4 bg-gray-50/50 flex justify-between items-center">
            <div className="flex items-center gap-2"><Database size={18} className="text-indigo-500"/><h3 className="font-extrabold text-slate-800">Plan details</h3></div>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">{instance?.planId?.name}</span>
          </div>
          <div className="p-5 space-y-1">
            <DetailItem
              label="Current plan"
              value={instance?.planId?.name}
              action={<button onClick={()=>navigate("/vps")} className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md hover:bg-indigo-100">Upgrade</button>}
            />
            <DetailItem label="Expiration date" value={instance?.expiresAt ? new Date(instance.expiresAt).toLocaleDateString() : 'N/A'}/>
            <DetailItem label="CPU core"   value={`${instance?.planId?.vcpu || 1} vCPU`} icon={<Cpu size={12}/>}/>
            <DetailItem label="Memory"     value={instance?.planId?.ram}                  icon={<Database size={12}/>}/>
            <DetailItem label="Disk space" value={instance?.planId?.storage}              icon={<HardDrive size={12}/>}/>
          </div>
        </div>
      </div>
    </div>
  );
}


const MENU_ITEMS = [
  { id: "overview",  label: "Overview",          icon: LayoutDashboard },
  { id: "docker",    label: "Docker",             icon: Container       },
  { id: "backupmgr", label: "Backup Manager",     icon: Archive         },
  { id: "ospanel",   label: "OS & Control Panels",icon: BarChart3       },
  { id: "firewall",  label: "Firewall",           icon: Shield          },
  { id: "tutorials", label: "Tutorials",          icon: BookOpen        },
  { id: "blog",      label: "Blog",               icon: Rss             },
  { id: "setting",   label: "Setting",            icon: Key             },
];

const SUB_ITEMS = {
  backupmgr: [
    { id: "SnapShot",    label: "Backup",      icon: FolderArchive },
    { id: "latestaction",label: "Latest Action", icon: Clock         },
  ]
};

function Sidebar({ active, setActive, onClose }) {
  const [openGroups,   setOpenGroups]   = useState({ infrastructure: true, apps: true });
  const [openSubMenus, setOpenSubMenus] = useState({});

  const toggleGroup   = (g) => setOpenGroups(p => ({ ...p, [g]: !p[g] }));
  const toggleSubMenu = (id) => setOpenSubMenus(p => ({ ...p, [id]: !p[id] }));

  const grouped = {
    infrastructure: ["docker", "backupmgr", "ospanel", "setting"],
    apps:           ["tutorials", "blog"],
  };

  const handleNav = (id, hasSub) => {
    if (hasSub) toggleSubMenu(id);
    setActive(id);
    if (!hasSub && onClose) onClose();  
  };

  const renderMenuItem = (item) => {
    const hasSub = !!SUB_ITEMS[item.id];
    const isOpen = openSubMenus[item.id];
    const isActive = active === item.id;
    const Icon = item.icon;

    return (
      <div key={item.id} className="mb-0.5">
        <button
          onClick={() => handleNav(item.id, hasSub)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 text-left
            ${isActive ? "bg-indigo-600 text-white shadow-md shadow-indigo-300/40" : "text-slate-500 hover:bg-white/70 hover:text-indigo-700"}`}
        >
          <div className="flex items-center gap-2.5">
            <Icon size={16} className={isActive ? "text-white/90" : "text-slate-400"}/>
            <span className={`text-[13px] ${isActive ? "font-bold" : "font-medium"}`}>{item.label}</span>
          </div>
          {hasSub && <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}/>}
        </button>

        {hasSub && isOpen && (
          <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden ml-2">
            {SUB_ITEMS[item.id].map(sub => (
              <button
                key={sub.id}
                onClick={() => { setActive(sub.id); if (onClose) onClose(); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl mb-0.5 transition-all duration-150 text-left pl-8
                  ${active === sub.id ? "bg-indigo-600 text-white shadow-md shadow-indigo-300/40" : "text-slate-500 hover:bg-white/70 hover:text-indigo-700"}`}
              >
                <sub.icon size={14} className={active === sub.id ? "text-white/90" : "text-slate-400"}/>
                <span className="text-[12px] font-medium">{sub.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <aside className="glass w-60 h-full flex flex-col flex-shrink-0 border-r border-white/50">

      {/* Mobile close button row */}
      {onClose && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100/60 lg:hidden">
          <span className="text-sm font-bold text-slate-700">Cloude Data VPS</span>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
            <X size={18}/>
          </button>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto no-sb py-3 px-2.5">
        {MENU_ITEMS.filter(i => i.id === "overview").map(renderMenuItem)}

        {Object.entries(grouped).map(([group, ids]) => (
          <div key={group} className="mb-1">
            <button onClick={() => toggleGroup(group)} className="w-full flex items-center justify-between px-3 py-2 text-slate-400 hover:text-slate-600">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em]">{group}</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${openGroups[group] ? "rotate-180" : ""}`}/>
            </button>
            <AnimatePresence>
              {openGroups[group] && (
                <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden">
                  {ids.map(id => {
                    const item = MENU_ITEMS.find(i => i.id === id);
                    return item && renderMenuItem(item);
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
    </aside>
  );
}

/* ─── Placeholder pages ──────────────────────────────────────────────────── */
const LatestActionPlaceholder = () => (
  <div className="flex flex-col items-center justify-center min-h-[72vh] text-center p-6">
    <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center mb-6">
      <Clock size={34} className="text-indigo-400"/>
    </div>
    <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Latest Actions</h2>
    <p className="text-slate-400 max-w-sm">Recent activities and task history.</p>
  </div>
);


export default function App() {
  const [active,        setActive]        = useState("overview");
  const [sidebarOpen,   setSidebarOpen]   = useState(false);
  const { isMobile, isTablet } = useBreakpoint();
  const isSmall = isMobile || isTablet;

  const { data: instances } = useVpsInstances();

  let MainComponent;
  switch (active) {
    case "overview":     MainComponent = () => <Dashboard setActive={setActive}/>; break;
    case "docker":     MainComponent = () => <Docker setActive={setActive}/>; break;
    case "backupmgr":    MainComponent = SnapShot;                                 break;
    case "ospanel":      MainComponent = OSPanel;                                  break;
    case "blog":         MainComponent = DocumentationPage;                        break;
    case "setting":      MainComponent = VpsSettings;                              break;
    case "firewall":     MainComponent = firewall;                                 break;
    case "SnapShot":     MainComponent = SnapShot;                                 break;
    case "latestaction": MainComponent = LatestActionPlaceholder;                  break;
    // default:             MainComponent = () => <Navigate to={`/vps/${instances?.[0]?.id}/docker`} replace/>;
    default:
      MainComponent = () => (
        <div className="flex flex-col items-center justify-center min-h-[72vh] text-center">
          <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center mb-6">
            <Construction size={34} className="text-indigo-400" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Coming Soon</h2>
          <p className="text-slate-400 max-w-sm">This feature is under development.</p>
        </div>
      );
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "linear-gradient(135deg,#EEF2FF 0%,#F8FAFF 60%,#F5F0FF 100%)" }}>

      {!isSmall && (
        <Sidebar active={active} setActive={setActive}/>
      )}

      <AnimatePresence>
        {isSmall && sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ type: "spring", stiffness: 340, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 w-60"
              style={{ background: "linear-gradient(135deg,#EEF2FF 0%,#F8FAFF 60%,#F5F0FF 100%)" }}
            >
              <Sidebar
                active={active}
                setActive={setActive}
                onClose={() => setSidebarOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Mobile top bar */}
        {isSmall && (
          <header className="flex items-center gap-3 px-4 py-3 border-b border-white/50 bg-white/60 backdrop-blur-sm shrink-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition-colors"
            >
             <GoSidebarCollapse />
            </button>
            <span className="font-bold text-slate-800 text-sm">VPS Dashboard</span>
          </header>
        )}

        <main className="flex-1 overflow-y-auto no-sb">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <MainComponent/>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}