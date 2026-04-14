import { motion } from 'framer-motion';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { pageTransition } from '../../animations/variants';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-dark text-textPrimary flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Navbar />
        <motion.main
          className="px-4 sm:px-6 py-6"
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

