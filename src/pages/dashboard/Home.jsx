import React, { useState } from 'react';
import { 
  Server, Globe, ShieldCheck, CreditCard, 
  PlusCircle, ArrowRight, LayoutGrid, 
  ExternalLink, Zap, Clock, ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  // Mock State: In a real app, this would come from your Auth/Database context
  const [user, setUser] = useState({
    name: "Aryan",
    balance: "45.00",
    // To test "Empty State", make this an empty array []
    activeServices: [
      { id: 1, type: 'WordPress', name: 'Portfolio Site', status: 'Active', ip: '192.168.1.1', expiry: 'Oct 2026', color: 'bg-blue-500' },
      { id: 2, type: 'Domain', name: 'cloudedata.io', status: 'Active', ip: '-', expiry: 'Jan 2027', color: 'bg-purple-500' },
      { id: 3, type: 'Cloud Hosting', name: 'Backend API', status: 'Processing', ip: 'Pending', expiry: 'Nov 2026', color: 'bg-emerald-500' },
    ]
  });

  const hasServices = user.activeServices.length > 0;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-100">
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-purple-200/30 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              CloudeData
            </h1>
            <p className="text-slate-500 font-medium">Dashboard &bull; {hasServices ? 'Manage Services' : 'Overview'}</p>
          </motion.div>

          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
              <Clock size={16} /> History
            </button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
            >
              <PlusCircle size={18} /> New Order
            </motion.button>
          </div>
        </header>

        <main className="space-y-8">
          
          <AnimatePresence mode="wait">
            {!hasServices ? (
              /* CASE 1: WELCOME BANNER (NO SERVICES) */
              <motion.section 
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative overflow-hidden rounded-[2.5rem] bg-white border border-white shadow-2xl shadow-slate-200/50 p-8 md:p-16"
              >
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest">
                      <Zap size={14} fill="currentColor" /> Welcome, {user.name}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                      Ready to launch your <span className="text-indigo-600">Digital Empire?</span>
                    </h2>
                    <p className="text-slate-500 text-lg font-medium leading-relaxed">
                      Deploy your first high-performance server or register a premium domain in under 60 seconds.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button onClick={() => window.location.href='/plans'} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">
                        View All Plans
                      </button>
                      <button className="px-8 py-4 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:border-indigo-200 transition-all">
                        Documentation
                      </button>
                    </div>
                  </div>
                  
                  {/* Decorative Visual */}
                  <div className="hidden md:block relative">
                    <div className="absolute inset-0 bg-indigo-500/10 blur-[80px] rounded-full animate-pulse" />
                    <div className="relative bg-white/40 backdrop-blur-md border border-white rounded-3xl p-6 shadow-xl rotate-3">
                      <div className="flex gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                      </div>
                      <div className="space-y-4">
                        <div className="h-4 w-2/3 bg-slate-100 rounded-full" />
                        <div className="h-20 w-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl" />
                        <div className="h-4 w-full bg-slate-100 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            ) : (
              /* CASE 2: ACTIVE SERVICES LIST */
              <motion.section 
                key="services"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                    <Server size={20} className="text-indigo-600" /> Your Active Services
                  </h3>
                  <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                    {user.activeServices.length} Total
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user.activeServices.map((service, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={service.id}
                      className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className={`w-12 h-12 ${service.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                          {service.type === 'Domain' ? <Globe size={20} /> : <Server size={20} />}
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                          service.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {service.status}
                        </span>
                      </div>
                      
                      <h4 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {service.name}
                      </h4>
                      <p className="text-sm text-slate-400 font-medium mb-4">{service.type}</p>
                      
                      <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-50">
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">IP Address</p>
                          <p className="text-xs font-black text-slate-700">{service.ip}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Renewal</p>
                          <p className="text-xs font-black text-slate-700">{service.expiry}</p>
                        </div>
                      </div>

                      <button className="w-full mt-2 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2">
                        Manage <ChevronRight size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* QUICK STATS / BILLING */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><CreditCard size={20}/></div>
                <h3 className="text-lg font-black">Account Overview</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Available Credit</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">${user.balance}</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Unpaid Invoices</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">0</p>
                </div>
                <button className="p-6 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all flex flex-col items-center justify-center shadow-lg shadow-indigo-100">
                  <PlusCircle size={24} className="mb-1" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Add Funds</span>
                </button>
              </div>
            </div>

            {/* UPCOMING EVENTS / NEWS */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
               <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-lg font-black mb-2">Cloud Pro Tips</h3>
                    <p className="text-indigo-100 text-sm leading-relaxed opacity-90">
                      Did you know? Switching to NVMe storage can increase your WordPress speed by up to 300%.
                    </p>
                  </div>
                  <button className="mt-6 flex items-center gap-2 text-sm font-bold bg-white/20 backdrop-blur-md w-fit px-4 py-2 rounded-lg hover:bg-white/30 transition-all">
                    Learn More <ExternalLink size={14} />
                  </button>
               </div>
               {/* Abstract background shape */}
               <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            </div>
          </section>

        </main>
      </div>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-8 py-10 text-center text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
        &copy; 2026 CloudeData Infrastructure &bull; All Systems Operational
      </footer>
    </div>
  );
};

export default Dashboard;