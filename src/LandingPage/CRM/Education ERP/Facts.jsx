import React, { useEffect, useRef, useState } from 'react';
import { Users, GraduationCap, Building2, Globe, Award, HeartHandshake, ShieldCheck } from 'lucide-react';

const stats = [
  { icon: Users, end: 150, suffix: '+', label: 'Institutions', desc: 'Schools & colleges trust us' },
  { icon: GraduationCap, end: 200, suffix: 'K+', label: 'Students Managed', desc: 'Active identity profiles' },
  { icon: Building2, end: 15, suffix: '+', label: 'Countries', desc: 'Global regional presence' },
  { icon: Award, end: 10, suffix: '+', label: 'Years Active', desc: 'Trusted enterprise footprint' },
  { icon: Globe, end: 99.9, suffix: '%', decimal: true, label: 'Core Uptime', desc: 'Reliable cloud framework' },
  { icon: HeartHandshake, end: 24, suffix: '/7', label: 'Support SLA', desc: 'Dedicated institutional care' },
];

const Counter = ({ end, suffix = '', decimal = false, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime = null;
          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const current = decimal ? +(end * progress).toFixed(1) : Math.floor(end * progress);
            setCount(current);
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated, decimal]);

  return (
    <span ref={ref} className="tabular-nums tracking-tight font-extrabold text-white">
      {decimal ? count.toFixed(1) : count}
      <span className="text-blue-400 font-bold ml-0.5">{suffix}</span>
    </span>
  );
};

export default function Facts() {
  return (
    <section className="relative bg-[#0B0F19] text-slate-100 py-28 px-6 md:px-12 lg:px-16 font-sans overflow-hidden select-none">
      
      {/* Background Precision Grid Alignment Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] opacity-70 pointer-events-none" />
      
      {/* High-fidelity fluid ambient blurs */}
      <div className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] bg-blue-500/10 rounded-full filter blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[15%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ===== HEADER SECTION: Asymmetrical Split Layout ===== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 border-b border-slate-800/60 pb-12">
          <div className="max-w-2xl space-y-4 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-950 text-blue-300 border border-blue-800/40 tracking-wider uppercase shadow-inner">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Platform Metrics
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1]">
              Making School Management Easier
            </h2>
            <p className="text-base sm:text-lg text-slate-400 font-medium max-w-xl">
              Engineered ecosystems helping teachers, students, and parents collaborate fluidly within a single unified infrastructure.
            </p>
          </div>
          
          {/* Right Floating Status Box Badge */}
          <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-xl backdrop-blur-md self-start lg:self-auto">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div className="text-left">
              <p className="text-xs font-bold text-white tracking-wide uppercase">Operational Status</p>
              <p className="text-xs font-medium text-slate-400">All Nodes Active across clusters</p>
            </div>
          </div>
        </div>

        {/* ===== METRICS MATRIX GRID ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between items-start text-left p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md hover:bg-slate-900/90 hover:border-slate-700 transition-all duration-300 group overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] hover:-translate-y-1"
            >
              {/* Dynamic Inner Hover Glow Spot Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="w-full space-y-5">
                {/* Modernized Icon Cradle */}
                <div className="inline-flex p-3 rounded-xl bg-slate-950 text-slate-400 border border-slate-800/60 group-hover:bg-slate-900 group-hover:text-blue-400 group-hover:border-slate-700/80 transition-all duration-300 shadow-inner">
                  <stat.icon className="w-5 h-5" strokeWidth={2} />
                </div>
                
                {/* Unified Output Matrix Block */}
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white">
                    <Counter end={stat.end} suffix={stat.suffix} decimal={stat.decimal} />
                  </div>
                  <h4 className="text-xs font-bold text-slate-300 tracking-wide uppercase pt-1">
                    {stat.label}
                  </h4>
                </div>
              </div>

              {/* Functional Subtext */}
              <p className="text-xs text-slate-500 font-medium mt-4 leading-relaxed border-t border-slate-800/40 pt-3 w-full group-hover:text-slate-400 transition-colors">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ===== FOOTER WRAPPER SUBTEXT ===== */}
        <div className="mt-20 max-w-2xl mx-auto text-center border-t border-slate-900 pt-8">
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            Trusted securely by active institutional frameworks globally. Our architecture handles millions of multi-role micro-transactions daily to maintain administrative operational workflow reliability.
          </p>
        </div>

      </div>
    </section>
  );
}