import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  ChevronDown,
  LogOut,
  Search,
  CreditCard,
  ShieldCheck,
  Command,
  LayoutDashboard,
  Menu,
} from 'lucide-react';

import Avatar from '../ui/Avatar';
import { useAuthStore } from '../../store/authStore';
import { useLogout } from '../../hooks/useAuth';

export default function Navbar({ isSidebarOpen, onMenuClick }) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const logout = useLogout();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-50 w-full transition-all duration-500
        bg-gradient-to-r from-white/90 via-indigo-50/40 to-white/90
        backdrop-blur-xl border-b border-white/80
        shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        ${scrolled
          ? 'shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-2xl'
          : ''}
      `}
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-10 py-3 flex items-center justify-between gap-4">
        
        {/* LEFT: Mobile menu + Original Brand (hides when sidebar expands) */}
        <div className="flex items-center gap-3 min-w-[140px]">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-xl bg-white/80 border border-white/60 text-slate-600 hover:text-indigo-600 transition-all backdrop-blur-sm"
            aria-label="Open sidebar"
          >
            <Menu size={22} />
          </button>

          {/* Original Cloud Logo + Name – visible only when sidebar is closed */}
          <AnimatePresence mode="wait">
            {!isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="flex items-center gap-3 cursor-pointer group select-none"
                onClick={() => navigate('/')}
              >
                {/* Animated cloud SVG */}
                <div className="relative flex items-center justify-center h-10">
                  <motion.img
                    src="/Cloudedata.svg"
                    alt="CloudeData Logo"
                    className="h-10 object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  />
                </div>
                {/* Brand name */}
                
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MIDDLE: Glass search bar */}
        <div className="hidden md:flex items-center relative w-full max-w-xl">
          <Search size={18} className="absolute left-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search anything... (⌘K)"
            className="w-full text-sm py-3 pl-12 pr-16 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 outline-none transition-all duration-300
                       focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10
                       placeholder:text-slate-400 text-slate-800 font-medium shadow-sm"
          />
          <div className="absolute right-4 flex items-center gap-1.5 px-2 py-1 bg-white/80 backdrop-blur-sm border border-white/60 rounded-lg shadow-sm transition-all">
            <Command size={10} className="text-slate-500" />
            <span className="text-[10px] font-bold text-slate-500 uppercase">K</span>
          </div>
        </div>

        {/* RIGHT: Notifications + Compact Professional Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button className="relative p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 text-slate-500 hover:text-indigo-600 hover:bg-white hover:border-indigo-200 transition-all group shadow-sm">
            <Bell size={20} strokeWidth={2} />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-white group-hover:animate-ping" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-white" />
          </button>

          {/* Compact Profile Button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen(!open)}
              className={`
                flex items-center gap-2.5 p-1.5 pr-3 rounded-[1.25rem] border transition-all duration-300
                bg-white/70 backdrop-blur-md border-white/60
                ${open 
                  ? 'bg-white border-indigo-300 shadow-lg ring-4 ring-indigo-500/5' 
                  : 'shadow-sm hover:bg-white hover:border-slate-200'}
              `}
            >
              <div className="relative shrink-0">
                <Avatar name={user?.name} size="sm" src={user?.avatar} className="rounded-xl border-2 border-white shadow-sm w-9 h-9" />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-[3px] border-white rounded-full shadow-sm" />
              </div>
              <div className="hidden lg:flex flex-col items-start text-left leading-tight">
                <span className="text-[12px] font-bold text-slate-900 truncate max-w-[100px]">{user?.name}</span>
              </div>
              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 shrink-0 ${open ? 'rotate-180 text-indigo-600' : ''}`} />
            </button>

            {/* Compact Professional Dropdown */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.96 }}
                  className="absolute right-0 mt-3 w-64 bg-white/90 backdrop-blur-xl rounded-2xl border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden z-50 p-2.5"
                >
                  {/* Profile header card – compact */}
                  <div className="flex items-center gap-3 p-4 mb-2 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl text-white shadow-md">
                    <Avatar name={user?.name} size="md" src={user?.avatar} className="rounded-xl border-2 border-white/20 shrink-0" />
                    <div className="flex flex-col truncate">
                      <p className="font-bold text-sm truncate">{user?.name}</p>
                      <p className="text-[10px] font-medium text-indigo-100 truncate">{user?.email}</p>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="space-y-0.5">
                    <button onClick={() => navigate('/vps')} className="w-full">
                      <DropdownItem icon={<LayoutDashboard size={16} />} label="Cloud Overview" />
                    </button>
                    <button onClick={() => navigate('/settings')} className="w-full">
                      <DropdownItem icon={<ShieldCheck size={16} />} label="Security & Keys" />
                    </button>
                    <button onClick={() => navigate('/plans')} className="w-full">
                      <DropdownItem icon={<CreditCard size={16} />} label="Billing & Plan" />
                    </button>

                    <div className="h-px bg-slate-200/60 my-1.5 mx-2" />

                    <button
                      onClick={() => logout.mutate()}
                      className="w-full flex items-center gap-3 px-3.5 py-3 text-[12px] font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all group"
                    >
                      <div className="p-1.5 bg-red-50 group-hover:bg-red-500 group-hover:text-white transition-colors rounded-lg">
                        <LogOut size={14} />
                      </div>
                      Sign Out
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

function DropdownItem({ icon, label }) {
  return (
    <div className="w-full flex items-center gap-3 px-3.5 py-3 text-[12px] font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl transition-all duration-200 group">
      <span className="text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0">{icon}</span>
      {label}
    </div>
  );
}