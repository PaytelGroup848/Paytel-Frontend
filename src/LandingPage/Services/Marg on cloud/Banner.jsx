import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { ArrowRight, CheckCircle2, Cloud, Database, FileText, Headphones, LockKeyhole, MonitorSmartphone, ServerCog, ShieldCheck } from 'lucide-react';

// Updated service options as requested
const SERVICE_OPTIONS = [
  "Busy on Cloud",
  "Marg on Cloud",
  "Tally on Cloud",
  "School CRM",
  "Restaurant Management",
];

const benefits = [
  "Secure cloud access",
  "Multi-user ERP performance",
  "Daily backup support",
  "Quick setup assistance",
];

const businessTypes = [
  "Retail",
  "Distribution",
  "Pharmacy",
  "FMCG",
  "Manufacturing",
  "Other",
];

const featureCards = [
  {
    icon: FileText,
    title: "Billing & GST",
    text: "Run invoicing, reports and tax workflows from a secure cloud setup.",
  },
  {
    icon: Database,
    title: "Inventory Control",
    text: "Access stock, sales and purchase data across office and branch teams.",
  },
  {
    icon: ShieldCheck,
    title: "Protected Data",
    text: "Reduce local-system dependency with managed access and backup support.",
  },
];

export default function Banner() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    service: "Busy on Cloud",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (success) setSuccess("");
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    if (!form.name || !form.email || !form.mobile || !form.service) {
      setError("Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://191.44.87.202/api/public/submit", {
        name: form.name,
        email: form.email,
        phone: form.mobile,
        product: form.service,
        message: form.message || "No message provided",
      });

      if (response.data.success) {
        setSuccess("Thank you! Your demo request has been submitted. Our team will contact you soon.");
        setForm({
          name: "",
          email: "",
          mobile: "",
          service: "Busy on Cloud",
          message: "",
        });
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

  return (
    <section className="relative flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950 px-4 py-12 md:py-24 overflow-hidden">
      {/* Shiny overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-20 w-[36rem] h-[36rem] bg-indigo-800/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-[28rem] h-[28rem] bg-cyan-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[24rem] h-[24rem] bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[48rem] h-[16rem] bg-gradient-to-r from-indigo-300/10 via-cyan-200/5 to-transparent rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, #818cf8 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <div className="inline-block px-5 py-1.5 bg-white/5 backdrop-blur-md border border-indigo-400/20 text-indigo-300 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase mb-6 shadow-sm">
            Busy on Cloud
          </div>

          <p className="text-lg sm:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0 mb-4 leading-relaxed">
            Take control of your accounting with secure, high‑performance cloud hosting.
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] mb-4">
            Power Your Business —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Marg on Cloud.
            </span>
          </h1>

          <p className="text-sm text-slate-400 font-medium mb-6">
            Access your Busy software anytime, anywhere, on any device — no local installation needed.
          </p>

          <div className="mb-8">
            <p className="text-sm text-slate-500 font-medium">Starting from</p>
            <div className="flex items-baseline gap-1 justify-center lg:justify-start">
              <span className="text-4xl font-black text-white">₹299.00</span>
              <span className="text-slate-400 font-medium">/user/month</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center justify-center px-10 py-4 font-bold text-sm text-slate-800 bg-white rounded-2xl shadow-[0_10px_30px_-5px_rgba(99,102,241,0.4)] transition-all hover:shadow-[0_15px_40px_-5px_rgba(99,102,241,0.6)]"
          >
            <span className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-70 -z-10" />
            <span className="relative z-10 flex items-center gap-2">
              Start Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </motion.button>
        </motion.div>

        {/* Right Card – Demo Form with updated service options */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-sm lg:ml-40"
        >
          <div className="relative bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10 pointer-events-none" />

            <div className="relative p-5 sm:p-6">
              <h3 className="text-lg sm:text-xl font-extrabold text-white mb-4 tracking-tight">
                Book a Free Demo
              </h3>

              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-4 rounded-xl bg-green-500/20 border border-green-400/50 p-3 text-sm text-green-300"
                  >
                    {success}
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-4 rounded-xl bg-red-500/20 border border-red-400/50 p-3 text-sm text-red-300"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {!success && (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Name */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-2 rounded-xl border border-slate-600/50 bg-slate-800/70 text-white placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition outline-none text-sm font-medium"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="w-full px-4 py-2 rounded-xl border border-slate-600/50 bg-slate-800/70 text-white placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition outline-none text-sm font-medium"
                    />
                  </div>

                  {/* Mobile (Phone) */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      required
                      value={form.mobile}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2 rounded-xl border border-slate-600/50 bg-slate-800/70 text-white placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition outline-none text-sm font-medium"
                    />
                  </div>

                  {/* Service Dropdown – Updated Options */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                      Choose Service *
                    </label>
                    <select
                      name="service"
                      required
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-xl border border-slate-600/50 bg-slate-800/70 text-white placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition outline-none text-sm font-medium appearance-none"
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-slate-800 text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message (optional) */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                      Message (optional)
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements..."
                      className="w-full px-4 py-2 rounded-xl border border-slate-600/50 bg-slate-800/70 text-white placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition outline-none text-sm font-medium resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? "Submitting..." : "Submit Demo Request"}
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}