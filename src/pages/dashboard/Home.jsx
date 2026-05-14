import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Server, Globe, Trash2, Layers, CheckCircle,
  ExternalLink, LifeBuoy,
  Mail, HardDrive, Plus, Activity,
  ShoppingCart, ArrowUpRight, ChevronRight, ChevronLeft,
  Zap, IndianRupee, HelpCircle, CreditCard, Bell, User,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore'; // adjust path as needed

/* ─── helpers ─────────────────────────────────────────────── */
const cn = (...c) => c.filter(Boolean).join(' ');

const STATUS_CFG = {
  Active:     { dot: 'bg-emerald-400', pill: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  Processing: { dot: 'bg-amber-400',   pill: 'bg-amber-50  text-amber-700  border-amber-200' },
  Expiring:   { dot: 'bg-red-400',     pill: 'bg-red-50    text-red-700    border-red-200'   },
  Suspended:  { dot: 'bg-slate-400',   pill: 'bg-slate-100 text-slate-600  border-slate-200' },
};

const StatusBadge = React.memo(({ status }) => {
  const cfg = STATUS_CFG[status] || STATUS_CFG.Processing;
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border', cfg.pill)}>
      <span className={cn('w-1.5 h-1.5 rounded-full', cfg.dot, status === 'Active' && 'animate-pulse')} />
      {status}
    </span>
  );
});

const TYPE_GRADIENTS = {
  WordPress:   'from-blue-500 to-blue-600',
  'VPS Cloud': 'from-emerald-500 to-emerald-600',
  Email:       'from-sky-500 to-sky-600',
};

const ServiceIcon = React.memo(({ type, size = 15 }) => {
  const icons = {
    WordPress: <Server size={size} />,
    Domain:    <Globe size={size} />,
    'VPS Cloud':<LifeBuoy size={size} />,
    Email:     <Mail size={size} />,
  };
  return icons[type] || <HardDrive size={size} />;
});

/* animated counter (already optimized) */
const Counter = ({ to }) => {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    let cur = 0;
    const step = to / 72;
    const id = setInterval(() => {
      cur += step;
      if (cur >= to) { setVal(to); clearInterval(id); }
      else setVal(Math.floor(cur));
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [to]);
  return <>{val}</>;
};

/* ─── stat card ──────────────────────────────────────────── */
const StatCard = React.memo(({ label, value, sub, icon: Icon, accent, delay, isCurrency }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/60 shadow-sm p-5 flex items-start gap-4 hover:shadow-md hover:bg-white/80 transition-all"
  >
    <div className={cn('w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0', accent)}>
      <Icon size={20} />
    </div>
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</p>
      <p className="text-2xl font-black text-slate-800 mt-0.5 tabular-nums leading-none flex items-baseline gap-0.5">
        {isCurrency && <IndianRupee size={16} className="text-slate-500" />}
        {typeof value === 'number' ? <Counter to={value} /> : value}
      </p>
      {sub && <p className="text-[11px] text-slate-400 mt-1">{sub}</p>}
    </div>
  </motion.div>
));

/* ─── skeleton loader ───────────────────────────────────── */
const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-slate-200/80 rounded-xl ${className}`} />
);

const TableSkeleton = () => (
  <div className="space-y-4 p-6">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="flex gap-4">
        <Skeleton className="w-9 h-9 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-2 w-1/4" />
        </div>
        <Skeleton className="h-4 w-16 rounded-full" />
      </div>
    ))}
  </div>
);

/* ════════════════════════════════════════════════════════════
   DASHBOARD
════════════════════════════════════════════════════════════ */
const Dashboard = () => {
  const { user: userInfo } = useAuthStore();
  const [loading, setLoading] = useState(true);

  /* ── data state (would be replaced by API calls) ── */
  const [user, setUser] = useState({
    name: userInfo?.name || 'Amit Sharma',
    activeServices: [],
  });
  const [emails, setEmails] = useState([]);
  const [activities, setActivities] = useState([]);

  /* simulate API fetch */
  useEffect(() => {
    const timer = setTimeout(() => {
      setUser({
        name: userInfo?.name || 'Amit Sharma',
        activeServices: [
          { id: 1, type: 'WordPress',  name: 'Portfolio Site',     status: 'Active',     ip: '103.21.45.12', expiry: 'Oct 2026', region: 'Asia Pacific', price: 799 },
          { id: 2, type: 'WordPress',  name: 'Marketing Blog',     status: 'Active',     ip: '103.21.45.13', expiry: 'Dec 2026', region: 'Asia Pacific', price: 799 },
          { id: 3, type: 'VPS Cloud',  name: 'Backend API Server',  status: 'Processing', ip: 'Pending',      expiry: 'Nov 2026', region: 'US East', price: 1599 },
          // Email service removed from Active Infrastructure
        ],
      });
      setEmails([
        { id: 1, address: 'admin@cloudedata.io',   label: 'Admin',   quota: 25, used: 4.2 },
        { id: 2, address: 'support@cloudedata.io', label: 'Support', quota: 25, used: 11.7 },
        { id: 3, address: 'billing@cloudedata.io', label: 'Billing', quota: 10, used: 2.1 },
        { id: 4, address: 'dev@cloudedata.io',     label: 'Dev',     quota: 25, used: 0.3 },
      ]);
      setActivities([
        { id: 1, action: 'SSL certificate auto‑renewed',  service: 'Portfolio Site',     time: '5m ago',  type: 'success' },
        { id: 2, action: 'VPS deployment initiated',       service: 'Backend API Server', time: '22m ago', type: 'info' },
        { id: 3, action: 'Bandwidth alert triggered',      service: 'Marketing Blog',     time: '1h ago',  type: 'warning' },
        { id: 4, action: 'Backup completed',               service: 'Portfolio Site',     time: '3h ago',  type: 'success' },
        { id: 5, action: 'New email account created',      service: 'Business Mail',      time: '5h ago',  type: 'info' },
      ]);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [userInfo]);

  /* ── filter & pagination state ── */
  const [filterType, setFilterType] = useState('All');
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  /* ── derived data ── */
  const activeServices = useMemo(() => user.activeServices || [], [user.activeServices]);
  const activeCount = useMemo(() => activeServices.filter(s => s.status === 'Active').length, [activeServices]);
  const inactiveCount = activeServices.length - activeCount;

  const totalMonthlyCost = useMemo(
    () => activeServices.reduce((sum, s) => sum + (s.price || 0), 0),
    [activeServices]
  );

  const allTypes = useMemo(() => ['All', ...Array.from(new Set(activeServices.map(s => s.type)))], [activeServices]);
  const filtered = filterType === 'All' ? activeServices : activeServices.filter(s => s.type === filterType);

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const displayedServices = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterType]);

  const displayedActivities = showAllActivities ? activities : activities.slice(0, 3);

  /* ── actions ── */
  const addActivity = useCallback((action, service) => {
    setActivities(prev => [{ id: Date.now(), action, service, time: 'Just now', type: 'info' }, ...prev].slice(0, 20));
  }, []);

  const handleDeleteService = useCallback((id, name) => {
    if (window.confirm(`Delete "${name}"?`)) {
      setUser(prev => ({ ...prev, activeServices: prev.activeServices.filter(s => s.id !== id) }));
      addActivity(`Removed service: ${name}`, name);
    }
  }, [addActivity]);

  const handleDeleteEmail = useCallback((id, address) => {
    if (window.confirm(`Delete mailbox "${address}"?`)) {
      setEmails(prev => prev.filter(e => e.id !== id));
      addActivity(`Removed mailbox: ${address}`, 'Business Mail');
    }
  }, [addActivity]);

  const getGreeting = useCallback(() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  /* popular services — prices in INR */
  const popularServices = useMemo(() => [
    { name: 'WordPress Hosting', desc: 'Managed WordPress with auto‑updates, daily backups & CDN.', price: '₹61/mo', icon: Server, color: 'from-blue-500 to-blue-600', tag: 'Most Popular', path: '/plans/wordpress' },
    { name: 'Business Email',   desc: 'Professional mailboxes @yourdomain, spam protection & webmail.', price: '₹399/mo', icon: Mail, color: 'from-sky-500 to-sky-600', tag: 'Essential',   path: '/plans/email' },
    { name: 'VPS Cloud Servers',desc: 'NVMe SSD, dedicated IP, root access, DDoS protection.', price: '₹899/mo', icon: LifeBuoy, color: 'from-emerald-500 to-emerald-600', tag: 'Best Value',  path: '/plans/vps' },
  ], []);

  const goTo = useCallback((path) => {
    if (path) window.location.href = path; // replace with your router
  }, []);

  /* activity dot colors */
  const actDot = { success: 'bg-emerald-400', warning: 'bg-amber-400', info: 'bg-blue-400' };

  return (
    <div className="min-h-screen bg-[#F4F5F9] font-sans relative overflow-hidden">
      {/* Ambient futuristic blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-20 w-[36rem] h-[36rem] bg-indigo-200/15 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/4 right-0 w-[28rem] h-[28rem] bg-cyan-200/15 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-0 left-1/3 w-[24rem] h-[24rem] bg-violet-200/15 rounded-full blur-3xl animate-float-slow" />
        {/* subtle grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE4YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDR6TTM2IDI2YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 relative z-10 space-y-6 sm:space-y-8">
        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-[22px] sm:text-[26px] font-black text-slate-900">
              {getGreeting()}, {user.name}
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Your cloud command center - everything at a glance.
            </p>
          </div>
          {/* No billing/monthly cost display as before */}
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard label="Total Services" value={activeServices.length} icon={Layers}      accent="bg-indigo-500"  sub="Across all regions" delay={0} />
          <StatCard label="Active"         value={activeCount}          icon={CheckCircle} accent="bg-emerald-500" sub="Fully operational"  delay={0.07} />
          <StatCard label="Inactive"       value={inactiveCount}        icon={LifeBuoy}    accent="bg-amber-500"   sub="Needs attention"    delay={0.14} />
          {/* ─── Email stat card COMMENTED OUT ─── */}
          {/* <StatCard label="Email Accounts" value={emails.length} icon={Mail} accent="bg-sky-500" sub="Business mailboxes" delay={0.28} /> */}
        </div>

        {/* ─── Main Content ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* ── Services Table ── */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/60 shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-100/60 flex flex-wrap gap-3 items-center justify-between">
              <div className="flex items-center gap-2">
                <Server size={15} className="text-indigo-600" />
                <h2 className="font-black text-[15px] text-slate-900">Active Infrastructure</h2>
                {activeServices.length > 0 && (
                  <span className="text-[10px] font-black bg-indigo-100 text-indigo-600 w-5 h-5 rounded-full flex items-center justify-center">
                    {activeServices.length}
                  </span>
                )}
              </div>
              {activeServices.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {allTypes.map(t => (
                    <button key={t} onClick={() => setFilterType(t)}
                      className={cn('text-[11px] font-bold px-3 py-1 rounded-lg border transition',
                        filterType === t ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white/60 backdrop-blur-sm text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600')}>
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {loading ? (
              <TableSkeleton />
            ) : activeServices.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
                  <Server size={32} className="text-indigo-300" />
                </div>
                <h3 className="text-lg font-black text-slate-800 mb-2">No services yet</h3>
                <p className="text-sm text-slate-500 max-w-xs">Start building your cloud infrastructure in seconds.</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[580px]">
                    <thead>
                      <tr className="text-[10px] uppercase tracking-[0.1em] text-slate-400 bg-slate-50/50">
                        <th className="px-6 py-3 text-left font-bold">Service</th>
                        <th className="px-5 py-3 text-left font-bold">Status</th>
                        <th className="px-5 py-3 text-left font-bold hidden md:table-cell">IP / Endpoint</th>
                        <th className="px-5 py-3 text-left font-bold hidden lg:table-cell">Region</th>
                        <th className="px-5 py-3 text-left font-bold">Price</th>
                        <th className="px-5 py-3 text-right font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {displayedServices.map((svc, idx) => (
                          <motion.tr key={svc.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ delay: idx * 0.04 }}
                            className="border-t border-slate-100/60 hover:bg-white/50 transition group"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className={cn('w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-sm shrink-0', TYPE_GRADIENTS[svc.type] || 'from-slate-400 to-slate-500')}>
                                  <ServiceIcon type={svc.type} />
                                </div>
                                <div>
                                  <p className="font-bold text-slate-800 text-[13px]">{svc.name}</p>
                                  <p className="text-[11px] text-slate-400">{svc.type}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4"><StatusBadge status={svc.status} /></td>
                            <td className="px-5 py-4 hidden md:table-cell">
                              <code className="text-[11px] text-slate-500 bg-slate-100/80 px-2 py-0.5 rounded font-mono">{svc.ip}</code>
                            </td>
                            <td className="px-5 py-4 hidden lg:table-cell text-[12px] text-slate-500">{svc.region}</td>
                            <td className="px-5 py-4 text-[12px] font-semibold text-slate-700">₹{svc.price}</td>
                            <td className="px-5 py-4 text-right">
                              <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition">
                                <button onClick={() => goTo(`/service/${svc.id}`)}
                                  className="p-1.5 rounded-lg hover:bg-indigo-50 text-indigo-500 transition flex items-center gap-1 text-[11px] font-bold">
                                  <ExternalLink size={14} />
                                  <span className="hidden xl:inline">Dashboard</span>
                                </button>
                                <button onClick={() => handleDeleteService(svc.id, svc.name)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>

                {/* Pagination controls */}
                {totalPages > 1 && (
                  <div className="px-6 py-3 border-t border-slate-100/60 flex items-center justify-between text-xs">
                    <span className="text-slate-400">
                      Page {currentPage} of {totalPages} ({filtered.length} services)
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-indigo-50 disabled:opacity-30"
                      >
                        <ChevronLeft size={14} />
                      </button>
                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-indigo-50 disabled:opacity-30"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.section>

          {/* ── Right Sidebar ── */}
          <aside className="space-y-5">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34 }}
              className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/60 shadow-sm p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-black text-[14px] text-slate-900">Quick Actions</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Deploy WP',   path: '/websites/wordpress' },
                  { label: 'Buy VPS',   path: '/vps' },
                  { label: 'Subscriptions',     path: '/billing/subscriptions' },
                  { label: 'Billing-History',     path: '/payment-history' },
                  
                ].map(item => (
                  <motion.button key={item.label} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    onClick={() => goTo(item.path)}
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-50/70 hover:bg-white hover:shadow transition text-slate-700 text-[12px] font-bold">
                    <ArrowUpRight size={14} className="text-indigo-500" />
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
              className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/60 shadow-md p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-black text-[14px] text-slate-900">Recent Activity</h3>
              </div>
              <div className="space-y-3">
                {displayedActivities.map((a, i) => (
                  <div key={a.id} className="flex items-start gap-3">
                    <div className={cn('w-2 h-2 rounded-full mt-1 shrink-0', actDot[a.type] || 'bg-slate-300')} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-slate-700 leading-snug">{a.action}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] text-slate-400">{a.service}</span>
                        <span className="text-[10px] text-slate-300">·</span>
                        <span className="text-[10px] text-slate-400">{a.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {activities.length > 3 && (
                <button
                  onClick={() => setShowAllActivities(!showAllActivities)}
                  className="mt-3 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition w-full text-left"
                >
                  {showAllActivities ? 'Show less' : `View all (${activities.length})`}
                </button>
              )}
            </motion.div>

            {/* Email Summary – bar replaced by Coming Soon */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42 }}
              className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/60 shadow-sm p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Mail size={15} className="text-sky-500" />
                  <h3 className="font-black text-[14px] text-slate-900">Email Summary</h3>
                </div>
                <button onClick={() => goTo('/email/new')} className="text-[11px] font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1">
                  <Plus size={12} /> Add
                </button>
              </div>
              {/* Bar & usage text replaced by Coming Soon */}
              <div className="flex flex-col items-center justify-center py-6 text-slate-400 bg-slate-50/80 rounded-xl">
                <Mail size={28} className="text-sky-300 mb-2" />
                <span className="text-sm font-bold text-slate-500">Coming Soon</span>
              </div>
            </motion.div>
          </aside>
        </div>

        {/* ─── New Services (prices in INR) ─── */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="font-black text-[15px] text-slate-900">Add New Services</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {popularServices.map((s, i) => (
              <motion.div key={s.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.46 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/60 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className={cn('h-1.5 w-full bg-gradient-to-r', s.color)} />
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn('w-11 h-11 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white shadow-sm', s.color)}>
                      <s.icon size={20} />
                    </div>
                    <span className="text-[10px] font-bold bg-slate-100/80 text-slate-500 px-2 py-0.5 rounded-full">{s.tag}</span>
                  </div>
                  <h3 className="font-black text-slate-900 text-[15px]">{s.name}</h3>
                  <p className="text-[12px] text-slate-500 mt-1.5 leading-relaxed flex-1">{s.desc}</p>
                  {s.path ? (
                    <div className="mt-5 flex items-end justify-between">
                      <div>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Starting from</p>
                        <p className="text-[20px] font-black text-slate-900 leading-none mt-0.5">{s.price}</p>
                      </div>
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={() => goTo(s.path)}
                        className={cn('flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-black text-white shadow-sm bg-gradient-to-r', s.color)}>
                        Deploy <ArrowUpRight size={14} />
                      </motion.button>
                    </div>
                  ) : (
                    /* Email card: Coming Soon instead of price & button */
                    <div className="mt-5 flex items-center justify-center bg-slate-100/80 rounded-xl py-4">
                      <span className="text-sm font-bold text-slate-500">Coming Soon</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* ─── Footer ─── */}
      <footer className="border-t border-slate-200 bg-white/60 backdrop-blur-md mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <span>&copy; 2026 CloudeData Infrastructure · All rights reserved.</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />All Systems Operational</span>
            <span>·</span>
            <a href="#" className="hover:text-slate-600 transition">Privacy</a>
            <a href="#" className="hover:text-slate-600 transition">Terms</a>
            <a href="#" className="hover:text-slate-600 transition">Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;