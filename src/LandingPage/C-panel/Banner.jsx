import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  ShieldCheck,
  Server,
  Zap,
  Headphones,
  Lock,
  Cpu,
  Globe,
} from "lucide-react";

const benefits = [
  "Free cPanel & WHM included",
  "1‑click app installer (WordPress, Joomla, etc.)",
  "Free SSL certificates & daily backups",
  "24/7 expert support via chat & ticket",
];

const stats = [
  { value: "99.99%", label: "Uptime Guarantee" },
  { value: "450+", label: "Apps 1‑Click Install" },
  { value: "24/7", label: "Technical Support" },
];

const hostingPlans = [
  "cPanel Starter",
  "cPanel Business",
  "cPanel Pro",
  "Reseller Hosting",
  "WordPress Hosting",
];

export default function CpanelBanner() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "",
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

    if (!form.name || !form.email || !form.phone || !form.plan) {
      setError("Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://api.marketing.cloudedata.com/api/public/submit",
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          product: form.plan,
          message: form.message || "No additional message",
        },
      );

      if (response.data.success) {
        setSuccess("Thank you! Our hosting experts will contact you shortly with a tailored cPanel solution.");
        setForm({ name: "", email: "", phone: "", plan: "", message: "" });
      } else {
        setError("Submission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* Background gradient & subtle grid */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/20" />
      <div
        className="absolute inset-0 -z-10 opacity-20"
       
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-20 lg:px-8">
        {/* Main two‑column layout */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase text-blue-600 shadow-sm backdrop-blur">
              <Cloud size={16} />
              <span>cPanel Hosting</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Managed cPanel Hosting
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Built for Speed & Simplicity
              </span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-slate-600">
              Deploy your website on blazing‑fast NVMe servers with pre‑installed
              cPanel, free SSL, automatic backups, and 1‑click app installs.
              Perfect for freelancers, agencies, and small businesses.
            </p>

            {/* Benefits list */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {benefits.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                  <CheckCircle2 size={18} className="shrink-0 text-blue-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 max-w-md">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-extrabold text-slate-800">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="/pricing"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 text-sm font-extrabold text-white shadow-lg shadow-blue-200 hover:shadow-xl transition-all"
              >
                View Hosting Plans
                <ArrowRight size={17} />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE: Image + Lead capture form */}
          <div className="relative flex flex-col gap-6">
            {/* Hero image / illustration (replace src with your cPanel image) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mx-auto w-full max-w-xs overflow-hidden rounded-2xl shadow-2xl lg:max-w-sm"
            >
           
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white font-bold text-sm bg-black/40 px-3 py-1 rounded-full">
                Easy cPanel Management
              </div>
            </motion.div>

            {/* Lead capture form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-md mx-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/60 sm:p-8"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-extrabold text-slate-900">Get Your Free cPanel Demo</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Fill in the details and a hosting specialist will reach out within 1 business hour.
                </p>
              </div>

              {/* Success / Error messages */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-4 rounded-lg bg-green-100 border border-green-300 p-3 text-sm text-green-800"
                  >
                    {success}
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-4 rounded-lg bg-red-100 border border-red-300 p-3 text-sm text-red-800"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="john@company.com"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 98765 43210"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  />
                </div>

                {/* Hosting Plan Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Hosting Plan *</label>
                  <select
                    name="plan"
                    value={form.plan}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition appearance-none"
                  >
                    <option value="" disabled>Choose your plan</option>
                    {hostingPlans.map((plan) => (
                      <option key={plan} value={plan}>{plan}</option>
                    ))}
                  </select>
                </div>

                {/* Message (optional) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Additional Requirements</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="E.g., number of websites, expected traffic, special needs..."
                    className="w-full resize-none rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-slate-300 transition hover:bg-slate-800 disabled:opacity-70"
                >
                  {loading ? "Submitting..." : "Request My Demo"}
                  {!loading && <ArrowRight size={17} />}
                </button>
              </form>

              {/* Trust badges */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-4 border-t border-slate-200 pt-4 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-blue-600" />
                  <span>256‑bit SSL</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap size={15} className="text-blue-600" />
                  <span>NVMe Storage</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Headphones size={15} className="text-blue-600" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom feature ribbon */}
      <div className="border-t border-slate-200 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-700 sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Server size={17} className="text-blue-600" />
            Instant cPanel Setup
          </div>
          <div className="flex items-center gap-2">
            <Lock size={17} className="text-blue-600" />
            Free SSL & Backups
          </div>
          <div className="flex items-center gap-2">
            <Globe size={17} className="text-blue-600" />
            30‑Day Money‑Back
          </div>
          <div className="flex items-center gap-2">
            <Cpu size={17} className="text-blue-600" />
            Unlimited Bandwidth
          </div>
        </div>
      </div>
    </section>
  );
}