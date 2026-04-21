import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import {
  LayoutDashboard, Cpu, HardDrive, Clock, Zap, Bell,
  ChevronDown, ChevronRight, Server, Shield, Key, Lock,
  Container, BookOpen, Rss, Archive, LifeBuoy,
  TerminalSquare, Globe, Wifi, Activity, RefreshCw, Power,
  TrendingUp, Database, BarChart3, Rocket, Construction
} from "lucide-react";

import BackupManager from "./BackupManager";
import OSPanel from "./Os_panel";
import DocumentationPage from "./docs";
import VpsSettings from "./setting";

// Dashboard component (Overview content)
function Dashboard({ stats, chart }) {
  return (
    <div className="p-7 space-y-6 max-w-[1400px] mx-auto w-full">
      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl p-7 text-white"
        style={{ background: "linear-gradient(135deg,#3730A3 0%,#4F46E5 45%,#7C3AED 100%)" }}
      >
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex-1">
            <p className="text-indigo-200 text-[11px] font-bold uppercase tracking-widest mb-1">Active Server</p>
            <h1 className="text-3xl font-extrabold tracking-tight">CLOUDE-MUM-01</h1>
            <p className="text-indigo-300 text-sm mt-1.5 mono">195.35.21.221 · Ubuntu 24.04 LTS</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Plan", val: "4 vCPU / 8 GB", icon: Cpu },
              { label: "Storage", val: "80 GB NVMe", icon: HardDrive },
              { label: "Region", val: "Mumbai, IN", icon: Globe },
              { label: "Bandwidth", val: "10 Gbps", icon: Wifi },
            ].map(({ label, val, icon: Icon }) => (
              <div key={label} className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 border border-white/10">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Icon size={11} className="text-indigo-200" />
                  <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider">{label}</p>
                </div>
                <p className="text-[13px] font-bold mono leading-tight">{val}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "CPU Usage", val: `${stats.cpu}%`, sub: "4 cores", icon: Cpu, accent: "#4139ce", bg: "#EEF2FF", pct: stats.cpu },
          { title: "RAM Used", val: `${stats.ram} GB`, sub: "of 8 GB", icon: Database, accent: "#7C3AED", bg: "#F5F3FF", pct: (stats.ram/8)*100 },
          { title: "Disk Used", val: `${stats.disk} GB`, sub: "of 80 GB NVMe", icon: HardDrive, accent: "#0EA5E9", bg: "#F0F9FF", pct: (stats.disk/80)*100 },
          { title: "Uptime", val: stats.uptime, sub: "99.98% SLA", icon: Clock, accent: "#059669", bg: "#ECFDF5", pct: null },
        ].map((m, i) => (
          <motion.div key={m.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 hover:-translate-y-0.5 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-xl" style={{ background: m.bg, color: m.accent }}>
                <m.icon size={20} />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: m.bg, color: m.accent }}>{m.sub}</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m.title}</p>
            <p className="text-2xl font-extrabold text-slate-800 mt-0.5">{m.val}</p>
            {m.pct !== null && (
              <div className="mt-3 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${m.pct}%`, background: m.accent }} />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Chart + Server details */}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl border border-slate-200/60 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-800 text-[15px]">Resource Usage</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">CPU % · Network Mbps · live every 3s</p>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" /> Live
            </div>
          </div>
          <div className="p-5 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chart}>
                <defs>
                  <linearGradient id="gcpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gnet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.22} />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", fontSize: 12 }} />
                <Area type="monotone" dataKey="cpu" stroke="#4F46E5" strokeWidth={2.5} fill="url(#gcpu)" dot={false} />
                <Area type="monotone" dataKey="net" stroke="#06B6D4" strokeWidth={2} fill="url(#gnet)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full bg-indigo-500/10" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 mb-4">Server Details</p>
            <div className="space-y-3 relative z-10">
              {[
                ["CPU", "AMD EPYC™ 7763"],
                ["Hypervisor", "KVM / QEMU"],
                ["Kernel", "6.8.0-39-generic"],
                ["Uptime", "2d 17h 42m"],
                ["Region", "Mumbai, IN 🇮🇳"],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between items-center">
                  <span className="text-[12px] text-white/45 font-medium">{l}</span>
                  <span className="text-[11px] font-semibold mono text-white/90">{v}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 transition-all">
              <Power size={14} /> Manage Node
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Quick Actions</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: RefreshCw, label: "Reboot" },
                { icon: Activity, label: "Console" },
                { icon: TrendingUp, label: "Upgrade" },
              ].map(({ icon: Icon, label }) => (
                <button key={label} className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-500 transition-all text-[11px] font-semibold">
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----- GLOBAL STYLES -----
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
    *{font-family:'Plus Jakarta Sans',sans-serif;box-sizing:border-box}
    .mono{font-family:'JetBrains Mono',monospace}
    .no-sb::-webkit-scrollbar{display:none}.no-sb{-ms-overflow-style:none;scrollbar-width:none}
    .glass{background:rgba(255,255,255,0.75);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px)}
    @keyframes pulse2{0%,100%{opacity:1}50%{opacity:0.4}}
    .animate-pulse{animation:pulse2 2s ease-in-out infinite}
  `}</style>
);

// ----- SIDEBAR (fixed) -----
const MENU_ITEMS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },   // ← Overview added as default
  { id: "docker", label: "Docker", icon: Container },
  { id: "backupmgr", label: "Backup Manager", icon: Archive },
  { id: "ospanel", label: "OS & Control Panels", icon: BarChart3 },
  { id: "firewall", label: "Firewall", icon: Shield },
  { id: "tutorials", label: "Tutorials", icon: BookOpen },
  { id: "blog", label: "Blog", icon: Rss },
  { id: "help", label: "Get Help", icon: LifeBuoy },
  { id: "setting", label: "Setting", icon: Key },
];

function Sidebar({ active, setActive }) {
  const [openGroups, setOpenGroups] = useState({
    infrastructure: true,
    security: false,
    apps: true,
    support: false,
  });

  const toggleGroup = (group) => {
    setOpenGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const grouped = {
    infrastructure: ["docker", "backupmgr", "ospanel", "setting"],
    security: ["firewall"],
    apps: ["tutorials", "blog"],
    support: ["help"],
  };

  return (
    <aside className="glass w-60 h-full flex flex-col flex-shrink-0 border-r border-white/50 z-50">
      <div className="h-16 px-5 flex items-center gap-3 border-b border-slate-100/60">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200">
          <Zap size={15} fill="white" className="text-white" />
        </div>
        <div>
          <p className="font-extrabold text-[14px] text-slate-800 tracking-tight leading-none">CloudeData</p>
          <p className="text-[10px] text-emerald-500 font-semibold mt-0.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            All systems go
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto no-sb py-3 px-2.5">
        {/* Overview is ungrouped and shown first */}
        {MENU_ITEMS.filter(item => item.id === "overview").map(item => (
          <NavButton key={item.id} item={item} active={active} setActive={setActive} />
        ))}

        {/* Infrastructure group */}
        <div className="mb-1">
          <button onClick={() => toggleGroup("infrastructure")} className="w-full flex items-center justify-between px-3 py-2 text-slate-400 hover:text-slate-600">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em]">Infrastructure</span>
            <ChevronDown size={12} className={`transition-transform duration-200 ${openGroups.infrastructure ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {openGroups.infrastructure && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                {grouped.infrastructure.map(id => {
                  const item = MENU_ITEMS.find(i => i.id === id);
                  return item && <NavButton key={item.id} item={item} active={active} setActive={setActive} sub />;
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Security group */}
        <div className="mb-1">
          <button onClick={() => toggleGroup("security")} className="w-full flex items-center justify-between px-3 py-2 text-slate-400 hover:text-slate-600">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em]">Security</span>
            <ChevronDown size={12} className={`transition-transform ${openGroups.security ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {openGroups.security && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                {grouped.security.map(id => {
                  const item = MENU_ITEMS.find(i => i.id === id);
                  return item && <NavButton key={item.id} item={item} active={active} setActive={setActive} sub />;
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Apps group */}
        <div className="mb-1">
          <button onClick={() => toggleGroup("apps")} className="w-full flex items-center justify-between px-3 py-2 text-slate-400 hover:text-slate-600">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em]">Apps</span>
            <ChevronDown size={12} className={`transition-transform ${openGroups.apps ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {openGroups.apps && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                {grouped.apps.map(id => {
                  const item = MENU_ITEMS.find(i => i.id === id);
                  return item && <NavButton key={item.id} item={item} active={active} setActive={setActive} sub />;
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Support group */}
        <div className="mb-1">
          <button onClick={() => toggleGroup("support")} className="w-full flex items-center justify-between px-3 py-2 text-slate-400 hover:text-slate-600">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em]">Support</span>
            <ChevronDown size={12} className={`transition-transform ${openGroups.support ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {openGroups.support && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                {grouped.support.map(id => {
                  const item = MENU_ITEMS.find(i => i.id === id);
                  return item && <NavButton key={item.id} item={item} active={active} setActive={setActive} sub />;
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <div className="p-3 border-t border-slate-100/60">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[13px] font-bold rounded-xl shadow-md hover:opacity-90 active:scale-[0.98] transition-all">
          <TerminalSquare size={15} /> Open Terminal
        </button>
      </div>
    </aside>
  );
}

// NavButton component
function NavButton({ item, active, setActive, sub }) {
  const Icon = item.icon;
  const isActive = active === item.id;

  return (
    <button
      onClick={() => setActive(item.id)}
      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl mb-0.5 transition-all duration-150 text-left
        ${isActive ? "bg-indigo-600 text-white shadow-md shadow-indigo-300/40" : "text-slate-500 hover:bg-white/70 hover:text-indigo-700"}
        ${sub ? "pl-5" : ""}
      `}
    >
      <Icon size={sub ? 14 : 16} className={isActive ? "text-white/90" : "text-slate-400"} />
      <span className={`text-[13px] ${isActive ? "font-bold" : "font-medium"} flex-1`}>{item.label}</span>
      {item.id === "docker" && !isActive && (
        <span className="text-[9px] font-bold bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-full">SOON</span>
      )}
    </button>
  );
}

// ----- HEADER -----
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
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Running
        </div>
        <button className="relative p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-[12px] font-black shadow-sm">
          CD
        </div>
      </div>
    </header>
  );
}

// ----- MAIN APP -----
export default function App() {
  // Default active is now "overview"
  const [active, setActive] = useState("overview");
  const [stats, setStats] = useState({ cpu: 18, ram: 1.24, disk: 15.4, uptime: "2d 17h 42m" });
  const [chart, setChart] = useState(() => 
    Array.from({ length: 24 }, (_, i) => ({ t: i, cpu: Math.random() * 22 + 8, net: Math.random() * 60 + 15 }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newCpu = Math.floor(Math.random() * 24) + 8;
      setStats(prev => ({ ...prev, cpu: newCpu }));
      setChart(prev => [...prev.slice(1), { t: prev.length, cpu: newCpu, net: Math.floor(Math.random() * 60) + 15 }]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  let MainComponent;
  switch (active) {
    case "overview":
      MainComponent = () => <Dashboard stats={stats} chart={chart} />;
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

  const pageLabel = MENU_ITEMS.find(i => i.id === active)?.label || "VPS";

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