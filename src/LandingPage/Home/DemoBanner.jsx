import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from 'react-router-dom';

import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import clsx from "clsx";
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
  MessageCircle,
  X,
  Check,
  AlertCircle,
  User,
  Mail,
  Phone,
  Package,
  MessageSquare,
  Search,
  ChevronDown,
  ShieldCheck,
  Zap,
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
// Enquiry Form Modal (reused from the floating icon component)
// ─────────────────────────────────────────────────────────────────────────────
const COUNTRIES = [
  { name: "India", code: "+91", countryCode: "IN", length: 10, pattern: /^[6-9]/ },
  { name: "USA", code: "+1", countryCode: "US", length: 10, pattern: /^[2-9]/ },
  { name: "UK", code: "+44", countryCode: "GB", length: 10, pattern: /^[1-9]/ },
  { name: "UAE", code: "+971", countryCode: "AE", length: 9, pattern: /^5/ },
  { name: "Australia", code: "+61", countryCode: "AU", length: 9, pattern: /^[2-9]/ },
  { name: "Canada", code: "+1", countryCode: "CA", length: 10, pattern: /^[2-9]/ },
  { name: "Germany", code: "+49", countryCode: "DE", length: 10, pattern: /^[1-9]/ },
  { name: "Singapore", code: "+65", countryCode: "SG", length: 8, pattern: /^[3689]/ },
  { name: "Bangladesh", code: "+880", countryCode: "BD", length: 10, pattern: /^1/ },
  { name: "Nepal", code: "+977", countryCode: "NP", length: 10, pattern: /^9/ },
  { name: "Sri Lanka", code: "+94", countryCode: "LK", length: 9, pattern: /^7/ },
  { name: "Pakistan", code: "+92", countryCode: "PK", length: 10, pattern: /^3/ },
  { name: "Saudi Arabia", code: "+966", countryCode: "SA", length: 9, pattern: /^5/ },
  { name: "France", code: "+33", countryCode: "FR", length: 9, pattern: /^[1-9]/ },
  { name: "Japan", code: "+81", countryCode: "JP", length: 10, pattern: /^[0-9]/ },
  { name: "Malaysia", code: "+60", countryCode: "MY", length: 9, pattern: /^[1-9]/ },
  { name: "South Africa", code: "+27", countryCode: "ZA", length: 9, pattern: /^[1-9]/ },
];

const HOSTING_PLANS = [
  "Vps on Cloud",
  "wordpress",
  "Busy on Cloud",
  "Marg on Cloud",
  "Tally on Cloud",
  "School CRM",
  "Restaurant Management",
];

function FlagEmoji({ code = "IN" }) {
  const emoji = code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");
  return <span style={{ fontSize: 15, lineHeight: 1 }}>{emoji}</span>;
}

const inputClass =
  "w-full py-2 px-2.5 rounded-lg text-xs sm:text-sm text-slate-900 bg-slate-50 border outline-none transition focus:ring-2";

function getBorderClass(field, errors, touched, form) {
  if (errors[field] && touched[field]) return "border-red-400 focus:border-red-400 focus:ring-red-100";
  if (touched[field] && !errors[field] && form[field]) return "border-emerald-400 focus:border-emerald-400 focus:ring-emerald-100";
  return "border-slate-300 focus:border-blue-500 focus:ring-blue-100";
}

function validateField(name, value, country) {
  switch (name) {
    case "name":
      if (!value.trim()) return "Full name is required";
      if (value.trim().length < 2) return "At least 2 characters";
      if (value.trim().length > 80) return "Too long";
      return "";
    case "email":
      if (!value.trim()) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email";
      return "";
    case "phone":
      if (!value) return "Phone number is required";
      if (value.length !== country.length) return `Enter a ${country.length}-digit number for ${country.name}`;
      if (!country.pattern.test(value)) return "Invalid number for this country";
      return "";
    case "plan":
      if (!value) return "Please select a service";
      return "";
    default:
      return "";
  }
}

function EnquiryFormModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", plan: "", message: "" });
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [apiError, setApiError] = useState("");

  const countryDropRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (countryDropRef.current && !countryDropRef.current.contains(e.target)) {
        setCountryOpen(false);
        setCountrySearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (open && cardRef.current && !cardRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch)
  );

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      let val = value;
      if (name === "phone") val = value.replace(/\D/g, "").slice(0, selectedCountry.length);
      setForm((p) => ({ ...p, [name]: val }));
      setSuccess("");
      setApiError("");
      setTouched((p) => ({ ...p, [name]: true }));
      setErrors((p) => ({ ...p, [name]: validateField(name, val, selectedCountry) }));
    },
    [selectedCountry]
  );

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      setTouched((p) => ({ ...p, [name]: true }));
      setErrors((p) => ({ ...p, [name]: validateField(name, value, selectedCountry) }));
    },
    [selectedCountry]
  );

  const handleCountrySelect = useCallback((c) => {
    setSelectedCountry(c);
    setCountryOpen(false);
    setCountrySearch("");
    setForm((p) => ({ ...p, phone: "" }));
    setErrors((p) => ({ ...p, phone: "" }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = ["name", "email", "phone", "plan"];
    const newErrors = {};
    const newTouched = {};
    fields.forEach((k) => {
      newTouched[k] = true;
      const err = validateField(k, form[k], selectedCountry);
      if (err) newErrors[k] = err;
    });
    setErrors(newErrors);
    setTouched(newTouched);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const res = await axios.post("https://api.marketing.cloudedata.com/api/public/submit", {
        name: form.name,
        email: form.email,
        phone: `${selectedCountry.code}${form.phone}`,
        product: form.plan,
        message: form.message || "No message provided",
        country: selectedCountry.name,
      });
      if (res.data.success) {
        setSuccess("Thank you! Our experts will reach you shortly.");
        setForm({ name: "", email: "", phone: "", plan: "", message: "" });
        setErrors({});
        setTouched({});
      } else {
        setApiError("Submission failed. Please try again.");
      }
    } catch {
      setApiError("Network error. Check your connection and retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-end p-4">
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.92, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.92, x: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative mt-32 mr-4 sm:mr-8 w-[92vw] max-w-[360px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-1 bg-gradient-to-r from-indigo-500 to-blue-500" />
            <div className="p-4 sm:p-5">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
              >
                <X size={16} />
              </button>
              <div className="mb-5">
                <h3 className="text-lg font-extrabold text-slate-900">Get Your Free Demo</h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Fill in the details and a specialist will reach out within 1 hour.
                </p>
              </div>
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-4 flex items-start gap-2 rounded-lg bg-green-50 border border-green-200 p-2.5 text-xs text-green-800"
                  >
                    <Check size={14} className="shrink-0 mt-0.5" />
                    <span>{success}</span>
                  </motion.div>
                )}
                {apiError && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-4 flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-2.5 text-xs text-red-800"
                  >
                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                    <span>{apiError}</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
                {/* Name */}
                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-500 flex items-center gap-1.5 mb-1">
                    <User size={12} /> Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="John Doe"
                      className={clsx(inputClass, getBorderClass("name", errors, touched, form), "pr-8")}
                      autoComplete="name"
                    />
                    {touched.name && !errors.name && form.name && (
                      <Check size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                    )}
                    {errors.name && touched.name && (
                      <AlertCircle size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-red-400" />
                    )}
                  </div>
                  <AnimatePresence>
                    {errors.name && touched.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -3, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -3, height: 0 }}
                        className="text-[10px] text-red-500 mt-0.5 ml-1 font-medium"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                {/* Email */}
                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-500 flex items-center gap-1.5 mb-1">
                    <Mail size={12} /> Work Email *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="john@company.com"
                      className={clsx(inputClass, getBorderClass("email", errors, touched, form), "pr-8")}
                      autoComplete="email"
                    />
                    {touched.email && !errors.email && form.email && (
                      <Check size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                    )}
                    {errors.email && touched.email && (
                      <AlertCircle size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-red-400" />
                    )}
                  </div>
                  <AnimatePresence>
                    {errors.email && touched.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -3, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -3, height: 0 }}
                        className="text-[10px] text-red-500 mt-0.5 ml-1 font-medium"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                {/* Phone with Country Code */}
                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-500 flex items-center gap-1.5 mb-1">
                    <Phone size={12} /> Phone Number *
                  </label>
                  <div className="flex gap-1.5">
                    <div className="relative" ref={countryDropRef}>
                      <button
                        type="button"
                        onClick={() => {
                          setCountryOpen(!countryOpen);
                          setCountrySearch("");
                        }}
                        className={clsx(
                          "h-9 px-2 rounded-lg text-xs font-medium flex items-center gap-1 transition-all duration-200 flex-shrink-0",
                          "bg-slate-50 border",
                          countryOpen
                            ? "border-blue-500 ring-2 ring-blue-100"
                            : "border-slate-300 hover:border-slate-400"
                        )}
                        style={{ minWidth: "80px" }}
                      >
                        <FlagEmoji code={selectedCountry.countryCode} />
                        <span className="text-slate-700 text-[10px] hidden sm:inline">
                          {selectedCountry.code}
                        </span>
                        <ChevronDown
                          size={10}
                          className={clsx(
                            "text-slate-400 transition-transform duration-200",
                            countryOpen && "rotate-180"
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {countryOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -4, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -4, scale: 0.98 }}
                            transition={{ duration: 0.12 }}
                            className="absolute z-50 left-0 mt-1 w-52 rounded-xl overflow-hidden border border-slate-200 shadow-2xl bg-white"
                          >
                            <div className="p-1.5 border-b border-slate-100">
                              <div className="relative">
                                <Search size={11} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                  type="text"
                                  value={countrySearch}
                                  onChange={(e) => setCountrySearch(e.target.value)}
                                  placeholder="Search..."
                                  className="w-full pl-6 pr-2 py-1 rounded-md text-[11px] text-slate-700 bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-300"
                                  autoFocus
                                />
                              </div>
                            </div>
                            <div className="p-1 max-h-40 overflow-y-auto">
                              {filteredCountries.map((country) => (
                                <button
                                  key={`${country.code}-${country.name}`}
                                  type="button"
                                  onClick={() => handleCountrySelect(country)}
                                  className={clsx(
                                    "w-full text-left px-2 py-1.5 rounded-md text-xs transition-all duration-150 font-medium flex items-center gap-2",
                                    selectedCountry.code === country.code &&
                                      selectedCountry.name === country.name
                                      ? "bg-blue-50 text-blue-700"
                                      : "text-slate-600 hover:bg-slate-50"
                                  )}
                                >
                                  <FlagEmoji code={country.countryCode} />
                                  <span className="flex-1 truncate">{country.name}</span>
                                  <span className="text-slate-400 text-[10px] font-mono">
                                    {country.code}
                                  </span>
                                  {selectedCountry.code === country.code &&
                                    selectedCountry.name === country.name && (
                                      <Check size={12} className="text-blue-600 flex-shrink-0" />
                                    )}
                                </button>
                              ))}
                              {filteredCountries.length === 0 && (
                                <div className="px-2 py-3 text-center text-slate-400 text-[11px]">
                                  No countries found
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="relative flex-1">
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={`${selectedCountry.length} digits`}
                        className={clsx(
                          "w-full py-2 pr-8 rounded-lg text-xs text-slate-900 bg-slate-50 border outline-none transition focus:ring-2",
                          getBorderClass("phone", errors, touched, form)
                        )}
                        autoComplete="tel"
                        maxLength={selectedCountry.length}
                      />
                      {touched.phone && !errors.phone && form.phone && (
                        <Check size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-500" />
                      )}
                      {errors.phone && touched.phone && (
                        <AlertCircle size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-red-400" />
                      )}
                    </div>
                  </div>
                  <AnimatePresence>
                    {errors.phone && touched.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -3, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -3, height: 0 }}
                        className="text-[10px] text-red-500 mt-0.5 ml-1 font-medium"
                      >
                        {errors.phone}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                {/* Hosting Plan Dropdown */}
                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-500 flex items-center gap-1.5 mb-1">
                    <Package size={12} /> Hosting Plan *
                  </label>
                  <div className="relative">
                    <select
                      name="plan"
                      value={form.plan}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={clsx(
                        "w-full px-3 py-2 rounded-lg text-xs bg-slate-50 border outline-none transition appearance-none focus:ring-2",
                        getBorderClass("plan", errors, touched, form),
                        form.plan ? "text-slate-900" : "text-slate-400"
                      )}
                    >
                      <option value="" disabled>
                        Choose your plan
                      </option>
                      {HOSTING_PLANS.map((plan) => (
                        <option key={plan} value={plan}>
                          {plan}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    {touched.plan && !errors.plan && form.plan && (
                      <Check size={13} className="absolute right-7 top-1/2 -translate-y-1/2 text-emerald-500" />
                    )}
                  </div>
                  <AnimatePresence>
                    {errors.plan && touched.plan && (
                      <motion.p
                        initial={{ opacity: 0, y: -3, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -3, height: 0 }}
                        className="text-[10px] text-red-500 mt-0.5 ml-1 font-medium"
                      >
                        {errors.plan}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                {/* Message */}
                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-500 flex items-center gap-1.5 mb-1">
                    <MessageSquare size={12} /> Additional Requirements
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={2}
                      placeholder="Websites, traffic, special needs..."
                      className="w-full resize-none rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                    {form.message && (
                      <span className="absolute bottom-1.5 right-2 text-[9px] text-slate-400 font-mono">
                        {form.message.length}/500
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-2.5 text-xs font-bold text-white shadow-md shadow-slate-300 transition hover:bg-slate-800 disabled:opacity-70"
                >
                  {loading ? (
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 0.9, repeat: Infinity }}
                    >
                      Submitting...
                    </motion.span>
                  ) : (
                    <>
                      Request Demo
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
              <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 text-[10px] font-semibold text-slate-500">
                <div className="flex items-center gap-1">
                  <ShieldCheck size={13} className="text-blue-600" />
                  SSL
                </div>
                <div className="flex items-center gap-1">
                  <Zap size={13} className="text-blue-600" />
                  NVMe
                </div>
                <div className="flex items-center gap-1">
                  <Headphones size={13} className="text-blue-600" />
                  24/7
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Banner with enquiry modal
// ─────────────────────────────────────────────────────────────────────────────
export default function ProfessionalBanner() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const navigate = useNavigate();

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
          <button
            onClick={() => navigate("/wordpress-hosting")}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-indigo-300/40 hover:shadow-xl hover:from-indigo-700 hover:to-blue-700 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200">
            Buy Now <ArrowRight size={15} strokeWidth={2.5} />
          </button>

          <button
            onClick={() => navigate("/wordpress-hosting", { state: { scrollToPlans: true } })}
            className="inline-flex items-center gap-2 px-5 py-3.5 text-slate-600 text-sm font-medium rounded-xl border border-slate-200 bg-white/70 hover:bg-white hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-200 shadow-sm">
            View Plans
          </button>
          {/* Yellow button to open enquiry form */}
          <button
            onClick={() => setEnquiryOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3.5 bg-yellow-400 hover:bg-yellow-500 text-slate-900 text-sm font-semibold rounded-xl shadow-md shadow-yellow-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
          >
             Enquiry Now
            <ArrowRight size={15} />
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

      {/* Floating enquiry icon (optional, keep if you like) */}
      <button
        onClick={() => setEnquiryOpen(true)}
        className="fixed top-32 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-300/50 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all"
        aria-label="Open enquiry form"
      >
        <MessageCircle size={22} />
      </button>

      {/* Enquiry Form Modal */}
      <EnquiryFormModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </div>
  );
}