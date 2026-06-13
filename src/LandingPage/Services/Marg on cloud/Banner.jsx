import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import clsx from "clsx";
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  Database,
  FileText,
  Headphones,
  LockKeyhole,
  MonitorSmartphone,
  ServerCog,
  ShieldCheck,
  Phone,
  Search,
  ChevronDown,
  Check,
  AlertCircle,
  User,
  Mail,
  Package,
  MessageSquare,
  Star,
  Sparkles,
} from "lucide-react";
import FlagIcon from "../../FlagIcon";
import { COUNTRIES } from "../../countries";
import { VALIDATION_RULES } from "../../validationRules";

const SERVICE_OPTIONS = [
  "Busy on Cloud",
  "Marg on Cloud",
  "Tally on Cloud",
  "School CRM",
  "Restaurant Management",
];

const benefits = [
  "Secure cloud access",
  "Multi-user ERP performance",
  "Daily backup support",
  "Quick setup assistance",
];

const businessTypes = [
  "Retail",
  "Distribution",
  "Pharmacy",
  "FMCG",
  "Manufacturing",
  "Other",
];

const featureCards = [
  {
    icon: FileText,
    title: "Billing & GST",
    text: "Run invoicing, reports and tax workflows from a secure cloud setup.",
  },
  {
    icon: Database,
    title: "Inventory Control",
    text: "Access stock, sales and purchase data across office and branch teams.",
  },
  {
    icon: ShieldCheck,
    title: "Protected Data",
    text: "Reduce local-system dependency with managed access and backup support.",
  },
];

export default function Banner() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    service: "Marg on Cloud",
    message: "",
  });
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const countryDropRef = useRef(null);

  // Close country dropdown on outside click
  useEffect(() => {
    const close = (e) => {
      if (countryDropRef.current && !countryDropRef.current.contains(e.target)) {
        setCountryOpen(false);
        setCountrySearch("");
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  // Filter countries based on search
  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch)
  );

  // Validation function
  const validateField = useCallback(
    (name, value) => {
      const rules = VALIDATION_RULES[name];
      if (!rules) return "";

      if (name === "mobile" || name === "phone") {
        if (!value) return VALIDATION_RULES.phone.messages.required;
        if (!selectedCountry.pattern.test(value)) return VALIDATION_RULES.phone.messages.invalid;
        return "";
      }

      if (name === "service") {
        if (!value) return "Please select a service";
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

  // Handle input changes with real-time validation
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      if (name === "mobile" || name === "phone") {
        const numericValue = value.replace(/\D/g, "");
        if (numericValue.length <= selectedCountry.length) {
          setForm((prev) => ({ ...prev, [name]: numericValue }));
        }
      } else {
        setForm((prev) => ({ ...prev, [name]: value }));
      }

      if (success) setSuccess("");
      if (error) setError("");

      setTouched((prev) => {
        const newTouched = { ...prev, [name]: true };
        const errorMsg = validateField(
          name,
          name === "mobile" || name === "phone" ? value.replace(/\D/g, "") : value
        );
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: newTouched[name] ? errorMsg : prevErrors[name],
        }));
        return newTouched;
      });
    },
    [success, error, selectedCountry, validateField]
  );

  // Validate on blur
  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    },
    [validateField]
  );

  // Handle country selection
  const handleCountrySelect = useCallback((country) => {
    setSelectedCountry(country);
    setCountryOpen(false);
    setCountrySearch("");
    setForm((prev) => ({ ...prev, mobile: "" }));
    setErrors((prev) => ({ ...prev, mobile: "" }));
  }, []);

  // Full form validation
  const validateForm = useCallback(() => {
    const newErrors = {};
    const newTouched = {};

    ["name", "email", "mobile", "service"].forEach((key) => {
      newTouched[key] = true;
      const errorMsg = validateField(key, form[key]);
      if (errorMsg) newErrors[key] = errorMsg;
    });

    setErrors(newErrors);
    setTouched(newTouched);
    return Object.keys(newErrors).length === 0;
  }, [form, validateField]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await axios.post(
        "https://api.marketing.cloudedata.com/api/public/submit",
        {
          name: form.name,
          email: form.email,
          phone: `${selectedCountry.code}${form.mobile}`,
          product: form.service,
          message: form.message || "No message provided",
          country: selectedCountry.name,
        }
      );

      if (response.data.success) {
        setSuccess(
          "Thank you! Your demo request has been submitted. Our team will contact you soon."
        );
        setForm({
          name: "",
          email: "",
          mobile: "",
          service: "Marg on Cloud",
          message: "",
        });
        setErrors({});
        setTouched({});
      } else {
        setError("Submission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please check your connection or try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Input base class for dark theme
  const inputClass =
    "w-full px-4 py-2 rounded-xl border bg-slate-800/70 text-white placeholder:text-slate-500 focus:ring-2 transition outline-none text-sm font-medium";

  const getBorderClass = (fieldName) => {
    if (errors[fieldName] && touched[fieldName])
      return "border-red-400/60 focus:border-red-400 focus:ring-red-400/20";
    if (touched[fieldName] && !errors[fieldName] && form[fieldName])
      return "border-emerald-400/60 focus:border-emerald-400 focus:ring-emerald-400/20";
    return "border-slate-600/50 focus:border-indigo-400 focus:ring-indigo-400/20";
  };

  return (
    <section className="relative flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950 px-4 py-12 md:py-24 overflow-hidden">
      {/* Shiny overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-20 w-[36rem] h-[36rem] bg-indigo-800/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-[28rem] h-[28rem] bg-cyan-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[24rem] h-[24rem] bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[48rem] h-[16rem] bg-gradient-to-r from-indigo-300/10 via-cyan-200/5 to-transparent rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, #818cf8 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <div className="inline-block px-5 py-1.5 bg-white/5 backdrop-blur-md border border-indigo-400/20 text-indigo-300 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase mb-6 shadow-sm">
            Marg on Cloud
          </div>

          <p className="text-lg sm:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0 mb-4 leading-relaxed">
            Take control of your accounting with secure, high‑performance cloud hosting.
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] mb-4">
            Power Your Business —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Marg on Cloud.
            </span>
          </h1>

          <p className="text-sm text-slate-400 font-medium mb-6">
            Access your Marg software anytime, anywhere, on any device — no local installation needed.
          </p>

          {/* Benefits list */}
          <div className="grid grid-cols-2 gap-3 mb-8 max-w-md mx-auto lg:mx-0">
            {benefits.map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <CheckCircle2 size={14} className="shrink-0 text-indigo-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <p className="text-sm text-slate-500 font-medium">Starting from</p>
            <div className="flex items-baseline gap-1 justify-center lg:justify-start">
              <span className="text-4xl font-black text-white">₹299.00</span>
              <span className="text-slate-400 font-medium">/user/month</span>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 max-w-2xl mx-auto lg:mx-0">
            {featureCards.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-3 backdrop-blur-sm"
              >
                <Icon size={18} className="text-indigo-400" />
                <h4 className="mt-2 text-xs font-bold text-white">{title}</h4>
                <p className="mt-1 text-[10px] leading-relaxed text-slate-400">{text}</p>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center justify-center px-10 py-4 font-bold text-sm text-slate-800 bg-white rounded-2xl shadow-[0_10px_30px_-5px_rgba(99,102,241,0.4)] transition-all hover:shadow-[0_15px_40px_-5px_rgba(99,102,241,0.6)]"
          >
            <span className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-70 -z-10" />
            <span className="relative z-10 flex items-center gap-2">
              Start Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </motion.button>
        </motion.div>

        {/* Right Card – Demo Form */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-sm lg:ml-40"
        >
          <div className="relative bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10 pointer-events-none" />

            <div className="relative p-5 sm:p-6">
              {/* Header with icon */}
              <div className="flex items-center gap-2.5 mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                    Book a Free Demo
                  </h3>
                </div>
              </div>

              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-4 flex items-start gap-2 rounded-xl bg-green-500/20 border border-green-400/50 p-3 text-sm text-green-300"
                  >
                    <Check size={16} className="shrink-0 mt-0.5" />
                    <span>{success}</span>
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-4 flex items-start gap-2 rounded-xl bg-red-500/20 border border-red-400/50 p-3 text-sm text-red-300"
                  >
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {!success && (
                <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                      <User size={10} /> Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="John Doe"
                        className={clsx(inputClass, getBorderClass("name"), "pr-8")}
                        autoComplete="name"
                      />
                      {touched.name && !errors.name && form.name && (
                        <Check size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-emerald-400" />
                      )}
                      {errors.name && touched.name && (
                        <AlertCircle size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-red-400" />
                      )}
                    </div>
                    <AnimatePresence>
                      {errors.name && touched.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -4, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -4, height: 0 }}
                          className="text-[10px] text-red-400 mt-0.5 ml-0.5 font-medium"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                      <Mail size={10} /> Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="john@company.com"
                        className={clsx(inputClass, getBorderClass("email"), "pr-8")}
                        autoComplete="email"
                      />
                      {touched.email && !errors.email && form.email && (
                        <Check size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-emerald-400" />
                      )}
                      {errors.email && touched.email && (
                        <AlertCircle size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-red-400" />
                      )}
                    </div>
                    <AnimatePresence>
                      {errors.email && touched.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -4, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -4, height: 0 }}
                          className="text-[10px] text-red-400 mt-0.5 ml-0.5 font-medium"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Mobile with Country Code */}
                  <div>
                    <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                      <Phone size={10} /> Phone Number *
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
                            "h-[42px] px-2 rounded-xl text-xs font-medium flex items-center gap-1 transition-all duration-200 flex-shrink-0",
                            "bg-slate-800/70 border",
                            countryOpen
                              ? "border-indigo-400 ring-2 ring-indigo-400/20"
                              : "border-slate-600/50 hover:border-slate-500"
                          )}
                          style={{ minWidth: "82px" }}
                        >
                          <FlagIcon countryCode={selectedCountry.countryCode} />
                          <span className="text-slate-300 hidden sm:inline text-[11px]">
                            {selectedCountry.code}
                          </span>
                          <ChevronDown
                            size={10}
                            className={clsx(
                              "text-slate-500 transition-transform duration-200",
                              countryOpen && "rotate-180"
                            )}
                          />
                        </button>

                        <AnimatePresence>
                          {countryOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -5, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -5, scale: 0.98 }}
                              transition={{ duration: 0.13 }}
                              className="absolute z-50 left-0 mt-1.5 w-56 rounded-xl overflow-hidden border border-slate-600/50 shadow-2xl bg-slate-900"
                            >
                              <div className="p-1.5 border-b border-slate-700/50">
                                <div className="relative">
                                  <Search size={11} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500" />
                                  <input
                                    type="text"
                                    value={countrySearch}
                                    onChange={(e) => setCountrySearch(e.target.value)}
                                    placeholder="Search..."
                                    className="w-full pl-6 pr-2 py-1.5 rounded-md text-xs text-white bg-slate-800 border border-slate-600/50 focus:outline-none focus:border-indigo-400 placeholder:text-slate-600"
                                    autoFocus
                                  />
                                </div>
                              </div>
                              <div className="p-1 max-h-40 overflow-y-auto custom-scrollbar">
                                {filteredCountries.map((country) => (
                                  <button
                                    key={`${country.code}-${country.name}`}
                                    type="button"
                                    onClick={() => handleCountrySelect(country)}
                                    className={clsx(
                                      "w-full text-left px-2 py-1.5 rounded-md text-xs transition-all duration-150 font-medium flex items-center gap-2",
                                      selectedCountry.code === country.code &&
                                        selectedCountry.name === country.name
                                        ? "bg-indigo-500/20 text-indigo-300"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                                    )}
                                  >
                                    <FlagIcon countryCode={country.countryCode} />
                                    <span className="flex-1 truncate">{country.name}</span>
                                    <span className="text-slate-600 text-[10px] font-mono">{country.code}</span>
                                    {selectedCountry.code === country.code &&
                                      selectedCountry.name === country.name && (
                                        <Check size={11} className="text-indigo-400 flex-shrink-0" />
                                      )}
                                  </button>
                                ))}
                                {filteredCountries.length === 0 && (
                                  <div className="px-2 py-3 text-center text-slate-500 text-xs">
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
                          name="mobile"
                          value={form.mobile}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder={`${selectedCountry.length} digits`}
                          className={clsx(
                            "w-full px-3 py-2 pr-8 rounded-xl border bg-slate-800/70 text-white placeholder:text-slate-500 focus:ring-2 transition outline-none text-sm font-medium",
                            getBorderClass("mobile")
                          )}
                          autoComplete="tel"
                          maxLength={selectedCountry.length}
                        />
                        {touched.mobile && !errors.mobile && form.mobile && (
                          <Check size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-400" />
                        )}
                        {errors.mobile && touched.mobile && (
                          <AlertCircle size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-red-400" />
                        )}
                      </div>
                    </div>
                    <AnimatePresence>
                      {errors.mobile && touched.mobile && (
                        <motion.p
                          initial={{ opacity: 0, y: -4, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -4, height: 0 }}
                          className="text-[10px] text-red-400 mt-0.5 ml-0.5 font-medium"
                        >
                          {errors.mobile}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Service Dropdown */}
                  <div>
                    <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                      <Package size={10} /> Choose Service *
                    </label>
                    <div className="relative">
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={clsx(
                          inputClass,
                          "appearance-none pr-8",
                          getBorderClass("service"),
                          !form.service && "text-slate-500"
                        )}
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-slate-800 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                      {touched.service && !errors.service && form.service && (
                        <Check size={14} className="absolute right-7 top-1/2 -translate-y-1/2 text-emerald-400" />
                      )}
                    </div>
                    <AnimatePresence>
                      {errors.service && touched.service && (
                        <motion.p
                          initial={{ opacity: 0, y: -4, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -4, height: 0 }}
                          className="text-[10px] text-red-400 mt-0.5 ml-0.5 font-medium"
                        >
                          {errors.service}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Message (optional) */}
                  <div>
                    <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                      <MessageSquare size={10} /> Message (optional)
                    </label>
                    <div className="relative">
                      <textarea
                        name="message"
                        rows={3}
                        value={form.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Tell us about your requirements..."
                        className={clsx(
                          "w-full px-4 py-2 rounded-xl border bg-slate-800/70 text-white placeholder:text-slate-500 focus:ring-2 transition outline-none text-sm font-medium resize-none",
                          "border-slate-600/50 focus:border-indigo-400 focus:ring-indigo-400/20"
                        )}
                      />
                      {form.message && (
                        <span className="absolute bottom-2 right-3 text-[10px] text-slate-600 font-mono">
                          {form.message.length}/500
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 0.9, repeat: Infinity }}
                      >
                        Submitting...
                      </motion.span>
                    ) : (
                      "Submit Demo Request"
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}