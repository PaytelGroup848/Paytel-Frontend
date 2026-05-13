// @ts-nocheck
import { motion } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  Cpu,
  Crown,
  Bolt,
  Rocket,
  Globe,
  Headphones,
  Paintbrush,
  Play,
  Check,
  ArrowRight,
  Server,
} from "lucide-react";
import Plans from "../../plans/Plan"; // adjust path as needed

export default function Wordpress_Page() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };
  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* Subtle dynamic background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl animate-float-slower" />
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-cyan-100/20 rounded-full blur-3xl animate-float-slowest" />
      </div>

      {/* Reduced top/bottom padding for tighter layout */}
      <main className="relative z-10 pt-16 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20"
        >
          {/* HERO SECTION */}
          <motion.section variants={itemVariants} className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 border border-indigo-100/60"
            >
              WordPress Optimized Hosting
            </motion.div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Build faster with{" "}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                WordPress
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M1 5.5C30 2.5 170 2.5 199 5.5" stroke="url(#paint)" strokeWidth="6" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="paint" x1="0" y1="0" x2="200" y2="0">
                      <stop stopColor="#818cf8" />
                      <stop offset="1" stopColor="#c084fc" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
              Experience the power of the world’s most popular CMS on ultra‑fast NVMe infrastructure.
              Instant installs, automatic scaling, and 99.9% uptime.
            </p>
          </motion.section>

          {/* PROMO CARD */}
          <motion.section
            variants={itemVariants}
            className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 p-8 md:p-14 rounded-[3rem] overflow-hidden shadow-2xl shadow-indigo-200/60"
          >
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl" />
            <div className="relative flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-white text-center lg:text-left">
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-1 text-xs font-semibold tracking-widest uppercase mb-6 border border-white/10">
                  <Cpu size={14} />
                  NVMe-Powered Servers
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                  One‑click installs,
                  <br />
                  <span className="text-cyan-200">blazing performance.</span>
                </h2>
                <p className="mt-6 text-indigo-100 text-lg font-medium max-w-lg">
                  Launch your WordPress site in seconds. We handle caching, updates, and security
                  so you can focus on what matters: your content.
                </p>
                <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
                  {[
                    { icon: Zap, label: "LiteSpeed Cache" },
                    { icon: ShieldCheck, label: "Auto-Scaling" },
                    { icon: Check, label: "Free SSL" },
                    { icon: Server, label: "Daily Backups" },
                  ].map((item) => (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-indigo-50 border border-white/10"
                    >
                      <item.icon size={14} />
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1 w-full max-w-lg relative">
                <div className="relative rounded-3xl overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)] transform rotate-1 hover:rotate-0 transition-all duration-700">
                  <img
                    src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop&crop=edges"
                    alt="WordPress dashboard"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-emerald-500 text-white p-3 rounded-xl shadow-lg flex items-center gap-2"
                >
                  <Check size={18} strokeWidth={3} />
                  <span className="text-lg font-black">99.9%</span>
                  <span className="text-[10px] font-bold uppercase">Uptime SLA</span>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* STATS – subtle hover scale + shadow */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Globe, value: "10M+", label: "Websites", color: "bg-indigo-100 text-indigo-600" },
              { icon: Zap, value: "0.3s", label: "Avg Load Time", color: "bg-purple-100 text-purple-600" },
              { icon: Globe, value: "200+", label: "CDN PoPs", color: "bg-cyan-100 text-cyan-600" },
              { icon: Headphones, value: "24/7", label: "Expert Support", color: "bg-emerald-100 text-emerald-600" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
                  <stat.icon size={22} />
                </div>
                <p className="text-2xl font-extrabold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

        
          <motion.div id="features" variants={itemVariants} className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "LiteSpeed Caching",
                desc: "4× faster page loads with server‑side caching and automatic optimization.",
                // Local image – ensure /public/images/features/caching.jpg exists
                image: "/LiteSpeed Caching.png"
              },
              {
                icon: ShieldCheck,
                title: "Secure Auto‑Updates",
                desc: "We keep your WordPress core, themes, and plugins up‑to‑date automatically.",
                image: "/Secure Auto‑Updates.webp"
              },
              {
                icon: Cpu,
                title: "NVMe SSD Storage",
                desc: "Ultra‑fast read/write speeds for database‑heavy WordPress sites.",
                image: "/NVMe SSD Storage.webp"
              },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="h-36 overflow-hidden relative">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-7">
                  <div className="w-11 h-11 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <feature.icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* PRICING – pulled up with negative margin for tighter fit */}
          <motion.section
            id="pricing-section"
            variants={itemVariants}
            className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden -mt-18"
          >
            <div>
              <Plans />
            </div>
          </motion.section>


          {/* STEPS – added subtle connector line on desktop */}
          <motion.section variants={itemVariants} className="bg-white rounded-[3rem] p-10 md:p-14 border border-slate-200 shadow-sm relative">
            <div className="text-center mb-14">
              <h3 className="text-3xl font-extrabold text-slate-900">Three steps to launch</h3>
              <p className="text-slate-500 mt-2 font-medium">From zero to live website in under 60 seconds.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connector line (hidden on mobile) */}
              <div className="hidden md:block absolute top-16 left-[12%] right-[12%] h-0.5 bg-slate-200 -z-10" />
              {[
                { step: "1", icon: Cpu, title: "Choose a Plan", desc: "Select the WordPress plan that fits your needs and budget." },
                { step: "2", icon: Cpu, title: "Install in 1‑Click", desc: "Our auto‑installer sets up WordPress instantly, with pre‑configured caching." },
                { step: "3", icon: Cpu, title: "Go Live", desc: "Connect your domain and share your site with the world." },
              ].map((s) => (
                <motion.div
                  key={s.step}
                  whileHover={{ y: -4 }}
                  className="text-center relative"
                >
                  <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-xl font-extrabold mx-auto mb-5 shadow-lg shadow-slate-200 relative z-10">
                    {s.step}
                  </div>
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <s.icon size={22} />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{s.title}</h4>
                  <p className="text-sm text-slate-500 max-w-[200px] mx-auto">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </main>

      {/* Custom keyframes for floating background */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.03); }
        }
        @keyframes float-slowest {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 10s ease-in-out infinite;
        }
        .animate-float-slowest {
          animation: float-slowest 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}