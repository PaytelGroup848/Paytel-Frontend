import { motion } from 'framer-motion';

import { slideUp } from '../../animations/variants';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-dark text-textPrimary flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-dark to-dark" />

      <motion.div
        className="relative w-full max-w-md bg-surface border border-white/10 rounded-2xl p-6 sm:p-8"
        variants={slideUp}
        initial="hidden"
        animate="visible"
      >
        <div className="mb-6 text-center">
          <div className="text-2xl font-bold tracking-tight">
            <span className="text-primary">Host</span>Flow
          </div>
          <div className="text-sm text-textMuted mt-1">Modern hosting, simplified.</div>
        </div>
        {children}
      </motion.div>
    </div>
  );
}

