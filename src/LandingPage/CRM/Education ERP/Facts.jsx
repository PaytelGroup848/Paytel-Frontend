import React, { useEffect, useRef, useState } from 'react';
import { Users, GraduationCap, Building2, Globe, Award, HeartHandshake } from 'lucide-react';

const stats = [
  { icon: Users, end: 150, suffix: '+', label: 'Educational Institutions', desc: 'Schools & colleges trust us' },
  { icon: GraduationCap, end: 200, suffix: 'K+', label: 'Students Managed', desc: 'Active student profiles' },
  { icon: Building2, end: 15, suffix: '+', label: 'Countries', desc: 'Global presence' },
  { icon: Award, end: 10, suffix: '+', label: 'Years of Excellence', desc: 'Trusted since 2014' },
  { icon: Globe, end: 99.9, suffix: '%', decimal: true, label: 'Uptime', desc: 'Reliable cloud platform' },
  { icon: HeartHandshake, end: 24, suffix: '/7', label: 'Support', desc: 'Dedicated customer care' },
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
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated, decimal]);

  return (
    <span ref={ref} className="tabular-nums">
      {decimal ? count.toFixed(1) : count}
      {suffix}
    </span>
  );
};

export default function Facts() {
  return (
    <section className="relative bg-slate-900 text-white py-20 px-4 md:px-8 font-sans overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5"></div>
      {/* Soft glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 tracking-wide mb-4">
            FACTS & FIGURES
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Making School Management Easier
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mt-4">
            for Teachers, Students & Parents
          </p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto rounded-full"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-teal-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-blue-400" strokeWidth={1.5} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                <Counter end={stat.end} suffix={stat.suffix} decimal={stat.decimal} />
              </div>
              <div className="text-sm font-semibold text-slate-200 mb-1">{stat.label}</div>
              <div className="text-xs text-slate-400">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* Optional sub-text */}
        <p className="text-center text-slate-400 mt-12 max-w-2xl mx-auto text-sm">
          Trusted by institutions worldwide — our platform processes millions of transactions daily, ensuring smooth academic and administrative operations.
        </p>
      </div>
    </section>
  );
}