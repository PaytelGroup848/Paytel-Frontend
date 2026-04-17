//@ts-nocheck
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NodeJS_Page() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex pt-14">
        <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
          
          {/* HEADER SECTION */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-slate-100">
                <i className="fa-brands fa-node-js text-3xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900">Node.js Runtime</h1>
                <p className="text-xs text-slate-500 font-medium">Build scalable event-driven applications</p>
              </div>
            </div>

            <Link to="/bootcamp">
              <button className="relative inline-flex items-center justify-center p-[2px] rounded-xl overflow-hidden group shadow-lg shadow-emerald-100 transition-transform hover:scale-105 active:scale-95">
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 animate-[spin_4s_linear_infinite]" />
                <span className="relative px-6 py-3 bg-slate-900 rounded-xl text-[12px] font-black uppercase tracking-widest text-white group-hover:bg-slate-800 transition-all">
                  <i className="fa-solid fa-microchip mr-2 text-emerald-400"></i> Deploy App
                </span>
              </button>
            </Link>
          </div>
          
          {/* MAIN PROMO CARD */}
          <section className="relative bg-gradient-to-br from-slate-900 via-emerald-900 to-green-950 p-8 md:p-16 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-emerald-200 mb-12">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/10 rounded-full blur-3xl -ml-20 -mb-20" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center lg:text-left">
                <span className="inline-block px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300 mb-6 border border-emerald-500/20">
                  Non-Blocking I/O
                </span>
                <h2 className="text-4xl md:text-6xl font-black leading-[1.05] text-white tracking-tighter">
                  Fast & Scalable <span className="text-emerald-400 underline decoration-green-500/50 underline-offset-8">Server JS</span>
                </h2>
                <p className="text-base md:text-lg text-emerald-50/70 mt-8 leading-relaxed font-medium">
                  Leverage the V8 engine to build high-performance network tools, real-time chats, and lightning-fast microservices.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-12">
                  <Link to="/npm-packages">
                    <button className="bg-emerald-500 text-white text-xs font-black uppercase tracking-widest px-10 py-5 rounded-2xl hover:bg-emerald-400 hover:-translate-y-1 transition-all shadow-2xl shadow-emerald-900/40">
                      Explore NPM Ecosystem
                    </button>
                  </Link>
                  <button className="bg-white/5 backdrop-blur-md border border-white/10 text-white text-xs font-black uppercase tracking-widest px-10 py-5 rounded-2xl hover:bg-white/10 transition-all">
                    Express.js Docs
                  </button>
                </div>
              </div>

              <div className="relative w-full max-w-[500px] group">
                <div className="relative rounded-3xl overflow-hidden shadow-[0_32px_80px_-20px_rgba(0,0,0,0.6)] transform lg:rotate-2 group-hover:rotate-0 transition-all duration-700">
                  <img
                    src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop"
                    alt="node terminal"
                    className="w-full aspect-[4/3] object-cover opacity-80 scale-105 group-hover:scale-100 transition-transform duration-700"
                  />
                </div>
                {/* Floating Badge */}
                <div className="absolute -top-6 -right-6 bg-emerald-600 text-white p-4 rounded-2xl shadow-xl flex flex-col items-center animate-bounce-slow">
                  <span className="text-xl font-black">LTS</span>
                  <span className="text-[9px] font-bold uppercase">Stable</span>
                </div>
              </div>
            </div>
          </section>

          {/* NEW SECTION: NODE.JS STRENGTHS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <FeatureCard 
              icon="fa-arrows-spin" 
              title="The Event Loop" 
              desc="Master the single-threaded concurrency model for ultra-fast task handling."
              color="emerald"
            />
            <FeatureCard 
              icon="fa-box-open" 
              title="NPM Ecosystem" 
              desc="Access over 2 million reusable packages to accelerate your development."
              color="emerald"
            />
            <FeatureCard 
              icon="fa-comments" 
              title="Real-time Apps" 
              desc="Perfect for WebSockets, Socket.io, and streaming data applications."
              color="emerald"
            />
          </div>

          {/* NEW SECTION: DEVELOPMENT STEPS */}
          <section className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm mb-12">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-black text-slate-900">Fullstack Power</h3>
              <p className="text-slate-500 text-sm mt-2">JavaScript everywhere—from Frontend to Backend.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <Step number="1" title="Initialize NPM" desc="Set up your package.json and manage project dependencies." />
              <Step number="2" title="Express API" desc="Build robust RESTful endpoints with minimal middleware code." />
              <Step number="3" title="NoSQL Data" desc="Connect to MongoDB or Redis for lightning-fast data retrieval." />
            </div>
          </section>

          {/* FINAL CTA */}
          <section className="bg-slate-900 rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden">
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             <div className="relative z-10">
               <h2 className="text-3xl font-black mb-4">Master the Runtime?</h2>
               <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm">Deploy your Node.js apps on our high-performance NVMe cloud infrastructure today.</p>
               <Link to="/start">
                 <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-xs px-10 py-5 rounded-2xl transition-all">
                   Get Started for Free
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

function FeatureCard({ icon, title, desc, color }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-50 transition-all group">
      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
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