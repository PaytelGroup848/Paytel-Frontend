// Sidebar.jsx (fully updated)
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, supportsFlags } from 'framer-motion';
import {
  ChevronRight,
  CreditCard,
  Globe,
  Settings,
  X,
  Cloudy,
  Zap,
  LayoutDashboard,
  LogOut,
  LifeBuoy,
  Mails,
  SeparatorVertical,
  Cloud
} from 'lucide-react';
import { useSubscription } from '../../hooks/useBilling';
import { useLogout, useMe } from '../../hooks/useAuth';

export default function Sidebar({ mobileOpen = false, onMobileClose = () => { } }) {
  const [hovered, setHovered] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const location = useLocation();
  const subscription = useSubscription();
  const logout = useLogout();

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const subscriptions = Array.isArray(subscription?.data) ? subscription.data : [];
  const hasWordPress = subscriptions.some(s => s.type === 'wordpress' && s.status === 'Active');
  const hasVps = subscriptions.some(s => s.type === 'vps' && s.status === 'Active');

  const isExpanded = isDesktop ? (hovered || mobileOpen) : mobileOpen;

  const userRoles = useMe();
  const Roles = userRoles?.data?.role;
  const isSuperAdmin = Roles === "superadmin";


  const navItems = [
    { label: 'Home', to: '/home', icon: LayoutDashboard },
    {
      label: 'Websites',
      icon: Globe,
      children: [
        { label: 'Buy WordPress', to: '/websites/wordpress' },
        ...(hasWordPress ? [{ label: 'WordPress Dashboard', to: '/websites/wordpress/paid' }] : []),
        { label: 'PHP/HTML', to: '/websites/php' },
        { label: 'NodeJS App', to: '/websites/nodejs' },
        // { label: 'PHP/HTML', to: '/comingsoon' },
        // { label: 'NodeJS App', to: '/comingsoon' },
      ].filter(Boolean), // filter out any falsy values
    },
    {
      label: 'Cloud VPS',
      icon: Cloud,
      children: [
        { label: 'VPS Plans', to: '/vps' },
        ...(hasVps ? [{ label: 'VPS Dashboard', to: '/vps/paid' }] : []),
      ].filter(Boolean),
    },
    {
      label: 'Software', icon: SeparatorVertical, children: [
        //  { label: 'Education ERP', to: '/comingsoon' },
        { label: 'Education ERP', to: 'software/education' },
        { label: 'Resturants Management', to: 'software/restaurants' },
        //  { label: 'Resturants Management', to: '/comingsoon' },
      ]
    },

    {
      label: 'Billing',
      icon: CreditCard,
      children: [
        { label: 'Subscriptions', to: '/billing/subscriptions' },
        { label: 'Payment-history', to: '/payment-history' },
      ],
    },
    {
      label: 'Emails',
      icon: Mails,
      children: [
        { label: 'Buy Emails', to: '/email/plan' },
        { label: 'Email Dashboard', to: '/emails' },
      ],
    },
    // { label: 'Emails', to: '/emails', icon: Mails },
    // { label: 'Emails', to: '/comingsoon', icon: Mails },

    ...(isSuperAdmin ? [{ label: 'SuperAdmin', to: '/superadmin/servers', icon: Zap }] : []),
    { label: 'Settings', to: '/settings', icon: Settings },
    { label: 'Support', to: '/Support', icon: LifeBuoy },
    // { label: 'Support', to: '/comingsoon', icon: LifeBuoy },
  ];
  const handleMouseEnter = () => {
    if (isDesktop) setHovered(true);
  };
  const handleMouseLeave = () => {
    if (isDesktop) {
      setHovered(false);
      setOpenMenu(null);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
            className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>



      <motion.aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          width: mobileOpen ? '280px' : (isExpanded ? '260px' : '84px'),
          x: mobileOpen || isDesktop ? 0 : -350,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed md:sticky top-0 left-0 h-screen z-[70] flex flex-col bg-white/95 backdrop-blur-xl border-r border-slate-100 shadow-2xl shadow-slate-200/50"
      >
        {/* Brand Section with Close Button on Mobile */}
        <div className="h-20 flex items-center px-5 justify-between overflow-hidden border-b border-slate-100/80">
          <div className="flex items-center gap-3 cursor-pointer min-w-max">

            <div className="relative flex items-center justify-center w-12 h-12">
              <motion.img
                src="/Cloudedatalogo.svg"
                alt="Cloude Data Logo"
                className="
      w-10 h-10
      object-contain
      drop-shadow-xl
      group-hover:scale-110
      transition-transform duration-300
    "
                animate={{ y: [0, -2, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
              />
            </div>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex flex-col"
                >
                  <span className="font-black text-[#17a0fe] text-lg tracking-tight">
                    Cloude<span className="text-[#17a0fe]">Data</span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Close Button (X) - only visible on mobile when sidebar open */}
          {mobileOpen && (
            <button
              onClick={onMobileClose}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all md:hidden"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
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
                    className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${isMenuOpen
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                      }`}
                  >
                    <Icon size={20} className="shrink-0" />
                    {isExpanded && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        <ChevronRight size={14} className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-90 text-indigo-500' : 'text-slate-400'}`} />
                      </>
                    )}
                  </button>
                ) : (
                  <NavLink
                    to={item.to}
                    onClick={() => {
                      if (mobileOpen && !isDesktop) onMobileClose();
                    }}
                    className={({ isActive }) => `
                      relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200
                      ${isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-200'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                      }
                    `}
                  >
                    <Icon size={20} className="shrink-0" />
                    {isExpanded && <span>{item.label}</span>}
                    {isActive && isExpanded && (
                      <motion.div layoutId="activeHighlight" className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
                    )}
                  </NavLink>
                )}

                <AnimatePresence>
                  {hasChildren && isMenuOpen && isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-11 mt-1 space-y-1 border-l border-slate-100 pl-2"
                    >
                      {item.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          onClick={() => {
                            if (mobileOpen && !isDesktop) onMobileClose();
                          }}
                          className={({ isActive }) => `
                            block py-2 px-3 text-[12px] font-medium rounded-lg transition-all duration-150
                            ${isActive
                              ? 'text-indigo-700 bg-indigo-50/70'
                              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 hover:pl-4'
                            }
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

        {/* Logout Button */}
        <div className="p-3 mt-auto border-t border-slate-100/80">
          <button
            onClick={() => logout.mutate()}
            disabled={logout.isPending}
            className={`w-full flex items-center gap-3 rounded-xl transition-all duration-300 group
              ${!isExpanded ? 'p-2 justify-center' : 'px-4 py-3'}
              bg-gradient-to-r from-slate-800 to-slate-900 hover:from-red-600 hover:to-red-700 shadow-lg
            `}
          >
            <div className="shrink-0 w-7 h-7 rounded-lg bg-white/10 group-hover:bg-white/20 flex items-center justify-center">
              <LogOut size={14} className="text-white/90" />
            </div>
            {isExpanded && (
              <div className="flex flex-col items-start text-left">
                <span className="text-xs font-semibold text-white/90">
                  {logout.isPending ? 'Logging out...' : 'Logout'}
                </span>
                <span className="text-[9px] text-slate-300 group-hover:text-red-200 transition-colors">
                  End your session
                </span>
              </div>
            )}
          </button>
        </div>
      </motion.aside>
    </>
  );
}