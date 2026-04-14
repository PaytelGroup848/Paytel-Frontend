import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, Route, Routes, useLocation, Navigate } from 'react-router-dom';

import Profile from './Profile';
import Security from './Security';
import { fadeIn } from '../../animations/variants';

const TabLink = ({ to, label }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      [
        'px-4 py-2 rounded-xl text-sm font-semibold transition-colors',
        isActive ? 'bg-primary/20 text-primary' : 'text-textMuted hover:text-textPrimary hover:bg-white/5',
      ].join(' ')
    }
  >
    {label}
  </NavLink>
);

export default function Settings() {
  const location = useLocation();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <div className="text-2xl font-bold">Settings</div>
        <div className="text-sm text-textMuted mt-1">Manage your profile and security preferences.</div>
      </div>

      <div className="flex items-center gap-2 bg-surface border border-white/10 rounded-2xl p-2">
        <TabLink to="/settings" label="Profile" />
        <TabLink to="/settings/security" label="Security" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={location.pathname} variants={fadeIn} initial="hidden" animate="visible" exit="hidden">
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

