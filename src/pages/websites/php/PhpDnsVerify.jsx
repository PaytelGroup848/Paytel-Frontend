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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50/20 to-purple-50/20">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Globe size={24} className="text-indigo-400 animate-pulse" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 font-sans selection:bg-indigo-100 flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-300/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-300/10 rounded-full blur-[150px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl relative z-10"
      >
        {/* Back button */}
        <Link to="/php-hosting/paid" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-black uppercase text-[10px] tracking-widest mb-6 transition-all group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to My Sites
        </Link>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-indigo-500/10 border border-white/60 overflow-hidden">
          {/* Gradient header */}
          <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          <div className="p-6 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-60" />
                <div className="relative w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-xl">
                  <Globe size={32} />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-3">
                Connect Your Domain
              </h1>
              <p className="text-slate-500 font-medium text-base max-w-md mx-auto">
                Point your domain to <span className="font-bold text-indigo-600">CloudeData</span> and go live in minutes
              </p>
            </div>

            {/* Domain Input Section */}
            <div className="space-y-6">
              <div className="relative group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">https://</span>
                </div>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value.toLowerCase().trim())}
                  placeholder="yourdomain.com"
                  disabled={showDnsCard}
                  className="w-full bg-slate-50/80 border-2 border-slate-200 rounded-2xl py-4 pl-24 pr-14 text-base font-bold outline-none transition-all focus:border-indigo-400 focus:bg-white focus:shadow-lg disabled:bg-slate-100 disabled:cursor-not-allowed"
                />
                <div className="absolute inset-y-0 right-5 flex items-center">
                  {isValid && domain && !showDnsCard && (
                    <CheckCircle size={18} className="text-emerald-500" />
                  )}
                  {(setupDomain.isPending || verifyDns.isPending || isInstalling) && (
                    <Loader2 size={18} className="text-indigo-500 animate-spin" />
                  )}
                </div>
              </div>

              {!showDnsCard && (
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!isValid || setupDomain.isPending}
                  onClick={handleDomainSubmit}
                  className={`w-full py-4 rounded-xl font-black uppercase tracking-wider text-sm flex items-center justify-center gap-3 transition-all shadow-lg ${
                    !isValid || setupDomain.isPending
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl hover:shadow-indigo-200'
                  }`}
                >
                  {setupDomain.isPending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Configuring Domain...
                    </>
                  ) : (
                    <>
                      Continue to DNS Setup
                      <ArrowRight size={16} />
                    </>
                  )}
                </motion.button>
              )}

              {/* DNS Record Card (animated) */}
              <AnimatePresence>
                {showDnsCard && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ type: "spring", damping: 20 }}
                    className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50/80 to-white p-5 shadow-lg"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <ShieldCheck size={18} className="text-indigo-600" />
                      <h3 className="text-sm font-black text-indigo-900 uppercase tracking-wider">DNS Configuration Required</h3>
                    </div>
                    <p className="text-xs text-indigo-800 mb-4">
                      Create an <strong>A Record</strong> at your domain registrar with the following values:
                    </p>

                    <div className="overflow-hidden rounded-xl border border-indigo-200 bg-white shadow-sm">
                      <div className="grid grid-cols-3 bg-indigo-100/50 text-[11px] font-black uppercase tracking-wide text-indigo-700">
                        <div className="px-4 py-2.5">Type</div>
                        <div className="px-4 py-2.5">Name/Host</div>
                        <div className="px-4 py-2.5">Value</div>
                      </div>
                      <div className="grid grid-cols-3 text-sm font-semibold">
                        <div className="px-4 py-3 border-t border-indigo-100 font-mono">A</div>
                        <div className="px-4 py-3 border-t border-indigo-100 font-mono">@</div>
                        <div className="px-4 py-3 border-t border-indigo-100 font-mono flex items-center justify-between gap-2">
                          <span className="break-all">{instance.serverIp}</span>
                          <button 
                            onClick={() => copyToClipboard(instance.serverIp)}
                            className="p-1 rounded-lg hover:bg-indigo-100 transition text-indigo-500"
                            title="Copy IP"
                          >
                            {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={runVerify}
                        disabled={verifyDns.isPending || isInstalling}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-black uppercase tracking-wider text-xs shadow-lg shadow-indigo-200 hover:shadow-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                      >
                        {verifyDns.isPending ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            Verifying DNS...
                          </>
                        ) : (
                          <>
                            <Zap size={14} />
                            Verify DNS Configuration
                          </>
                        )}
                      </motion.button>
                      <button
                        onClick={() => setShowDnsCard(false)}
                        className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors py-2"
                      >
                        Change Domain
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Installing status */}
              <AnimatePresence>
                {isInstalling && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-white px-5 py-4 text-sm text-emerald-800 flex items-center justify-center gap-3 shadow-md"
                  >
                    <Loader2 size={18} className="animate-spin text-emerald-600" />
                    <span className="font-bold uppercase tracking-wider text-xs">
                      Installing {instance.siteType.toUpperCase()} environment – this may take a minute
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Feature row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 pt-8 border-t border-slate-100">
              <Feature icon={<ShieldCheck size={16} />} title="Free SSL Certificate" desc="Auto-renewing HTTPS" />
              <Feature icon={<Zap size={16} />} title="Optimized PHP" desc="8.2 + OpCache" />
              <Feature icon={<Server size={16} />} title="Dedicated IP" desc="IPv4 + IPv6 ready" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Powered by <span className="text-indigo-500">CloudeData Shield</span> • 256-bit SSL
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="flex items-center gap-3 group">
      <div className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-black uppercase tracking-wider text-slate-700">{title}</p>
        <p className="text-[9px] text-slate-400 font-medium">{desc}</p>
      </div>
    </div>
  );
}