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

// ─── Background ─────────────────────────────────────────────────────────────
// Clean, professional SaaS‑style backdrop — soft lavender wash, subtle
// blurred colour fields, faint dot grid. No noisy particles.
function SceneBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #fbfaff 0%, #f6f3ff 35%, #f8f5ff 65%, #fbfaff 100%)",
        }}
      />

      {/* Soft colour fields — large, low‑opacity, professional */}
      <div
        className="absolute -top-40 -left-32 w-[55vw] h-[55vw] max-w-[680px] max-h-[680px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(196,181,253,0.35), rgba(221,214,254,0.12) 55%, transparent 75%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute top-1/3 -right-40 w-[45vw] h-[45vw] max-w-[560px] max-h-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(165,180,252,0.3), rgba(199,210,254,0.1) 55%, transparent 75%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-[38vw] h-[38vw] max-w-[460px] max-h-[460px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(216,180,254,0.22), transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Faint dot grid — common SaaS texture */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(139,92,246,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 35%, black 40%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 35%, black 40%, transparent 85%)",
        }}
      />

      {/* Hairline top border, common on premium SaaS heroes */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,92,246,0.25), transparent)",
        }}
      />
    </div>
  );
}

// ─── Hero Image ───────────────────────────────────────────────────────────────
function HeroImage() {
  return (
    <div className="relative w-full max-w-[320px] sm:max-w-[440px] md:max-w-[580px] mx-auto">
      <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-br from-purple-200/30 via-fuchsia-100/15 to-indigo-200/25 rounded-[2rem] md:rounded-[3rem] blur-2xl md:blur-3xl" />

      <div className="relative rounded-xl md:rounded-2xl overflow-hidden border border-white/40 shadow-xl md:shadow-2xl shadow-purple-200/25">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 z-10 pointer-events-none" />

        <img
          src="/mainBanner.jpg"
          alt="Cloud Infrastructure"
          className="w-full h-auto object-cover"
        />

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-purple-900/30 to-transparent z-10" />

        {/* Stats panel */}
        <div className="absolute bottom-2 sm:bottom-5 left-2 sm:left-5 right-2 sm:right-5 z-20">
          <div className="bg-white/80 backdrop-blur-xl rounded-xl md:rounded-2xl p-3 sm:p-5 border border-white/50 shadow-lg md:shadow-xl">
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {[
                { icon: TrendingUp, label: "Uptime", value: "99.99%", color: "violet" },
                { icon: Zap, label: "Speed", value: "10Gbps", color: "purple" },
                { icon: Shield, label: "Security", value: "SSL/TLS", color: "indigo" },
              ].map((item, i) => (
                <div key={i} className={`text-center ${i < 2 ? "border-r border-violet-100" : ""}`}>
                  <div className={`w-7 h-7 sm:w-9 sm:h-9 mx-auto rounded-lg sm:rounded-xl bg-${item.color}-100 flex items-center justify-center mb-1 sm:mb-2`}>
                    <item.icon size={13} className={`text-${item.color}-600`} />
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-slate-500 font-medium">{item.label}</div>
                  <div className="text-xs sm:text-sm font-medium text-slate-800">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating icons — hidden on very small screens */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-10 h-10 sm:w-16 sm:h-16 bg-white/70 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/50 flex items-center justify-center shadow-lg sm:shadow-xl z-20"
      >
        <Cloud size={18} className="text-purple-400" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-10 h-10 sm:w-14 sm:h-14 bg-white/70 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/50 flex items-center justify-center shadow-lg sm:shadow-xl z-20"
      >
        <Database size={16} className="text-indigo-400" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 -right-6 sm:-right-8 w-8 h-8 sm:w-10 sm:h-10 bg-white/70 backdrop-blur-lg rounded-lg sm:rounded-xl border border-white/50 flex items-center justify-center shadow-md sm:shadow-lg z-20"
      >
        <Cpu size={14} className="text-purple-400" />
      </motion.div>
    </div>
  );
}

