import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Crown, 
  Bolt, 
  Rocket, 
  Globe, 
  Headphones, 
  Check, 
  ArrowRight,
  Server,
  Database,
  Code2
} from 'lucide-react';
import { usePhpPlans } from '../../../hooks/usePhpHosting';
import PhpConfigModal from './PhpConfigModal';

const PlanCard = ({ plan, onSelect }) => {
  const isPro = plan.name.toLowerCase().includes('pro') || plan.name.toLowerCase().includes('business');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative group h-full flex flex-col p-8 rounded-[2.5rem] transition-all duration-500 ${
        isPro 
          ? 'bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-2xl shadow-indigo-200 ring-4 ring-indigo-100' 
          : 'bg-white text-slate-900 border border-slate-100 hover:border-indigo-100 shadow-xl shadow-slate-200/50'
      }`}
    >
      {isPro && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
          Best Value
        </div>
      )}

      <div className="flex justify-between items-start mb-8">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isPro ? 'bg-white/10' : 'bg-indigo-50 text-indigo-600'}`}>
          {plan.type === 'html' ? <Code2 size={28} /> : plan.type === 'php' ? <Cpu size={28} /> : <Database size={28} />}
        </div>
        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${isPro ? 'bg-white/20' : 'bg-slate-100 text-slate-600'}`}>
          {plan.type.toUpperCase()}
        </div>
      </div>

      <h3 className="text-2xl font-black tracking-tight mb-2">{plan.name}</h3>
      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-4xl font-black tracking-tighter">₹{plan.price / 100}</span>
        <span className={`text-sm font-medium ${isPro ? 'text-indigo-100' : 'text-slate-500'}`}>/month</span>
      </div>

      <div className="space-y-4 mb-10 flex-grow">
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isPro ? 'bg-white/20' : 'bg-indigo-50 text-indigo-600'}`}>
            <Check size={12} strokeWidth={3} />
          </div>
          <span className="text-sm font-semibold">{plan.storage} Storage</span>
        </div>
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isPro ? 'bg-white/20' : 'bg-indigo-50 text-indigo-600'}`}>
            <Check size={12} strokeWidth={3} />
          </div>
          <span className="text-sm font-semibold">{plan.bandwidth} Bandwidth</span>
        </div>
        {plan.features.map((feature, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isPro ? 'bg-white/20' : 'bg-indigo-50 text-indigo-600'}`}>
              <Check size={12} strokeWidth={3} />
            </div>
            <span className="text-sm font-medium opacity-90">{feature}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => onSelect(plan)}
        className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
          isPro 
            ? 'bg-white text-indigo-600 hover:bg-indigo-50 active:scale-95 shadow-xl shadow-black/10' 
            : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-95 shadow-xl shadow-slate-200'
        }`}
      >
        Get Started
      </button>
    </motion.div>
  );
};

export default function PhpPlans() {
  const [activeTab, setActiveTab] = useState('php'); // html, php, mysql
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { data: plans, isLoading } = usePhpPlans();

  const filteredPlans = plans?.filter(p => p.type === activeTab) || [];

  const tabs = [
    { id: 'html', label: 'HTML Hosting', icon: Code2 },
    { id: 'php', label: 'PHP Hosting', icon: Cpu },
    { id: 'mysql', label: 'PHP + MySQL', icon: Database },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-indigo-100"
          >
            Premium PHP & HTML Hosting
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6">
            Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">launch your site</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            Blazing fast, secure, and reliable hosting for your web applications. Choose the plan that fits your needs.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                  : 'bg-white text-slate-500 hover:text-slate-900 border border-slate-100'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto gap-8">
          {isLoading ? (
            [1, 2].map(i => <div key={i} className="h-[500px] bg-white rounded-[2.5rem] animate-pulse border border-slate-100" />)
          ) : (
            <AnimatePresence mode="wait">
              {filteredPlans.map((plan) => (
                <PlanCard key={plan._id} plan={plan} onSelect={setSelectedPlan} />
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Features Grid */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: Zap, title: "Instant Deployment", desc: "Your site is live within seconds of DNS verification." },
            { icon: ShieldCheck, title: "Free SSL", desc: "Let's Encrypt SSL certificates included for all domains." },
            { icon: Server, title: "WordOps Powered", desc: "Optimized server stack for maximum performance." }
          ].map((f, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-indigo-600 shadow-xl shadow-slate-200 border border-slate-100 mx-auto mb-6">
                <f.icon size={32} />
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-3">{f.title}</h4>
              <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedPlan && (
        <PhpConfigModal 
          plan={selectedPlan} 
          onClose={() => setSelectedPlan(null)} 
        />
      )}
    </div>
  );
}
