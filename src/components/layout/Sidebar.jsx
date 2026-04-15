import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  Globe,
  LayoutDashboard,
  RectangleEllipsis,
  Server,
  Settings,
  Zap,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Wordpress',   to: '/wordpress',   icon: RectangleEllipsis  },
  { label: 'Hosting',   to: '/hosting',   icon: Server },
  { label: 'Domains',   to: '/domains',   icon: Globe },
  { label: 'Billing',   to: '/billing',   icon: CreditCard },
  { label: 'Settings',  to: '/settings',  icon: Settings },
];

export default function Sidebar({ mobileOpen, onMobileClose }) {
  const [hovered, setHovered] = useState(false);
  const expanded = hovered;

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar — desktop: hover expand | mobile: controlled by mobileOpen */}
      <motion.aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ width: expanded || mobileOpen ? 240 : 68 }}
        transition={{ duration: 0.22, ease: 'easeInOut' }}
        className={`
          h-screen sticky top-0 z-50 flex flex-col overflow-hidden
          bg-white border-r border-slate-200
          shadow-[2px_0_12px_rgba(0,0,0,0.06)]
          md:relative
          ${mobileOpen ? 'fixed left-0 top-0' : 'hidden md:flex'}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-2.5 px-4 border-b border-slate-100 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
            <Zap size={16} className="text-white" />
          </div>
          <AnimatePresence>
            {(expanded || mobileOpen) && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.15 }}
                className="font-bold text-slate-800 text-[15px] whitespace-nowrap"
              >
                Cloud<span className="text-indigo-600">Flow</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => onMobileClose?.()}
                className={({ isActive }) => `
                  group relative flex items-center gap-3 rounded-xl px-2.5 py-2.5
                  text-sm font-medium transition-all duration-150
                  ${isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    {/* Active left bar */}
                    {isActive && (
                      <motion.div
                        layoutId="active-bar"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-indigo-600 rounded-r-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}

                    {/* Icon */}
                    <div className={`shrink-0 transition-colors duration-150 ${isActive ? 'text-indigo-600' : ''}`}>
                      <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
                    </div>

                    {/* Label */}
                    <AnimatePresence>
                      {(expanded || mobileOpen) && (
                        <motion.span
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -4 }}
                          transition={{ duration: 0.13 }}
                          className="whitespace-nowrap overflow-hidden"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Tooltip when collapsed */}
                    {!expanded && !mobileOpen && (
                      <div className="
                        absolute left-full ml-3 px-2.5 py-1.5
                        bg-slate-800 text-white text-xs rounded-lg
                        whitespace-nowrap pointer-events-none
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-150 z-50
                        shadow-lg
                      ">
                        {item.label}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-800" />
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer hint */}
        <div className="px-3 py-3 border-t border-slate-100 shrink-0">
          <div className={`
            flex items-center gap-2 px-2 py-2 rounded-lg
            bg-indigo-50 border border-indigo-100
          `}>
            <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 animate-pulse" />
            <AnimatePresence>
              {(expanded || mobileOpen) && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-indigo-600 font-medium whitespace-nowrap"
                >
                  All systems operational
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>
    </>
  );
}