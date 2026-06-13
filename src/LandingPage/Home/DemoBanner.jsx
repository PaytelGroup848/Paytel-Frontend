import { useEffect, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import clsx from "clsx";
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
  Search,
  Check,
  AlertCircle,
  Phone,
} from "lucide-react";
import Navbar from "../Navbar";
import FlagIcon from "../FlagIcon";
import { COUNTRIES } from "../countries";
import { VALIDATION_RULES } from "../validationRules";

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

// Deterministic particles
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
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #03091c 0%, #050f28 40%, #070820 70%, #030810 100%)",
        }}
      />

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

      <motion.div
        className="absolute -bottom-40 -right-40 rounded-full"
        style={{
          width: "min(75vw, 780px)",
          height: "min(75vw, 780px)",
          background:
            "radial-gradient(ellipse, rgba(109,40,217,0.22) 0%, rgba(124,58,237,0.1) 40%, transparent 68%)",
          filter: "blur(72px)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.55, 0.9, 0.55], x: [0, 28, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

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
        animate={{ scale: [1, 1.14, 1], opacity: [0.5, 0.82, 0.5], y: [0, 22, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
      />

      <motion.div
        className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "min(40vw, 480px)",
          height: "min(22vw, 260px)",
          background: "radial-gradient(ellipse, rgba(56,189,248,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,1) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,1) 1px,transparent 1px)",
          backgroundSize: "68px 68px",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 88% 78% at 50% 50%, transparent 48%, rgba(2,8,20,0.6) 100%)",
        }}
      />

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

      <motion.div
        className="absolute left-0 right-0 h-px top-[40%]"
        style={{
          background:
            "linear-gradient(90deg,transparent 0%,rgba(56,189,248,0.22) 35%,rgba(129,140,248,0.28) 58%,rgba(52,211,153,0.14) 78%,transparent 100%)",
        }}
        animate={{ opacity: [0, 1, 0], scaleX: [0.65, 1, 0.65] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      <motion.div
        className="absolute w-full h-px"
        style={{
          top: "65%",
          transform: "rotate(-1.5deg)",
          background:
            "linear-gradient(90deg,transparent 15%,rgba(139,92,246,0.18) 50%,transparent 85%)",
        }}
        animate={{ opacity: [0, 0.75, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 5 }}
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
    description: "",
  });
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const cardRef = useRef(null);
  const dropRef = useRef(null);
  const countryDropRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (r) setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  useEffect(() => {
    const close = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false);
      if (countryDropRef.current && !countryDropRef.current.contains(e.target)) {
        setCountryOpen(false);
        setCountrySearch("");
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch)
  );

  const validateField = useCallback(
    (name, value) => {
      const rules = VALIDATION_RULES[name];
      if (!rules) return "";

      if (name === "phone") {
        if (!value) return rules.messages.required;
        if (!selectedCountry.pattern.test(value)) return rules.messages.invalid;
        return "";
      }

      if (rules.required && !value.trim()) return rules.messages.required;
      if (rules.minLength && value.trim().length < rules.minLength)
        return rules.messages.minLength;
      if (rules.maxLength && value.trim().length > rules.maxLength)
        return rules.messages.maxLength;
      if (rules.pattern && !rules.pattern.test(value.trim()))
        return rules.messages.pattern;

      return "";
    },
    [selectedCountry]
  );

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      if (name === "phone") {
        const numericValue = value.replace(/\D/g, "");
        if (numericValue.length <= selectedCountry.length) {
          setFormData((p) => ({ ...p, [name]: numericValue }));
        }
      } else {
        setFormData((p) => ({ ...p, [name]: value }));
      }

      if (success) setSuccess("");
      if (error) setError("");

      setTouched((prev) => {
        const newTouched = { ...prev, [name]: true };
        const errorMsg = validateField(name, name === "phone" ? value.replace(/\D/g, "") : value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: newTouched[name] ? errorMsg : prevErrors[name],
        }));
        return newTouched;
      });
    },
    [success, error, selectedCountry, validateField]
  );

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    },
    [validateField]
  );

  const handleSelect = useCallback((v) => {
    setFormData((p) => ({ ...p, product: v }));
    setOpen(false);
    setTouched((prev) => ({ ...prev, product: true }));
    setErrors((prev) => ({ ...prev, product: "" }));
  }, []);

  const handleCountrySelect = useCallback((country) => {
    setSelectedCountry(country);
    setCountryOpen(false);
    setCountrySearch("");
    setFormData((p) => ({ ...p, phone: "" }));
    setErrors((prev) => ({ ...prev, phone: "" }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    const newTouched = {};

    Object.keys(VALIDATION_RULES).forEach((key) => {
      newTouched[key] = true;
      const errorMsg = validateField(key, formData[key]);
      if (errorMsg) newErrors[key] = errorMsg;
    });

    setErrors(newErrors);
    setTouched(newTouched);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      const { name, email, phone, product, description } = formData;

      setLoading(true);
      try {
        const res = await axios.post(
          "https://api.marketing.cloudedata.com/api/public/submit",
          {
            name,
            email,
            phone: `${selectedCountry.code}${phone}`,
            product,
            description,
            country: selectedCountry.name,
            message: description || "No message provided",
          }
        );
        if (res.data.success) {
          setSuccess("We'll be in touch shortly!");
          setFormData({ name: "", email: "", phone: "", product: "", description: "" });
          setErrors({});
          setTouched({});
        } else {
          setError("Submission failed. Please retry.");
        }
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [formData, selectedCountry, validateForm]
  );

  const inp =
    "w-full pl-10 pr-3 py-[11px] rounded-xl text-[13.5px] text-white placeholder:text-slate-500 " +
    "bg-white/[0.05] border border-white/[0.09] " +
    "focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.08] transition-all duration-200";

  const iconCls = "absolute left-3 top-1/2 -translate-y-1/2 text-slate-500";

  const getInputBorderClass = (fieldName) => {
    if (errors[fieldName] && touched[fieldName]) return "border-red-400/40";
    if (touched[fieldName] && !errors[fieldName]) return "border-emerald-400/40";
    return "border-white/[0.09]";
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, x: 40, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: 0.25, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[520px]"
    >
      {/* Traveling beam border */}
      <div
        className="absolute -inset-[1.5px] rounded-[24px] z-0 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.055)" }}
      >
        <motion.div
          className="absolute top-0 bottom-0 w-[140px]"
          style={{
            background:
              "linear-gradient(90deg,transparent 0%,rgba(56,189,248,0.95) 38%,rgba(139,92,246,0.85) 62%,transparent 100%)",
            filter: "blur(2.5px)",
          }}
          animate={{ x: ["-140px", "560px"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.4 }}
        />
        <motion.div
          className="absolute top-0 bottom-0 w-[90px]"
          style={{
            background:
              "linear-gradient(90deg,transparent 0%,rgba(52,211,153,0.7) 45%,rgba(99,102,241,0.65) 70%,transparent 100%)",
            filter: "blur(3px)",
          }}
          animate={{ x: ["-90px", "560px"] }}
          transition={{ duration: 3.0, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.0, delay: 1.8 }}
        />
      </div>

      {/* Mouse glare */}
      <div
        className="absolute inset-0 rounded-[23px] z-0 pointer-events-none overflow-hidden"
        style={{
          background: `radial-gradient(220px circle at ${mouse.x}px ${mouse.y}px, rgba(56,189,248,0.07), transparent 70%)`,
        }}
      />

      {/* Card body */}
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
        <div
          className="absolute -top-14 left-1/2 -translate-x-1/2 w-80 h-28 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse,rgba(56,189,248,0.11) 0%,transparent 70%)",
            filter: "blur(18px)",
          }}
        />
        <div
          className="absolute -bottom-8 -right-8 w-52 h-52 pointer-events-none"
          style={{
            background: "radial-gradient(circle,rgba(139,92,246,0.09) 0%,transparent 65%)",
            filter: "blur(22px)",
          }}
        />

        <div
          className="relative h-px w-full z-10"
          style={{
            background:
              "linear-gradient(90deg,transparent 0%,rgba(56,189,248,1) 22%,rgba(139,92,246,1) 50%,rgba(52,211,153,0.85) 78%,transparent 100%)",
          }}
        />

        <div className="px-6 py-8 sm:px-8 sm:py-8">
          <div className="mb-7">
            <div className="flex items-center gap-2 mb-3.5"></div>
            <h3
              className="text-[22px] sm:text-[24px] text-white font-medium leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.015em" }}
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

          <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
            {/* Name Field */}
            <div>
              <div className="relative">
                <UserCircle size={15} className={iconCls} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Full Name"
                  className={clsx(inp, getInputBorderClass("name"))}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  autoComplete="name"
                />
                {touched.name && !errors.name && formData.name && (
                  <Check size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400" />
                )}
                {errors.name && touched.name && (
                  <AlertCircle size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400" />
                )}
              </div>
              <AnimatePresence>
                {errors.name && touched.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -4, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -4, height: 0 }}
                    className="text-[11px] text-red-400 mt-1.5 ml-1 font-light"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Email Field */}
            <div>
              <div className="relative">
                <AtSign size={15} className={iconCls} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Work Email"
                  className={clsx(inp, getInputBorderClass("email"))}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  autoComplete="email"
                />
                {touched.email && !errors.email && formData.email && (
                  <Check size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400" />
                )}
                {errors.email && touched.email && (
                  <AlertCircle size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400" />
                )}
              </div>
              <AnimatePresence>
                {errors.email && touched.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -4, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -4, height: 0 }}
                    className="text-[11px] text-red-400 mt-1.5 ml-1 font-light"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Phone Field with Country Code */}
            <div>
              <div className="relative flex gap-2">
                <div className="relative" ref={countryDropRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setCountryOpen(!countryOpen);
                      setCountrySearch("");
                    }}
                    className={clsx(
                      "h-[44px] px-2.5 rounded-xl text-[13.5px] font-light flex items-center gap-2 transition-all duration-200 flex-shrink-0",
                      "bg-white/[0.05] border",
                      countryOpen ? "border-cyan-400/40 bg-white/[0.08]" : "border-white/[0.09]",
                      "hover:border-white/[0.15]"
                    )}
                    style={{ fontFamily: "'Space Grotesk', sans-serif", minWidth: "95px" }}
                  >
                    <FlagIcon countryCode={selectedCountry.countryCode} />
                    <span className="text-white text-xs">{selectedCountry.code}</span>
                    <ChevronDown
                      size={12}
                      className={clsx("text-slate-500 transition-transform duration-200", countryOpen && "rotate-180")}
                    />
                  </button>

                  <AnimatePresence>
                    {countryOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.98 }}
                        transition={{ duration: 0.13 }}
                        className="absolute z-50 left-0 mt-1.5 w-64 rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.65)]"
                        style={{ background: "rgba(5,10,28,0.98)", backdropFilter: "blur(28px)" }}
                      >
                        <div className="p-2 border-b border-white/[0.06]">
                          <div className="relative">
                            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                              type="text"
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              placeholder="Search country..."
                              className="w-full pl-8 pr-3 py-2 rounded-lg text-xs text-white bg-white/[0.04] border border-white/[0.06] focus:outline-none focus:border-cyan-400/30 placeholder:text-slate-600"
                              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                              autoFocus
                            />
                          </div>
                        </div>
                        <div className="p-1.5 max-h-48 overflow-y-auto custom-scrollbar">
                          {filteredCountries.map((country) => (
                            <button
                              key={`${country.code}-${country.name}`}
                              type="button"
                              onClick={() => handleCountrySelect(country)}
                              className={clsx(
                                "w-full text-left px-3 py-2.5 rounded-xl text-[13px] transition-all duration-150 font-light flex items-center gap-3",
                                selectedCountry.code === country.code && selectedCountry.name === country.name
                                  ? "text-cyan-400 bg-cyan-500/10"
                                  : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                              )}
                              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                              <FlagIcon countryCode={country.countryCode} />
                              <span className="flex-1">{country.name}</span>
                              <span className="text-slate-500 text-xs">{country.code}</span>
                              {selectedCountry.code === country.code && selectedCountry.name === country.name && (
                                <Check size={14} className="text-cyan-400" />
                              )}
                            </button>
                          ))}
                          {filteredCountries.length === 0 && (
                            <div className="px-3 py-4 text-center text-slate-500 text-xs">No countries found</div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative flex-1">
                  <Phone size={15} className={iconCls} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={`Phone Number (${selectedCountry.length} digits)`}
                    className={clsx(inp, "pl-10", getInputBorderClass("phone"))}
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    autoComplete="tel"
                    maxLength={selectedCountry.length}
                  />
                  {touched.phone && !errors.phone && formData.phone && (
                    <Check size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400" />
                  )}
                  {errors.phone && touched.phone && (
                    <AlertCircle size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400" />
                  )}
                </div>
              </div>
              <AnimatePresence>
                {errors.phone && touched.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -4, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -4, height: 0 }}
                    className="text-[11px] text-red-400 mt-1.5 ml-1 font-light"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {errors.phone}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Product Selection */}
            <div>
              <div className="relative" ref={dropRef}>
                <Package size={15} className={iconCls + " z-10"} />
                <button
                  type="button"
                  onClick={() => {
                    setOpen((v) => !v);
                    setTouched((prev) => ({ ...prev, product: true }));
                  }}
                  className={clsx(
                    "w-full pl-10 pr-9 py-[11px] rounded-xl text-[13.5px] text-left transition-all duration-200 font-light",
                    "bg-white/[0.05] border",
                    open && "border-cyan-400/40 bg-white/[0.08]",
                    errors.product && touched.product
                      ? "border-red-400/40"
                      : touched.product && !errors.product && formData.product
                      ? "border-emerald-400/40"
                      : "border-white/[0.09]",
                    formData.product ? "text-white" : "text-slate-500"
                  )}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {formData.product || "Select Service"}
                  <ChevronDown
                    size={14}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  />
                  {touched.product && !errors.product && formData.product && (
                    <Check size={14} className="absolute right-8 top-1/2 -translate-y-1/2 text-emerald-400" />
                  )}
                </button>

                <AnimatePresence>
                  {open && (
                    <motion.ul
                      initial={{ opacity: 0, y: -5, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -5, scale: 0.98 }}
                      transition={{ duration: 0.13 }}
                      className="absolute z-50 w-full mt-1.5 rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.65)]"
                      style={{ background: "rgba(5,10,28,0.98)", backdropFilter: "blur(28px)" }}
                    >
                      <div className="p-1.5 max-h-47 overflow-y-auto">
                        {PRODUCTS.map((p) => (
                          <li key={p} className="list-none">
                            <button
                              type="button"
                              onClick={() => handleSelect(p)}
                              className={clsx(
                                "w-full text-left px-3.5 py-2.5 rounded-xl text-[13px] transition-all duration-150 font-light",
                                formData.product === p
                                  ? "text-cyan-400 bg-cyan-500/10"
                                  : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                              )}
                              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
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
              <AnimatePresence>
                {errors.product && touched.product && (
                  <motion.p
                    initial={{ opacity: 0, y: -4, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -4, height: 0 }}
                    className="text-[11px] text-red-400 mt-1.5 ml-1 font-light"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {errors.product}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Description Field */}
            <div>
              <div className="relative">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Describe your requirements (optional)"
                  rows={3}
                  className={clsx(
                    "w-full pl-3 pr-3 py-[11px] rounded-xl text-[13.5px] text-white placeholder:text-slate-500 resize-none",
                    "bg-white/[0.05] border transition-all duration-200",
                    "focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.08]",
                    getInputBorderClass("description")
                  )}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                />
                {formData.description && (
                  <span className="absolute bottom-2 right-3 text-[10px] text-slate-600">
                    {formData.description.length}/500
                  </span>
                )}
              </div>
              <AnimatePresence>
                {errors.description && touched.description && (
                  <motion.p
                    initial={{ opacity: 0, y: -4, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -4, height: 0 }}
                    className="text-[11px] text-red-400 mt-1.5 ml-1 font-light"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {errors.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.012 }}
              whileTap={{ scale: 0.988 }}
              className={clsx(
                "relative w-full py-3.5 mt-1 rounded-xl text-[13.5px] font-medium text-white overflow-hidden",
                "disabled:opacity-60 disabled:cursor-not-allowed"
              )}
              style={{
                fontFamily: "'Outfit', sans-serif",
                background: "linear-gradient(135deg, #7c3aed 0%, #2563eb 45%, #0ea5e9 100%)",
                backgroundSize: "220% auto",
                animation: loading ? "none" : "btnFlow 3.5s linear infinite",
                boxShadow: "0 8px 28px rgba(124,58,237,0.3), 0 0 0 1px rgba(139,92,246,0.18) inset",
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <motion.span animate={{ opacity: [1, 0.45, 1] }} transition={{ duration: 0.9, repeat: Infinity }}>
                    Submitting…
                  </motion.span>
                ) : (
                  <>
                    {" "}
                    Request Live Demo <ArrowRight size={15} />{" "}
                  </>
                )}
              </span>
              {!loading && (
                <span
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.1) 50%, transparent 65%)",
                    animation: "sheenRTL 3s ease infinite",
                  }}
                />
              )}
            </motion.button>
          </form>

          <div className="flex items-center justify-center gap-2 mt-6">
            <ShieldCheck size={12} className="text-slate-600" />
            <span
              className="text-[11px] text-slate-600 font-light"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Secure & confidential · never spammed
            </span>
          </div>
        </div>

        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg,transparent 0%,rgba(139,92,246,0.35) 40%,rgba(56,189,248,0.25) 65%,transparent 100%)",
          }}
        />
      </div>

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
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
      `}</style>
    </motion.div>
  );
}

// ─── Main Banner ──────────────────────────────────────────────────────────────

export default function ProfessionalBanner() {
  return (
    <div
      className="relative min-h-screen overflow-y-auto"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <SceneBg />
      <Navbar />

      <section className="relative z-10 pb-5">
        <div className="w-full max-w-[90vw] mx-auto px-4 sm:px-3 lg:px-4 xl:px-8 pt-2 pb-10 sm:pb-14 lg:pt-0 lg:pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-10 lg:gap-14 xl:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col"
            >
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

              <div className="mt-8 sm:mt-9 hidden sm:grid grid-cols-2 gap-2.5 max-w-[360px] sm:max-w-[400px]">
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

            <div className="flex justify-center lg:justify-end w-full lg:pr-4 xl:pr-6">
              <LeadCaptureCard />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes gradFlow {
          0%   { background-position: 0%   center }
          100% { background-position: 200% center }
        }
      `}</style>
    </div>
  );
}