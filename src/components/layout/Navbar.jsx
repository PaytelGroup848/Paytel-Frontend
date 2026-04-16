import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  ChevronDown, 
  LogOut, 
  Menu, 
  Settings, 
  User as UserIcon, 
  Search, 
  Sparkles,
  CreditCard,
  ShieldCheck
} from 'lucide-react';

import Avatar from '../ui/Avatar';
import { useAuthStore } from '../../store/authStore';
import { useLogout } from '../../hooks/useAuth';

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const logout = useLogout();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  // Handle scroll effect for premium glass look
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close
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
    <header className={`
      sticky top-0 z-40 w-full transition-all duration-300
      ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm' : 'bg-white border-b border-slate-100'}
    `}>
      <div className="mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Left Section: Mobile Menu & Search */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Menu size={22} />
          </button>

          {/* Desktop Search Bar - SaaS standard */}
          <div className="hidden md:flex items-center relative w-full max-w-sm group">
            <Search size={16} className="absolute left-3 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search services or domains... (⌘K)"
              className="w-full bg-slate-50 border border-slate-100 text-sm py-2 pl-10 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:bg-white transition-all"
            />
          </div>

          {/* Mobile Logo Branding */}
          <div className="md:hidden flex items-center gap-1.5">
             <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                <Sparkles size={14} className="text-white" />
             </div>
             <span className="font-bold text-slate-900 text-[16px] tracking-tight">
                Cloude<span className="text-indigo-600">Data</span>
             </span>
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          
          {/* Upgrade Button - Good for SaaS conversion */}
          <button className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-colors uppercase tracking-wider">
            <Sparkles size={14} />
            Upgrade Plan
          </button>

          {/* Notifications */}
          <button className="relative p-2.5 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all group">
            <Bell size={20} strokeWidth={1.5} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white group-hover:scale-110 transition-transform" />
          </button>

          {/* User Profile Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 p-1 sm:pl-1 sm:pr-2.5 rounded-full sm:rounded-xl border border-transparent hover:border-slate-200 hover:bg-white transition-all"
            >
              <div className="relative">
                <Avatar name={user?.name} size="sm" src={user?.avatar} className="ring-2 ring-indigo-50" />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div className="hidden sm:flex flex-col items-start leading-none">
                <span className="text-sm font-semibold text-slate-700 truncate max-w-[100px]">
                  {user?.name?.split(' ')[0] || 'Admin'}
                </span>
                <span className="text-[10px] text-slate-400 font-medium uppercase mt-0.5">Pro User</span>
              </div>
              <ChevronDown size={14} className={`text-slate-400 hidden sm:block transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-64 bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden z-50 origin-top-right"
                >
                  <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center gap-3">
                    <Avatar name={user?.name} size="md" src={user?.avatar} />
                    <div className="flex flex-col truncate">
                      <p className="text-sm font-bold text-slate-900 truncate">{user?.name || 'User Name'}</p>
                      <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    </div>
                  </div>

                  <div className="p-2 space-y-0.5">
                    <DropdownItem icon={<UserIcon size={16} />} label="My Profile" onClick={() => navigate('/settings')} />
                    <DropdownItem icon={<ShieldCheck size={16} />} label="Security" onClick={() => navigate('/settings/security')} />
                    <DropdownItem icon={<CreditCard size={16} />} label="Billing & Plan" onClick={() => navigate('/billing')} />
                    <DropdownItem icon={<Settings size={16} />} label="Account Settings" onClick={() => navigate('/settings')} />
                  </div>

                  <div className="p-2 border-t border-slate-100 bg-slate-50/30">
                    <button
                      onClick={onLogout}
                      className="w-full px-3 py-2 text-sm text-red-500 font-medium rounded-lg hover:bg-red-50 flex items-center gap-3 transition-colors"
                    >
                      <LogOut size={16} />
                      Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

// Helper component for clean scalable menu
function DropdownItem({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full px-3 py-2.5 text-sm text-slate-600 font-medium rounded-lg hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-3 transition-all group"
    >
      <span className="text-slate-400 group-hover:text-indigo-600 transition-colors">{icon}</span>
      {label}
    </button>
  );
}