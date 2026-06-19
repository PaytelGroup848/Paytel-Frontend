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
  Star,
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
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const dropRef = useRef(null);
  const countryDropRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (r) setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

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
    <div ref={cardRef} onMouseMove={handleMouseMove} className="relative w-full max-w-[400px]">
      {/* Outer glow rings — softer lavender */}
      <div className="absolute -inset-[1px] rounded-[24px] bg-gradient-to-br from-purple-200/70 via-fuchsia-100/40 to-violet-200/60 blur-[2px]" />
      <div className="absolute -inset-[4px] rounded-[26px] bg-gradient-to-br from-violet-300/35 via-purple-200/25 to-indigo-200/30 blur-2xl" />

      {/* Mouse follow glow */}
      <div
        className="absolute inset-0 rounded-[23px] pointer-events-none overflow-hidden z-0"
        style={{
          background: `radial-gradient(280px circle at ${mouse.x}px ${mouse.y}px, rgba(168,85,247,0.16), transparent 60%)`,
        }}
      />

      {/* Card body - Glass morphism, lavender tint */}
      <div
        className="relative z-10 rounded-[23px] overflow-hidden border border-white/50"
        style={{
          background: "linear-gradient(150deg, rgba(255,255,255,0.9) 0%, rgba(252,248,255,0.82) 28%, rgba(245,238,255,0.84) 60%, rgba(238,231,253,0.82) 100%)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          boxShadow: "0 24px 60px rgba(167,139,250,0.18), 0 6px 18px rgba(139,92,246,0.12), inset 0 0 0 1px rgba(255,255,255,0.6), inset 0 0 50px rgba(196,181,253,0.06)",
        }}
      >
        {/* Top gradient bar */}
        <div
          className="h-[2px] w-full"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #a78bfa 20%, #c4b5fd 50%, #818cf8 80%, transparent 100%)",
            boxShadow: "0 0 16px rgba(167,139,250,0.45)",
          }}
        />

        <div className="px-5 py-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50/80 border border-purple-100/80">
              <Zap size={9} className="text-purple-400" />
              <span className="text-[9.5px] font-medium text-purple-500 uppercase tracking-wider">Live Demo</span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck size={12} className="text-purple-300" />
              <span className="text-[9.5px] text-purple-400 font-normal">Secure</span>
            </div>
          </div>

          <h3
            className="text-[18px] text-slate-700 font-medium leading-tight mb-0.5"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.02em" }}
          >
            Get Started Free
          </h3>
          <p className="text-[11.5px] text-slate-500 font-normal mb-3.5" style={{ fontFamily: "'Inter', sans-serif" }}>
            Our team will reach out within 24 hours
          </p>

          {/* Messages */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -6, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -6, height: 0 }}
                className="mb-3 px-3 py-2 rounded-xl bg-emerald-50/80 backdrop-blur-sm border border-emerald-200/60 overflow-hidden"
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Check size={10} className="text-emerald-600" />
                  </div>
                  <span className="text-[11px] font-medium text-emerald-700">{success}</span>
                </div>
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -6, height: 0 }}
                className="mb-3 px-3 py-2 rounded-xl bg-red-50/80 backdrop-blur-sm border border-red-200/60 overflow-hidden"
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <AlertCircle size={10} className="text-red-500" />
                  </div>
                  <span className="text-[11px] font-medium text-red-600">{error}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2" noValidate>
            {/* Name + Email side by side on larger card */}
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300 group-focus-within:text-purple-500 transition-colors">
                <UserCircle size={14} />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-xl text-[13px] text-slate-700 placeholder:text-slate-400 bg-white/65 backdrop-blur-sm border border-purple-200/50 focus:outline-none focus:border-purple-300 focus:ring-[3px] focus:ring-purple-100/50 focus:bg-white/90 transition-all duration-300"
                style={{ fontFamily: "'Inter', sans-serif" }}
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300 group-focus-within:text-purple-500 transition-colors">
                <AtSign size={14} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Work Email"
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-xl text-[13px] text-slate-700 placeholder:text-slate-400 bg-white/65 backdrop-blur-sm border border-purple-200/50 focus:outline-none focus:border-purple-300 focus:ring-[3px] focus:ring-purple-100/50 focus:bg-white/90 transition-all duration-300"
                style={{ fontFamily: "'Inter', sans-serif" }}
                autoComplete="email"
              />
            </div>

            {/* Phone + Country */}
            <div className="flex gap-1.5">
              <div className="relative" ref={countryDropRef}>
                <button
                  type="button"
                  onClick={() => { setCountryOpen(!countryOpen); setCountrySearch(""); }}
                  className={clsx(
                    "h-[42px] px-2.5 rounded-xl flex items-center gap-1 transition-all duration-300 flex-shrink-0",
                    "bg-white/65 backdrop-blur-sm border",
                    countryOpen ? "border-purple-300 ring-[3px] ring-purple-100/50" : "border-purple-200/50 hover:border-purple-300",
                  )}
                  style={{ minWidth: "78px" }}
                >
                  <FlagIcon countryCode={selectedCountry.countryCode} />
                  <span className="text-slate-700 text-[11px] font-medium">{selectedCountry.code}</span>
                  <ChevronDown size={10} className={clsx("text-purple-300 transition-transform duration-300", countryOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {countryOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-50 left-0 mt-2 w-56 rounded-2xl overflow-hidden border border-purple-200/50 shadow-2xl shadow-purple-200/20"
                      style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(30px)" }}
                    >
                      <div className="p-2 border-b border-purple-100/60">
                        <div className="relative">
                          <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-purple-300" />
                          <input
                            type="text"
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            placeholder="Search..."
                            className="w-full pl-7 pr-3 py-2 rounded-lg text-[11px] text-slate-700 bg-purple-50/60 border border-purple-100 focus:outline-none focus:border-purple-300"
                            autoFocus
                          />
                        </div>
                      </div>
                      <div className="p-1.5 max-h-40 overflow-y-auto custom-scrollbar">
                        {filteredCountries.map((country) => (
                          <button
                            key={`${country.code}-${country.name}`}
                            type="button"
                            onClick={() => handleCountrySelect(country)}
                            className={clsx(
                              "w-full text-left px-2.5 py-2 rounded-lg text-[11px] transition-all duration-150 flex items-center gap-2",
                              selectedCountry.code === country.code && selectedCountry.name === country.name
                                ? "text-purple-600 bg-purple-50 font-medium"
                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                            )}
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
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300 group-focus-within:text-purple-500 transition-colors">
                  <Phone size={14} />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={`Phone (${selectedCountry.length} digits)`}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-[13px] text-slate-700 placeholder:text-slate-400 bg-white/65 backdrop-blur-sm border border-purple-200/50 focus:outline-none focus:border-purple-300 focus:ring-[3px] focus:ring-purple-100/50 focus:bg-white/90 transition-all duration-300"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  autoComplete="tel"
                  maxLength={selectedCountry.length}
                  required
                />
              </div>
            </div>

            {/* Product */}
            <div className="relative" ref={dropRef}>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300 z-10">
                <Package size={14} />
              </div>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={clsx(
                  "w-full pl-9 pr-9 py-2.5 rounded-xl text-[13px] text-left transition-all duration-300",
                  "bg-white/65 backdrop-blur-sm border",
                  open ? "border-purple-300 ring-[3px] ring-purple-100/50" : "border-purple-200/50 hover:border-purple-300",
                  formData.product ? "text-slate-700" : "text-slate-400"
                )}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {formData.product || "Select Service"}
                <ChevronDown size={13} className={`absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {open && (
                  <motion.ul
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-50 w-full mt-2 rounded-2xl overflow-hidden border border-purple-200/50 shadow-2xl shadow-purple-200/20"
                    style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(30px)" }}
                  >
                    <div className="p-1.5 max-h-44 overflow-y-auto custom-scrollbar">
                      {PRODUCTS.map((p) => (
                        <li key={p} className="list-none">
                          <button
                            type="button"
                            onClick={() => handleSelect(p)}
                            className={clsx(
                              "w-full text-left px-3 py-2 rounded-lg text-[11.5px] transition-all duration-150",
                              formData.product === p
                                ? "text-purple-600 bg-purple-50 font-medium"
                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                            )}
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {p}
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
                className="w-full px-3 py-2.5 rounded-xl text-[13px] text-slate-700 placeholder:text-slate-400 resize-none bg-white/65 backdrop-blur-sm border border-purple-200/50 focus:outline-none focus:border-purple-300 focus:ring-[3px] focus:ring-purple-100/50 focus:bg-white/90 transition-all duration-300"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full py-3 mt-1.5 rounded-xl text-[13px] font-medium text-white overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                background: "linear-gradient(135deg, #a78bfa 0%, #c4b5fd 35%, #818cf8 70%, #c084fc 100%)",
                backgroundSize: "200% auto",
                animation: loading ? "none" : "btnFlow 3s linear infinite",
                boxShadow: "0 10px 30px rgba(167,139,250,0.4), 0 2px 6px rgba(129,140,248,0.22), inset 0 1px 0 rgba(255,255,255,0.25)",
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-1.5">
                {loading ? (
                  <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                    Processing...
                  </motion.span>
                ) : (
                  <>
                    <Star size={13} className="text-yellow-200 drop-shadow-lg" />
                    Request Live Demo
                    <ArrowRight size={13} />
                  </>
                )}
              </span>
              {!loading && (
                <span
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)",
                    animation: "sheenRTL 2.5s ease infinite",
                  }}
                />
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-center gap-1.5 mt-3 pt-2.5 border-t border-purple-100/60">
            <span className="text-[10px] text-purple-400 font-normal" style={{ fontFamily: "'Inter', sans-serif" }}>
              Encrypted & secure · We respect your privacy
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes btnFlow {
          0% { background-position: 200% center; }
          100% { background-position: 0% center; }
        }
        @keyframes sheenRTL {
          0% { transform: translateX(100%); }
          40% { transform: translateX(100%); }
          60% { transform: translateX(-100%); }
          100% { transform: translateX(-100%); }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(167,139,250,0.25); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(167,139,250,0.45); }
      `}</style>
    </div>
  );
}