import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import clsx from "clsx";
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  LockKeyhole,
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

const services = [
  "Tally on Cloud",
  "Busy on Cloud",
  "Marg on Cloud",
  "Jwelly on Cloud",
  "Focus on Cloud",
];

export default function Banner() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
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

      if (name === "phone" || name === "mobile") {
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

      if (name === "phone" || name === "mobile") {
        const numericValue = value.replace(/\D/g, "");
        if (numericValue.length <= selectedCountry.length) {
          setFormData((prev) => ({ ...prev, [name]: numericValue }));
        }
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }

      if (success) setSuccess("");
      if (error) setError("");

      setTouched((prev) => {
        const newTouched = { ...prev, [name]: true };
        const errorMsg = validateField(
          name,
          name === "phone" || name === "mobile" ? value.replace(/\D/g, "") : value
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
    setFormData((prev) => ({ ...prev, phone: "" }));
    setErrors((prev) => ({ ...prev, phone: "" }));
  }, []);

  // Full form validation
  const validateForm = useCallback(() => {
    const newErrors = {};
    const newTouched = {};

    ["name", "email", "phone", "service"].forEach((key) => {
      newTouched[key] = true;
      const errorMsg = validateField(key, formData[key]);
      if (errorMsg) newErrors[key] = errorMsg;
    });

    setErrors(newErrors);
    setTouched(newTouched);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

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
          name: formData.name,
          email: formData.email,
          phone: `${selectedCountry.code}${formData.phone}`,
          product: formData.service,
          message: formData.message || "No message provided",
          country: selectedCountry.name,
        }
      );

      if (response.data.success) {
        setSuccess(
          "Thank you! Your demo request has been submitted. Our team will contact you soon."
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
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

  // Input base class for light theme
  const inputClass =
    "h-11 w-full rounded-lg border bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:ring-4";

  const getBorderClass = (fieldName) => {
    if (errors[fieldName] && touched[fieldName])
      return "border-red-400 focus:border-red-500 focus:bg-white focus:ring-red-100";
    if (touched[fieldName] && !errors[fieldName] && formData[fieldName])
      return "border-emerald-400 focus:border-emerald-500 focus:bg-white focus:ring-emerald-100";
    return "border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-indigo-100";
  };

  return (
    <section className="relative isolate w-full overflow-hidden bg-slate-950">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-35"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1800&q=80")',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(34,197,94,0.28),transparent_32%),linear-gradient(120deg,rgba(15,23,42,0.98),rgba(15,23,42,0.84)_45%,rgba(30,64,175,0.8))]" />

      <div className="mx-auto grid min-h-[680px] w-full max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        {/* Left Content */}
        <div className="min-w-0 text-white">
          <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-emerald-100 shadow-sm backdrop-blur">
            <Cloud size={15} className="shrink-0" />
            <span className="truncate">Secure Tally access from anywhere</span>
          </div>

          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
            Tally on Cloud for fast, secure and always-ready business accounting
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
            Run TallyPrime on high-performance cloud servers with multi-user access,
            automatic backups and expert support, so your team can work smoothly from
            office, home or branch locations.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="rounded-xl border border-emerald-300/30 bg-emerald-400/15 px-4 py-3 backdrop-blur">
              <p className="text-xs font-semibold uppercase text-emerald-100">Starting from</p>
              <p className="mt-1 text-3xl font-extrabold text-white">
                Rs.299
                <span className="text-sm font-semibold text-emerald-100"> / month</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm text-slate-100 sm:flex sm:flex-wrap">
              {['99.9% uptime', 'Daily backup', 'Bank-grade security', 'Quick setup'].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="shrink-0 text-emerald-300" />
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <ServerCog size={22} className="text-emerald-300" />
              <p className="mt-3 text-sm font-semibold">Cloud Server</p>
              <p className="mt-1 text-xs leading-5 text-slate-300">Optimized for TallyPrime performance.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <ShieldCheck size={22} className="text-sky-300" />
              <p className="mt-3 text-sm font-semibold">Data Protection</p>
              <p className="mt-1 text-xs leading-5 text-slate-300">Encrypted access with regular backups.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <LockKeyhole size={22} className="text-amber-300" />
              <p className="mt-3 text-sm font-semibold">Any Device</p>
              <p className="mt-1 text-xs leading-5 text-slate-300">Use Tally from desktop or laptop.</p>
            </div>
          </div>
        </div>

        {/* Right Card – Demo Form */} 
        <div className=" ms-5 min-w-0 lg:justify-self-end">
          <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-xl rounded-2xl border border-white/20 bg-white p-4 shadow-2xl shadow-slate-950/30 sm:p-6 lg:p-7"
            noValidate
          >
            {/* Header with icon */}
            <div className="flex items-center gap-3 mb-4">
             
              <div>
                <p className="text-sm font-semibold uppercase text-indigo-600">Book a  Free Demo</p>
              </div>
            </div>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Get your Tally cloud plan
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500 mb-5">
              Share your details and our cloud expert will help you choose the right setup.
            </p>

            {/* Feedback messages */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-4 flex items-start gap-2 rounded-xl bg-green-50 border border-green-200 p-3 text-sm text-green-800"
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
                  className="mb-4 flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-800"
                >
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Name */}
              <div className="min-w-0">
                <label className="flex items-center gap-1.5 mb-1.5 text-xs font-semibold text-slate-600">
                  <User size={12} /> Full name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your name"
                    className={clsx(inputClass, getBorderClass("name"), "pr-8")}
                    autoComplete="name"
                  />
                  {touched.name && !errors.name && formData.name && (
                    <Check size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-emerald-500" />
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
                      className="text-[10px] text-red-500 mt-0.5 ml-0.5 font-medium"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Email */}
              <div className="min-w-0">
                <label className="flex items-center gap-1.5 mb-1.5 text-xs font-semibold text-slate-600">
                  <Mail size={12} /> Email address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="you@company.com"
                    className={clsx(inputClass, getBorderClass("email"), "pr-8")}
                    autoComplete="email"
                  />
                  {touched.email && !errors.email && formData.email && (
                    <Check size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-emerald-500" />
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
                      className="text-[10px] text-red-500 mt-0.5 ml-0.5 font-medium"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Phone with Country Code */}
              <div className="min-w-0">
                <label className="flex items-center gap-1.5 mb-1.5 text-xs font-semibold text-slate-600">
                  <Phone size={12} /> Phone number *
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
                        "h-11 px-2 rounded-lg text-xs font-medium flex items-center gap-1 transition-all duration-200 flex-shrink-0",
                        "bg-slate-50 border",
                        countryOpen
                          ? "border-indigo-500 bg-white ring-2 ring-indigo-100"
                          : "border-slate-200 hover:border-slate-300"
                      )}
                      style={{ minWidth: "82px" }}
                    >
                      <FlagIcon countryCode={selectedCountry.countryCode} />
                      <span className="text-slate-700 hidden sm:inline text-[11px]">
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
                          initial={{ opacity: 0, y: -5, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -5, scale: 0.98 }}
                          transition={{ duration: 0.13 }}
                          className="absolute z-50 left-0 mt-1.5 w-56 rounded-xl overflow-hidden border border-slate-200 shadow-2xl bg-white"
                        >
                          <div className="p-1.5 border-b border-slate-100">
                            <div className="relative">
                              <Search size={11} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                              <input
                                type="text"
                                value={countrySearch}
                                onChange={(e) => setCountrySearch(e.target.value)}
                                placeholder="Search..."
                                className="w-full pl-6 pr-2 py-1.5 rounded-md text-xs text-slate-700 bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-300"
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
                                    ? "bg-indigo-50 text-indigo-700"
                                    : "text-slate-600 hover:bg-slate-50"
                                )}
                              >
                                <FlagIcon countryCode={country.countryCode} />
                                <span className="flex-1 truncate">{country.name}</span>
                                <span className="text-slate-400 text-[10px] font-mono">{country.code}</span>
                                {selectedCountry.code === country.code &&
                                  selectedCountry.name === country.name && (
                                    <Check size={11} className="text-indigo-600 flex-shrink-0" />
                                  )}
                              </button>
                            ))}
                            {filteredCountries.length === 0 && (
                              <div className="px-2 py-3 text-center text-slate-400 text-xs">
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
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={`${selectedCountry.length} digits`}
                      className={clsx(
                        "h-11 w-full rounded-lg border bg-slate-50 px-3 pr-8 text-sm text-slate-900 outline-none transition focus:ring-4",
                        getBorderClass("phone")
                      )}
                      autoComplete="tel"
                      maxLength={selectedCountry.length}
                    />
                    {touched.phone && !errors.phone && formData.phone && (
                      <Check size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-500" />
                    )}
                    {errors.phone && touched.phone && (
                      <AlertCircle size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-red-400" />
                    )}
                  </div>
                </div>
                <AnimatePresence>
                  {errors.phone && touched.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      className="text-[10px] text-red-500 mt-0.5 ml-0.5 font-medium"
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Service Dropdown */}
              <div className="min-w-0">
                <label className="flex items-center gap-1.5 mb-1.5 text-xs font-semibold text-slate-600">
                  <Package size={12} /> Choose service *
                </label>
                <div className="relative">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={clsx(
                      "h-11 w-full rounded-lg border bg-slate-50 px-3 pr-8 text-sm outline-none transition appearance-none focus:ring-4",
                      getBorderClass("service"),
                      formData.service ? "text-slate-900" : "text-slate-400"
                    )}
                  >
                    <option value="" disabled>Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  {touched.service && !errors.service && formData.service && (
                    <Check size={14} className="absolute right-7 top-1/2 -translate-y-1/2 text-emerald-500" />
                  )}
                </div>
                <AnimatePresence>
                  {errors.service && touched.service && (
                    <motion.p
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      className="text-[10px] text-red-500 mt-0.5 ml-0.5 font-medium"
                    >
                      {errors.service}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Message */}
              <div className="min-w-0 sm:col-span-2">
                <label className="flex items-center gap-1.5 mb-1.5 text-xs font-semibold text-slate-600">
                  <MessageSquare size={12} /> Message (optional)
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    placeholder="Tell us about users, branches or current Tally setup"
                    className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 pr-12 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />
                  {formData.message && (
                    <span className="absolute bottom-2 right-3 text-[10px] text-slate-400 font-mono">
                      {formData.message.length}/500
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed"
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
                  Submit Demo Request
                  <ArrowRight size={17} />
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-slate-500">
              No commitment required. We usually respond within business hours.
            </p>
          </form>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1);
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}