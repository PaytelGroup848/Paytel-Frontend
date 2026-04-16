//@ts-nocheck
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

/* ── 1. CONFIGURATION (Scalability) ── */
const VALIDATION_RULES = [
  { id: "number", label: "One number", test: (p) => /\d/.test(p) },
  { id: "lowercase", label: "One lowercase letter", test: (p) => /[a-z]/.test(p) },
  { id: "uppercase", label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { id: "length", label: "8-50 characters", test: (p) => p.length >= 8 && p.length <= 50 },
  { id: "symbol", label: "One symbol", test: (p) => /[-!@#$%^&*()_=+{}[\]|\\:;"'<>,.?/~`]/.test(p) },
];

/* ── 2. ATOMIC COMPONENTS ── */
const IconWrapper = ({ children, className = "" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const InputField = ({ label, type, value, onChange, showPasswordToggle, onToggle }) => (
  <div className="relative group">
    <div className="flex justify-between items-center mb-2 px-1">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-focus-within:text-indigo-600 transition-colors">
            {label}
        </label>
    </div>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Enter ${label.toLowerCase()}...`}
        className="w-full bg-slate-50 border-2 border-slate-100 group-hover:border-slate-200 focus:border-indigo-500 focus:bg-white rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 outline-none transition-all shadow-sm focus:shadow-indigo-100/50 focus:shadow-xl"
      />
      {showPasswordToggle && (
        <button 
          type="button" 
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-300 hover:text-indigo-500 transition-colors bg-white rounded-lg shadow-sm"
        >
          {type === "password" ? (
            <IconWrapper className="w-4 h-4"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-6.66M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M3 3l18 18" /></IconWrapper>
          ) : (
            <IconWrapper className="w-4 h-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 100-6 3 3 0 000 6z" /></IconWrapper>
          )}
        </button>
      )}
    </div>
  </div>
);

/* ── 3. MAIN PAGE ── */
export default function WordpressNew() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "admin@cloudedata.io",
    password: "",
    language: "English (US)"
  });
  const [showPass, setShowPass] = useState(false);

  const validationResults = useMemo(() => {
    return VALIDATION_RULES.map(rule => ({
      ...rule,
      passed: rule.test(formData.password)
    }));
  }, [formData.password]);

  const allValid = validationResults.every(r => r.passed) && formData.email.includes('@');

  return (
    <div className="min-h-screen bg-[#FDFEFF] font-sans antialiased text-slate-800 overflow-x-hidden">
      
      {/* BACKGROUND DECOR */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-indigo-50/40 rounded-full blur-[120px] -z-10" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-blue-50/40 rounded-full blur-[100px] -z-10" />

      {/* HEADER */}
      <header className="h-20 px-6 md:px-12 flex items-center justify-between sticky top-0 bg-white/60 backdrop-blur-xl border-b border-slate-100 z-50">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-slate-200 group hover:bg-indigo-600 transition-colors">
            <IconWrapper className="w-5 h-5 group-hover:rotate-12 transition-transform"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></IconWrapper>
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tighter leading-none">CloudeData</h2>
            <p className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.3em] mt-1">Web Systems</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="hidden sm:flex flex-col items-end mr-4">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Setup Progress</span>
              <div className="w-32 h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                 <div className="w-1/2 h-full bg-indigo-600 rounded-full" />
              </div>
           </div>
           <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 p-1">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="rounded-xl" alt="avatar" />
           </div>
        </div>
      </header>

      <main className="pt-16 pb-32 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          {/* LEFT: CONTENT */}
          <div className="lg:col-span-6 space-y-12">
            <section className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
                <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Configuration Phase</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[0.95]">
                Admin <br />
                <span className="text-indigo-600">Access.</span>
              </h1>
              <p className="text-slate-500 text-lg font-medium max-w-md leading-relaxed">
                Set up your WordPress master credentials. These will be used to access your site's dashboard.
              </p>
            </section>

            <div className="space-y-6 max-w-md">
              <InputField 
                label="Master Admin Email" 
                value={formData.email} 
                onChange={(v) => setFormData({...formData, email: v})} 
              />
              
              <InputField 
                label="Strong Password" 
                type={showPass ? "text" : "password"}
                value={formData.password} 
                onChange={(v) => setFormData({...formData, password: v})}
                showPasswordToggle
                onToggle={() => setShowPass(!showPass)}
              />

              {/* Password Health Check */}
              <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100/50 space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-3">Security Requirements</p>
                <div className="grid grid-cols-1 gap-3">
                  {validationResults.map((res) => (
                    <div key={res.id} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all ${res.passed ? 'bg-emerald-500 text-white rotate-0' : 'bg-slate-100 text-slate-300 -rotate-90'}`}>
                        {res.passed ? (
                          <IconWrapper className="w-3 h-3"><path d="M20 6L9 17l-5-5"/></IconWrapper>
                        ) : (
                          <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                        )}
                      </div>
                      <span className={`text-[11px] font-bold tracking-tight transition-colors ${res.passed ? 'text-slate-700' : 'text-slate-400'}`}>{res.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: DECORATIVE PANEL */}
          <div className="lg:col-span-6 hidden lg:block">
            <div className="relative">
              {/* Glass Card */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl" />
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-[3rem] p-1 shadow-2xl overflow-hidden aspect-square flex items-center justify-center relative group">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                  <div className="relative text-center p-12 space-y-6">
                      <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
                          <IconWrapper className="w-10 h-10 text-white"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></IconWrapper>
                      </div>
                      <h3 className="text-2xl font-black text-white leading-tight">Zero-Trust <br />Security</h3>
                      <p className="text-indigo-100/70 text-sm font-medium leading-relaxed">Your credentials are encrypted with AES-256 before being stored in our secure vault.</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FLOATING ACTION BAR */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 md:px-12 bg-white/80 backdrop-blur-2xl border-t border-slate-100 flex items-center justify-between z-[100]">
        <button 
          onClick={() => navigate(-1)}
          className="text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-900 transition-colors flex items-center gap-2"
        >
          <IconWrapper className="w-4 h-4"><path d="M19 12H5M12 19l-7-7 7-7"/></IconWrapper>
          Go Back
        </button>
        
        <button 
          onClick={() => navigate('/wordpress/domainEnter')}
          disabled={!allValid}
          className={`group px-10 py-5 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center gap-4 active:scale-95 shadow-2xl ${
            allValid 
            ? 'bg-slate-900 text-white hover:bg-indigo-600 shadow-indigo-200 hover:shadow-indigo-500/40' 
            : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          {allValid ? "Choose Domain" : "Complete Credentials"}
          <IconWrapper className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${!allValid && 'opacity-30'}`}><path d="M5 12h14M12 5l7 7-7 7" /></IconWrapper>
        </button>
      </footer>
    </div>
  );
}