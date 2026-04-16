import React from 'react';
import { LayoutGrid, Server, Globe, ShieldCheck, CreditCard, PlusCircle, ArrowRight } from 'lucide-react';

const Home = () => {
  // Mock data for scalability
  const features = [
    { title: 'Cloud Hosting', icon: <Server size={20} />, desc: 'High-performance scalable nodes.' },
    { title: 'Domain Names', icon: <Globe size={20} />, desc: 'Register your unique identity.' },
    { title: 'Security Pack', icon: <ShieldCheck size={20} />, desc: 'SSL & DDoS protection.' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 font-sans p-4 md:p-8">
      {/* Header Section */}
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">
            CloudeData
          </h1>
          <p className="text-sm text-slate-500">Welcome back, User</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2">
          <PlusCircle size={18} /> New Order
        </button>
      </header>

      <main className="max-w-7xl mx-auto space-y-8">
        
        {/* Empty State / Hero Section */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-[#0f111a] to-black p-8 md:p-12">
          {/* Glassmorphism Decorative Circles */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg space-y-4 text-center md:text-left">
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                Getting Started
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                Ready to launch your <span className="text-indigo-400">Digital Empire?</span>
              </h2>
              <p className="text-slate-400 text-lg">
                You don't have any active hosting plans. Start with our optimized cloud infrastructure and scale as you grow.
              </p>
              <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                <button className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                  Choose a Plan
                </button>
                <button className="bg-slate-800/50 backdrop-blur-md border border-white/10 px-8 py-3 rounded-xl font-bold hover:bg-slate-700 transition-colors">
                  Setup Domain
                </button>
              </div>
            </div>

            {/* Visual Element (Abstract Dashboard Preview) */}
            <div className="w-full max-w-sm aspect-video rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 w-3/4 bg-white/10 rounded"></div>
                <div className="h-4 w-1/2 bg-white/10 rounded"></div>
                <div className="h-20 w-full bg-indigo-500/20 rounded-xl border border-indigo-500/30 flex items-center justify-center">
                  <span className="text-indigo-300 text-xs">Awaiting Activation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid (Upselling) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <div key={idx} className="group p-6 rounded-2xl border border-white/5 bg-[#12141c] hover:bg-[#161925] transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm mb-4">{item.desc}</p>
              <div className="flex items-center text-xs font-bold text-indigo-400 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                EXPLORE <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions / Billing */}
        <section className="rounded-2xl border border-white/5 bg-[#12141c] p-6">
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
            <CreditCard className="text-slate-400" />
            <h3 className="text-lg font-medium">Billing & Management</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-white/5 border border-dashed border-white/10 hover:border-indigo-500/50 transition-colors">
              <p className="text-xs text-slate-500 uppercase">Current Balance</p>
              <p className="text-xl font-bold text-white mt-1">$0.00</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-dashed border-white/10">
              <p className="text-xs text-slate-500 uppercase">Active Services</p>
              <p className="text-xl font-bold text-white mt-1">0</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-dashed border-white/10">
              <p className="text-xs text-slate-500 uppercase">Expiring Soon</p>
              <p className="text-xl font-bold text-white mt-1">None</p>
            </div>
            <button className="p-4 rounded-xl bg-indigo-600/10 border border-indigo-600/20 text-indigo-400 hover:bg-indigo-600/20 transition-colors flex items-center justify-center font-bold">
              Add Funds
            </button>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;