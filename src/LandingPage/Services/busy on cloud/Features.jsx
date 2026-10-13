import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        <circle cx="12" cy="16" r="1"/>
      </svg>
    ),
    title: "Enterprise‑Grade Security",
    desc: "Your financial data stays protected with military‑grade encryption and continuous monitoring.",
    points: [
      "256‑bit AES encryption",
      "Multi‑factor authentication",
      "Hourly automated backups",
    ],
    tag: "Security",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: "Access Anywhere, Any Device",
    desc: "Run Busy seamlessly on Windows, Mac, tablet, or mobile — no local installation needed.",
    points: [
      "Works on any OS",
      "Instant browser access",
      "Sync data in real time",
    ],
    tag: "Accessibility",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Real‑Time Collaboration",
    desc: "Multiple team members can work on the same books simultaneously without any conflicts.",
    points: [
      "Zero data conflicts",
      "Live updates for all users",
      "Role‑based access control",
    ],
    tag: "Collaboration",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    title: "Automatic Backups",
    desc: "Never lose your data. We back up your entire database every hour, with one‑click restore.",
    points: [
      "Hourly snapshots",
      "One‑click restore",
      "30‑day backup retention",
    ],
    tag: "Backup",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: "High Performance",
    desc: "SSD‑powered cloud servers deliver blazing fast data processing, even with heavy workloads.",
    points: [
      "NVMe SSD storage",
      "Optimised for Tally/Busy",
      "99.99% uptime guarantee",
    ],
    tag: "Speed",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    title: "24/7 Support",
    desc: "Expert assistance via chat, call, or email — whenever you need it.",
    points: [
      "Live chat in under 2 min",
      "Phone support 24×7",
      "Dedicated account manager",
    ],
    tag: "Support",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeaturesSection() {
  return (
    <section className="relative py-24 px-4 sm:px-8 bg-[#f4f6fc] overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-10 w-[28rem] h-[28rem] bg-indigo-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-[24rem] h-[24rem] bg-cyan-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[20rem] h-[20rem] bg-purple-200/15 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: "radial-gradient(circle, #4338ca 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-5 py-1.5 bg-white/80 backdrop-blur-sm border border-indigo-100 text-indigo-700 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase shadow-sm">
            Why Busy on Cloud
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Everything Your Accounting Needs,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">
              On the Cloud
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            No more hardware hassles. Just log in and start managing your books with speed, security, and seamless teamwork.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative rounded-2xl p-[1.5px] bg-gradient-to-br from-indigo-400 via-purple-400 to-cyan-400 transition-shadow duration-300"
              style={{
                boxShadow: "0 15px 40px -10px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 25px 50px -12px rgba(99,102,241,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 15px 40px -10px rgba(0,0,0,0.06)";
              }}
            >
              {/* Inner card – shiny white with a subtle gloss */}
              <div className="relative h-full rounded-2xl bg-white overflow-hidden flex flex-col p-6 sm:p-8">
                {/* Shiny overlay for glossy feel */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white via-transparent to-white/30 opacity-40" />
                {/* Subtle inner glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/0 via-transparent to-cyan-500/0 group-hover:from-indigo-500/10 group-hover:via-transparent group-hover:to-cyan-500/10 transition-all duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-cyan-50 text-indigo-600 flex items-center justify-center mb-6 shadow-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">
                    {feature.desc}
                  </p>

                  {/* Bullet points – new content */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {feature.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        {/* Check icon */}
                        <svg
                          className="w-4 h-4 mt-0.5 text-indigo-500 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="self-start inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase">
                    {feature.tag}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}