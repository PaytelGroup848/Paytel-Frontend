import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, Terminal, Settings, ShieldCheck, 
  Cpu, Globe, ChevronRight, BookOpen, 
  Copy, ExternalLink, Search, Command,
  CheckCircle2, Sparkles
} from 'lucide-react';

const DocumentationPage = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'intro', title: 'What is VPS?', icon: <Server size={18} /> },
    { id: 'setup', title: 'Getting Started', icon: <Terminal size={18} /> },
    { id: 'management', title: 'Managing Servers', icon: <Settings size={18} /> },
    { id: 'security', title: 'Security Best Practices', icon: <ShieldCheck size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-600 selection:bg-indigo-100 selection:text-indigo-700">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .no-sb::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] bg-indigo-200/40 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-blue-100/50 blur-[120px] rounded-full" />
      </div>

      {/* Top Search Bar / Breadcrumb */}
      <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200/60 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
            <span className="hover:text-indigo-600 cursor-pointer">CloudeData</span>
            <ChevronRight size={14} />
            <span className="text-slate-900">Documentation</span>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-400 text-sm w-64">
            <Search size={14} />
            <span>Search docs...</span>
            <div className="ml-auto flex items-center gap-1 opacity-50">
              <Command size={12} /> <span className="text-[10px]">K</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-16 relative z-10">
        
        {/* Sidebar */}
        <aside className="md:w-64 shrink-0">
          <div className="sticky top-28 space-y-8">
            <div>
              <h3 className="text-slate-900 font-bold flex items-center gap-2.5 mb-6 px-4 uppercase text-xs tracking-widest">
                Main Guide
              </h3>
              <nav className="space-y-1.5">
                {sections.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeSection === item.id 
                      ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/60' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <span className={activeSection === item.id ? 'text-indigo-600' : 'text-slate-400'}>
                        {item.icon}
                    </span>
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-4 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl shadow-lg shadow-indigo-200">
               <Sparkles className="text-indigo-200 mb-2" size={20} />
               <p className="text-white text-xs font-bold mb-1">Join the Beta</p>
               <p className="text-indigo-100 text-[10px] leading-relaxed mb-3">Get access to our new Mumbai region servers.</p>
               <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold rounded-lg transition-all border border-white/20">
                 Learn More
               </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Section: Intro */}
            <section id="intro" className="mb-24 scroll-mt-32">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold uppercase tracking-wider mb-6">
                <CheckCircle2 size={12} /> Introduction
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Understanding <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">VPS Hosting</span>
              </h1>
              <p className="text-[17px] text-slate-500 leading-relaxed mb-8">
                A Virtual Private Server (VPS) acts as an isolated, virtual environment on a physical server. 
                It offers dedicated resources and full root access, giving you the power of a dedicated server at a fraction of the cost.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-10">
                <div className="group p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all hover:border-indigo-300">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                    <Cpu size={20} />
                  </div>
                  <h4 className="text-slate-900 font-bold mb-2">Dedicated Resources</h4>
                  <p className="text-sm text-slate-500">Your CPU and RAM are yours alone—no "noisy neighbors" slowing you down.</p>
                </div>
                <div className="group p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all hover:border-blue-300">
                   <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                    <Globe size={20} />
                  </div>
                  <h4 className="text-slate-900 font-bold mb-2">Scalability</h4>
                  <p className="text-sm text-slate-500">Upgrade your storage or processing power instantly as your traffic grows.</p>
                </div>
              </div>
            </section>

            {/* Section: Setup */}
            <section id="setup" className="mb-24 scroll-mt-32">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <Terminal className="text-indigo-600" size={28} /> Getting Started
              </h2>
              <div className="space-y-6">
                <p className="text-slate-500">To connect to your new VPS, you will primarily use SSH (Secure Shell). Open your terminal and run:</p>
                
                <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-xl group relative">
                  <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-3">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-slate-500 text-[10px] font-mono ml-2">ssh-terminal — 80x24</span>
                  </div>
                  <code className="text-indigo-300 font-mono text-sm">
                    <span className="text-emerald-400">root@local:~$</span> ssh root@your_server_ip
                  </code>
                  <button className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors">
                    <Copy size={16} />
                  </button>
                </div>

                <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100">
                  <h5 className="text-indigo-900 font-bold text-sm mb-4">Post-Setup Recommendations:</h5>
                  <ul className="space-y-4">
                    {[
                      { step: "1", text: "Update your system:", cmd: "apt update && apt upgrade" },
                      { step: "2", text: "Create a non-root user for better security.", cmd: "" },
                    ].map((item) => (
                      <li key={item.step} className="flex gap-4">
                        <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                          {item.step}
                        </span>
                        <div>
                           <p className="text-sm text-slate-700 font-medium">{item.text}</p>
                           {item.cmd && <code className="text-xs text-indigo-600 font-bold mt-1 inline-block">{item.cmd}</code>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Section: Management */}
            <section id="management" className="mb-24 scroll-mt-32">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                 <Settings className="text-indigo-600" size={28} /> Management
              </h2>
              <div className="relative group overflow-hidden rounded-[2rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/50">
                <div className="p-8 pb-0">
                  <h3 className="text-slate-900 text-xl font-bold mb-2">CloudeData hPanel</h3>
                  <p className="text-sm text-slate-500 mb-6">Real-time monitoring and instant power actions at your fingertips.</p>
                </div>
                <div className="px-8 pb-8">
                  <div className="aspect-video bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center justify-center group-hover:bg-indigo-50/30 transition-colors">
                      <div className="relative">
                        <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 animate-pulse" />
                        <Settings className="relative text-indigo-600 animate-[spin_8s_linear_infinite]" size={48} />
                      </div>
                      <p className="mt-4 text-xs font-bold text-indigo-400 uppercase tracking-tighter italic text-center px-12">
                        "Manage VPS power states, automated backups, and private networking from our custom dashboard."
                      </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA / Footer Note */}
            <footer className="pt-12 border-t border-slate-200 text-center pb-20">
              <p className="text-[14px] text-slate-400">
                Still have questions? 
                <span className="text-indigo-600 font-bold cursor-pointer hover:underline mx-1.5 flex inline-flex items-center gap-1">
                  Join Developer Discord <ExternalLink size={12} />
                </span> 
                or check our 
                <span className="text-indigo-600 font-bold cursor-pointer hover:underline mx-1.5">API Reference</span>.
              </p>
            </footer>

          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DocumentationPage;