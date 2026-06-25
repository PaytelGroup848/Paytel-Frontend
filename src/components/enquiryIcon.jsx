import { useState, useCallback, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import clsx from "clsx";
import {
  X, Check, AlertCircle, User, Mail, Phone, Package,
  MessageSquare, Search, ChevronDown, ArrowRight,
  ShieldCheck, Zap, Headphones, Sparkles,
} from "lucide-react";

function FlagEmoji({ code = "IN" }) {
  const emoji = code.toUpperCase().split("").map((c) =>
    String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65)
  ).join("");
  return <span style={{ fontSize: 14, lineHeight: 1 }}>{emoji}</span>;
}

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
  "Vps on Cloud", "WordPress", "Busy on Cloud",
  "Marg on Cloud", "Tally on Cloud", "School CRM", "Restaurant Management",
];

const inputClass = "w-full py-2 px-2.5 rounded-lg text-xs text-slate-900 bg-white border outline-none transition focus:ring-2";

function getBorderClass(field, errors, touched, form) {
  if (errors[field] && touched[field]) return "border-red-400 focus:border-red-400 focus:ring-red-100";
  if (touched[field] && !errors[field] && form[field]) return "border-emerald-400 focus:border-emerald-400 focus:ring-emerald-100";
  return "border-slate-200 focus:border-amber-400 focus:ring-amber-100";
}

function validateField(name, value, country) {
  switch (name) {
    case "name":
      if (!value.trim()) return "Name is required";
      if (value.trim().length < 2) return "At least 2 characters";
      return "";
    case "email":
      if (!value.trim()) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email";
      return "";
    case "phone":
      if (!value) return "Phone is required";
      if (value.length !== country.length) return `Enter ${country.length} digits`;
      if (!country.pattern.test(value)) return "Invalid number";
      return "";
    case "plan":
      if (!value) return "Select a service";
      return "";
    default: return "";
  }
}

// ── Rope ────────────────────────────────────────────────────────────────
function RopeSVG({ height = 56 }) {
  return (
    <svg width="14" height={height} viewBox={`0 0 14 ${height}`} fill="none" className="block">
      <defs>
        <linearGradient id="rg1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#92400e" />
          <stop offset="50%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id="rg2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      <path d={`M3 0 C3 ${height * 0.15} 9 ${height * 0.3} 9 ${height * 0.5} C9 ${height * 0.7} 3 ${height * 0.82} 5 ${height}`}
        stroke="url(#rg1)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d={`M11 0 C11 ${height * 0.15} 5 ${height * 0.3} 5 ${height * 0.5} C5 ${height * 0.7} 11 ${height * 0.82} 9 ${height}`}
        stroke="url(#rg2)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8" />
      {[0.25, 0.55, 0.8].map((p, i) => (
        <circle key={i} cx="7" cy={height * p} r="1.5" fill="#92400e" opacity="0.6" />
      ))}
    </svg>
  );
}

// ── Yellow Wooden Badge ──────────────────────────────────────────────────
function WoodenBadge({ onClick, isOpen }) {
  return (
    <motion.button
      onClick={onClick}
     animate={{ rotate: isOpen ? 0 : [0, -25, 20, -15, 10, -6, 3, 0] }}
transition={isOpen
  ? { duration: 0.15 }
  : {
      duration: 3.5,
      repeat: Infinity,
      ease: "easeOut",
      repeatDelay: 1.5,
    }
}
      style={{ transformOrigin: "top center" }}
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
      className="focus:outline-none"
      aria-label="Open enquiry"
    >
      {/* Nail hole */}
      <div className="mx-auto mb-0.5 h-2.5 w-2.5 rounded-full relative z-10"
        style={{
          background: "radial-gradient(circle at 38% 32%, #e5e7eb, #6b7280)",
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)",
        }}
      />

      {/* Badge */}
      <div className="relative rounded-xl select-none overflow-hidden"
        style={{
          minWidth: "96px",
          padding: "10px 14px",
          background: `
            repeating-linear-gradient(88deg, transparent, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 3px),
            linear-gradient(155deg, #fde68a 0%, #fbbf24 30%, #f59e0b 55%, #fbbf24 75%, #fde68a 100%)
          `,
          boxShadow: `
            0 8px 24px rgba(245,158,11,0.5),
            0 2px 6px rgba(0,0,0,0.2),
            inset 0 1px 0 rgba(255,255,255,0.5),
            inset 0 -2px 4px rgba(0,0,0,0.1)
          `,
          border: "1.5px solid rgba(180,83,9,0.35)",
        }}
      >
        {/* Top label */}
        <span className="block text-center font-bold tracking-widest"
          style={{ fontSize: "15px", color: "#92400e", letterSpacing: "0.18em", fontFamily: "Georgia, serif" }}>
          ✦ ENQUIRY ✦
        </span>

        {/* NOW — big */}
        <span className="block text-center font-black tracking-wider mt-0.5"
          style={{
            fontSize: "18px",
            color: "#7c2d12",
            textShadow: "0 1px 0 rgba(255,255,255,0.4), 0 -1px 0 rgba(0,0,0,0.15)",
            letterSpacing: "0.08em",
            fontFamily: "Georgia, serif",
            lineHeight: 1.1,
          }}>
          NOW
        </span>

        {/* Shimmer */}
        <motion.div className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden">
          <motion.div
            className="absolute inset-y-0 w-8 skew-x-[-18deg]"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)" }}
            animate={{ x: ["-200%", "320%"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2.5 }}
          />
        </motion.div>

        {/* Screws */}
        {["top-1 left-1", "top-1 right-1", "bottom-1 left-1", "bottom-1 right-1"].map((pos, i) => (
          <div key={i} className={`absolute ${pos} h-1.5 w-1.5 rounded-full`}
            style={{ background: "radial-gradient(circle at 35% 30%, #d1d5db, #6b7280)", boxShadow: "inset 0 0.5px 1px rgba(0,0,0,0.4)" }}
          />
        ))}
      </div>
    </motion.button>
  );
}

// ── Hook ring ─────────────────────────────────────────────────────────────
function HookRing() {
  return (
    <div className="mx-auto h-4 w-4 rounded-full"
      style={{
        background: "radial-gradient(circle at 38% 28%, #e5e7eb, #9ca3af)",
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.25)",
        border: "1px solid rgba(0,0,0,0.12)",
      }}
    />
  );
}

// ── Main ─────────────────────────────────────────────────────────────────
export default function EnquiryFloatingButton() {
  const location = useLocation();

  const allowedRoutes = [
    "/",
    "/pricing",
    "/wordpress-hosting",
    "/c-panel",
    "/php-hosting",
    "/vps-cloud",
    "/busy-on-cloud",
    "/marg-on-cloud",
    "/tally-on-cloud",
    "/education-management-system",
    "/restaurant-management-system",
    "/about-us",
    "/cloud-hosting-blog",
    "/contact",
  ];
   if (!allowedRoutes.includes(location.pathname)) {
    return null;
  }

  const [open, setOpen] = useState(false);
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
  const wrapperRef = useRef(null);

  useEffect(() => {
    const h = (e) => {
      if (countryDropRef.current && !countryDropRef.current.contains(e.target)) {
        setCountryOpen(false); setCountrySearch("");
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => {
    const h = (e) => {
      if (open && cardRef.current && !cardRef.current.contains(e.target) &&
        wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const filteredCountries = COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) || c.code.includes(countrySearch)
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    let val = value;
    if (name === "phone") val = value.replace(/\D/g, "").slice(0, selectedCountry.length);
    setForm((p) => ({ ...p, [name]: val }));
    setSuccess(""); setApiError("");
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors((p) => ({ ...p, [name]: validateField(name, val, selectedCountry) }));
  }, [selectedCountry]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors((p) => ({ ...p, [name]: validateField(name, value, selectedCountry) }));
  }, [selectedCountry]);

  const handleCountrySelect = useCallback((c) => {
    setSelectedCountry(c); setCountryOpen(false); setCountrySearch("");
    setForm((p) => ({ ...p, phone: "" })); setErrors((p) => ({ ...p, phone: "" }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = ["name", "email", "phone", "plan"];
    const newE = {}, newT = {};
    fields.forEach((k) => { newT[k] = true; const err = validateField(k, form[k], selectedCountry); if (err) newE[k] = err; });
    setErrors(newE); setTouched(newT);
    if (Object.keys(newE).length > 0) return;
    setLoading(true);
    try {
      const res = await axios.post("https://api.marketing.cloudedata.com/api/public/submit", {
        name: form.name, email: form.email,
        phone: `${selectedCountry.code}${form.phone}`,
        product: form.plan, message: form.message || "No message", country: selectedCountry.name,
      });
      if (res.data.success) {
        setSuccess("Thank you! We'll reach you within 1 hour.");
        setForm({ name: "", email: "", phone: "", plan: "", message: "" }); setErrors({}); setTouched({});
      } else { setApiError("Submission failed. Please try again."); }
    } catch { setApiError("Network error. Please retry."); }
    finally { setLoading(false); }
  };

  return (
    <>
      {/* ── Hanger ── */}
      <div ref={wrapperRef} className="fixed top-[72px] right-10 z-50 flex flex-col items-center" style={{ gap: 0 }}>
        {/* Nail */}
        <div className="h-2.5 w-2.5 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 28%, #e5e7eb, #6b7280)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.3)",
          }}
        />
        <RopeSVG height={25} />
        <HookRing />
        <WoodenBadge onClick={() => setOpen((p) => !p)} isOpen={open} />
      </div>

      {/* ── Popup ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.92, y: -8, x: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -8, x: 8 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[60] bg-white rounded-2xl border border-slate-100 overflow-hidden"
            style={{
              top: "230px",
              right: "40px",
              width: "min(88vw, 340px)",
              boxShadow: "0 24px 48px -8px rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.05)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Amber top bar */}
            <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />

            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 leading-tight">Get Free Demo</h3>
                    <p className="text-[10px] text-slate-400 font-medium">Reply within <span className="text-amber-500 font-bold">1 hour</span></p>
                  </div>
                </div>
                <button onClick={() => setOpen(false)}
                  className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all">
                  <X size={12} />
                </button>
              </div>

              {/* Alerts */}
              <AnimatePresence>
                {success && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                    className="mb-3 flex items-start gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-2.5 text-[11px] text-emerald-800">
                    <Check size={12} className="shrink-0 mt-0.5 text-emerald-600" />
                    <span className="font-semibold">{success}</span>
                  </motion.div>
                )}
                {apiError && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                    className="mb-3 flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 p-2.5 text-[11px] text-red-800">
                    <AlertCircle size={12} className="shrink-0 mt-0.5" />
                    <span className="font-semibold">{apiError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-2.5" noValidate>

                {/* Name */}
                <div>
                  <label className="text-[15px] font-bold uppercase text-slate-800 flex items-center gap-1 mb-1 tracking-widest">
                    <User size={9} /> Name *
                  </label>
                  <div className="relative">
                    <input type="text" name="name" value={form.name}
                      onChange={handleChange} onBlur={handleBlur} placeholder="John Doe"
                      className={clsx(inputClass, getBorderClass("name", errors, touched, form), "pr-7")}
                      autoComplete="name" />
                    {touched.name && !errors.name && form.name && <Check size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-500" />}
                    {errors.name && touched.name && <AlertCircle size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-red-400" />}
                  </div>
                  <AnimatePresence>
                    {errors.name && touched.name && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                        className="text-[9px] text-red-500 mt-0.5 ml-0.5 font-medium">{errors.name}</motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email */}
                <div>
                  <label className="text-[15px] font-bold uppercase text-slate-800 flex items-center gap-1 mb-1 tracking-widest">
                    <Mail size={9} /> Email *
                  </label>
                  <div className="relative">
                    <input type="email" name="email" value={form.email}
                      onChange={handleChange} onBlur={handleBlur} placeholder="john@company.com"
                      className={clsx(inputClass, getBorderClass("email", errors, touched, form), "pr-7")}
                      autoComplete="email" />
                    {touched.email && !errors.email && form.email && <Check size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-500" />}
                    {errors.email && touched.email && <AlertCircle size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-red-400" />}
                  </div>
                  <AnimatePresence>
                    {errors.email && touched.email && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                        className="text-[9px] text-red-500 mt-0.5 ml-0.5 font-medium">{errors.email}</motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-[15px] font-bold uppercase text-slate-800 flex items-center gap-1 mb-1 tracking-widest">
                    <Phone size={9} /> Phone *
                  </label>
                  <div className="flex gap-1.5">
                    <div className="relative flex-shrink-0" ref={countryDropRef}>
                      <button type="button"
                        onClick={() => { setCountryOpen(!countryOpen); setCountrySearch(""); }}
                        className={clsx(
                          "h-8 px-1.5 rounded-lg text-[10px] font-medium flex items-center gap-1 transition-all bg-white border flex-shrink-0",
                          countryOpen ? "border-amber-400 ring-2 ring-amber-100" : "border-slate-200 hover:border-slate-300"
                        )}
                        style={{ minWidth: "68px" }}>
                        <FlagEmoji code={selectedCountry.countryCode} />
                        <span className="text-slate-600 text-[9px]">{selectedCountry.code}</span>
                        <ChevronDown size={8} className={clsx("text-slate-400 transition-transform", countryOpen && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {countryOpen && (
                          <motion.div initial={{ opacity: 0, y: -4, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -4, scale: 0.97 }} transition={{ duration: 0.12 }}
                            className="absolute z-50 left-0 mt-1 w-48 rounded-xl overflow-hidden border border-slate-200 shadow-2xl bg-white">
                            <div className="p-1.5 border-b border-slate-100">
                              <div className="relative">
                                <Search size={10} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="text" value={countrySearch} onChange={(e) => setCountrySearch(e.target.value)}
                                  placeholder="Search..." autoFocus
                                  className="w-full pl-6 pr-2 py-1 rounded-lg text-[10px] text-slate-700 bg-slate-50 border border-slate-200 focus:outline-none focus:border-amber-300" />
                              </div>
                            </div>
                            <div className="p-1 max-h-40 overflow-y-auto">
                              {filteredCountries.map((country) => (
                                <button key={`${country.code}-${country.name}`} type="button"
                                  onClick={() => handleCountrySelect(country)}
                                  className={clsx(
                                    "w-full text-left px-2 py-1.5 rounded-lg text-[10px] font-medium flex items-center gap-2 transition-all",
                                    selectedCountry.name === country.name ? "bg-amber-50 text-amber-700" : "text-slate-600 hover:bg-slate-50"
                                  )}>
                                  <FlagEmoji code={country.countryCode} />
                                  <span className="flex-1 truncate">{country.name}</span>
                                  <span className="text-slate-400 font-mono text-[9px]">{country.code}</span>
                                  {selectedCountry.name === country.name && <Check size={10} className="text-amber-600 flex-shrink-0" />}
                                </button>
                              ))}
                              {filteredCountries.length === 0 && (
                                <div className="py-3 text-center text-slate-400 text-[10px]">No results</div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="relative flex-1">
                      <input type="tel" name="phone" value={form.phone}
                        onChange={handleChange} onBlur={handleBlur}
                        placeholder={`${selectedCountry.length} digits`}
                        className={clsx("w-full py-2 pr-7 rounded-lg text-xs text-slate-900 bg-white border outline-none transition focus:ring-2",
                          getBorderClass("phone", errors, touched, form))}
                        maxLength={selectedCountry.length} />
                      {touched.phone && !errors.phone && form.phone && <Check size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-500" />}
                      {errors.phone && touched.phone && <AlertCircle size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-red-400" />}
                    </div>
                  </div>
                  <AnimatePresence>
                    {errors.phone && touched.phone && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                        className="text-[9px] text-red-500 mt-0.5 ml-0.5 font-medium">{errors.phone}</motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Service */}
                <div>
                  <label className="text-[15px] font-bold uppercase text-slate-800 flex items-center gap-1 mb-1 tracking-widest">
                    <Package size={9} /> Service *
                  </label>
                  <div className="relative">
                    <select name="plan" value={form.plan} onChange={handleChange} onBlur={handleBlur}
                      className={clsx("w-full px-2.5 py-2 rounded-lg text-md bg-white border outline-none transition appearance-none focus:ring-2",
                        getBorderClass("plan", errors, touched, form), form.plan ? "text-slate-900" : "text-slate-800")}>
                      <option value="" disabled>Choose a service</option>
                      {HOSTING_PLANS.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    {touched.plan && !errors.plan && form.plan && <Check size={11} className="absolute right-6 top-1/2 -translate-y-1/2 text-emerald-500" />}
                  </div>
                  <AnimatePresence>
                    {errors.plan && touched.plan && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                        className="text-[9px] text-red-500 mt-0.5 ml-0.5 font-medium">{errors.plan}</motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Message */}
                <div>
                  <label className="text-[15px] font-bold uppercase text-slate-800 flex items-center gap-1 mb-1 tracking-widest">
                    <MessageSquare size={9} /> Message
                  </label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={2}
                    placeholder="Your requirements..."
                    className="w-full resize-none rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100" />
                </div>

                {/* Submit */}
                <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold text-white shadow-md transition-all disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg,#fbbf24 0%,#f59e0b 40%,#d97706 100%)", boxShadow: "0 4px 12px rgba(245,158,11,0.4)", color: "#7c2d12" }}>
                  {loading
                    ? <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 0.9, repeat: Infinity }}>Submitting...</motion.span>
                    : <><span className="font-black">Request Demo</span><ArrowRight size={13} /></>
                  }
                </motion.button>
              </form>

              {/* Trust strip */}
              <div className="mt-3 flex items-center justify-around border-t border-slate-100 pt-2.5">
                {[
                  { icon: ShieldCheck, label: "SSL" },
                  { icon: Zap, label: "NVMe" },
                  { icon: Headphones, label: "24/7" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-0.5">
                    <Icon size={12} className="text-amber-500" />
                    <span className="text-[8px] font-bold text-slate-400 tracking-widest uppercase">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}