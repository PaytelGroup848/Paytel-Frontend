import { useState } from "react";
import { motion } from "framer-motion";

const SERVICE_OPTIONS = [
  "Tally on Cloud",
  "Busy on Cloud",
  "Marg on Cloud",
  "Jwelly on Cloud",
  "Focus on Cloud",
];

export default function Banner() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    service: SERVICE_OPTIONS[0],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Demo request:", form);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="relative flex items-center justify-center bg-[oklch(85%_0.08_251.813)] px-4 py-12 md:py-22  pb-6 md:pb-8 overflow-hidden ">
      {/* Subtle layered blobs for depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-20 w-[36rem] h-[36rem] bg-indigo-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-[28rem] h-[28rem] bg-cyan-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[24rem] h-[24rem] bg-purple-200/15 rounded-full blur-3xl" />
        {/* Fine dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, #4338ca 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content (unchanged) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <div className="inline-block px-5 py-1.5 bg-white/80 backdrop-blur-sm border border-indigo-100 text-indigo-700 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase mb-6 shadow-sm">
            Cloud Infrastructure
          </div>

          <p className="text-lg sm:text-xl text-slate-700 max-w-xl mx-auto lg:mx-0 mb-4 leading-relaxed">
            Fast, secure, scalable cloud solutions for businesses of every size.
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] mb-4">
            Cloudedata —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">
              Your Cloud. Your Way.
            </span>
          </h1>

          <p className="text-sm text-slate-600 font-medium mb-6">
            Performance‑optimized infrastructure with 99.99% uptime guarantee.
          </p>

          <div className="mb-8">
            <p className="text-sm text-slate-400 font-medium">Starting from</p>
            <div className="flex items-baseline gap-1 justify-center lg:justify-start">
              <span className="text-4xl font-black text-slate-900">₹290.00</span>
              <span className="text-slate-500 font-medium">/user/month</span>
            </div>
          </div>

          {/* Start Now – gradient border + shadow */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center justify-center px-10 py-4 font-bold text-sm text-slate-800 bg-white rounded-2xl shadow-[0_10px_25px_-5px_rgba(99,102,241,0.3)] transition-all hover:shadow-[0_15px_35px_-5px_rgba(99,102,241,0.4)]"
          >
            <span className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 -z-10" />
            <span className="relative z-10 flex items-center gap-2">
              Start Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </span>
          </motion.button>
        </motion.div>

        {/* Right Card – Demo form (now more compact) */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-sm lg:ml-33"
        >
          <div className="relative  bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.3)] overflow-hidden">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

            <div className="relative p-5 sm:p-6">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-800 mb-4 tracking-tight">
                Book a Free Demo
              </h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center text-center py-8"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 text-white flex items-center justify-center mb-4 shadow-md shadow-emerald-200">
                    <span className="text-2xl font-bold">✓</span>
                  </div>
                  <p className="text-lg font-bold text-slate-800">Demo Request Sent!</p>
                  <p className="text-sm text-slate-500">Our team will reach out shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Name */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200/60 transition outline-none text-sm font-medium placeholder:text-slate-400"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200/60 transition outline-none text-sm font-medium placeholder:text-slate-400"
                    />
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      required
                      value={form.mobile}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200/60 transition outline-none text-sm font-medium placeholder:text-slate-400"
                    />
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">
                      Choose Service *
                    </label>
                    <select
                      name="service"
                      required
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200/60 transition outline-none text-sm font-medium appearance-none"
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">
                      Message (optional)
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements..."
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200/60 transition outline-none text-sm font-medium placeholder:text-slate-400 resize-none"
                    />
                  </div>

                  {/* Submit – slightly smaller */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-200/40 transition-all duration-500"
                  >
                    Submit Demo Request
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