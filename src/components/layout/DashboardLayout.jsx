import { useState } from 'react';
import { motion } from 'framer-motion';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { pageTransition } from '../../animations/variants';

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark text-textPrimary flex overflow-hidden">
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex-1 min-w-0 flex flex-col overflow-auto">
        <Navbar onMenuClick={() => setMobileOpen(true)} />
        <motion.main
          className="flex-1 px-4 sm:px-6 py-6"
          initial={pageTransition.initial}
          animate={pageTransition.animate}
          exit={pageTransition.exit}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}