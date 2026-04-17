import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Database, HardDrive, Monitor, Terminal, X, 
  Zap, Server, ShieldCheck, Plus, Minus, Globe, 
  Network, RotateCcw, Lock, Check, Activity, BarChart3
} from 'lucide-react';

const VPSPricing = () => {
  const [activeOS, setActiveOS] = useState('windows');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeCycle, setActiveCycle] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const pricingRef = useRef(null);

  const vpsData = {
    windows: [
      { 
        id: 'w-basic', name: 'Cloud Starter', vCPU: '1', RAM: '2 GB', Storage: '40 GB', Port: '1 Gbps', Backup: 'Weekly',
        pricing: [
          { duration: '4 Years', total: 38400, perMonth: 800, save: '50%' },
          { duration: '3 Years', total: 32400, perMonth: 900, save: '40%' },
          { duration: '2 Years', total: 24000, perMonth: 1000, save: '33%' },
          { duration: '1 Year', total: 15000, perMonth: 1250, save: '15%' },
          { duration: '1 Month', total: 1600, perMonth: 1600, save: '0%' },
        ]
      },
      { 
        id: 'w-standard', name: 'Business Pro', vCPU: '4', RAM: '8 GB', Storage: '120 GB', Port: '2 Gbps', Backup: 'Daily',
        pricing: [
          { duration: '4 Years', total: 105600, perMonth: 2200, save: '55%' },
          { duration: '3 Years', total: 90000, perMonth: 2500, save: '45%' },
          { duration: '2 Years', total: 67200, perMonth: 2800, save: '35%' },
          { duration: '1 Year', total: 39600, perMonth: 3300, save: '15%' },
          { duration: '1 Month', total: 4500, perMonth: 4500, save: '0%' },
        ]
      },
      { 
        id: 'w-premium', name: 'Enterprise Max', vCPU: '8', RAM: '32 GB', Storage: '300 GB', Port: '10 Gbps', Backup: 'Hourly',
        pricing: [
          { duration: '4 Years', total: 336000, perMonth: 7000, save: '50%' },
          { duration: '3 Years', total: 288000, perMonth: 8000, save: '40%' },
          { duration: '2 Years', total: 216000, perMonth: 9000, save: '25%' },
          { duration: '1 Year', total: 120000, perMonth: 10000, save: '15%' },
          { duration: '1 Month', total: 14000, perMonth: 14000, save: '0%' },
        ]
      }
    ],
    linux: [
      { 
        id: 'l-starter', name: 'Dev Starter', vCPU: '2', RAM: '4 GB', Storage: '80 GB', Port: '1 Gbps', Backup: 'Weekly',
        pricing: [
          { duration: '4 Years', total: 23952, perMonth: 499, save: '45%' },
          { duration: '3 Years', total: 19764, perMonth: 549, save: '35%' },
          { duration: '2 Years', total: 14376, perMonth: 599, save: '25%' },
          { duration: '1 Year', total: 8988, perMonth: 749, save: '15%' },
          { duration: '1 Month', total: 999, perMonth: 999, save: '0%' },
        ]
      },
      { 
        id: 'l-pro', name: 'App Engine', vCPU: '4', RAM: '16 GB', Storage: '160 GB', Port: '5 Gbps', Backup: 'Daily',
        pricing: [
          { duration: '4 Years', total: 47952, perMonth: 999, save: '50%' },
          { duration: '3 Years', total: 39564, perMonth: 1099, save: '40%' },
          { duration: '2 Years', total: 28776, perMonth: 1199, save: '30%' },
          { duration: '1 Year', total: 17988, perMonth: 1499, save: '15%' },
          { duration: '1 Month', total: 2100, perMonth: 2100, save: '0%' },
        ]
      },
      { 
        id: 'l-ultra', name: 'Master Node', vCPU: '12', RAM: '48 GB', Storage: '500 GB', Port: '10 Gbps', Backup: 'Hourly',
        pricing: [
          { duration: '4 Years', total: 95952, perMonth: 1999, save: '55%' },
          { duration: '3 Years', total: 79164, perMonth: 2199, save: '45%' },
          { duration: '2 Years', total: 57576, perMonth: 2399, save: '35%' },
          { duration: '1 Year', total: 35988, perMonth: 2999, save: '15%' },
          { duration: '1 Month', total: 4000, perMonth: 4000, save: '0%' },
        ]
      }
    ]
  };

  useEffect(() => {
    if (selectedPlan) {
      setActiveCycle(selectedPlan.pricing[0]);
      setQuantity(1);
    }
  }, [selectedPlan]);

  const calculateTotals = () => {
    const unitPrice = activeCycle?.total || 0;
    return { final: unitPrice * quantity };
  };

  const { final } = calculateTotals();

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-indigo-100 overflow-x-hidden">
      
      {/* 1. REFINED HERO BANNER */}
      <section className="px-4 py-6 md:px-10 md:py-10">
        <div className="max-w-7xl mx-auto bg-slate-950 rounded-[2.5rem] overflow-hidden relative shadow-2xl">
          <div className="grid md:grid-cols-2 items-center">
            {/* Left Side */}
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

            {/* Right Side (Image) */}
            <div className="relative h-full min-h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1200" 
                alt="Datacenter" 
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRICING SECTION */}
      <div ref={pricingRef} className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Choose Your Cloud Instance</h2>
            <div className="inline-flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm mt-4">
                {['windows', 'linux'].map((os) => (
                    <button key={os} onClick={() => setActiveOS(os)} className={`flex items-center gap-2 px-10 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeOS === os ? 'bg-slate-950 text-white shadow-lg' : 'text-slate-400'}`}>
                        {os === 'windows' ? <Monitor size={14}/> : <Terminal size={14}/>} {os}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vpsData[activeOS]?.map((plan) => (
            <div key={plan.id} className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col">
              <div className="mb-8">
                <h3 className="text-xl font-black text-slate-800 mb-1">{plan.name}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Global Node Deployment</p>
              </div>
              
              <div className="flex items-baseline gap-1 mb-10">
                <span className="text-5xl font-black tracking-tighter text-slate-950">₹{plan.pricing[0].perMonth}</span>
                <span className="text-slate-400 font-bold text-sm">/Mo</span>
              </div>

              <div className="space-y-4 mb-12 flex-grow">
                {[
                  { icon: Cpu, label: 'vCPU Cores', val: plan.vCPU },
                  { icon: Database, label: 'DDR4 RAM', val: plan.RAM },
                  { icon: HardDrive, label: 'NVMe Storage', val: plan.Storage },
                  { icon: Network, label: 'Port Speed', val: plan.Port },
                  { icon: RotateCcw, label: 'Backups', val: plan.Backup }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-slate-600">
                    <div className="flex items-center gap-3"><item.icon size={16} className="text-indigo-500"/> <span className="text-[11px] font-bold uppercase text-slate-400">{item.label}</span></div>
                    <span className="text-sm font-black text-slate-800">{item.val}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => setSelectedPlan(plan)} className="w-full py-5 bg-slate-100 text-slate-900 hover:bg-indigo-600 hover:text-white rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all">
                Select Configuration
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. NEW CONTENT SECTION: WHY US */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-200">
        <div className="grid md:grid-cols-4 gap-10">
            {[
                { icon: Zap, title: "Instant Setup", desc: "Servers are provisioned in less than 60 seconds." },
                { icon: Activity, title: "99.9% Uptime", desc: "Enterprise SLA guaranteed for all business nodes." },
                { icon: Globe, title: "Global Network", desc: "Choose from 15+ locations worldwide for low latency." },
                { icon: Lock, title: "DDoS Protection", desc: "Included as standard on all our cloud instances." }
            ].map((f, i) => (
                <div key={i} className="text-center md:text-left">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0"><f.icon size={24}/></div>
                    <h4 className="font-black text-slate-900 mb-2">{f.title}</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{f.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* 4. SLEEK POPUP (Refined Cards & Size) */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedPlan(null)} className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" />
            
            <motion.div initial={{ opacity: 0, y: 30, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.98 }}
              className="relative bg-white rounded-[3rem] w-full max-w-xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]"
            >
              {/* Header with Compact Quantity */}
              <div className="px-10 pt-10 pb-6 flex justify-between items-center">
                <div>
                  <h4 className="text-2xl font-black text-slate-900 tracking-tight">{selectedPlan.name}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Configure your deployment</p>
                </div>
                
                <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-indigo-600 transition-all"><Minus size={12}/></button>
                    <span className="text-sm font-black px-2">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-indigo-600 transition-all"><Plus size={12}/></button>
                </div>
              </div>

              {/* Refined Billing Cards (Larger Font, Cleaner Padding) */}
              <div className="px-10 pb-8 space-y-3 overflow-y-auto max-h-[45vh] no-scrollbar">
                <label className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] block mb-4">Choose Billing Tenure</label>
                {selectedPlan.pricing.map((cycle, idx) => (
                  <div key={idx} onClick={() => setActiveCycle(cycle)}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between group
                      ${activeCycle?.duration === cycle.duration ? 'border-indigo-600 bg-indigo-50/20' : 'border-slate-50 bg-slate-50/50 hover:border-slate-200 hover:bg-white'}`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${activeCycle?.duration === cycle.duration ? 'border-indigo-600' : 'border-slate-200 group-hover:border-slate-400'}`}>
                        {activeCycle?.duration === cycle.duration && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />}
                      </div>
                      <div>
                          <p className="text-base font-black text-slate-800 tracking-tight">{cycle.duration}</p>
                          <p className="text-[11px] text-slate-500 font-bold">₹{cycle.perMonth.toLocaleString()}/mo</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-slate-900 tracking-tighter">₹{cycle.total.toLocaleString()}</p>
                      {cycle.save !== "0%" && <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase">Save {cycle.save}</span>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkout Footer (Refined) */}
              <div className="p-10 bg-slate-950 text-white rounded-t-[3rem] flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Final Amount</p>
                  <p className="text-4xl font-black text-white tracking-tighter">₹{final.toLocaleString()}</p>
                </div>
                <button className="bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-slate-950 transition-all shadow-2xl active:scale-95">
                  Checkout
                </button>
              </div>

              {/* Close Button Top Right */}
              <button onClick={() => setSelectedPlan(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors">
                <X size={24}/>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default VPSPricing;