import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Server, Users, ShieldCheck, MapPin } from "lucide-react";

const dataCenters = [
  {
    city: "Delhi",
    region: "North India",
    desc: "Primary hub for low‑latency access across NCR.",
    color: "from-indigo-500 to-blue-600",
  },
  {
    city: "Mumbai",
    region: "West India",
    desc: "Financial capital – ideal for high‑frequency trading & enterprise.",
    color: "from-blue-600 to-cyan-500",
  },
  {
    city: "Hyderabad",
    region: "South India",
    desc: "Fast‑growing tech corridor with redundant fibre connections.",
    color: "from-violet-500 to-purple-600",
  },
];

const stats = [
  {
    label: "Data Centers",
    value: "3+",
    icon: Server,
    color: "from-indigo-500 to-blue-600",
  },
  {
    label: "Customer Locations",
    value: "10+",
    icon: Globe,
    color: "from-cyan-500 to-teal-600",
  },
  {
    label: "Clients Using",
    value: "11k+",
    icon: Users,
    color: "from-purple-500 to-pink-600",
  },
  {
    label: "Uptime SLA",
    value: "99.99%",
    icon: ShieldCheck,
    color: "from-emerald-500 to-green-600",
  },
];

export default function BusinessCard() {
  return (
    <section className="relative w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UyZThmMCIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Our Data Centers
          </h2>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mt-4">
            Three strategically located facilities across India, delivering low‑latency, high‑availability cloud services.
          </p>
        </motion.div>

        {/* ── City Cards (Glassmorphism & Glow) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20">
          {dataCenters.map((dc, idx) => (
            <motion.div
              key={dc.city}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="relative group bg-white/80 backdrop-blur-md rounded-3xl border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center"
            >
              {/* Gradient glow behind card on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon */}
              <div
                className={`relative z-10 w-16 h-16 mx-auto bg-gradient-to-br ${dc.color} rounded-2xl flex items-center justify-center text-white shadow-xl mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <MapPin size={32} />
              </div>

              {/* City name */}
              <h3 className="relative z-10 text-2xl font-extrabold text-slate-800 mb-1">
                {dc.city}
              </h3>
              <p className="relative z-10 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                {dc.region}
              </p>

              {/* Decorative line */}
              <div className="relative z-10 w-10 h-1 mx-auto rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 mb-4" />

              <p className="relative z-10 text-sm text-slate-600 leading-relaxed">
                {dc.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Stats Row (Modern Premium Cards) ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative group bg-white/90 backdrop-blur-sm rounded-3xl border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center text-center overflow-hidden"
            >
              {/* Hover gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              {/* Icon */}
              <div
                className={`relative z-10 w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg mb-4`}
              >
                <stat.icon size={28} />
              </div>

              {/* Value with gradient text */}
              <p className="relative z-10 text-4xl font-black bg-gradient-to-br from-slate-800 to-slate-900 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="relative z-10 text-sm text-slate-500 mt-2 font-semibold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}