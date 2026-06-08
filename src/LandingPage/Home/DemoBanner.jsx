/**
 * ProfessionalBanner — Professional Hero Banner
 *
 * Fonts required in index.html:
 * <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500&display=swap" rel="stylesheet"/>
 */

import { useEffect, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import {
  UserCircle,
  AtSign,
  Smartphone,
  Package,
  ChevronDown,
  ShieldCheck,
  ArrowRight,
  Zap,
  Globe,
  Lock,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import Navbar from "../Navbar";

// ─── Static Data ──────────────────────────────────────────────────────────────

const PRODUCTS = [
  "VPS",
  "WordPress Hosting",
  "Business Email",
  "PHP Hosting",
  "Tally on Cloud",
  "Marg on Cloud",
  "Busy on Cloud",
  "Education Management CRM",
  "Restaurant Management System",
];

const BADGES = [
  { icon: Lock, text: "Bank-grade Security" },
  { icon: Zap, text: "99.9% Uptime" },
  { icon: Globe, text: "Global CDN" },
  { icon: TrendingUp, text: "Auto-scaling" },
];

// Deterministic particles — no Math.random() on render
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: (i * 41 + 7) % 100,
  y: (i * 59 + 13) % 100,
  size: 1 + (i % 3) * 0.8,
  dur: 9 + (i % 8) * 1.5,
  delay: (i % 7) * 0.9,
  opacity: 0.1 + (i % 5) * 0.055,
  color: i % 3 === 0 ? "#38bdf8" : i % 3 === 1 ? "#a78bfa" : "#34d399",
}));

// ─── Background ───────────────────────────────────────────────────────────────

function SceneBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #03091c 0%, #050f28 40%, #070820 70%, #030810 100%)",
        }}
      />

      {/* Top aurora sweep */}
      <motion.div
        className="absolute -top-48 inset-x-0 h-[60vh]"
        style={{
          background:
            "conic-gradient(from 195deg at 48% -5%, transparent 0deg, rgba(14,165,233,0.28) 55deg, rgba(99,102,241,0.2) 110deg, rgba(20,184,166,0.14) 165deg, transparent 220deg)",
          filter: "blur(52px)",
        }}
        animate={{ rotate: [0, 6, -3, 0], scaleX: [1, 1.06, 0.97, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bottom-right violet bloom */}
      <motion.div
        className="absolute -bottom-40 -right-40 rounded-full"
        style={{
          width: "min(75vw, 780px)",
          height: "min(75vw, 780px)",
          background:
            "radial-gradient(ellipse, rgba(109,40,217,0.22) 0%, rgba(124,58,237,0.1) 40%, transparent 68%)",
          filter: "blur(72px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.55, 0.9, 0.55],
          x: [0, 28, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Left teal glow */}
      <motion.div
        className="absolute -left-28 rounded-full"
        style={{
          top: "22%",
          width: "min(52vw, 580px)",
          height: "min(52vw, 580px)",
          background:
            "radial-gradient(ellipse, rgba(13,148,136,0.2) 0%, rgba(6,182,212,0.09) 45%, transparent 68%)",
          filter: "blur(64px)",
        }}
        animate={{
          scale: [1, 1.14, 1],
          opacity: [0.5, 0.82, 0.5],
          y: [0, 22, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3.5,
        }}
      />

      {/* Center subtle bloom */}
      <motion.div
        className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "min(40vw, 480px)",
          height: "min(22vw, 260px)",
          background:
            "radial-gradient(ellipse, rgba(56,189,248,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ opacity: [0.4, 0.75, 0.4] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Fine mesh grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,1) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,1) 1px,transparent 1px)",
          backgroundSize: "68px 68px",
        }}
      />

      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 88% 78% at 50% 50%, transparent 48%, rgba(2,8,20,0.6) 100%)",
        }}
      />

      {/* Particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -26, 0],
            opacity: [p.opacity, Math.min(p.opacity * 3, 0.7), p.opacity],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* Horizontal streak 1 */}
      <motion.div
        className="absolute left-0 right-0 h-px top-[40%]"
        style={{
          background:
            "linear-gradient(90deg,transparent 0%,rgba(56,189,248,0.22) 35%,rgba(129,140,248,0.28) 58%,rgba(52,211,153,0.14) 78%,transparent 100%)",
        }}
        animate={{ opacity: [0, 1, 0], scaleX: [0.65, 1, 0.65] }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
      {/* Streak 2 */}
      <motion.div
        className="absolute w-full h-px"
        style={{
          top: "65%",
          transform: "rotate(-1.5deg)",
          background:
            "linear-gradient(90deg,transparent 15%,rgba(139,92,246,0.18) 50%,transparent 85%)",
        }}
        animate={{ opacity: [0, 0.75, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />
    </div>
  );
}

// ─── Demo Card ────────────────────────────────────────────────────────────────

function LeadCaptureCard() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const dropRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (r) setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  useEffect(() => {
    const close = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((p) => ({ ...p, [name]: value }));
      if (success) setSuccess("");
      if (error) setError("");
    },
    [success, error],
  );

  const handleSelect = useCallback((v) => {
    setFormData((p) => ({ ...p, product: v }));
    setOpen(false);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { name, email, phone, product } = formData;
      if (!name || !email || !phone || !product) {
        setError("Please fill all required fields.");
        return;
      }
      setLoading(true);
      try {
        const res = await axios.post(
          "https://api.marketing.cloudedata.com/api/public/submit",
          {
            name,
            email,
            phone,
            product,
            message: "No message provided",
          },
        );
        if (res.data.success) {
          setSuccess("We'll be in touch shortly!");
          setFormData({ name: "", email: "", phone: "", product: "" });
        } else {
          setError("Submission failed. Please retry.");
        }
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [formData],
  );

  const inp =
    "w-full pl-10 pr-3 py-[11px] rounded-xl text-[13.5px] text-white placeholder:text-slate-500 " +
    "bg-white/[0.05] border border-white/[0.09] " +
    "focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.08] transition-all duration-200";

  const iconCls = "absolute left-3 top-1/2 -translate-y-1/2 text-slate-500";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, x: 40, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: 0.25, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
      style={{ maxWidth: "520px" }}
    >
      {/* ── Traveling beam border ── */}
      <div
        className="absolute -inset-[1.5px] rounded-[24px] z-0 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.055)" }}
      >
        {/* Beam 1 — cyan/violet L→R */}
        <motion.div
          className="absolute top-0 bottom-0 w-[140px]"
          style={{
            background:
              "linear-gradient(90deg,transparent 0%,rgba(56,189,248,0.95) 38%,rgba(139,92,246,0.85) 62%,transparent 100%)",
            filter: "blur(2.5px)",
          }}
          animate={{ x: ["-140px", "560px"] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 1.4,
          }}
        />
        {/* Beam 2 — emerald/indigo, delayed */}
        <motion.div
          className="absolute top-0 bottom-0 w-[90px]"
          style={{
            background:
              "linear-gradient(90deg,transparent 0%,rgba(52,211,153,0.7) 45%,rgba(99,102,241,0.65) 70%,transparent 100%)",
            filter: "blur(3px)",
          }}
          animate={{ x: ["-90px", "560px"] }}
          transition={{
            duration: 3.0,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 1.0,
            delay: 1.8,
          }}
        />
      </div>

      {/* ── Mouse glare ── */}
      <div
        className="absolute inset-0 rounded-[23px] z-0 pointer-events-none overflow-hidden"
        style={{
          background: `radial-gradient(220px circle at ${mouse.x}px ${mouse.y}px, rgba(56,189,248,0.07), transparent 70%)`,
        }}
      />

      {/* ── Card body ── */}
      <div
        className="relative z-10 rounded-[23px] overflow-hidden"
        style={{
          background:
            "linear-gradient(148deg, rgba(10,18,44,0.97) 0%, rgba(6,11,30,0.99) 55%, rgba(9,7,26,0.98) 100%)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          boxShadow:
            "0 0 0 1px rgba(56,189,248,0.07) inset, 0 0 70px rgba(56,189,248,0.035) inset, 0 40px 100px rgba(0,0,0,0.65)",
        }}
      >
        {/* Inner top glow */}
        <div
          className="absolute -top-14 left-1/2 -translate-x-1/2 w-80 h-28 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse,rgba(56,189,248,0.11) 0%,transparent 70%)",
            filter: "blur(18px)",
          }}
        />
        {/* Inner corner accent */}
        <div
          className="absolute -bottom-8 -right-8 w-52 h-52 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle,rgba(139,92,246,0.09) 0%,transparent 65%)",
            filter: "blur(22px)",
          }}
        />

        {/* Top chromatic line */}
        <div
          className="relative h-px w-full z-10"
          style={{
            background:
              "linear-gradient(90deg,transparent 0%,rgba(56,189,248,1) 22%,rgba(139,92,246,1) 50%,rgba(52,211,153,0.85) 78%,transparent 100%)",
          }}
        />

        <div className="px-8 py-8 sm:px-9 sm:py-9">
          {/* Card header */}
          <div className="mb-7">
            <div className="flex items-center gap-2 mb-3.5"></div>
            <h3
              className="text-[22px] sm:text-[24px] text-white font-medium leading-tight"
              style={{
                fontFamily: "'Outfit', sans-serif",
                letterSpacing: "-0.015em",
              }}
            >
              Get a Live Demo
            </h3>
            <p
              className="mt-1.5 text-[13px] text-slate-400 font-light leading-relaxed"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Our cloud specialists will reach out within 24 hrs.
            </p>
          </div>

          {/* Alerts */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-5 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-light"
              >
                ✓ {success}
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-light"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Name */}
            <div className="relative">
              <UserCircle size={15} className={iconCls} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className={inp}
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <AtSign size={15} className={iconCls} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Work Email"
                required
                className={inp}
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <Smartphone size={15} className={iconCls} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className={inp}
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              />
            </div>

            {/* Dropdown */}
            <div className="relative" ref={dropRef}>
              <Package size={15} className={iconCls + " z-10"} />
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={
                  "w-full pl-10 pr-9 py-[11px] rounded-xl text-[13.5px] text-left transition-all duration-200 " +
                  "bg-white/[0.05] border border-white/[0.09] " +
                  (open ? "border-cyan-400/40 bg-white/[0.08] " : "") +
                  (formData.product ? "text-white" : "text-slate-500") +
                  " font-light"
                }
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {formData.product || "Select Service"}
                <ChevronDown
                  size={14}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {open && (
                  <motion.ul
                    initial={{ opacity: 0, y: -5, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.98 }}
                    transition={{ duration: 0.13 }}
                    className="absolute z-50 w-full mt-1.5 rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.65)]"
                    style={{
                      background: "rgba(5,10,28,0.98)",
                      backdropFilter: "blur(28px)",
                    }}
                  >
                    <div className="p-1.5 max-h-52 overflow-y-auto">
                      {PRODUCTS.map((p) => (
                        <li key={p} className="list-none">
                          <button
                            type="button"
                            onClick={() => handleSelect(p)}
                            className={
                              "w-full text-left px-3.5 py-2.5 rounded-xl text-[13px] transition-all duration-150 font-light " +
                              (formData.product === p
                                ? "text-cyan-400 bg-cyan-500/10"
                                : "text-slate-300 hover:text-white hover:bg-white/[0.06]")
                            }
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                            }}
                          >
                            {p}
                          </button>
                        </li>
                      ))}
                    </div>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Submit button — reverse sheen (right → left) */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.012 }}
              whileTap={{ scale: 0.988 }}
              className="relative w-full py-3.5 mt-1 rounded-xl text-[13.5px] font-medium text-white overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                fontFamily: "'Outfit', sans-serif",
                background:
                  "linear-gradient(135deg, #7c3aed 0%, #2563eb 45%, #0ea5e9 100%)",
                backgroundSize: "220% auto",
                animation: loading ? "none" : "btnFlow 3.5s linear infinite",
                boxShadow:
                  "0 8px 28px rgba(124,58,237,0.3), 0 0 0 1px rgba(139,92,246,0.18) inset",
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <motion.span
                    animate={{ opacity: [1, 0.45, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                  >
                    Submitting…
                  </motion.span>
                ) : (
                  <>
                    {" "}
                    Request Live Demo <ArrowRight size={15} />{" "}
                  </>
                )}
              </span>
              {/* Reverse sheen — right to left */}
              {!loading && (
                <span
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.1) 50%, transparent 65%)",
                    animation: "sheenRTL 3s ease infinite",
                  }}
                />
              )}
            </motion.button>
          </form>

          {/* Trust row */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <ShieldCheck size={12} className="text-slate-600" />
            <span
              className="text-[11px] text-slate-600 font-light"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Secure &amp; confidential · never spammed
            </span>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg,transparent 0%,rgba(139,92,246,0.35) 40%,rgba(56,189,248,0.25) 65%,transparent 100%)",
          }}
        />
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes btnFlow {
          0%   { background-position: 200% center }
          100% { background-position:   0% center }
        }
        @keyframes sheenRTL {
          0%   { transform: translateX(100%) }
          40%  { transform: translateX(100%) }
          60%  { transform: translateX(-100%) }
          100% { transform: translateX(-100%) }
        }
      `}</style>
    </motion.div>
  );
}

// ─── Main Banner ──────────────────────────────────────────────────────────────

export default function ProfessionalBanner() {
  return (
    <div
      className="relative min-h-svh overflow-hidden"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <SceneBg />
      <Navbar />

      {/* Hero — absolute so it takes zero extra space */}
      <section className="absolute inset-0 z-10 flex items-center">
        <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pt-20 pb-10 sm:pt-24 sm:pb-14 lg:pt-0 lg:pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_540px] gap-10 lg:gap-14 xl:gap-20 items-center">
            {/* ── Left copy ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col"
            >
              {/* Headline */}
              <h1
                className="font-medium leading-[1.08] text-white"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(2.1rem, 5.2vw, 4rem)",
                  letterSpacing: "-0.025em",
                }}
              >
                Cloud Infrastructure
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(95deg, #38bdf8 0%, #a78bfa 48%, #34d399 100%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "gradFlow 6s linear infinite",
                  }}
                >
                  Built to Scale.
                </span>
              </h1>

              {/* Sub */}
              <p
                className="mt-4 sm:mt-5 text-slate-400 font-light leading-relaxed"
                style={{
                  fontSize: "clamp(13.5px, 1.45vw, 15.5px)",
                  maxWidth: "460px",
                }}
              >
                Enterprise hosting, cloud apps &amp; managed services — trusted
                by 2,000+ businesses.
              </p>

              {/* Badges 2×2 */}
              <div className="mt-8 sm:mt-9 grid grid-cols-2 gap-2.5 max-w-[360px] sm:max-w-[400px]">
                {BADGES.map(({ icon: Icon, text }, i) => (
                  <motion.div
                    key={text}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      borderColor: "rgba(255,255,255,0.065)",
                    }}
                  >
                    <div
                      className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center"
                      style={{
                        background: "rgba(56,189,248,0.1)",
                        border: "1px solid rgba(56,189,248,0.15)",
                      }}
                    >
                      <Icon size={12} className="text-cyan-400" />
                    </div>
                    <span className="text-[12px] text-slate-300 font-light leading-tight">
                      {text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.72 }}
                className="mt-8 sm:mt-10 flex items-center gap-7 sm:gap-10 flex-wrap"
              >
                {[
                  { val: "2,000+", lbl: "Businesses" },
                  { val: "99.9%", lbl: "Uptime SLA" },
                  { val: "24/7", lbl: "Support" },
                ].map(({ val, lbl }, i) => (
                  <div key={lbl} className="flex flex-col">
                    {i > 0 && (
                      <div
                        className="hidden sm:block absolute -left-4 top-1/2 -translate-y-1/2 w-px h-6"
                        style={{ background: "rgba(255,255,255,0.08)" }}
                      />
                    )}
                    <span
                      className="text-white font-medium"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "clamp(18px, 2vw, 24px)",
                      }}
                    >
                      {val}
                    </span>
                    <span className="text-[11px] text-slate-500 font-light mt-0.5">
                      {lbl}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Right: card ── */}
            <div className="flex justify-center lg:justify-end w-full">
              <LeadCaptureCard />
            </div>
          </div>
        </div>
      </section>

      {/* Global keyframes */}
      <style>{`
        @keyframes gradFlow {
          0%   { background-position: 0%   center }
          100% { background-position: 200% center }
        }
      `}</style>
    </div>
  );
}
