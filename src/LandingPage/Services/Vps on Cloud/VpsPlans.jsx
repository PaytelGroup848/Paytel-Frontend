// import { useMemo, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   ArrowRight,
//   CheckCircle2,
//   Cloud,
//   Cpu,
//   Database,
//   HardDrive,
//   Monitor,
//   Server,
//   ShieldCheck,
//   Sparkles,
//   Users,
// } from 'lucide-react';

// /* ------------------------------------------------------------------ */
// /*  Data                                                              */
// /* ------------------------------------------------------------------ */

// const linuxCycles = [
//   { key: 'monthly', label: 'Monthly', months: 1 },
//   { key: 'yearly', label: 'Yearly', months: 12 },
//   { key: 'twoYearly', label: '2 Years', months: 24 },
//   { key: 'threeYearly', label: '3 Years', months: 36 },
// ];

// const windowsCycles = [
//   { key: 'monthly', label: 'Monthly', months: 1 },
//   { key: 'quarterly', label: 'Quarterly', months: 3 },
//   { key: 'annually', label: 'Annually', months: 12 },
// ];

// const linuxPlans = [
//   {
//     name: 'Starter',
//     vcpu: 2,
//     ram: 4,
//     storage: 60,
//     os: 'Linux',
//     prices: { monthly: 899, yearly: 8988, twoYearly: 14376, threeYearly: 19764 },
//   },
//   {
//     name: 'Business',
//     vcpu: 4,
//     ram: 8,
//     storage: 100,
//     os: 'Linux',
//     prices: { monthly: 1299, yearly: 12996, twoYearly: 19992, threeYearly: 32364 },
//   },
//   {
//     name: 'Pro',
//     vcpu: 6,
//     ram: 16,
//     storage: 200,
//     os: 'Linux',
//     prices: { monthly: 2999, yearly: 26388, twoYearly: 45600, threeYearly: 64764 },
//     popular: true,
//   },
//   {
//     name: 'Enterprise',
//     vcpu: 8,
//     ram: 32,
//     storage: 300,
//     os: 'Linux',
//     prices: { monthly: 3999, yearly: 45588, twoYearly: 71976, threeYearly: 97164 },
//   },
//   {
//     name: 'Ultra',
//     vcpu: 12,
//     ram: 64,
//     storage: 500,
//     os: 'Linux',
//     prices: { monthly: 7999, yearly: 81588, twoYearly: 119976, threeYearly: 161964 },
//   },
// ];

// const windowsPlans = [
//   {
//     name: 'Windows-Small 1',
//     vcpu: 2,
//     ram: 4,
//     storage: 40,
//     os: 'Windows',
//     prices: { monthly: 1500, quarterly: 4500, annually: 18000 },
//   },
//   {
//     name: 'Windows-Small 2',
//     vcpu: 3,
//     ram: 6,
//     storage: 60,
//     os: 'Windows',
//     prices: { monthly: 2000, quarterly: 6000, annually: 24000 },
//   },
//   {
//     name: 'Windows-Medium 1',
//     vcpu: 4,
//     ram: 8,
//     storage: 80,
//     os: 'Windows',
//     prices: { monthly: 4200, quarterly: 12600, annually: 50400 },
//   },
//   {
//     name: 'Windows-Medium 2',
//     vcpu: 4,
//     ram: 12,
//     storage: 100,
//     os: 'Windows',
//     prices: { monthly: 5600, quarterly: 16800, annually: 67200 },
//   },
//   {
//     name: 'Windows-Large 1',
//     vcpu: 8,
//     ram: 16,
//     storage: 120,
//     os: 'Windows',
//     prices: { monthly: 11500, quarterly: 34500, annually: 138000 },
//     popular: true,
//   },
//   {
//     name: 'Windows-Large 2',
//     vcpu: 8,
//     ram: 32,
//     storage: 200,
//     os: 'Windows',
//     prices: { monthly: 13000, quarterly: 39000, annually: 156000 },
//   },
// ];

// const includedFeatures = [
//   'Full root / admin access',
//   'Dedicated IP included',
//   'DDoS protection',
//   '99.95% uptime SLA',
//   '24/7 technical support',
//   'Instant provisioning',
//   'KVM virtualization',
//   'Free SSL certificates',
// ];

// /* ------------------------------------------------------------------ */
// /*  Helpers                                                           */
// /* ------------------------------------------------------------------ */

// const formatPrice = (value) =>
//   new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//     maximumFractionDigits: 0,
//   }).format(value);

// /* ------------------------------------------------------------------ */
// /*  Component                                                         */
// /* ------------------------------------------------------------------ */

// export default function VpsPlans() {
//   const [activeTab, setActiveTab] = useState('linux'); // 'linux' | 'windows'
//   const [linuxCycle, setLinuxCycle] = useState('yearly');
//   const [windowsCycle, setWindowsCycle] = useState('annually');
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [configOpen, setConfigOpen] = useState(false);
//   const navigate = useNavigate();

//   const formatPrice = (price) => {
//     return `₹${price.toLocaleString('en-IN')}`;
//   };

//   // Active data based on tab
//   const isLinux = activeTab === 'linux';
//   const plans = isLinux ? linuxPlans : windowsPlans;
//   const cycles = isLinux ? linuxCycles : windowsCycles;
//   const cycleKey = isLinux ? linuxCycle : windowsCycle;
//   const setCycle = isLinux ? setLinuxCycle : setWindowsCycle;

//   const selectedCycle = useMemo(
//     () => cycles.find((c) => c.key === cycleKey) || cycles[0],
//     [cycles, cycleKey]
//   );

//   // Predefined card accent tones (cycling)
//   const cardTones = [
//     'border-indigo-200 bg-indigo-50/70',
//     'border-emerald-200 bg-emerald-50/70',
//     'border-sky-200 bg-sky-50/70',
//     'border-amber-200 bg-amber-50/70',
//     'border-purple-200 bg-purple-50/70',
//     'border-rose-200 bg-rose-50/70',
//   ];

//   return (
//     <section
//       id="vps-plans"
//       className="w-full overflow-hidden bg-[linear-gradient(180deg,#eef4ff_0%,#f4fbf8_48%,#fff7ed_100%)] py-8 sm:py-10 lg:py-12"
//     >
//       <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
//         {/* Outer card container */}
//         <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-[#f8fbff] p-3 shadow-[0_24px_60px_rgba(15,23,42,0.1)] sm:p-5 lg:p-6">
//           {/* Header gradient card */}
//           <div className="rounded-3xl border border-indigo-200 bg-[linear-gradient(135deg,#e0e7ff_0%,#dff7ef_52%,#fff0d6_100%)] p-4 sm:p-6 lg:p-7">
//             <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
//               <div className="min-w-0">
//                 <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase text-indigo-700 shadow-sm">
//                   <Cloud size={15} />
//                   Cloud VPS Plans
//                 </div>
//                 <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-indigo-950 sm:text-4xl lg:text-5xl">
//                   Boost Your Performance with Our Powerful Cloud VPS
//                 </h2>
//                 <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
//                   Enjoy lightning‑fast performance with multi‑core CPUs, expandable RAM, and
//                   SSD storage that keeps your apps running smoothly.
//                 </p>
//               </div>

//               {/* Tab selector + cycle toggle */}
//               <div className="space-y-3">
//                 {/* OS Tabs */}
//                 <div className="grid grid-cols-2 gap-2 rounded-2xl border border-indigo-200 bg-[#eef4ff] p-2">
//                   {[
//                     { key: 'linux', label: 'Linux VPS', icon: Server },
//                     { key: 'windows', label: 'Windows VPS', icon: Monitor },
//                   ].map(({ key, label, icon: Icon }) => {
//                     const isActive = activeTab === key;
//                     return (
//                       <button
//                         key={key}
//                         onClick={() => setActiveTab(key)}
//                         className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-bold transition-all ${
//                           isActive
//                             ? 'bg-indigo-600 text-white shadow-md'
//                             : 'bg-transparent text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'
//                         }`}
//                       >
//                         <Icon size={16} />
//                         {label}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 {/* Billing cycle toggles */}
//                 <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-4">
//                   {cycles.map((cycle) => {
//                     const isActive = cycleKey === cycle.key;
//                     return (
//                       <button
//                         key={cycle.key}
//                         onClick={() => setCycle(cycle.key)}
//                         className={`rounded-lg px-1.5 py-2 text-xs font-bold transition ${
//                           isActive
//                             ? 'bg-indigo-600 text-white shadow'
//                             : 'bg-white/80 text-slate-600 hover:bg-white hover:text-indigo-700 border border-slate-200'
//                         }`}
//                       >
//                         {cycle.label}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Plans grid */}
//           <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {plans.map((plan, index) => {
//               const totalPrice = plan.prices[cycleKey];
//               const monthlyEquivalent =
//                 selectedCycle.months > 1
//                   ? Math.round(totalPrice / selectedCycle.months)
//                   : totalPrice;

//               return (
//                 <article
//                   key={plan.name}
//                   className={`group relative flex min-w-0 flex-col rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 ${
//                     plan.popular
//                       ? 'border-indigo-500 bg-indigo-100/80 ring-2 ring-indigo-200 shadow-lg'
//                       : cardTones[index % cardTones.length]
//                   }`}
//                 >
//                   {/* Popular badge */}
//                   {plan.popular && (
//                     <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-indigo-600 px-2.5 py-1 text-[11px] font-bold uppercase text-white shadow">

//                       Popular
//                     </div>
//                   )}

//                   {/* OS icon */}
//                   <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-100 text-indigo-700 shadow-sm transition group-hover:scale-105">
//                     {plan.os === 'Windows' ? (
//                       <Monitor size={22} />
//                     ) : (
//                       <Server size={22} />
//                     )}
//                   </div>

//                   {/* Plan name */}
//                   <h3 className="mt-4 text-xl font-extrabold text-slate-950">{plan.name}</h3>
//                   <p className="mt-1 text-sm text-slate-500">
//                     {plan.os === 'Windows' ? 'Windows Server' : 'Linux'} VPS
//                   </p>

//                   {/* Price block */}
//                   <div className="mt-5 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-inner">
//                     {selectedCycle.months > 1 ? (
//                       <>
//                         <p className="text-xs font-bold uppercase text-slate-500">
//                           Effective monthly
//                         </p>
//                         <div className="mt-1 flex flex-wrap items-end gap-1">
//                           <span className="text-2xl font-extrabold text-slate-950 sm:text-3xl">
//                             {formatPrice(monthlyEquivalent)}
//                           </span>
//                           <span className="pb-1 text-sm font-semibold text-slate-500">/mo</span>
//                         </div>
//                         <p className="mt-2 text-xs leading-5 text-slate-500">
//                           {formatPrice(totalPrice)} billed {selectedCycle.label.toLowerCase()}
//                         </p>
//                       </>
//                     ) : (
//                       <>
//                         <p className="text-xs font-bold uppercase text-slate-500">Monthly price</p>
//                         <div className="mt-1 flex flex-wrap items-end gap-1">
//                           <span className="text-2xl font-extrabold text-slate-950 sm:text-3xl">
//                             {formatPrice(totalPrice)}
//                           </span>
//                           <span className="pb-1 text-sm font-semibold text-slate-500">/mo</span>
//                         </div>
//                       </>
//                     )}
//                   </div>

//                   {/* Specs mini cards */}
//                   <div className="mt-5 grid grid-cols-3 gap-2">
//                     <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-3 text-center">
//                       <Cpu size={16} className="mx-auto text-indigo-700" />
//                       <p className="mt-1 text-xs font-bold text-slate-500">vCPU</p>
//                       <p className="text-sm font-extrabold text-slate-950">{plan.vcpu}</p>
//                     </div>
//                     <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center">
//                       <HardDrive size={16} className="mx-auto text-emerald-700" />
//                       <p className="mt-1 text-xs font-bold text-slate-500">RAM</p>
//                       <p className="text-sm font-extrabold text-slate-950">{plan.ram} GB</p>
//                     </div>
//                     <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-center">
//                       <Database size={16} className="mx-auto text-amber-700" />
//                       <p className="mt-1 text-xs font-bold text-slate-500">Storage</p>
//                       <p className="text-sm font-extrabold text-slate-950">{plan.storage} GB</p>
//                     </div>
//                   </div>

//                   {/* Additional feature bullets */}
//                   <div className="mt-5 space-y-2">
//                     <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
//                       <ShieldCheck size={16} className="shrink-0 text-emerald-600" />
//                       <span>DDoS Protection</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
//                       <Users size={16} className="shrink-0 text-indigo-600" />
//                       <span>1 Dedicated IP</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
//                       <Monitor size={16} className="shrink-0 text-slate-600" />
//                       <span>Full Root Access</span>
//                     </div>
//                   </div>

//                   {/* CTA Button */}
//                  <button
//   type="button"
//   onClick={() => {
//     const planType = activeTab === 'windows' ? 'windows' : 'linux';
//     navigate(`/vps/configure/${planType}/${plan.id || plan._id || plan.name.toLowerCase().replace(/\s+/g, '-')}`);
//   }}
//   className={`mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-extrabold transition-all ${
//     plan.popular
//       ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:shadow-lg'
//       : 'bg-teal-700 text-white shadow hover:bg-teal-800 hover:shadow-md'
//   }`}
// >
//   Buy Now
//   <ArrowRight size={16} />
// </button>
//                 </article>
//               );
//             })}
//           </div>

//           {/* Included features bottom section */}
//           <div className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-[#f8fbff] p-5 sm:p-6 lg:grid-cols-[1fr_0.95fr] lg:p-8">
//             <div className="min-w-0">
//               <h3 className="text-2xl font-extrabold text-indigo-950">All plans include</h3>
//               <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
//                 Every Cloud VPS comes with enterprise‑grade features to keep your applications
//                 secure, fast, and always online.
//               </p>
//             </div>
//             <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
//               {includedFeatures.map((feature) => (
//                 <div key={feature} className="flex min-w-0 items-center gap-2 text-sm font-semibold text-slate-700">
//                   <CheckCircle2 size={17} className="shrink-0 text-emerald-600" />
//                   <span>{feature}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Tax / disclaimer note */}
//           <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800">
//             Prices shown are before applicable taxes. The final amount will be calculated at
//             checkout based on your billing cycle and may vary slightly due to rounding.
//           </p>
//         </div>
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
import SkeletonCard from "../../../components/ui/skeletons/SkeletonCard";
import { useVpsPlans } from "../../../hooks/useVps";
import RebuildVpsModal from "../../../pages/vps/slidebar/RebuildVpsModal";
import { metaPixel } from "../../../utils/metaPixel";

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
