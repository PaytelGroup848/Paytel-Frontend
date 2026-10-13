import React, { useState, useRef, useEffect } from "react"; // useRef added
import {
  Cpu,
  Database,
  HardDrive,
  Monitor,
  Terminal,
  X,
  Zap,
  Server,
  ShieldCheck,
  Plus,
  Minus,
  Globe,
  Network,
  RotateCcw,
  Lock,
  Check,
  Activity,
  BarChart3,
  Cloud,
  Users,
  Award,
  Play,
  Star,
  TrendingUp,
  Clock,
  MapPin,
  MemoryStick,
  Wifi,
  ArrowRight,
} from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import SkeletonCard from "../../components/ui/skeletons/SkeletonCard";
import { useVpsPlans } from "../../hooks/useVps";
import { motion, AnimatePresence, useInView } from "framer-motion";
import RebuildVpsModal from "./slidebar/RebuildVpsModal";
import { metaPixel } from "../../utils/metaPixel";
import { useLocation, useNavigate } from "react-router-dom";
import { getPendingOrder, clearPendingOrder } from "../../utils/pendingOrder";

const formatINR = (paise) => `₹${(Number(paise || 0) / 100).toLocaleString()}`;

const PlanIcon = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-3 text-sm">
    <div className="p-2 rounded-lg bg-primary/10 text-primary">
      <Icon size={16} />
    </div>
    <div>
      <div className="text-textMuted text-[10px] uppercase font-bold tracking-wider">
        {label}
      </div>
      <div className="font-semibold">{value}</div>
    </div>
  </div>
);

export default function VpsPlans() {
  const location = useLocation();
  const navigate = useNavigate();
  const [type, setType] = useState("linux");
  const { data: plans, isLoading } = useVpsPlans(type);

  const pricingRef = useRef(null); // new ref for scrolling to plans

  useEffect(() => {
    // Track page view
    metaPixel.pageView();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-center">
          <div className="bg-bgLighter p-1 rounded-xl flex">
            <div className="w-32 h-10 bg-bgLight animate-pulse rounded-lg" />
            <div className="w-32 h-10 animate-pulse rounded-lg" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeletonCard height={400} />
          <SkeletonCard height={400} />
          <SkeletonCard height={400} />
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 font-sans text-slate-900 selection:bg-indigo-100 overflow-x-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[20%] w-[60%] h-[60%] bg-indigo-100/30 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-100/20 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-cyan-100/20 rounded-full blur-[90px] animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* ─── NEW LIGHT HERO SECTION ─── */}
      {/* <section className="relative z-10 px-4 sm:px-6 lg:px-8 pt-14 md:pt-20 pb-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col lg:flex-row items-center gap-12"
          >
            <div className="flex-1 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100/80 text-indigo-700 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 border border-indigo-200">
                <Cloud size={16} />
                Cloud VPS Hosting
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-4 leading-[1.15]">
                High‑performance{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  virtual servers
                </span>
              </h1>
              <p className="text-lg text-slate-500 max-w-xl mb-8 font-medium leading-relaxed">
                Deploy in{" "}
                <span className="text-slate-700 font-bold">60 seconds</span> on
                enterprise NVMe storage. Root access, global data centres, and
                24/7 expert support – all included.
              </p>
              <button
                onClick={() =>
                  pricingRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-sm tracking-wide hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xl shadow-indigo-200/50"
              >
                View Plans & Pricing
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>

            <div className="flex-1 w-full max-w-md lg:max-w-none">
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl shadow-indigo-100/50 border border-indigo-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-white pointer-events-none" />
                <div className="relative z-10 grid grid-cols-2 gap-4">
                  {[
                    { icon: Cpu, label: "vCPU", value: "Up to 12" },
                    { icon: Database, label: "RAM", value: "Up to 48 GB" },
                    { icon: HardDrive, label: "NVMe", value: "Up to 500 GB" },
                    { icon: Globe, label: "Locations", value: "15+ worldwide" },
                  ].map((spec, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm"
                    >
                      <spec.icon className="text-indigo-600 mb-2" size={24} />
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        {spec.label}
                      </p>
                      <p className="text-xl font-black text-slate-800">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>
                <Cloud
                  size={180}
                  className="absolute -bottom-10 -right-10 text-indigo-100/40 rotate-12"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Feature Highlights */}
      {/* <section className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              icon: Zap,
              title: "Instant Setup",
              desc: "Servers are provisioned in less than 60 seconds.",
              color: "from-yellow-500 to-orange-500",
            },
            {
              icon: Activity,
              title: "99.9% Uptime",
              desc: "Enterprise SLA guaranteed for all business nodes.",
              color: "from-emerald-500 to-teal-500",
            },
            {
              icon: Globe,
              title: "Global Network",
              desc: "Choose from 15+ locations worldwide for low latency.",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: Lock,
              title: "DDoS Protection",
              desc: "Included as standard on all our cloud instances.",
              color: "from-purple-500 to-pink-500",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 text-white shadow-md`}
              >
                <feature.icon size={22} />
              </div>
              <h4 className="font-black text-slate-800 mb-2">
                {feature.title}
              </h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section> */}

      {/* Plans Section (ref for scrolling) */}
      <div ref={pricingRef} className="max-w-[1600px] mx-auto px-6 py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900 mb-1">
            Choose Your&nbsp;
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              VPS Power
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
            High-performance NVMe VPS with dedicated resources.
          </p>
        </div>

        {/* OS Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1.5 rounded-3xl shadow-lg shadow-slate-200/80 border border-slate-100 flex">
            <button
              onClick={() => setType("linux")}
              className={`px-10 py-4 cursor-pointer rounded-2xl font-semibold text-sm transition-all duration-300 flex items-center gap-3
                ${
                  type === "linux"
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/30"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
            >
              <Terminal size={20} />
              LINUX VPS
            </button>
            <button
              onClick={() => setType("windows")}
              className={`px-10 py-4 rounded-2xl cursor-pointer font-semibold text-sm transition-all duration-300 flex items-center gap-3
                ${
                  type === "windows"
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/30"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
            >
              <Monitor size={20} />
              WINDOWS VPS
            </button>
          </div>
        </div>

        {/* Plans Grid — dynamic columns based on plan count */}
        {(() => {
          const count = plans?.length ?? 3;
          const popularIdx = Math.floor(count / 2);

          const gridClass =
            count <= 3
              ? "grid-cols-1 md:grid-cols-3"
              : count === 4
                ? "grid-cols-2 lg:grid-cols-4"
                : count === 5
                  ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
                  : "grid-cols-2 md:grid-cols-3 xl:grid-cols-6";

          return (
            <div className={`grid ${gridClass} gap-4`}>
              {plans?.map((plan, index) => {
                const isPopular = index === popularIdx;
                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.07 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    className={`relative flex flex-col bg-white rounded-2xl overflow-hidden border transition-all duration-300
                      hover:shadow-xl group cursor-pointer
                      ${
                        isPopular
                          ? "border-indigo-300 shadow-lg shadow-indigo-100/70 ring-2 ring-indigo-200"
                          : "border-slate-100 shadow-md hover:border-indigo-200"
                      }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-px left-0 right-0 flex justify-center">
                        <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-black px-5 py-1 rounded-b-xl flex items-center gap-1.5 shadow-md">
                          <Star className="w-3 h-3" fill="currentColor" />
                          MOST POPULAR
                        </div>
                      </div>
                    )}

                    <div
                      className={`h-1 w-full ${
                        isPopular
                          ? "bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400"
                          : "bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400"
                      }`}
                    />

                    <div
                      className={`flex flex-col flex-1 p-5 ${isPopular ? "pt-7" : "pt-5"}`}
                    >
                      <div className="mb-3">
                        <h3 className="text-base font-black text-slate-800 tracking-tight truncate">
                          {plan.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                            Global Deploy
                          </span>
                        </div>
                      </div>

                      <div className="mb-4 pb-4 border-b border-slate-100">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black text-slate-900 tracking-tight">
                            {formatINR(plan.priceMonthly)}
                          </span>
                          <span className="text-slate-400 text-xs font-medium">
                            /mo
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2.5 flex-1 mb-5">
                        {[
                          {
                            icon: Cpu,
                            label: "vCPU",
                            value: `${plan.vcpu} Cores`,
                          },
                          { icon: MemoryStick, label: "RAM", value: plan.ram },
                          {
                            icon: HardDrive,
                            label: "NVMe",
                            value: plan.storage,
                          },
                          { icon: Wifi, label: "Speed", value: plan.portSpeed },
                          {
                            icon: RotateCcw,
                            label: "Backup",
                            value: plan.backups,
                          },
                        ].map(({ icon: Icon, label, value }) => (
                          <div
                            key={label}
                            className="flex items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-1.5 min-w-0">
                              <div
                                className={`p-1 rounded-md flex-shrink-0 ${isPopular ? "bg-amber-50 text-amber-600" : "bg-indigo-50 text-indigo-500"}`}
                              >
                                <Icon size={11} />
                              </div>
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                                {label}
                              </span>
                            </div>
                            <span className="text-xs font-bold text-slate-700 text-right truncate">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() =>
                          navigate(
                            `/vps/configure/${type}/${plan.id || plan._id}`,
                          )
                        }
                        className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300
                          flex items-center justify-center gap-2 group-hover:gap-3
                          ${
                            isPopular
                              ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-300"
                              : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300"
                          }`}
                      >
                        Deploy
                        <ArrowRight
                          size={13}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          );
        })()}

        <RebuildVpsModal type={type} />
      </div>
    </div>
  );
}
