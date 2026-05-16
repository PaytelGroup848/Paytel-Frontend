import { motion } from "framer-motion";
import {
  ShieldCheck,
  Globe,
  TrendingUp,
  Lock,
  Zap,
  Headphones,
  CheckCircle,
  ArrowUpCircle,
} from "lucide-react";

export default function PlansCard() {
  return (
    <section className="relative overflow-hidden py-6 md:py-10 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-0 w-80 h-80 bg-indigo-300/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-cyan-200/20 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* ================= CARD 1 ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group h-full"
          >
            <motion.div
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-xl shadow-[0_15px_50px_rgba(15,23,42,0.08)] hover:shadow-[0_25px_80px_rgba(79,70,229,0.18)] transition-all duration-500"
            >
              {/* Top Glow */}
              <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500" />

              <div className="p-7 md:p-9 flex flex-col h-full">
                <div className="mb-6">
                  <span className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1 text-xs font-bold tracking-wide text-indigo-700 uppercase">
                    Flexible Pricing
                  </span>

                  <h3 className="mt-5 text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                    Plans & Prices
                  </h3>

                  <p className="mt-4 text-slate-600 text-[15px] md:text-base leading-7 max-w-xl">
                    Choose scalable cloud solutions designed for startups,
                    businesses, and growing enterprises. Every plan includes
                    premium performance, advanced security, dedicated support,
                    and powerful hosting tools.
                  </p>
                </div>

                {/* Features – with icons */}
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {[
                    { text: "High-Speed Infrastructure", icon: Zap },
                    { text: "24/7 Expert Support", icon: Headphones },
                    { text: "Free SSL & Protection", icon: ShieldCheck },
                    { text: "Easy Upgrade Options", icon: ArrowUpCircle },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-100 bg-white px-4 py-3 flex items-center gap-3 shadow-sm"
                    >
                      <item.icon size={18} className="text-indigo-500 shrink-0" />
                      <p className="text-sm font-semibold text-slate-700">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="mt-auto flex items-end justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">
                      Starting From
                    </p>

                    <div className="flex items-end gap-2">
                      <span className="text-5xl font-black tracking-tight text-slate-900">
                        ₹299
                      </span>

                      <span className="text-slate-500 text-sm pb-2">
                        /month
                      </span>
                    </div>
                  </div>

                  <button className="rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-semibold px-6 py-3 transition-all duration-300 shadow-xl shadow-indigo-200/50 hover:shadow-indigo-300/50">
                    View Plans
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ================= CARD 2 ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group h-full"
          >
            <motion.div
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-xl shadow-[0_15px_50px_rgba(15,23,42,0.08)] hover:shadow-[0_25px_80px_rgba(6,182,212,0.18)] transition-all duration-500"
            >
              {/* Top Glow */}
              <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500" />

              <div className="p-7 md:p-9 flex flex-col h-full">
                <div className="mb-6">
                  <span className="inline-flex items-center rounded-full bg-cyan-50 border border-cyan-100 px-4 py-1 text-xs font-bold tracking-wide text-cyan-700 uppercase">
                    Trusted Cloud Platform
                  </span>

                  <h3 className="mt-5 text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                    Why Cloudedata
                  </h3>

                  <p className="mt-4 text-slate-600 text-[15px] md:text-base leading-7">
                    Cloudedata delivers secure, high-performance cloud services
                    backed by reliable infrastructure and enterprise-grade
                    technology. Built to handle modern business workloads with
                    speed, stability, and flexibility.
                  </p>
                </div>

                {/* Benefit list – equal weight as card 1’s features */}
                <div className="space-y-3 flex-1">
                  {[
                    {
                      title: "99.99% Uptime",
                      desc: "Maximum availability & uninterrupted operations.",
                      icon: CheckCircle,
                    },
                    {
                      title: "Enterprise Security",
                      desc: "Advanced protection layers & secure backups.",
                      icon: ShieldCheck,
                    },
                    {
                      title: "Global Performance",
                      desc: "Fast network routing & optimized servers.",
                      icon: Globe,
                    },
                    {
                      title: "Affordable Scaling",
                      desc: "Flexible plans that grow with your needs.",
                      icon: TrendingUp,
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-100 bg-white p-3 flex items-start gap-3 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
                        <item.icon size={18} className="text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 leading-tight">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-sm text-slate-500">
                    Built for modern businesses
                  </p>

                  <button className="rounded-xl border border-slate-200 hover:border-indigo-500 hover:text-indigo-600 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-300 bg-white shadow-sm">
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}