import React from 'react';
import { ArrowRight, Users, LineChart, Activity, CheckCircle2, GraduationCap, LayoutGrid, Zap, Shield, Globe } from 'lucide-react';

const GridBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Deep space gradient base */}
    <div className="absolute inset-0 bg-[#060B14]" />
    {/* Subtle grid */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
    {/* Radial glows */}
    <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08)_0%,transparent_70%)]" />
    <div className="absolute bottom-[-30%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
    <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.06)_0%,transparent_70%)]" />
  </div>
);

const ScanLine = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
    <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.8)_2px,rgba(255,255,255,0.8)_3px)]" />
  </div>
);

const HolographicCard = ({ icon: Icon, label, value, color, delay, position }) => (
  <div
    className={`absolute z-30 ${position}`}
    style={{ animation: `floatCard 5s ease-in-out infinite ${delay}` }}
  >
    <div className="relative backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-2xl p-3 w-36 shadow-[0_0_30px_rgba(56,189,248,0.08)] group hover:border-sky-400/30 transition-all duration-500">
      {/* Corner accent */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-sky-400/40 rounded-tl-2xl" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-sky-400/40 rounded-br-2xl" />

      <div className={`h-7 w-7 rounded-lg flex items-center justify-center mb-2 ${color}`}>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="h-1.5 w-16 bg-white/20 rounded-full mb-1.5" />
      <div className="h-1 w-10 bg-white/10 rounded-full" />

      {/* Scan line effect */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-400/5 to-transparent" style={{ animation: 'scanDown 2s linear infinite' }} />
      </div>
    </div>
  </div>
);

const TerminalScreen = () => (
  <div className="absolute z-10 bottom-4 left-[4%] w-[78%] aspect-[16/10]">
    {/* Outer bezel */}
    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#0D1B2A] to-[#0A1628] border border-sky-400/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(56,189,248,0.08),inset_0_1px_0_rgba(255,255,255,0.05)] p-[2px] transition-all duration-500 hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),0_0_40px_rgba(56,189,248,0.08)] group">

      <div className="w-full h-full rounded-[14px] bg-[#060E1A] overflow-hidden relative p-4 flex flex-col">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#28C940]" />
            </div>
            <div className="h-px w-4 bg-white/10" />
            <div className="flex items-center gap-1.5 bg-white/[0.04] px-2 py-1 rounded-md border border-white/[0.06]">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <div className="h-1.5 w-16 bg-white/20 rounded-full" />
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-5 px-2 flex items-center rounded-md bg-sky-500/10 border border-sky-500/20">
              <span className="text-[8px] font-bold text-sky-400 tracking-wider">LIVE</span>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="flex-1 grid grid-cols-12 gap-3">

          {/* Left panel */}
          <div className="col-span-5 flex flex-col gap-3">
            {/* KPI card */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-2.5 flex-1">
              <div className="h-1.5 w-12 bg-white/15 rounded-full mb-2" />
              <div className="space-y-1.5">
                {[100, 75, 90, 60].map((w, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="h-1 rounded-full bg-white/5 flex-1">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${w}%`,
                          background: i === 0 ? 'rgba(56,189,248,0.6)' : i === 1 ? 'rgba(99,102,241,0.5)' : i === 2 ? 'rgba(16,185,129,0.5)' : 'rgba(251,191,36,0.4)'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status indicator */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-2.5 flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-emerald-400 animate-pulse flex-shrink-0" />
              <div className="flex-1">
                <div className="h-1 bg-emerald-400/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400/60 rounded-full" style={{ width: '72%' }} />
                </div>
              </div>
              <span className="text-[7px] text-emerald-400 font-bold">72%</span>
            </div>
          </div>

          {/* Right panel */}
          <div className="col-span-7 bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-3">
              <div className="h-1.5 w-14 bg-white/20 rounded-full" />
              <div className="flex gap-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-3.5 w-5 rounded bg-white/[0.04] border border-white/[0.06]" />
                ))}
              </div>
            </div>

            {/* Circular charts */}
            <div className="flex-1 flex items-center justify-center gap-4">
              <div className="relative h-12 w-12">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(56,189,248,0.7)" strokeWidth="3"
                    strokeDasharray="62 88" strokeLinecap="round" style={{ animation: 'spin 12s linear infinite' }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[7px] font-bold text-sky-400">70%</span>
                </div>
              </div>
              <div className="relative h-12 w-12">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(99,102,241,0.7)" strokeWidth="3"
                    strokeDasharray="80 88" strokeLinecap="round" style={{ animation: 'spin 8s linear infinite reverse' }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[7px] font-bold text-indigo-400">91%</span>
                </div>
              </div>
            </div>

            {/* Decorative corner glow */}
            <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-indigo-500/10 blur-xl" />
          </div>
        </div>

        {/* Bottom terminal line */}
        <div className="mt-3 pt-2 border-t border-white/[0.04] flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-sky-400" />
          <div className="h-1 w-20 bg-white/10 rounded-full" />
          <div className="h-1 w-12 bg-white/5 rounded-full" />
          <div className="ml-auto h-1 w-6 bg-sky-400/20 rounded-full" />
        </div>
      </div>
    </div>

    {/* Laptop base */}
    <div className="absolute bottom-[-10px] left-[-2%] w-[104%] h-3 bg-gradient-to-b from-[#0D1B2A] to-[#080F1A] rounded-b-xl border-t border-sky-400/10" />
    <div className="absolute bottom-[-12px] left-[43%] w-[14%] h-1.5 bg-[#040A12] rounded-b-md" />
  </div>
);

const GraduationHat = () => (
  <div
    className="absolute z-30 right-[6%] top-[10%]"
    style={{ animation: 'floatHat 7s ease-in-out infinite' }}
  >
    <div className="relative drop-shadow-[0_0_20px_rgba(56,189,248,0.3)]">
      {/* Hat board */}
      <div className="w-24 h-10 relative">
        <div
          className="absolute inset-0 transform rotate-[10deg]"
          style={{
            background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
            clipPath: 'polygon(10% 30%, 90% 0%, 100% 60%, 10% 90%)',
            filter: 'drop-shadow(0 0 12px rgba(56,189,248,0.4))'
          }}
        />
        {/* Center gem */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
      </div>

      {/* Cap base */}
      <div className="w-14 h-5 mx-auto -mt-1 rounded-b-full bg-gradient-to-b from-sky-900 to-sky-950 border-t border-sky-400/30" />

      {/* Tassel */}
      <div className="absolute right-3 top-3 w-px h-10 bg-gradient-to-b from-amber-400 to-amber-600">
        <div className="absolute bottom-0 left-[-3px] w-2 h-4 bg-gradient-to-b from-amber-400 to-amber-700 rounded-sm shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
      </div>
    </div>
  </div>
);

const FloatingOrb = ({ className, style }) => (
  <div className={`absolute rounded-full pointer-events-none ${className}`} style={style} />
);

const DataStream = () => (
  <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
    <svg className="w-full h-full" viewBox="0 0 540 480" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100,80 C180,120 240,160 280,200" stroke="url(#s1)" strokeWidth="1" strokeLinecap="round" strokeDasharray="6 8" />
      <path d="M450,120 C390,150 340,175 300,200" stroke="url(#s2)" strokeWidth="1" strokeLinecap="round" strokeDasharray="6 8" />
      <path d="M50,260 C130,240 200,220 270,210" stroke="url(#s1)" strokeWidth="0.8" strokeLinecap="round" />
      <defs>
        <linearGradient id="s1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="s2" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export default function EducationBanner() {
  return (
    <section className="relative min-h-[680px] w-full overflow-hidden flex items-center font-sans select-none text-white">
      <GridBackground />
      <ScanLine />

      {/* Floating ambient orbs */}
      <FloatingOrb className="top-[15%] left-[5%] w-64 h-64 opacity-20" style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.3) 0%, transparent 70%)', filter: 'blur(30px)', animation: 'pulseOrb 6s ease-in-out infinite' }} />
      <FloatingOrb className="bottom-[10%] right-[25%] w-48 h-48 opacity-15" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)', filter: 'blur(25px)', animation: 'pulseOrb 8s ease-in-out infinite 2s' }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-20 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* LEFT — Copy */}
          <div className="lg:col-span-6 space-y-8">

            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-sky-400/20 bg-sky-400/5 backdrop-blur-sm"
              style={{ boxShadow: '0 0 20px rgba(56,189,248,0.08)' }}>
              <div className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-sky-300">Education CRM Platform</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.08]">
                <span className="text-white">Next-Gen</span>{' '}
                <span
                  className="relative inline-block"
                  style={{
                    background: 'linear-gradient(90deg, #38BDF8 0%, #818CF8 50%, #34D399 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Smart CRM
                </span>
                <br />
                <span className="text-white/80 text-3xl sm:text-4xl lg:text-[42px] font-light">
                  for Modern Institutions
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-white/50 max-w-xl leading-relaxed font-light">
              Unify students, faculty, admissions, fees, and analytics in one intelligent platform — built for the future of education.
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-3 max-w-md">
              {[
                { icon: Users, label: 'Student Intelligence Hub' },
                { icon: Zap, label: 'Automated Fee Engine' },
                { icon: LineChart, label: 'Real-time Analytics' },
                { icon: Globe, label: 'Connected App Network' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 group">
                  <div className="h-5 w-5 rounded-md bg-sky-400/10 border border-sky-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-400/20 transition-colors duration-300">
                    <Icon className="h-2.5 w-2.5 text-sky-400" />
                  </div>
                  <span className="text-xs font-semibold text-white/60 group-hover:text-white/80 transition-colors duration-300">{label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-[#060B14] rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 group relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #38BDF8 0%, #6366F1 100%)',
                  boxShadow: '0 0 30px rgba(56,189,248,0.25), 0 8px 25px rgba(0,0,0,0.3)'
                }}
              >
                <span className="relative z-10">Book Free Demo</span>
                <ArrowRight className="relative z-10 ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, #7DD3FC 0%, #818CF8 100%)' }} />
              </button>

              <button
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white/70 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.07] hover:border-white/20 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                View Features
              </button>
            </div>
  
            {/* Trust line */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2">
                {['#38BDF8', '#6366F1', '#34D399', '#F472B6'].map((c, i) => (
                  <div key={i} className="h-7 w-7 rounded-full border-2 border-[#060B14] flex items-center justify-center"
                    style={{ background: `${c}30`, borderColor: '#060B14' }}>
                    <div className="h-3 w-3 rounded-full" style={{ background: c, opacity: 0.7 }} />
                  </div>
                ))}
              </div>
              <span className="text-xs text-white/30 font-medium">Trusted by <span className="text-white/60 font-bold">500+</span> institutions worldwide</span>
            </div>
          </div>

          {/* RIGHT — Illustration */}
          <div className="lg:col-span-6 relative w-full h-[460px] lg:h-[500px] flex items-center justify-center mt-10 lg:mt-0">
            <div className="relative w-full max-w-[560px] h-full">
              <DataStream />

              <TerminalScreen />
              <GraduationHat />

              {/* Floating data cards */}
              <HolographicCard
                icon={Activity}
                label="Live Sessions"
                color="bg-sky-400/10 text-sky-400 border border-sky-400/20"
                delay="0s"
                position="top-[18%] left-[0%]"
              />
              <HolographicCard
                icon={Users}
                label="Enrollment"
                color="bg-indigo-400/10 text-indigo-400 border border-indigo-400/20"
                delay="1.2s"
                position="top-[4%] left-[28%]"
              />
              <HolographicCard
                icon={Shield}
                label="Compliance"
                color="bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                delay="2.4s"
                position="top-[22%] right-[-2%]"
              />
              <HolographicCard
                icon={LayoutGrid}
                label="Modules"
                color="bg-amber-400/10 text-amber-400 border border-amber-400/20"
                delay="0.8s"
                position="bottom-[26%] left-[8%]"
              />
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes floatHat {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
        @keyframes pulseOrb {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.1); }
        }
        @keyframes scanDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes spin {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -88; }
        }
      `}</style>
    </section>
  );
}