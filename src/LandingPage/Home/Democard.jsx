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
  Sparkle,
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
    <div ref={cardRef} className="relative w-full max-w-[400px] mt-10">
      {/* Ambient halo behind the card — quiet, not candy-colored */}
      <div className="absolute -inset-6 rounded-[28px] bg-gradient-to-br from-indigo-500/10 via-slate-400/5 to-transparent blur-3xl" />

      {/* Shiny black → graphite gradient border frame */}
      <div
        className="relative rounded-[22px] p-[1.5px]"
        style={{
          background:
            "linear-gradient(155deg, #08090d 0%, #2a2d38 18%, #6b7080 32%, #16171d 48%, #3a3d4a 64%, #0a0a0e 80%, #4b4e5c 92%, #0a0a0e 100%)",
          boxShadow:
            "0 30px 70px -15px rgba(10,10,16,0.45), 0 8px 20px -4px rgba(10,10,16,0.3)",
        }}
      >
        {/* faint moving sheen across the border */}
        <div
          className="absolute inset-0 rounded-[22px] pointer-events-none opacity-60"
          style={{
            background:
              "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.35) 48%, transparent 66%)",
            backgroundSize: "260% 260%",
            animation: "borderSheen 6s ease-in-out infinite",
          }}
        />

        {/* Card body */}
        <div
          className="relative rounded-[20.5px] overflow-hidden"
          style={{
            background:
              "linear-gradient(165deg, #ffffff 0%, #fbfbfd 35%, #f5f6f9 70%, #eef0f4 100%)",
          }}
        >
          {/* Top hairline accent */}
          <div
            className="h-[2px] w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #1f2230 20%, #5b5f6e 50%, #1f2230 80%, transparent 100%)",
            }}
          />

          <div className="px-6 py-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/[0.04] border border-slate-900/[0.06]">
                <Sparkle size={9} className="text-slate-500" strokeWidth={2.25} />
                <span className="text-[9.5px] font-semibold text-slate-500 uppercase tracking-[0.12em]">
                  Live Demo
                </span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-slate-400" strokeWidth={2} />
                <span className="text-[9.5px] text-slate-400 font-medium tracking-wide">Secure</span>
              </div>
            </div>

            <h3
              className="text-[20px] text-slate-800 leading-tight mb-1"
              style={{ fontFamily: "'Fraunces', 'Times New Roman', serif", fontWeight: 560, letterSpacing: "-0.01em" }}
            >
              Get Started Free
            </h3>
            <p
              className="text-[12px] text-slate-500 font-normal mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
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
            <form onSubmit={handleSubmit} className="space-y-2.5" noValidate>
              {/* Name */}
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-700 transition-colors">
                  <UserCircle size={14} strokeWidth={1.75} />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-[13px] text-slate-700 placeholder:text-slate-400 bg-white border border-slate-200 focus:outline-none focus:border-slate-400 focus:ring-[3px] focus:ring-slate-900/[0.06] transition-all duration-300"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  autoComplete="name"
                />
              </div>

              {/* Email */}
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-700 transition-colors">
                  <AtSign size={14} strokeWidth={1.75} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Work Email"
                  required
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-[13px] text-slate-700 placeholder:text-slate-400 bg-white border border-slate-200 focus:outline-none focus:border-slate-400 focus:ring-[3px] focus:ring-slate-900/[0.06] transition-all duration-300"
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
                      "bg-white border",
                      countryOpen ? "border-slate-400 ring-[3px] ring-slate-900/[0.06]" : "border-slate-200 hover:border-slate-300",
                    )}
                    style={{ minWidth: "78px" }}
                  >
                    <FlagIcon countryCode={selectedCountry.countryCode} />
                    <span className="text-slate-700 text-[11px] font-medium">{selectedCountry.code}</span>
                    <ChevronDown size={10} className={clsx("text-slate-400 transition-transform duration-300", countryOpen && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {countryOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 left-0 mt-2 w-56 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-900/10"
                        style={{ background: "rgba(255,255,255,0.99)", backdropFilter: "blur(30px)" }}
                      >
                        <div className="p-2 border-b border-slate-100">
                          <div className="relative">
                            <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              type="text"
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              placeholder="Search..."
                              className="w-full pl-7 pr-3 py-2 rounded-lg text-[11px] text-slate-700 bg-slate-50 border border-slate-100 focus:outline-none focus:border-slate-300"
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
                                  ? "text-slate-900 bg-slate-100 font-medium"
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
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-700 transition-colors">
                    <Phone size={14} strokeWidth={1.75} />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={`Phone (${selectedCountry.length} digits)`}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-[13px] text-slate-700 placeholder:text-slate-400 bg-white border border-slate-200 focus:outline-none focus:border-slate-400 focus:ring-[3px] focus:ring-slate-900/[0.06] transition-all duration-300"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    autoComplete="tel"
                    maxLength={selectedCountry.length}
                    required
                  />
                </div>
              </div>

              {/* Product */}
              <div className="relative" ref={dropRef}>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10">
                  <Package size={14} strokeWidth={1.75} />
                </div>
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  className={clsx(
                    "w-full pl-9 pr-9 py-2.5 rounded-xl text-[13px] text-left transition-all duration-300",
                    "bg-white border",
                    open ? "border-slate-400 ring-[3px] ring-slate-900/[0.06]" : "border-slate-200 hover:border-slate-300",
                    formData.product ? "text-slate-700" : "text-slate-400"
                  )}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {formData.product || "Select Service"}
                  <ChevronDown size={13} className={`absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {open && (
                    <motion.ul
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-50 w-full mt-2 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-900/10"
                      style={{ background: "rgba(255,255,255,0.99)", backdropFilter: "blur(30px)" }}
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
                                  ? "text-slate-900 bg-slate-100 font-medium"
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
                  className="w-full px-3 py-2.5 rounded-xl text-[13px] text-slate-700 placeholder:text-slate-400 resize-none bg-white border border-slate-200 focus:outline-none focus:border-slate-400 focus:ring-[3px] focus:ring-slate-900/[0.06] transition-all duration-300"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
              </div>

              {/* Submit — shiny black button to match the frame */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full py-3 mt-1.5 rounded-xl text-[13px] font-medium text-white overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  background:
                    "linear-gradient(135deg, #0c0d12 0%, #2b2e3a 30%, #4b4f5e 50%, #1c1e26 70%, #0c0d12 100%)",
                  backgroundSize: "220% auto",
                  animation: loading ? "none" : "btnFlow 4s linear infinite",
                  boxShadow:
                    "0 12px 28px -6px rgba(10,10,16,0.45), inset 0 1px 0 rgba(255,255,255,0.16)",
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-1.5 tracking-wide">
                  {loading ? (
                    <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                      Processing...
                    </motion.span>
                  ) : (
                    <>
                      Request Live Demo
                      <ArrowRight size={13} />
                    </>
                  )}
                </span>
                {!loading && (
                  <span
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.16) 50%, transparent 65%)",
                      animation: "sheenRTL 2.5s ease infinite",
                    }}
                  />
                )}
              </motion.button>
            </form>

            {/* Footer */}
            <div className="flex items-center justify-center gap-1.5 mt-3.5 pt-3 border-t border-slate-100">
              <span className="text-[10px] text-slate-400 font-normal" style={{ fontFamily: "'Inter', sans-serif" }}>
                Encrypted &amp; secure · We respect your privacy
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Inter:wght@400;500;600;700&display=swap');
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
        @keyframes borderSheen {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(15,17,23,0.18); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(15,17,23,0.32); }
      `}</style>
    </div>
  );
}