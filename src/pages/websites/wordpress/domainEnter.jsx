//@ts-nocheck
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ArrowRight, ShieldCheck, Zap, Server, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function DomainEnter() {
  const navigate = useNavigate();
  const [domain, setDomain] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [checkStatus, setCheckStatus] = useState("idle"); // idle | checking | available | taken
  const [errorMessage, setErrorMessage] = useState("");

  const handleDomainChange = (e) => {
    const value = e.target.value.toLowerCase().trim();
    setDomain(value);
    setCheckStatus("idle");
    setErrorMessage("");
    
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    setIsValid(domainRegex.test(value));
  };

  const handleDomainSubmit = async () => {
    if (!isValid) return;
    
    setCheckStatus("checking");
    
    // ── DYNAMIC DB CHECK SIMULATION ──
    // Yahan tum apna actual API call kar sakte ho
    setTimeout(() => {
      const takenDomains = ["google.com", "facebook.com", "mysite.com"];
      
      if (takenDomains.includes(domain)) {
        setCheckStatus("taken");
        setErrorMessage("This domain is already registered in our database.");
      } else {
        setCheckStatus("available");
        // Success par 1.5s baad redirect
        setTimeout(() => {
          navigate("/wordpress/setup-success");
        }, 1500);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-indigo-100 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* ── LIGHT THEME GRADIENTS ── */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-50/60 rounded-full blur-[100px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl relative z-10"
      >
        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-xl shadow-indigo-100/50 flex items-center justify-center mx-auto mb-6 border border-slate-50">
            <Globe className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Custom <span className="text-indigo-600">Domain</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg">
            Connect your brand to <span className="text-slate-900 font-bold">CloudeData</span> infrastructure.
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(79,70,229,0.05)] relative overflow-hidden">
          
          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">https://</span>
              </div>
              <input 
                type="text" 
                value={domain}
                onChange={handleDomainChange}
                placeholder="yourdomain.com"
                className={`w-full bg-slate-50/50 border-2 rounded-2xl py-5 pl-24 pr-6 text-lg font-bold outline-none transition-all 
                  ${checkStatus === 'taken' ? 'border-red-100 focus:border-red-400 bg-red-50/30' : 
                    checkStatus === 'available' ? 'border-emerald-100 focus:border-emerald-400 bg-emerald-50/30' : 
                    'border-slate-100 focus:border-indigo-400 focus:bg-white'}`}
              />
              
              {/* STATUS INDICATORS */}
              <div className="absolute inset-y-0 right-6 flex items-center">
                {checkStatus === "checking" && <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />}
                {checkStatus === "available" && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                {checkStatus === "taken" && <AlertCircle className="w-5 h-5 text-red-500" />}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {errorMessage && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-xs font-bold px-2 flex items-center gap-2"
                >
                  <AlertCircle size={14} /> {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>

            <button 
              disabled={!isValid || checkStatus === "checking"}
              onClick={handleDomainSubmit}
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-lg
                ${checkStatus === "available" ? 'bg-emerald-500 text-white shadow-emerald-200' : 
                  !isValid || checkStatus === "checking" ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 
                  'bg-slate-900 text-white hover:bg-indigo-600 shadow-indigo-100'}`}
            >
              {checkStatus === "checking" ? "Verifying Domain..." : 
               checkStatus === "available" ? "Success! Redirecting..." : 
               "Launch with this Domain"}
              <ArrowRight size={16} />
            </button>
          </div>

          {/* BOTTOM FEATURES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-10 border-t border-slate-50">
            <Feature icon={<ShieldCheck size={18} />} title="Edge SSL" />
            <Feature icon={<Zap size={18} />} title="Tier-1 CDN" />
            <Feature icon={<Server size={18} />} title="Global IP" />
          </div>
        </div>

        <p className="text-center mt-8 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
          Secured by <span className="text-indigo-500">CloudeData Shield</span>
        </p>
      </motion.div>
    </div>
  );
}

function Feature({ icon, title }) {
  return (
    <div className="flex items-center gap-3 justify-center md:justify-start group">
      <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
        {icon}
      </div>
      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">{title}</span>
    </div>
  );
}