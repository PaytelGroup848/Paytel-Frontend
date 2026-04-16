//@ts-nocheck
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Shield, 
  ChevronLeft, 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  Zap,
  Loader2
} from "lucide-react";

/* ── 1. SCALABLE VALIDATION ENGINE ── */
const VALIDATION_RULES = [
  { id: "number", label: "At least one number", test: (p) => /\d/.test(p) },
  { id: "lowercase", label: "Lowercase letter", test: (p) => /[a-z]/.test(p) },
  { id: "uppercase", label: "Uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { id: "length", label: "8-50 characters", test: (p) => p.length >= 8 && p.length <= 50 },
  { id: "symbol", label: "Special character", test: (p) => /[-!@#$%^&*()_=+{}[\]|\\:;"'<>,.?/~`]/.test(p) },
];

export default function WordpressNew() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: "admin@cloudedata.io",
    password: "",
  });

  /* ── 2. LOGIC: DB SCALABILITY & VALIDATION ── */
  const validationResults = useMemo(() => {
    return VALIDATION_RULES.map(rule => ({
      ...rule,
      passed: rule.test(formData.password)
    }));
  }, [formData.password]);

  const strengthPercentage = (validationResults.filter(r => r.passed).length / VALIDATION_RULES.length) * 100;
  const allValid = validationResults.every(r => r.passed) && formData.email.includes('@');

  // Yahan se data aapke database API me jayega
  const handleProvisioning = async () => {
    if (!allValid) return;
    
    setIsSubmitting(true);
    try {
      // Simulation of DB storage call
      // await axios.post('/api/v1/instances/provision', formData);
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      navigate('/wordpress/domainEnter');
    } catch (error) {
      console.error("Scalability Error: DB connection failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-900">
      
      {/* ── AMBIENT DECOR ── */}
      <div className="fixed -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] animate-pulse" />
      <div className="fixed -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />

      {/* ── NAVIGATION ── */}
      <nav className="h-20 px-8 md:px-16 flex items-center justify-between sticky top-0 bg-white/70 backdrop-blur-md border-b border-slate-200/50 z-[100]">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-slate-900 group-hover:bg-indigo-600 rounded-xl flex items-center justify-center transition-all duration-300">
            <Zap className="text-white w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-black tracking-tighter">CloudeData</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:block text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Status</p>
            <p className="text-xs font-bold text-emerald-500 flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              API Online
            </p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-slate-100 p-0.5">
            <img src="https://api.dicebear.com/7.x/shapes/svg?seed=Cloude" className="rounded-full bg-slate-50" alt="user" />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-16 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* ── LEFT: FORM PANEL ── */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-10">
            <header className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm">
                <Shield size={12} className="text-indigo-600" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Step 02: Encryption setup</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Identity <span className="text-indigo-600">&</span> <br />Security.
              </h1>
              <p className="text-slate-500 text-lg font-medium max-w-md">
                Configure your root administrative credentials. These will be stored in your private instance vault.
              </p>
            </header>

            <div className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Admin Identifier</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  <input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-14 pr-6 font-bold text-slate-800 outline-none focus:ring-4 ring-indigo-500/5 focus:border-indigo-500 transition-all shadow-sm"
                    placeholder="name@domain.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 text-flex justify-between flex">
                  Master Password
                  <span className={`text-[10px] transition-colors ${strengthPercentage === 100 ? 'text-emerald-500' : 'text-slate-300'}`}>
                    Strength: {strengthPercentage}%
                  </span>
                </label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  <input 
                    type={showPass ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-14 pr-14 font-bold text-slate-800 outline-none focus:ring-4 ring-indigo-500/5 focus:border-indigo-500 transition-all shadow-sm"
                    placeholder="••••••••"
                  />
                  <button 
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-50 rounded-lg text-slate-300 transition-colors"
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {/* Strength Bar */}
                <div className="h-1.5 w-full bg-slate-100 rounded-full mt-3 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 rounded-full ${strengthPercentage <= 40 ? 'bg-red-500' : strengthPercentage <= 80 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                    style={{ width: `${strengthPercentage}%` }}
                  />
                </div>
              </div>

              {/* Validation Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {validationResults.map((rule) => (
                  <div key={rule.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${rule.passed ? 'bg-emerald-50/50 border-emerald-100 text-emerald-700' : 'bg-white border-slate-100 text-slate-400'}`}>
                    {rule.passed ? <CheckCircle2 size={16} /> : <Circle size={16} className="opacity-20" />}
                    <span className="text-xs font-bold tracking-tight">{rule.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: SYSTEM INFO PANEL ── */}
          <div className="lg:col-span-5 xl:col-offset-1 space-y-6">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-200/50">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Shield size={120} />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/40">
                  <Lock className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-black leading-tight">Zero-Knowledge <br />Storage Architecture</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  We utilize AES-256-GCM encryption. CloudeData never stores your master password in plain text. 
                  Data is sharded across multiple secure DB clusters for maximum scalability.
                </p>
                <div className="pt-4 space-y-3">
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-300 border-t border-slate-800 pt-6">
                    <CheckCircle2 size={14} className="text-indigo-400" /> End-to-End Encrypted Provisioning
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
                    <CheckCircle2 size={14} className="text-indigo-400" /> Automated SQL Sharding
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-6 flex items-center gap-4">
               <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-600">
                 <Zap size={24} />
               </div>
               <div>
                 <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Instance Latency</p>
                 <p className="text-sm font-black text-indigo-900">Provisioning time ~45 seconds</p>
               </div>
            </div>
          </div>

        </div>
      </main>

      {/* ── FLOATING FOOTER ACTIONS ── */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-200 px-8 py-5 flex items-center justify-between z-[100]">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors"
        >
          <ChevronLeft size={16} strokeWidth={3} />
          Back
        </button>

        <button 
          onClick={handleProvisioning}
          disabled={!allValid || isSubmitting}
          className={`group flex items-center gap-4 px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all active:scale-95 ${
            allValid && !isSubmitting
            ? 'bg-slate-900 text-white shadow-xl shadow-indigo-100 hover:bg-indigo-600'
            : 'bg-slate-100 text-slate-300 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin w-4 h-4" />
              Writing to DB...
            </>
          ) : (
            <>
              Initialize Node
              <ArrowRight size={16} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </footer>
    </div>
  );
}