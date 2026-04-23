import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Globe, Settings, ShieldCheck, BarChart3, Database, 
  FolderOpen, Zap, ExternalLink, HardDrive, Mail, 
  RotateCcw, ChevronRight, Cpu, Activity, Lock, Globe2,
  Eye, EyeOff, Copy,
  Check,
  Construction
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useInstance, useInstanceCredentials, useResetPassword, useDbCredentials } from '../../../hooks/useWordPress';
import CorePerformance from './CorePerformance';

function ConfigureModal({ instanceId, isOpen, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const { data: creds, isLoading } = useInstanceCredentials(
    instanceId,
    isOpen
  );
  const resetPassword = useResetPassword();

  const copy = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };

  const handleReset = () => {
    if (!newPassword || newPassword.length < 8) {
      toast.error('Minimum 8 characters required');
      return;
    }
    resetPassword.mutate(
      { id: instanceId, newPassword },
      {
        onSuccess: () => {
          toast.success('Password updated!');
          setNewPassword('');
          setShowNewPassword(false); 
        },
        onError: (err) => {
          toast.error(
            err?.response?.data?.message || 'Failed to reset password'
          );
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              {creds?.domain || 'Loading...'}
            </h2>
            {creds?.wpAdminUrl && (
              <a
                href={creds.wpAdminUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-indigo-600 hover:underline flex items-center gap-1 mt-0.5"
              >
                Go to WordPress Admin
                <ExternalLink size={12} />
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500"
          >
            ✕
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT: Credentials */}
          <div>
            <div className="bg-slate-900 rounded-xl p-4">
              <p className="text-white font-medium text-sm mb-1">
                Login Credentials
              </p>
              <p className="text-slate-400 text-xs mb-4">
                Save these securely
              </p>

              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-10 bg-slate-800 rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {/* WP Admin URL */}
                  <div>
                    <label className="text-slate-400 text-xs mb-1 block">
                      WordPress Admin URL
                    </label>
                    <div className="flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-2">
                      <span className="text-slate-200 text-sm flex-1 truncate">
                        {creds?.wpAdminUrl}
                      </span>
                      <button
                        onClick={() => copy(creds?.wpAdminUrl, 'URL')}
                        className="text-slate-400 hover:text-white shrink-0"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Username */}
                  <div>
                    <label className="text-slate-400 text-xs mb-1 block">
                      Username
                    </label>
                    <div className="flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-2">
                      <span className="text-slate-200 text-sm flex-1">
                        {creds?.wpAdminUser}
                      </span>
                      <button
                        onClick={() => copy(creds?.wpAdminUser, 'Username')}
                        className="text-slate-400 hover:text-white shrink-0"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Existing Password */}
                  <div>
                    <label className="text-slate-400 text-xs mb-1 block">
                      Password
                    </label>
                    <div className="flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-2">
                      <span className="text-slate-200 text-sm flex-1 font-mono">
                        {showPassword
                          ? creds?.wpAdminPassword || '(not set)'
                          : '••••••••••••'}
                      </span>
                      <button
                        onClick={() => setShowPassword((v) => !v)}
                        className="text-slate-400 hover:text-white shrink-0"
                      >
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <button
                        onClick={() => copy(creds?.wpAdminPassword, 'Password')}
                        className="text-slate-400 hover:text-white shrink-0"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Warning */}
            <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              <span className="text-amber-500 text-xs mt-0.5">⚠</span>
              <p className="text-amber-700 text-xs">
                Please change your password immediately after first login.
              </p>
            </div>
          </div>

          {/* RIGHT: Reset Password */}
          <div>
            <h3 className="text-slate-800 font-semibold mb-1">
              Reset Password
            </h3>
            <p className="text-slate-500 text-sm mb-4">New Password</p>

            {/* New Password with Eye Icon */}
            <div className="relative mb-2">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter a strong password"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <p className="text-slate-400 text-xs mb-4">
              Minimum 12 characters with numbers and symbols recommended.
            </p>

            <button
              onClick={handleReset}
              disabled={resetPassword.isPending}
              className="w-full py-3 bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-600 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {resetPassword.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Password'
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function WebsiteDashboard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: instance, isLoading } = useInstance(id);
  const [configureOpen, setConfigureOpen] = useState(false);

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
             <button 
               onClick={() => setConfigureOpen(true)}
               className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
             >
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
          {/* <div className="lg:col-span-4 space-y-6 mt-4">
            <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden group">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Core Performance</h3>
                <Zap size={14} className="text-amber-400 fill-amber-400" />
              </div>
              
              <div className="flex items-center gap-6">
                 <div className="relative w-24 h-34 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="41" cy="65" r="38" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/10" />
                      <motion.circle 
                        initial={{ strokeDashoffset: 264 }}
                        animate={{ strokeDashoffset: 264 - (264 * siteData.performanceScore) / 100 }}
                        transition={{ duration: 1.5 }}
                        cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={264} className="text-indigo-500" strokeLinecap="round" />
                    </svg>
                    <span className="absolute text-xl font-bold">{siteData.performanceScore}</span>
                 </div>
                 <div>
                   <p className="text-sm font-bold text-indigo-300">Excellent Score</p>
                   <p className="text-[11px] text-slate-400 leading-tight mt-1">Optimization is active and caching is enabled.</p>
                 </div>
              </div>
            </div>

          </div> */}

          <div className="lg:col-span-4 ">
  <CorePerformance siteUrl={`https://${siteData.domain}`} />
</div>

          {/* Quick Tools Grid (Right Column) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
             <ToolCard onClick={() => navigate(`/wordpress/${siteData.id}/files`)} icon={<FolderOpen size={18}/>} title="Files" desc="Access Root" />
             <ToolCard onClick={() => navigate(`/wordpress/${siteData.id}/database`)} icon={<Database size={18}/>} title="Databases" desc="MySQL Panel" />
     <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 p-4 rounded-xl hover:border-emerald-400 hover:shadow-emerald-100 hover:shadow-md transition-all cursor-pointer group shadow-sm relative overflow-hidden">
  
  {/* Subtle background glow */}
  <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-200/30 rounded-full -translate-y-6 translate-x-6 pointer-events-none" />

  {/* Verified badge */}
  <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full">
    <Check size={12} />
    Verified
  </div>

  <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform mb-3">
    <ShieldCheck className="text-white" size={18} />
  </div>

  <h4 className="font-bold text-slate-800 text-[13px] tracking-tight">Security</h4>
  <p className="text-[11px] text-emerald-500 font-semibold mt-0.5">SSL & WAF</p>
</div>
             {/* <ToolCard icon={<ShieldCheck className='text-green-500' size={18}/>} title="Security" desc="SSL & WAF" /> */}
             <ToolCard onClick={() => navigate(`/wordpress/${siteData.id}/analytics`)} icon={<BarChart3 size={18}/>} title="Analytics" desc="Traffic Logs" />


  <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 border border-amber-300 p-4 rounded-xl hover:border-yellow-500 hover:shadow-yellow-200 hover:shadow-md transition-all cursor-not-allowed group shadow-sm relative overflow-hidden opacity-90">

  {/* Golden glow background */}
  <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-300/30 rounded-full -translate-y-8 translate-x-8 pointer-events-none blur-xl" />

  {/* Premium shimmer line */}
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/40 to-transparent opacity-0 group-hover:opacity-100 animate-pulse pointer-events-none" />

  {/* Coming Soon Badge */}
  <div className="absolute top-3 right-3 flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-[10px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full shadow-md shadow-yellow-200">
    <Construction  size={12} />
    Coming Soon
  </div>

  {/* Icon */}
  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-200 group-hover:scale-110 transition-transform mb-3">
    <Mail className="text-white" size={18} />
  </div>

  {/* Title */}
  <h4 className="font-bold text-slate-800 text-[13px] tracking-tight">
    Email
  </h4>

  {/* Subtitle */}
  <p className="text-[11px] text-amber-600 font-semibold mt-0.5">
    Business Mail
  </p>

  {/* Coming Soon Overlay */}
  <div className="absolute inset-0 bg-yellow-200/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition pointer-events-none" />

</div>


             {/* <ToolCard icon={<Mail size={18}/>} title="Emails" desc="Business Mail" /> */}




             <ToolCard onClick={() => navigate(`/wordpress/${siteData.id}/backups`)} icon={<RotateCcw size={18}/>} title="Backups" desc="Daily Sync" />
          </div>
        </div>


        <ConfigureModal 
          instanceId={id} 
          isOpen={configureOpen} 
          onClose={() => setConfigureOpen(false)} 
        />

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