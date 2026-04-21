import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  CreditCard,
  Globe,
  Home,
  Server,
  Settings,
  X, 
  Cloudy,
  Zap,
  LayoutDashboard,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { useSubscription } from '../../hooks/useBilling';
import { useMe } from '../../hooks/useAuth';

export default function Sidebar({ mobileOpen = false, onMobileClose = () => {} }) {
  const [hovered, setHovered] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();
  const subscription = useSubscription();

  const isSubscriptionActive = subscription?.data?.status === "active";
  const isExpanded = hovered || mobileOpen;

  const userRoles = useMe()
  const Roles = userRoles?.data?.role

  const isSuperAdmin = Roles === "superadmin"

  console.log("this is our role", isSuperAdmin)

  // Optimized NavItems
  const navItems = [
    { label: 'Home', to: '/home', icon: LayoutDashboard },
    {
      label: 'Websites',
      icon: Globe,
      children: [
        ...(isSubscriptionActive
          ? []
          : [{ label: 'WordPress', to: '/websites/wordpress' }]),
        ...(isSubscriptionActive
          ? [{ label: 'Your WordPress', to: '/websites/wordpress/paid' }]
          : []),
        { label: 'PHP Hosting', to: '/websites/php' },
        { label: 'Static HTML', to: '/websites/html' },
        { label: 'NodeJS App', to: '/websites/nodejs' },
      ],
    },
    // VPS Redirect is now correct
    { label: 'Cloud VPS', to: '/vps', icon: Zap }, 
    {
      label: 'Billing',
      icon: CreditCard,
      children: [
        { label: 'Plans', to: '/plans' },
        { label: 'Payment Methods', to: '/billing' },
        { label: 'Invoices', to: '/billing/history' },
      ],
    },
    ...(isSuperAdmin ?[{ label: 'SuperAdmin', to: '/superadmin', icon: Zap }]: [] ),
    { label: 'Settings', to: '/settings', icon: Settings },
  ];

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
            className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setOpenMenu(null); }}
        animate={{ 
          width: mobileOpen ? '280px' : (isExpanded ? '260px' : '84px'),
          x: (mobileOpen || window.innerWidth > 768) ? 0 : -350 
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed md:sticky top-0 left-0 h-screen z-[70] flex flex-col bg-white border-r border-slate-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
      >
        {/* Brand Logo Section */}
        <div className="h-20 flex items-center px-6 justify-between overflow-hidden">
          <div className="flex items-center gap-4 cursor-pointer min-w-max">
            <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-100 ring-4 ring-indigo-50">
              <Cloudy size={24} className="text-white" />
            </div>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex flex-col"
                >
                  <span className="font-black text-slate-900 text-lg tracking-tight">
                    Cloude<span className="text-indigo-600">Data</span>
                  </span>
                  <span className="text-[9px] text-indigo-500 font-bold tracking-[0.2em] uppercase">V2.0 ENTERPRISE</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const hasChildren = !!item.children;
            const isMenuOpen = openMenu === item.label;
            const isActive = location.pathname.startsWith(item.to) && !hasChildren;

            return (
              <div key={item.label} className="relative">
                {hasChildren ? (
                  <button
                    onClick={() => setOpenMenu(isMenuOpen ? null : item.label)}
                    className={`
                      w-full flex items-center gap-4 rounded-xl px-3 py-3 text-sm font-bold transition-all group
                      ${isMenuOpen ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                    `}
                  >
                    <Icon size={20} className={`shrink-0 transition-all ${isMenuOpen ? 'scale-110' : 'group-hover:scale-110'}`} />
                    {isExpanded && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        <ChevronRight size={14} className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-90 text-indigo-400' : 'opacity-30'}`} />
                      </>
                    )}
                  </button>
                ) : (
                  <NavLink
                    to={item.to}
                    onClick={() => mobileOpen && onMobileClose()}
                    className={({ isActive }) => `
                      relative flex items-center gap-4 rounded-xl px-3 py-3 text-sm font-bold transition-all group
                      ${isActive 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                      }
                    `}
                  >
                    <Icon size={20} className="shrink-0 group-hover:scale-110 transition-transform" />
                    {isExpanded && <span>{item.label}</span>}
                    
                    {isActive && isExpanded && (
                      <motion.div layoutId="activeHighlight" className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full" />
                    )}
                  </NavLink>
                )}

                {/* Submenu */}
                <AnimatePresence>
                  {hasChildren && isMenuOpen && isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-9 mt-1 space-y-1 border-l border-slate-100 pl-3"
                    >
                      {item.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          className={({ isActive }) => `
                            block py-2 px-3 text-[13px] font-semibold transition-all rounded-lg
                            ${isActive ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-400 hover:text-slate-700 hover:pl-4'}
                          `}
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Footer Status Section */}
        <div className="p-4 mt-auto">
          <div className={`
            p-4 rounded-2xl bg-slate-900 text-white relative overflow-hidden transition-all
            ${!isExpanded ? 'p-2.5 flex justify-center' : ''}
          `}>
            {isExpanded ? (
              <div className="relative z-10 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase">System Integrity</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-400">99.9%</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <ShieldCheck size={16} className="text-indigo-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold">Secure Cloud</span>
                    <span className="text-[9px] text-slate-400">All Nodes Active</span>
                  </div>
                </div>
              </div>
            ) : (
              <Activity size={18} className="text-emerald-400 animate-pulse" />
            )}
            
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent pointer-events-none" />
          </div>
        </div>
      </motion.aside>
    </>
  );
}