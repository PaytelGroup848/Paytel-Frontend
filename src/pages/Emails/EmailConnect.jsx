import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  Mail,
  ArrowLeft,
  ExternalLink,
  Server,
  CheckCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import EmailSidebar from './EmailSidebar';
import { useEmailPlan } from './EmailPlanContext';

/* ============================================================
   Hook – fetch email server configuration (demo fallback)
   ============================================================ */
const useEmailConfig = (planId, domain) => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch(`/api/email-config?planId=${planId}`);
        const ct = res.headers.get('content-type') || '';
        if (!res.ok || ct.includes('text/html')) throw new Error();
        const json = await res.json();
        setConfig(json);
      } catch {
        // Demo data – replace with real API
        const cleanDomain = domain ? domain.replace('@', '') : 'cloudedata.info';
        setConfig({
          domain: cleanDomain,
          protocols: [
            {
              name: 'Incoming server (IMAP)',
              hostname: `imap.${cleanDomain}`,
              port: 993,
              ssl: true,
            },
            {
              name: 'Outgoing server (SMTP)',
              hostname: `smtp.${cleanDomain}`,
              port: 465,
              ssl: true,
            },
            {
              name: 'Incoming server (POP)',
              hostname: `pop.${cleanDomain}`,
              port: 995,
              ssl: true,
            },
          ],
        });
      } finally {
        setLoading(false);
      }
    };
    if (domain) {
      fetchConfig();
    }
  }, [planId, domain]);

  return { config, loading };
};

/* ============================================================
   Connect Apps & Devices Page
   ============================================================ */
export default function ConnectAppsPage() {
  const navigate = useNavigate();
  const { selectedPlanId } = useEmailPlan();

  // We need the domain from somewhere – for demo, we'll fetch it from a simple plan list hook (or we can store domain in context).
  // Since context only stores plan ID, we can either extend context to store domain, or we fetch it.
  // For simplicity, we'll use a small helper hook to get the domain from the plan ID (demo).
  const [planDomain, setPlanDomain] = useState('');

  useEffect(() => {
    // In real app, you would fetch the plan details from API or from context.
    // For demo, we map plan ID to domain.
    const domains = { 1: '@cloudedata.info', 2: '@news.cloudedata.info', 3: '@enterprise.cloudedata.info' };
    setPlanDomain(domains[selectedPlanId] || '');
  }, [selectedPlanId]);

  const { config, loading } = useEmailConfig(selectedPlanId, planDomain);

  const hasPlan = !!selectedPlanId;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-2 border-indigo-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-6 md:p-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <button onClick={() => navigate('/')} className="hover:text-indigo-600 transition flex items-center gap-1">
          <Home size={16} />
          <span className="font-medium">Dashboard</span>
        </button>
        <ChevronRight size={16} />
        <button onClick={() => navigate('/emails')} className="hover:text-indigo-600 transition">
          {hasPlan ? config?.domain : 'Emails'}
        </button>
        <ChevronRight size={16} />
        <span className="font-bold text-slate-800">Connect Apps & Devices</span>
      </div>

      <div className="flex gap-6">
        <EmailSidebar />
        <div className="flex-1">
          {!hasPlan ? (
            /* No plan selected */
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-6 text-center border-2 border-slate-200/80"
            >
              <Mail size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-700 mb-2">Select a plan</h3>
              <p className="text-sm text-slate-500 mb-4">
                Please choose an email plan to view configuration settings.
              </p>
              <button
                onClick={() => navigate('/emails')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition shadow-md"
              >
                <ArrowLeft size={16} /> Go to Emails
              </button>
            </motion.div>
          ) : !config ? (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-6 text-center border-2 border-slate-200/80"
            >
              <Server size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-700 mb-2">Configuration not available</h3>
              <p className="text-sm text-slate-500">Server details are loading or unavailable for this plan.</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-sm border-2 border-slate-200/80"
            >
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Configuration Settings</h1>
                <p className="text-sm text-slate-500 mt-1">
                  Configure your email client using the server details below.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b-2 border-slate-200">
                    <tr className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <th className="pb-3 pr-4">Protocol</th>
                      <th className="pb-3 pr-4">Hostname</th>
                      <th className="pb-3 pr-4">Port</th>
                      <th className="pb-3 pr-4">SSL/TLS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-slate-100">
                    {config.protocols.map((proto, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition">
                        <td className="py-4 pr-4 font-medium text-slate-800">{proto.name}</td>
                        <td className="py-4 pr-4 font-mono text-slate-700">{proto.hostname}</td>
                        <td className="py-4 pr-4 text-slate-700">{proto.port}</td>
                        <td className="py-4 pr-4">
                          {proto.ssl ? (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                              <CheckCircle size={14} className="text-emerald-500" />
                              Enabled
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  Learn more
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}