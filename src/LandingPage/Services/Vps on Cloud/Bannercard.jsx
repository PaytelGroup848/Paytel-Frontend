import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import clsx from "clsx";
import {
  ArrowRight,
  Globe,
  Headphones,
  LockKeyhole,
  Search,
  ChevronDown,
  Check,
  AlertCircle,
  User,
  Mail,
  Package,
  MessageSquare,
  Phone,
  Server,
  ShieldCheck,
  Zap,
} from "lucide-react";
import FlagIcon from "../../FlagIcon";
import { COUNTRIES } from "../../countries";
import { VALIDATION_RULES } from "../../validationRules";

const serviceOptions = [
  "Busy on Cloud",
  "Marg on Cloud",
  "Tally on Cloud",
  "School CRM",
  "Restaurant Management",
];

// Scrolling images shown behind the card
const scrollImages = [
  {
    src: "/vpsWEB.jpg",
    alt: "Global data center server racks with blue lighting",
  },

];

// Floating trust badges that overlay the image
const trustBadges = [
  { icon: ShieldCheck, label: "SOC 2 Certified", color: "text-emerald-400" },
  { icon: Zap, label: "10 Gbps Network", color: "text-yellow-400" },
  { icon: Server, label: "NVMe Storage", color: "text-blue-400" },
];

/* ───────────────────────────────────────────────────────────
   TIMING CONFIG — tune the image/form swap flow from here
   ─────────────────────────────────────────────────────────── */
const IMAGE_INTERVAL_MS = 2000; // each image stays for 2s
const FORM_HOLD_MS = 7000; // form stays visible for 7s before going back to images

function ScrollingImageStack({ activeIdx }) {
  return (
    <div className="relative w-full h-full">
      {scrollImages.map((img, i) => (
        <motion.div
          key={img.src}
          className="absolute inset-0"
          initial={false}
          animate={{
            opacity: i === activeIdx ? 1 : 0,
            scale: i === activeIdx ? 1 : 1.04,
          }}
          transition={{ duration: 1.0 , ease: "easeInOut" }}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/35 to-transparent" />
        </motion.div>
      ))}

      {/* Trust badges */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 z-10">
        <div className="flex flex-wrap gap-2">
          {trustBadges.map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-2.5 py-1 sm:px-3 sm:py-1.5"
            >
              <Icon size={12} className={color} />
              <span className="text-[10px] sm:text-[11px] font-semibold text-white">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress dots reflecting the auto-cycle */}
      <div className="absolute top-4 right-4 flex gap-1.5 z-10">
        {scrollImages.map((_, i) => (
          <span
            key={i}
            className={clsx(
              "rounded-full transition-all duration-300",
              i === activeIdx ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default function BannerCard() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
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

  // ── View toggle: 'image' or 'form' — they occupy the exact same slot ──
  const [view, setView] = useState("image");
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  useEffect(() => {
    let timer;

    if (view === "image") {
      timer = setTimeout(() => {
        if (activeImgIdx < scrollImages.length - 1) {
          setActiveImgIdx((prev) => prev + 1);
        } else {
          // finished one full image cycle → swap to the form card
          setView("form");
        }
      }, IMAGE_INTERVAL_MS);
    } else {
      timer = setTimeout(() => {
        setActiveImgIdx(0);
        setView("image");
      }, FORM_HOLD_MS);
    }

    return () => clearTimeout(timer);
  }, [view, activeImgIdx]);

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

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch)
  );

  const validateField = useCallback(
    (name, value) => {
      const rules = VALIDATION_RULES[name];
      if (!rules) return "";

      if (name === "mobile" || name === "phone") {
        if (!value) return VALIDATION_RULES.phone.messages.required;
        // 1) exact digit-count check, per selected country
        if (value.length !== selectedCountry.length) {
          return `Enter a valid ${selectedCountry.length}-digit number for ${selectedCountry.name}`;
        }
        // 2) country-specific pattern check (leading digit rules etc.)
        if (!selectedCountry.pattern.test(value)) {
          return VALIDATION_RULES.phone.messages.invalid;
        }
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

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    },
    [validateField]
  );

  const handleCountrySelect = useCallback((country) => {
    setSelectedCountry(country);
    setCountryOpen(false);
    setCountrySearch("");
    setForm((prev) => ({ ...prev, mobile: "" }));
    setErrors((prev) => ({ ...prev, mobile: "" }));
  }, []);

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
          "Thank you! Our experts will contact you soon with a personalized VPS plan."
        );
        setForm({ name: "", email: "", mobile: "", service: "", message: "" });
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

  const inputClass =
    "h-11 w-full rounded-lg border bg-slate-50 px-3 pr-10 text-[13px] sm:text-sm font-medium text-slate-900 outline-none transition focus:ring-4 tracking-[-0.005em]";

  const getBorderClass = (fieldName) => {
    if (errors[fieldName] && touched[fieldName])
      return "border-red-400 focus:border-red-500 focus:ring-red-100";
    if (touched[fieldName] && !errors[fieldName] && form[fieldName])
      return "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-100";
    return "border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-indigo-100";
  };

  return <>
    <div
      className="min-w-0 w-full max-w-xl mx-auto lg:mx-0 font-sans antialiased"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif" }}
    >
      {/* ── Single slot: image OR form card, never both ── */}
      <div className="relative w-full min-h-[600px] sm:min-h-[640px] rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/50 ring-1 ring-slate-900/5">
        <AnimatePresence mode="wait">
          {view === "image" ? (
            <motion.div
              key="image-view"
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <ScrollingImageStack activeIdx={activeImgIdx} />

              {/* Tap to skip straight to the form */}
              <button
                type="button"
                onClick={() => setView("form")}
                className="absolute inset-0 z-20 cursor-pointer"
                aria-label="Show enquiry form"
              />
            </motion.div>
          ) : (
            <motion.form
              key="form-view"
              onSubmit={handleSubmit}
              className="absolute inset-0 flex flex-col rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 overflow-hidden ring-1 ring-slate-900/5"
              noValidate
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              {/* Card header */}
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-2.5 py-1 text-[10px] sm:text-[11px] font-medium uppercase tracking-wide text-indigo-600">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
                  </span>
                  Free Consultation
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setActiveImgIdx(0);
                    setView("image");
                  }}
                  className="text-[10px] sm:text-[11px] font-semibold text-slate-400 hover:text-slate-600 transition"
                >
                  View gallery
                </button>
              </div>

              <h2 className="mt-3 text-[clamp(1.35rem,3.2vw,1.875rem)] font-semibold tracking-normal text-slate-900 leading-tight">
                Find your perfect VPS
              </h2>
              <p className="mt-1.5 text-[clamp(0.8rem,1.6vw,0.9rem)] font-normal leading-6 text-slate-500 mb-4">
                Fill in your details and our cloud experts will recommend the
                best configuration for your workload.
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
                  <label className="mb-1.5 flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-slate-700">
                    <User size={12} /> Full name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="John Doe"
                      className={clsx(inputClass, getBorderClass("name"))}
                      autoComplete="name"
                    />
                    {touched.name && !errors.name && form.name && (
                      <Check size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                    )}
                    {errors.name && touched.name && (
                      <AlertCircle size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400" />
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
                  <label className="mb-1.5 flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-slate-700">
                    <Mail size={12} /> Email address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="john@company.com"
                      className={clsx(inputClass, getBorderClass("email"))}
                      autoComplete="email"
                    />
                    {touched.email && !errors.email && form.email && (
                      <Check size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                    )}
                    {errors.email && touched.email && (
                      <AlertCircle size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400" />
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

                {/* Phone with country selector */}
                <div className="min-w-0">
                  <label className="mb-1.5 flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-slate-700">
                    <Phone size={12} /> Phone number *
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
                          "h-11 px-2 rounded-lg text-xs font-medium flex items-center gap-1 transition-all duration-200 flex-shrink-0 bg-slate-50 border",
                          countryOpen
                            ? "border-indigo-500 bg-white ring-2 ring-indigo-100"
                            : "border-slate-300 hover:border-slate-400"
                        )}
                        style={{ minWidth: "82px" }}
                      >
                        <FlagIcon countryCode={selectedCountry.countryCode} />
                        <span className="text-slate-700 hidden sm:inline">{selectedCountry.code}</span>
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

                    <div className="relative flex-1">
                      <input
                        type="tel"
                        name="mobile"
                        value={form.mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={`${selectedCountry.length} digits`}
                        className={clsx(
                          "h-11 w-full rounded-lg border bg-slate-50 px-3 pr-8 text-[13px] sm:text-sm font-medium text-slate-900 outline-none transition focus:ring-4 tracking-[-0.005em]",
                          getBorderClass("mobile")
                        )}
                        autoComplete="tel"
                        inputMode="numeric"
                        maxLength={selectedCountry.length}
                      />
                      {touched.mobile && !errors.mobile && form.mobile && (
                        <Check size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                      )}
                      {errors.mobile && touched.mobile && (
                        <AlertCircle size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-red-400" />
                      )}
                    </div>
                  </div>
                  <div className="mt-0.5 ml-0.5 flex items-center justify-between">
                    <AnimatePresence>
                      {errors.mobile && touched.mobile && (
                        <motion.p
                          initial={{ opacity: 0, y: -4, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -4, height: 0 }}
                          className="text-[10px] text-red-500 font-medium"
                        >
                          {errors.mobile}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    {!errors.mobile && (
                      <span className="text-[10px] text-slate-400 font-mono ml-auto">
                        {form.mobile.length}/{selectedCountry.length}
                      </span>
                    )}
                  </div>
                </div>

                {/* Service */}
                <div className="min-w-0">
                  <label className="mb-1.5 flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-slate-700">
                    <Package size={12} /> Choose service *
                  </label>
                  <div className="relative">
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={clsx(
                        "h-11 w-full rounded-lg border bg-slate-50 px-3 pr-8 text-[13px] sm:text-sm font-medium outline-none transition appearance-none focus:ring-4",
                        getBorderClass("service"),
                        form.service ? "text-slate-900" : "text-slate-400"
                      )}
                    >
                      <option value="" disabled>Select service</option>
                      {serviceOptions.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    {touched.service && !errors.service && form.service && (
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
                  <label className="mb-1.5 flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-slate-700">
                    <MessageSquare size={12} /> Message (optional)
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={2}
                      maxLength={500}
                      placeholder="Describe your workload, traffic, or any specific requirements..."
                      className="w-full resize-none rounded-lg border border-slate-300 bg-slate-50 px-3 py-3 pr-12 text-[13px] sm:text-sm font-medium text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    />
                    {form.message && (
                      <span className="absolute bottom-2 right-3 text-[10px] text-slate-400 font-mono">
                        {form.message.length}/500
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 text-sm font-semibold tracking-[-0.01em] text-white shadow-lg shadow-indigo-200/60 transition-all duration-200 hover:from-indigo-700 hover:to-blue-700 hover:shadow-xl hover:shadow-indigo-200/70 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
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
                    Request a free quote
                    <ArrowRight size={17} />
                  </>
                )}
              </button>

              {/* Trust footer */}
              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
                {[
                  { icon: Globe, text: "Global DCs" },
                  { icon: LockKeyhole, text: "Encrypted" },
                  { icon: Headphones, text: "24/7 Support" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex flex-col items-center gap-1 text-center">
                    <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center">
                      <Icon size={14} className="text-slate-500" />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-500">{text}</span>
                  </div>
                ))}
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  </>;
}