import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, Database, HardDrive, Monitor, Terminal, X,
  Zap, Server, ShieldCheck, Plus, Minus, Globe,
  Network, RotateCcw, Lock, Check, Activity,
  Cloud, TrendingUp, Clock, MapPin, ArrowRight
} from 'lucide-react';
import VpsPlans from './VpsPlans';

const VPS_Page = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeCycle, setActiveCycle] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [popupOS, setPopupOS] = useState('ubuntu2404');
  const pricingRef = useRef(null);

  const osOptions = [
    { id: 'ubuntu2404', name: 'Ubuntu 24.04 LTS', monthlyExtra: 0 },
    { id: 'ubuntu2204', name: 'Ubuntu 22.04', monthlyExtra: 0 },
    { id: 'debian12', name: 'Debian 12 Bookworm', monthlyExtra: 0 },
    { id: 'windows2025', name: 'Windows Server 2025', monthlyExtra: 600 },
    { id: 'windows2022', name: 'Windows Server 2022', monthlyExtra: 600 },
  ];

  const getMonthsFromDuration = (duration) => {
    const parts = duration.split(' ');
    const value = parseInt(parts[0], 10);
    if (parts[1].includes('Year')) return value * 12;
    if (parts[1].includes('Month')) return value;
    return 1;
  };

  useEffect(() => {
    document.body.style.overflow = selectedPlan ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedPlan]);

  useEffect(() => {
    if (selectedPlan) {
      setActiveCycle(selectedPlan.pricing[0]);
      setQuantity(1);
      setPopupOS('ubuntu2404');
    }
  }, [selectedPlan]);

  const calculateTotals = () => {
    if (!activeCycle) return { subtotal: 0, osExtra: 0, gst: 0, final: 0 };
    const baseTotal = activeCycle.total * quantity;
    const selectedOS = osOptions.find(os => os.id === popupOS);
    const months = getMonthsFromDuration(activeCycle.duration);
    const osExtraTotal = (selectedOS?.monthlyExtra || 0) * quantity * months;
    const subtotal = baseTotal + osExtraTotal;
    const gst = subtotal * 0.18;
    const final = subtotal + gst;
    return { subtotal, osExtra: osExtraTotal, gst, final };
  };

  const { subtotal, osExtra, gst, final } = calculateTotals();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/30 font-sans text-slate-900 selection:bg-indigo-100 overflow-x-hidden antialiased">
      {/* Soft blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[30%] -left-[20%] w-[60%] h-[60%] bg-indigo-200/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-200/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-cyan-200/20 rounded-full blur-[90px]" />
      </div>

      {/* ─── Light Hero ─── */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pt-14 md:pt-20 pb-10">
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
                High‑performance{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  virtual servers
                </span>
              </h1>
              <p className="text-lg text-slate-500 max-w-xl mb-8 font-medium leading-relaxed">
                Deploy in <span className="text-slate-700 font-bold">60 seconds</span> on enterprise NVMe storage.
                Root access, global data centres, and 24/7 expert support – all included.
              </p>
              <button
                onClick={() => pricingRef.current.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-sm tracking-wide hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xl shadow-indigo-200/50"
              >
                View Plans & Pricing
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right card – now light */}
            <div className="flex-1 w-full max-w-md lg:max-w-none">
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl shadow-indigo-100/50 border border-indigo-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-white pointer-events-none" />
                <div className="relative z-10 grid grid-cols-2 gap-4">
                  {[
                    { icon: Cpu, label: 'vCPU', value: 'Up to 12' },
                    { icon: Database, label: 'RAM', value: 'Up to 48 GB' },
                    { icon: HardDrive, label: 'NVMe', value: 'Up to 500 GB' },
                    { icon: Globe, label: 'Locations', value: '15+ worldwide' },
                  ].map((spec, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                      <spec.icon className="text-indigo-600 mb-2" size={24} />
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{spec.label}</p>
                      <p className="text-xl font-black text-slate-800">{spec.value}</p>
                    </div>
                  ))}
                </div>
                <Cloud size={180} className="absolute -bottom-10 -right-10 text-indigo-100/40 rotate-12" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features – slightly softer colors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { icon: Zap, title: "Instant Setup", desc: "Servers provisioned in under 60 seconds.", color: "from-amber-400 to-orange-500" },
            { icon: Activity, title: "99.9% Uptime", desc: "Enterprise SLA for all business nodes.", color: "from-emerald-400 to-teal-500" },
            { icon: Globe, title: "Global Network", desc: "15+ locations worldwide for low latency.", color: "from-blue-400 to-cyan-500" },
            { icon: Lock, title: "DDoS Protection", desc: "Included standard on all instances.", color: "from-purple-400 to-pink-500" }
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 text-white shadow-md`}>
                <feature.icon size={22} />
              </div>
              <h4 className="font-extrabold text-slate-800 mb-2">{feature.title}</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Plans – dynamic component */}
      <div ref={pricingRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <VpsPlans onSelectPlan={setSelectedPlan} />
      </div>

      {/* Why section – clean and light */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 mb-3">Why CloudeData VPS?</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Industry‑leading performance, security, and global reach</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Zap, title: "99.99% Uptime SLA", desc: "Our network is backed by redundant power and fibre.", stat: "99.99%" },
            { icon: Clock, title: "Instant Deployment", desc: "Your server is ready in under 60 seconds.", stat: "< 60s" },
            { icon: MapPin, title: "Global Data Centers", desc: "15+ locations across 4 continents.", stat: "15+" },
            { icon: TrendingUp, title: "Petabyte‑Scale", desc: "Handle massive traffic with ease.", stat: "∞ Scalable" }
          ].map((fact, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <fact.icon size={28} className="text-indigo-600" />
              </div>
              <h4 className="text-2xl font-black text-indigo-600 mb-1">{fact.stat}</h4>
              <p className="font-bold text-slate-800 mb-1">{fact.title}</p>
              <p className="text-xs text-slate-400">{fact.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {[
            "ISO 27001 Certified", "PCI DSS Compliant", "24/7 Enterprise Support",
            "Free DDoS Protection", "NVMe RAID 10", "1 Gbps Uplink"
          ].map((badge, i) => (
            <span key={i} className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-xs font-bold text-slate-600 border border-slate-200 shadow-sm">
              {badge}
            </span>
          ))}
        </div>
      </section>

      {/* Configuration Popup (unchanged logic, only minor color tweaks) */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlan(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-3xl w-[95vw] max-w-6xl h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-slate-100 shrink-0">
                <div>
                  <h4 className="text-2xl font-black text-slate-900">{selectedPlan.name}</h4>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Configure your cloud instance</p>
                </div>
                <button onClick={() => setSelectedPlan(null)} className="text-slate-400 hover:text-slate-800 transition-colors p-2">
                  <X size={24} />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* OS Selection */}
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-3">Operating System</label>
                    <div className="space-y-1 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {osOptions.map((os) => (
                          <button
                            key={os.id}
                            onClick={() => setPopupOS(os.id)}
                            className={`p-3 rounded-xl border-2 text-left transition-all ${
                              popupOS === os.id
                                ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-200'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-slate-800">{os.name}</span>
                              {os.monthlyExtra > 0 && (
                                <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                                  +₹{os.monthlyExtra}/mo
                                </span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Billing, Quantity, Summary */}
                  <div className="flex flex-col gap-6">
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-3">Billing Tenure</label>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                        {selectedPlan.pricing.map((cycle) => (
                          <div
                            key={cycle.duration}
                            onClick={() => setActiveCycle(cycle)}
                            className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-wrap items-center justify-between gap-2 ${
                              activeCycle?.duration === cycle.duration
                                ? 'border-indigo-600 bg-indigo-50/30'
                                : 'border-slate-100 bg-slate-50/30 hover:border-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${activeCycle?.duration === cycle.duration ? 'border-indigo-600' : 'border-slate-300'}`}>
                                {activeCycle?.duration === cycle.duration && <div className="w-2 h-2 bg-indigo-600 rounded-full" />}
                              </div>
                              <div>
                                <p className="text-sm font-black text-slate-800">{cycle.duration}</p>
                                <p className="text-[10px] text-slate-500">₹{cycle.perMonth.toLocaleString()}/mo</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-base font-black text-slate-900">₹{cycle.total.toLocaleString()}</p>
                              {cycle.save !== "0%" && <span className="text-[8px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Save {cycle.save}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <span className="text-xs font-black uppercase text-slate-500">Quantity</span>
                      <div className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 p-1">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100"><Minus size={14} /></button>
                        <span className="text-base font-black w-8 text-center">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100"><Plus size={14} /></button>
                      </div>
                    </div>

                    <div className="mt-2 p-5 bg-slate-50 rounded-2xl border border-slate-200">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-slate-600"><span>Plan Subtotal</span><span className="font-mono font-bold">₹{subtotal.toLocaleString()}</span></div>
                        {osExtra > 0 && <div className="flex justify-between text-slate-600"><span>OS License Extra</span><span className="font-mono font-bold text-amber-600">+₹{osExtra.toLocaleString()}</span></div>}
                        <div className="flex justify-between text-slate-600 border-t border-slate-200 pt-2 mt-2"><span>GST (18%)</span><span className="font-mono font-bold">₹{gst.toLocaleString()}</span></div>
                        <div className="flex justify-between text-lg font-black pt-2"><span>Total Due</span><span className="text-indigo-600">₹{final.toLocaleString()}</span></div>
                      </div>
                      <button className="w-full mt-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-indigo-200">
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default VPS_Page;