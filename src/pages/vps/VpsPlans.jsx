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


<div className="max-w-7xl mx-auto px-6 py-16">
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
      High-performance NVMe VPS with dedicated resources. 
      Lightning-fast deployment in under 60 seconds.
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

  {/* Plans Grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {plans?.map((plan, index) => (
      <motion.div
        key={plan.id}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -12 }}
        className={`relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 group
          ${index === 1 ? 'scale-[1.04] border-indigo-200 shadow-2xl shadow-indigo-100/70 z-10' : ''}`}
      >
        {/* Popular Badge */}
        {index === 1 && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-8 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
            <Star className="w-4 h-4" fill="currentColor" />
            MOST POPULAR
          </div>
        )}

        <div className="p-8 pt-10">
          {/* Plan Name */}
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{plan.name}</h3>
            <div className="text-emerald-600 text-sm font-medium mt-2 flex items-center gap-2">
              <Globe size={16} />
              GLOBAL NODE DEPLOYMENT
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline mb-10">
            <span className="text-6xl font-black text-slate-900 tracking-tighter">
              {formatINR(plan.priceMonthly)}
            </span>
            <span className="text-slate-400 font-medium ml-3 text-lg">/month</span>
          </div>

          {/* Specs */}
          <div className="space-y-6 mb-12">
            <PlanIcon icon={Cpu} label="vCPU CORES" value={`${plan.vcpu} Cores`} />
            <PlanIcon icon={MemoryStick} label="RAM" value={plan.ram} />
            <PlanIcon icon={HardDrive} label="NVME SSD" value={plan.storage} />
            <PlanIcon icon={Wifi} label="PORT SPEED" value={plan.portSpeed} />
            <PlanIcon icon={RotateCcw} label="BACKUPS" value={plan.backups} />
          </div>

          {/* Button */}
          <Button
            fullWidth
            onClick={() => setSelectedPlan(plan)}
            className="py-4 text-base font-semibold rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:from-indigo-700 hover:via-violet-700 transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-xl group-hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            SELECT CONFIGURATION
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Decorative Bottom Bar */}
        <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />
      </motion.div>
    ))}
  </div>

  {selectedPlan && (
    <ConfigurationModal
      plan={selectedPlan}
      isOpen={!!selectedPlan}
      type = {type}
      onClose={() => setSelectedPlan(null)}
    />
  )}
</div>

     </div>
   
  );
}
