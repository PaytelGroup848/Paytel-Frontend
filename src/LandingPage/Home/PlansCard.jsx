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
  FileText,
  RefreshCw,
  Check,
  ChevronRight,
} from "lucide-react";

export default function PlansCard() {
  return (
    <section className="relative overflow-hidden py-12 md:py-16 bg-gradient-to-br from-teal-50 via-white to-teal-100">
      {/* Subtle background blobs – kept light */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-0 w-80 h-80 bg-teal-200/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-200/20 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* ================= LEFT CARD – FLEXIBLE PLANS ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            {/* Gradient border wrapper */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative h-full rounded-2xl p-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_50px_rgba(79,70,229,0.15)] transition-shadow duration-500"
            >
              <div className="h-full bg-white rounded-2xl p-6 md:p-8 flex flex-col">
                {/* Badge & Title */}
                <div>
                
                  <span className="inline-flex items-center rounded-full bg-teal-50 border border-teal-100 px-3.5 py-1 text-xs font-bold tracking-wide text-teal-700 uppercase">
                    Plans & Pricing
                  </span>
                  <h3 className="mt-4 text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                    Flexible Plans for Every Business
                  </h3>
                  <p className="mt-3 text-slate-500 text-sm md:text-base leading-6">
                    Transparent pricing with invoice generation, automatic billing,
                    and features that scale with your needs – no hidden fees.
                  </p>
                </div>

                {/* Plan highlights – using smaller card‑style items */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      icon: FileText,
                      title: "Invoice & Billing",
                      desc: "Auto‑generated invoices & tax reports",
                    },
                    {
                      icon: RefreshCw,
                      title: "Flexible Upgrades",
                      desc: "Scale resources anytime, instantly",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Free SSL & Security",
                      desc: "Encryption & basic DDoS protection",
                    },
                    {
                      icon: Headphones,
                      title: "24/7 Support",
                      desc: "Real experts ready to help you",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3 hover:shadow-md transition-shadow"
                    >
                      <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
                        <item.icon size={16} className="text-teal-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price & CTA – at the end */}
                <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Starting at</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-slate-900">₹299</span>
                      <span className="text-sm text-slate-500">/month</span>
                    </div>
                  </div>
                 <a href="/pricing">  
    
                   <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-teal-600 text-white font-semibold px-5 py-3 text-sm transition-colors duration-300 shadow-lg shadow-slate-200">
                    View All Plans
                    <ChevronRight size={16} />
                  </button>
                 
                    </a>
            
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT CARD – WHY CLOUDEDATA ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-full"
          >
            {/* Gradient border wrapper (different gradient) */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative h-full rounded-2xl p-[2px] bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_50px_rgba(6,182,212,0.15)] transition-shadow duration-500"
            >
              <div className="h-full bg-white rounded-2xl p-6 md:p-8 flex flex-col">
                {/* Badge & Title */}
                <div>
                  <span className="inline-flex items-center rounded-full bg-teal-50 border border-teal-100 px-3.5 py-1 text-xs font-bold tracking-wide text-teal-700 uppercase">
                    Trusted Platform
                  </span>
                  <h3 className="mt-4 text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                    Why Cloudedata
                  </h3>
                  <p className="mt-3 text-slate-500 text-sm md:text-base leading-6">
                    Enterprise‑grade performance, security, and reliability –
                    built to power modern businesses without compromise.
                  </p>
                </div>

                {/* Benefit items */}
                <div className="mt-6 space-y-3 flex-1">
                  {[
                    {
                      icon: CheckCircle,
                      title: "99.99% Uptime SLA",
                      desc: "Maximum availability, guaranteed.",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Enterprise Security",
                      desc: "Advanced protection & encrypted backups.",
                    },
                    {
                      icon: Globe,
                      title: "Global Performance",
                      desc: "Fast routing & optimized servers.",
                    },
                    {
                      icon: TrendingUp,
                      title: "Affordable Scaling",
                      desc: "Pay only for what you use.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 hover:shadow-md transition-shadow"
                    >
                      <div className="w-9 h-9 rounded-lg bg-teal-100 flex items-center justify-center shrink-0 mt-0.5">
                        <item.icon size={18} className="text-teal-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer CTA */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-xs text-slate-400">Modern infrastructure, real results</p>
                  <button className="rounded-lg border border-slate-200 hover:border-teal-300 hover:text-teal-600 px-4 py-2 text-sm font-semibold text-slate-700 transition-all bg-white shadow-sm">
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