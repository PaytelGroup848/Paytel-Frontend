import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

// Plans data – replace with API call when backend is ready
const plans = [
  {
    id: "tally",
    name: "Tally on Cloud",
    price: "₹290",
    period: "/month",
    desc: "Host Tally ERP securely on cloud with multi‑user access, auto backups, and unlimited companies.",
    features: ["Manage Server", "Auto Backup", "Highly Secure", "Unlimited Companies"],
    gradient: "from-blue-500 to-cyan-500",
    popular: false,
  },
  {
    id: "win-vps",
    name: "Windows VPS",
    price: "₹2,000",
    period: "/mo",
    desc: "Powerful virtual server with dedicated resources, full admin control, and 100% uptime guarantee.",
    features: ["2 vCPU", "6 GB RAM", "60 GB Storage", "100% Uptime"],
    gradient: "from-indigo-500 to-purple-600",
    popular: true,
  },
  {
    id: "linux-vps",
    name: "Linux VPS",
    price: "₹549",
    period: "/mo",
    desc: "Lightweight, high‑performance Linux server with root access, NVMe storage, and DDoS protection.",
    features: ["2 vCPU", "4 GB RAM", "60 GB Storage", "100% Uptime"],
    gradient: "from-emerald-500 to-teal-600",
    popular: false,
  },
];

const PlanCard = ({ plan, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
    viewport={{ once: true }}
    className={`relative flex flex-col bg-white rounded-3xl border shadow-sm transition-all duration-300 hover:shadow-xl ${
      plan.popular
        ? "border-indigo-300 shadow-indigo-100/50 scale-[1.03] z-10"
        : "border-slate-200"
    }`}
  >
    {/* Popular badge */}
    {plan.popular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
        <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-black px-6 py-1.5 rounded-full shadow-xl shadow-indigo-300/50">
          MOST POPULAR
        </span>
      </div>
    )}

    {/* Gradient top accent */}
    <div className={`h-1.5 w-full bg-gradient-to-r ${plan.gradient} rounded-t-3xl`} />

    <div className="p-7 flex flex-col flex-1">
      <h3 className="text-xl font-extrabold text-slate-800 mb-2">{plan.name}</h3>
      <p className="text-sm text-slate-500 mb-5 leading-relaxed flex-1">{plan.desc}</p>

      <div className="flex items-baseline gap-1 mb-5">
        <span className="text-4xl font-black text-slate-900">{plan.price}</span>
        <span className="text-slate-400 font-medium text-sm">{plan.period}</span>
      </div>

      <ul className="space-y-2 flex-1 mb-6">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="text-sm font-medium text-slate-700 pl-1">
            • {feature}
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${
          plan.popular
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-300/30 hover:shadow-indigo-400/40"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
        }`}
      >
        Choose {plan.name.split(" ")[0]}
      </button>
    </div>
  </motion.div>
);

export default function PlansPricing() {
  return (
    <section className="mt-0 mb-0 w-full bg-gradient-to-br from-white via-indigo-50/10 to-white py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Plans &amp; Pricing
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium">
            Choose the perfect cloud plan for your business. All plans include
            premium support, 99.99% uptime SLA, and free migration assistance.
          </p>
        </motion.div>

        {/* Cards – fully responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {plans.map((plan, idx) => (
            <PlanCard key={plan.id} plan={plan} index={idx} />
          ))}
        </div>

        {/* Bottom actions & note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <a
            href="/plans"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold text-sm rounded-2xl shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all group"
          >
            View All Plans
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="mt-4 text-xs text-slate-400 leading-relaxed max-w-2xl mx-auto">
            The displayed price is the monthly rate excluding applicable taxes. The total
            amount payable at checkout is calculated by multiplying the monthly rate by the
            selected billing period and adding applicable taxes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}