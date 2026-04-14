import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Globe,
  LayoutDashboard,
  Server,
  Settings,
} from 'lucide-react';

import { useUiStore } from '../../store/uiStore';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Hosting', to: '/hosting', icon: Server },
  { label: 'Domains', to: '/domains', icon: Globe },
  { label: 'Billing', to: '/billing', icon: CreditCard },
  { label: 'Settings', to: '/settings', icon: Settings },
];

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUiStore();

  return (
    <motion.aside
      className="
        h-screen sticky top-0 
        bg-white/5 backdrop-blur-xl 
        border-r border-white/10 
        shadow-xl overflow-hidden
      "
      animate={{ width: sidebarCollapsed ? 72 : 248 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* HEADER */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-white/10">
        <div className="font-bold tracking-tight text-lg flex items-center gap-1">
          <span className="text-primary">Host</span>
          <span
            className={`transition-all duration-200 ${
              sidebarCollapsed ? 'opacity-0 w-0' : 'opacity-100'
            }`}
          >
            Flow
          </span>
        </div>

        <button
          onClick={toggleSidebar}
          className="
            w-9 h-9 flex items-center justify-center
            rounded-lg 
            bg-white/5 hover:bg-white/10
            border border-white/10
            transition-all duration-200
            text-lg
          "
          aria-label="Toggle sidebar"
        >
          {sidebarCollapsed ? '»' : '«'}
        </button>
      </div>

      {/* NAV */}
      <nav className="p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  `
                  group relative
                  flex items-center gap-3 
                  rounded-xl px-3 py-2.5 
                  text-sm font-medium 
                  transition-all duration-200
                  border border-transparent
                  `,
                  isActive
                    ? `
                      bg-primary/20 
                      text-primary 
                      border-primary/40
                      shadow-[0_0_12px_rgba(99,102,241,0.35)]
                    `
                    : `
                      text-textPrimary/80
                      hover:bg-white/5
                      hover:text-textPrimary
                    `,
                ].join(' ')
              }
              title={sidebarCollapsed ? item.label : undefined}
            >
              {/* ICON */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Icon
                  size={18}
                  className="transition-transform duration-200 group-hover:rotate-3"
                />
              </motion.div>

              {/* LABEL */}
              <span
                className={`
                  whitespace-nowrap
                  transition-all duration-200
                  ${sidebarCollapsed ? 'opacity-0 w-0' : 'opacity-100'}
                `}
              >
                {item.label}
              </span>

              {/* ACTIVE INDICATOR */}
              <motion.div
                layoutId="active-pill"
                className="
                  absolute left-0 top-1/2 
                  -translate-y-1/2 
                  w-1 h-6 
                  bg-primary 
                  rounded-r-full
                "
                initial={false}
              />
            </NavLink>
          );
        })}
      </nav>
    </motion.aside>
  );
}