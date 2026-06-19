import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Shield,
  IndianRupee,
  Cloud,
  Database,
  Cpu,
  Globe,
  Zap,
  TrendingUp,
  Headphones,
  ArrowRight,
} from "lucide-react";
import Navbar from "../Navbar";
import DemoCard from "./DemoCard";

// ─────────────────────────────────────────────────────────────────────────────
// Background – professional SaaS‑style
// ─────────────────────────────────────────────────────────────────────────────
function SceneBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#fbfaff] via-[#f6f3ff] to-[#fbfaff]" />
      <div className="absolute -top-40 -left-32 w-[55vw] h-[55vw] max-w-[680px] max-h-[680px] rounded-full bg-gradient-radial from-purple-200/40 via-purple-100/10 to-transparent blur-3xl" />
      <div className="absolute top-1/3 -right-40 w-[45vw] h-[45vw] max-w-[560px] max-h-[560px] rounded-full bg-gradient-radial from-indigo-200/35 via-indigo-100/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-[38vw] h-[38vw] max-w-[460px] max-h-[460px] rounded-full bg-gradient-radial from-fuchsia-200/25 to-transparent blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(rgba(139,92,246,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 35%, black 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 35%, black 40%, transparent 85%)",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300/40 to-transparent" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HeroImage – the original component (unchanged)
// ─────────────────────────────────────────────────────────────────────────────
function HeroImage() {
  return (
    <div className="relative w-full max-w-[580px] mx-auto">
      <div className="absolute -inset-8 bg-gradient-to-br from-purple-200/30 via-fuchsia-100/15 to-indigo-200/25 rounded-[3rem] blur-3xl" />

      <div className="relative rounded-2xl overflow-hidden border border-white/40 shadow-2xl shadow-purple-200/25">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 z-10 pointer-events-none" />

        <img
          src="/mainBanner.jpg"
          alt="Cloud Infrastructure"
          className="w-full h-auto object-cover"
        />

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-purple-900/30 to-transparent z-10" />

        <div className="absolute bottom-5 left-5 right-5 z-20">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-white/50 shadow-xl">
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: TrendingUp, label: "Uptime", value: "99.99%", color: "violet" },
                { icon: Zap, label: "Speed", value: "10Gbps", color: "purple" },
                { icon: Shield, label: "Security", value: "SSL/TLS", color: "indigo" },
              ].map((item, i) => (
                <div key={i} className={`text-center ${i < 2 ? "border-r border-violet-100" : ""}`}>
                  <div className={`w-9 h-9 mx-auto rounded-xl bg-${item.color}-100 flex items-center justify-center mb-2`}>
                    <item.icon size={15} className={`text-${item.color}-600`} />
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">{item.label}</div>
                  <div className="text-sm font-medium text-slate-800">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-6 -right-6 w-16 h-16 bg-white/70 backdrop-blur-lg rounded-2xl border border-white/50 flex items-center justify-center shadow-xl z-20"
      >
        <Cloud size={24} className="text-purple-400" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-6 -left-6 w-14 h-14 bg-white/70 backdrop-blur-lg rounded-2xl border border-white/50 flex items-center justify-center shadow-xl z-20"
      >
        <Database size={20} className="text-indigo-400" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 -right-8 w-10 h-10 bg-white/70 backdrop-blur-lg rounded-xl border border-white/50 flex items-center justify-center shadow-lg z-20"
      >
        <Cpu size={16} className="text-purple-400" />
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Hero – fully responsive, with scroll‑pin on desktop only
// ─────────────────────────────────────────────────────────────────────────────
export default function ProfessionalBanner() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const pinWrapRef = useRef(null);
  const requestRef = useRef(null);
  const maxProgressRef = useRef(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const check = () => setIsLargeScreen(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleScroll = useCallback(() => {
    if (!pinWrapRef.current || !isLargeScreen) {
      requestRef.current = requestAnimationFrame(handleScroll);
      return;
    }

    const rect = pinWrapRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top > 0) {
      maxProgressRef.current = 0;
      setScrollProgress(0);
      requestRef.current = requestAnimationFrame(handleScroll);
      return;
    }

    const scrolled = -rect.top;
    const range = windowHeight * 0.6;
    let raw = scrolled / range;
    raw = Math.max(0, Math.min(1, raw));

    const progress = Math.max(raw, maxProgressRef.current);
    maxProgressRef.current = progress;
    setScrollProgress(progress);

    requestRef.current = requestAnimationFrame(handleScroll);
  }, [isLargeScreen]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(handleScroll);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [handleScroll]);

  const cardVisible = scrollProgress > 0.05;

  // Shared content (left text + right column with HeroImage & DemoCard)
  const HeroContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">
      {/* ── LEFT CONTENT ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col max-w-xl mx-auto lg:mx-0"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-purple-200/50 mb-6 w-fit shadow-sm">
          <Sparkles size={13} className="text-purple-400" />
          <span className="text-[11px] font-medium text-purple-500 uppercase tracking-wider">
            Enterprise Cloud Platform
          </span>
        </div>

        {/* Heading */}
        <h1
          className="font-bold text-slate-800 leading-[1.1]"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            letterSpacing: "-0.03em",
          }}
        >
          Cloud Infrastructure{" "}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-purple-500 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Built to Scale
            </span>
            <motion.span
              className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full opacity-60 bg-gradient-to-r from-purple-500 via-violet-400 to-indigo-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            />
          </span>
        </h1>

        {/* Description */}
        <p className="mt-4 text-slate-500 leading-relaxed max-w-md text-sm sm:text-base">
          Enterprise-grade hosting, cloud applications & fully managed services trusted by{" "}
          <span className="text-slate-700 font-medium">2,000+ businesses</span> worldwide. Deploy,
          scale, and monitor with confidence.
        </p>

        {/* Pricing */}
        <div className="mt-7 flex items-baseline gap-2">
          <span className="text-slate-500 text-sm font-normal">Starting at</span>
          <span className="flex items-baseline gap-1">
            <IndianRupee size={18} className="text-purple-500" />
            <span className="text-slate-800 font-bold text-3xl sm:text-4xl">61</span>
            <span className="text-slate-500 text-sm">/month</span>
          </span>
        </div>

        {/* Features */}
        <div className="mt-8 space-y-3">
          {[
            { text: "Free SSL Certificate & Domain Name", icon: Globe },
            { text: "24/7 Premium Technical Support Team", icon: Headphones },
            { text: "99.99% Uptime SLA with Compensation", icon: TrendingUp },
            { text: "Automated Daily Backups & Recovery", icon: Database },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
              className="flex items-center gap-3 group cursor-default"
            >
              <div className="w-7 h-7 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-100 group-hover:scale-110 transition-all duration-300 border border-purple-100">
                <feature.icon size={13} className="text-purple-500" />
              </div>
              <span className="text-sm text-slate-600 font-normal group-hover:text-slate-800 transition-colors">
                {feature.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Trust stats */}
        <div className="mt-10 flex flex-wrap items-center gap-6 sm:gap-10">
          {[
            { val: "2,000+", lbl: "Active Businesses" },
            { val: "99.99%", lbl: "Uptime Guarantee" },
            { val: "24/7", lbl: "Premium Support" },
          ].map(({ val, lbl }, i) => (
            <div key={lbl} className="relative">
              {i > 0 && (
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-px h-8 bg-purple-200 hidden sm:block" />
              )}
              <span
                className="text-slate-800 font-bold block text-xl sm:text-2xl"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {val}
              </span>
              <span className="text-[11px] text-purple-500 font-medium mt-0.5 block">
                {lbl}
              </span>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div className="mt-8 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <p className="text-sm text-slate-500 font-normal">
            <span className="text-emerald-600 font-medium">30‑day money‑back guarantee</span> — No
            questions asked, full refund if you're not satisfied
          </p>
        </div>
      </motion.div>

      {/* ── RIGHT COLUMN – HeroImage & DemoCard (scroll transition) ── */}
      <div className="relative flex justify-center lg:justify-end w-full min-h-[320px] sm:min-h-[400px] lg:min-h-[550px]">
        {/* HeroImage – fades out and moves left as you scroll */}
        <div
          className="absolute inset-0 flex items-center justify-center lg:justify-end transition-all duration-300 ease-out"
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 1.6),
            transform: `scale(${1 - scrollProgress * 0.08}) translateX(${-scrollProgress * 40}px)`,
            filter: `blur(${scrollProgress * 6}px)`,
            pointerEvents: scrollProgress > 0.2 ? "none" : "auto",
          }}
        >
          <HeroImage />
        </div>

        {/* DemoCard – slides in from the right */}
        <div
          className="absolute inset-0 flex items-center justify-center lg:justify-end transition-all duration-300 ease-out"
          style={{
            opacity: scrollProgress,
            transform: `translateX(${(1 - scrollProgress) * 140}px) scale(${0.92 + scrollProgress * 0.08})`,
            pointerEvents: cardVisible ? "auto" : "none",
            visibility: cardVisible ? "visible" : "hidden",
          }}
        >
          <DemoCard />
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* Desktop: scroll‑pinned */}
      {isLargeScreen ? (
        <div ref={pinWrapRef} className="relative" style={{ height: "180vh" }}>
          <div className="sticky top-0 h-screen overflow-hidden">
            <SceneBg />
            <section className="relative z-10 h-full flex items-center">
              <div className="w-full max-w-[92vw] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
                <HeroContent />
              </div>
            </section>

            {/* Scroll hint */}
            {scrollProgress < 0.95 && (
              <motion.div
                className="absolute bottom-8 right-8 z-50 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: scrollProgress < 0.1 ? 1 : 1 - scrollProgress }}
              >
                <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200 flex items-center justify-center shadow-lg">
                  <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight size={16} className="text-purple-400 rotate-90" />
                  </motion.div>
                </div>
                <span className="text-[10px] text-purple-400 font-medium">Scroll</span>
              </motion.div>
            )}
          </div>
        </div>
      ) : (
        /* Mobile / tablet: normal flow, no pinning */
        <div className="relative">
          <SceneBg />
          <section className="relative z-10 pt-8 pb-16 sm:pt-12 sm:pb-20 px-4 sm:px-6">
            <div className="max-w-[92vw] mx-auto">
              <HeroContent />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}