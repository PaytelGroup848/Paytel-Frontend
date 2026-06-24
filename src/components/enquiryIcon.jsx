import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import clsx from "clsx";
import {
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
  ArrowRight,
  ShieldCheck,
  Zap,
  Headphones,
} from "lucide-react";

// ─── Flag emoji helper ───────────────────────────────────────────────
function FlagEmoji({ code = "IN" }) {
  const emoji = code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");
  return <span style={{ fontSize: 15, lineHeight: 1 }}>{emoji}</span>;
}

// ─── Data ─────────────────────────────────────────────────────────────
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

// ─── Shared classes ───────────────────────────────────────────────────
const inputClass =
  "w-full py-2 px-2.5 rounded-lg text-xs sm:text-sm text-slate-900 bg-slate-50 border outline-none transition focus:ring-2";

function getBorderClass(field, errors, touched, form) {
  if (errors[field] && touched[field]) return "border-red-400 focus:border-red-400 focus:ring-red-100";
  if (touched[field] && !errors[field] && form[field]) return "border-emerald-400 focus:border-emerald-400 focus:ring-emerald-100";
  return "border-slate-300 focus:border-blue-500 focus:ring-blue-100";
}

// ─── Validation ──────────────────────────────────────────────────────
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

// ─── Component ────────────────────────────────────────────────────────
export default function EnquiryFloatingButton() {
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
  const buttonRef = useRef(null);

  // close country dropdown on outside click
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

  // close card when clicking outside card & button
  useEffect(() => {
    const handler = (e) => {
      if (
        open &&
        cardRef.current &&
        !cardRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

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
    <>
      {/* Floating button */}
      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        className="fixed top-32 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-300/50 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all"
        aria-label="Open enquiry form"
      >
        <MessageCircle size={22} />
      </button>

      {/* Popup card – no overlay, positioned next to the icon */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.92, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.92, x: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed z-50 w-[92vw] max-w-[360px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden
                       top-[calc(8rem+4rem)] right-4   /* mobile: below the icon */
                       sm:top-32 sm:right-20                 /* desktop: to the left of the icon */
                      "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative gradient top bar */}
            <div className="h-1 bg-gradient-to-r from-indigo-500 to-blue-500" />

            <div className="p-4 sm:p-5">
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
              >
                <X size={16} />
              </button>

              {/* Header */}
              <div className="mb-5">
                <h3 className="text-lg font-extrabold text-slate-900">
                  Get Your Free Demo
                </h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Fill in the details and a specialist will reach out within 1 hour.
                </p>
              </div>

              {/* Success / Error messages */}
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
                    {/* Country Code Selector */}
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

                    {/* Phone Input */}
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

                {/* Message (optional) */}
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

              {/* Trust badges */}
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
        )}
      </AnimatePresence>
    </>
  );
}