import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, Database, HardDrive, Monitor, Terminal, X,
  Zap, Server, ShieldCheck, Plus, Minus, Globe,
  Network, RotateCcw, Lock, Check, Activity,
  Cloud, Users, Award, Star, TrendingUp, Clock, MapPin
} from 'lucide-react';

const VPS_Page = () => {
  const [activeOS, setActiveOS] = useState('windows');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeCycle, setActiveCycle] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [popupOS, setPopupOS] = useState('ubuntu2404');
  const pricingRef = useRef(null);

  // OS options (unchanged)
  const osOptions = [
    ...(activeOS === "windows"
      ? [
          { id: 'windows2025', name: 'Windows Server 2025', monthlyExtra: 600 },
          { id: 'windows2022', name: 'Windows Server 2022', monthlyExtra: 600 },
        ]
      : [
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
          { id: 'opensuse', name: 'openSUSE Leap 15.5', monthlyExtra: 0 }
        ]),
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

  const vpsData = { /* ...vahi same data... */ };
  // (main data unchanged – I'll keep it exactly as provided)

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 font-sans text-slate-900 selection:bg-indigo-100 overflow-x-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[20%] w-[60%] h-[60%] bg-indigo-100/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-100/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-cyan-100/20 rounded-full blur-[90px] animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* 1. 🆕 REPLACED HERO – No video, clean gradient card with stats */}
      <section className="px-4 py-10 md:px-10 md:py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[2.5rem] p-10 md:p-16 text-center md:text-left shadow-2xl shadow-indigo-500/10 overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-600/20 via-transparent to-transparent" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                  <Server className="text-indigo-400" size={28} />
                  <span className="text-[11px] font-black text-indigo-300 uppercase tracking-[0.3em]">
                    Cloud VPS Hosting
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6">
                  Deploy your{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
                    virtual server
                  </span>{' '}
                  in seconds.
                </h1>
                <p className="text-slate-400 text-base md:text-lg max-w-md mb-8 font-medium">
                  High‑performance NVMe VPS with root access, global data centres, and 24/7 support.
                </p>
                <button
                  onClick={() => pricingRef.current.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20"
                >
                  View Plans & Pricing
                </button>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap justify-center md:justify-end gap-6">
                {[
                  { icon: Zap, value: '60s', label: 'Deploy' },
                  { icon: ShieldCheck, value: '99.99%', label: 'Uptime' },
                  { icon: Globe, value: '15+', label: 'Locations' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 text-center w-28 border border-white/10">
                    <stat.icon className="text-indigo-400 mx-auto mb-2" size={24} />
                    <p className="text-xl font-black text-white">{stat.value}</p>
                    <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURE HIGHLIGHTS */}
      {/* ... (exactly same as previous code, no changes) ... */}
      {/* 3. PRICING SECTION */}
      {/* ... (same) ... */}
      {/* 4. WHY CLOUDEDATA VPS? */}
      {/* ... (same) ... */}
      {/* 5. POPUP */}
      {/* ... (same) ... */}

      {/* (Baaki sections unchanged – maine sirf hero replace kiya hai) */}
      {/* Baaki code copy karna ho toh pichhle response se le sakte hain, woh intact hai */}
    </div>
  );
};

export default VPS_Page;