import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, ArrowRight, ShieldCheck, Zap, Server, Loader2, ArrowLeft, 
  CheckCircle, Copy, ExternalLink, Cloud, Cpu, Database 
} from 'lucide-react';
import toast from 'react-hot-toast';

import { usePhpInstance, useVerifyPhpDNS, useSetupPhpDomain } from '../../../hooks/usePhpHosting';

export default function PhpDnsVerify() {
  const { instanceId } = useParams();
  const navigate = useNavigate();
  
  const { data: instance, refetch } = usePhpInstance(instanceId);
  const verifyDns = useVerifyPhpDNS();
  const setupDomain = useSetupPhpDomain();

  const [domain, setDomain] = useState('');
  const [showDnsCard, setShowDnsCard] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync domain state if instance already has one
  useEffect(() => {
    if (instance?.domain) {
      setDomain(instance.domain);
      setShowDnsCard(true);
    }
  }, [instance]);

  const isValid = useMemo(
    () => /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(domain),
    [domain]
  );

  const handleDomainSubmit = async () => {
    if (!isValid) return;
    try {
      await setupDomain.mutateAsync({ instanceId, domain });
      setShowDnsCard(true);
      toast.success('Domain configured!');
    } catch (error) {
      toast.error('Domain already in use');
    }
  };

  const runVerify = useCallback(async () => {
    if (!instanceId) return;
    try {
      const data = await verifyDns.mutateAsync({ instanceId });
      if (!data?.verified) {
        toast.error(`DNS not pointed yet. Found IP: ${data?.currentIp || 'None'}`);
        return;
      }
      setIsInstalling(true);
      toast.success('DNS verified! Installing your site...');
      // Start polling for status
      const interval = setInterval(async () => {
        const updated = await refetch();
        if (updated.data?.status === 'active') {
          clearInterval(interval);
          setIsInstalling(false);
          toast.success('Site is live!');
          navigate(`/php-hosting/dashboard/${instanceId}`);
        }
      }, 5000);
    } catch (err) {
      toast.error('Verification failed');
    }
  }, [instanceId, verifyDns, refetch, navigate]);

  useEffect(() => {
    if (instance?.status === 'active') {
      navigate(`/php-hosting/dashboard/${instanceId}`);
    }
  }, [instance?.status, instanceId, navigate]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('IP copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  if (!instance) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="relative flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Loading Instance...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-slate-50 to-indigo-50/30 selection:bg-indigo-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      
      {/* Decorative Blur Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-200/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-2xl relative z-10"
      >
        {/* Modern Back Nav */}
        <Link 
          to="/php-hosting/paid" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold uppercase text-[11px] tracking-wider mb-6 transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to My Sites
        </Link>

        {/* Card Frame */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          <div className="p-6 sm:p-10">
            
            {/* Header / Brand Identity */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner mx-auto mb-4 border border-indigo-100/50">
                <Globe size={26} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mb-2">
                Connect Your Domain
              </h1>
              <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto">
                Point your custom domain to <span className="font-semibold text-slate-800">CloudeData</span> infrastructure to route your traffic.
              </p>
            </div>

            {/* Inputs / Operations Content */}
            <div className="space-y-6">
              
              {/* Input Group */}
              <div className="relative flex items-center">
                <div className="absolute left-4 px-3 py-1 bg-slate-100 border border-slate-200/60 rounded-lg text-slate-500 font-semibold text-xs tracking-wide select-none">
                  https://
                </div>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value.toLowerCase().trim())}
                  placeholder="yourdomain.com"
                  disabled={showDnsCard}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-3.5 pl-24 pr-12 text-sm font-semibold text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 disabled:bg-slate-100/80 disabled:text-slate-500 disabled:cursor-not-allowed"
                />
                <div className="absolute right-4">
                  {isValid && domain && !showDnsCard && (
                    <CheckCircle size={18} className="text-emerald-500" />
                  )}
                  {(setupDomain.isPending || verifyDns.isPending || isInstalling) && (
                    <Loader2 size={18} className="text-indigo-600 animate-spin" />
                  )}
                </div>
              </div>

              {/* Initial Action Button */}
              {!showDnsCard && (
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                  disabled={!isValid || setupDomain.isPending}
                  onClick={handleDomainSubmit}
                  className={`w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all ${
                    !isValid || setupDomain.isPending
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md shadow-slate-900/10'
                  }`}
                >
                  {setupDomain.isPending ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Configuring Domain...
                    </>
                  ) : (
                    <>
                      Continue to DNS Setup
                      <ArrowRight size={14} />
                    </>
                  )}
                </motion.button>
              )}

              {/* Interactive DNS Record Display */}
              <AnimatePresence>
                {showDnsCard && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-2xl border border-indigo-100 bg-indigo-50/30 p-5 space-y-4">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={16} className="text-indigo-600 shrink-0" />
                        <h3 className="text-xs font-bold text-indigo-950 uppercase tracking-wider">Configure DNS Records</h3>
                      </div>
                      
                      <p className="text-xs text-indigo-900/80 leading-relaxed">
                        Log in to your domain registrar (e.g., GoDaddy, Namecheap, Cloudflare) and append the following <strong>A record</strong> to your DNS zone settings:
                      </p>

                      {/* DNS Data Presentation Box */}
                      <div className="rounded-xl border border-slate-200/80 bg-white shadow-sm overflow-hidden text-xs">
                        <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-500 px-4 py-2">
                          <div>Type</div>
                          <div>Host</div>
                          <div>Value / Destination</div>
                        </div>
                        <div className="grid grid-cols-3 items-center px-4 py-3 font-mono font-medium text-slate-800">
                          <div className="text-indigo-600 font-bold">A</div>
                          <div>@</div>
                          <div className="flex items-center justify-between gap-2 bg-slate-50 border border-slate-100 px-2 py-1 rounded-md max-w-full overflow-hidden">
                            <span className="truncate select-all">{instance.serverIp}</span>
                            <button 
                              onClick={() => copyToClipboard(instance.serverIp)}
                              className="p-1 rounded hover:bg-slate-200/60 transition text-slate-400 hover:text-slate-700 shrink-0"
                              title="Copy IP Address"
                            >
                              {copied ? <CheckCircle size={12} className="text-emerald-600" /> : <Copy size={12} />}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Control Group */}
                      <div className="pt-2 flex flex-col gap-3">
                        <motion.button
                          whileHover={{ y: -1 }}
                          whileTap={{ y: 0 }}
                          onClick={runVerify}
                          disabled={verifyDns.isPending || isInstalling}
                          className="w-full py-3.5 rounded-xl bg-indigo-600 text-white font-bold uppercase tracking-wider text-xs shadow-lg shadow-indigo-600/10 hover:bg-indigo-500 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                        >
                          {verifyDns.isPending ? (
                            <>
                              <Loader2 size={14} className="animate-spin" />
                              Validating Setup...
                            </>
                          ) : (
                            <>
                              <Zap size={14} />
                              Verify DNS Settings
                            </>
                          )}
                        </motion.button>
                        
                        <button
                          onClick={() => setShowDnsCard(false)}
                          className="text-[11px] font-bold text-slate-400 uppercase tracking-wide hover:text-slate-600 transition-colors py-1 text-center"
                        >
                          Modify Domain Name
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Server Provisioning/Installation State */}
              <AnimatePresence>
                {isInstalling && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 text-emerald-800 flex items-center justify-center gap-3 shadow-sm"
                  >
                    <Loader2 size={16} className="animate-spin text-emerald-600 shrink-0" />
                    <span className="font-bold uppercase tracking-wide text-[10px]">
                      Provisioning live {instance.siteType.toUpperCase()} container — Environment build in progress
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Micro-Features Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 pt-6 border-t border-slate-100">
              <Feature icon={<ShieldCheck size={14} />} title="Automated SSL" desc="Let's Encrypt Layer" />
              <Feature icon={<Zap size={14} />} title="V8 PHP Engine" desc="OpCache Tuned Stack" />
              <Feature icon={<Server size={14} />} title="Dedicated Node" desc="Isolated IPv4 Matrix" />
            </div>

          </div>
        </div>

        {/* Structural Footer Branding */}
        <div className="mt-6 text-center">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
            Secured by <span className="text-slate-600 font-bold">CloudeData Shield</span> Network • End-to-End Encryption
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Subcomponent Wrapper for Clean Feature Grid Elements
function Feature({ icon, title, desc }) {
  return (
    <div className="flex items-center gap-2.5 p-1">
      <div className="w-7 h-7 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-slate-600 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-800 leading-tight">{title}</p>
        <p className="text-[10px] text-slate-400 font-normal mt-0.5">{desc}</p>
      </div>
    </div>
  );
}