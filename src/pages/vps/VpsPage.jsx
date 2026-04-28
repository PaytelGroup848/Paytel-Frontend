import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Cpu, Database, HardDrive, Monitor, Terminal, X, 
  Zap, Server, ShieldCheck, Plus, Minus, Globe, 
  Network, RotateCcw, Lock, Check, Activity, BarChart3,
  Cloud, Users, Award, Play, Star, TrendingUp, Clock, MapPin
} from 'lucide-react';

const VPS_Page = () => {
  const [activeOS, setActiveOS] = useState('windows');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeCycle, setActiveCycle] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [popupOS, setPopupOS] = useState('ubuntu2404');
  const pricingRef = useRef(null);

  // OS options (scrollable in popup)
  const osOptions = [
    { id: 'ubuntu2404', name: 'Ubuntu 24.04 LTS', monthlyExtra: 0 },
    { id: 'ubuntu2204', name: 'Ubuntu 22.04', monthlyExtra: 0 },
    { id: 'debian12', name: 'Debian 12 Bookworm', monthlyExtra: 0 },
    { id: 'debian11', name: 'Debian 11 Bullseye', monthlyExtra: 0 },
    { id: 'rocky9', name: 'Rocky Linux 9', monthlyExtra: 0 },
    { id: 'almalinux9', name: 'AlmaLinux 9', monthlyExtra: 0 },
    { id: 'centos9', name: 'CentOS Stream 9', monthlyExtra: 0 },
    { id: 'fedora40', name: 'Fedora 40', monthlyExtra: 0 },
    { id: 'arch', name: 'Arch Linux', monthlyExtra: 0 },
    { id: 'alpine', name: 'Alpine Linux 3.19', monthlyExtra: 0 },
    { id: 'opensuse', name: 'openSUSE Leap 15.5', monthlyExtra: 0 },
    { id: 'windows2025', name: 'Windows Server 2025', monthlyExtra: 600 },
    { id: 'windows2022', name: 'Windows Server 2022', monthlyExtra: 600 },
    { id: 'kali', name: 'Kali Linux', monthlyExtra: 0 },
  ];

  const getMonthsFromDuration = (duration) => {
    const parts = duration.split(' ');
    const value = parseInt(parts[0], 10);
    if (parts[1].includes('Year')) return value * 12;
    if (parts[1].includes('Month')) return value;
    return 1;
  };

  // Video autoplay removed because we deleted video section, but keep hook if needed elsewhere
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoSectionRef = useRef(null);
  const isVideoInView = useInView(videoSectionRef, { once: false, amount: 0.5 });

  useEffect(() => {
    if (isVideoInView && videoRef.current && !isVideoPlaying) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else if (!isVideoInView && videoRef.current && isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  }, [isVideoInView, isVideoPlaying]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (selectedPlan) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedPlan]);

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

  // Animation variants
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
      
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[20%] w-[60%] h-[60%] bg-indigo-100/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-100/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-cyan-100/20 rounded-full blur-[90px] animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* 1. REFINED HERO BANNER with Video Background */}
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

      {/* 2. FEATURE HIGHLIGHTS */}
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

      {/* 3. PRICING SECTION (PLANS) */}
      <div ref={pricingRef} className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Choose Your Cloud Instance</h2>
          <div className="inline-flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm mt-4">
            {['windows', 'linux'].map((os) => (
              <button key={os} onClick={() => setActiveOS(os)} className={`flex items-center gap-2 px-6 md:px-10 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeOS === os ? 'bg-slate-950 text-white shadow-lg' : 'text-slate-400'}`}>
                {os === 'windows' ? <Monitor size={14}/> : <Terminal size={14}/>} {os}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vpsData[activeOS]?.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-white/80 backdrop-blur-sm rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col"
            >
              <div className="mb-6">
                <h3 className="text-xl font-black text-slate-800 mb-1">{plan.name}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Global Node Deployment</p>
              </div>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black tracking-tighter text-slate-950">₹{plan.pricing[0].perMonth}</span>
                <span className="text-slate-400 font-bold text-sm">/Mo</span>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
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

              <button onClick={() => setSelectedPlan(plan)} className="w-full py-4 bg-slate-100 text-slate-900 hover:bg-indigo-600 hover:text-white rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all">
                Select Configuration
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. NEW FACTS SECTION (replaces all removed content) */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10">
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
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <fact.icon size={28} className="text-indigo-600" />
              </div>
              <h4 className="text-2xl font-black text-indigo-600 mb-1">{fact.stat}</h4>
              <p className="font-bold text-slate-800 mb-1">{fact.title}</p>
              <p className="text-xs text-slate-400">{fact.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional fact row: badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {[
            "ISO 27001 Certified", "PCI DSS Compliant", "24/7 Enterprise Support",
            "Free DDoS Protection", "NVMe RAID 10", "1 Gbps Uplink"
          ].map((badge, i) => (
            <span key={i} className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-xs font-bold text-slate-600 border border-slate-200 shadow-sm">
              {badge}
            </span>
          ))}
        </div>
      </section>

      {/* 5. POPUP - Large, scrollable OS, light checkout button */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
              className="relative bg-white rounded-3xl w-[90vw] max-w-7xl h-[85vh] flex flex-col shadow-2xl overflow-hidden"
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

              {/* Scrollable content area - but we make OS list scrollable only */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* LEFT COLUMN: Plan specs */}
                  <div className="bg-slate-50 rounded-2xl p-5 h-fit sticky top-0">
                    <h5 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-4">Instance Specifications</h5>
                    <div className="space-y-4">
                      {[
                        { icon: Cpu, label: 'vCPU Cores', value: selectedPlan.vCPU },
                        { icon: Database, label: 'DDR4 RAM', value: selectedPlan.RAM },
                        { icon: HardDrive, label: 'NVMe Storage', value: selectedPlan.Storage },
                        { icon: Network, label: 'Port Speed', value: selectedPlan.Port },
                        { icon: RotateCcw, label: 'Backup Policy', value: selectedPlan.Backup }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-200 last:border-0">
                          <div className="flex items-center gap-3">
                            <item.icon size={18} className="text-indigo-500" />
                            <span className="text-xs font-bold text-slate-500 uppercase">{item.label}</span>
                          </div>
                          <span className="text-sm font-black text-slate-800">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT COLUMN: dynamic options */}
                  <div className="flex flex-col gap-6">
                    {/* OS Selection - Scrollable container */}
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-3">Operating System</label>
                      <div className="max-h-56 overflow-y-auto pr-2 custom-scrollbar">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {osOptions.map((os) => (
                            <button
                              key={os.id}
                              onClick={() => setPopupOS(os.id)}
                              className={`p-3 rounded-xl border-2 text-left transition-all ${
                                popupOS === os.id
                                  ? 'border-indigo-600 bg-indigo-50/30 ring-1 ring-indigo-200'
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

                    {/* Billing Cycle */}
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-3">Billing Tenure</label>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                        {selectedPlan.pricing.map((cycle) => (
                          <div
                            key={cycle.duration}
                            onClick={() => setActiveCycle(cycle)}
                            className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-wrap items-center justify-between gap-2 ${
                              activeCycle?.duration === cycle.duration
                                ? 'border-indigo-600 bg-indigo-50/20'
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

                    {/* Quantity */}
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <span className="text-xs font-black uppercase text-slate-500">Quantity</span>
                      <div className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 p-1">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100"><Minus size={14} /></button>
                        <span className="text-base font-black w-8 text-center">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100"><Plus size={14} /></button>
                      </div>
                    </div>

                    {/* Price Summary with light checkout button */}
                    <div className="mt-2 p-5 bg-slate-50 rounded-2xl border border-slate-200">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-slate-600">
                          <span>Plan Subtotal</span>
                          <span className="font-mono font-bold">₹{subtotal.toLocaleString()}</span>
                        </div>
                        {osExtra > 0 && (
                          <div className="flex justify-between text-slate-600">
                            <span>OS License Extra</span>
                            <span className="font-mono font-bold text-amber-600">+₹{osExtra.toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-slate-600 border-t border-slate-200 pt-2 mt-2">
                          <span>GST (18%)</span>
                          <span className="font-mono font-bold">₹{gst.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-lg font-black pt-2">
                          <span>Total Due</span>
                          <span className="text-indigo-600">₹{final.toLocaleString()}</span>
                        </div>
                      </div>
                      <button className="w-full mt-5 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-sm">
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
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};
export default VPS_Page;