import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import clsx from "clsx";
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  ShieldCheck,
  Server,
  Zap,
  Headphones,
  Lock,
  Cpu,
  Globe,
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
import FlagIcon from "../FlagIcon";
import { COUNTRIES } from "../countries";
import { VALIDATION_RULES } from "../validationRules";

const benefits = [
  "Free cPanel & WHM included",
  "1‑click app installer (WordPress, Joomla, etc.)",
  "Free SSL certificates & daily backups",
  "24/7 expert support via chat & ticket",
];

const stats = [
  { value: "99.99%", label: "Uptime Guarantee" },
  { value: "450+", label: "Apps 1‑Click Install" },
  { value: "24/7", label: "Technical Support" },
];

const hostingPlans = [
  "cPanel Starter",
  "cPanel Business",
  "cPanel Pro",
  "Reseller Hosting",
  "WordPress Hosting",
];

export default function CpanelBanner() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "",
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

      if (name === "phone") {
        if (!value) return rules.messages.required;
        if (!selectedCountry.pattern.test(value)) return rules.messages.invalid;
        return "";
      }

      if (name === "plan") {
        if (!value) return "Please select a hosting plan";
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

      if (name === "phone") {
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
          name === "phone" ? value.replace(/\D/g, "") : value
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
    setForm((prev) => ({ ...prev, phone: "" }));
    setErrors((prev) => ({ ...prev, phone: "" }));
  }, []);

  // Full form validation
  const validateForm = useCallback(() => {
    const newErrors = {};
    const newTouched = {};

    ["name", "email", "phone", "plan"].forEach((key) => {
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
          phone: `${selectedCountry.code}${form.phone}`,
          product: form.plan,
          message: form.message || "No additional message",
          country: selectedCountry.name,
        }
      );

      if (response.data.success) {
        setSuccess(
          "Thank you! Our hosting experts will contact you shortly with a tailored cPanel solution."
        );
        setForm({ name: "", email: "", phone: "", plan: "", message: "" });
        setErrors({});
        setTouched({});
      } else {
        setError("Submission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Input styling helpers
  const inputClass =
    "w-full rounded-lg border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:ring-4";

  const getBorderClass = (fieldName) => {
    if (errors[fieldName] && touched[fieldName])
      return "border-red-400 focus:border-red-500 focus:ring-red-100";
    if (touched[fieldName] && !errors[fieldName] && form[fieldName])
      return "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-100";
    return "border-slate-300 focus:border-blue-500 focus:ring-blue-100";
  };

  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* Background gradient & subtle grid */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/20" />
      <div className="absolute inset-0 -z-10 opacity-20" />

      <div className="relative mx-auto max-w-8xl px-4 py-12 sm:px-6 lg:py-20 lg:px-8">
        {/* Main two‑column layout */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase text-blue-600 shadow-sm backdrop-blur">
              <Cloud size={16} />
              <span>cPanel Hosting</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Managed cPanel Hosting
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Built for Speed & Simplicity
              </span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-slate-600">
              Deploy your website on blazing‑fast NVMe servers with pre‑installed
              cPanel, free SSL, automatic backups, and 1‑click app installs.
              Perfect for freelancers, agencies, and small businesses.
            </p>

            {/* Benefits list */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {benefits.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 text-sm font-semibold text-slate-700"
                >
                  <CheckCircle2 size={18} className="shrink-0 text-blue-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 max-w-md">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-extrabold text-slate-800">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="/pricing"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 text-sm font-extrabold text-white shadow-lg shadow-blue-200 hover:shadow-xl transition-all"
              >
                View Hosting Plans
                <ArrowRight size={17} />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE: Lead capture form */}
          <div className="relative flex flex-col gap-6">
            {/* Hero image / illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mx-auto w-full  max-w-xs overflow-hidden rounded-2xl shadow-2xl lg:max-w-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white font-bold text-sm bg-black/40 px-3 py-1 rounded-full">
                Easy cPanel Management
              </div>
            </motion.div>

            {/* Lead capture form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-md mx-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/60 sm:p-8"
            >
              {/* Header with icon */}
              <div className="flex items-center gap-3 mb-2">
             
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    Get Your Free cPanel Demo
                  </h3>
                  
                </div>
              </div>
              <p className="mt-1 text-sm text-slate-600 mb-6">
                Fill in the details and a hosting specialist will reach out
                within 1 business hour.
              </p>

              {/* Success / Error messages */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-4 flex items-start gap-2 rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800"
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
                    className="mb-4 flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800"
                  >
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Name */}
                <div>
                  <label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-2 mb-1.5">
                    <User size={13} /> Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="John Doe"
                      className={clsx(inputClass, getBorderClass("name"), "pr-10")}
                      autoComplete="name"
                    />
                    {touched.name && !errors.name && form.name && (
                      <Check
                        size={15}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500"
                      />
                    )}
                    {errors.name && touched.name && (
                      <AlertCircle
                        size={15}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-red-400"
                      />
                    )}
                  </div>
                  <AnimatePresence>
                    {errors.name && touched.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -4, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -4, height: 0 }}
                        className="text-[11px] text-red-500 mt-1 ml-1 font-medium"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-2 mb-1.5">
                    <Mail size={13} /> Work Email *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="john@company.com"
                      className={clsx(inputClass, getBorderClass("email"), "pr-10")}
                      autoComplete="email"
                    />
                    {touched.email && !errors.email && form.email && (
                      <Check
                        size={15}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500"
                      />
                    )}
                    {errors.email && touched.email && (
                      <AlertCircle
                        size={15}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-red-400"
                      />
                    )}
                  </div>
                  <AnimatePresence>
                    {errors.email && touched.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -4, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -4, height: 0 }}
                        className="text-[11px] text-red-500 mt-1 ml-1 font-medium"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Phone with Country Code */}
                <div>
                  <label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-2 mb-1.5">
                    <Phone size={13} /> Phone Number *
                  </label>
                  <div className="flex gap-2">
                    {/* Country Code Selector */}
                    <div className="relative" ref={countryDropRef}>
                      <button
                        type="button"
                        onClick={() => {
                          setCountryOpen(!countryOpen);
                          setCountrySearch("");
                        }}
                        className={clsx(
                          "h-[42px] px-2.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all duration-200 flex-shrink-0",
                          "bg-slate-50 border",
                          countryOpen
                            ? "border-blue-500 ring-2 ring-blue-100"
                            : "border-slate-300 hover:border-slate-400"
                        )}
                        style={{ minWidth: "90px" }}
                      >
                        <FlagIcon countryCode={selectedCountry.countryCode} />
                        <span className="text-slate-700 text-xs hidden sm:inline">
                          {selectedCountry.code}
                        </span>
                        <ChevronDown
                          size={12}
                          className={clsx(
                            "text-slate-400 transition-transform duration-200",
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
                            className="absolute z-50 left-0 mt-1.5 w-60 rounded-xl overflow-hidden border border-slate-200 shadow-2xl bg-white"
                          >
                            <div className="p-2 border-b border-slate-100">
                              <div className="relative">
                                <Search
                                  size={12}
                                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                  type="text"
                                  value={countrySearch}
                                  onChange={(e) =>
                                    setCountrySearch(e.target.value)
                                  }
                                  placeholder="Search country..."
                                  className="w-full pl-7 pr-2.5 py-1.5 rounded-lg text-xs text-slate-700 bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-300"
                                  autoFocus
                                />
                              </div>
                            </div>
                            <div className="p-1 max-h-48 overflow-y-auto">
                              {filteredCountries.map((country) => (
                                <button
                                  key={`${country.code}-${country.name}`}
                                  type="button"
                                  onClick={() => handleCountrySelect(country)}
                                  className={clsx(
                                    "w-full text-left px-2.5 py-2 rounded-lg text-sm transition-all duration-150 font-medium flex items-center gap-2.5",
                                    selectedCountry.code === country.code &&
                                      selectedCountry.name === country.name
                                      ? "bg-blue-50 text-blue-700"
                                      : "text-slate-600 hover:bg-slate-50"
                                  )}
                                >
                                  <FlagIcon
                                    countryCode={country.countryCode}
                                  />
                                  <span className="flex-1 truncate">
                                    {country.name}
                                  </span>
                                  <span className="text-slate-400 text-xs font-mono">
                                    {country.code}
                                  </span>
                                  {selectedCountry.code === country.code &&
                                    selectedCountry.name === country.name && (
                                      <Check
                                        size={13}
                                        className="text-blue-600 flex-shrink-0"
                                      />
                                    )}
                                </button>
                              ))}
                              {filteredCountries.length === 0 && (
                                <div className="px-3 py-4 text-center text-slate-400 text-xs">
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
                          "w-full py-3 pr-10 rounded-lg text-sm text-slate-900 bg-slate-50 border outline-none transition focus:ring-4",
                          getBorderClass("phone")
                        )}
                        autoComplete="tel"
                        maxLength={selectedCountry.length}
                      />
                      {touched.phone && !errors.phone && form.phone && (
                        <Check
                          size={15}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500"
                        />
                      )}
                      {errors.phone && touched.phone && (
                        <AlertCircle
                          size={15}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400"
                        />
                      )}
                    </div>
                  </div>
                  <AnimatePresence>
                    {errors.phone && touched.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -4, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -4, height: 0 }}
                        className="text-[11px] text-red-500 mt-1 ml-1 font-medium"
                      >
                        {errors.phone}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Hosting Plan Dropdown */}
                <div>
                  <label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-2 mb-1.5">
                    <Package size={13} /> Select Hosting Plan *
                  </label>
                  <div className="relative">
                    <select
                      name="plan"
                      value={form.plan}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={clsx(
                        "w-full px-4 py-3 rounded-lg text-sm bg-slate-50 border outline-none transition appearance-none focus:ring-4",
                        getBorderClass("plan"),
                        form.plan ? "text-slate-900" : "text-slate-400"
                      )}
                    >
                      <option value="" disabled>
                        Choose your plan
                      </option>
                      {hostingPlans.map((plan) => (
                        <option key={plan} value={plan}>
                          {plan}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    {touched.plan && !errors.plan && form.plan && (
                      <Check
                        size={15}
                        className="absolute right-10 top-1/2 -translate-y-1/2 text-emerald-500"
                      />
                    )}
                  </div>
                  <AnimatePresence>
                    {errors.plan && touched.plan && (
                      <motion.p
                        initial={{ opacity: 0, y: -4, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -4, height: 0 }}
                        className="text-[11px] text-red-500 mt-1 ml-1 font-medium"
                      >
                        {errors.plan}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Message (optional) */}
                <div>
                  <label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-2 mb-1.5">
                    <MessageSquare size={13} /> Additional Requirements
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={3}
                      placeholder="E.g., number of websites, expected traffic, special needs..."
                      className={clsx(
                        "w-full resize-none rounded-lg border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:ring-4",
                        "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                      )}
                    />
                    {form.message && (
                      <span className="absolute bottom-2 right-3 text-[10px] text-slate-400 font-mono">
                        {form.message.length}/500
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-slate-300 transition hover:bg-slate-800 disabled:opacity-70"
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
                      Request My Demo
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </form>

              {/* Trust badges */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-4 border-t border-slate-200 pt-4 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-blue-600" />
                  <span>256‑bit SSL</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap size={15} className="text-blue-600" />
                  <span>NVMe Storage</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Headphones size={15} className="text-blue-600" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom feature ribbon */}
      <div className="border-t border-slate-200 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-700 sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Server size={17} className="text-blue-600" />
            Instant cPanel Setup
          </div>
          <div className="flex items-center gap-2">
            <Lock size={17} className="text-blue-600" />
            Free SSL & Backups
          </div>
          <div className="flex items-center gap-2">
            <Globe size={17} className="text-blue-600" />
            30‑Day Money‑Back
          </div>
          <div className="flex items-center gap-2">
            <Cpu size={17} className="text-blue-600" />
            Unlimited Bandwidth
          </div>
        </div>
      </div>
    </section>
  );
}