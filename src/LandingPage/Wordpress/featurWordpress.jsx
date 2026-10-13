import { motion } from "framer-motion";
import {
  Zap, Shield, Search, RefreshCw, Globe, Headphones,
  Layout, Lock, BarChart2, Cpu, CloudUpload, Puzzle,
} from "lucide-react";

const FONT = "'Plus Jakarta Sans','Inter',system-ui,sans-serif";

const features = [
  {
    icon: Zap,
    title: "Blazing Fast Speed",
    desc: "LiteSpeed servers with built-in caching deliver sub-second load times globally.",
    from: "#f97316", to: "#fb923c", soft: "#fff7ed", iconColor: "#f97316",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "WAF, malware scanning, DDoS protection and free SSL — all active by default.",
    from: "#10b981", to: "#34d399", soft: "#f0fdf4", iconColor: "#10b981",
  },
  {
    icon: Search,
    title: "SEO Ready",
    desc: "Clean URLs, sitemap generation and schema support baked right in.",
    from: "#6366f1", to: "#818cf8", soft: "#eef2ff", iconColor: "#6366f1",
  },
  {
    icon: RefreshCw,
    title: "Auto Updates",
    desc: "WordPress core, themes and plugins stay updated automatically and safely.",
    from: "#8b5cf6", to: "#a78bfa", soft: "#f5f3ff", iconColor: "#8b5cf6",
  },
  {
    icon: Globe,
    title: "Global CDN",
    desc: "Content delivered from 30+ edge nodes so every visitor gets a fast experience.",
    from: "#06b6d4", to: "#38bdf8", soft: "#ecfeff", iconColor: "#06b6d4",
  },
  {
    icon: Headphones,
    title: "24/7 Expert Support",
    desc: "WordPress specialists available around the clock via chat, email and phone.",
    from: "#f43f5e", to: "#fb7185", soft: "#fff1f2", iconColor: "#f43f5e",
  },
  {
    icon: Layout,
    title: "Drag & Drop Builder",
    desc: "Build stunning pages visually — no code needed, ever.",
    from: "#d946ef", to: "#e879f9", soft: "#fdf4ff", iconColor: "#d946ef",
  },
  {
    icon: CloudUpload,
    title: "Daily Backups",
    desc: "Automated daily snapshots stored securely. Restore in one click.",
    from: "#0ea5e9", to: "#38bdf8", soft: "#f0f9ff", iconColor: "#0ea5e9",
  },
  {
    icon: Cpu,
    title: "Dedicated Resources",
    desc: "No resource sharing — your site gets its own CPU and RAM allocation.",
    from: "#84cc16", to: "#a3e635", soft: "#f7fee7", iconColor: "#84cc16",
  },
  {
    icon: Lock,
    title: "Free SSL Certificate",
    desc: "Auto-renewed Let's Encrypt SSL on every domain you connect.",
    from: "#4f46e5", to: "#7c3aed", soft: "#eef2ff", iconColor: "#4f46e5",
  },
  {
    icon: BarChart2,
    title: "Advanced Analytics",
    desc: "Real-time traffic, performance and uptime reports inside your dashboard.",
    from: "#f59e0b", to: "#fbbf24", soft: "#fffbeb", iconColor: "#f59e0b",
  },
  {
    icon: Puzzle,
    title: "50,000+ Plugins",
    desc: "Full access to the WordPress plugin ecosystem — install anything instantly.",
    from: "#e11d48", to: "#f43f5e", soft: "#fff1f2", iconColor: "#e11d48",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" } },
};

export default function WordPressFeatures() {
  return (
    <section
      className="w-full py-5 sm:py-28 px-4 sm:px-6 lg:px-10"
      style={{ background: "#f8fafc", fontFamily: FONT }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.52 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-indigo-200 text-[11px] font-bold text-indigo-600 uppercase tracking-[0.13em] shadow-sm mb-5">
            ✦ WordPress Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold tracking-tight text-slate-900 leading-tight">
            Everything your WordPress{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
              site needs
            </span>
          </h2>
          <p className="mt-4 text-slate-500 text-base sm:text-lg font-normal max-w-xl mx-auto">
            Powerful tools and infrastructure — all managed so you can focus on growing your business.
          </p>
        </motion.div>

        {/* ── Feature grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {features.map((feat) => (
            <motion.div
              key={feat.title}
              variants={cardVariants}
              className="group relative p-[1.5px] rounded-2xl transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, #e2e8f0 0%, #e2e8f0 100%)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${feat.from}, ${feat.to})`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, #e2e8f0 0%, #e2e8f0 100%)`;
              }}
            >
              {/* Inner white card */}
              <div
                className="h-full rounded-[14px] bg-white p-5 flex flex-col gap-3 transition-shadow duration-300 group-hover:shadow-xl"
              >
                {/* Icon bubble */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: feat.soft }}
                >
                  <feat.icon size={20} style={{ color: feat.iconColor }} strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="text-[14px] font-bold text-slate-900 leading-snug">
                  {feat.title}
                </h3>

                {/* Desc */}
                <p className="text-[12.5px] text-slate-500 leading-relaxed font-normal flex-1">
                  {feat.desc}
                </p>

                {/* Subtle bottom accent line — appears on hover */}
                <div
                  className="h-0.5 w-0 rounded-full transition-all duration-500 group-hover:w-full"
                  style={{ background: `linear-gradient(90deg, ${feat.from}, ${feat.to})` }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}