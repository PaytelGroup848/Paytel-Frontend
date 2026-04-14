import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Globe, LayoutDashboard, Server, Settings } from 'lucide-react';

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
      className="h-screen sticky top-0 bg-surface border-r border-white/10 overflow-hidden"
      animate={{ width: sidebarCollapsed ? 72 : 248 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div className="h-16 px-4 flex items-center justify-between border-b border-white/10">
        <div className="font-bold tracking-tight">
          <span className="text-primary">Host</span>
          <span className={sidebarCollapsed ? 'hidden' : ''}>Flow</span>
        </div>
        <button
          onClick={toggleSidebar}
          className="text-textMuted hover:text-textPrimary transition-colors"
          aria-label="Toggle sidebar"
        >
          {sidebarCollapsed ? '»' : '«'}
        </button>
      </div>

      <nav className="p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium border-l-2 transition-colors',
                  isActive
                    ? 'bg-primary/20 text-primary border-primary'
                    : 'text-textPrimary/90 border-transparent hover:bg-white/5',
                ].join(' ')
              }
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon size={18} />
              <span className={sidebarCollapsed ? 'hidden' : ''}>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </motion.aside>
  );
}

