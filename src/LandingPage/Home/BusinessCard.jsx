import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Server, Users, ShieldCheck, ChevronDown, MapPin } from "lucide-react";

const dataCenters = [
  { city: "Delhi", region: "North India", desc: "Primary hub for low‑latency access across NCR.", color: "from-indigo-500 to-blue-600" },
  { city: "Mumbai", region: "West India", desc: "Financial capital – ideal for high‑frequency trading & enterprise.", color: "from-blue-600 to-cyan-500" },
  { city: "Hyderabad", region: "South India", desc: "Fast‑growing tech corridor with redundant fibre connections.", color: "from-violet-500 to-purple-600" },
];

const stats = [
  { label: "Data Centers", value: "3+", icon: Server, color: "from-indigo-500 to-blue-600" },
  { label: "Customer Locations", value: "10+", icon: Globe, color: "from-cyan-500 to-teal-600" },
  { label: "Clients Using", value: "11k+", icon: Users, color: "from-purple-500 to-pink-600" },
  { label: "Uptime SLA", value: "99.99%", icon: ShieldCheck, color: "from-emerald-500 to-green-600" },
];

const faqs = [
  {
    question: "What makes CloudeData different from other cloud providers?",
    answer: "We combine enterprise NVMe storage, 3+ redundant data centres, and a 99.99% uptime SLA with affordable pricing and 24/7 Indian support. Over 11k clients already trust us for Tally on Cloud, VPS, and more.",
  },
  {
    question: "Can I scale my resources as my business grows?",
    answer: "Absolutely! All our plans are flexible – you can upgrade VPS, add email accounts, or expand your cloud infrastructure instantly without any downtime.",
  },
  {
    question: "Do you offer a free trial or demo?",
    answer: "Yes, we offer free demos for all our services including Tally on Cloud, Busy on Cloud, and Marg on Cloud. Just book a demo from our website and our team will guide you.",
  },
  {
    question: "How secure is my data on CloudeData?",
    answer: "We follow industry‑best security practices: encrypted storage, DDoS protection, regular backups, and isolated environments. Your data is completely safe with us.",
  },
];

export default function BusinessCard() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="w-full bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 py-14 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ── Our Data Centers ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">Our Data Centers</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Three strategically located facilities across India, delivering low‑latency, high‑availability cloud services.
          </p>
        </motion.div>

        {/* City cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {dataCenters.map((dc, idx) => (
            <motion.div
              key={dc.city}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="relative group bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all p-6 text-center"
            >
              <div className={`w-14 h-14 mx-auto bg-gradient-to-br ${dc.color} rounded-2xl flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                <MapPin size={28} />
              </div>
              <h3 className="text-xl font-extrabold text-slate-800 mb-1">{dc.city}</h3>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{dc.region}</p>
              <p className="text-sm text-slate-600 leading-relaxed">{dc.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 mb-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative group bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col items-center text-center overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg mb-4 relative z-10`}>
                <stat.icon size={26} />
              </div>
              <p className="text-3xl font-black text-slate-800 relative z-10">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-2 font-semibold relative z-10">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* ── FAQ ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm md:text-base">{faq.question}</span>
                  <ChevronDown size={20} className={`text-slate-400 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}