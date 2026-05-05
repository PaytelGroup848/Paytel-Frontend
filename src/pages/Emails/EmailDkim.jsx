import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  Shield,
  RefreshCw,
  ExternalLink,
  Copy,
  CheckCircle,
  Clock,
  ArrowLeft,
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import EmailSidebar from './EmailSidebar';
import { useEmailPlan } from './EmailPlanContext';

/* ============================================================
   Hook – fetch / generate DKIM record (demo fallback)
   ============================================================ */
const useDkimRecord = (planId) => {
  const [data, setData] = useState(null);   // { exists, record }
  const [loading, setLoading] = useState(true);

  const fetchDkim = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/dkim?planId=${planId}`);
      const ct = res.headers.get('content-type') || '';
      if (!res.ok || ct.includes('text/html')) throw new Error();
      const json = await res.json();
      setData(json);
    } catch {
      // Demo fallback – initially no DKIM
      const planIdNum = planId ? parseInt(planId, 10) : null;
      if (!planIdNum) {
        setData({ exists: false });
      } else {
        // Simulate that plan 1 already has a DKIM, others don't
        if (planIdNum === 1) {
          setData({
            exists: true,
            record: {
              domain: 'cloudedata.info',
              selector: 'default',
              txtName: 'default._domainkey.cloudedata.info',
              txtValue: 'v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA... (public key)',
              createdAt: '2026-05-01 14:30:00',
            },
          });
        } else {
          setData({ exists: false });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (planId) {
      fetchDkim();
    }
  }, [planId]);

  const generateDkim = async () => {
    setLoading(true);
    try {
      // In real app, send POST /api/dkim/generate?planId=...
      // Simulate generation delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Create a dummy record
      const newRecord = {
        domain: 'cloudedata.info', // would come from plan domain
        selector: 'default',
        txtName: 'default._domainkey.cloudedata.info',
        txtValue: 'v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC... (new public key)',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      };
      setData({ exists: true, record: newRecord });
      toast.success('DKIM record generated! It may take up to 8 hours to fully activate.');
    } catch {
      toast.error('Failed to generate DKIM');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, generateDkim };
};

/* ============================================================
   DKIM Page Component
   ============================================================ */
export default function DkimPage() {
  const navigate = useNavigate();
  const { selectedPlanId } = useEmailPlan();
  const hasPlan = !!selectedPlanId;

  // Domain for breadcrumb (demo mapping)
  const [domain, setDomain] = useState('');
  useEffect(() => {
    const domains = { 1: 'cloudedata.info', 2: 'news.cloudedata.info', 3: 'enterprise.cloudedata.info' };
    setDomain(domains[selectedPlanId] || '');
  }, [selectedPlanId]);

  const { data, loading, generateDkim } = useDkimRecord(selectedPlanId);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  if (!hasPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-6 md:p-10">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-indigo-600 transition flex items-center gap-1">
            <Home size={16} />
            <span className="font-medium">Dashboard</span>
          </button>
          <ChevronRight size={16} />
          <button onClick={() => navigate('/emails')} className="hover:text-indigo-600 transition">
            Emails
          </button>
          <ChevronRight size={16} />
          <span className="font-bold text-slate-800">DKIM</span>
        </div>
        <div className="flex gap-6">
          <EmailSidebar />
          <div className="flex-1">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-6 text-center border-2 border-slate-200/80"
            >
              <Shield size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-700 mb-2">Select a plan</h3>
              <p className="text-sm text-slate-500 mb-4">
                Please choose an email plan to manage DKIM records.
              </p>
              <button
                onClick={() => navigate('/emails')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition shadow-md"
              >
                <ArrowLeft size={16} /> Go to Emails <ArrowLeft/>
              </button>
            </motion.div>
          </div>
        </div>
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
          {domain}
        </button>
        <ChevronRight size={16} />
        <span className="font-bold text-slate-800">DKIM</span>
      </div>

      <div className="flex gap-6">
        <EmailSidebar />
        <div className="flex-1 space-y-6">
          {loading ? (
            <div className="flex justify-center py-32">
              <div className="animate-spin h-10 w-10 border-2 border-indigo-500 border-t-transparent rounded-full" />
            </div>
          ) : !data?.exists ? (
            /* No DKIM record yet – show generate card */
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-sm border-2 border-slate-200/80 text-center"
            >
              <Shield size={48} className="mx-auto text-indigo-500 mb-4" />
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Generate DKIM records</h2>
              <p className="text-sm text-slate-500 max-w-lg mx-auto mb-6 leading-relaxed">
                DKIM record helps increase protection, prevents spoofing and phishing,
                and makes emails less likely to be marked as spam. You can have one
                DKIM at a time. It can take up to 8 hours to fully activate.
              </p>
              <button
                onClick={generateDkim}
                disabled={loading}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-md disabled:opacity-50"
              >
                <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                Generate DKIM record
              </button>
              <p className="mt-4">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-sm text-indigo-600 hover:underline inline-flex items-center gap-1"
                >
                  Learn more <ExternalLink size={14} />
                </a>
              </p>
            </motion.div>
          ) : (
            /* DKIM record exists – display details */
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-sm border-2 border-slate-200/80 space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">DKIM Record</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Created on: {data.record?.createdAt || 'Unknown'}
                  </p>
                </div>
                <button
                  onClick={generateDkim}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition"
                >
                  <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                  Regenerate
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <p className="text-xs text-slate-500 uppercase font-bold mb-1">Domain</p>
                  <p className="text-sm font-mono text-slate-800">{data.record.domain}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-slate-500 uppercase font-bold">Selector</p>
                    <button onClick={() => copyToClipboard(data.record.selector)} className="text-indigo-600 hover:text-indigo-800">
                      <Copy size={14} />
                    </button>
                  </div>
                  <p className="text-sm font-mono text-slate-800">{data.record.selector}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-slate-500 uppercase font-bold">TXT Name</p>
                    <button onClick={() => copyToClipboard(data.record.txtName)} className="text-indigo-600 hover:text-indigo-800">
                      <Copy size={14} />
                    </button>
                  </div>
                  <p className="text-sm font-mono text-slate-800 break-all">{data.record.txtName}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-slate-500 uppercase font-bold">TXT Value</p>
                    <button onClick={() => copyToClipboard(data.record.txtValue)} className="text-indigo-600 hover:text-indigo-800">
                      <Copy size={14} />
                    </button>
                  </div>
                  <p className="text-sm font-mono text-slate-800 break-all max-h-32 overflow-y-auto">{data.record.txtValue}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm">
                <Clock size={16} className="mt-0.5 shrink-0" />
                <span>It can take up to 8 hours for the DKIM record to fully activate worldwide.</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}