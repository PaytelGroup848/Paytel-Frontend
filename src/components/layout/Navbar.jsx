import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  ChevronDown, 
  LogOut, 
  User as UserIcon, 
  Search, 
  Sparkles,
  CreditCard,
  ShieldCheck,
  Command,
  LayoutDashboard,
  Cloud,
  Menu  // ✅ ADDED: Menu icon for mobile
} from 'lucide-react';

import Avatar from '../ui/Avatar';
import { useAuthStore } from '../../store/authStore';
import { useLogout } from '../../hooks/useAuth';

export default function Navbar({ isSidebarOpen, onMenuClick }) {  // ✅ ADDED onMenuClick prop
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
    <header className={`
      sticky top-0 z-50 w-full transition-all duration-500 ease-in-out
      ${scrolled 
        ? 'py-3 bg-white/60 backdrop-blur-2xl border-b border-white/40 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.08)]' 
        : 'py-5 bg-transparent border-b border-transparent'}
    `}>
      <div className="max-w-[1800px] mx-auto px-4 sm:px-10 flex items-center justify-between">
        
        {/* LEFT: Branding + Mobile Menu Button */}
        <div className="flex items-center gap-3 min-w-[200px]">
          {/* ✅ Hamburger button - only visible on mobile */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all"
            aria-label="Open sidebar"
          >
            <Menu size={22} />
          </button>

          <AnimatePresence mode="wait">
            {!isSidebarOpen && (
              <motion.div 
                initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="flex items-center gap-3 cursor-pointer group select-none"
                onClick={() => navigate('/')}
              >
                {/* ADVANCED DOUBLE CLOUD ICON */}
                <div className="relative flex items-center justify-center w-10 h-10">
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  >
                    <Cloud 
                      size={24} 
                      className="text-indigo-600 absolute -translate-x-2 -translate-y-2 opacity-40" 
                      fill="currentColor"
                    />
                  </motion.div>
                  <Cloud 
                    size={26} 
                    className="text-violet-500 z-10 drop-shadow-2xl group-hover:scale-110 transition-transform duration-300" 
                    fill="currentColor"
                  />
                </div>
                
                <div className="flex flex-col leading-tight">
                  <span className="font-black text-2xl tracking-tighter text-slate-900">
                    Cloude<span className="text-indigo-600">Data</span>
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 tracking-[0.3em] uppercase mt-0.5">Infrastructure</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MIDDLE: Floating Search Bar */}
        <div className="hidden md:flex items-center relative w-full max-w-lg group">
          <Search size={18} className="absolute left-4 text-slate-400 group-focus-within:text-indigo-600 transition-all duration-300" />
          <input 
            type="text" 
            placeholder="Quick search (⌘K)" 
            className="w-full text-sm py-3 pl-12 pr-12 rounded-[1.25rem] bg-white/40 border border-slate-200/60 outline-none transition-all duration-300 focus:bg-white focus:ring-[6px] focus:ring-indigo-600/5 focus:border-indigo-600/50 focus:shadow-xl shadow-inner"
          />
          <div className="absolute right-4 flex items-center gap-1.5 px-2 py-1 bg-slate-100/50 rounded-lg border border-slate-200/50 opacity-50 group-hover:opacity-100 transition-opacity">
             <Command size={10} className="text-slate-500" />
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">K</span>
          </div>
        </div>

        {/* RIGHT: User Controls */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="hidden sm:flex p-3 rounded-2xl bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group relative">
            <Bell size={20} strokeWidth={2} />
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-indigo-600 rounded-full border-2 border-white group-hover:animate-ping" />
          </button>

          {/* User Account */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen(!open)}
              className={`
                flex items-center gap-3 p-1.5 pr-4 rounded-[1.25rem] border transition-all duration-500
                ${open 
                  ? 'bg-white border-indigo-200 shadow-xl ring-4 ring-indigo-500/5' 
                  : 'bg-white/50 border-white hover:border-slate-200 hover:bg-white shadow-sm'}
              `}
            >
              <div className="relative">
                <Avatar name={user?.name} size="md" src={user?.avatar} className="rounded-xl border-2 border-white shadow-sm" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-[3px] border-white rounded-full shadow-sm" />
              </div>
              
              <div className="hidden lg:flex flex-col items-start text-left">
                <span className="text-[13px] font-black text-slate-900 leading-none">{user?.name}</span>
                <span className="text-[10px] text-indigo-500 font-bold uppercase mt-1 tracking-wider opacity-80">PRO v2.0</span>
              </div>
              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-500 ${open ? 'rotate-180 text-indigo-600' : ''}`} />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute right-0 mt-5 w-80 bg-white/80 backdrop-blur-3xl rounded-[2.5rem] border border-white shadow-[0_30px_70px_-10px_rgba(0,0,0,0.15)] overflow-hidden z-50 p-3"
                >
                  <div className="flex items-center gap-4 p-5 mb-2 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-[2rem] text-white shadow-lg">
                    <Avatar name={user?.name} size="lg" src={user?.avatar} className="rounded-2xl border-2 border-white/20" />
                    <div className="flex flex-col truncate">
                      <p className="font-black text-base truncate">{user?.name}</p>
                      <p className="text-xs font-medium opacity-80 truncate">{user?.email}</p>
                    </div>
                  </div>

                  <div className="p-1 space-y-1">
                    <button className='w-full cursor-pointer' onClick={() => navigate('/vps')}><DropdownItem icon={<LayoutDashboard size={18} />} label="Cloud Overview" /></button>
                    <button className='w-full cursor-pointer' onClick={() => navigate('/settings')}> <DropdownItem icon={<ShieldCheck size={18} />} label="Security & Keys" /></button>
                    <button className='w-full cursor-pointer' onClick={() => navigate('/plans')}>  <DropdownItem icon={<CreditCard size={18} />} label="Billing & Plan" /></button>
                    <div className="h-[1px] bg-slate-100 my-2 mx-4 opacity-50" />
                    <button
                      onClick={() => logout.mutate()}
                      className="w-full flex items-center gap-4 px-4 py-4 text-sm font-black cursor-pointer text-red-500 hover:bg-red-200 rounded-2xl transition-all group"
                    >
                      <div className="p-2 bg-red-100 group-hover:bg-red-500 group-hover:text-white transition-colors rounded-xl">
                        <LogOut size={16} />
                      </div>
                      Logout
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
    <button className="w-full flex items-center gap-4 px-4 py-3.5 text-[14px] font-bold text-slate-600 hover:bg-indigo-600 hover:text-white rounded-[1.5rem] transition-all duration-300 group">
      <span className="text-slate-400 group-hover:text-white/80 transition-colors">{icon}</span>
      {label}
    </button>
  );
}