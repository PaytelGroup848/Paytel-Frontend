import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import {
  LayoutDashboard, Cpu, HardDrive, Clock, Zap, Bell,
  ChevronDown, ChevronRight, Server, Shield, Key, Lock,
  Container, BookOpen, Rss, Archive, LifeBuoy,
  TerminalSquare, Globe, Wifi, Activity, RefreshCw, Power,
  TrendingUp, Database, BarChart3, Rocket, Construction,
  Upload, Download, ExternalLink, Calendar, RotateCw, Square,
  Fingerprint, BadgeCheck, AlertCircle, FolderArchive
} from "lucide-react";

import BackupManager from "./BackupManager";
import SnapShot from "./SnapShot";
import OSPanel from "./Os_panel";
import DocumentationPage from "./docs";
import VpsSettings from "./setting";
import firewall from "./security/firewall";

// ========== HELPER FUNCTIONS & COMPONENTS FOR THE NEW DASHBOARD ==========
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
  // States for real-time metrics
  const [osName] = useState("Ubuntu 22.04 LTS");
  const [vpsStatus, setVpsStatus] = useState("running");
  const [hostname] = useState("srv1596088.hstgr.cloud");
  const [uptime, setUptime] = useState("1 hour");
  const [expiration, setExpiration] = useState("2026-05-17");
  const [autoRenew, setAutoRenew] = useState(true);

  const [cpu, setCpu] = useState(18);
  const [ram, setRam] = useState(1.24);
  const [disk, setDisk] = useState(15.4);
  const [incoming, setIncoming] = useState(7.6);
  const [outgoing, setOutgoing] = useState(0.1);
  const [bandwidth, setBandwidth] = useState(0.001);

  // Chart data
  const [cpuData, setCpuData] = useState(() => generateRandomData(12, 18, 15));
  const [ramData, setRamData] = useState(() => generateRandomData(12, 1, 1));
  const [diskData, setDiskData] = useState(() => generateRandomData(12, 15, 5));
  const [incomingData, setIncomingData] = useState(() => generateRandomData(12, 7, 3));
  const [outgoingData, setOutgoingData] = useState(() => generateRandomData(12, 0, 1));
  const [bandwidthData, setBandwidthData] = useState(() => generateRandomData(12, 0, 1));

  // Real-time simulation (every 3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      const newCpu = Math.floor(Math.random() * 35) + 5;
      const newRam = Number((Math.random() * 2.5 + 0.8).toFixed(2));
      const newDisk = Number((Math.random() * 20 + 5).toFixed(1));
      const newIncoming = Number((Math.random() * 12 + 1).toFixed(1));
      const newOutgoing = Number((Math.random() * 0.5 + 0.05).toFixed(1));
      const newBandwidth = Number((Math.random() * 0.003 + 0.0005).toFixed(3));

      setCpu(newCpu);
      setRam(newRam);
      setDisk(newDisk);
      setIncoming(newIncoming);
      setOutgoing(newOutgoing);
      setBandwidth(newBandwidth);
      setUptime(prev => {
        let hrs = parseInt(prev) || 1;
        return `${hrs + 1} hours`;
      });

      setCpuData(prev => [...prev.slice(1), { time: prev.length, value: newCpu }]);
      setRamData(prev => [...prev.slice(1), { time: prev.length, value: newRam }]);
      setDiskData(prev => [...prev.slice(1), { time: prev.length, value: newDisk }]);
      setIncomingData(prev => [...prev.slice(1), { time: prev.length, value: newIncoming }]);
      setOutgoingData(prev => [...prev.slice(1), { time: prev.length, value: newOutgoing }]);
      setBandwidthData(prev => [...prev.slice(1), { time: prev.length, value: newBandwidth }]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleReboot = () => alert("Rebooting VPS...");
  const handleStopVPS = () => setVpsStatus(vpsStatus === "running" ? "stopped" : "running");
  const handleRenew = () => alert("Renewal process started");
  const handleUpgrade = () => alert("Upgrade plan dialog");
  const handleChangePassword = () => alert("Change password functionality");

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
                <span className="font-bold text-slate-800 text-lg">{osName}</span>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                vpsStatus === "running" 
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${vpsStatus === "running" ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                KVM | {vpsStatus === "running" ? "Running" : "Stopped"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Key size={14} className="text-indigo-500" />
              <span className="text-xs font-medium text-slate-500">Root access</span>
              <code className="text-sm font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700">ssh root@195.35.21.221</code>
            </div>
            <div className="flex items-center gap-2">
              <Lock size={14} className="text-amber-500" />
              <span className="text-xs font-medium text-slate-500">Root password</span>
              <button onClick={handleChangePassword} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                Change <ExternalLink size={12} />
              </button>
            </div>
          </div>
          <button onClick={handleReboot} className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-md transition-all self-start md:self-center">
            <RotateCw size={16} /> Reboot VPS
          </button>
        </div>
      </div>

      {/* 6 Mini Graphs (line only) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <MetricGraph title="CPU Usage" icon={Cpu} unit="%" currentValue={cpu} data={cpuData} />
        <MetricGraph title="RAM Used" icon={Database} unit=" GB" currentValue={ram} data={ramData} />
        <MetricGraph title="Disk Used" icon={HardDrive} unit=" GB" currentValue={disk} data={diskData} />
        <MetricGraph title="Incoming Traffic" icon={Download} unit=" MB" currentValue={incoming} data={incomingData} />
        <MetricGraph title="Outgoing Traffic" icon={Upload} unit=" MB" currentValue={outgoing} data={outgoingData} />
        <MetricGraph title="Bandwidth" icon={Wifi} unit=" TB" currentValue={bandwidth} data={bandwidthData} />
      </div>

      {/* Quick Actions + Uptime */}
      <div className="flex flex-wrap gap-3 justify-between items-center bg-white/80 rounded-xl p-4 border border-black/10 shadow-sm">
        <div className="flex gap-3 flex-wrap">
          <button onClick={handleStopVPS} className="flex items-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-sm font-semibold rounded-lg transition-all">
            <Square size={14} /> {vpsStatus === 'running' ? 'Stop VPS' : 'Start VPS'}
          </button>
          <button onClick={handleRenew} className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-lg transition-all">
            <RefreshCw size={14} /> Renew
          </button>
          <button onClick={handleUpgrade} className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold rounded-lg transition-all">
            <TrendingUp size={14} /> Upgrade
          </button>
        </div>
        <div className="text-xs text-slate-500 flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
          <Clock size={12} /> Uptime: {uptime}
        </div>
      </div>

      {/* Security Status Cards - 3 clickable cards (Malware scanner removed) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button onClick={() => setActive("setting")} className="text-left w-full">
          <SecurityCard title="SSH key" value="Manage" icon={Key} status="Active" bgColor="bg-indigo-50" />
        </button>
        <button onClick={() => setActive("firewall")} className="text-left w-full">
          <SecurityCard title="Firewall rules" value="1" icon={Shield} status="Active" bgColor="bg-blue-50" />
        </button>
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
            <DetailItem label="Server location" value="India - Mumbai" icon={<Globe size={12} />} />
            <DetailItem label="OS" value={osName} />
            <DetailItem label="Hostname" value={hostname} />
            <DetailItem label="VPS uptime" value={uptime} icon={<Clock size={12} />} />
            <DetailItem label="SSH username" value="root" />
            <DetailItem label="IPv4" value="195.35.21.221" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-black/10 shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4 bg-gray-50/50 flex justify-between items-center">
            <div className="flex items-center gap-2"><Database size={18} className="text-indigo-500" /><h3 className="font-extrabold text-slate-800">Plan details</h3></div>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">KVM 1</span>
          </div>
          <div className="p-5 space-y-1">
            <DetailItem 
              label="Current plan" 
              value="KVM 1" 
              action={<button onClick={handleUpgrade} className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md hover:bg-indigo-100">Upgrade</button>}
            />
            <DetailItem 
              label="Expiration date" 
              value={expiration} 
              action={<button onClick={handleRenew} className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full hover:bg-emerald-100">Renew</button>}
            />
            <DetailItem 
              label="Auto-renewal" 
              value={autoRenew ? "On" : "Off"} 
              icon={autoRenew ? <span className="w-2 h-2 rounded-full bg-emerald-500"></span> : <span className="w-2 h-2 rounded-full bg-red-500"></span>}
            />
            <DetailItem label="CPU core" value="1 vCPU" icon={<Cpu size={12} />} />
            <DetailItem label="Memory" value="4 GB" icon={<Database size={12} />} />
            <DetailItem label="Disk space" value="50 GB NVMe" icon={<HardDrive size={12} />} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ----- GLOBAL STYLES (unchanged) -----
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
    *{font-family:'Plus Jakarta Sans',sans-serif;box-sizing:border-box}
    .mono{font-family:'JetBrains Mono',monospace, letin words, monosspace, ui-monospace}
    .no-sb::-webkit-scrollbar{display:none}.no-sb{-ms-overflow-style:none;scrollbar-width:none}
    .glass{background:rgba(255,255,255,0.75);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px)}
    @keyframes pulse2{0%,100%{opacity:1}50%{opacity:0.4}}
    .animate-pulse{animation:pulse2 2s ease-in-out infinite}
  `}</style>
);

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

// ----- HEADER (unchanged) -----
function Header({ page }) {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 flex items-center justify-between px-7 sticky top-0 z-40">
      <div className="flex items-center gap-2 text-[13px] font-medium text-slate-400">
        <span>CloudeData</span>
        <ChevronRight size={13} />
        <span className="text-indigo-600 font-bold">CLOUDE-MUM-01</span>
        <ChevronRight size={13} />
        <span className="text-slate-600">{page}</span>
      </div>

    </header>
  );
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
      <GlobalStyle />
      <div className="flex h-screen overflow-hidden" style={{ background: "linear-gradient(135deg,#EEF2FF 0%,#F8FAFF 60%,#F5F0FF 100%)" }}>
        <Sidebar active={active} setActive={setActive} />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header page={pageLabel} />
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