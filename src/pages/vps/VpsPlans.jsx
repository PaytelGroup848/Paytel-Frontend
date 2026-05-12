import React, { useState } from 'react';
import { 
  Cpu, Database, HardDrive, Monitor, Terminal, X, 
  Zap, Server, ShieldCheck, Plus, Minus, Globe, 
  Network, RotateCcw, Lock, Check, Activity, BarChart3,
  Cloud, Users, Award, Play, Star, TrendingUp, Clock, MapPin,
  MemoryStick,
  Wifi,
  ArrowRight
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SkeletonCard from '../../components/ui/skeletons/SkeletonCard';
import { useVpsPlans } from '../../hooks/useVps';
import ConfigurationModal from './ConfigurationModal';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import RebuildVpsModal from './slidebar/RebuildVpsModal';

const formatINR = (paise) => `₹${(Number(paise || 0) / 100).toLocaleString()}`;

const PlanIcon = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-3 text-sm">
    <div className="p-2 rounded-lg bg-primary/10 text-primary">
      <Icon size={16} />
    </div>
    <div>
      <div className="text-textMuted text-[10px] uppercase font-bold tracking-wider">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  </div>
);

export default function VpsPlans() {
  const [type, setType] = useState('linux');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { data: plans, isLoading } = useVpsPlans(type);

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
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };


  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 font-sans text-slate-900 selection:bg-indigo-100 overflow-x-hidden">

  <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[20%] w-[60%] h-[60%] bg-indigo-100/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-100/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-cyan-100/20 rounded-full blur-[90px] animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

        <section className="px-4 py-6 md:px-10 md:py-10 relative z-10">
              <div className="max-w-7xl mx-auto rounded-[2.5rem] overflow-hidden relative shadow-2xl">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  poster="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&auto=format"
                >
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-data-center-with-servers-3909-large.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent" />
                
                <div className="relative grid md:grid-cols-2 items-center">
                  <div className="p-10 md:p-20 z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="bg-indigo-600 w-2 h-2 rounded-full animate-pulse"></span>
                      <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">CloudeData Infrastructure</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6">
                      Scalable VPS <br /> <span className="text-indigo-500">Infrastructure</span>
                    </h1>
                    <p className="text-slate-400 text-sm md:text-base mb-10 max-w-sm leading-relaxed font-medium">
                      Experience high-performance NVMe storage with 99.9% uptime. Optimized for high-traffic applications and scale.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button onClick={() => pricingRef.current.scrollIntoView({ behavior: 'smooth' })} className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all shadow-xl shadow-indigo-500/10">
                        Deploy Server
                      </button>
                      <div className="flex items-center gap-3 text-white/50 text-xs font-bold px-4">
                        <ShieldCheck size={18} className="text-emerald-500"/> Enterprise Grade Security
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block"></div>
                </div>
              </div>
            </section>

<section className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { icon: Zap, title: "Instant Setup", desc: "Servers are provisioned in less than 60 seconds.", color: "from-yellow-500 to-orange-500" },
            { icon: Activity, title: "99.9% Uptime", desc: "Enterprise SLA guaranteed for all business nodes.", color: "from-emerald-500 to-teal-500" },
            { icon: Globe, title: "Global Network", desc: "Choose from 15+ locations worldwide for low latency.", color: "from-blue-500 to-cyan-500" },
            { icon: Lock, title: "DDoS Protection", desc: "Included as standard on all our cloud instances.", color: "from-purple-500 to-pink-500" }
          ].map((feature, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ y: -5 }} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all">
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 text-white shadow-md`}>
                <feature.icon size={22} />
              </div>
              <h4 className="font-black text-slate-800 mb-2">{feature.title}</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>


<div className="max-w-[1600px] mx-auto px-6 py-16">
  {/* Header */}
  <div className="text-center mb-16">
    <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-slate-100 px-6 py-2 rounded-full mb-6">
      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
      <span className="uppercase text-xs font-bold tracking-[2px] text-slate-500">Premium Cloud Infrastructure</span>
    </div>
    <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-slate-900 mb-4">
      Choose Your <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">VPS Power</span>
    </h1>
    <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
      High-performance NVMe VPS with dedicated resources. Lightning-fast deployment in under 60 seconds.
    </p>
  </div>

  {/* OS Toggle */}
  <div className="flex justify-center mb-12">
    <div className="bg-white p-1.5 rounded-3xl shadow-lg shadow-slate-200/80 border border-slate-100 flex">
      <button
        onClick={() => setType('linux')}
        className={`px-10 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 flex items-center gap-3
          ${type === 'linux'
            ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/30'
            : 'text-slate-500 hover:bg-slate-50'}`}
      >
        <Terminal size={20} />
        LINUX VPS
      </button>
      <button
        onClick={() => setType('windows')}
        className={`px-10 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 flex items-center gap-3
          ${type === 'windows'
            ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/30'
            : 'text-slate-500 hover:bg-slate-50'}`}
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

    // Grid col class based on count
    const gridClass =
      count <= 3 ? 'grid-cols-1 md:grid-cols-3' :
      count === 4 ? 'grid-cols-2 lg:grid-cols-4' :
      count === 5 ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5' :
                   'grid-cols-2 md:grid-cols-3 xl:grid-cols-6';

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
                ${isPopular
                  ? 'border-indigo-300 shadow-lg shadow-indigo-100/70 ring-2 ring-indigo-200'
                  : 'border-slate-100 shadow-md hover:border-indigo-200'}`}
            >
              {/* Popular Badge */}
              {isPopular && (
                <div className="absolute -top-px left-0 right-0 flex justify-center">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-black px-5 py-1 rounded-b-xl flex items-center gap-1.5 shadow-md">
                    <Star className="w-3 h-3" fill="currentColor" />
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Top accent bar */}
              <div className={`h-1 w-full ${isPopular
                ? 'bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400'
                : 'bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400'}`}
              />

              <div className={`flex flex-col flex-1 p-5 ${isPopular ? 'pt-7' : 'pt-5'}`}>
                {/* Plan Name */}
                <div className="mb-3">
                  <h3 className="text-base font-black text-slate-800 tracking-tight truncate">{plan.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Global Deploy</span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4 pb-4 border-b border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900 tracking-tight">
                      {formatINR(plan.priceMonthly)}
                    </span>
                    <span className="text-slate-400 text-xs font-medium">/mo</span>
                  </div>
                </div>

                {/* Specs — compact rows */}
                <div className="flex flex-col gap-2.5 flex-1 mb-5">
                  {[
                    { icon: Cpu,         label: 'vCPU',    value: `${plan.vcpu} Cores` },
                    { icon: MemoryStick, label: 'RAM',     value: plan.ram },
                    { icon: HardDrive,   label: 'NVMe',    value: plan.storage },
                    { icon: Wifi,        label: 'Speed',   value: plan.portSpeed },
                    { icon: RotateCcw,   label: 'Backup',  value: plan.backups },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <div className={`p-1 rounded-md flex-shrink-0 ${isPopular ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-500'}`}>
                          <Icon size={11} />
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{label}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-700 text-right truncate">{value}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setSelectedPlan(plan)}
                  className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300
                    flex items-center justify-center gap-2 group-hover:gap-3
                    ${isPopular
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-300'
                      : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300'}`}
                >
                  Deploy
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  })()}

  {selectedPlan && (
    <ConfigurationModal
      plan={selectedPlan}
      isOpen={!!selectedPlan}
      type={type}
      onClose={() => setSelectedPlan(null)}
    />
  )}

   <RebuildVpsModal
      type={type}
    />
</div>

     </div>
   
  );
}
