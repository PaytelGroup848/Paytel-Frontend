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
} from "lucide-react";

// ── Fonts (injected once) ────────────────────────────────────────────
if (typeof document !== "undefined" && !document.getElementById("quote-form-fonts")) {
  const link = document.createElement("link");
  link.id = "quote-form-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=JetBrains+Mono:wght@400;600&display=swap";
  document.head.appendChild(link);
}

const FONT = "'DM Sans', 'Inter', system-ui, sans-serif";
const MONO = "'JetBrains Mono', 'Fira Code', monospace";

// ── Data ─────────────────────────────────────────────────────────────
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

const SERVICE_OPTIONS = [
  "Vps on Cloud",
  "wordpress",
  "Busy on Cloud",
  "Marg on Cloud",
  "Tally on Cloud",
  "School CRM",
  "Restaurant Management",
];

const IMAGE_HOLD_MS = 4500;
const CARD_HOLD_MS = 12000;

// ── Helpers ──────────────────────────────────────────────────────────
function FlagEmoji({ code = "IN" }) {
  const emoji = code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");
  return <span style={{ fontSize: 15, lineHeight: 1 }}>{emoji}</span>;
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
    case "mobile":
      if (!value) return "Phone number is required";
      if (value.length !== country.length)
        return `Enter a ${country.length}-digit number for ${country.name}`;
      if (!country.pattern.test(value)) return "Invalid number for this country";
      return "";
    case "service":
      if (!value) return "Please select a service";
      return "";
    default:
      return "";
  }
}

// ── Image view – now ultra clean ──────────────────────────────────────
function ImageView({ onShowForm }) {
  return (
    <button
      type="button"
      aria-label="Open quote form"
      onClick={onShowForm}
      className="h-full w-full block focus:outline-none"
    >
      <img
        src="/vpsWEB.jpg"
        alt="Global data center server racks"
        className="h-full w-full object-cover"
        loading="eager"
      />
      {/* No overlay – just the image */}
    </button>
  );
}

// ── Form card (unchanged) ────────────────────────────────────────────
function FormCard({ onShowImage, onInteract }) {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", service: "", message: "" });
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [apiError, setApiError] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const dropRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setCountryOpen(false);
        setCountrySearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch)
  );

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      onInteract();
      let val = value;
      if (name === "mobile") val = value.replace(/\D/g, "").slice(0, country.length);
      setForm((p) => ({ ...p, [name]: val }));
      setSuccess("");
      setApiError("");
      setTouched((p) => ({ ...p, [name]: true }));
      setErrors((p) => ({ ...p, [name]: validateField(name, val, country) }));
    },
    [country, onInteract]
  );

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      setTouched((p) => ({ ...p, [name]: true }));
      setErrors((p) => ({ ...p, [name]: validateField(name, value, country) }));
    },
    [country]
  );

  const handleCountrySelect = useCallback(
    (c) => {
      setCountry(c);
      setCountryOpen(false);
      setCountrySearch("");
      setForm((p) => ({ ...p, mobile: "" }));
      setErrors((p) => ({ ...p, mobile: "" }));
      onInteract();
    },
    [onInteract]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    onInteract();
    const fields = ["name", "email", "mobile", "service"];
    const newErrors = {};
    const newTouched = {};
    fields.forEach((k) => {
      newTouched[k] = true;
      const err = validateField(k, form[k], country);
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
        phone: `${country.code}${form.mobile}`,
        product: form.service,
        message: form.message || "No message provided",
        country: country.name,
      });
      if (res.data.success) {
        setSuccess("Thank you! Our experts will reach you shortly.");
        setForm({ name: "", email: "", mobile: "", service: "", message: "" });
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

  const state = (f) => {
    if (errors[f] && touched[f]) return "err";
    if (touched[f] && !errors[f] && form[f]) return "ok";
    return "idle";
  };

  const borderCls = (f) =>
    clsx(
      "border transition-all duration-150",
      state(f) === "err" && "border-red-400 ring-2 ring-red-100",
      state(f) === "ok" && "border-emerald-400 ring-2 ring-emerald-100",
      state(f) === "idle" &&
        "border-slate-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100"
    );

  const baseInput = clsx(
    "h-11 w-full rounded-xl bg-slate-50 px-3 pr-9 text-[13px] font-medium text-slate-900",
    "outline-none placeholder:text-slate-400 focus:bg-white transition-colors duration-150"
  );

  return (
    <form
      className="flex h-full flex-col overflow-y-auto rounded-2xl bg-white/95 backdrop-blur-md p-4 sm:p-6 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5"
      style={{ fontFamily: FONT }}
      onSubmit={handleSubmit}
      onFocus={onInteract}
      onPointerDown={onInteract}
    >
      {/* Header */}
      <div className="mb-1 flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">
            Free Consultation
          </span>
        </div>
        <button
          type="button"
          onClick={onShowImage}
          className="text-[11px] font-semibold text-slate-400 transition hover:text-slate-600"
        >
          View image
        </button>
      </div>

      <h2 className="mt-4 text-[clamp(1.1rem,2.5vw,1.55rem)] font-bold leading-tight text-slate-900">
        Find your perfect VPS
      </h2>
      <p className="mt-1.5 mb-3 text-[12.5px] font-normal leading-relaxed text-slate-500">
        Share your requirements and our team will recommend the best plan.
      </p>

      {/* Alerts */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-3 flex gap-2.5 rounded-xl border border-green-200 bg-green-50 p-2.5 text-[12.5px] text-green-800"
          >
            <Check size={15} className="mt-0.5 shrink-0" />
            {success}
          </motion.div>
        )}
        {apiError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-3 flex gap-2.5 rounded-xl border border-red-200 bg-red-50 p-2.5 text-[12.5px] text-red-800"
          >
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            {apiError}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fields */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Name */}
        <div className="min-w-0">
          <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
            <User size={11} /> Full name *
          </label>
          <div className={clsx("relative rounded-xl", borderCls("name"))}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Aryan Sharma"
              autoComplete="name"
              className={baseInput}
            />
            {state("name") === "ok" && <Check size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500" />}
            {state("name") === "err" && <AlertCircle size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400" />}
          </div>
          <AnimatePresence>
            {errors.name && touched.name && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-0.5 text-[10px] font-medium text-red-500"
              >
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Email */}
        <div className="min-w-0">
          <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
            <Mail size={11} /> Email *
          </label>
          <div className={clsx("relative rounded-xl", borderCls("email"))}>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="aryan@company.com"
              autoComplete="email"
              className={baseInput}
            />
            {state("email") === "ok" && <Check size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500" />}
            {state("email") === "err" && <AlertCircle size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400" />}
          </div>
          <AnimatePresence>
            {errors.email && touched.email && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-0.5 text-[10px] font-medium text-red-500"
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Phone + Country */}
        <div className="min-w-0">
          <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
            <Phone size={11} /> Phone *
          </label>
          <div className="flex gap-1.5">
            <div className="relative flex-shrink-0" ref={dropRef}>
              <button
                type="button"
                onClick={() => { setCountryOpen((o) => !o); setCountrySearch(""); onInteract(); }}
                className={clsx(
                  "flex h-11 items-center gap-1.5 rounded-xl border bg-slate-50 px-2.5 text-[12px] font-semibold text-slate-700 transition",
                  countryOpen
                    ? "border-indigo-400 bg-white ring-2 ring-indigo-100"
                    : "border-slate-200 hover:border-slate-300"
                )}
                style={{ minWidth: 78 }}
              >
                <FlagEmoji code={country.countryCode} />
                <span className="hidden font-mono text-[11px] text-slate-600 sm:inline">{country.code}</span>
                <ChevronDown size={10} className={clsx("text-slate-400 transition-transform", countryOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {countryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.12 }}
                    className="absolute left-0 top-[calc(100%+6px)] z-50 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
                  >
                    <div className="border-b border-slate-100 p-2">
                      <div className="relative">
                        <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          autoFocus
                          type="text"
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          placeholder="Search..."
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-7 pr-2.5 text-[12px] outline-none focus:border-indigo-300"
                          style={{ fontFamily: FONT }}
                        />
                      </div>
                    </div>
                    <div className="max-h-44 overflow-y-auto p-1">
                      {filteredCountries.map((c) => (
                        <button
                          key={`${c.code}-${c.name}`}
                          type="button"
                          onClick={() => handleCountrySelect(c)}
                          className={clsx(
                            "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition",
                            country.name === c.name
                              ? "bg-indigo-50 text-indigo-700"
                              : "text-slate-600 hover:bg-slate-50"
                          )}
                          style={{ fontFamily: FONT }}
                        >
                          <FlagEmoji code={c.countryCode} />
                          <span className="flex-1 truncate">{c.name}</span>
                          <span className="font-mono text-[10px] text-slate-400">{c.code}</span>
                          {country.name === c.name && <Check size={10} className="text-indigo-600" />}
                        </button>
                      ))}
                      {filteredCountries.length === 0 && (
                        <p className="py-3 text-center text-[12px] text-slate-400">No results</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className={clsx("relative flex-1 rounded-xl", borderCls("mobile"))}>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={`${country.length} digits`}
                inputMode="numeric"
                maxLength={country.length}
                className={clsx(baseInput, "pr-14")}
              />
              {state("mobile") === "ok" && <Check size={13} className="absolute right-8 top-1/2 -translate-y-1/2 text-emerald-500" />}
              {state("mobile") === "err" && <AlertCircle size={13} className="absolute right-8 top-1/2 -translate-y-1/2 text-red-400" />}
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-slate-400"
                style={{ fontFamily: MONO }}
              >
                {form.mobile.length}/{country.length}
              </span>
            </div>
          </div>
          <AnimatePresence>
            {errors.mobile && touched.mobile && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-0.5 text-[10px] font-medium text-red-500"
              >
                {errors.mobile}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Service */}
        <div className="min-w-0">
          <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
            <Package size={11} /> Service *
          </label>
          <div className={clsx("relative rounded-xl", borderCls("service"))}>
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              onBlur={handleBlur}
              className={clsx(baseInput, "appearance-none pr-8", !form.service && "text-slate-400")}
              style={{ fontFamily: FONT }}
            >
              <option value="" disabled>Select a service</option>
              {SERVICE_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            {state("service") === "ok" && <Check size={13} className="absolute right-7 top-1/2 -translate-y-1/2 text-emerald-500" />}
          </div>
          <AnimatePresence>
            {errors.service && touched.service && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-0.5 text-[10px] font-medium text-red-500"
              >
                {errors.service}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Message */}
        <div className="min-w-0 sm:col-span-2">
          <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
            <MessageSquare size={11} />
            Message
            <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <div className="relative">
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={2}
              maxLength={500}
              placeholder="Describe your workload or requirements..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-[13px] font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              style={{ fontFamily: FONT }}
            />
            {form.message && (
              <span
                className="absolute bottom-2 right-3 text-[9px] text-slate-400"
                style={{ fontFamily: MONO }}
              >
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
        className="mt-5 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 text-[13.5px] font-bold text-white shadow-lg shadow-indigo-200/60 transition-all duration-200 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-blue-700 hover:shadow-xl hover:shadow-indigo-300/50 active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        style={{ fontFamily: FONT }}
      >
        {loading ? (
          <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 0.9, repeat: Infinity }}>
            Submitting...
          </motion.span>
        ) : (
          <>
            Request a free quote <ArrowRight size={16} />
          </>
        )}
      </button>

      {/* Trust badges */}
      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
        {[
          { Icon: Globe, text: "Global DCs" },
          { Icon: LockKeyhole, text: "Encrypted" },
          { Icon: Headphones, text: "24/7 Support" },
        ].map(({ Icon, text }) => (
          <div key={text} className="flex flex-col items-center gap-1.5 text-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-100 bg-slate-50">
              <Icon size={13} className="text-slate-500" />
            </div>
            <span className="text-[10px] font-semibold text-slate-500" style={{ fontFamily: FONT }}>
              {text}
            </span>
          </div>
        ))}
      </div>
    </form>
  );
}

// ── Main export – container now clean with subtle border ─────────────
export default function BannerCard() {
  const [view, setView] = useState("image");
  const [userActive, setUserActive] = useState(false);

  const showImage = useCallback(() => {
    setView("image");
    setUserActive(false);
  }, []);

  const showForm = useCallback(() => {
    setView("form");
    setUserActive(false);
  }, []);

  const handleInteract = useCallback(() => {
    setUserActive(true);
  }, []);

  useEffect(() => {
    if (view !== "image") return undefined;
    const timer = window.setTimeout(() => {
      setView("form");
      setUserActive(false);
    }, IMAGE_HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [view]);

  useEffect(() => {
    if (view !== "form" || userActive) return undefined;
    const timer = window.setTimeout(() => {
      setView("image");
    }, CARD_HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [view, userActive]);

  return (
    <div
      className="relative w-full max-w-[500px] mx-auto h-[540px] sm:h-[600px] rounded-2xl overflow-hidden border border-white/40 bg-white shadow-sm"
      style={{ fontFamily: FONT }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {view === "image" ? (
          <motion.div
            key="image-view"
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <ImageView onShowForm={showForm} />
          </motion.div>
        ) : (
          <motion.div
            key="form-view"
            className="absolute inset-0"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <FormCard onShowImage={showImage} onInteract={handleInteract} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}