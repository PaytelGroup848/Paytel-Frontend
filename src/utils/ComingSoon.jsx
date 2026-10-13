import { motion } from "framer-motion";
import { Cloud, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ComingSoon() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-indigo-50 to-purple-50 overflow-hidden font-sans antialiased">
      {/* Soft animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-cloud-left" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-cloud-right" style={{ animationDuration: "30s" }} />
        <div className="absolute -bottom-10 left-1/4 w-72 h-72 bg-cyan-200/20 rounded-full blur-3xl animate-cloud-left" style={{ animationDuration: "35s" }} />
      </div>

      {/* Central content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6 max-w-xl mx-auto"
      >
        {/* Animated Cloud Logo */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center justify-center w-24 h-24 bg-white shadow-xl rounded-3xl mb-6 border border-indigo-100"
        >
          <Cloud size={48} className="text-indigo-600" strokeWidth={1.5} />
        </motion.div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">
          Coming Soon
        </h1>
        <p className="text-slate-500 text-lg max-w-md mx-auto mb-10">
          We’re working on something exciting. Stay tuned!
        </p>

        {/* Go Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/home")}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-lg shadow-indigo-200 transition-all"
        >
          <ArrowLeft size={18} />
          Go Back Home
        </motion.button>
      </motion.div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes cloud-left {
          0% { transform: translateX(0) scale(1); opacity: 0.6; }
          50% { transform: translateX(40px) scale(1.05); opacity: 0.9; }
          100% { transform: translateX(0) scale(1); opacity: 0.6; }
        }
        @keyframes cloud-right {
          0% { transform: translateX(0) scale(1); opacity: 0.6; }
          50% { transform: translateX(-40px) scale(1.05); opacity: 0.9; }
          100% { transform: translateX(0) scale(1); opacity: 0.6; }
        }
        .animate-cloud-left {
          animation: cloud-left 25s ease-in-out infinite;
        }
        .animate-cloud-right {
          animation: cloud-right 30s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}