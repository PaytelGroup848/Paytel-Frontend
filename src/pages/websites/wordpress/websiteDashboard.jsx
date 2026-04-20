import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Globe, Settings, ShieldCheck, BarChart3, Database, 
  FolderOpen, Zap, ExternalLink, HardDrive, Mail, 
  RotateCcw, ChevronRight, Cpu, Activity, Lock, Globe2
} from 'lucide-react';
import { useInstance } from '../../../hooks/useWordPress';

export default function WebsiteDashboard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: instance, isLoading } = useInstance(id);

  const siteData = useMemo(() => {
    if (!instance) return null;
    const diskPercent = Math.min(100, Math.max(0, (Number(instance.diskUsed || 0) / 1024) * 100));
    return {
      domain: instance.domain,
      createdDate: instance.createdAt ? new Date(instance.createdAt).toLocaleDateString() : '-',
      status: instance.status,
      type: 'WordPress',
      performanceScore: Number(instance.performanceScore || 0),
      diskUsage: Number.isNaN(diskPercent) ? 0 : diskPercent,
      hostingPlan: instance.planType || '-',
      serverLocation: instance.region || '-',
      ipAddress: instance.serverIp || '-',
      avgResponseTime: instance.avgResponseTime || 0,
      uptime30d: instance.uptime30d || 0,
      visitors: instance.visitors || 0,
      phpVersion: instance.phpVersion || '-',
      sslActive: Boolean(instance.sslActive),
      id: instance.id || instance._id,
    };
  }, [instance]);

  if (isLoading || !siteData) {
    return <div className="min-h-screen grid place-items-center text-slate-500">Loading website dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 pb-10">
      {/* Slim Progress Accent */}
      <div className="h-[3px] w-full bg-slate-100">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1 }}
          className="h-full bg-indigo-600"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6"
      >
        {/* HEADER AREA */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <nav className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              <span className="hover:text-indigo-600 cursor-pointer transition-colors">Websites</span>
              <ChevronRight size={10} />
              <span className="text-slate-600">Dashboard</span>
            </nav>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              Website Overview <Activity size={18} className="text-emerald-500" />
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
               <Settings size={14} />
               Configure
             </button>
             <button onClick={() => window.open(`https://${siteData.domain}/wp-admin`, '_blank')} className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-[11px] font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 flex items-center gap-2">
               {siteData.type} Admin <ExternalLink size={12} />
             </button>
          </div>
        </header>

        {/* COMPACT HERO SECTION */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 border border-indigo-100">
                <Globe2 size={32} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">{siteData.domain}</h2>
                  <span className="px-2 py-0.5 rounded text-[9px] font-black bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase">
                    {siteData.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 text-[11px] font-medium text-slate-500">
                  <span className="flex items-center gap-1"><Cpu size={12}/> {siteData.serverLocation}</span>
                  <span className="flex items-center gap-1"><Lock size={12}/> {siteData.sslActive ? 'SSL Active' : 'SSL Pending'}</span>
                  <span className="text-slate-400">IP: {siteData.ipAddress}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
                <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 min-w-[120px]">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Plan Type</p>
                  <p className="text-xs font-bold text-slate-800">{siteData.hostingPlan}</p>
                </div>
                <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 min-w-[120px]">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Created On</p>
                  <p className="text-xs font-bold text-slate-800">{siteData.createdDate}</p>
                </div>
            </div>
          </div>
        </section>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Performance Insight (Left Column) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden group">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Core Performance</h3>
                <Zap size={14} className="text-amber-400 fill-amber-400" />
              </div>
              
              <div className="flex items-center gap-6">
                 <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/10" />
                      <motion.circle 
                        initial={{ strokeDashoffset: 264 }}
                        animate={{ strokeDashoffset: 264 - (264 * siteData.performanceScore) / 100 }}
                        transition={{ duration: 1.5 }}
                        cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={264} className="text-indigo-500" strokeLinecap="round" />
                    </svg>
                    <span className="absolute text-2xl font-bold">{siteData.performanceScore}</span>
                 </div>
                 <div>
                   <p className="text-sm font-bold text-indigo-300">Excellent Score</p>
                   <p className="text-[11px] text-slate-400 leading-tight mt-1">Optimization is active and caching is enabled.</p>
                 </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-3">
                <span>Disk Usage</span>
                <span className="text-slate-900">{siteData.diskUsage}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                 <div className="h-full bg-indigo-600" style={{ width: `${siteData.diskUsage}%` }} />
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-tight">Using {instance.diskUsed || 0}MB of 1024MB total SSD storage.</p>
            </div>
          </div>

          {/* Quick Tools Grid (Right Column) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
             <ToolCard onClick={() => navigate(`/wordpress/${siteData.id}/files`)} icon={<FolderOpen size={18}/>} title="Files" desc="Access Root" />
             <ToolCard icon={<Database size={18}/>} title="Databases" desc="MySQL Panel" />
             <ToolCard icon={<ShieldCheck size={18}/>} title="Security" desc="SSL & WAF" />
             <ToolCard icon={<BarChart3 size={18}/>} title="Analytics" desc="Traffic Logs" />
             <ToolCard icon={<Mail size={18}/>} title="Emails" desc="Business Mail" />
             <ToolCard icon={<RotateCcw size={18}/>} title="Backups" desc="Daily Sync" />
          </div>
        </div>

        {/* BOTTOM STATS STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <CompactStat label="Avg. Response" value={`${siteData.avgResponseTime}ms`} />
           <CompactStat label="Uptime 30d" value={`${siteData.uptime30d}%`} />
           <CompactStat label="Visitors" value={String(siteData.visitors)} />
           <CompactStat label="PHP Version" value={siteData.phpVersion} />
        </div>

      </motion.div>
    </div>
  );
}

// ── REUSABLE UI COMPONENTS ──

function ToolCard({ icon, title, desc, onClick }) {
  return (
    <div onClick={onClick} className="bg-white border border-slate-200 p-4 rounded-xl hover:border-indigo-400 transition-all cursor-pointer group shadow-sm">
      <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all mb-3">
        {icon}
      </div>
      <h4 className="font-bold text-slate-800 text-[13px] tracking-tight">{title}</h4>
      <p className="text-[11px] font-medium text-slate-400 mt-0.5">{desc}</p>
    </div>
  );
}

function CompactStat({ label, value }) {
  return (
    <div className="bg-white border border-slate-100 px-4 py-3 rounded-xl shadow-sm">
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
      <p className="text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}