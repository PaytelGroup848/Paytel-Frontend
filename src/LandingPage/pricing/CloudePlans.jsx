// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import {
//   Check, Sparkles, ArrowRight, Cpu, HardDrive, Users, Server,
// } from "lucide-react";

// /* ── Data (unchanged) ───────────────────────────── */
// const pricingData = {
//   "Linux VPS": {
//     columns: ["Plan", "vCPU", "RAM (GB)", "Storage (GB)", "Monthly", "Yearly", "2 Yearly", "3 Yearly"],
//     plans: [
//       { name: "Starter", vCPU: 2, ram: 4, storage: 60, monthly: 899, yearly: 8988, twoYearly: 14376, threeYearly: 19764 },
//       { name: "Business", vCPU: 4, ram: 8, storage: 100, monthly: 1299, yearly: 12996, twoYearly: 19992, threeYearly: 32364 },
//       { name: "Pro", vCPU: 6, ram: 16, storage: 200, monthly: 2999, yearly: 26388, twoYearly: 45600, threeYearly: 64764 },
//       { name: "Ultra", vCPU: 12, ram: 64, storage: 500, monthly: 7999, yearly: 81588, twoYearly: 119976, threeYearly: 161964 },
//     ],
//     formatPrice: (price) => `₹${price.toLocaleString()}/mo`,
//     popular: 2,
//   },
//   "Windows VPS": {
//     columns: ["Plan", "vCPU", "RAM (GB)", "Storage (GB)", "Monthly", "Quarterly", "Annually"],
//     plans: [
//       { name: "Windows-Small 1", vCPU: 2, ram: 4, storage: 40, monthly: 1500, quarterly: 4500, annually: 18000 },
//       { name: "Windows-Small 2", vCPU: 3, ram: 6, storage: 60, monthly: 2000, quarterly: 6000, annually: 24000 },
//       { name: "Windows-Medium 1", vCPU: 4, ram: 8, storage: 80, monthly: 4200, quarterly: 12600, annually: 50400 },
//       { name: "Windows-Medium 2", vCPU: 4, ram: 12, storage: 100, monthly: 5600, quarterly: 16800, annually: 67200 },
//       { name: "Windows-Large 1", vCPU: 8, ram: 16, storage: 120, monthly: 11500, quarterly: 34500, annually: 138000 },
//       { name: "Windows-Large 2", vCPU: 8, ram: 32, storage: 200, monthly: 13000, quarterly: 39000, annually: 156000 },
//     ],
//     formatPrice: (price) => `₹${price.toLocaleString()}/mo`,
//     popular: 3,
//   },
//   "Tally on Cloud": {
//     columns: ["Processor(vCPU)", "RAM (GB)", "Storage (GB)", "User", "Half Yearly", "Yearly"],
//     plans: [
//       { vCPU: 2, ram: 4, storage: 40, users: 3, halfYearly: 6000, yearly: 10800 },
//       { vCPU: 4, ram: 8, storage: 50, users: 6, halfYearly: 10200, yearly: 17500 },
//       { vCPU: 6, ram: 12, storage: 60, users: 9, halfYearly: 15700, yearly: 28000 },
//       { vCPU: 8, ram: 16, storage: 80, users: 12, halfYearly: 20900, yearly: 35500 },
//       { vCPU: 10, ram: 20, storage: 90, users: 15, halfYearly: 26000, yearly: 45000 },
//       { vCPU: 12, ram: 24, storage: 110, users: 18, halfYearly: 31600, yearly: 54000 },
//       { vCPU: 16, ram: 32, storage: 150, users: 25, halfYearly: 42000, yearly: 75000 },
//     ],
//     formatPrice: (price) => `₹${price.toLocaleString()}`,
//     popular: 2,
//   },
//   "Busy on Cloud": {
//     columns: ["Processor(vCPU)", "RAM (GB)", "Storage (GB)", "User", "Half Yearly", "Yearly"],
//     plans: [
//       { vCPU: 2, ram: 4, storage: 40, users: 3, halfYearly: 6000, yearly: 10800 },
//       { vCPU: 4, ram: 8, storage: 50, users: 6, halfYearly: 10200, yearly: 17500 },
//       { vCPU: 6, ram: 12, storage: 60, users: 9, halfYearly: 15700, yearly: 28000 },
//       { vCPU: 8, ram: 16, storage: 80, users: 12, halfYearly: 20900, yearly: 35500 },
//       { vCPU: 10, ram: 20, storage: 90, users: 15, halfYearly: 26000, yearly: 45000 },
//       { vCPU: 12, ram: 24, storage: 110, users: 18, halfYearly: 31600, yearly: 54000 },
//       { vCPU: 16, ram: 32, storage: 150, users: 25, halfYearly: 42000, yearly: 75000 },
//     ],
//     formatPrice: (price) => `₹${price.toLocaleString()}`,
//     popular: 2,
//   },
//   "Marg on Cloud": {
//     columns: ["Processor(vCPU)", "RAM (GB)", "Storage (GB)", "User", "Half Yearly", "Yearly"],
//     plans: [
//       { vCPU: 2, ram: 4, storage: 40, users: 3, halfYearly: 6000, yearly: 10800 },
//       { vCPU: 4, ram: 8, storage: 50, users: 6, halfYearly: 10200, yearly: 17500 },
//       { vCPU: 6, ram: 12, storage: 60, users: 9, halfYearly: 15700, yearly: 28000 },
//       { vCPU: 8, ram: 16, storage: 80, users: 12, halfYearly: 20900, yearly: 35500 },
//       { vCPU: 10, ram: 20, storage: 90, users: 15, halfYearly: 26000, yearly: 45000 },
//       { vCPU: 12, ram: 24, storage: 110, users: 18, halfYearly: 31600, yearly: 54000 },
//       { vCPU: 16, ram: 32, storage: 150, users: 25, halfYearly: 42000, yearly: 75000 },
//     ],
//     formatPrice: (price) => `₹${price.toLocaleString()}`,
//     popular: 2,
//   },
// };

// /* ── Icon mapping for specs ─────────────────────── */
// const specIcons = {
//   vCPU: Cpu,
//   ram: HardDrive,
//   storage: Server,
//   users: Users,
// };

// /* ── Tabs with subtle icon styling ──────────────── */
// const Tabs = ({ activeTab, setActiveTab }) => {
//   const tabs = Object.keys(pricingData);
//   return (
//     <div className="flex flex-wrap justify-center gap-2 mb-12">
//       {tabs.map((tab) => (
//         <button
//           key={tab}
//           onClick={() => setActiveTab(tab)}
//           className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
//             activeTab === tab
//               ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/30"
//               : "bg-white/80 backdrop-blur-sm text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-lg"
//           }`}
//         >
//           {tab}
//         </button>
//       ))}
//     </div>
//   );
// };

// /* ── Plan Card (with icons and improved styling) ── */
// const PlanCard = ({
//   plan,
//   index,
//   formatPrice,
//   isPopular,
//   serviceType,
//   onSelectPlan,
// }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 40 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.1, duration: 0.4 }}
//       className={`relative group bg-white rounded-2xl border ${
//         isPopular
//           ? "border-blue-400 shadow-2xl shadow-blue-100/60 scale-[1.02]"
//           : "border-slate-200 shadow-md hover:shadow-2xl hover:border-blue-300"
//       } p-6 flex flex-col transition-all duration-300 hover:-translate-y-2`}
//     >
//       {/* Most Popular badge */}
//       {isPopular && (
//         <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-5 py-1.5 rounded-full flex items-center gap-1.5 shadow-2xl shadow-indigo-300/50">
//           Most Popular
//         </div>
//       )}

//       {/* Plan header */}
//       <div className="mb-5">
//         <h3 className="text-xl font-bold text-slate-800">
//           {plan.name || `${plan.vCPU} Core`}
//         </h3>
//         <p className="text-sm text-slate-500 mt-1">
//           {serviceType.includes("VPS") ? "Virtual Private Server" : "Cloud ERP"}
//         </p>
//       </div>

//       {/* Specs with icons */}
//       <div className="space-y-4 mb-6 flex-1">
//         {plan.vCPU && (
//           <div className="flex items-center gap-3 text-sm">
//             <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
//               <Cpu size={16} className="text-blue-700" />
//             </div>
//             <span className="text-slate-500 flex-1">Processor</span>
//             <span className="font-semibold text-slate-700">{plan.vCPU} vCPU</span>
//           </div>
//         )}
//         {plan.ram && (
//           <div className="flex items-center gap-3 text-sm">
//             <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
//               <HardDrive size={16} className="text-indigo-700" />
//             </div>
//             <span className="text-slate-500 flex-1">Memory</span>
//             <span className="font-semibold text-slate-700">{plan.ram} GB</span>
//           </div>
//         )}
//         {plan.storage && (
//           <div className="flex items-center gap-3 text-sm">
//             <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
//               <Server size={16} className="text-cyan-700" />
//             </div>
//             <span className="text-slate-500 flex-1">Storage</span>
//             <span className="font-semibold text-slate-700">{plan.storage} GB SSD</span>
//           </div>
//         )}
//         {plan.users && (
//           <div className="flex items-center gap-3 text-sm">
//             <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
//               <Users size={16} className="text-purple-700" />
//             </div>
//             <span className="text-slate-500 flex-1">Users</span>
//             <span className="font-semibold text-slate-700">{plan.users}</span>
//           </div>
//         )}
//       </div>

//       {/* Pricing */}
//       <div className="border-t border-slate-100 pt-5 mb-5">
//         {plan.monthly && (
//           <div>
//             <p className="text-3xl font-extrabold text-slate-900">
//               {formatPrice(plan.monthly)}
//             </p>
//             <div className="space-y-0.5 mt-2">
//               {plan.yearly && (
//                 <p className="text-xs text-slate-500">
//                   Yearly: {formatPrice(plan.yearly)}
//                 </p>
//               )}
//               {plan.halfYearly && (
//                 <p className="text-xs text-slate-500">
//                   Half Yearly: {formatPrice(plan.halfYearly)}
//                 </p>
//               )}
//               {plan.quarterly && (
//                 <p className="text-xs text-slate-500">
//                   Quarterly: {formatPrice(plan.quarterly)}
//                 </p>
//               )}
//               {plan.twoYearly && (
//                 <p className="text-xs text-slate-500">
//                   2 Years: {formatPrice(plan.twoYearly)}
//                 </p>
//               )}
//               {plan.threeYearly && (
//                 <p className="text-xs text-slate-500">
//                   3 Years: {formatPrice(plan.threeYearly)}
//                 </p>
//               )}
//               {plan.annually && (
//                 <p className="text-xs text-slate-500">
//                   Annually: {formatPrice(plan.annually)}
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         {!plan.monthly && (plan.yearly || plan.halfYearly) && (
//           <div>
//             <p className="text-3xl font-extrabold text-slate-900">
//               {formatPrice(plan.yearly || plan.halfYearly)}
//             </p>
//             <p className="text-xs text-slate-500 mt-1">
//               {plan.yearly ? "Yearly billing" : "Half Yearly billing"}
//             </p>
//             {plan.halfYearly && plan.yearly && (
//               <p className="text-xs text-slate-500">
//                 Half Yearly: {formatPrice(plan.halfYearly)}
//               </p>
//             )}
//           </div>
//         )}
//       </div>

//       {/* CTA Button */}
//      <button
//   onClick={() => {
//     if (
//       serviceType === "Linux VPS" ||
//       serviceType === "Windows VPS"
//     ) {
//       onSelectPlan(
//         {
//           id: `${serviceType}-${index}`,
//           name: plan.name,
//           vcpu: plan.vCPU,
//           ram: `${plan.ram} GB`,
//           storage: `${plan.storage} GB SSD`,
//           priceMonthly: plan.monthly
//             ? plan.monthly * 100
//             : (plan.yearly || plan.halfYearly || 0) * 100,
//           portSpeed: "1 Gbps",
//           backups: "Included",
//         },
//         serviceType === "Linux VPS" ? "linux" : "windows"
//       );
//     }
//   }}
//   className={`mt-auto w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm transition-all ${
//     isPopular
//       ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:scale-[1.03]"
//       : "bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md"
//   }`}
// >
//   {isPopular ? "Get Started Now" : "Buy Now"}
//   <ArrowRight size={16} />
// </button>
//     </motion.div>
//   );
// };

// /* ── Main Section ──────────────────────────────── */
// export default function CloudePlans() {
//   const [activeTab, setActiveTab] = useState("Linux VPS");
//   const navigate = useNavigate();
//   const currentData = pricingData[activeTab];

//   return (
//     <section className="relative w-full bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 py-10 px-4 overflow-hidden">
//       {/* Decorative blur orbs */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-16 left-16 w-80 h-80 bg-blue-300/40 rounded-full blur-3xl" />
//         <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl" />
//         <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-sky-300/20 rounded-full blur-3xl" />
//       </div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
//             Cloude Plans
//           </h1>
//           <p className="text-slate-600 text-lg max-w-xl mx-auto">
//             Flexible pricing for every business. Scale up anytime, transparent billing, no hidden costs.
//           </p>
//         </motion.div>

//       </div>
//     </section>
//   );
// }

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

import { motion, AnimatePresence, useInView } from "framer-motion";

import { useLocation, useNavigate } from "react-router-dom";
import SkeletonCard from "../../components/ui/skeletons/SkeletonCard";
import { useVpsPlans } from "../../hooks/useVps";
import RebuildVpsModal from "../../pages/vps/slidebar/RebuildVpsModal";
import { metaPixel } from "../../utils/metaPixel";

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

export default function CloudePlans() {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 font-sans text-slate-900 selection:bg-indigo-100 overflow-x-hidden">
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

      {/* Plans Section (ref for scrolling) */}
      <div ref={pricingRef} className="max-w-[1600px] mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-slate-100 px-6 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="uppercase text-xs font-bold tracking-[2px] text-slate-500">
              Premium Cloud Infrastructure
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-slate-900 mb-4">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              VPS Power
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
            High-performance NVMe VPS with dedicated resources. Lightning-fast
            deployment in under 60 seconds.
          </p>
        </div>

        {/* OS Toggle */}
        <div className="flex justify-center mb-12">
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
