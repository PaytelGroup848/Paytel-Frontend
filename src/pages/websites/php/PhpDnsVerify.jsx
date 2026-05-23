import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, ArrowRight, ShieldCheck, Zap, Server, Loader2, ArrowLeft } from 'lucide-react';
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
      toast.success('Installing site...');
      // Start polling for status
      const interval = setInterval(async () => {
        const updated = await refetch();
        if (updated.data?.status === 'active') {
          clearInterval(interval);
          setIsInstalling(false);
          toast.success('Site is live!');
          navigate(`/websites/php/dashboard/${instanceId}`);
        }
      }, 5000);
    } catch (err) {
      toast.error('Verification failed');
    }
  }, [instanceId, verifyDns, refetch, navigate]);

  useEffect(() => {
    if (instance?.status === 'active') {
      navigate(`/websites/php/dashboard/${instanceId}`);
    }
  }, [instance?.status, instanceId, navigate]);

  if (!instance) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-indigo-600" /></div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-indigo-100 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-50/60 rounded-full blur-[100px] -z-10" />

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl relative z-10">
        <Link to="/websites/php/paid" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-black uppercase text-[10px] tracking-widest mb-10 transition-colors">
          <ArrowLeft size={16} />
          Back to My Sites
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-xl shadow-indigo-100/50 flex items-center justify-center mx-auto mb-6 border border-slate-50">
            <Globe className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Connect <span className="text-indigo-600">Domain</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg">
            Point your domain to <span className="text-slate-900 font-bold">CloudeData</span> PHP infrastructure.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(79,70,229,0.05)] relative overflow-hidden">
          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">https://</span>
              </div>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value.toLowerCase().trim())}
                placeholder="yourdomain.com"
                disabled={showDnsCard}
                className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl py-5 pl-24 pr-6 text-lg font-bold outline-none transition-all focus:border-indigo-400 focus:bg-white disabled:opacity-70"
              />
              <div className="absolute inset-y-0 right-6 flex items-center">
                {(setupDomain.isPending || verifyDns.isPending || isInstalling) && (
                  <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
                )}
              </div>
            </div>

            {!showDnsCard && (
              <button
                disabled={!isValid || setupDomain.isPending}
                onClick={handleDomainSubmit}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-lg ${
                  !isValid || setupDomain.isPending
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-900 text-white hover:bg-indigo-600 shadow-indigo-100'
                }`}
              >
                {setupDomain.isPending ? 'Configuring...' : 'Continue to DNS Setup'}
                <ArrowRight size={16} />
              </button>
            )}

            {showDnsCard && (
              <div className="rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-4 text-xs text-indigo-900">
                <p className="font-semibold">Add the following A Record in your DNS provider:</p>
                <div className="mt-3 overflow-hidden rounded-lg border border-indigo-200 bg-white">
                  <div className="grid grid-cols-3 text-[11px] font-bold uppercase tracking-wide text-indigo-700 bg-indigo-100/60">
                    <div className="px-3 py-2">Type</div>
                    <div className="px-3 py-2">Host/Name</div>
                    <div className="px-3 py-2">Value/Points To</div>
                  </div>
                  <div className="grid grid-cols-3 text-[12px] font-semibold">
                    <div className="px-3 py-2 border-t border-indigo-100">A</div>
                    <div className="px-3 py-2 border-t border-indigo-100">@</div>
                    <div className="px-3 py-2 border-t border-indigo-100 break-all">{instance.serverIp}</div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button
                    onClick={runVerify}
                    disabled={verifyDns.isPending || isInstalling}
                    className="w-full py-4 rounded-xl bg-indigo-600 text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-700 disabled:opacity-60"
                  >
                    {verifyDns.isPending ? 'Verifying...' : 'Verify DNS Configuration'}
                  </button>
                  <button
                    onClick={() => setShowDnsCard(false)}
                    className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors"
                  >
                    Change Domain
                  </button>
                </div>
              </div>
            )}

            {isInstalling && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="font-bold uppercase tracking-widest text-[10px]">Installing {instance.siteType.toUpperCase()} Site...</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-10 border-t border-slate-50">
            <Feature icon={<ShieldCheck size={18} />} title="Free SSL" />
            <Feature icon={<Zap size={18} />} title="Fast PHP" />
            <Feature icon={<Server size={18} />} title="Dedicated IP" />
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
