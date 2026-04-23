import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Cpu, Database, HardDrive, Monitor, Terminal, X, 
  Zap, Server, ShieldCheck, Plus, Minus, Globe, 
  Network, RotateCcw, Lock, Check, Activity, BarChart3,
  Cloud, Users, Award, Play, Star
} from 'lucide-react';

const VPS_Page = () => {
  const [activeOS, setActiveOS] = useState('windows');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeCycle, setActiveCycle] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const pricingRef = useRef(null);

  // Video autoplay on scroll
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

      {/* 2. FEATURE HIGHLIGHTS (New Section) */}
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

      {/* 3. PRICING SECTION */}
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

      {/* 4. VIDEO SECTION - Autoplay on scroll */}
      <section ref={videoSectionRef} className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-2xl group"
        >
          <div className="relative aspect-video bg-black/10">
            <video
              ref={videoRef}
              src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-data-center-with-servers-3909-large.mp4"
              poster="https://images.pexels.com/photos/2881230/pexels-photo-2881230.jpeg?auto=compress&cs=tinysrgb&w=800"
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all">
                <Play size={24} className="text-white ml-1" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <p className="text-white font-bold text-lg">Next-Gen VPS Infrastructure</p>
            <p className="text-white/80 text-sm">Watch how CloudeData powers enterprise workloads</p>
          </div>
        </motion.div>
      </section>

      {/* 5. GLOBAL NETWORK MAP SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full mb-6">
              <Globe size={16} className="text-indigo-600" />
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Global Edge Network</span>
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-4">Deploy anywhere in the world</h3>
            <p className="text-slate-500 mb-6 leading-relaxed">
              Choose from 15+ data centers across North America, Europe, Asia, and Australia. Your VPS will be deployed in the location closest to your audience for minimal latency.
            </p>
            <div className="space-y-3">
              {[
                { region: "North America", cities: "Virginia, California, Toronto", latency: "< 10ms" },
                { region: "Europe", cities: "London, Frankfurt, Paris", latency: "< 15ms" },
                { region: "Asia Pacific", cities: "Singapore, Tokyo, Sydney", latency: "< 20ms" }
              ].map((region, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-white rounded-xl border border-slate-100">
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{region.region}</p>
                    <p className="text-[10px] text-slate-400">{region.cities}</p>
                  </div>
                  <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-2 py-1 rounded">{region.latency}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop"
              alt="Global Network"
              className="rounded-2xl shadow-xl w-full object-cover"
            />
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-black">15+ Locations</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-black text-slate-800">Trusted by 10,000+ Developers</h3>
          <p className="text-slate-500 text-sm mt-2">See what our customers say about CloudeData VPS</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Rahul Mehta", role: "CTO, TechStart", content: "The performance is unmatched. Our API response times dropped by 40% after migrating.", rating: 5 },
            { name: "Priya Sharma", role: "Lead DevOps", content: "Best VPS provider I've worked with. The control panel is intuitive and support is 24/7.", rating: 5 },
            { name: "Ankit Verma", role: "Freelancer", content: "Affordable pricing with enterprise-grade features. Highly recommended for startups.", rating: 5 }
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-600 text-sm italic mb-4">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{testimonial.name}</p>
                  <p className="text-xs text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. TECH STACK SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-10 text-white">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-black mb-2">Supported Technologies</h3>
            <p className="text-slate-400 text-sm"> first click to create website </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
            {["Docker", "Kubernetes", "Node.js", "Python", "MySQL", "MongoDB", "Redis", "Nginx", "Apache", "WordPress", "Laravel", "Next.js"].map((tech, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center hover:bg-white/20 transition-all">
                <span className="text-sm font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&auto=format')] opacity-10 object-cover" />
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-4">Ready to scale your infrastructure </h3>
            <p className="text-indigo-100 mb-8 max-w-lg mx-auto">Join thousands of businesses that trust CloudeData for their cloud needs.</p>
            <button onClick={() => pricingRef.current.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:shadow-xl transition-all">
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* 9. SLEEK POPUP - Responsive */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedPlan(null)} className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" />
            
            <motion.div initial={{ opacity: 0, y: 30, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.98 }}
              className="relative bg-white rounded-[2rem] w-full max-w-xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] max-h-[90vh] overflow-y-auto"
            >
              <div className="px-6 md:px-10 pt-8 pb-4 flex justify-between items-center sticky top-0 bg-white z-20">
                <div>
                  <h4 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">{selectedPlan.name}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Configure your deployment</p>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-indigo-600 transition-all"><Minus size={12}/></button>
                  <span className="text-sm font-black px-2">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-indigo-600 transition-all"><Plus size={12}/></button>
                </div>
              </div>

              <div className="px-6 md:px-10 pb-6 space-y-3">
                <label className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] block mb-4">Choose Billing Tenure</label>
                {selectedPlan.pricing.map((cycle, idx) => (
                  <div key={idx} onClick={() => setActiveCycle(cycle)}
                    className={`p-4 md:p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3
                      ${activeCycle?.duration === cycle.duration ? 'border-indigo-600 bg-indigo-50/20' : 'border-slate-50 bg-slate-50/50 hover:border-slate-200 hover:bg-white'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${activeCycle?.duration === cycle.duration ? 'border-indigo-600' : 'border-slate-200 group-hover:border-slate-400'}`}>
                        {activeCycle?.duration === cycle.duration && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />}
                      </div>
                      <div>
                        <p className="text-sm md:text-base font-black text-slate-800 tracking-tight">{cycle.duration}</p>
                        <p className="text-[10px] md:text-[11px] text-slate-500 font-bold">₹{cycle.perMonth.toLocaleString()}/mo</p>
                      </div>
                    </div>
                    <div className="text-right sm:text-left">
                      <p className="text-lg md:text-xl font-black text-slate-900 tracking-tighter">₹{cycle.total.toLocaleString()}</p>
                      {cycle.save !== "0%" && <span className="text-[8px] md:text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase">Save {cycle.save}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 md:p-8 bg-slate-950 text-white rounded-t-[2rem] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Final Amount</p>
                  <p className="text-3xl md:text-4xl font-black text-white tracking-tighter">₹{final.toLocaleString()}</p>
                </div>
                <button className="bg-indigo-600 text-white px-8 md:px-12 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-slate-950 transition-all shadow-2xl active:scale-95 w-full sm:w-auto">
                  Checkout
                </button>
              </div>

              <button onClick={() => setSelectedPlan(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors">
                <X size={22}/>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default VPS_Page;