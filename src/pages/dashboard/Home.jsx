import React, { useState, useEffect, useRef } from 'react';
import {
  Server, Globe, Activity, TrendingUp, Trash2, Layers, CheckCircle,
  Zap, ShieldCheck, ChevronRight, X, Database, Cpu, ShoppingCart, Play, Star,
  Award, Clock, Cloud, Code, Terminal
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const Dashboard = () => {
  const [user, setUser] = useState({
    name: "Aryan",
    activeServices: [
      { id: 1, type: 'WordPress', name: 'Portfolio Site', status: 'Active', ip: '192.168.1.1', expiry: 'Oct 2026', color: 'from-blue-500 to-blue-600' },
      { id: 2, type: 'Domain', name: 'cloudedata.io', status: 'Active', ip: '-', expiry: 'Jan 2027', color: 'from-purple-500 to-purple-600' },
      { id: 3, type: 'Cloud Hosting', name: 'Backend API', status: 'Processing', ip: 'Pending', expiry: 'Nov 2026', color: 'from-emerald-500 to-emerald-600' },
    ]
  });

  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [newService, setNewService] = useState({ type: 'WordPress', name: '' });
  const [activities, setActivities] = useState([
    { id: 1, action: 'Logged in to dashboard', timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: 2, action: 'Viewed service overview', timestamp: new Date(Date.now() - 1800000).toISOString() },
    { id: 3, action: 'Updated profile settings', timestamp: new Date(Date.now() - 900000).toISOString() },
  ]);

  // Video autoplay on scroll
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current && !isVideoPlaying) {
            videoRef.current.play();
            setIsVideoPlaying(true);
          } else if (!entry.isIntersecting && videoRef.current && isVideoPlaying) {
            videoRef.current.pause();
            setIsVideoPlaying(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [isVideoPlaying]);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const addActivity = (action) => {
    setActivities(prev => [{ id: Date.now(), action, timestamp: new Date().toISOString() }, ...prev].slice(0, 10));
  };

  const getServiceColor = (type) => {
    const colors = {
      'WordPress': 'from-blue-500 to-blue-600',
      'Domain': 'from-purple-500 to-purple-600',
      'Cloud Hosting': 'from-emerald-500 to-emerald-600'
    };
    return colors[type] || 'from-slate-500 to-slate-600';
  };

  const generateRandomIP = () => `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
  const futureDate = () => new Date(Date.now() + 31536000000).toLocaleString('default', { month: 'short', year: 'numeric' });

  const handleAddService = () => {
    if (!newService.name.trim()) return;
    const newId = Math.max(...user.activeServices.map(s => s.id), 0) + 1;
    const serviceData = {
      id: newId,
      type: newService.type,
      name: newService.name,
      status: 'Active',
      ip: newService.type === 'Domain' ? '-' : generateRandomIP(),
      expiry: futureDate(),
      color: getServiceColor(newService.type)
    };
    setUser(prev => ({ ...prev, activeServices: [...prev.activeServices, serviceData] }));
    addActivity(`Deployed ${newService.type}: ${newService.name}`);
    setNewService({ type: 'WordPress', name: '' });
    setIsNewOrderOpen(false);
  };

  const handleDeleteService = (id, name) => {
    if (window.confirm(`Delete "${name}"?`)) {
      setUser(prev => ({ ...prev, activeServices: prev.activeServices.filter(s => s.id !== id) }));
      addActivity(`Removed service: ${name}`);
    }
  };

  const formatRelativeTime = (ts) => {
    const diff = Date.now() - new Date(ts).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} min ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${Math.floor(hours / 24)} day(s) ago`;
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const stats = [
    { label: 'Total Services', value: user.activeServices.length, icon: Layers, change: '+2 this month', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Active', value: user.activeServices.filter(s => s.status === 'Active').length, icon: CheckCircle, change: 'All operational', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Monthly Spend', value: '$24.99', icon: TrendingUp, change: '+12% vs last month', color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const popularServices = [
    {
      name: 'WordPress Hosting',
      description: 'Optimized for speed & security. One-click install, automatic updates.',
      price: '$9.99/mo',
      image: 'https://elements-resized.envatousercontent.com/elements-cover-images/c004c39b-93ae-4ad6-8b96-04b19ef52481?w=433&cf_fit=scale-down&q=85&format=auto&s=b9caa37119964e85158a9cb4a2c83f1963e37c234978c705563bec9f196fce76',
      icon: Server,
      color: 'from-blue-500 to-blue-600',
      tag: 'Most Popular'
    },
    {
      name: 'Domain Registration',
      description: '.com, .io, .app & more. Free WHOIS privacy & SSL certificate.',
      price: '$12.99/yr',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGsfNQwZkun8MHM5dBNsidKAvt1VDWypaEvA&s',
      icon: Globe,
      color: 'from-purple-500 to-purple-600',
      tag: 'Limited Time'
    },
    {
      name: 'VPS Cloud Servers',
      description: 'KVM virtualization, SSD storage, full root access, 24/7 support.',
      price: '$19.99/mo',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=350&fit=crop',
      icon: Cpu,
      color: 'from-emerald-500 to-emerald-600',
      tag: 'Best Value'
    },
  ];

  // Free video URL (Pexels - data center stock video)
  const videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-futuristic-data-center-with-servers-3909-large.mp4";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 overflow-x-hidden">
      {/* Animated background blobs with parallax */}
      
      <motion.div style={{ y: y1 }} className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[20%] w-[60%] h-[60%] bg-indigo-100/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-100/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-cyan-100/20 rounded-full blur-[90px] animate-pulse" style={{ animationDelay: '4s' }} />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        
        {/* Header - completely empty for minimalism */}
        <header className="mb-8 h-0" />

        <main className="space-y-10">
          
          {/* Hero Banner - with enhanced animation */}
          <motion.section 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 shadow-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            
            <div className="relative p-6 md:p-8 text-white">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-3 max-w-2xl">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      {getGreeting()}
                    </span>
                  </motion.div>
                  <motion.h2 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl md:text-3xl font-black"
                  >
                    {user.name}, welcome to CloudeData.
                  </motion.h2>
                  <motion.p 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-indigo-100 leading-relaxed"
                  >
                    Your cloud infrastructure, reimagined. Deploy, scale, and manage with enterprise-grade reliability.
                  </motion.p>
                </div>
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-3"
                >
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
                    <ShieldCheck size={16} />
                    <span className="text-sm font-medium">99.99% Uptime</span>
                  </div>
                </motion.div>
              </div>
              
              {/* Agenda highlights */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 pt-5 border-t border-white/20 grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-all">
                    <Zap size={14} className="text-yellow-200" />
                  </div>
                  <span className="text-sm font-medium">Lightning-fast NVMe storage</span>
                </div>
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-all">
                    <Globe size={14} className="text-indigo-200" />
                  </div>
                  <span className="text-sm font-medium">Global edge network</span>
                </div>
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-all">
                    <ShieldCheck size={14} className="text-emerald-200" />
                  </div>
                  <span className="text-sm font-medium">Enterprise-grade security</span>
                </div>
              </motion.div>

              {user.activeServices.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-5 flex items-center gap-2 text-xs text-indigo-100 bg-white/10 rounded-lg px-3 py-2 w-fit backdrop-blur-sm"
                >
                  <Server size={14} />
                  <span className="font-medium">{user.activeServices.length} active resource{user.activeServices.length !== 1 ? 's' : ''} ready to scale.</span>
                </motion.div>
              )}
            </div>
          </motion.section>

          {/* Stats Cards - with stagger animation */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-5"
          >
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                    <p className="text-2xl font-black text-slate-800 mt-1">{stat.value}</p>
                    <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon size={20} className={stat.color} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Active Services Section - enhanced cards */}
          <section className="space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                  <Server size={22} className="text-indigo-600" /> 
                  Active Infrastructure
                </h2>
                <p className="text-sm text-slate-400 mt-0.5">Manage your deployed services</p>
              </div>
              <button
                onClick={() => setIsNewOrderOpen(true)}
                className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-xl transition-all duration-300"
              >
                <ShoppingCart size={15} /> Deploy new
              </button>
            </div>

            {user.activeServices.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center"
              >
                <Database size={48} className="text-slate-200 mx-auto mb-4" />
                <h3 className="text-lg font-black text-slate-700">No services deployed</h3>
                <p className="text-sm text-slate-400 mt-2 max-w-sm mx-auto">Get started by deploying your first server, domain, or WordPress instance.</p>
                <button onClick={() => setIsNewOrderOpen(true)} className="mt-5 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all">
                  Deploy Now
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {user.activeServices.map((service, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: idx * 0.05, type: "spring", stiffness: 200 }}
                      key={service.id}
                      whileHover={{ y: -8 }}
                      className="group bg-white rounded-xl border-2 border-slate-100 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 overflow-hidden"
                    >
                      <div className={`h-1.5 w-full bg-gradient-to-r ${service.color}`} />
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-4">
                          <motion.div 
                            whileHover={{ rotate: 5, scale: 1.05 }}
                            className={`w-11 h-11 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center text-white shadow-md`}
                          >
                            {service.type === 'Domain' ? <Globe size={18} /> : <Server size={18} />}
                          </motion.div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                              service.status === 'Active' 
                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                                : 'bg-amber-50 text-amber-600 border border-amber-100'
                            }`}>
                              {service.status === 'Active' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 align-middle animate-pulse" />}
                              {service.status}
                            </span>
                            <button 
                              onClick={() => handleDeleteService(service.id, service.name)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        
                        <h4 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                          {service.name}
                        </h4>
                        <p className="text-xs text-slate-400 font-medium mb-4">{service.type}</p>
                        
                        <div className="grid grid-cols-2 gap-3 py-3 border-t border-slate-100">
                          <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">IP Address</p>
                            <p className="text-xs font-mono font-medium text-slate-700">{service.ip}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Renewal</p>
                            <p className="text-xs font-medium text-slate-700">{service.expiry}</p>
                          </div>
                        </div>

                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => console.log(`Navigate to service: ${service.name}`)}
                          className="w-full mt-3 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                        >
                          Open Dashboard <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </section>

          {/* Popular Services Section - with hover video effect? not, just images */}
          <section className="space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                  <ShoppingCart size={22} className="text-indigo-600" /> 
                  Popular Services
                </h2>
                <p className="text-sm text-slate-400 mt-0.5">Deploy in minutes with our optimized solutions</p>
              </div>
              <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                View all →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {popularServices.map((service, idx) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -6 }}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm text-slate-700 shadow-sm">
                        {service.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <service.icon size={18} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800">{service.name}</h3>
                        <p className="text-xs text-slate-400">{service.price}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 mb-4 leading-relaxed">{service.description}</p>
                    <button
                      onClick={() => {
                        setNewService({ type: service.name.split(' ')[0], name: `My ${service.name.split(' ')[0]}` });
                        setIsNewOrderOpen(true);
                      }}
                      className="w-full py-2 border-2 border-indigo-200 text-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all"
                    >
                      Deploy Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Video Section - Autoplay on scroll */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-sm overflow-hidden group">
              <div className="relative h-64 overflow-hidden bg-black/5">
                <video
                  ref={videoRef}
                  src={videoUrl}
                  poster="https://images.pexels.com/photos/2881230/pexels-photo-2881230.jpeg?auto=compress&cs=tinysrgb&w=800"
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all">
                    <Play size={24} className="text-white ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Watch: CloudeData Infrastructure Tour
                </h3>
                <p className="text-sm text-slate-500 mt-1">See how we power thousands of businesses worldwide with our next-gen cloud platform.</p>
              </div>
            </div>

            {/* Testimonial Card with animation */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 text-sm italic">
                "The most reliable hosting provider I've ever used. Uptime is incredible and support responds within minutes."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold">
                  MK
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Michael K.</p>
                  <p className="text-xs text-slate-400">CTO, TechStart</p>
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* Activity Feed - with scroll animation */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 bg-amber-50 rounded-xl text-amber-600"><Activity size={20}/></div>
              <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
            </div>
            <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1 custom-scroll">
              {activities.map((activity, idx) => (
                <motion.div 
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="w-2 h-2 mt-2 rounded-full bg-indigo-400"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">{activity.action}</p>
                    <p className="text-xs text-slate-400">{formatRelativeTime(activity.timestamp)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </main>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="border-t border-slate-200/60 mt-12 pt-6 text-center"
        >
          <p className="text-xs text-slate-400 font-medium tracking-wide">
            &copy; 2026 CloudeData Infrastructure • All Systems Operational • 99.99% Uptime SLA
          </p>
        </motion.footer>
      </div>

      {/* Deploy Service Modal - with animation */}
      <AnimatePresence>
        {isNewOrderOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setIsNewOrderOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Deploy New Service</h3>
                  <p className="text-sm text-slate-400 mt-0.5">Choose your infrastructure</p>
                </div>
                <button onClick={() => setIsNewOrderOpen(false)} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Service Type</label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    {['WordPress', 'Domain', 'Cloud Hosting'].map(type => (
                      <button
                        key={type}
                        onClick={() => setNewService({ ...newService, type })}
                        className={`py-2 rounded-xl text-sm font-semibold transition-all ${
                          newService.type === type 
                            ? 'bg-indigo-600 text-white shadow-md' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Service Name</label>
                  <input
                    type="text"
                    placeholder={newService.type === 'Domain' ? 'e.g., mysite.com' : 'e.g., Production API'}
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddService()}
                    className="w-full mt-1 px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddService}
                  disabled={!newService.name.trim()}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Deploy Service
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Dashboard;