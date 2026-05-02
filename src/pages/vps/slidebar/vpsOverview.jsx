import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import {
  LayoutDashboard, Cpu, HardDrive, Clock, Zap, Bell,
  ChevronDown, ChevronRight, Server, Shield, Key, Lock,
  Container, BookOpen, Rss, Archive, LifeBuoy,
  TerminalSquare, Globe, Wifi, Activity, RefreshCw, Power,
  TrendingUp, Database, BarChart3, Rocket, Construction,
  Upload, Download, ExternalLink, Calendar, RotateCw, Square,
  Fingerprint, BadgeCheck, AlertCircle, FolderArchive,
  Pause,
  Play,
  Eye,
  EyeOff
} from "lucide-react";

import BackupManager from "./BackupManager";
import SnapShot from "./SnapShot";
import OSPanel from "./Os_panel";
import DocumentationPage from "./docs";
import VpsSettings from "./setting";
import firewall from "./security/firewall";
import { 
  useVpsInstance, useVpsStats, useStartVps, 
  useStopVps, useRebootVps, useVpsStatus, usePoweroffVps, useVpsMetrics
} from '../../../hooks/useVps';
import { useNavigate, useParams } from "react-router-dom";



const generateRandomData = (length = 12, base = 20, range = 15) =>
  Array.from({ length }, (_, i) => ({ time: i, value: Math.floor(Math.random() * range) + base }));

// Modified graph: only line, no fill
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

const DetailItem = ({ label, value, icon, action, valueClassName = "" }) => (
  <div className="flex flex-wrap justify-between items-center py-3 border-b border-gray-100 last:border-0">
    <span className="text-slate-500 text-[13px] font-medium">{label}:</span>
    <div className="flex items-center gap-2">
      <span className={`text-slate-800 text-sm font-semibold flex items-center gap-1 ${valueClassName}`}>{icon} {value}</span>
      {action && action}
    </div>
  </div>
);

// Security status card component (no longer used directly, wrapped in button)
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

// ========== REDESIGNED DASHBOARD (Overview) ==========
function Dashboard({ setActive }) {


   const { id } = useParams();
    const navigate = useNavigate();
    const { data: instance, isLoading: isInstanceLoading } = useVpsInstance(id);
    const { data: statsData, isLoading: isStatsLoading } = useVpsStats(id);
     const { data: metricsData, isLoading: isMetricsLoading } = useVpsMetrics(id, 5000);
     const { 
    data: statusData, 
    isLoading: isStatusLoading, 
    refetch: refetchStatus 
  } = useVpsStatus(id);

    const poweroffVps = usePoweroffVps();
    
    const startVps = useStartVps();
    const stopVps = useStopVps();
    const rebootVps = useRebootVps();
     const vpsStatus = statusData?.status === 'running' ? 'running' : 'stopped';
      const isActionLoading = startVps.isPending || stopVps.isPending || rebootVps.isPending || poweroffVps.isPending;


       const [cpuHistory, setCpuHistory] = useState([]);
  const [ramHistory, setRamHistory] = useState([]);
  const [diskHistory, setDiskHistory] = useState([]);
  const [incomingHistory, setIncomingHistory] = useState([]);
  const [outgoingHistory, setOutgoingHistory] = useState([]);
  const [bandwidthHistory, setBandwidthHistory] = useState([]);

  const [showPassword, setShowPassword] = useState(false);

  const [currentMetrics, setCurrentMetrics] = useState({
    cpu: 0,
    ram: 0,
    disk: 0,
    incoming: 0,
    outgoing: 0,
    bandwidth: 0,
  });
  

    const timeCounter = useRef()

      useEffect(() => {
    if (metricsData) {
      const newMetrics = {
        cpu: metricsData.cpu || 0,
        ram: metricsData.ram || 0,
        disk: metricsData.disk || 0,
        incoming: metricsData.incoming || 0,
        outgoing: metricsData.outgoing || 0,
        bandwidth: metricsData.bandwidth || 0,
      };
      
      setCurrentMetrics(newMetrics);
      
      // Update history arrays (keep last 12 points)
      const timePoint = { time: timeCounter.current++, value: newMetrics.cpu };
      setCpuHistory(prev => [...prev.slice(-11), timePoint]);
      
      setRamHistory(prev => [...prev.slice(-11), { time: timeCounter.current, value: newMetrics.ram }]);
      setDiskHistory(prev => [...prev.slice(-11), { time: timeCounter.current, value: newMetrics.disk }]);
      setIncomingHistory(prev => [...prev.slice(-11), { time: timeCounter.current, value: newMetrics.incoming }]);
      setOutgoingHistory(prev => [...prev.slice(-11), { time: timeCounter.current, value: newMetrics.outgoing }]);
      setBandwidthHistory(prev => [...prev.slice(-11), { time: timeCounter.current, value: newMetrics.bandwidth }]);
    }
  }, [metricsData]);


   useEffect(() => {
    if (metricsData) {
      const initialHistory = [];
      for (let i = 0; i < 12; i++) {
        initialHistory.push({ time: i, value: 0 });
      }
      setCpuHistory(initialHistory);
      setRamHistory(initialHistory);
      setDiskHistory(initialHistory);
      setIncomingHistory(initialHistory);
      setOutgoingHistory(initialHistory);
      setBandwidthHistory(initialHistory);
    }
  }, []);


    const formattedMetrics = {
    cpu: currentMetrics.cpu.toFixed(1),
    ram: (currentMetrics.ram / 1024).toFixed(2), // Convert MB to GB
    disk: currentMetrics.disk.toFixed(1),
    incoming: (currentMetrics.incoming / 1024).toFixed(1), // Convert KB to MB
    outgoing: (currentMetrics.outgoing / 1024).toFixed(1),
    bandwidth: (currentMetrics.bandwidth / 1024).toFixed(3),
  };


    const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  
  const handleStopVPS = () => {
  if (vpsStatus === "running") {
    stopVps.mutate(id);
    setVpsStatus("stopped");
  } else {
    startVps.mutate(id);
    setVpsStatus("running");
  }
};


 const handlePowerOff = () => {
    if (window.confirm(' Are you sure you want to power off the VPS? This will forcefully shut down the server and may cause data loss.')) {
      poweroffVps.mutate(id, {
        onSuccess: () => {
          setTimeout(() => {
            refetchStatus();
          }, 3000);
        }
      });
    }
  };

  const handleRenew = () => alert("Renewal process started");
  const handleUpgrade = () => alert("Upgrade plan dialog");
  const handleChangePassword = () => alert("Change password functionality");

    const handleToggleVPS = async () => {
    if (vpsStatus === 'running') {
      await stopVps.mutateAsync(id);
    } else {
      await startVps.mutateAsync(id);
    }
    // Refetch status after action
    setTimeout(() => {
      refetchStatus();
    }, 3000);
  };

    const handleReboot = async () => {
    await rebootVps.mutateAsync(id);
    setTimeout(() => {
      refetchStatus();
    }, 5000);
  };
  

    const getStatusConfig = () => {
    if (isStatusLoading) {
      return { color: 'bg-yellow-500', text: 'Checking...', pulse: true };
    }
    if (vpsStatus === 'running') {
      return { color: 'bg-green-500', text: 'Running', pulse: true };
    }
    return { color: 'bg-red-500', text: 'Stopped', pulse: false };
  };
  
  const statusConfig = getStatusConfig();


  if (isInstanceLoading) {
    return <div className="p-8 text-center">Loading instance details...</div>;
  }

  if (!instance) {
    return <div className="p-8 text-center text-red-500">Instance not found.</div>;
  }

  const stats = statsData?.stats || {};

  const lastThree = instance?.ip ? instance.ip.split('.').pop() : '';

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full space-y-6 bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-slate-800">  VPS</span>
            <span className="text-slate-300 text-xl font-light">/</span>
            <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Overview</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">VPS management</p>
        </div>
      </div>

      {/* VPS Status Card */}
      <div className="bg-white rounded-2xl border border-black/10 shadow-lg overflow-hidden">
        <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Globe size={18} className="text-indigo-500" />
                <span className="font-bold text-slate-800 text-lg">{instance?.os}</span>
              </div>
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                vpsStatus === 'running' 
                  ? 'bg-green-50 text-green-700 border-green-200' 
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.color} ${statusConfig.pulse ? 'animate-pulse' : ''}`} />
                {statusConfig.text}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Key size={14} className="text-indigo-500" />
              <span className="text-xs font-medium text-slate-500">SSH Access:</span>
              <code className="text-xs bg-slate-100 px-2 py-1 rounded font-mono">
                ssh root@210.56.147.{lastThree}
              </code>
            </div>
              <div className="flex items-center gap-2">
        <Lock size={14} className="text-amber-500" />
        <span className="text-xs font-medium text-slate-500">Root password:</span>
        <div className="flex items-center gap-2 bg-slate-100 px-2 py-1 rounded-lg">
          <code className="text-xs font-mono">
            {showPassword ? (instance.rootPassword) : "•".repeat(instance?.rootPassword?.length || 8)}
          </code>
          <button
            onClick={togglePasswordVisibility}
            className="text-slate-500 hover:text-indigo-600 transition-colors"
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
        <button 
          onClick={() => setActive("setting")}
          className="text-sm font-semibold cursor-pointer text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
        >
          Change <ExternalLink size={12} />
        </button>
      </div>
          </div>
          <div className="flex flex-col gap-2">
            <button 
              onClick={handleToggleVPS}
              disabled={isActionLoading || isStatusLoading}
              className={`flex items-center cursor-pointer gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                vpsStatus === 'running'
                  ? 'bg-red-50 border border-red-200 hover:bg-red-100 text-red-700'
                  : 'bg-green-50 border border-green-200 hover:bg-green-100 text-green-700'
              } ${(isActionLoading || isStatusLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {(startVps.isPending || stopVps.isPending) ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  {vpsStatus === 'running' ? 'Stopping...' : 'Starting...'}
                </>
              ) : (
                <>
                  {vpsStatus === 'running' ? <Pause  size={16} /> : <Play  size={14} />}
                  {vpsStatus === 'running' ? 'Stop VPS' : 'Start VPS'}
                </>
              )}
            </button>
                {vpsStatus === 'running' && (
              <button 
                onClick={handleReboot}
                disabled={isActionLoading}
                className={`flex items-center border border-amber-200 cursor-pointer gap-1.5 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 text-sm font-semibold rounded-lg transition-all ${
                  isActionLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {rebootVps.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Rebooting...
                  </>
                ) : (
                  <>
                    <RotateCw size={14} />
                    Restart VPS
                  </>
                )}
              </button>
            )}

                <button 
          onClick={handlePowerOff}
          disabled={isActionLoading || isStatusLoading || vpsStatus !== 'running'}
          className={`flex items-center cursor-pointer gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
            poweroffVps.isPending
              ? 'bg-gray-100 text-gray-500 border border-gray-200'
              : 'bg-emerald-100 border border-emerald-300 hover:bg-emerald-200 text-black-700'
          } ${(isActionLoading || isStatusLoading || vpsStatus !== 'running') ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {poweroffVps.isPending ? (
            <>
              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
              Powering Off...
            </>
          ) : (
            <>
              <Power size={14} />
              Power Off
            </>
          )}
        </button>
            </div>
        </div>
      </div>

      {/* 6 Mini Graphs (line only) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

 
        <MetricGraph 
          title="CPU Usage" 
          icon={Cpu} 
          unit="%" 
          currentValue={formattedMetrics.cpu} 
          data={cpuHistory} 
        />
        <MetricGraph 
          title="RAM Used" 
          icon={Database} 
          unit=" GB" 
          currentValue={formattedMetrics.ram} 
          data={ramHistory} 
        />
        <MetricGraph 
          title="Disk Used" 
          icon={HardDrive} 
          unit=" GB" 
          currentValue={formattedMetrics.disk} 
          data={diskHistory} 
        />
        <MetricGraph 
          title="Incoming Traffic" 
          icon={Download} 
          unit=" MB" 
          currentValue={formattedMetrics.incoming} 
          data={incomingHistory} 
        />
        <MetricGraph 
          title="Outgoing Traffic" 
          icon={Upload} 
          unit=" MB" 
          currentValue={formattedMetrics.outgoing} 
          data={outgoingHistory} 
        />
        <MetricGraph 
          title="Bandwidth" 
          icon={Wifi} 
          unit=" GB" 
          currentValue={formattedMetrics.bandwidth} 
          data={bandwidthHistory} 
        />
      
      </div>

      {/* Quick Actions + Uptime */}
      <div className="flex flex-wrap gap-3 justify-between items-center bg-white/80 rounded-xl p-4 border border-black/10 shadow-sm">
        <div className="flex gap-3 flex-wrap">
          {/* <button 
              onClick={handleToggleVPS}
              disabled={isActionLoading || isStatusLoading}
              className={`flex items-center cursor-pointer gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                vpsStatus === 'running'
                  ? 'bg-red-50 border border-red-200 hover:bg-red-100 text-red-700'
                  : 'bg-green-50 border border-green-200 hover:bg-green-100 text-green-700'
              } ${(isActionLoading || isStatusLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {(startVps.isPending || stopVps.isPending) ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  {vpsStatus === 'running' ? 'Stopping...' : 'Starting...'}
                </>
              ) : (
                <>
                  {vpsStatus === 'running' ? <Pause  size={16} /> : <Play  size={14} />}
                  {vpsStatus === 'running' ? 'Stop VPS' : 'Start VPS'}
                </>
              )}
            </button>
         <button 
          onClick={handlePowerOff}
          disabled={isActionLoading || isStatusLoading || vpsStatus !== 'running'}
          className={`flex items-center cursor-pointer gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
            poweroffVps.isPending
              ? 'bg-gray-100 text-gray-500 border border-gray-200'
              : 'bg-red-50 border border-red-200 hover:bg-red-100 text-red-700'
          } ${(isActionLoading || isStatusLoading || vpsStatus !== 'running') ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {poweroffVps.isPending ? (
            <>
              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
              Powering Off...
            </>
          ) : (
            <>
              <Power size={14} />
              Power Off
            </>
          )}
        </button> */}

      <div className="flex items-center justify-between py-3 border-b border-gray-100">
  <span className="text-slate-500 text-[16px] font-medium">Expiration date: &nbsp;</span>
  <div className="flex items-center gap-2">
    <span className="text-[16px] font-semibold text-red-500/90">
      {instance?.expiresAt ? new Date(instance.expiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
    </span>
    
  </div>
</div>


          <button onClick={handleUpgrade} className="flex border border-blue-200 items-center  px-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold rounded-lg transition-all">
            <TrendingUp size={14} /> Upgrade
          </button>
        </div>
        <div className="text-xs text-slate-500 flex items-center bg-slate-100 px-2  rounded-full">
          <Clock size={12} /> Uptime: {instance?.uptime} 
        </div>
      </div>

      {/* Security Status Cards - 3 clickable cards (Malware scanner removed) */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
        {/* <button onClick={() => setActive("setting")} className="text-left w-full">
          <SecurityCard title="SSH key" value="Manage" icon={Key} status="Active" bgColor="bg-indigo-50" />
        </button> */}
        {/* <button onClick={() => setActive("firewall")} className="text-left w-full">
          <SecurityCard title="Firewall rules" value="1" icon={Shield} status="Active" bgColor="bg-blue-50" />
        </button> */}
        <button onClick={() => setActive("backupmgr")} className="text-left w-full">
          <SecurityCard title="Snapshot & backups" value="2" icon={FolderArchive} status="Active" bgColor="bg-purple-50" />
        </button>
      </div>

      {/* VPS Details & Plan Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-black/10 shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4 bg-gray-50/50">
            <div className="flex items-center gap-2"><Server size={18} className="text-indigo-500" /><h3 className="font-extrabold text-slate-800">VPS details</h3></div>
          </div>
          <div className="p-5">
           <DetailItem label="Server location" value={instance?.location}                    icon={<Globe size={12} />} />
<DetailItem label="OS"              value={instance?.os} />
<DetailItem label="Hostname"        value={instance?.hostname} />
<DetailItem label="VPS uptime"      value={instance?.uptime}                      icon={<Clock size={12} />} />
<DetailItem label="SSH username"    value={instance?.sshUsername || 'root'} />
<DetailItem label="IPv4"            value={instance?.ip} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-black/10 shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4 bg-gray-50/50 flex justify-between items-center">
            <div className="flex items-center gap-2"><Database size={18} className="text-indigo-500" /><h3 className="font-extrabold text-slate-800">Plan details</h3></div>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">{instance?.planId?.name}</span>
          </div>
          <div className="p-5 space-y-1">
            <DetailItem 
              label="Current plan" 
              value={instance?.planId?.name}
              action={<button onClick={handleUpgrade} className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md hover:bg-indigo-100">Upgrade</button>}
            />
            <DetailItem 
              label="Expiration date" 
              value={instance?.expiresAt ? new Date(instance.expiresAt).toLocaleDateString() : 'N/A'}
            />
            <DetailItem label="CPU core" value={`${instance?.planId?.vcpu || 1} vCPU`} icon={<Cpu size={12} />} />
            <DetailItem label="Memory" value={instance?.planId?.ram} icon={<Database size={12} />} />
            <DetailItem label="Disk space" value={instance?.planId?.storage} icon={<HardDrive size={12} />} />
          </div>
        </div>
      </div>
    </div>
  );
}


// ========== SIDEBAR WITH SUBOPTIONS ==========
const MENU_ITEMS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },   
  { id: "docker", label: "Docker", icon: Container },
  { id: "backupmgr", label: "Backup Manager", icon: Archive },
  { id: "ospanel", label: "OS & Control Panels", icon: BarChart3 },
  { id: "firewall", label: "firewall", icon: Shield },
  { id: "tutorials", label: "Tutorials", icon: BookOpen },
  { id: "blog", label: "Blog", icon: Rss },
  { id: "setting", label: "Setting", icon: Key },
];

// Sub-items configuration
const SUB_ITEMS = {
  backupmgr: [
    { id: "SnapShot", label: "Snapshot", icon: FolderArchive },
    { id: "serverusage", label: "Server Usage", icon: Activity },
    { id: "latestaction", label: "Latest Action", icon: Clock }
  ]
};

function Sidebar({ active, setActive }) {
  const [openGroups, setOpenGroups] = useState({
    infrastructure: true,
    security: true,
    apps: true,
  });
  const [openSubMenus, setOpenSubMenus] = useState({}); // track which menu items have open submenu

  const toggleGroup = (group) => {
    setOpenGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const toggleSubMenu = (id) => {
    setOpenSubMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const grouped = {
    infrastructure: ["docker", "backupmgr", "ospanel", "setting"],
    security: ["firewall"],
    apps: ["tutorials", "blog"],
  };

  // Helper to render a menu item (could be parent with children)
  const renderMenuItem = (item, isSub = false, parentId = null) => {
    const hasSub = SUB_ITEMS[item.id];
    const isOpen = openSubMenus[item.id];
    const Icon = item.icon;
    const isActive = active === item.id;

    return (
      <div key={item.id} className="mb-0.5">
        <button
          onClick={() => {
            if (hasSub) {
              toggleSubMenu(item.id);
            }
            setActive(item.id);
          }}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 text-left
            ${isActive ? "bg-indigo-600 text-white shadow-md shadow-indigo-300/40" : "text-slate-500 hover:bg-white/70 hover:text-indigo-700"}
            ${isSub ? "pl-5" : ""}
          `}
        >
          <div className="flex items-center gap-2.5">
            <Icon size={isSub ? 14 : 16} className={isActive ? "text-white/90" : "text-slate-400"} />
            <span className={`text-[13px] ${isActive ? "font-bold" : "font-medium"}`}>{item.label}</span>
          </div>
          {hasSub && (
            <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          )}
        </button>
        {hasSub && isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden ml-2">
            {SUB_ITEMS[item.id].map(sub => (
              <button
                key={sub.id}
                onClick={() => setActive(sub.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl mb-0.5 transition-all duration-150 text-left pl-8
                  ${active === sub.id ? "bg-indigo-600 text-white shadow-md shadow-indigo-300/40" : "text-slate-500 hover:bg-white/70 hover:text-indigo-700"}
                `}
              >
                <sub.icon size={14} className={active === sub.id ? "text-white/90" : "text-slate-400"} />
                <span className="text-[12px] font-medium">{sub.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <aside className="glass w-60 h-full flex flex-col flex-shrink-0 border-r border-white/50 z-50">
      <nav className="flex-1 overflow-y-auto no-sb py-3 px-2.5">
        {MENU_ITEMS.filter(item => item.id === "overview").map(item => renderMenuItem(item))}

        {Object.entries(grouped).map(([group, ids]) => (
          <div key={group} className="mb-1">
            <button onClick={() => toggleGroup(group)} className="w-full flex items-center justify-between px-3 py-2 text-slate-400 hover:text-slate-600">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em]">{group}</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${openGroups[group] ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {openGroups[group] && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  {ids.map(id => {
                    const item = MENU_ITEMS.find(i => i.id === id);
                    return item && renderMenuItem(item, false);
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-100/60">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[13px] font-bold rounded-xl shadow-md hover:opacity-90 active:scale-[0.98] transition-all">
          <TerminalSquare size={15} /> Open Terminal
        </button>
      </div>
    </aside>
  );
}

function NavButton({ item, active, setActive, sub }) {
  
  return null;
}

// ----- PLACEHOLDER COMPONENTS FOR SUBPAGES -----
const LicensePlaceholder = () => (
  <div className="flex flex-col items-center justify-center min-h-[72vh] text-center">
    <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center mb-6">
      <BadgeCheck size={34} className="text-indigo-400" />
    </div>
    <h2 className="text-2xl font-extrabold text-slate-800 mb-2">License Management</h2>
    <p className="text-slate-400 max-w-sm">Manage your software licenses and subscriptions.</p>
  </div>
);

const SnapshotPlaceholder = () => (
  <div className="flex flex-col items-center justify-center min-h-[72vh] text-center">
    <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center mb-6">
      <FolderArchive size={34} className="text-indigo-400" />
    </div>
    <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Snapshots</h2>
    <p className="text-slate-400 max-w-sm">Manage VPS snapshots and restores.</p>
  </div>
);

const ServerUsagePlaceholder = () => (
  <div className="flex flex-col items-center justify-center min-h-[72vh] text-center">
    <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center mb-6">
      <Activity size={34} className="text-indigo-400" />
    </div>
    <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Server Usage</h2>
    <p className="text-slate-400 max-w-sm">View detailed server resource usage analytics.</p>
  </div>
);

const LatestActionPlaceholder = () => (
  <div className="flex flex-col items-center justify-center min-h-[72vh] text-center">
    <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center mb-6">
      <Clock size={34} className="text-indigo-400" />
    </div>
    <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Latest Actions</h2>
    <p className="text-slate-400 max-w-sm">Recent activities and task history.</p>
  </div>
);


// ----- MAIN APP (routing with new subpage ids) -----
export default function App() {
  const [active, setActive] = useState("overview");

  let MainComponent;
  switch (active) {
    case "overview":
      MainComponent = () => <Dashboard setActive={setActive} />;
      break;
    case "backupmgr":
      MainComponent = BackupManager;
      break;
    case "ospanel":
      MainComponent = OSPanel;
      break;
    case "blog":
      MainComponent = DocumentationPage;
      break;
    case "setting":
      MainComponent = VpsSettings;
      break;
    case "firewall":
      MainComponent = firewall;
      break;
    // Sub-options for Backup Manager
    case "SnapShot":
      MainComponent = SnapShot;
      break;
    case "serverusage":
      MainComponent = ServerUsagePlaceholder;
      break;
    case "latestaction":
      MainComponent = LatestActionPlaceholder;
      break;
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

  const pageLabel = (() => {
    const found = MENU_ITEMS.find(i => i.id === active);
    if (found) return found.label;
    // Handle subpages label
    if (active === "snapshot") return "Snapshot";
    if (active === "serverusage") return "Server Usage";
    if (active === "latestaction") return "Latest Action";
    return "VPS";
  })();

  return (
    <>
      
      <div className="flex h-screen overflow-hidden" style={{ background: "linear-gradient(135deg,#EEF2FF 0%,#F8FAFF 60%,#F5F0FF 100%)" }}>
        <Sidebar active={active} setActive={setActive} />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <main className="flex-1 overflow-y-auto no-sb">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <MainComponent />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </>
  );
}