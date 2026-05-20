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
} from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';

const FeaturesCRM = () => {
  const connectedFeatures = [
    { icon: FaCloud, title: 'Cloud-Based CRM' },
    { icon: FaLaptopCode, title: 'Admin Web Panel' },
    { icon: FaMobileAlt, title: 'App Access' },
    { icon: FaNetworkWired, title: 'Multi-Branch Management' },
    { icon: FaCogs, title: 'Custom CRM System' },
  ];

  const coreFeatures = [
    {
      icon: FaUserGraduate,
      title: 'Student Management',
      desc: 'Complete student lifecycle – admission, attendance, ID cards, and performance tracking.',
    },
    {
      icon: HiAcademicCap,
      title: 'Academics Management',
      desc: 'Timetable, curriculum planning, assignments, and gradebook in one place.',
    },
    {
      icon: FaBus,
      title: 'Transport, Library & Hostel',
      desc: 'Manage bus routes, library inventory, hostel allocation seamlessly.',
    },
    {
      icon: FaClipboardList,
      title: 'Examination Module',
      desc: 'Exam scheduling, hall tickets, online assessments, and report cards.',
    },
    {
      icon: FaMoneyBillWave,
      title: 'Payroll & Finance',
      desc: 'Fee collection, expense tracking, salary processing, and financial reports.',
    },
    {
      icon: FaChalkboardTeacher,
      title: 'Staff Management',
      desc: 'Teacher profiles, leave management, performance appraisals, and HR tools.',
    },
  ];

  return (
    <section className="relative w-full bg-white py-20 px-4 md:px-8 font-sans overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none"></div>
      {/* Soft glows */}
      <div className="absolute top-32 left-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-32 right-10 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ===== SECTION 1: Complete School Management Solution ===== */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 tracking-wide mb-4 border border-blue-100">
            ALL-IN-ONE PLATFORM
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight">
            Complete School Management Solution
          </h1>
          <p className="text-slate-600 max-w-3xl mx-auto mt-4 text-lg leading-relaxed">
            Digitise every aspect of your institution — from student enrolment to parent communication. 
            Our Education CRM centralises records, automates workflows, and gives you real-time visibility 
            into academic and administrative operations, so you can focus on what truly matters: education.
          </p>
        </div>

        {/* ===== SECTION 2: Abstract CRM Illustration ===== */}
        <div className="mb-24 flex justify-center">
          <div className="relative w-full max-w-4xl bg-white border-2 border-slate-800/20 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-sm border border-slate-200/60">
                  <FaDatabase className="text-4xl text-blue-600" />
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 shadow-sm border border-slate-200/60">
                  <FaChartLine className="text-4xl text-teal-600" />
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 shadow-sm border border-slate-200/60">
                  <HiAcademicCap className="text-4xl text-amber-600" />
                </div>
              </div>
              <div className="text-left max-w-md">
                <h3 className="text-2xl font-bold text-slate-800">Centralized Education CRM</h3>
                <p className="text-slate-500 mt-1">Real-time analytics • Parent & teacher portals • Role-based access</p>
              </div>
            </div>
            {/* Subtle inner outline accent */}
            <div className="absolute inset-0 rounded-2xl border border-slate-300/20 pointer-events-none"></div>
          </div>
        </div>

        {/* ===== SECTION 3: 5 Connected Cards with Single Moving Dot on Line ===== */}
        <div className="mb-24">
          <div className="relative flex flex-wrap justify-center items-center gap-6 md:gap-12">
            {/* Base line – darker professional gradient */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent hidden md:block z-0"></div>

            {/* Moving dot – black gradient, slower speed */}
            <div className="absolute top-1/2 left-0 w-full hidden md:block z-0 overflow-visible">
              <div
                className="absolute w-3.5 h-3.5 rounded-full shadow-[0_0_0_2px_rgba(255,255,255,0.9),0_0_8px_rgba(0,0,0,0.4)] animate-move-dot"
                style={{ top: '-6px', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}
              ></div>
            </div>

            {connectedFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="relative z-10 flex flex-col items-center bg-white rounded-xl p-6 w-44 shadow-md hover:shadow-xl border-2 border-slate-200 hover:border-slate-800 transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="p-3 rounded-full bg-gradient-to-br from-blue-50 to-teal-50 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-slate-100">
                  <feature.icon className="text-3xl text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-800 text-center text-sm">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* ===== SECTION 4: Powerful Features Heading ===== */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 tracking-wide mb-4 border border-teal-100">
            WHY CHOOSE US
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            Powerful Features for Educational Institutions
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto mt-4">
            Everything you need to run your school efficiently — fully integrated, user-friendly, and customisable to your unique requirements.
          </p>
        </div>

        {/* ===== SECTION 5: 6 Feature Cards ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="relative group bg-white rounded-xl p-6 border-2 border-slate-200 hover:border-slate-800 transition-all duration-300 shadow-md hover:shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 group-hover:from-blue-50 group-hover:to-teal-50 transition-all duration-300 group-hover:scale-110 shadow-sm border border-slate-100">
                  <feature.icon className="text-2xl text-slate-600 group-hover:text-blue-600 transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{feature.title}</h3>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-tr-xl"></div>
            </div>
          ))}
        </div>

        {/* ===== CTA ===== */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 border border-slate-700">
    request kro 
            <FaArrowRight className="text-sm" />
          </button>
        </div>
      </div>

      {/* Custom keyframes for the moving dot (slower speed) */}
      
      <style>{`
        @keyframes move-dot {
          0% { left: 0%; }
          100% { left: calc(100% - 0.75rem); }
        }
        .animate-move-dot {
          animation: move-dot 6s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default FeaturesCRM;