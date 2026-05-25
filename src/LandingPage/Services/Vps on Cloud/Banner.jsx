import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
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
} from "lucide-react";

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

// Service options (same as other banners)
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
      const response = await axios.post("http://localhost:5000/api/public/submit", {
        name: form.name,
        email: form.email,
        phone: form.mobile,
        product: form.service,
        message: form.message || "No message provided",
      });

      if (response.data.success) {
        setSuccess("Thank you! Our experts will contact you soon with a personalized VPS plan.");
        setForm({
          name: "",
          email: "",
          mobile: "",
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

      <div className="relative mx-auto grid min-h-[680px] w-full max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
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

        {/* Right side – DEMO REQUEST CARD (simplified, with service dropdown) */}
        <div className="min-w-0 lg:justify-self-end">
          <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200/60 sm:p-6 lg:p-7"
          >
            <div className="mb-5">
              <p className="text-sm font-bold uppercase text-indigo-600">Free Consultation</p>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Find your perfect VPS
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Fill in your details and our cloud experts will recommend the best configuration for your workload.
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
                <span className="mb-1.5 block text-xs font-bold text-slate-700">Full name *</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="h-11 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </label>

              <label className="min-w-0">
                <span className="mb-1.5 block text-xs font-bold text-slate-700">Email address *</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  required
                  className="h-11 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </label>

              <label className="min-w-0">
                <span className="mb-1.5 block text-xs font-bold text-slate-700">Phone number *</span>
                <input
                  type="tel"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  required
                  className="h-11 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </label>

              <label className="min-w-0">
                <span className="mb-1.5 block text-xs font-bold text-slate-700">Choose service *</span>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  className="h-11 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                >
                  <option value="" disabled>Select service</option>
                  {serviceOptions.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </label>

              <label className="min-w-0 sm:col-span-2">
                <span className="mb-1.5 block text-xs font-bold text-slate-700">
                  Message (optional)
                </span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your workload, traffic, or any specific requirements..."
                  className="w-full resize-none rounded-lg border border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-extrabold text-white shadow-lg shadow-slate-300/50 transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Request a quote"}
              {!loading && <ArrowRight size={17} />}
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

      {/* Bottom feature ribbon (unchanged) */}
      <div className="relative border-t border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-3 px-4 py-4 text-sm font-semibold text-slate-700 sm:grid-cols-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Server size={17} className="text-indigo-600" />
            Instant provisioning
          </div>
          <div className="flex items-center gap-2">
            <Zap size={17} className="text-indigo-600" />
            KVM virtualization
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={17} className="text-indigo-600" />
            DDoS protection included
          </div>
        </div>
      </div>
    </section>
  );
}