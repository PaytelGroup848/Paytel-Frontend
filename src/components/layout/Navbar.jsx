import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ChevronDown, LogOut, Menu, Settings, User as UserIcon } from 'lucide-react';

import Avatar from '../ui/Avatar';
import { useAuthStore } from '../../store/authStore';
import { useLogout } from '../../hooks/useAuth';

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const logout = useLogout();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const onLogout = () => {
    setOpen(false);
    logout.mutate(undefined, { onSettled: () => navigate('/login') });
  };

  return (
    <div className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Left: hamburger (mobile) */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="
              md:hidden w-9 h-9 flex items-center justify-center
              rounded-lg text-slate-500
              hover:bg-slate-100 hover:text-slate-800
              transition-colors duration-150
            "
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* Page title slot — optional, shows logo on mobile when sidebar hidden */}
          <span className="md:hidden font-bold text-slate-800 text-[15px]">
            Cloud<span className="text-indigo-600">Flow</span>
          </span>
        </div>

        {/* Right: actions + user */}
        <div className="flex items-center gap-2">

          {/* Notification bell */}
          <button className="
            relative w-9 h-9 flex items-center justify-center
            rounded-lg text-slate-500
            hover:bg-slate-100 hover:text-slate-800
            transition-colors duration-150
          ">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-white" />
          </button>

          {/* User dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen((v) => !v)}
              className="
                flex items-center gap-2 pl-1 pr-3 py-1.5
                rounded-xl border border-slate-200
                hover:border-slate-300 hover:bg-slate-50
                transition-all duration-150
              "
            >
              <Avatar name={user?.name || user?.email || 'User'} size="sm" src={user?.avatar} />
              <span className="hidden sm:inline text-sm font-medium text-slate-700 max-w-[140px] truncate">
                {user?.name || user?.email || 'Account'}
              </span>
              <ChevronDown
                size={15}
                className={`text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="
                    absolute right-0 mt-2 w-52
                    bg-white rounded-xl border border-slate-200
                    shadow-lg shadow-slate-200/60
                    overflow-hidden z-50
                  "
                >
                  {/* User info header */}
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {user?.email || ''}
                    </p>
                  </div>

                  {/* Menu items */}
                  <div className="py-1">
                    <button
                      onClick={() => { setOpen(false); navigate('/settings'); }}
                      className="w-full px-4 py-2.5 text-sm text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                    >
                      <UserIcon size={15} className="text-slate-400" />
                      Profile
                    </button>
                    <button
                      onClick={() => { setOpen(false); navigate('/settings/security'); }}
                      className="w-full px-4 py-2.5 text-sm text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                    >
                      <Settings size={15} className="text-slate-400" />
                      Settings
                    </button>
                  </div>

                  <div className="py-1 border-t border-slate-100">
                    <button
                      onClick={onLogout}
                      className="w-full px-4 py-2.5 text-sm text-left text-red-500 hover:bg-red-50 flex items-center gap-2.5 transition-colors"
                    >
                      <LogOut size={15} className="text-red-400" />
                      Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}