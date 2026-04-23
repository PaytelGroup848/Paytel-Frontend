import { motion } from 'framer-motion';

import { slideUp } from '../../animations/variants';

export default function AuthLayout({ children }) {
  return (
<div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-300 via-white to-gray-500 text-textPrimary flex items-center justify-center px-4 py-12">
  
  <div className="absolute relative inset-0 bg-gradient-to-b from-blue-400/20 via-transparent to-blue-400/20" />

   {children}
    </div>
  );
}

