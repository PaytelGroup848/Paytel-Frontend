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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={`relative flex flex-col p-6 sm:p-8 rounded-[2rem] transition-all duration-300 w-full max-w-md mx-auto ${
        isPro 
          ? 'bg-gradient-to-b from-slate-900 to-indigo-950 text-white shadow-2xl shadow-indigo-950/20 ring-1 ring-indigo-500/30' 
          : 'bg-white text-slate-900 border border-slate-100 hover:border-indigo-100 shadow-xl shadow-slate-200/40'
      }`}
    >
      {isPro && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[11px] font-bold uppercase tracking-widest rounded-full shadow-md shadow-indigo-500/20">
          Best Value
        </div>
      )}

      <div className="flex justify-between items-start mb-6">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${isPro ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-indigo-50 text-indigo-600'}`}>
          {plan.type === 'html' ? <Code2 size={24} /> : plan.type === 'php' ? <Cpu size={24} /> : <Database size={24} />}
        </div>
        <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${isPro ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-100 text-slate-600'}`}>
          {plan.type.toUpperCase()}
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-2">{plan.name}</h3>
      
      <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-dashed border-slate-200/20">
        <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">₹{plan.price / 100}</span>
        <span className={`text-xs font-medium ${isPro ? 'text-slate-400' : 'text-slate-500'}`}>/month</span>
      </div>

      {/* Features List */}
      <div className="space-y-3.5 mb-8 flex-grow">
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isPro ? 'bg-indigo-500/20 text-indigo-400' : 'bg-emerald-50 text-emerald-600'}`}>
            <Check size={12} strokeWidth={3} />
          </div>
          <span className="text-sm font-medium">{plan.storage} Storage</span>
        </div>
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isPro ? 'bg-indigo-500/20 text-indigo-400' : 'bg-emerald-50 text-emerald-600'}`}>
            <Check size={12} strokeWidth={3} />
          </div>
          <span className="text-sm font-medium">{plan.bandwidth} Bandwidth</span>
        </div>
        {plan.features.map((feature, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isPro ? 'bg-indigo-500/20 text-indigo-400' : 'bg-emerald-50 text-emerald-600'}`}>
              <Check size={12} strokeWidth={3} />
            </div>
            <span className={`text-sm ${isPro ? 'text-slate-300' : 'text-slate-600'} font-normal`}>{feature}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => onSelect(plan)}
        className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 group/btn ${
          isPro 
            ? 'bg-indigo-600 text-white hover:bg-indigo-500 active:scale-[0.98] shadow-lg shadow-indigo-600/20' 
            : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98]'
        }`}
      >
        Get Started
        <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
      </button>
    </motion.div>
  );
};

export default function PhpPlans() {
  const [activeTab, setActiveTab] = useState('php'); 
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { data: plans, isLoading } = usePhpPlans();

  const filteredPlans = plans?.filter(p => p.type === activeTab) || [];

  const tabs = [
    { id: 'html', label: 'HTML Hosting', icon: Code2 },
    { id: 'php', label: 'PHP Hosting', icon: Cpu },
    { id: 'mysql', label: 'PHP + MySQL', icon: Database },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-slate-50 to-indigo-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-indigo-100/80"
          >
            <SparklesIcon size={12} className="text-indigo-600" />
            Premium PHP & HTML Hosting
          </motion.div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.15]">
            Everything you need to <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">launch your site</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Blazing fast, secure, and reliable hosting for your web applications. Choose the plan that fits your needs perfectly.
          </p>
        </div>

        {/* Dynamic Nav Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex flex-wrap sm:flex-nowrap p-1.5 bg-slate-100 rounded-2xl gap-1 w-full max-w-md sm:max-w-xl">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center justify-center gap-2.5 w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors duration-200 z-10 ${
                    isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <tab.icon size={16} />
                  <span>{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBackground"
                      className="absolute inset-0 bg-white rounded-xl shadow-md shadow-slate-200/80 -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ✅ Fixed: Centered cards with equal spacing using flex wrap */}
        <div className="flex flex-wrap justify-center gap-8 items-stretch">
          {isLoading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="w-full max-w-md h-[480px] bg-white rounded-[2rem] animate-pulse border border-slate-100 shadow-sm" />
            ))
          ) : (
            <AnimatePresence mode="wait">
              {filteredPlans.map((plan) => (
                <PlanCard key={plan._id} plan={plan} onSelect={setSelectedPlan} />
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Premium Features Grid */}
        <div className="mt-32 border-t border-slate-200/60 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12">
            {[
              { icon: Zap, title: "Instant Deployment", desc: "Your site is live within seconds of DNS verification without manual setup." },
              { icon: ShieldCheck, title: "Free SSL Certificates", desc: "Let's Encrypt SSL certificates automatically included and renewed for all domains." },
              { icon: Server, title: "WordOps Powered", desc: "Optimized enterprise-grade server stack calibrated for extreme loading speeds." }
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-lg shadow-slate-200/80 border border-slate-100 mb-5 transition-transform group-hover:scale-110">
                  <f.icon size={24} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h4>
                <p className="text-sm text-slate-500 font-normal leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
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

// Small missing helper icon for the badge
const SparklesIcon = ({ size, className }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);