import { motion } from 'framer-motion';

import { slideUp } from '../../animations/variants';

export default function AuthLayout({ children }) {
  return (
<div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-300 via-white to-gray-500 text-textPrimary flex items-center justify-center px-4 py-12">
  
  <div className="absolute inset-0 bg-gradient-to-b from-blue-400/20 via-transparent to-blue-400/20" />

  <motion.div
    className="relative w-full  bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 sm:p-8"
    variants={slideUp}
    initial="hidden"
    animate="visible"
  >
        <div className="mb-6 text-center">
          <div className="text-2xl font-bold tracking-tight">
            <span className="text-primary">Cloud</span>Data
          </div>
          <div className="text-sm text-textMuted mt-1">Modern hosting, simplified.</div>
        </div>
        {children}
      </motion.div>
    </div>
  );
}

