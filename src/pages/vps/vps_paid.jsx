import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, Zap, Copy, Activity, Search, 
  ChevronRight, Calendar, CreditCard,
  Cpu, Database, HardDrive, Terminal, 
  Globe, Plus, MoreHorizontal, ShieldCheck
} from 'lucide-react';

const VPSDashboard = () => {
  // VPS Data Array
  const vpsList = [
    {
      id: "kvm-01",
      name: "srv1596088.internal.cloud",
      plan: "Apex KVM 1",
      ip: "195.35.21.221",
      status: "Running",
      purchaseDate: "17 May 2024",
      expDate: "17 May 2026",
      os: { name: "Ubuntu 22.04", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo-ubuntu_cof-orange-hex.svg" },
      location: "Mumbai, IN",
      usage: { cpu: "12%", ram: "1.2/4GB" }
    },
    {
      id: "kvm-02",
      name: "node-master.deployment.io",
      plan: "Enterprise Cloud",
      ip: "103.21.55.12",
      status: "Running",
      purchaseDate: "10 Jan 2025",
      expDate: "10 Jan 2026",
      os: { name: "Debian 12", logo: "https://www.debian.org/logos/openlogo-nd-100.png" },
      location: "New York, US",
      usage: { cpu: "45%", ram: "8/16GB" }
    }
  ];

  // Redirect Function
  const handleManageClick = (vpsId) => {
    // Navigating to your specific path
    window.location.href = `http://localhost:5173/vps/vps_overview`;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 lg:p-20 font-sans text-slate-800">
      
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Infrastructure</h1>
          <p className="text-slate-500 font-medium mt-1 text-sm">Real-time status of your virtual fleet.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search instances..." 
              className="bg-white border border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-sm font-semibold outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95">
            <Plus size={18} /> New Server
          </button>
        </div>
      </div>

      {/* Vertical Cards Container */}
      <div className="max-w-6xl mx-auto flex flex-col gap-4">
        {vpsList.map((vps, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={vps.id}
            className="group bg-white border border-slate-200 rounded-[2rem] p-6 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col lg:flex-row lg:items-center gap-8 relative overflow-hidden"
          >
            {/* 1. OS & Primary Info */}
            <div className="flex items-center gap-5 lg:w-[25%]">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 shrink-0">
                <img src={vps.os.logo} alt="OS" className="w-7 h-7" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-black text-slate-900 tracking-tight truncate leading-tight mb-1">{vps.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{vps.ip}</span>
                </div>
              </div>
            </div>

            {/* 2. Specs & Usage */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 lg:flex-grow border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-8">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><CreditCard size={12}/> Plan</span>
                <span className="text-sm font-bold text-slate-800">{vps.plan}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Cpu size={12}/> CPU Load</span>
                <span className="text-sm font-bold text-slate-800">{vps.usage.cpu}</span>
              </div>
              <div className="hidden sm:flex flex-col gap-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Calendar size={12}/> Expiry</span>
                <span className="text-sm font-bold text-indigo-600">{vps.expDate}</span>
              </div>
            </div>

            {/* 3. Location & Quick Meta */}
            <div className="hidden xl:flex flex-col gap-1 lg:w-[15%]">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Globe size={12}/> Location</span>
              <span className="text-sm font-bold text-slate-800">{vps.location}</span>
            </div>

            {/* 4. Action Button */}
            <div className="flex items-center gap-3 shrink-0">
               <button 
                onClick={() => handleManageClick(vps.id)}
                className="flex-grow lg:flex-none px-6 py-3.5 bg-slate-50 text-slate-900 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-900 hover:text-white transition-all duration-300"
               >
                 Dashnoard <ChevronRight size={18} />
               </button>
               
            </div>

            {/* Subtle Progress Background */}
            <div className="absolute bottom-0 left-0 h-1 bg-indigo-500/10 w-full">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: vps.usage.cpu }}
                className="h-full bg-indigo-500/40"
              />
            </div>
          </motion.div>
        ))}

        {/* Empty State / Add New */}
        <div className="mt-4 border-2 border-dashed border-slate-200 rounded-[2rem] p-8 flex items-center justify-center group hover:border-indigo-300 transition-all cursor-pointer">
           <p className="text-sm font-bold text-slate-400 group-hover:text-indigo-600 flex items-center gap-2">
             <Plus size={18} /> Register another instance to this cluster
           </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="max-w-6xl mx-auto mt-12 flex justify-between items-center text-[11px] font-bold text-slate-300 uppercase tracking-[0.2em]">
         <span>System Status: Optimal</span>
         <span>v2.4.0-stable</span>
      </div>
    </div>
  );
};

export default VPSDashboard;