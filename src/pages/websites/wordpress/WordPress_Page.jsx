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
  Star,
} from "lucide-react";
import Plans from "../../plans/Plan";

/* ---------- Google Review Card Component ---------- */
const googleReviews = [
  {
    name: "Ananya Gupta",
    rating: 5,
    text: "Moved our blog to their WordPress hosting and saw a 3x speed boost. The support team is simply outstanding.",
    avatarUrl: "https://i.pravatar.cc/40?img=47",
  },
  {
    name: "Rohit Mehta",
    rating: 5,
    text: "One‑click install and LiteSpeed caching makes our site fly. Absolutely recommended for serious bloggers.",
    avatarUrl: "https://i.pravatar.cc/40?img=12",
  },
  {
    name: "Sneha Iyer",
    rating: 5,
    text: "Their managed WordPress service saved me hours of maintenance. Now I focus only on content.",
    avatarUrl: "https://i.pravatar.cc/40?img=23",
  },
  {
    name: "Vikram Das",
    rating: 5,
    text: "NVMe SSDs make a noticeable difference in dashboard speed. Plus, daily backups give peace of mind.",
    avatarUrl: "https://i.pravatar.cc/40?img=60",
  },
  {
    name: "Kavya Rao",
    rating: 5,
    text: "Switched from shared hosting and never looked back. Our e‑commerce site handles traffic spikes effortlessly.",
    avatarUrl: "https://i.pravatar.cc/40?img=36",
  },
];

export default function Wordpress_Page() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };
  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className=" bg-white font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* Subtle dynamic background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl animate-float-slower" />
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-cyan-100/20 rounded-full blur-3xl animate-float-slowest" />
      </div>

      <main className="relative z-10 ">
        <Plans />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-[85vw] mx-auto px-4 sm:px-6 lg:px-8 space-y-20"
        >
          {/* HERO SECTION */}
          {/* <motion.section variants={itemVariants} className="text-center max-w-4xl mx-auto">
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
          </motion.section> */}

          {/* PROMO CARD */}
          {/* <motion.section
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
                  Launch your WordPress site in seconds. We handle caching,
                  updates, and security so you can focus on what matters: your
                  content.
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
                    src="/wordpressimage.png"
                    alt="WordPress dashboard"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-fuchsia-500 text-black p-3 rounded-xl shadow-lg flex items-center gap-2"
                >
                  <span className="text-lg font-black"></span>
                  <span className="text-[10px] font-bold uppercase">
                    Wordpress
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.section> */}

          {/* STATS */}
          {/* <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              {
                icon: Globe,
                value: "10M+",
                label: "Websites",
                color: "bg-indigo-100 text-indigo-600",
              },
              {
                icon: Zap,
                value: "0.3s",
                label: "Avg Load Time",
                color: "bg-purple-100 text-purple-600",
              },
              {
                icon: Globe,
                value: "200+",
                label: "CDN PoPs",
                color: "bg-cyan-100 text-cyan-600",
              },
              {
                icon: Headphones,
                value: "24/7",
                label: "Expert Support",
                color: "bg-emerald-100 text-emerald-600",
              },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-4`}
                >
                  <stat.icon size={22} />
                </div>
                <p className="text-2xl font-extrabold text-slate-900">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div> */}

          {/* FEATURES */}
          {/* <motion.div
            id="features"
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Zap,
                title: "LiteSpeed Caching",
                desc: "4× faster page loads with server‑side caching and automatic optimization.",
                image: "/LiteSpeed Caching.png",
              },
              {
                icon: ShieldCheck,
                title: "Secure Auto‑Updates",
                desc: "We keep your WordPress core, themes, and plugins up‑to‑date automatically.",
                image: "/Secure Auto‑Updates.webp",
              },
              {
                icon: Cpu,
                title: "NVMe SSD Storage",
                desc: "Ultra‑fast read/write speeds for database‑heavy WordPress sites.",
                image: "/NVMe SSD Storage.webp",
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
                  <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-7">
                  <div className="w-11 h-11 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <feature.icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div> */}

          {/* PRICING */}
          {/* <motion.section
            id="pricing-section"
            variants={itemVariants}
            className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden -mt-18"
          >
            <div>
            
            </div>
          </motion.section> */}

          {/* STEPS */}
          {/* <motion.section
            variants={itemVariants}
            className="bg-white rounded-[3rem] p-10 md:p-14 border border-slate-200 shadow-sm relative"
          >
            <div className="text-center mb-14">
              <h3 className="text-3xl font-extrabold text-slate-900">
                Three steps to launch
              </h3>
              <p className="text-slate-500 mt-2 font-medium">
                From zero to live website in under 60 seconds.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-16 left-[12%] right-[12%] h-0.5 bg-slate-200 -z-10" />
              {[
                {
                  step: "1",
                  icon: Cpu,
                  title: "Choose a Plan",
                  desc: "Select the WordPress plan that fits your needs and budget.",
                },
                {
                  step: "2",
                  icon: Cpu,
                  title: "Install in 1‑Click",
                  desc: "Our auto‑installer sets up WordPress instantly, with pre‑configured caching.",
                },
                {
                  step: "3",
                  icon: Cpu,
                  title: "Go Live",
                  desc: "Connect your domain and share your site with the world.",
                },
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
                  <p className="text-sm text-slate-500 max-w-[200px] mx-auto">
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section> */}

          {/* ---------- TRUSTED BY 5K+ USERS WITH GOOGLE REVIEW CARDS ---------- */}
          {/* <motion.section variants={itemVariants} className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-4 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 text-sm font-semibold text-amber-800 shadow-sm">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                Excellent rating on Google
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                Trusted by 5k+ Users
              </h3>
              <p className="text-slate-500 mt-2 font-medium">
                See why businesses love our managed WordPress hosting.
              </p>
            </div>

         
            <div className="relative w-full overflow-hidden">
              <motion.div
                className="flex w-max gap-4 py-2"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                }}
              >
                {[...googleReviews, ...googleReviews].map((review, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 w-72 sm:w-80 lg:w-96 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg transition-shadow"
                  >
                   
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                  
                    <p className="text-sm text-slate-600 leading-6">
                      “{review.text}”
                    </p>

                   
                    <div className="mt-4 flex items-center gap-3">
                      <img
                        src={review.avatarUrl}
                        alt={review.name}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div>
                        <span className="text-sm font-semibold text-slate-800 block">
                          {review.name}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-white text-[10px] font-bold">
                            G
                          </span>
                          Reviewed on Google
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.section> */}
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
