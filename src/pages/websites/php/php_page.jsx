//@ts-nocheck
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function PHP_Page() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex pt-14">
        <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
          
          {/* HEADER SECTION */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-slate-100">
                <i className="fa-brands fa-php text-3xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900">PHP Engineering</h1>
                <p className="text-xs text-slate-500 font-medium">Build powerful dynamic web applications</p>
              </div>
            </div>

            <Link to="/curriculum">
              <button className="relative inline-flex items-center justify-center p-[2px] rounded-xl overflow-hidden group shadow-lg shadow-indigo-100 transition-transform hover:scale-105 active:scale-95">
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-500 animate-[spin_4s_linear_infinite]" />
                <span className="relative px-6 py-3 bg-slate-900 rounded-xl text-[12px] font-black uppercase tracking-widest text-white group-hover:bg-slate-800 transition-all">
                  <i className="fa-solid fa-terminal mr-2 text-indigo-400"></i> Start Coding
                </span>
              </button>
            </Link>
          </div>
          
          {/* MAIN PROMO CARD */}
          <section className="relative bg-gradient-to-br from-indigo-600 via-purple-700 to-slate-900 p-8 md:p-16 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-200 mb-12">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl -ml-20 -mb-20" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center lg:text-left">
                <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-indigo-100 mb-6 border border-white/10">
                  Server-Side Mastery
                </span>
                <h2 className="text-4xl md:text-6xl font-black leading-[1.05] text-white tracking-tighter">
                  Scale high with <span className="text-indigo-300 underline decoration-purple-400/50 underline-offset-8">PHP 8.x</span>
                </h2>
                <p className="text-base md:text-lg text-indigo-50/80 mt-8 leading-relaxed font-medium">
                  The engine behind 78% of the web. From simple contact forms to complex enterprise systems and RESTful APIs.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-12">
                  <Link to="/sandbox">
                    <button className="bg-white text-indigo-900 text-xs font-black uppercase tracking-widest px-10 py-5 rounded-2xl hover:bg-slate-50 hover:-translate-y-1 transition-all shadow-2xl shadow-black/20">
                      Live PHP Sandbox
                    </button>
                  </Link>
                  <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-black uppercase tracking-widest px-10 py-5 rounded-2xl hover:bg-white/20 transition-all">
                    Laravel & Tools
                  </button>
                </div>
              </div>

              <div className="relative w-full max-w-[500px] group">
                <div className="relative rounded-3xl overflow-hidden shadow-[0_32px_80px_-20px_rgba(0,0,0,0.4)] transform lg:rotate-2 group-hover:rotate-0 transition-all duration-700">
                  <img
                    src="https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?q=80&w=1200&auto=format&fit=crop"
                    alt="backend code"
                    className="w-full aspect-[4/3] object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                  />
                </div>
                {/* Floating Badge */}
                <div className="absolute -top-6 -right-6 bg-purple-600 text-white p-4 rounded-2xl shadow-xl flex flex-col items-center animate-bounce-slow">
                  <span className="text-xl font-black">v8.3</span>
                  <span className="text-[9px] font-bold uppercase">Ready</span>
                </div>
              </div>
            </div>
          </section>

          {/* NEW SECTION: CORE PHP CONCEPTS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <FeatureCard 
              icon="fa-database" 
              title="MySQL Integration" 
              desc="Master PDO and MySQLi to build secure, data-driven applications."
            />
            <FeatureCard 
              icon="fa-server" 
              title="Server Logic" 
              desc="Understand sessions, cookies, and server-side authentication flows."
            />
            <FeatureCard 
              icon="fa-gears" 
              title="OOP Design" 
              desc="Deep dive into Classes, Objects, and modern design patterns."
            />
          </div>

          {/* NEW SECTION: THE ROADMAP */}
          <section className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm mb-12">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-black text-slate-900">Backend Roadmap</h3>
              <p className="text-slate-500 text-sm mt-2">The journey from script to software.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <Step number="1" title="Syntax Basics" desc="Learn variables, arrays, loops, and custom functions." />
              <Step number="2" title="CRUD Apps" desc="Create, Read, Update, and Delete data from a real database." />
              <Step number="3" title="Frameworks" desc="Level up with Laravel or Symfony for professional projects." />
            </div>
          </section>

          {/* FINAL CTA */}
          <section className="bg-slate-900 rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden">
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             <div className="relative z-10">
               <h2 className="text-3xl font-black mb-4">Start your Backend career?</h2>
               <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm">Get access to 50+ real-world PHP projects and professional hosting environments.</p>
               <Link to="/pro">
                 <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest text-xs px-10 py-5 rounded-2xl transition-all">
                   Go Pro Today
                 </button>
               </Link>
             </div>
          </section>

        </main>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-50 transition-all group">
      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
        <i className={`fa-solid ${icon} text-lg`}></i>
      </div>
      <h4 className="font-black text-slate-900 mb-3">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

function Step({ number, title, desc }) {
  return (
    <div className="text-center relative">
      <div className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-black mx-auto mb-6 shadow-xl relative z-10">
        {number}
      </div>
      <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
      <p className="text-sm text-slate-500 px-4">{desc}</p>
    </div>
  );
}