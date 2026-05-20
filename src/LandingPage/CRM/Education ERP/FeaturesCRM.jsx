import React from 'react';
import {
  FaCloud,
  FaLaptopCode,
  FaMobileAlt,
  FaNetworkWired,
  FaCogs,
  FaUserGraduate,
  FaBus,
  FaClipboardList,
  FaMoneyBillWave,
  FaChalkboardTeacher,
  FaDatabase,
  FaChartLine,
  FaArrowRight,
  FaShieldAlt,
} from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';

const FeaturesCRM = () => {
  const connectedFeatures = [
    { icon: FaCloud, title: 'Cloud CRM Hub' },
    { icon: FaLaptopCode, title: 'Admin Web Panel' },
    { icon: FaMobileAlt, title: 'Cross-Platform App' },
    { icon: FaNetworkWired, title: 'Multi-Branch Sync' },
    { icon: FaCogs, title: 'Custom Workflows' },
  ];

  const coreFeatures = [
    {
      icon: FaUserGraduate,
      title: 'Student Lifecycle Management',
      desc: 'End-to-end processing from online enrollment and smart attendance to digital ID generation and real-time performance tracking.',
    },
    {
      icon: HiAcademicCap,
      title: 'Advanced Academics Engine',
      desc: 'Centralize your daily schedule planning, curriculum mappings, instant assignments publishing, and analytical report gradebooks.',
    },
    {
      icon: FaBus,
      title: 'Logistics, Library & Hostel',
      desc: 'Optimize dynamic transport routes, catalog book inventory via barcodes, and handle system hostel allocations seamlessly.',
    },
    {
      icon: FaClipboardList,
      title: 'Secure Examination Module',
      desc: 'Automate physical exam scheduling, generate secured hall tickets, run safe online tests, and build automated report cards.',
    },
    {
      icon: FaMoneyBillWave,
      title: 'Automated Payroll & Finance',
      desc: 'Inbuilt gateway fee collection, institutional expense tracking, flexible salary generation routines, and auditable financial statements.',
    },
    {
      icon: FaChalkboardTeacher,
      title: 'Human Capital & Staff Hub',
      desc: 'Detailed teacher data matrices, leave allocation trackers, objective performance appraisals, and complete corporate HR toolsets.',
    },
  ];

  return (
    <section className="relative w-full bg-slate-50/50 py-24 px-6 md:px-12 lg:px-16 font-sans overflow-hidden selection:bg-slate-900 selection:text-white">
      
      {/* Premium subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />
      
      {/* High-end ambient blurs */}
      <div className="absolute top-40 left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-blue-200/30 to-indigo-200/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-[-10%] w-[600px] h-[600px] bg-gradient-to-bl from-slate-200/40 via-transparent to-transparent rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ===== SECTION 1: Header Section ===== */}
        <div className="text-center mb-20 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-900 text-white tracking-widest uppercase shadow-sm">
            <FaShieldAlt className="text-[10px] text-blue-400" /> Enterprise Infrastructure
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Complete School Management Solution
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-base sm:text-lg font-medium leading-relaxed pt-2">
            Digitize every operating node of your institution. Our modern Education CRM unifies record frameworks, 
            automates structural workflows, and delivers instantaneous live dashboards over academic and administrative ecosystems.
          </p>
        </div>

        {/* ===== SECTION 2: Premium Centralized Data Hub Panel ===== */}
        <div className="mb-24 flex justify-center">
          <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 group">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-slate-900 text-white shadow-md shadow-slate-900/10 transition-transform duration-300 group-hover:scale-105">
                  <FaDatabase className="text-2xl" />
                </div>
                <div className="w-px h-10 bg-slate-200 hidden sm:block" />
                <div className="p-3.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 transition-transform duration-300 group-hover:scale-105 delay-75">
                  <FaChartLine className="text-2xl" />
                </div>
                <div className="w-px h-10 bg-slate-200 hidden sm:block" />
                <div className="p-3.5 rounded-xl bg-slate-50 text-slate-700 border border-slate-200 transition-transform duration-300 group-hover:scale-105 delay-150">
                  <HiAcademicCap className="text-2xl" />
                </div>
              </div>
              <div className="text-center sm:text-left flex-1 md:pl-4">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">Centralized Master Data Architecture</h3>
                <p className="text-slate-500 text-sm font-medium mt-1">Unified analytics pipeline • Automated sync matrix • Strict role RBAC controls</p>
              </div>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-50/0 via-slate-50/50 to-slate-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        </div>

        {/* ===== SECTION 3: Connected Node Map (Native Tailwind Keyframes) ===== */}
        <div className="mb-28 relative px-4">
          <div className="relative flex flex-col sm:flex-row flex-wrap lg:flex-nowrap justify-between items-center gap-6 lg:gap-4">
            
            {/* Native Tailwind-driven Moving Vector Line Map */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-200 hidden lg:block z-0 transform -translate-y-1/2" />
            <div className="absolute top-1/2 left-0 w-full hidden lg:block z-0 overflow-visible h-0">
              <div
                className="absolute w-2.5 h-2.5 rounded-full bg-slate-900 shadow-[0_0_0_4px_rgba(255,255,255,1),0_0_12px_rgba(0,0,0,0.3)] animate-[move-dot_7s_linear_infinite]"
                style={{ transform: 'translateY(-50%)' }}
              />
            </div>

            {connectedFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="relative z-10 flex flex-col items-center bg-white rounded-xl p-5 w-full sm:w-44 shadow-sm hover:shadow-xl border border-slate-200 hover:border-slate-900 transition-all duration-300 hover:-translate-y-1.5 group"
              >
                <div className="p-3.5 rounded-xl bg-slate-50 group-hover:bg-slate-900 border border-slate-100 group-hover:border-slate-900 mb-4 transition-all duration-300 shadow-inner group-hover:shadow-none">
                  <feature.icon className="text-xl text-slate-700 group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="font-bold text-slate-800 group-hover:text-slate-900 text-center text-xs tracking-wide uppercase">{feature.title}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* ===== SECTION 4: Secondary Section Heading ===== */}
        <div className="text-center mb-16 space-y-3">
          <span className="inline-block text-xs font-bold text-slate-400 tracking-widest uppercase">
            Functional Overview
          </span>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Engineered Core Capabilities
          </h3>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base font-medium">
            Everything required to run modern educational setups smoothly—modularized, tightly unified, and configured to scale.
          </p>
        </div>

        {/* ===== SECTION 5: Core Feature Matrix Cards ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {coreFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="relative group bg-white rounded-xl p-6 md:p-8 border border-slate-200 hover:border-slate-900 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="inline-flex p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-300 group-hover:scale-105 shadow-inner group-hover:shadow-none">
                  <feature.icon className="text-xl" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-black transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-normal">
                    {feature.desc}
                  </p>
                </div>
              </div>
              
              {/* Corner Accent graphic indicator */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-slate-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-tr-xl pointer-events-none" />
            </div>
          ))}
        </div>

        {/* ===== SECTION 6: High-End CTA Action Wrapper ===== */}
        <div className="mt-20 text-center">
          <button 
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 border border-slate-800 group"
            aria-label="Request institutional demo access"
          >
            Request a Free Demo
            <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Embedded production-safe animations */}
      <style>{`
        @keyframes move-dot {
          0% { left: 0%; }
          100% { left: calc(100% - 0.65rem); }
        }
      `}</style>
    </section>
  );
};

export default FeaturesCRM;