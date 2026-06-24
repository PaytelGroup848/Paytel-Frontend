import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import clsx from "clsx";
import {
  UserCircle,
  AtSign,
  Package,
  ChevronDown,
  ShieldCheck,
  ArrowRight,
  Search,
  Check,
  AlertCircle,
  Phone,
  Sparkles,
  Zap,
} from "lucide-react";
import FlagIcon from "../FlagIcon";
import { COUNTRIES } from "../countries";

const PRODUCTS = [
  "VPS",
  "WordPress Hosting",
  "Business Email",
  "PHP Hosting",
  "Tally on Cloud",
  "Marg on Cloud",
  "Busy on Cloud",
  "Education Management CRM",
  "Restaurant Management System",
];

export default function DemoCard() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    description: "",
  });
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const cardRef = useRef(null);
  const dropRef = useRef(null);
  const countryDropRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false);
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

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (name === "phone") {
        const numericValue = value.replace(/\D/g, "");
        if (numericValue.length <= selectedCountry.length) {
          setFormData((p) => ({ ...p, [name]: numericValue }));
        }
      } else {
        setFormData((p) => ({ ...p, [name]: value }));
      }
      if (success) setSuccess("");
      if (error) setError("");
    },
    [success, error, selectedCountry.length]
  );

  const handleSelect = useCallback((v) => {
    setFormData((p) => ({ ...p, product: v }));
    setOpen(false);
    if (success) setSuccess("");
    if (error) setError("");
  }, [success, error]);

  const handleCountrySelect = useCallback((country) => {
    setSelectedCountry(country);
    setCountryOpen(false);
    setCountrySearch("");
    setFormData((p) => ({ ...p, phone: "" }));
    if (success) setSuccess("");
    if (error) setError("");
  }, [success, error]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { name, email, phone, product, description } = formData;
      if (!name || !email || !phone || !product) {
        setError("Please fill all required fields.");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }
      if (phone.length !== selectedCountry.length) {
        setError(`Phone number must be ${selectedCountry.length} digits.`);
        return;
      }
      setLoading(true);
      setError("");
      try {
        const res = await axios.post(
          "https://api.marketing.cloudedata.com/api/public/submit",
          {
            name,
            email,
            phone: `${selectedCountry.code}${phone}`,
            product,
            description,
            country: selectedCountry.name,
            message: description || "No message provided",
          }
        );
        if (res.data.success) {
          setSuccess("We'll be in touch shortly!");
          setFormData({ name: "", email: "", phone: "", product: "", description: "" });
        } else {
          setError("Submission failed. Please retry.");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [formData, selectedCountry]
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&family=Inter:wght@400;500;600&display=swap');

        @keyframes btnFlow {
          0% { background-position: 200% center; }
          100% { background-position: 0% center; }
        }
        @keyframes sheenRTL {
          0%   { transform: translateX(110%); }
          40%  { transform: translateX(110%); }
          60%  { transform: translateX(-110%); }
          100% { transform: translateX(-110%); }
        }
        @keyframes borderSheen {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 0.8; transform: scale(1.04); }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.25); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(99,102,241,0.45); }

        .field-input {
          width: 100%;
          padding: 11px 12px 11px 36px;
          border-radius: 12px;
          font-size: 13px;
          color: #1e293b;
          background: rgba(255,255,255,0.8);
          border: 1.5px solid rgba(226,232,240,0.9);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .field-input::placeholder { color: #94a3b8; }
        .field-input:focus {
          border-color: rgba(99,102,241,0.5);
          background: #fff;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.08);
        }
      `}</style>

      <div ref={cardRef} className="relative w-full max-w-[400px]">
        {/* Ambient glow */}
        <div
          className="absolute -inset-8 rounded-[32px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 60% 40%, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.08) 50%, transparent 75%)",
            animation: "pulseGlow 5s ease-in-out infinite",
          }}
        />

        {/* Outer border frame — dark chrome */}
        <div
          className="relative rounded-[22px] p-[1.5px]"
          style={{
            background:
              "linear-gradient(155deg, #08090d 0%, #2a2d38 18%, #6b7080 32%, #16171d 48%, #3a3d4a 64%, #0a0a0e 80%, #4b4e5c 92%, #0a0a0e 100%)",
            boxShadow:
              "0 32px 72px -16px rgba(10,10,16,0.48), 0 8px 24px -4px rgba(10,10,16,0.28), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Border sheen */}
          <div
            className="absolute inset-0 rounded-[22px] pointer-events-none opacity-50"
            style={{
              background:
                "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.3) 48%, transparent 66%)",
              backgroundSize: "260% 260%",
              animation: "borderSheen 7s ease-in-out infinite",
            }}
          />

          {/* Card body */}
          <div
            className="relative rounded-[20.5px] overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #ffffff 0%, #fafbfd 40%, #f4f5f9 80%, #edf0f5 100%)",
            }}
          >
            {/* Top accent line — indigo gradient */}
            <div
              className="h-[2.5px] w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, #6366f1 25%, #818cf8 50%, #6366f1 75%, transparent 100%)",
              }}
            />

            {/* Subtle inner top glow */}
            <div
              className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(99,102,241,0.04) 0%, transparent 100%)",
              }}
            />

            <div className="px-6 py-5 relative">
              {/* Header row */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-[10px] text-indigo-600 font-semibold tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    LIVE SUPPORT
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck size={11} className="text-slate-400" strokeWidth={2} />
                  <span className="text-[10px] text-slate-400 font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    256-bit SSL
                  </span>
                </div>
              </div>

              {/* Heading — DM Serif Display */}
              <h3
                className="text-[22px] text-slate-800 leading-tight mb-1"
                style={{
                  fontFamily: "'DM Sans', 'serif'",
                  fontWeight: 400,
                  letterSpacing: "-0.015em",
                }}
              >
                Start for Free Today
              </h3>
              <p
                className="text-[12.5px] text-slate-500 mb-4 leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
              >
                Our team responds within{" "}
                <span className="text-indigo-600 font-medium">24 hours</span>
              </p>

              {/* Messages */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    className="mb-3 px-3 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200/70 overflow-hidden"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <Check size={11} className="text-emerald-600" strokeWidth={2.5} />
                      </div>
                      <span className="text-[12px] font-medium text-emerald-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {success}
                      </span>
                    </div>
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    className="mb-3 px-3 py-2.5 rounded-xl bg-red-50 border border-red-200/70 overflow-hidden"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <AlertCircle size={11} className="text-red-500" strokeWidth={2.5} />
                      </div>
                      <span className="text-[12px] font-medium text-red-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {error}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-2.5" noValidate>

                {/* Name */}
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-200 pointer-events-none">
                    <UserCircle size={14} strokeWidth={1.75} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="field-input"
                    autoComplete="name"
                  />
                </div>

                {/* Email */}
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-200 pointer-events-none">
                    <AtSign size={14} strokeWidth={1.75} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Work Email"
                    required
                    className="field-input"
                    autoComplete="email"
                  />
                </div>

                {/* Phone + Country */}
                <div className="flex gap-2">
                  <div className="relative flex-shrink-0" ref={countryDropRef}>
                    <button
                      type="button"
                      onClick={() => { setCountryOpen(!countryOpen); setCountrySearch(""); }}
                      className={clsx(
                        "h-[42px] px-2.5 rounded-xl flex items-center gap-1.5 transition-all duration-200 flex-shrink-0",
                        "bg-white/80 border-[1.5px]",
                        countryOpen
                          ? "border-indigo-400 shadow-[0_0_0_3px_rgba(99,102,241,0.08)]"
                          : "border-slate-200/90 hover:border-slate-300"
                      )}
                      style={{ minWidth: "82px" }}
                    >
                      <FlagIcon countryCode={selectedCountry.countryCode} />
                      <span className="text-slate-700 text-[11.5px] font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {selectedCountry.code}
                      </span>
                      <ChevronDown
                        size={10}
                        className={clsx("text-slate-400 transition-transform duration-200", countryOpen && "rotate-180")}
                      />
                    </button>

                    <AnimatePresence>
                      {countryOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.96 }}
                          transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute z-50 left-0 mt-2 w-58 rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xl shadow-slate-900/12"
                          style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(24px)", width: "232px" }}
                        >
                          <div className="p-2 border-b border-slate-100">
                            <div className="relative">
                              <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                              <input
                                type="text"
                                value={countrySearch}
                                onChange={(e) => setCountrySearch(e.target.value)}
                                placeholder="Search country..."
                                className="w-full pl-7 pr-3 py-2 rounded-lg text-[11.5px] text-slate-700 bg-slate-50 border border-slate-100/80 focus:outline-none focus:border-indigo-200"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                                autoFocus
                              />
                            </div>
                          </div>
                          <div className="p-1.5 max-h-44 overflow-y-auto custom-scrollbar">
                            {filteredCountries.map((country) => (
                              <button
                                key={`${country.code}-${country.name}`}
                                type="button"
                                onClick={() => handleCountrySelect(country)}
                                className={clsx(
                                  "w-full text-left px-2.5 py-2 rounded-lg text-[11.5px] transition-all duration-150 flex items-center gap-2",
                                  selectedCountry.code === country.code && selectedCountry.name === country.name
                                    ? "text-indigo-700 bg-indigo-50 font-semibold"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                )}
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                              >
                                <FlagIcon countryCode={country.countryCode} />
                                <span className="flex-1">{country.name}</span>
                                <span className="text-slate-400 text-[10px]">{country.code}</span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="relative flex-1 group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-200 pointer-events-none">
                      <Phone size={14} strokeWidth={1.75} />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={`${selectedCountry.length} digit number`}
                      className="field-input"
                      autoComplete="tel"
                      maxLength={selectedCountry.length}
                      required
                    />
                  </div>
                </div>

                {/* Product */}
                <div className="relative" ref={dropRef}>
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none">
                    <Package size={14} strokeWidth={1.75} />
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className={clsx(
                      "w-full pl-9 pr-9 py-[11px] rounded-xl text-[13px] text-left transition-all duration-200",
                      "bg-white/80 border-[1.5px]",
                      open
                        ? "border-indigo-400 shadow-[0_0_0_3px_rgba(99,102,241,0.08)] bg-white"
                        : "border-slate-200/90 hover:border-slate-300",
                      formData.product ? "text-slate-700" : "text-slate-400"
                    )}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {formData.product || "Select a Service"}
                    <ChevronDown
                      size={13}
                      className={clsx(
                        "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-transform duration-200",
                        open && "rotate-180"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {open && (
                      <motion.ul
                        initial={{ opacity: 0, y: -6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute z-50 w-full mt-2 rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xl shadow-slate-900/12"
                        style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(24px)" }}
                      >
                        <div className="p-1.5 max-h-44 overflow-y-auto custom-scrollbar">
                          {PRODUCTS.map((p) => (
                            <li key={p} className="list-none">
                              <button
                                type="button"
                                onClick={() => handleSelect(p)}
                                className={clsx(
                                  "w-full text-left px-3 py-2.5 rounded-xl text-[12.5px] transition-all duration-150 flex items-center justify-between gap-2",
                                  formData.product === p
                                    ? "text-indigo-700 bg-indigo-50 font-semibold"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                )}
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                              >
                                {p}
                                {formData.product === p && (
                                  <Check size={12} className="text-indigo-500 flex-shrink-0" strokeWidth={2.5} />
                                )}
                              </button>
                            </li>
                          ))}
                        </div>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>

                {/* Description */}
                <div className="relative group">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements (optional)"
                    rows={2}
                    className="w-full px-3 py-[11px] rounded-xl text-[13px] text-slate-700 placeholder:text-slate-400 resize-none bg-white/80 border-[1.5px] border-slate-200/90 focus:outline-none focus:border-indigo-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(99,102,241,0.08)] transition-all duration-200"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full py-3.5 mt-1 rounded-xl text-[13.5px] font-semibold text-white overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background:
                      "linear-gradient(135deg, #4f46e5 0%, #6366f1 40%, #818cf8 60%, #4f46e5 100%)",
                    backgroundSize: "220% auto",
                    animation: loading ? "none" : "btnFlow 4s linear infinite",
                    boxShadow:
                      "0 8px 24px -4px rgba(99,102,241,0.45), inset 0 1px 0 rgba(255,255,255,0.2)",
                    letterSpacing: "0.01em",
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <motion.span
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        Processing...
                      </motion.span>
                    ) : (
                      <>
                        Request Live Demo
                        <ArrowRight size={14} strokeWidth={2.5} />
                      </>
                    )}
                  </span>
                  {!loading && (
                    <span
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)",
                        animation: "sheenRTL 3s ease infinite",
                      }}
                    />
                  )}
                </motion.button>
              </form>

              {/* Footer trust line */}
              <div className="flex items-center justify-center gap-2 mt-4 pt-3.5 border-t border-slate-100/80">
                <ShieldCheck size={11} className="text-slate-300" strokeWidth={2} />
                <span
                  className="text-[10.5px] text-slate-400"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Encrypted · GDPR compliant · We respect your privacy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}