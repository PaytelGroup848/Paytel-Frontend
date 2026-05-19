import { ArrowRight, GraduationCap, BookOpen, BarChart3, Users, LineChart } from 'lucide-react';

// ----- Sub-components for clean illustration -----
const Laptop = () => (
  <div className="absolute z-20 bottom-8 w-[72%] sm:w-[68%] aspect-[16/10] bg-[#1E2022] rounded-t-xl p-2 shadow-2xl border border-slate-700 transition-transform duration-300 hover:scale-[1.02] group">
    {/* Screen */}
    <div className="w-full h-full bg-[#F3F4F6] rounded-sm p-3 text-slate-800 flex flex-col justify-between overflow-hidden">
      {/* Header mock */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">👤</div>
          <div className="h-2 w-16 bg-slate-300 rounded" />
        </div>
        <div className="h-2 w-10 bg-slate-300 rounded" />
      </div>
      {/* Charts grid */}
      <div className="grid grid-cols-2 gap-2 flex-1 mt-2">
        <div className="bg-white p-1.5 rounded border border-slate-200 flex flex-col justify-center items-center group-hover:shadow-md transition-shadow">
          <LineChart className="h-8 w-8 text-blue-500 stroke-[1.5]" />
          <div className="h-1.5 w-8 bg-slate-200 mt-1 rounded" />
        </div>
        <div className="bg-white p-1.5 rounded border border-slate-200 flex flex-col justify-center items-center group-hover:shadow-md transition-shadow">
          <div className="w-8 h-8 rounded-full border-4 border-blue-500 border-t-slate-200 animate-spin" style={{ animationDuration: '3s' }} />
          <div className="h-1.5 w-8 bg-slate-200 mt-1 rounded" />
        </div>
      </div>
    </div>
    {/* Keyboard base */}
    <div className="absolute bottom-[-12px] left-[-4%] w-[108%] h-3 bg-[#D1D5DB] rounded-b-xl shadow-md border-t border-white" />
    <div className="absolute bottom-[-15px] left-[40%] w-[20%] h-1 bg-[#9CA3AF] rounded-b" />
  </div>
);

const Cap = () => (
  <div className="absolute z-30 right-[18%] top-[20%] animate-bounce-slow" aria-hidden="true">
    <div className="relative">
      <div className="w-24 h-10 bg-[#222] transform rotate-[15deg] skew-x-[30deg] shadow-lg rounded-sm border-b-4 border-stone-900 relative">
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-500 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="w-14 h-5 bg-[#111] absolute bottom-[-10px] left-4 rounded-b-full" />
      <div className="absolute left-[20px] top-[18px] w-0.5 h-10 bg-yellow-500 origin-top transform rotate-[10deg]">
        <div className="absolute bottom-0 left-[-3px] w-2 h-4 bg-yellow-500 rounded-sm" />
      </div>
    </div>
  </div>
);

const StackedBooks = () => (
  <div className="absolute z-10 right-0 bottom-8 w-[32%] flex flex-col items-end">
    <div className="w-[90%] h-5 bg-[#A23939] rounded-l border-b border-black/20 shadow-md pr-1 flex items-center justify-end">
      <div className="w-2 h-full bg-stone-100" />
    </div>
    <div className="w-[96%] h-6 bg-[#E5E7EB] rounded-l border-b border-slate-300 shadow-md pr-1 flex items-center justify-end">
      <div className="w-3 h-full bg-slate-400" />
    </div>
    <div className="w-full h-7 bg-[#2E3A46] rounded-l border-b border-black/30 shadow-xl pr-1 flex items-center justify-end">
      <div className="w-2.5 h-full bg-stone-200" />
    </div>
  </div>
);

const FloatingCardTop = () => (
  <div className="absolute top-6 left-[20%] z-10 bg-white rounded-lg shadow-xl p-2 border border-slate-200 w-28 animate-float" aria-hidden="true">
    <div className="flex items-center gap-1 border-b pb-1 mb-1">
      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
      <div className="h-1 w-12 bg-slate-200 rounded" />
    </div>
    <div className="space-y-1">
      <div className="h-1 w-full bg-slate-100 rounded" />
      <div className="h-1 w-[80%] bg-slate-100 rounded" />
    </div>
  </div>
);

const FloatingCardBottom = () => (
  <div className="absolute bottom-2 right-[24%] z-30 bg-white rounded-lg shadow-xl p-2 border border-slate-200 w-24 flex flex-col items-center gap-1 animate-float delay-1000" aria-hidden="true">
    <div className="h-6 w-6 rounded-full bg-slate-300 flex items-center justify-center">
      <Users className="h-3 w-3 text-slate-600" />
    </div>
    <div className="h-1 w-10 bg-slate-300 rounded" />
    <div className="h-1 w-7 bg-slate-200 rounded" />
  </div>
);

// ----- Main Banner Component -----
export default function Banner() {
  return (
    <section className="relative min-h-[600px] w-full bg-[#5A636A] bg-gradient-to-r from-[#4A5258] to-[#636C73] text-white overflow-hidden flex items-center font-sans">
      {/* Background abstract curves (unchanged bg) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M 100,300 Q 400,150 700,450 T 1200,200" fill="none" stroke="white" strokeWidth="2" />
          <path d="M 200,500 Q 600,250 900,550 T 1400,300" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="5,5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-16 lg:py-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT SIDE – Text Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="flex items-center gap-2 opacity-90 tracking-wide font-medium text-sm text-slate-200">
              <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" aria-hidden="true" />
              SMART EDUCATION CRM
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Smart Education CRM{' '}
              <span className="text-slate-100 font-extrabold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                for Modern Schools
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 max-w-xl font-normal leading-relaxed opacity-90">
              Manage students, teachers, attendance, communication, fees, and academic activities in one powerful and easy-to-use platform.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-lg shadow-md transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent group"
                aria-label="Book a free demo"
              >
                Book Free Demo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </button>

              <button
                className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-bold text-white bg-transparent hover:bg-white/10 rounded-lg border-2 border-white/80 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                aria-label="View all features"
              >
                View Features
              </button>
            </div>
          </div>

          {/* RIGHT SIDE – Interactive Illustration */}
          <div className="lg:col-span-6 relative w-full h-[400px] lg:h-[450px] flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[520px] h-full flex items-center justify-center">
              <Laptop />
              <Cap />
              <StackedBooks />
              <FloatingCardTop />
              <FloatingCardBottom />
              {/* Decorative blurred plant silhouette */}
              <div className="absolute left-[6%] bottom-8 w-20 h-28 bg-black/10 rounded-t-full filter blur-md pointer-events-none" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* Custom keyframes for smooth floating & slow bounce */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 5s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}