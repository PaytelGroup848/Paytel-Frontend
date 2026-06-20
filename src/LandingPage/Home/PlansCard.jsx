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

// ─── Main Component ───────────────────────────────────────────────────────────
// export default function ProfessionalBanner() {
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const pinWrapRef = useRef(null);
//   const requestRef = useRef(null);
//   const maxProgressRef = useRef(0);
//   const [isMobile, setIsMobile] = useState(false);

//   // Responsive breakpoint
//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 1024);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   const handleScroll = useCallback(() => {
//     if (!pinWrapRef.current) {
//       requestRef.current = requestAnimationFrame(handleScroll);
//       return;
//     }

//     const rect = pinWrapRef.current.getBoundingClientRect();
//     const windowHeight = window.innerHeight;

//     if (rect.top > 0) {
//       maxProgressRef.current = 0;
//       setScrollProgress(0);
//       requestRef.current = requestAnimationFrame(handleScroll);
//       return;
//     }

//     const scrolledIntoPin = -rect.top;
//     // On mobile the transition is shorter to match the smaller screen
//     const pinRange = isMobile ? windowHeight * 0.45 : windowHeight * 0.6;

//     let rawProgress = scrolledIntoPin / pinRange;
//     rawProgress = Math.max(0, Math.min(1, rawProgress));

//     const progress = Math.max(rawProgress, maxProgressRef.current);
//     maxProgressRef.current = progress;

//     setScrollProgress(progress);

//     requestRef.current = requestAnimationFrame(handleScroll);
//   }, [isMobile]);

//   useEffect(() => {
//     requestRef.current = requestAnimationFrame(handleScroll);
//     return () => {
//       if (requestRef.current) cancelAnimationFrame(requestRef.current);
//     };
//   }, [handleScroll]);

//   const cardVisible = scrollProgress > 0.05;

//   // Adjust transition values for mobile
//   const imageTranslateX = isMobile ? -scrollProgress * 12 : -scrollProgress * 40;
//   const imageScale = 1 - scrollProgress * 0.05;
//   const cardTranslateX = (1 - scrollProgress) * (isMobile ? 40 : 140);

//   return (
//     <div className="relative" style={{ fontFamily: "'Inter', sans-serif" }}>
//       <Navbar />

//       {/* Pin wrapper — no top margin; starts directly after Navbar */}
//       <div ref={pinWrapRef} className="relative" style={{ height: isMobile ? "160vh" : "180vh" }}>
//         {/* Pinned content */}
//         <div className="sticky top-0 h-screen overflow-hidden">
//           <SceneBg />

//           <section className="relative z-10 h-full flex items-center">
//             <div className="w-full max-w-[92vw] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
//               <div className="grid grid-cols-1 lg:grid-cols-[1fr_580px] xl:grid-cols-[1fr_600px] gap-6 md:gap-8 lg:gap-14 xl:gap-20 items-center">

//                 {/* ─── LEFT CONTENT ─── */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//                   className="flex flex-col"
//                 >
//                   {/* Premium Badge */}
//                   <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/70 backdrop-blur-sm border border-purple-200/50 mb-4 sm:mb-6 w-fit shadow-sm">
//                     <Sparkles size={12} className="text-purple-400" />
//                     <span className="text-[10px] sm:text-[11px] font-medium text-purple-500 uppercase tracking-wider">
//                       Enterprise Cloud Platform
//                     </span>
//                   </div>

//                   {/* Main Heading */}
//                   <h1
//                     className="font-medium leading-[1.08] text-slate-700"
//                     style={{
//                       fontFamily: "'Plus Jakarta Sans', sans-serif",
//                       fontSize: "clamp(1.8rem, 5vw, 3.4rem)",
//                       letterSpacing: "-0.03em",
//                     }}
//                   >
//                     Cloud Infrastructure{" "}
//                     <span className="relative inline-block">
//                       <span
//                         className="relative z-10"
//                         style={{
//                           background:
//                             "linear-gradient(135deg, #a78bfa 0%, #c4b5fd 30%, #d8b4fe 60%, #818cf8 100%)",
//                           backgroundSize: "200% auto",
//                           WebkitBackgroundClip: "text",
//                           WebkitTextFillColor: "transparent",
//                           backgroundClip: "text",
//                           animation: "gradientShift 5s ease infinite",
//                         }}
//                       >
//                         Built to Scale
//                       </span>
//                       <motion.span
//                         className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full opacity-50"
//                         style={{
//                           background: "linear-gradient(90deg, #a78bfa, #d8b4fe, #818cf8)",
//                         }}
//                         initial={{ scaleX: 0 }}
//                         animate={{ scaleX: 1 }}
//                         transition={{ delay: 0.8, duration: 0.8 }}
//                       />
//                     </span>
//                   </h1>

//                   {/* Description */}
//                   <p
//                     className="mt-3 sm:mt-4 text-slate-500 leading-relaxed"
//                     style={{
//                       fontFamily: "'Inter', sans-serif",
//                       fontSize: "clamp(13px, 1.2vw, 16px)",
//                       maxWidth: "500px",
//                       lineHeight: 1.7,
//                       fontWeight: 400,
//                     }}
//                   >
//                     Enterprise-grade hosting, cloud applications & fully managed
//                     services trusted by{" "}
//                     <span className="text-slate-600 font-medium">2,000+ businesses</span>{" "}
//                     worldwide. Deploy, scale, and monitor with confidence.
//                   </p>

//                   {/* Pricing */}
//                   <div className="mt-5 sm:mt-7 flex items-baseline gap-2">
//                     <span className="text-slate-500 text-xs sm:text-sm font-normal">Starting at</span>
//                     <span className="flex items-baseline gap-1">
//                       <IndianRupee size={14} className="text-purple-400" />
//                       <span
//                         className="text-slate-800 font-medium"
//                         style={{
//                           fontFamily: "'Plus Jakarta Sans', sans-serif",
//                           fontSize: "clamp(20px, 3.5vw, 34px)",
//                           lineHeight: 1,
//                         }}
//                       >
//                         61
//                       </span>
//                       <span className="text-slate-500 text-xs sm:text-sm font-normal">/month</span>
//                     </span>
//                   </div>

//                   {/* Features */}
//                   <div className="mt-5 sm:mt-8 space-y-2 sm:space-y-3">
//                     {[
//                       { text: "Free SSL Certificate & Domain Name", icon: Globe },
//                       { text: "24/7 Premium Technical Support Team", icon: Headphones },
//                       { text: "99.99% Uptime SLA with Compensation", icon: TrendingUp },
//                       { text: "Automated Daily Backups & Recovery", icon: Database },
//                     ].map((feature, i) => (
//                       <motion.div
//                         key={i}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
//                         className="flex items-center gap-3 group cursor-default"
//                       >
//                         <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-100 group-hover:scale-110 transition-all duration-300 border border-purple-100">
//                           <feature.icon size={12} className="text-purple-400" />
//                         </div>
//                         <span className="text-[12px] sm:text-[13.5px] text-slate-600 font-normal group-hover:text-slate-800 transition-colors">
//                           {feature.text}
//                         </span>
//                       </motion.div>
//                     ))}
//                   </div>

//                   {/* Trust Stats */}
//                   <div className="mt-6 sm:mt-10 flex items-center gap-6 sm:gap-8 md:gap-12">
//                     {[
//                       { val: "2,000+", lbl: "Active Businesses" },
//                       { val: "99.99%", lbl: "Uptime Guarantee" },
//                       { val: "24/7", lbl: "Premium Support" },
//                     ].map(({ val, lbl }, i) => (
//                       <div key={lbl} className="relative">
//                         {i > 0 && (
//                           <div className="absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 w-px h-6 sm:h-8 bg-purple-200 hidden sm:block" />
//                         )}
//                         <span
//                           className="text-slate-800 font-medium block"
//                           style={{
//                             fontFamily: "'Plus Jakarta Sans', sans-serif",
//                             fontSize: "clamp(16px, 2.5vw, 26px)",
//                           }}
//                         >
//                           {val}
//                         </span>
//                         <span className="text-[10px] sm:text-[11px] text-purple-400 font-medium mt-0.5 block">
//                           {lbl}
//                         </span>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Guarantee */}
//                   <div className="mt-6 sm:mt-8 flex items-center gap-2">
//                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
//                     <p className="text-[11px] sm:text-[13px] text-slate-500 font-normal">
//                       <span className="text-emerald-600 font-medium">30-day money-back guarantee</span> —
//                       No questions asked, full refund if you're not satisfied
//                     </p>
//                   </div>
//                 </motion.div>

//                 {/* ─── RIGHT CONTENT ─── */}
//                 <div className="relative flex justify-center lg:justify-end w-full min-h-[320px] sm:min-h-[420px] lg:min-h-[550px]">
//                   {/* Hero Image — visible by default */}
//                   <div
//                     className="absolute inset-0 flex items-center justify-center lg:justify-end transition-all duration-300 ease-out"
//                     style={{
//                       opacity: Math.max(0, 1 - scrollProgress * 1.6),
//                       transform: `scale(${imageScale}) translateX(${imageTranslateX}px)`,
//                       filter: `blur(${scrollProgress * 6}px)`,
//                       pointerEvents: scrollProgress > 0.2 ? "none" : "auto",
//                     }}
//                   >
//                     <HeroImage />
//                   </div>

//                   {/* Demo Card — slides in from the right */}
//                   <div
//                     className="absolute inset-0 flex items-center justify-center lg:justify-end transition-all duration-300 ease-out"
//                     style={{
//                       opacity: scrollProgress,
//                       transform: `translateX(${cardTranslateX}px) scale(${0.92 + scrollProgress * 0.08})`,
//                       pointerEvents: cardVisible ? "auto" : "none",
//                       visibility: cardVisible ? "visible" : "hidden",
//                     }}
//                   >
//                     <DemoCard />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Scroll hint — hidden on mobile, fades out when transition completes */}
//           {scrollProgress < 0.95 && (
//             <motion.div
//               className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 hidden sm:flex flex-col items-center gap-2"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: scrollProgress < 0.1 ? 1 : 1 - scrollProgress }}
//             >
//               <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200 flex items-center justify-center shadow-lg">
//                 <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
//                   <ArrowRight size={16} className="text-purple-400 rotate-90" />
//                 </motion.div>
//               </div>
//               <span className="text-[10px] text-purple-400 font-medium">Scroll</span>
//             </motion.div>
//           )}
//         </div>
//       </div>

//       <style>{`
//         @keyframes gradientShift {
//           0%, 100% { background-position: 0% center; }
//           50% { background-position: 200% center; }
//         }
//       `}</style>
//     </div>
//   );
// }