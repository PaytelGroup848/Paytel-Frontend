import React, { useState } from 'react';
import { 
  Server, LayoutGrid, ShieldCheck, HardDrive, Settings, 
  Terminal, History, GraduationCap, Globe, Zap, 
  Copy, Power, ChevronRight, Activity, Box, Lock
} from 'lucide-react';

const VPSDashboard = () => {
  const [view, setView] = useState('list'); // 'list' or 'manage'
  const [activeModule, setActiveModule] = useState('Overview');

  // VPS Data
  const vps = {
    name: "srv1596088.cloude.data",
    ip: "195.35.21.221",
    status: "Running",
    os: "Ubuntu 22.04 LTS",
    specs: { cpu: "1 Core", ram: "2 GB", disk: "50 GB NVMe" }
  };

  // Management Modules
  const modules = [
    { id: 'Overview', icon: Activity, label: 'Overview' },
    { id: 'Backups', icon: History, label: 'Backups' },
    { id: 'Docker', icon: Box, label: 'Docker Manager' },
    { id: 'Security', icon: Lock, label: 'Security' },
    { id: 'OS', icon: Settings, label: 'OS & Panel' },
    { id: 'Tutorials', icon: GraduationCap, label: 'Tutorials' }
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-700">
      
      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-grow overflow-y-auto">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">
            {view === 'list' ? 'Server List' : `Managing / ${vps.name}`}
          </h2>
          <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-black text-xs">AD</div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {view === 'list' ? (
            /* --- VPS LIST VIEW --- */
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">VPS Instances</h1>
                <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">New Server</button>
              </div>

              <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center border border-orange-100 shrink-0">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo-ubuntu_cof-orange-hex.svg" alt="Ubuntu" className="w-12 h-12" />
                  </div>
                  <div className="flex-grow text-center lg:text-left">
                    <h3 className="text-xl font-black text-slate-900 mb-1">{vps.name}</h3>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                       <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div> Running</span>
                       <span>• {vps.ip}</span>
                       <span>• {vps.os}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setView('manage')}
                    className="w-full lg:w-auto px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg"
                  >
                    Manage Server
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* --- DYNAMIC MANAGEMENT VIEW --- */
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button onClick={() => setView('list')} className="mb-6 flex items-center gap-2 text-xs font-black text-indigo-600 uppercase tracking-widest">
                <ChevronRight size={14} className="rotate-180"/> Back to list
              </button>

              <div className="grid grid-cols-12 gap-8">
                {/* LEFT: Modules Navigation */}
                <div className="col-span-12 lg:col-span-3 space-y-2">
                  {modules.map((m) => (
                    <button 
                      key={m.id} 
                      onClick={() => setActiveModule(m.id)}
                      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${activeModule === m.id ? 'bg-white shadow-xl shadow-slate-200/50 text-indigo-600 border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      <m.icon size={20} /> {m.label}
                    </button>
                  ))}
                </div>

                {/* RIGHT: Active Module Content */}
                <div className="col-span-12 lg:col-span-9 bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm">
                   <div className="flex justify-between items-start mb-10">
                      <div>
                         <h2 className="text-2xl font-black text-slate-900 tracking-tight">{activeModule}</h2>
                         <p className="text-sm text-slate-400 font-medium mt-1">Configure and monitor your KVM instance</p>
                      </div>
                      <div className="flex gap-2">
                         <button className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Power size={20}/></button>
                         <button className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-900 hover:text-white transition-all"><Terminal size={20}/></button>
                      </div>
                   </div>

                   {/* Dynamic Content Switching Logic */}
                   {activeModule === 'Overview' && (
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          { label: 'CPU Cores', val: vps.specs.cpu, icon: Cpu },
                          { label: 'RAM Memory', val: vps.specs.ram, icon: Database },
                          { label: 'NVMe Storage', val: vps.specs.disk, icon: HardDrive }
                        ].map((stat, i) => (
                          <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                            <stat.icon size={24} className="text-indigo-600 mb-4" />
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-xl font-black text-slate-900 mt-1">{stat.val}</p>
                          </div>
                        ))}
                     </div>
                   )}

                   {activeModule === 'Backups' && (
                     <div className="text-center py-20">
                        <History size={48} className="mx-auto text-slate-200 mb-4" />
                        <h3 className="font-black text-slate-900">No Backups Found</h3>
                        <p className="text-sm text-slate-400 mt-2">Create your first automated snapshot now.</p>
                        <button className="mt-6 bg-indigo-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase">Create Backup</button>
                     </div>
                   )}
                     {activeModule === 'Docker' && (               <div className="text-center py-20"> 
                        <Box size={48} className="mx-auto text-slate-200 mb-4" />
                        <h3 className="font-black text-slate-900">Docker Manager Coming Soon</h3>
                        <p className="text-sm text-slate-400 mt-2">Easily deploy and manage containerized apps.</p>
                     </div>
                   )}
                        {activeModule === 'Security' && (               <div className="text-center py-20">
                        <ShieldCheck size={48} className="mx-auto text-slate-200 mb-4" />
                        <h3 className="font-black text-slate-900">Security Module Coming Soon</h3>
                        <p className="text-sm text-slate-400 mt-2">Advanced firewall and DDoS protection features.</p>
                        </div>
                     )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Supporting Icons from Lucide for Stats
const Cpu = ({size, className}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><path d="M9 9h6v6H9z"></path><path d="M15 2v2"></path><path d="M9 2v2"></path><path d="M15 20v2"></path><path d="M9 20v2"></path><path d="M20 15h2"></path><path d="M20 9h2"></path><path d="M2 15h2"></path><path d="M2 9h2"></path></svg>;
const Database = ({size, className}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>;

export default VPSDashboard;
