import { motion } from "framer-motion";
import { Cloud, ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ComingSoon() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 overflow-hidden font-sans antialiased">
      {/* Animated background clouds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-28 bg-white/10 rounded-full blur-3xl animate-cloud-left" />
        <div className="absolute top-40 right-20 w-96 h-32 bg-white/5 rounded-full blur-3xl animate-cloud-right" style={{ animationDuration: "30s" }} />
        <div className="absolute bottom-10 left-20 w-80 h-24 bg-white/10 rounded-full blur-3xl animate-cloud-left" style={{ animationDuration: "40s" }} />
        <div className="absolute bottom-40 right-10 w-64 h-20 bg-white/5 rounded-full blur-3xl animate-cloud-right" style={{ animationDuration: "35s" }} />
      </div>

      {/* Central content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6 max-w-2xl mx-auto"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-indigo-600/20 rounded-full backdrop-blur-sm">
            <Sparkles size={40} className="text-indigo-400" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight">
          Something{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            amazing
          </span>{" "}
          is coming.
        </h1>

        <p className="text-indigo-200/80 text-lg md:text-xl max-w-md mx-auto mb-10 font-medium">
          We’re building the next generation of cloud infrastructure. Stay tuned for the launch.
        </p>

        {/* Placeholder countdown */}
        <div className="flex justify-center gap-6 mb-12">
          {["Days", "Hours", "Minutes", "Seconds"].map((label, idx) => (
            <div key={label} className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shadow-lg">
                <span className="text-2xl md:text-3xl font-black text-white">00</span>
              </div>
              <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider mt-2">{label}</p>
            </div>
          ))}
        </div>

        {/* Go Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/home")}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-md text-white rounded-2xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-all shadow-lg hover:shadow-xl"
        >
          <ArrowLeft size={20} />
          Go Back Home
        </motion.button>

        <p className="mt-8 text-xs text-slate-400 font-medium">CloudeData &copy; {new Date().getFullYear()} – All rights reserved.</p>
      </motion.div>

      {/* Custom keyframes */}
      <style>{`
        @keyframes cloud-left {
          0% { transform: translateX(0); opacity: 0.5; }
          50% { transform: translateX(60px); opacity: 0.8; }
          100% { transform: translateX(0); opacity: 0.5; }
        }
        @keyframes cloud-right {
          0% { transform: translateX(0); opacity: 0.5; }
          50% { transform: translateX(-60px); opacity: 0.8; }
          100% { transform: translateX(0); opacity: 0.5; }
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