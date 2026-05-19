import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

/* ── Custom cloud illustration (SVG) ──────────── */
const CloudIllustration = () => (
  <svg
    viewBox="0 0 500 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full drop-shadow-2xl"
  >
    {/* Main cloud shape */}
    <path
      d="M120 280c-30-30-30-80 10-100 20-10 40-10 60 0 10-40 50-70 90-50 30 10 50 40 50 70 40 10 70 50 60 90-10 30-40 50-70 50H180c-30 0-60-20-60-60z"
      fill="url(#cloudGrad)"
      opacity="0.9"
    />
    {/* Servers inside cloud */}
    <rect x="170" y="220" width="50" height="40" rx="6" fill="white" opacity="0.95" />
    <rect x="175" y="225" width="40" height="5" rx="2" fill="#3B82F6" />
    <rect x="175" y="235" width="30" height="5" rx="2" fill="#3B82F6" />
    <rect x="175" y="245" width="35" height="5" rx="2" fill="#3B82F6" />

    <rect x="240" y="210" width="50" height="50" rx="6" fill="white" opacity="0.95" />
    <rect x="245" y="215" width="40" height="5" rx="2" fill="#8B5CF6" />
    <rect x="245" y="225" width="30" height="5" rx="2" fill="#8B5CF6" />
    <rect x="245" y="235" width="35" height="5" rx="2" fill="#8B5CF6" />
    <rect x="245" y="245" width="25" height="5" rx="2" fill="#8B5CF6" />

    {/* Floating elements */}
    <circle cx="330" cy="180" r="15" fill="#3B82F6" opacity="0.6">
      <animate
        attributeName="cy"
        values="180;190;180"
        dur="3s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="140" cy="150" r="10" fill="#8B5CF6" opacity="0.5">
      <animate
        attributeName="cy"
        values="150;140;150"
        dur="2.5s"
        repeatCount="indefinite"
      />
    </circle>
    <path
      d="M380 200l-10-5m10 5l10-5"
      stroke="#3B82F6"
      strokeWidth="3"
      opacity="0.7"
      strokeLinecap="round"
    />
    <path
      d="M100 220l-5-10m5 10l-5 10"
      stroke="#8B5CF6"
      strokeWidth="3"
      opacity="0.7"
      strokeLinecap="round"
    />

    {/* Gradients */}
    <defs>
      <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
  </svg>
);

export default function PricingService() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0b1121] via-[#131d3a] to-[#0f2b5c] pt-24 pb-20 md:pt-32 md:pb-28">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTAgMGgxdjFIMHoiLz48L2c+PC9zdmc+')] opacity-20 pointer-events-none" />

      {/* Bottom morphic gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-50/10 to-transparent backdrop-blur-[2px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Choose a service
            </span>
            <br />
            and get started today
          </h1>
          <p className="text-blue-200/80 text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Affordable cloud infrastructure, VPS, and ERP hosting solutions built for Indian businesses. No hidden fees, scale as you grow.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <a
              href="#cloude-plans"
              className="group inline-flex items-center gap-2 bg-white text-slate-900 font-semibold px-7 py-3.5 rounded-full shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300"
            >
              <Sparkles size={18} className="text-blue-600 group-hover:animate-pulse" />
              View Plans
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/60"
            >
              Talk to Sales
            </a>
          </div>
        </motion.div>

        {/* Right illustration – custom SVG */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex-1 flex justify-center"
        >
          <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px]">
            <CloudIllustration />
          </div>
        </motion.div>
      </div>

      {/* Floating glass card at bottom */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-[85%] max-w-3xl h-14 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/10" />
    </section>
  );
}