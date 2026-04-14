import { motion, AnimatePresence } from 'framer-motion';
import { scaleIn } from '../../animations/variants';

export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
            role="button"
            tabIndex={-1}
            aria-label="Close modal backdrop"
          />

          <motion.div
            className="relative w-full max-w-lg bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-textPrimary">{title}</h3>
              </div>
              <button
                onClick={onClose}
                className="text-textMuted hover:text-textPrimary transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

