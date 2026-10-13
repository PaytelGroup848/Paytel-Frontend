// src/pages/ContactUs.jsx
import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import clsx from "clsx";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Building,
  ShieldCheck,
  User,
  Briefcase,
  FileText,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Search,
  ChevronDown,
  Check,
  MessageSquare,
  Star,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import FlagIcon from "../FlagIcon";
import { COUNTRIES } from "../countries";
import { VALIDATION_RULES } from "../validationRules";
import { Helmet } from "react-helmet-async";

// ─── Static Data ──────────────────────────────────────────────────────────────

const DEPARTMENTS = [
  "Enterprise Sales",
  "Technical Infrastructure",
  "Billing & Accounting",
  "General Inquiry",
];

// ─── Contact Form Component ───────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    department: "",
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
      if (
        countryDropRef.current &&
        !countryDropRef.current.contains(e.target)
      ) {
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
      c.code.includes(countrySearch),
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

      if (rules.required && !value.trim()) return rules.messages.required;
      if (rules.minLength && value.trim().length < rules.minLength)
        return rules.messages.minLength;
      if (rules.maxLength && value.trim().length > rules.maxLength)
        return rules.messages.maxLength;
      if (rules.pattern && !rules.pattern.test(value.trim()))
        return rules.messages.pattern;

      return "";
    },
    [selectedCountry],
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
          name === "phone" ? value.replace(/\D/g, "") : value,
        );
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: newTouched[name] ? errorMsg : prevErrors[name],
        }));
        return newTouched;
      });
    },
    [success, error, selectedCountry, validateField],
  );

  // Validate on blur
  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    },
    [validateField],
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

    Object.keys(VALIDATION_RULES).forEach((key) => {
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

    const extraInfo = [
      form.company && `Company: ${form.company}`,
      form.department && `Department: ${form.department}`,
      form.phone && `Phone: ${selectedCountry.code}${form.phone}`,
      `Country: ${selectedCountry.name}`,
    ]
      .filter(Boolean)
      .join(" | ");

    const fullMessage = form.message
      ? `${extraInfo} | Message: ${form.message}`
      : extraInfo || "No additional message";

    try {
      const response = await axios.post(
        "https://api.marketing.cloudedata.com/api/public/submit",
        {
          name: form.name,
          email: form.email,
          phone: `${selectedCountry.code}${form.phone}`,
          product: "Contact Inquiry",
          message: fullMessage,
          country: selectedCountry.name,
        },
      );

      if (response.data.success) {
        setSuccess(
          "Thank you! Your inquiry has been submitted. Our team will respond within 1 business day.",
        );
        setForm({
          name: "",
          email: "",
          phone: "",
          company: "",
          department: "",
          message: "",
        });
        setErrors({});
        setTouched({});
      } else {
        setError("Submission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError(
        "Network error. Please check your connection or try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Input styling
  const inputClass =
    "w-full pl-10 pr-10 py-3 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 " +
    "bg-white border transition-all duration-200 " +
    "focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 " +
    "hover:border-gray-300";

  const iconClass = "absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400";

  const getBorderClass = (fieldName) => {
    if (errors[fieldName] && touched[fieldName]) return "border-red-400";
    if (touched[fieldName] && !errors[fieldName] && form[fieldName])
      return "border-emerald-400";
    return "border-gray-200";
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-lg shadow-gray-100/50 p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Service Request Portal
          </h2>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Fill in your details and our team will respond Shortly.
      </p>

      {/* Success/Error Messages */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 flex items-start gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800"
          >
            <CheckCircle size={18} className="shrink-0 mt-0.5" />
            <span>{success}</span>
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800"
          >
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
        noValidate
      >
        {/* Full Name */}
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
              placeholder="Enter Full Name"
              className={clsx(inputClass, getBorderClass("name"))}
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

        {/* Work Email */}
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
              placeholder="name@company.com"
              className={clsx(inputClass, getBorderClass("email"))}
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

        {/* Phone Number with Country Code */}
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
                  "bg-white border",
                  countryOpen
                    ? "border-blue-600 ring-2 ring-blue-100"
                    : "border-gray-200 hover:border-gray-300",
                )}
                style={{ minWidth: "90px" }}
              >
                <FlagIcon countryCode={selectedCountry.countryCode} />
                <span className="text-gray-700 text-xs hidden sm:inline">
                  {selectedCountry.code}
                </span>
                <ChevronDown
                  size={12}
                  className={clsx(
                    "text-gray-400 transition-transform duration-200",
                    countryOpen && "rotate-180",
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
                    className="absolute z-50 left-0 mt-1.5 w-60 rounded-xl overflow-hidden border border-gray-200 shadow-2xl bg-white"
                  >
                    <div className="p-2 border-b border-gray-100">
                      <div className="relative">
                        <Search
                          size={12}
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="text"
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          placeholder="Search country..."
                          className="w-full pl-7 pr-2.5 py-1.5 rounded-lg text-xs text-gray-700 bg-gray-50 border border-gray-100 focus:outline-none focus:border-blue-300"
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
                              : "text-gray-600 hover:bg-gray-50",
                          )}
                        >
                          <FlagIcon countryCode={country.countryCode} />
                          <span className="flex-1 truncate">
                            {country.name}
                          </span>
                          <span className="text-gray-400 text-xs font-mono">
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
                        <div className="px-3 py-4 text-center text-gray-400 text-xs">
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
                  "w-full py-3 pr-10 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 bg-white border transition-all duration-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100",
                  getBorderClass("phone"),
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

        {/* Company/Org */}
        <div>
          <label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-2 mb-1.5">
            <Briefcase size={13} /> Company/Org
          </label>
          <div className="relative">
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Organization Name"
              className={clsx(inputClass, getBorderClass("company"))}
              autoComplete="organization"
            />
          </div>
          <AnimatePresence>
            {errors.company && touched.company && (
              <motion.p
                initial={{ opacity: 0, y: -4, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -4, height: 0 }}
                className="text-[11px] text-red-500 mt-1 ml-1 font-medium"
              >
                {errors.company}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Department Route */}
        <div className="md:col-span-2">
          <label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-2 mb-1.5">
            <FileText size={13} /> Department Route *
          </label>
          <div className="relative">
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              onBlur={handleBlur}
              className={clsx(
                "w-full px-3 py-3 rounded-lg text-sm bg-white border transition-all duration-200 appearance-none",
                "focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100",
                getBorderClass("department"),
                form.department ? "text-gray-800" : "text-gray-400",
              )}
            >
              <option value="" disabled>
                Select department
              </option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            {touched.department && !errors.department && form.department && (
              <Check
                size={15}
                className="absolute right-10 top-1/2 -translate-y-1/2 text-emerald-500"
              />
            )}
          </div>
          <AnimatePresence>
            {errors.department && touched.department && (
              <motion.p
                initial={{ opacity: 0, y: -4, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -4, height: 0 }}
                className="text-[11px] text-red-500 mt-1 ml-1 font-medium"
              >
                {errors.department}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Project Requirements */}
        <div className="md:col-span-2">
          <label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-2 mb-1.5">
            <MessageSquare size={13} /> Project Requirements
          </label>
          <div className="relative">
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="5"
              placeholder="Describe your technical requirements or support issue..."
              className={clsx(
                "w-full px-3 py-3 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 resize-none bg-white border transition-all duration-200",
                "focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100",
                getBorderClass("message"),
              )}
            />
            {form.message && (
              <span className="absolute bottom-2 right-3 text-[10px] text-gray-400 font-mono">
                {form.message.length}/1000
              </span>
            )}
          </div>
          <AnimatePresence>
            {errors.message && touched.message && (
              <motion.p
                initial={{ opacity: 0, y: -4, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -4, height: 0 }}
                className="text-[11px] text-red-500 mt-1 ml-1 font-medium"
              >
                {errors.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Submit */}
        <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-[10px] text-gray-400 flex items-center gap-1.5">
            <ShieldCheck size={12} /> Secure 256-bit Encrypted Transmission
          </p>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-gray-900/10"
          >
            {loading ? (
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
              >
                Sending...
              </motion.span>
            ) : (
              <>
                Submit Inquiry <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── Main Contact Page ────────────────────────────────────────────────────────

export default function ContactUs() {
  return (
    <>
      <Helmet>
        <title>Contact Cloudedata | Get Expert Cloud Hosting Support</title>
        <meta
          name="description"
          content="Contact Cloudedata for cloud hosting, VPS, Tally on Cloud, ERP hosting, and business IT solutions. Get expert assistance and quick support today."
        />
        <link rel="canonical" href="https://cloudedata.com/contact" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col font-sans">
        <Navbar />

        {/* Professional Banner Section */}
        <section className="bg-gray-900 py-16 sm:py-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight"
            >
              How can we assist your business today?
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-400 font-light max-w-2xl mx-auto"
            >
              Whether you're looking to scale your infrastructure or need
              technical support, our team is ready to provide enterprise-grade
              solutions.
            </motion.p>
          </div>
        </section>

        {/* Main Contact Page Layout */}
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column: Corporate & Department Data */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-1 space-y-6 sm:space-y-8"
            >
              {/* Headquarters Card */}
              <section className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <Building className="w-4 h-4 text-blue-600" />
                  </div>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900">
                    Corporate HQ
                  </h2>
                </div>
                <p className="text-sm text-gray-800 leading-relaxed font-semibold">
                  Paytel Terminal Pvt. Ltd.
                </p>
                <div className="flex items-start gap-2 mt-2">
                  <MapPin size={14} className="text-gray-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-500 leading-relaxed">
                    A 212, First Floor, Okhla Industrial Estate Phase-3, New
                    Delhi, 110020, India
                  </p>
                </div>
              </section>

              {/* Departmental Routing */}
              <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100 shadow-sm space-y-5">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-gray-100 pb-3">
                  Departmental Lines
                </h2>
                {[
                  { label: "Enterprise Sales", email: "sales@cloudedata.com" },
                  {
                    label: "Technical Support",
                    email: "support@cloudedata.com",
                  },
                  {
                    label: "Billing & Accounting",
                    email: "billing@cloudedata.com",
                  },
                  {
                    label: "Corporate Inquiries",
                    email: "info@cloudedata.com",
                  },
                ].map((dept, i) => (
                  <div key={i} className="flex flex-col">
                    <p className="text-xs font-semibold text-gray-900">
                      {dept.label}
                    </p>
                    <a
                      href={`mailto:${dept.email}`}
                      className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                    >
                      {dept.email}
                    </a>
                  </div>
                ))}
                <div>
                  <p className="text-xs font-semibold text-gray-900">
                    Direct Phone Line
                  </p>
                  <div className="flex items-center gap-1.5">
                    <Phone size={13} className="text-gray-400" />
                    <p className="text-sm text-gray-700 font-medium">
                      +91-9311472355
                    </p>
                  </div>
                </div>
              </div>

              {/* Service Availability */}
              <section className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900">
                    Service Hours
                  </h2>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Mon-Fri: 09:00 - 18:00 IST</p>
                  <p className="font-semibold text-gray-800">
                    Technical Support: 24/7/365
                  </p>
                </div>
              </section>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <ContactForm />
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
