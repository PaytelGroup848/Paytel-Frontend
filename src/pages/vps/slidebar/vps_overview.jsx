import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import {
  LayoutDashboard, Cpu, HardDrive, Clock, Zap, Bell,
  ChevronDown, ChevronRight, Server, History, Shield, Key, Lock,
  Container, BookOpen, Rss, Archive, LifeBuoy, BookMarked,
  TerminalSquare, Globe, Wifi, Activity, RefreshCw, Power,
  TrendingUp, Database, BarChart3, Rocket, Construction
} from "lucide-react";

/* ─── Font + global styles ─── */
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
    *{font-family:'Plus Jakarta Sans',sans-serif;box-sizing:border-box}
    .mono{font-family:'JetBrains Mono',monospace}
    .no-sb::-webkit-scrollbar{display:none}.no-sb{-ms-overflow-style:none;scrollbar-width:none}
    .glass{background:rgba(255,255,255,0.75);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px)}
    @keyframes pulse2{0%,100%{opacity:1}50%{opacity:0.4}}
    @keyframes up{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
    .float{animation:up 3.5s ease-in-out infinite}
    .live-dot{animation:pulse2 2s ease-in-out infinite}
  `}</style>
);

/* ─── Route config — add new pages here ─── */
const ROUTES = [
  {
    group: null,
    items: [
      { id: "dashboard", label: "Dashboard",    icon: LayoutDashboard, ready: true  },
      { id: "analytics", label: "Performance",  icon: BarChart3,       ready: false },
    ],
  },
  {
    group: "Infrastructure",
    items: [
      { id: "vps",     label: "VPS Instances", icon: Server,   ready: false },
      { id: "storage", label: "Disk & Storage",icon: HardDrive,ready: false },
      { id: "backups", label: "Backups",        icon: History,  ready: false },
    ],
  },
  {
    group: "Security",
    items: [
      { id: "firewall",label: "Firewall",       icon: Shield,   ready: false },
      { id: "ssh",     label: "SSH Keys",       icon: Key,      ready: false },
      { id: "ssl",     label: "SSL / Access",   icon: Lock,     ready: false },
    ],
  },
  {
    group: "Apps",
    items: [
      { id: "docker",   label: "Docker",        icon: Container,ready: false },
      { id: "tutorials",label: "Tutorials",     icon: BookOpen, ready: false },
      { id: "blog",     label: "Blog",          icon: Rss,      ready: false },
      { id: "backupmgr",label: "Backup Manager",icon: Archive,  ready: false },
    ],
  },
  {
    group: "Support",
    items: [
      { id: "guides",   label: "Guides",        icon: BookMarked, ready: false },
      { id: "help",     label: "Get Help",      icon: LifeBuoy,   ready: false },
    ],
  },
];

/* ─── Mock data ─── */
const mkChart = (n = 24) =>
  Array.from({ length: n }, (_, i) => ({
    t: i,
    cpu: Math.floor(Math.random() * 22) + 8,
    net: Math.floor(Math.random() * 60) + 15,
  }));

const SERVER = {
  name: "CLOUDE-MUM-01",
  ip: "195.35.21.221",
  os: "Ubuntu 24.04 LTS",
  region: "Mumbai, IN",
  kernel: "6.8.0-39-generic",
  hypervisor: "KVM / QEMU",
  cpu_model: "AMD EPYC\u2122 7763",
  bandwidth: "10 Gbps",
  uptime: "2d 17h 42m",
};

/* ══════════════════════════════════
   SIDEBAR
══════════════════════════════════ */
function Sidebar({ active, setActive }) {
  const [open, setOpen] = useState({ Infrastructure: true, Security: false, Apps: false, Support: false });

  return (
    <aside className="glass w-60 h-full flex flex-col flex-shrink-0 border-r border-white/50 z-50">
      <div className="h-16 px-5 flex items-center gap-3 border-b border-slate-100/60">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200">
          <Zap size={15} fill="white" className="text-white" />
        </div>
        <div>
          <p className="font-extrabold text-[14px] text-slate-800 tracking-tight leading-none">CloudeData</p>
          <p className="text-[10px] text-emerald-500 font-semibold mt-0.5 flex items-center gap-1">
            <span className="live-dot w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            All systems go
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto no-sb py-3 px-2.5">
        {ROUTES.map((section) =>
          section.group ? (
            <div key={section.group} className="mb-1">
              <button
                onClick={() => setOpen(p => ({ ...p, [section.group]: !p[section.group] }))}
                className="w-full flex items-center justify-between px-3 py-2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.14em]">{section.group}</span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${open[section.group] ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {open[section.group] && (
                  <motion.div
                    key="sub"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="overflow-hidden"
                  >
                    {section.items.map(item => <NavBtn key={item.id} item={item} active={active} setActive={setActive} sub />)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div key="top" className="mb-3">
              {section.items.map(item => <NavBtn key={item.id} item={item} active={active} setActive={setActive} />)}
            </div>
          )
        )}
      </nav>

      <div className="p-3 border-t border-slate-100/60">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[13px] font-bold rounded-xl shadow-md shadow-indigo-200/60 hover:opacity-90 active:scale-[0.98] transition-all">
          <TerminalSquare size={15} /> Open Terminal
        </button>
      </div>
    </aside>
  );
}

function NavBtn({ item, active, setActive, sub }) {
  const Icon = item.icon;
  const isActive = active === item.id;

  // --- Naya logic yahan se ---
  const handleNavigation = () => {
    if (item.id === "blog") {
      // Direct redirect to the specific path
      window.location.href = "/vps/support/docs";
    } else {
      // Normal state update for other pages
      setActive(item.id);
    }
  };
  // ---------------------------

  return (
    <button
      onClick={handleNavigation} // setActive ki jagah handleNavigation use karein
      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl mb-0.5 transition-all duration-150 text-left
        ${isActive ? "bg-indigo-600 text-white shadow-md shadow-indigo-300/40" : "text-slate-500 hover:bg-white/70 hover:text-indigo-700"}
        ${sub ? "pl-5" : ""}
      `}
    >
      <Icon size={sub ? 14 : 16} className={isActive ? "text-white/90" : "text-slate-400"} />
      <span className={`text-[13px] ${isActive ? "font-bold" : "font-medium"} flex-1`}>{item.label}</span>
      
      {/* Blog ke liye SOON ki jagah kuch aur dikha sakte hain ya hide kar sakte hain */}
      {!item.ready && !isActive && (
        <span className="text-[9px] font-bold bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-full">
          {item.id === 'blog' ? 'LINK' : 'SOON'}
        </span>
      )}
    </button>
  );
}

/* ══════════════════════════════════
   HEADER
══════════════════════════════════ */
function Header({ page }) {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 flex items-center justify-between px-7 sticky top-0 z-40">
      <div className="flex items-center gap-2 text-[13px] font-medium text-slate-400">
        <span>CloudeData</span>
        <ChevronRight size={13} />
        <span className="text-indigo-600 font-bold">{SERVER.name}</span>
        <ChevronRight size={13} />
        <span className="text-slate-600">{page}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold px-3 py-1.5 rounded-full">
          <span className="live-dot w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
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

/* ══════════════════════════════════
   DASHBOARD PAGE
══════════════════════════════════ */
function DashboardPage({ stats, chart }) {
  const s = (i) => ({ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.35 } } });

  return (
    <div className="p-7 space-y-6 max-w-[1400px] mx-auto w-full">

      {/* Hero */}
      <motion.div variants={s(0)} initial="hidden" animate="show"
        className="relative overflow-hidden rounded-2xl p-7 text-white"
        style={{ background: "linear-gradient(135deg,#3730A3 0%,#4F46E5 45%,#7C3AED 100%)" }}
      >
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/5" />
        <div className="absolute bottom-0 left-1/2 w-32 h-32 rounded-full bg-violet-400/10" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex-1">
            <p className="text-indigo-200 text-[11px] font-bold uppercase tracking-widest mb-1">Active Server</p>
            <h1 className="text-3xl font-extrabold tracking-tight">{SERVER.name}</h1>
            <p className="text-indigo-300 text-sm mt-1.5 mono">{SERVER.ip} · {SERVER.os}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Plan",      val: "4 vCPU / 8 GB", icon: Cpu     },
              { label: "Storage",   val: "80 GB NVMe",    icon: HardDrive },
              { label: "Region",    val: SERVER.region,   icon: Globe   },
              { label: "Bandwidth", val: SERVER.bandwidth, icon: Wifi   },
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
          { title: "CPU Usage",  val: `${stats.cpu}%`,    sub: "4 cores",       icon: Cpu,      accent: "#4F46E5", bg: "#EEF2FF", pct: stats.cpu },
          { title: "RAM Used",   val: `${stats.ram} GB`,  sub: "of 8 GB",       icon: Database, accent: "#7C3AED", bg: "#F5F3FF", pct: (stats.ram/8)*100 },
          { title: "Disk Used",  val: `${stats.disk} GB`, sub: "of 80 GB NVMe", icon: HardDrive,accent: "#0EA5E9", bg: "#F0F9FF", pct: (stats.disk/80)*100 },
          { title: "Uptime",     val: stats.uptime,       sub: "99.98% SLA",    icon: Clock,    accent: "#059669", bg: "#ECFDF5", pct: null },
        ].map((m, i) => (
          <motion.div key={m.title} variants={s(i + 1)} initial="hidden" animate="show"
            className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-xl" style={{ background: m.bg, color: m.accent }}>
                <m.icon size={20} />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: m.bg, color: m.accent }}>
                {m.sub}
              </span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m.title}</p>
            <p className="text-2xl font-extrabold text-slate-800 mt-0.5">{m.val}</p>
            {m.pct !== null && (
              <div className="mt-3 h-1 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${m.pct}%` }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: m.accent }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Chart + Server spec */}
      <div className="grid grid-cols-12 gap-5">
        <motion.div variants={s(5)} initial="hidden" animate="show"
          className="col-span-12 lg:col-span-8 bg-white rounded-2xl border border-slate-200/60 shadow-sm"
        >
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-800 text-[15px]">Resource Usage</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">CPU % · Network Mbps · live every 3s</p>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full">
              <span className="live-dot w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" /> Live
            </div>
          </div>
          <div className="p-5 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chart} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
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
                <Tooltip
                  contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", fontSize: 12 }}
                  formatter={(v, n) => [`${v}${n === "cpu" ? "%" : " Mbps"}`, n === "cpu" ? "CPU" : "Network"]}
                />
                <Area type="monotone" dataKey="cpu" stroke="#4F46E5" strokeWidth={2.5} fill="url(#gcpu)" dot={false} activeDot={{ r: 4, fill: "#4F46E5" }} />
                <Area type="monotone" dataKey="net" stroke="#06B6D4" strokeWidth={2} fill="url(#gnet)" dot={false} activeDot={{ r: 4, fill: "#06B6D4" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="px-6 pb-4 flex gap-5">
            {[["#4F46E5", "CPU %"], ["#06B6D4", "Network Mbps"]].map(([c, l]) => (
              <div key={l} className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 rounded" style={{ background: c }} />
                <span className="text-[11px] text-slate-500 font-medium">{l}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          <motion.div variants={s(6)} initial="hidden" animate="show"
            className="bg-slate-900 rounded-2xl p-6 text-white flex-1 relative overflow-hidden"
          >
            <div className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full bg-indigo-500/10" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 mb-4">Server Details</p>
            <div className="space-y-3 relative z-10">
              {[
                ["CPU",        SERVER.cpu_model],
                ["Hypervisor", SERVER.hypervisor],
                ["Kernel",     SERVER.kernel],
                ["Uptime",     SERVER.uptime],
                ["Region",     SERVER.region + " \uD83C\uDDEE\uD83C\uDDF3"],
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
          </motion.div>

          <motion.div variants={s(7)} initial="hidden" animate="show"
            className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-4"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Quick Actions</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: RefreshCw, label: "Reboot"  },
                { icon: Activity,  label: "Console" },
                { icon: TrendingUp,label: "Upgrade" },
              ].map(({ icon: Icon, label }) => (
                <button key={label} className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-500 transition-all text-[11px] font-semibold">
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* System info strip */}
      <motion.div variants={s(8)} initial="hidden" animate="show"
        className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden"
      >
        <div className="px-6 py-3.5 bg-slate-50/60 border-b border-slate-100 flex items-center justify-between">
          <span className="font-extrabold text-slate-800 text-[13px]">System Information</span>
          <button className="flex items-center gap-1.5 text-[12px] font-semibold text-indigo-600 hover:underline">
            <RefreshCw size={12} /> Refresh
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
          {[
            { label: "CPU Model",  value: SERVER.cpu_model  },
            { label: "Network",    value: SERVER.bandwidth  },
            { label: "Hypervisor", value: SERVER.hypervisor },
            { label: "Storage",    value: "NVMe SSD Gen4"   },
          ].map(({ label, value }) => (
            <div key={label} className="p-5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
              <p className="text-[13px] font-bold text-slate-800">{value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════
   COMING SOON — for unbuilt routes
══════════════════════════════════ */
function ComingSoon({ id }) {
  let label = id, Icon = Rocket;
  ROUTES.forEach(s => s.items.forEach(item => {
    if (item.id === id) { label = item.label; Icon = item.icon; }
  }));

  return (
    <div className="flex flex-col items-center justify-center min-h-[72vh] text-center px-4">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center mb-6 float"
      >
        <Icon size={34} className="text-indigo-400" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.12 } }}
        className="text-2xl font-extrabold text-slate-800 mb-2"
      >
        {label}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.18 } }}
        className="text-slate-400 text-[14px] max-w-sm leading-relaxed"
      >
        This page hasn&apos;t been built yet. Add a page component and set{" "}
        <code className="mono text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded text-[12px]">ready: true</code>{" "}
        in <code className="mono text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded text-[12px]">ROUTES</code> to enable it.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.24 } }}
        className="flex items-center gap-3 mt-8"
      >
        <span className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-[12px] font-bold px-4 py-2 rounded-full">
          <Construction size={14} /> Coming Soon
        </span>
        <code className="text-[12px] text-slate-400 mono bg-slate-100 px-3 py-1.5 rounded-full">/{id}</code>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════
   ROOT
══════════════════════════════════ */
export default function App() {
  const [active, setActive] = useState("dashboard");
  const [stats, setStats] = useState({ cpu: 18, ram: 1.24, disk: 15.4, uptime: "2d 17h 42m" });
  const [chart, setChart] = useState(mkChart());

  useEffect(() => {
    const t = setInterval(() => {
      const cpu = Math.floor(Math.random() * 24) + 8;
      setStats(p => ({ ...p, cpu }));
      setChart(p => [...p.slice(1), { t: p.length, cpu, net: Math.floor(Math.random() * 60) + 15 }]);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  let pageLabel = "Dashboard";
  ROUTES.forEach(s => s.items.forEach(item => { if (item.id === active) pageLabel = item.label; }));

  const isReady = ROUTES.flatMap(s => s.items).find(i => i.id === active)?.ready;

  return (
    <>
      <G />
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
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              >
                {isReady
                  ? <DashboardPage stats={stats} chart={chart} />
                  : <ComingSoon id={active} />
                }
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </>
  );
}