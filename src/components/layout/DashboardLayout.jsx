import { useState } from 'react';
import { motion } from 'framer-motion';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { pageTransition } from '../../animations/variants';

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark text-textPrimary flex">
      
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col min-h-screen">

        <Navbar onMenuClick={() => setMobileOpen(true)} />

        <motion.main
          className="
            flex-1
            overflow-y-auto
          "
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