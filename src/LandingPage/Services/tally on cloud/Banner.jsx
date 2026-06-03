import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  LockKeyhole,
  ServerCog,
  ShieldCheck,
} from "lucide-react";

const services = [
  "Tally on Cloud",
  "Busy on Cloud",
  "Marg on Cloud",
  "Jwelly on Cloud",
  "Focus on Cloud",
];

export default function Banner() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (success) setSuccess("");
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    // basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.service) {
      setError("Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://api.marketing.cloudedata.com/api/public/submit",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          product: formData.service, // mapped to "product" as backend expects
          message: formData.message || "No message provided",
        },
      );

      if (response.data.success) {
        setSuccess(
          "Thank you! Your demo request has been submitted. Our team will contact you soon."
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
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
    <section className="relative isolate w-full overflow-hidden bg-slate-950">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-35"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1800&q=80")',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(34,197,94,0.28),transparent_32%),linear-gradient(120deg,rgba(15,23,42,0.98),rgba(15,23,42,0.84)_45%,rgba(30,64,175,0.8))]" />

      <div className="mx-auto grid min-h-[680px] w-full max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        <div className="min-w-0 text-white">
          <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-emerald-100 shadow-sm backdrop-blur">
            <Cloud size={15} className="shrink-0" />
            <span className="truncate">Secure Tally access from anywhere</span>
          </div>

          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
            Tally on Cloud for fast, secure and always-ready business accounting
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
            Run TallyPrime on high-performance cloud servers with multi-user access,
            automatic backups and expert support, so your team can work smoothly from
            office, home or branch locations.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="rounded-xl border border-emerald-300/30 bg-emerald-400/15 px-4 py-3 backdrop-blur">
              <p className="text-xs font-semibold uppercase text-emerald-100">Starting from</p>
              <p className="mt-1 text-3xl font-extrabold text-white">
                Rs.299
                <span className="text-sm font-semibold text-emerald-100"> / month</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm text-slate-100 sm:flex sm:flex-wrap">
              {['99.9% uptime', 'Daily backup', 'Bank-grade security', 'Quick setup'].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="shrink-0 text-emerald-300" />
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <ServerCog size={22} className="text-emerald-300" />
              <p className="mt-3 text-sm font-semibold">Cloud Server</p>
              <p className="mt-1 text-xs leading-5 text-slate-300">Optimized for TallyPrime performance.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <ShieldCheck size={22} className="text-sky-300" />
              <p className="mt-3 text-sm font-semibold">Data Protection</p>
              <p className="mt-1 text-xs leading-5 text-slate-300">Encrypted access with regular backups.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <LockKeyhole size={22} className="text-amber-300" />
              <p className="mt-3 text-sm font-semibold">Any Device</p>
              <p className="mt-1 text-xs leading-5 text-slate-300">Use Tally from desktop or laptop.</p>
            </div>
          </div>
        </div>

        <div className="min-w-0 lg:justify-self-end">
          <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-xl rounded-2xl border border-white/20 bg-white p-4 shadow-2xl shadow-slate-950/30 sm:p-6 lg:p-7"
          >
            <div className="mb-5">
              <p className="text-sm font-semibold uppercase text-indigo-600">Book Free Demo</p>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Get your Tally cloud plan
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Share your details and our cloud expert will help you choose the right setup.
              </p>
            </div>

            {/* Feedback messages */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-4 rounded-xl bg-green-100 border border-green-400 p-3 text-sm text-green-800"
                >
                  {success}
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-4 rounded-xl bg-red-100 border border-red-400 p-3 text-sm text-red-800"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="min-w-0">
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">Full name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </label>

              <label className="min-w-0">
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">Email address</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </label>

              <label className="min-w-0">
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">Phone number</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </label>

              <label className="min-w-0">
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">Choose service</span>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                >
                  <option value="" disabled>Select a service</option>
                  {services.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </label>

              <label className="min-w-0 sm:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">Message</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about users, branches or current Tally setup"
                  className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit Demo Request"}
              {!loading && <ArrowRight size={17} />}
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-slate-500">
              No commitment required. We usually respond within business hours.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}