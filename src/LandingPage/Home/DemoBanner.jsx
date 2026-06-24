import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  IndianRupee,
  Database,
  Globe,
  TrendingUp,
  Headphones,
  ArrowRight,
  CheckCircle2,
  Server,
  Lock,
} from "lucide-react";
import Navbar from "../Navbar";

// ─────────────────────────────────────────────────────────────────────────────
// Cycling words
// ─────────────────────────────────────────────────────────────────────────────
const CYCLING_WORDS = [
  { text: "Ease", color: "from-indigo-500 to-blue-500" },
  { text: "Our Platform", color: "from-violet-500 to-purple-500" },
  { text: "In Minutes", color: "from-sky-500 to-cyan-500" },
  { text: "Fully Scalable", color: "from-indigo-600 to-blue-400" },
];

function CyclingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % CYCLING_WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);
  const word = CYCLING_WORDS[index];
  return (
    <span
      className="inline-block relative overflow-hidden align-bottom"
      style={{ minWidth: "11ch", height: "1.15em" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={word.text}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute left-0 bg-gradient-to-r ${word.color} bg-clip-text text-transparent`}
          style={{ whiteSpace: "nowrap" }}
        >
          {word.text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function AnimatedUnderline() {
  return (
    <div className="mt-3 flex items-center gap-2">
      <motion.div
        className="h-[3px] rounded-full bg-gradient-to-r from-indigo-500 via-blue-400 to-transparent"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "72px", opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="h-[3px] w-2 rounded-full bg-indigo-300/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.2 }}
      />
      <motion.div
        className="h-[3px] w-1 rounded-full bg-indigo-200/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.4 }}
      />
    </div>
  );
}

function FloatingPill({ icon: Icon, label, value, delay, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute z-30 flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/60 shadow-xl shadow-slate-200/60 ${className}`}
    >
      <div className="w-7 h-7 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
        <Icon size={13} className="text-indigo-600" strokeWidth={2} />
      </div>
      <div className="leading-tight">
        <p className="text-[11px] font-bold text-slate-800 tracking-tight">{value}</p>
        <p className="text-[10px] text-slate-500 font-medium">{label}</p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Background
// ─────────────────────────────────────────────────────────────────────────────
function SceneBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#fafafc] via-[#f6f6fa] to-[#f9f9fb]" />
      <motion.div
        className="absolute -top-36 -left-28 w-[52vw] h-[52vw] max-w-[640px] max-h-[640px] rounded-full bg-gradient-radial from-indigo-200/30 via-indigo-100/10 to-transparent blur-3xl"
        animate={{ x: [0, 60, -20, 0], y: [0, 40, -30, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/4 -right-36 w-[44vw] h-[44vw] max-w-[540px] max-h-[540px] rounded-full bg-gradient-radial from-violet-300/22 via-slate-200/8 to-transparent blur-3xl"
        animate={{ x: [0, -50, 30, 0], y: [0, 30, -40, 0], scale: [1, 0.94, 1.07, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-1/3 w-[36vw] h-[36vw] max-w-[440px] max-h-[440px] rounded-full bg-gradient-radial from-sky-200/20 via-transparent to-transparent blur-3xl"
        animate={{ x: [0, 40, -50, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: "linear-gradient(rgba(15,17,23,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(15,17,23,0.045) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 72% 60% at 50% 30%,black 35%,transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 72% 60% at 50% 30%,black 35%,transparent 85%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage: "radial-gradient(rgba(76,29,149,0.12) 1px,transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 60% 50% at 75% 35%,black 30%,transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 75% 35%,black 30%,transparent 80%)",
        }}
      />
      <motion.div
        className="absolute inset-y-0 w-[40%]"
        style={{
          background: "linear-gradient(100deg,transparent 0%,rgba(255,255,255,0.5) 50%,transparent 100%)",
          mixBlendMode: "soft-light",
        }}
        animate={{ x: ["-50vw", "120vw"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-900/10 to-transparent" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HeroImage (always visible, no swap)
// ─────────────────────────────────────────────────────────────────────────────
function HeroImage() {
  return (
    <div className="w-full relative">
      <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-gradient-to-br from-indigo-300 via-blue-200 to-transparent rounded-3xl scale-90 translate-y-4" />
      <img
        src="/mainBanner.png"
        alt="Cloud Infrastructure Dashboard"
        className="w-full h-auto object-contain relative z-10"
        loading="eager"
        style={{
          filter: "drop-shadow(0 24px 48px rgba(79,70,229,0.13))",
          transform: "scale(1.3)",
          transformOrigin: "center",
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Banner (no scroll swap, normal scroll)
// ─────────────────────────────────────────────────────────────────────────────
export default function ProfessionalBanner() {
  const HeroContent = () => (
    <div className="mt-15 pt-5 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-8 xl:gap-12 items-center">
      {/* LEFT */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col max-w-xl mx-auto lg:mx-0"
      >
        {/* Heading */}
        <h1
          className="mt-5 pt-2 text-slate-800 leading-[1.08]"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 550,
            fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
            letterSpacing: "-0.025em",
          }}
        >
          Build Your Website
          <br />
          <span className="text-slate-700">with </span>
          <CyclingWord />
        </h1>
        <AnimatedUnderline />

        {/* Sub */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-5"
        >
          <span className="text-slate-500 text-lg leading-relaxed font-normal" style={{ fontFamily: "'Inter', sans-serif" }}>
            Get{" "}
            <span className="font-semibold text-indigo-600 bg-indigo-50 px-1 py-0.5 rounded-lg">80% Off On Hosting</span>{" "}
            with  Free Support  — Launch in  Minutes
          </span>
        </motion.div>

        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-7 flex flex-col gap-2"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl font-semibold text-slate-800 line-through">₹305/mo</span>
            <span className="text-base font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md">Save 80%</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-7 flex items-end gap-4"
        >
          <div className="flex items-baseline gap-1">
            <IndianRupee size={20} className="text-slate-400 mb-1" strokeWidth={2} />
            <span
              className="text-slate-800 font-semibold tracking-tight"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 650,
                fontSize: "clamp(2.8rem, 7vw, 5rem)",
                lineHeight: 1,
                letterSpacing: "-0.025em",
              }}
            >
              61
            </span>
            <span className="text-slate-400 text-3xl mb-1 ml-0.5">/mo</span>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="mt-5 flex flex-wrap items-center gap-3"
        >
          <button className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-indigo-300/40 hover:shadow-xl hover:from-indigo-700 hover:to-blue-700 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200">
            Buy Now <ArrowRight size={15} strokeWidth={2.5} />
          </button>
          <button className="inline-flex items-center gap-2 px-5 py-3.5 text-slate-600 text-sm font-medium rounded-xl border border-slate-200 bg-white/70 hover:bg-white hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-200 shadow-sm">
            View Plans
          </button>
        </motion.div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            { text: "Free SSL Certificate & Domain", icon: Globe },
            { text: "24/7 Premium Support", icon: Headphones },
            { text: "99.99% Uptime SLA", icon: TrendingUp },
            { text: "Daily Automated Backups", icon: Database },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.85 + i * 0.08, duration: 0.35 }}
              className="flex items-center gap-2.5 group cursor-default"
            >
              <CheckCircle2 size={15} className="text-indigo-400 flex-shrink-0 group-hover:text-indigo-600 transition-colors duration-200" strokeWidth={2} />
              <span className="text-[16px] text-slate-500 font-normal group-hover:text-slate-700 transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                {feature.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Trust stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-2 text-3x1 flex flex-wrap items-center gap-5 sm:gap-8 pt-7 border-t border-slate-900/[0.06]"
        >
          {[
            { val: "2,000+", lbl: "Active Businesses" },
            { val: "99.99%", lbl: "Uptime Guarantee" },
            { val: "24/7", lbl: "Premium Support" },
          ].map(({ val, lbl }, i) => (
            <div key={lbl} className="relative">
              {i > 0 && <div className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 w-px h-7 bg-slate-900/10 hidden sm:block" />}
              <span className="text-slate-800 font-semibold block text-xl sm:text-3xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 650, letterSpacing: "-0.015em" }}>
                {val}
              </span>
              <span className="text-[13px] text-slate-400 font-medium mt-0.5 block tracking-wide">{lbl}</span>
            </div>
          ))}
        </motion.div>

        {/* Money back */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.35, duration: 0.4 }}
          className="mt-6 flex items-center gap-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
          <p className="text-[14px] text-slate-400 font-normal" style={{ fontFamily: "'Inter', sans-serif" }}>
            <span className="text-emerald-600 font-semibold">30‑day money‑back guarantee</span> — full refund, no questions asked.
          </p>
        </motion.div>
      </motion.div>

      {/* RIGHT – HeroImage always visible */}
      <div className="relative flex justify-center lg:justify-end w-full min-h-[200px] lg:min-h-[400px]">
        <div className="w-full max-w-[720px] pl-4">
          <HeroImage />
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap');
      `}</style>
      <Navbar />
      <div className="relative">
        <SceneBg />
        <section className="relative z-10 pt-8 pb-16 sm:pt-12 sm:pb-20 px-4 sm:px-6">
          <div className="max-w-[92vw] mx-auto">
            <HeroContent />
          </div>
        </section>
      </div>
    </div>
  );
}