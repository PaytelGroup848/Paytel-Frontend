import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Home, ChevronRight, Settings as SettingsIcon } from 'lucide-react';

import Profile from './Profile';
import Security from './Security';
import { fadeIn } from '../../animations/variants';

const TabLink = ({ to, label }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      [
        'relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300',
        isActive
          ? 'text-white bg-[#17a0fe] shadow-md shadow-[#17a0fe]/25'
          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100',
      ].join(' ')
    }
  >
    {label}
  </NavLink>
);

export default function Settings() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-6 md:p-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <button
          onClick={() => navigate('/')}
          className="hover:text-[#17a0fe] transition flex items-center gap-1 font-medium"
        >
          <Home size={16} />
          <span>Dashboard</span>
        </button>
        <ChevronRight size={16} />
        <span className="font-bold text-slate-800">Settings</span>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Settings</h1>
        <p className="text-slate-500 mt-1 text-sm">
          Manage your profile and security preferences.
        </p>
      </div>

      {/* Tabs Container */}
      <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-2xl p-1.5 shadow-lg shadow-slate-200/50 mb-8">
        <div className="flex items-center gap-1.5">
          <TabLink to="/settings" label="Profile" />
          <TabLink to="/settings/security" label="Security" />
        </div>
      </div>

      {/* Content Area with smooth animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-2xl p-6 md:p-8 shadow-lg shadow-slate-200/50 ring-1 ring-white/60"
        >
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/security" element={<Security />} />
            <Route path="*" element={<Navigate to="/settings" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}