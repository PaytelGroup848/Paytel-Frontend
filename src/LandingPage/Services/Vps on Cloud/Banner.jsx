import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import clsx from "clsx";
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  Cpu,
  Globe,
  HardDrive,
  Headphones,
  LockKeyhole,
  Server,
  ShieldCheck,
  Zap,
  Activity,
  Clock,
  MapPin,
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

const benefits = [
  "Full root access – install any OS/software",
  "NVMe SSD storage – up to 3 GB/s throughput",
  "99.99% uptime SLA with automatic failover",
  "Free DDoS protection & SSL certificates",
];

const featureCards = [
  {
    icon: Cpu,
    title: "Dedicated vCPUs",
    text: "Intel Xeon or AMD EPYC processors, no noisy neighbors. Consistent performance under load.",
  },
  {
    icon: HardDrive,
    title: "NVMe Storage",
    text: "Up to 1 TB NVMe SSDs with RAID 10 redundancy. Blazing reads & writes.",
  },
  {
    icon: Globe,
    title: "Global Network",
    text: "40+ data centers worldwide. Latency under 20 ms to major population centres.",
  },
];

const vpsStats = [
  { value: "99.99%", label: "Uptime SLA", icon: Clock },
  { value: "40+", label: "Data Centers", icon: MapPin },
  { value: "10 Gbps", label: "Network Speed", icon: Activity },
];

const serviceOptions = [
  "Busy on Cloud",
  "Marg on Cloud",
  "Tally on Cloud",
  "School CRM",
  "Restaurant Management",
];

export default function Banner() {
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
          "Thank you! Our experts will contact you soon with a personalized VPS plan."
        );
        setForm({
          name: "",
          email: "",
          mobile: "",
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

  // Input styling helpers
  const inputClass =
    "h-11 w-full rounded-lg border bg-slate-50 px-3 pr-10 text-sm text-slate-900 outline-none transition focus:ring-4";

  const getBorderClass = (fieldName) => {
    if (errors[fieldName] && touched[fieldName])
      return "border-red-400 focus:border-red-500 focus:ring-red-100";
    if (touched[fieldName] && !errors[fieldName] && form[fieldName])
      return "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-100";
    return "border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-indigo-100";
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC42Ij48cGF0aCBkPSJNMzYgMThjMC0xLjEtLjktMi0yLTJoLTEwYy0xLjEgMC0yIC45LTIgMnYxMGMwIDEuMS45IDIgMiAyaDEwYzEuMSAwIDItLjkgMi0yVjE4ek0yNCAxOGgxMHYxMEgyNFYxOCIvPjxwYXRoIGQ9Ik0yNCAzNGgydjJoLTJ2LTJ6bTItMmgydjJoLTJ2LTJ6bS0yIDJoMnYyaC0ydi0yem0yIDJoMnYyaC0ydi0yem0tMi0yaDJ2MmgtMnYtMnptMi0yaDJWMjRoLTJ2MnptMi0yaDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />

      {/* Ambient glow circles */}
      <div className="absolute left-0 top-0 h-full w-full">
        <div className="absolute -top-20 left-20 h-96 w-96 rounded-full bg-indigo-200/30 blur-[120px]" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-blue-200/30 blur-[100px]" />
      </div>

      {/* Top gradient hairline border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent" />

      <div className="relative mx-auto grid min-h-[680px] w-full max-w-9xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        {/* Left content – unchanged */}
        <div className="min-w-0 text-slate-800">
          <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-3 py-1.5 text-xs font-bold uppercase text-indigo-600 shadow-sm backdrop-blur">
            <Cloud size={15} className="shrink-0" />
            <span className="truncate">Cloud VPS Hosting</span>
          </div>

          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-normal sm:text-5xl lg:text-6xl text-slate-900">
            Deploy VPS in seconds.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
              Scale in minutes.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Get dedicated virtual servers with root access, high‑speed NVMe SSDs,
            and global data centers. Perfect for web apps, game servers, SaaS,
            and enterprise workloads.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {benefits.map((item) => (
              <div key={item} className="flex min-w-0 items-center gap-2 text-sm font-semibold text-slate-700">
                <CheckCircle2 size={17} className="shrink-0 text-indigo-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg">
            {vpsStats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="flex justify-center mb-1">
                  <Icon size={20} className="text-indigo-500" />
                </div>
                <p className="text-2xl font-extrabold text-slate-800">{value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {featureCards.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-white/90 p-4 shadow-md shadow-slate-200/60 backdrop-blur transition hover:shadow-lg hover:shadow-slate-200/80">
                <Icon size={22} className="text-indigo-600" />
                <h3 className="mt-3 text-sm font-extrabold text-slate-800">{title}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#pricing"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 text-sm font-extrabold text-white shadow-lg shadow-indigo-200/50 transition hover:from-indigo-700 hover:to-blue-700 hover:shadow-xl"
            >
              Get Started Now
              <ArrowRight size={17} />
            </a>
            <a
              href="#plans"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white/90 px-6 text-sm font-bold text-slate-700 shadow-sm shadow-slate-200/50 transition hover:bg-white hover:shadow"
            >
              Compare Plans
            </a>
          </div>
        </div>

        {/* Right side – DEMO REQUEST CARD with validation */}
        <div className="min-w-0 lg:justify-self-end">
          <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200/60 sm:p-6 lg:p-7"
            noValidate
          >
            {/* Header with icon */}
            <div className="flex items-center gap-3 mb-2">
              <div>
                <p className="text-sm font-bold uppercase text-indigo-600">Free Consultation</p>
              
              </div>
            </div>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Find your perfect VPS
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 mb-5">
              Fill in your details and our cloud experts will recommend the best configuration for your workload.
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
              {/* Name Field */}
              <div className="min-w-0">
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-700">
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

              {/* Email Field */}
              <div className="min-w-0">
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-700">
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

              {/* Phone Field with Country Code */}
              <div className="min-w-0">
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-700">
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
                              <div className="px-2 py-3 text-center text-slate-400 text-xs">No countries found</div>
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
                        "h-11 w-full rounded-lg border bg-slate-50 px-3 pr-8 text-sm text-slate-900 outline-none transition focus:ring-4",
                        getBorderClass("mobile")
                      )}
                      autoComplete="tel"
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
                <AnimatePresence>
                  {errors.mobile && touched.mobile && (
                    <motion.p
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      className="text-[10px] text-red-500 mt-0.5 ml-0.5 font-medium"
                    >
                      {errors.mobile}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Service Selection */}
              <div className="min-w-0">
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <Package size={12} /> Choose service *
                </label>
                <div className="relative">
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={clsx(
                      "h-11 w-full rounded-lg border bg-slate-50 px-3 pr-8 text-sm outline-none transition appearance-none focus:ring-4",
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

              {/* Message Field */}
              <div className="min-w-0 sm:col-span-2">
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <MessageSquare size={12} /> Message (optional)
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    placeholder="Describe your workload, traffic, or any specific requirements..."
                    className="w-full resize-none rounded-lg border border-slate-300 bg-slate-50 px-3 py-3 pr-12 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />
                  {form.message && (
                    <span className="absolute bottom-2 right-3 text-[10px] text-slate-400 font-mono">
                      {form.message.length}/500
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-extrabold text-white shadow-lg shadow-slate-300/50 transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:opacity-70 disabled:cursor-not-allowed"
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
                  Request a quote
                  <ArrowRight size={17} />
                </>
              )}
            </button>

            <div className="mt-5 grid grid-cols-1 gap-2 border-t border-slate-200 pt-4 sm:grid-cols-3">
              {[
                { icon: Globe, text: "Global data centers" },
                { icon: LockKeyhole, text: "Encrypted access" },
                { icon: Headphones, text: "24/7 expert support" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <Icon size={15} className="shrink-0 text-slate-500" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}