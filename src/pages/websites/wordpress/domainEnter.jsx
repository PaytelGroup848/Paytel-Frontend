import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, ArrowRight, ShieldCheck, Zap, Server, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { useCreateInstance, useInstance, useVerifyDNS } from '../../../hooks/useWordPress';

export default function DomainEnter() {
  const navigate = useNavigate();
  const createInstance = useCreateInstance();
  const verifyDns = useVerifyDNS();

  const dnsData = verifyDns?.data;

  console.log("this is my verifydns", verifyDns?.data)

  const [domain, setDomain] = useState('');
  const [createdInstanceId, setCreatedInstanceId] = useState('');
  const [serverIp, setServerIp] = useState('');
  const [showDnsCard, setShowDnsCard] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  const { data: instanceStatus } = useInstance(createdInstanceId, {
    enabled: Boolean(createdInstanceId) && isInstalling,
    refetchInterval: isInstalling ? 5000 : false,
  });

  const isValid = useMemo(
    () => /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(domain),
    [domain]
  );

  const handleDomainSubmit = async () => {
    if (!isValid) return;
    const data = await createInstance.mutateAsync({ domain });
    const instanceId = data?.instanceId || data?.id || data?._id;
    if (!instanceId) return;
    setCreatedInstanceId(instanceId);
    setServerIp(data?.serverIp || '');
    setShowDnsCard(true);
    setIsInstalling(false);
  };

  const runVerify = useCallback(async () => {
    if (!createdInstanceId) return;
    const data = await verifyDns.mutateAsync({ instanceId: createdInstanceId });
    if (!data?.verified) {
      toast.error('DNS not propagated yet, try again');
      return;
    }
    setIsInstalling(true);
    toast.success('Installing WordPress...');
  }, [createdInstanceId, verifyDns]);

  useEffect(() => {
    if (!isInstalling || !instanceStatus) return;
    if (instanceStatus.status === 'active') {
      navigate(`/wordpress/websitedashboard/${createdInstanceId}`);
    }
  }, [createdInstanceId, instanceStatus, isInstalling, navigate]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-indigo-100 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-50/60 rounded-full blur-[100px] -z-10" />

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl relative z-10">
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
                className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl py-5 pl-24 pr-6 text-lg font-bold outline-none transition-all focus:border-indigo-400 focus:bg-white"
              />
              <div className="absolute inset-y-0 right-6 flex items-center">
                {(createInstance.isPending || verifyDns.isPending || isInstalling) && (
                  <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
                )}
              </div>
            </div>

            <button
              disabled={!isValid || createInstance.isPending}
              onClick={handleDomainSubmit}
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-lg ${
                !isValid || createInstance.isPending
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-900 text-white hover:bg-indigo-600 shadow-indigo-100'
              }`}
            >
              {createInstance.isPending ? 'Submitting...' : 'Launch with this Domain'}
              <ArrowRight size={16} />
            </button>

            {showDnsCard ? (
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
                    <div className="px-3 py-2 border-t border-indigo-100 break-all">{serverIp || '-'}</div>
                  </div>
                </div>
{dnsData?.verified === false && (
  <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
        <span className="text-red-500 text-sm font-bold">✕</span>
      </div>
      <div className="flex-1">
        <p className="text-red-700 font-bold text-xs uppercase tracking-wide mb-1">
          DNS Mismatch Detected
        </p>
        <p className="text-red-600 text-xs leading-relaxed mb-2">
          Your domain is currently pointing to a different server. Please update your DNS A record.
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-red-100 rounded-lg px-3 py-2">
            <p className="text-[10px] font-bold uppercase tracking-wide text-red-400 mb-0.5">Current IP</p>
            <p className="text-red-700 font-mono font-bold text-xs">{dnsData?.currentIp || 'N/A'}</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
            <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-500 mb-0.5">Required IP</p>
            <p className="text-emerald-700 font-mono font-bold text-xs">{dnsData?.expectedIp || 'N/A'}</p>
          </div>
        </div>
        <p className="text-red-400 text-[10px] mt-2 italic">
          DNS changes can take up to 24 hours to propagate. Try verifying again in a few minutes.
        </p>
      </div>
    </div>
  </div>
)}
                <div className="mt-3">
                  <button
                    onClick={runVerify}
                    disabled={verifyDns.isPending || isInstalling}
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-60"
                  >
                    Verify DNS Configuration
                  </button>
                </div>
              </div>
            ) : null}

            {isInstalling ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Installing WordPress...
              </div>
            ) : null}
          </div>

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