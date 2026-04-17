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
  LayoutDashboard
} from 'lucide-react';
import { useSubscription } from '../../hooks/useBilling';


const navItems = [
  { label: 'Home', to: '/dashboard', icon: Home },
  { 
    label: 'Websites', 
    icon: Globe, 
    children: [
      { label: 'WordPress', to: '/websites/wordpress' },
      {label: 'Your WordPress', to: 'websites/wordpress/paid'},
      { label: 'PHP',       to: '/websites/php' },
      { label: 'HTML',      to: '/websites/html' },
      { label: 'NodeJS',    to: '/websites/nodejs' },
    ]
  },
  { label: 'Hosting',   to: '/websites/hosting',   icon: Server },
  {
    label: 'Billing',
    icon: CreditCard,
    children: [
      { label: 'Plans',           to: '/plans' },
      { label: 'Billing',         to: '/billing' },
      {label: 'Billing-History', to:"/billing/history"}
    ],
  },
  { label: 'Settings', to: '/settings', icon: Settings },
];

export default function Sidebar({ mobileOpen = false, onMobileClose = () => {} }) {
  const [hovered, setHovered] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();

  const subscription = useSubscription();

  // subscription status
  const isSubscriptionActive =
    subscription?.data?.status === "active";

  console.log("your data active:", isSubscriptionActive);

  const isExpanded = hovered || mobileOpen;

  const navItems = [
    // { label: 'Home', to: '/dashboard', icon: Home },
    { label: 'Home', to: '/home', icon: Home },


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

        { label: 'PHP', to: '/websites/php' },
        { label: 'HTML', to: '/websites/html' },
        { label: 'NodeJS', to: '/websites/nodejs' },
      ],
    },

    { label: 'VPS', to: '/vps', icon: Home },


    // { label: 'Hosting', to: '/websites/hosting', icon: Server },

    {
      label: 'Billing',
      icon: CreditCard,
      children: [
        { label: 'Plans', to: '/plans' },
        { label: 'Billing', to: '/billing' },
        { label: 'Billing-History', to: '/billing/history' },
      ],
    },

    { label: 'Settings', to: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay with Blur */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
            className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-md md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setOpenMenu(null); }}
        animate={{ 
          width: mobileOpen ? '280px' : (isExpanded ? '260px' : '80px'),
          x: (mobileOpen || window.innerWidth > 768) ? 0 : -350 
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
        className="fixed md:sticky top-0 left-0 h-screen z-[70] flex flex-col bg-white border-r border-slate-100 shadow-[20px_0_50px_rgba(0,0,0,0.02)]"
      >
        {/* Animated Logo Section */}
        <div className="h-24 flex items-center px-5 justify-between relative">
          <div className="flex items-center gap-4 cursor-pointer group">
            <motion.div 
              animate={{ 
                y: [0, -4, 0],
                filter: ["drop-shadow(0px 0px 0px #6366f100)", "drop-shadow(0px 4px 12px #6366f140)", "drop-shadow(0px 0px 0px #6366f100)"]
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-200"
            >
              <Cloudy size={26} className="text-white fill-white/10" />
            </motion.div>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex flex-col"
                >
                  <span className="font-black text-slate-800 text-xl tracking-tight leading-none">
                    Cloude<span className="text-indigo-600">Data</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-1">v2.0 Pro</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {mobileOpen && (
            <button onClick={onMobileClose} className="p-2 rounded-full bg-slate-50 text-slate-400 hover:text-indigo-600 transition-colors">
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto scrollbar-hide">
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
                      w-full flex items-center gap-4 rounded-2xl px-3 py-3.5 text-sm font-semibold transition-all group
                      ${isMenuOpen ? 'bg-indigo-50/50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                    `}
                  >
                    <Icon size={22} strokeWidth={isMenuOpen ? 2.5 : 2} className="shrink-0 transition-transform group-hover:scale-110" />
                    {isExpanded && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        <ChevronRight size={16} className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : 'opacity-40'}`} />
                      </>
                    )}
                  </button>
                ) : (
                  <NavLink
                    to={item.to}
                    onClick={() => mobileOpen && onMobileClose()}
                    className={({ isActive }) => `
                      relative flex items-center gap-4 rounded-2xl px-3 py-3.5 text-sm font-semibold transition-all group
                      ${isActive 
                        ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                      }
                    `}
                  >
                    <Icon size={22} strokeWidth={2} className="shrink-0 transition-transform group-hover:scale-110" />
                    {isExpanded && <span>{item.label}</span>}
                    
                    {/* Active Indicator Line */}
                    {isActive && isExpanded && (
                      <motion.div layoutId="activeTab" className="absolute right-2 w-1 h-5 bg-white/40 rounded-full" />
                    )}
                  </NavLink>
                )}

                {/* Submenu with floating effect */}
                <AnimatePresence>
                  {hasChildren && isMenuOpen && isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, y: -10 }}
                      animate={{ height: 'auto', opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -10 }}
                      className="ml-10 mt-2 space-y-1 border-l-2 border-slate-100 pl-4"
                    >
                      {item.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          className={({ isActive }) => `
                            block py-2 text-sm font-medium transition-all rounded-lg px-2
                            ${isActive ? 'text-indigo-600 bg-indigo-50/30' : 'text-slate-400 hover:text-slate-700 hover:translate-x-1'}
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

        {/* Premium Footer Info */}
        <div className="p-4 mt-auto">
          <div className={`
            p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden
            ${!isExpanded ? 'p-2 flex justify-center' : ''}
          `}>
            {/* Background Decorative Circles */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-indigo-500/20 rounded-full blur-xl" />
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-30" />
              </div>
              {isExpanded && (
                <div className="flex flex-col">
                  <span className="text-[10px] font-black tracking-widest text-slate-300">CLOUD STATUS</span>
                  <span className="text-[11px] font-bold text-white">All Nodes Active</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}