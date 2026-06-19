import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Server, Globe, Trash2, Layers, CheckCircle,
  ExternalLink, LifeBuoy,
  Mail, HardDrive, Plus, Activity,
  ShoppingCart, ArrowUpRight, ChevronRight, ChevronLeft,
  Zap, IndianRupee, HelpCircle, CreditCard, Bell, User, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useDashboardData } from '../../hooks/useBilling';
import { useMe } from '../../hooks/useAuth';

import Navbar from "../../components/layout/Navbar";
import Sidebar from '../../components/layout/Sidebar';

/* ─── helpers (unchanged) ──────────────────────────────────── */
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
   DASHBOARD (with fixed Navbar + Sidebar)
════════════════════════════════════════════════════════════ */
const Dashboard = () => {
  const navigate = useNavigate();
  const { data: dashboardData, isLoading: isDashboardLoading } = useDashboardData();
  const { data: userData } = useMe();
  const { user: userInfo } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = useMemo(() => ({
    name: userData?.name || userInfo?.name || 'Amit Sharma',
    activeServices: dashboardData?.infrastructure || [],
  }), [userData, userInfo, dashboardData]);

  const emails = useMemo(() => dashboardData?.emailSummary || [], [dashboardData]);
  const loading = isDashboardLoading;

  const [filterType, setFilterType] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const activeServices = useMemo(() => user.activeServices || [], [user.activeServices]);
  const activeCount = useMemo(() => dashboardData?.stats?.activeServices || 0, [dashboardData]);
  const inactiveCount = useMemo(() => dashboardData?.stats?.inactiveServices || 0, [dashboardData]);
  const emailCount = useMemo(() => dashboardData?.stats?.emailAccounts || 0, [dashboardData]);
  const totalMonthlyCost = useMemo(() => dashboardData?.stats?.totalMonthlyCost || 0, [dashboardData]);

  const allTypes = useMemo(() => ['All', ...Array.from(new Set(activeServices.map(s => s.type)))], [activeServices]);
  const filtered = filterType === 'All' ? activeServices : activeServices.filter(s => s.type === filterType);

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const displayedServices = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  useEffect(() => { setCurrentPage(1); }, [filterType]);

  const goTo = useCallback((path) => {
    if (path) navigate(path);
  }, [navigate]);

  const handleDeleteService = useCallback((id, name) => {
    if (window.confirm(`Delete "${name}"?`)) {
      alert("Delete functionality is managed in individual service dashboards.");
    }
  }, []);

  const getGreeting = useCallback(() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const popularServices = useMemo(() => [
    { name: 'WordPress Hosting', desc: 'Managed WordPress with auto‑updates, daily backups & CDN.', price: '₹61/mo', icon: Server, color: 'from-blue-500 to-blue-600', tag: 'Most Popular', path: '/wordpress-hostings' },
    { name: 'Business Email',   desc: 'Professional mailboxes @yourdomain, spam protection & webmail.', price: '₹25/mo', icon: Mail, color: 'from-sky-500 to-sky-600', tag: 'Quick Launch', path: '/emails' },
    { name: 'VPS Cloud Servers',desc: 'NVMe SSD, dedicated IP, root access, DDoS protection.', price: '₹899/mo', icon: LifeBuoy, color: 'from-emerald-500 to-emerald-600', tag: 'Best Value',  path: '/vps' },
  ], []);

  return (
    /* ⬇️ CHANGED: h-screen + overflow-hidden to lock the viewport */
    <div className="flex h-screen bg-[#F4F5F9] font-sans overflow-hidden">
      {/* Sidebar – now part of the fixed-height flex row, will not scroll */}
      <Sidebar mobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />

      {/* Right column – holds Navbar (fixed) and scrollable main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar stays at the top of this non-scrolling column */}
        <Navbar
          isSidebarOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(prev => !prev)}
        />

        {/* ⬇️ CHANGED: main is now scrollable, everything else stays fixed */}
        <main className="flex-1 relative overflow-y-auto">
          {/* Ambient blobs (inside scrollable area) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-32 -left-20 w-[36rem] h-[36rem] bg-indigo-200/15 rounded-full blur-3xl animate-float" />
            <div className="absolute top-1/4 right-0 w-[28rem] h-[28rem] bg-cyan-200/15 rounded-full blur-3xl animate-float-delayed" />
            <div className="absolute bottom-0 left-1/3 w-[24rem] h-[24rem] bg-violet-200/15 rounded-full blur-3xl animate-float-slow" />
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
                  {getGreeting()}, {user.name.split(' ')[0]}!
                </h1>
                <p className="text-sm text-slate-500 mt-0.5">
                  Your cloud command center - everything at a glance.
                </p>
              </div>
            </motion.div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <StatCard label="Total Services" value={activeServices.length} icon={Layers}      accent="bg-indigo-500"  sub="Across all regions" delay={0} />
              <StatCard label="Active"         value={activeCount}          icon={CheckCircle} accent="bg-emerald-500" sub="Fully operational"  delay={0.07} />
              <StatCard label="Needs Attention" value={inactiveCount}        icon={Activity}    accent="bg-amber-500"   sub="Check status"       delay={0.14} />
              <StatCard label="Email Orders"   value={emailCount}           icon={Mail}        accent="bg-sky-500"     sub="Business mail"      delay={0.21} />
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
                                    <button onClick={() => {
                                      if (svc.type === 'WordPress') goTo(`/wordpress/websitedashboard/${svc.id}`);
                                      else if (svc.type === 'VPS Cloud') goTo(`/vps/paid/${svc.id}`);
                                      else if (svc.type === 'Email') goTo(`/emails`);
                                    }}
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
                      { label: 'Deploy WP',   path: '/wordpress-hostings' },
                      { label: 'Add Email',   path: '/emails' },
                      { label: 'Billing-History',     path: '/payment-history' },
                      { label: 'Support',     path: '/Support' },
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

                {/* Email Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42 }}
                  className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/60 shadow-sm p-5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Mail size={15} className="text-sky-500" />
                      <h3 className="font-black text-[14px] text-slate-900">Email Hosting</h3>
                    </div>
                    <button onClick={() => goTo('/emails')} className="text-[11px] font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1">
                      Manage
                    </button>
                  </div>
                  
                  {emails.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-6 text-slate-400 bg-slate-50/80 rounded-xl">
                      <Mail size={28} className="text-sky-300 mb-2" />
                      <span className="text-sm font-bold text-slate-500">No mailboxes yet</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {emails.slice(0, 5).map((e) => (
                        <div key={e.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
                              <Mail size={14} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[12px] font-bold text-slate-800 truncate">{e.address}</p>
                              <p className="text-[10px] text-slate-400">{e.domain}</p>
                            </div>
                          </div>
                          <div className={cn('w-1.5 h-1.5 rounded-full', e.status === 'Active' ? 'bg-emerald-400' : 'bg-slate-300')} />
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </aside>
            </div>

            {/* ─── New Services ─── */}
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
                        <div className="mt-5 flex items-end justify-between">
                          <div>
                            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Starting from</p>
                            <p className="text-[20px] font-black text-slate-900 leading-none mt-0.5">{s.price}</p>
                          </div>
                          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/email/plan")}
                            className={cn('flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-black text-white shadow-sm bg-gradient-to-r', s.color)}>
                            Deploy <ArrowUpRight size={14} />
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </main>

        {/* Footer – stays at bottom of the scrollable area */}
        <footer className="border-t border-slate-200 bg-white/60 backdrop-blur-md">
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
    </div>
  );
};

export default Dashboard;