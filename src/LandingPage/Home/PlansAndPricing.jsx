import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Check,
  Star,
  Globe,
  HardDrive,
  Shield,
  Zap,
  Server,
  Database,
  Users,
  RefreshCw,
  Headphones,
  Lock,
  Infinity,
  ArrowUpRight,
  CreditCard,
} from "lucide-react";

// Your exact plan data
const plans = [
  {
    id: "wordpress",
    name: "WordPress",
    price: "₹61",
    period: "/mo",
    desc: "Easy one-click WordPress installation for blogs and small business websites.",
    features: [
      { text: "1 Website", icon: Globe },
      { text: "10 GB SSD", icon: HardDrive },
      { text: "Free SSL", icon: Shield },
      { text: "Unmetered BW", icon: Infinity },
      { text: "24/7 Support", icon: Headphones },
      { text: "1-Click WP", icon: RefreshCw },
    ],
    popular: false,
    cta: "Get Started",
  },
  {
    id: "tally",
    name: "Tally Cloud",
    price: "₹299",
    period: "/mo",
    desc: "Secure Tally ERP hosting with multi-user access and auto backups.",
    features: [
      { text: "Manage Server", icon: Server },
      { text: "Auto Backup", icon: Database },
      { text: "High Security", icon: Lock },
      { text: "Unlimited Cos.", icon: Infinity },
      { text: "Multi-User", icon: Users },
      { text: "99.9% Uptime", icon: Shield },
    ],
    popular: false,
    cta: "Choose Tally",
  },
  {
    id: "win-vps",
    name: "Windows VPS",
    price: "₹2,000",
    period: "/mo",
    desc: "Dedicated resources with full admin control and 100% uptime guarantee.",
    features: [
      { text: "2 vCPU", icon: Server },
      { text: "6 GB RAM", icon: Database },
      { text: "60 GB SSD", icon: HardDrive },
      { text: "100% Uptime", icon: Shield },
      { text: "Admin Access", icon: Lock },
      { text: "DDoS Protected", icon: Shield },
    ],
    popular: true,
    cta: "Choose Windows",
  },
  {
    id: "linux-vps",
    name: "Linux VPS",
    price: "₹549",
    period: "/mo",
    desc: "High-performance Linux server with root access and NVMe storage.",
    features: [
      { text: "2 vCPU", icon: Server },
      { text: "4 GB RAM", icon: Database },
      { text: "60 GB SSD", icon: HardDrive },
      { text: "99.9% Uptime", icon: Shield },
      { text: "Root Access", icon: Lock },
      { text: "NVMe SSD", icon: Zap },
    ],
    popular: false,
    cta: "Choose Linux",
  },
];

// Common features list
const commonFeaturesList = [
  "Free SSL Certificate",
  "Access Management",
  "Professional Email",
  "Automatic Updates",
  "E-Commerce Optimization",
  "Redis Cache",
  "99.9% Uptime",
  "Free Migration",
  "1‑Click WP Install",
  "Secured Hosting",
  "Regular Backups",
  "24/7/365 Support",
];

// Helper to split array into chunks of 3
const chunkArray = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

const PlanCard = ({ plan, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, margin: "-10px" }}
      whileHover={{
        y: -6,
        boxShadow: "0 20px 40px -12px rgba(0,0,0,0.08)",
        transition: { duration: 0.25 },
      }}
      className={`relative flex flex-col bg-white rounded-2xl border border-slate-200/80 border-t-[3px] transition-all duration-300 ${
        plan.popular
          ? "border-t-blue-500 shadow-[0_8px_25px_rgba(59,130,246,0.1)] scale-[1.02] z-10"
          : "border-t-blue-400 shadow-sm"
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[11px] font-semibold px-5 py-1.5 rounded-full shadow-lg shadow-blue-500/30 border-2 border-white tracking-wide">
            <Star size={11} fill="white" stroke="white" /> MOST POPULAR
          </span>
        </div>
      )}

      <div className="p-7 sm:p-8 flex flex-col flex-1">
        <div className="mb-5">
          <h3 className="text-xl font-bold text-slate-800 tracking-tight mb-2">
            {plan.name}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
            {plan.desc}
          </p>
        </div>

        <div className="mb-5">
          <div className="flex items-baseline gap-1.5 mb-4">
            <span className="text-5xl font-bold text-slate-800 tracking-tight">
              {plan.price}
            </span>
            <span className="text-sm text-slate-400 font-normal">{plan.period}</span>
          </div>
          <button
            onClick={() => (window.location.href = "/pricing")}
            className={`w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group ${
              plan.popular
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-md shadow-blue-500/20"
                : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200 hover:border-slate-300"
            }`}
          >
            {plan.cta}
            <ArrowUpRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>

        <div className="border-t border-slate-100 mb-4" />

        <ul className="space-y-3 flex-1">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Check size={12} className="text-blue-600" strokeWidth={3} />
              </div>
              <span className="text-sm text-slate-600 font-normal">
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default function PlansPricing() {
  const featureColumns = chunkArray(commonFeaturesList, 3);

  return (
    <section className="relative w-full bg-[#fafbfc] py-15 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.03)_0%,transparent_70%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.02)_0%,transparent_50%)] pointer-events-none" />

      <div className="relative mx-auto" style={{ width: "93%", maxWidth: "none" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <h2 className="text-5xl md:text-6xl lg:text-6xl font-bold text-slate-800 mb-4 tracking-tight leading-tight">
            Choose your perfect plan
          </h2>
          <p className="text-base md:text-lg text-slate-500 font-normal max-w-xl mx-auto">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {plans.map((plan, idx) => (
            <PlanCard key={plan.id} plan={plan} index={idx} />
          ))}
        </div>

        {/* LARGER single card: "Every plan has everything you need and more" */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-base font-semibold text-slate-600 mb-6">
            Every plan has everything you need and more :
          </p>

          {/* Wider and taller card */}
          <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-md p-8 sm:p-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {featureColumns.map((col, colIdx) => (
                <ul key={colIdx} className="space-y-3.5 text-left">
                  {col.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-base text-slate-700">
                      <span className="mt-0.5 w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-slate-800 to-slate-700 text-white text-sm font-semibold rounded-xl hover:from-blue-600 hover:to-blue-500 transition-all duration-300 group shadow-lg shadow-slate-200"
          >
            Compare all plans
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-xs text-slate-400 mt-4 font-normal">
            * Prices exclude applicable taxes. Total calculated at checkout.
          </p>
        </motion.div>
      </div>
    </section>
  );
}