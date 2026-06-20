import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import clsx from "clsx";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  Activity,
  X,
  ChevronDown,
  Search,
  Check,
  AlertCircle,
  User,
  Mail,
  Package,
  MessageSquare,
  Phone,
  Globe,
  LockKeyhole,
  Headphones,
} from "lucide-react";
import FlagIcon from "../../FlagIcon";
import { COUNTRIES } from "../../countries";
import { VALIDATION_RULES } from "../../validationRules";

const FONT_STACK = "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif";

const serviceOptions = [
  "Busy on Cloud",
  "Marg on Cloud",
  "Tally on Cloud",
  "School CRM",
  "Restaurant Management",
];

const scrollImages = [
  {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=80",
    alt: "Global data center server racks with blue lighting",
  },
  {
    src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=700&q=80",
    alt: "Cloud network infrastructure overhead view",
  },
  {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&q=80",
    alt: "Dark server room with glowing cables",
  },
  {
    src: "https://images.unsplash.com/photo-1620714223084-8fcacc2dbed5?w=700&q=80",
    alt: "Abstract digital network connections",
  },
];

const benefits = [
  "Full root access on every plan",
  "NVMe SSD – up to 3 GB/s speed",
  "99.99% uptime SLA",
];

const vpsStats = [
  { value: "99.99%", label: "Uptime", icon: Clock },
  { value: "40+", label: "Data Centers", icon: MapPin },
  { value: "10 Gbps", label: "Network", icon: Activity },
];

const IMAGE_INTERVAL_MS = 2200;

/* ─────────────────────────────────────────────
   Compact right-side image cycler (mobile)
   ───────────────────────────────────────────── */
function MobileImageStack() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % scrollImages.length);
    }, IMAGE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      {scrollImages.map((img, i) => (
        <motion.div
          key={img.src}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === activeIdx ? 1 : 0, scale: i === activeIdx ? 1 : 1.05 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <img src={img.src} alt={img.alt} className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
        </motion.div>
      ))}
      <div className="absolute top-2.5 right-2.5 flex gap-1 z-10">
        {scrollImages.map((_, i) => (
          <span
            key={i}
            className={clsx(
              "rounded-full transition-all duration-300",
              i === activeIdx ? "w-3.5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Bottom-sheet enquiry form (mobile)
   ───────────────────────────────────────────── */
function MobileEnquirySheet({ open, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", service: "", message: "" });
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const countryDropRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
        if (value.length !== selectedCountry.length) {
          return `Enter a valid ${selectedCountry.length}-digit number for ${selectedCountry.name}`;
        }
        if (!selectedCountry.pattern.test(value)) return VALIDATION_RULES.phone.messages.invalid;
        return "";
      }
      if (name === "service") {
        if (!value) return "Please select a service";
        return "";
      }
      if (rules.required && !value.trim()) return rules.messages.required;
      if (rules.minLength && value.trim().length < rules.minLength) return rules.messages.minLength;
      if (rules.maxLength && value.trim().length > rules.maxLength) return rules.messages.maxLength;
      if (rules.pattern && !rules.pattern.test(value.trim())) return rules.messages.pattern;
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
        setErrors((prevErrors) => ({ ...prevErrors, [name]: newTouched[name] ? errorMsg : prevErrors[name] }));
        return newTouched;
      });
    },
    [success, error, selectedCountry, validateField]
  );

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
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
      const response = await axios.post("https://api.marketing.cloudedata.com/api/public/submit", {
        name: form.name,
        email: form.email,
        phone: `${selectedCountry.code}${form.mobile}`,
        product: form.service,
        message: form.message || "No message provided",
        country: selectedCountry.name,
      });
      if (response.data.success) {
        setSuccess("Thank you! Our experts will contact you soon with a personalized VPS plan.");
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
    "h-11 w-full rounded-lg border bg-slate-50 px-3 pr-10 text-[13px] font-medium text-slate-900 outline-none transition focus:ring-4 tracking-[-0.005em]";

  const getBorderClass = (fieldName) => {
    if (errors[fieldName] && touched[fieldName]) return "border-red-400 focus:border-red-500 focus:ring-red-100";
    if (touched[fieldName] && !errors[fieldName] && form[fieldName])
      return "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-100";
    return "border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-indigo-100";
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            key="sheet"
            className="fixed inset-x-0 bottom-0 z-[70] max-h-[88vh] overflow-y-auto rounded-t-3xl bg-white px-4 pb-6 pt-3 shadow-2xl"
            style={{ fontFamily: FONT_STACK }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            onSubmit={handleSubmit}
          >
            <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-slate-200" />

            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-indigo-600">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
                  </span>
                  Free Consultation
                </span>
                <h2 className="mt-2 text-xl font-bold tracking-[-0.02em] text-slate-900">
                  Find your perfect VPS
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-500 transition hover:bg-slate-100"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <p className="mt-2 text-[13px] leading-5 text-slate-500">
              Fill in your details and our cloud experts will recommend the best configuration.
            </p>

            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 flex items-start gap-2 rounded-xl bg-green-50 border border-green-200 p-3 text-sm text-green-800"
                >
                  <Check size={16} className="shrink-0 mt-0.5" />
                  <span>{success}</span>
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-800"
                >
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} noValidate className="mt-4 flex flex-col gap-3">
              {/* Name */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
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
                {errors.name && touched.name && (
                  <p className="mt-0.5 ml-0.5 text-[10px] font-medium text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
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
                {errors.email && touched.email && (
                  <p className="mt-0.5 ml-0.5 text-[10px] font-medium text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
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
                        countryOpen ? "border-indigo-500 bg-white ring-2 ring-indigo-100" : "border-slate-300"
                      )}
                      style={{ minWidth: "76px" }}
                    >
                      <FlagIcon countryCode={selectedCountry.countryCode} />
                      <span className="text-slate-700">{selectedCountry.code}</span>
                      <ChevronDown
                        size={10}
                        className={clsx("text-slate-400 transition-transform duration-200", countryOpen && "rotate-180")}
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
                                  selectedCountry.code === country.code && selectedCountry.name === country.name
                                    ? "bg-indigo-50 text-indigo-700"
                                    : "text-slate-600 hover:bg-slate-50"
                                )}
                              >
                                <FlagIcon countryCode={country.countryCode} />
                                <span className="flex-1 truncate">{country.name}</span>
                                <span className="text-slate-400 text-[10px] font-mono">{country.code}</span>
                                {selectedCountry.code === country.code && selectedCountry.name === country.name && (
                                  <Check size={11} className="text-indigo-600 flex-shrink-0" />
                                )}
                              </button>
                            ))}
                            {filteredCountries.length === 0 && (
                              <div className="px-2 py-3 text-center text-slate-400 text-xs">No countries found</div>
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
                        "h-11 w-full rounded-lg border bg-slate-50 px-3 pr-8 text-[13px] font-medium text-slate-900 outline-none transition focus:ring-4 tracking-[-0.005em]",
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
                  {errors.mobile && touched.mobile ? (
                    <p className="text-[10px] font-medium text-red-500">{errors.mobile}</p>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-mono ml-auto">
                      {form.mobile.length}/{selectedCountry.length}
                    </span>
                  )}
                </div>
              </div>

              {/* Service */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
                  <Package size={12} /> Choose service *
                </label>
                <div className="relative">
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={clsx(
                      "h-11 w-full rounded-lg border bg-slate-50 px-3 pr-8 text-[13px] font-medium outline-none transition appearance-none focus:ring-4",
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
                </div>
                {errors.service && touched.service && (
                  <p className="mt-0.5 ml-0.5 text-[10px] font-medium text-red-500">{errors.service}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
                  <MessageSquare size={12} /> Message (optional)
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={2}
                  maxLength={500}
                  placeholder="Describe your workload or requirements..."
                  className="w-full resize-none rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-[13px] font-medium text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-1 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 text-sm font-semibold tracking-[-0.01em] text-white shadow-lg shadow-indigo-200/60 transition-all duration-200 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 0.9, repeat: Infinity }}>
                    Submitting...
                  </motion.span>
                ) : (
                  <>
                    Request a free quote
                    <ArrowRight size={17} />
                  </>
                )}
              </button>

              <div className="mt-1 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
                {[
                  { icon: Globe, text: "Global DCs" },
                  { icon: LockKeyhole, text: "Encrypted" },
                  { icon: Headphones, text: "24/7 Support" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex flex-col items-center gap-1 text-center">
                    <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center">
                      <Icon size={13} className="text-slate-500" />
                    </div>
                    <span className="text-[9px] font-semibold text-slate-500">{text}</span>
                  </div>
                ))}
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   Main mobile banner — left text / right image
   ───────────────────────────────────────────── */
export default function BannerMobile() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <section
      className=" mt-5 relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans antialiased"
      style={{ fontFamily: FONT_STACK }}
    >
      {/* Decorative background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 -left-12 h-56 w-56 rounded-full bg-indigo-300/25 blur-[90px]" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-blue-300/25 blur-[90px]" />
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />

      <div className="relative z-10 px-4 py-7 xs:px-5">
        {/* Badge */}
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-indigo-200/60 bg-white/70 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-indigo-600 shadow-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500" />
          </span>
          Cloud VPS Hosting
        </div>

        {/* ── Side-by-side row: text (left) + image (right) ── */}
        <div className="flex items-start gap-3.5">
          {/* LEFT — text */}
          <div className="min-w-0 flex-[1.2]">
            <h1 className="text-[clamp(1.5rem,7vw,2.1rem)] font-bold leading-[1.12] tracking-[-0.02em] text-slate-900">
              Deploy VPS in seconds.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                Scale in minutes.
              </span>
            </h1>

            <p className="mt-2.5 text-[clamp(0.78rem,3.4vw,0.875rem)] font-normal leading-relaxed text-slate-600">
              Dedicated servers with root access, NVMe SSDs &amp; global data centers.
            </p>
          </div>

          {/* RIGHT — compact cycling image */}
          <div className="w-[34%] shrink-0 self-stretch">
            <div className="aspect-[3/4] w-full rounded-2xl shadow-xl shadow-slate-300/50 ring-1 ring-slate-900/5">
              <MobileImageStack />
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-4 flex flex-col gap-1.5">
          {benefits.map((item) => (
            <div key={item} className="flex items-center gap-2 text-[clamp(0.75rem,3.2vw,0.85rem)] font-medium text-slate-700">
              <CheckCircle2 size={15} className="shrink-0 text-indigo-600" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-slate-200/70 bg-white/60 backdrop-blur p-3">
          {vpsStats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="text-center">
              <div className="flex justify-center mb-1">
                <Icon size={16} className="text-indigo-500" />
              </div>
              <p className="text-[clamp(0.95rem,4vw,1.15rem)] font-bold tracking-[-0.02em] text-slate-800">{value}</p>
              <p className="text-[9px] font-medium text-slate-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Pricing strip */}
        <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-indigo-200 bg-white/80 backdrop-blur p-3.5 shadow-md shadow-indigo-100/60 ring-1 ring-slate-900/5">
          <div className="min-w-0">
            <p className="text-[10px] font-medium text-slate-500">Starting at</p>
            <p className="text-[clamp(1.15rem,5vw,1.4rem)] font-bold tracking-[-0.02em] text-slate-900">
              ₹899<span className="text-[11px] font-normal text-slate-500">/mo</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="inline-flex shrink-0 min-h-11 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-4 text-[12.5px] font-semibold tracking-[-0.01em] text-white shadow-md shadow-indigo-200/50 transition-all duration-200 active:scale-[0.98]"
          >
            Get a Quote
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Secondary CTA */}
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/80 backdrop-blur px-6 text-[13px] font-semibold tracking-[-0.01em] text-slate-700 shadow-sm transition-all duration-200 active:scale-[0.99]"
        >
          Request Free Consultation
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      <MobileEnquirySheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </section>
  );
}