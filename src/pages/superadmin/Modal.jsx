import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


export default function Modal({
  isOpen,
  onClose,
  title,
  size = "md",
  theme = "light",
  children,
}) {
  const overlayRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && isOpen && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const sizeMap = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  const isDark = theme === "dark";

  const styles = isDark
    ? {
        overlay: "bg-black/60 backdrop-blur-sm",
        panel: "bg-[#111] border border-white/10 text-slate-100",
        header: "border-white/10",
        title: "text-white",
        close: "text-slate-400 hover:text-white hover:bg-white/10",
      }
    : {
        overlay: "bg-black/30 backdrop-blur-sm",
        panel: "bg-white border border-slate-200 text-slate-900",
        header: "border-slate-100",
        title: "text-slate-900",
        close: "text-slate-400 hover:text-slate-700 hover:bg-slate-100",
      };

  // Click outside to close
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={handleOverlayClick}
          className={`fixed inset-0 z-50 flex items-center justify-center px-4 ${styles.overlay}`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full ${sizeMap[size]} rounded-2xl shadow-xl overflow-hidden ${styles.panel}`}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between px-6 py-4 border-b ${styles.header}`}
            >
              <h2 className={`text-base font-semibold ${styles.title}`}>
                {title}
              </h2>
              <button
                onClick={onClose}
                className={`p-1.5 rounded-lg transition-colors ${styles.close}`}
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
