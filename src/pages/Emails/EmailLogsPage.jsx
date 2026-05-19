import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  Mail,
  ArrowLeft,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EmailSidebar from './EmailSidebar';


/* ============================================================
   Hook – fetch email logs (minimal demo data, rich fields)
   ============================================================ */
const useEmailLogs = (planId, activeTab, filters) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const query = new URLSearchParams(filters).toString();
        const res = await fetch(`/api/email-logs?planId=${planId}&tab=${activeTab}&${query}`);
        const ct = res.headers.get('content-type') || '';
        if (!res.ok || ct.includes('text/html')) throw new Error();
        const json = await res.json();
        setLogs(json);
      } catch {
        // Minimal demo data with detail fields
        const allData = {
          access: [
            {
              id: 1,
              time: '2026-05-05 10:16:33',
              mailbox: 'care@cloudedata.info',
              ip: '180.151.90.141',
              status: 'Success',
              protocol: 'IMAP',
              startDate: '2026-05-05 10:16:33',
              endDate: '2026-05-05 10:16:33',
              client: 'Hostinger Mail',
              trashed: 0,
              markedForDeletion: 0,
              expunged: 0,
            },
            {
              id: 2,
              time: '2026-05-05 09:45:12',
              mailbox: 'info@cloudedata.info',
              ip: '192.168.1.42',
              status: 'Success',
              protocol: 'SMTP',
              startDate: '2026-05-05 09:45:12',
              endDate: '2026-05-05 09:45:12',
              client: 'Outlook',
              trashed: 0,
              markedForDeletion: 0,
              expunged: 0,
            },
            {
              id: 3,
              time: '2026-05-04 22:10:02',
              mailbox: 'support@cloudedata.info',
              ip: '192.168.1.5',
              status: 'Failure',
              protocol: 'IMAP',
              startDate: '2026-05-04 22:10:02',
              endDate: '2026-05-04 22:10:02',
              client: 'Thunderbird',
              trashed: 0,
              markedForDeletion: 0,
              expunged: 0,
            },
          ],
          actions: [
            {
              id: 4,
              time: '2026-05-05 11:20:00',
              mailbox: 'care@cloudedata.info',
              action: 'Read',
              status: 'Success',
              details: 'Message ID: 12345',
              startDate: '2026-05-05 11:20:00',
              endDate: '2026-05-05 11:20:00',
              client: 'Hostinger Mail',
              trashed: 0,
              markedForDeletion: 0,
              expunged: 0,
            },
            {
              id: 5,
              time: '2026-05-05 09:00:15',
              mailbox: 'support@cloudedata.info',
              action: 'Send',
              status: 'Success',
              details: 'Sent to 3 recipients',
              startDate: '2026-05-05 09:00:15',
              endDate: '2026-05-05 09:00:15',
              client: 'Outlook',
              trashed: 0,
              markedForDeletion: 0,
              expunged: 0,
            },
          ],
          delivery: [
            {
              id: 6,
              time: '2026-05-05 12:00:00',
              from: 'sender@domain.com',
              to: 'care@cloudedata.info',
              subject: 'Project Update',
              status: 'Delivered',
              info: 'Accepted by IMAP server',
              startDate: '2026-05-05 12:00:00',
              endDate: '2026-05-05 12:00:00',
              client: 'Hostinger Mail',
              trashed: 0,
              markedForDeletion: 0,
              expunged: 0,
            },
            {
              id: 7,
              time: '2026-05-04 18:30:00',
              from: 'newsletter@other.com',
              to: 'info@cloudedata.info',
              subject: 'Weekly Digest',
              status: 'Bounced',
              info: 'Mailbox full',
              startDate: '2026-05-04 18:30:00',
              endDate: '2026-05-04 18:30:00',
              client: 'Gmail App',
              trashed: 0,
              markedForDeletion: 0,
              expunged: 0,
            },
          ],
        };

        let data = allData[activeTab] || [];

        // Client‑side filtering (simulate API)
        if (filters.mailbox && filters.mailbox !== 'all') {
          if (activeTab === 'delivery') {
            data = data.filter(log => log.from === filters.mailbox || log.to === filters.mailbox);
          } else {
            data = data.filter(log => log.mailbox === filters.mailbox);
          }
        }
        if (filters.status && filters.status !== 'all') {
          data = data.filter(log => log.status.toLowerCase() === filters.status.toLowerCase());
        }
        if (activeTab === 'access' && filters.protocol && filters.protocol !== 'all') {
          data = data.filter(log => log.protocol === filters.protocol);
        }
        if (activeTab === 'actions' && filters.action && filters.action !== 'all') {
          data = data.filter(log => log.action === filters.action);
        }
        if (activeTab === 'delivery' && filters.deliveryStatus && filters.deliveryStatus !== 'all') {
          data = data.filter(log => log.status === filters.deliveryStatus);
        }
        if (filters.startDate) {
          data = data.filter(log => log.time >= filters.startDate);
        }
        if (filters.endDate) {
          data = data.filter(log => log.time <= filters.endDate + ' 23:59:59');
        }

        setLogs(data);
      } finally {
        setLoading(false);
      }
    };
    if (planId) {
      fetchLogs();
    }
  }, [planId, activeTab, filters]);

  return { logs, loading };
};

/* ============================================================
   Log Detail Modal
   ============================================================ */
const LogDetailModal = ({ log, activeTab, onClose }) => {
  if (!log) return null;

  const commonFields = (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-500 uppercase font-bold">Start date:</p>
          <p className="text-sm font-medium text-slate-800">{log.startDate || log.time}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase font-bold">End date:</p>
          <p className="text-sm font-medium text-slate-800">{log.endDate || log.time}</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-xs text-slate-500 uppercase font-bold">Client:</p>
        <p className="text-sm font-medium text-slate-800">{log.client || 'Unknown'}</p>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-500 uppercase font-bold">Trashed:</p>
          <p className="text-sm font-medium text-slate-800">{log.trashed ?? 0}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase font-bold">Marked for deletion:</p>
          <p className="text-sm font-medium text-slate-800">{log.markedForDeletion ?? 0}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase font-bold">Expunged:</p>
          <p className="text-sm font-medium text-slate-800">{log.expunged ?? 0}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-slate-500 uppercase font-bold">Status:</p>
          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${
            log.status === 'Success' || log.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
            log.status === 'Failure' || log.status === 'Bounced' ? 'bg-red-50 text-red-700 border-red-200' :
            'bg-amber-50 text-amber-700 border-amber-200'
          }`}>
            {log.status}
          </span>
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase font-bold">
            {activeTab === 'access' ? 'Protocol:' : activeTab === 'actions' ? 'Action:' : 'Info:'}
          </p>
          <p className="text-sm font-medium text-slate-800">
            {activeTab === 'access' ? log.protocol : activeTab === 'actions' ? log.details : log.info}
          </p>
        </div>
      </div>
    </>
  );

  return ReactDOM.createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-white/70 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative bg-white border-2 border-slate-200 rounded-3xl shadow-2xl w-full max-w-md p-8 z-10"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-black text-slate-800 mb-6">Mailbox</h2>

          {/* Main identifiers */}
          <div className="mb-6">
            <p className="text-sm text-slate-500">{log.time}</p>
            <h3 className="text-xl font-bold text-slate-900">{log.mailbox || log.to || log.from}</h3>
            <p className="text-sm font-mono text-slate-600">{log.ip || '—'}</p>
          </div>

          {commonFields}
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

/* ============================================================
   Email Logs Page Component
   ============================================================ */
export default function EmailLogsPage() {
  const navigate = useNavigate();
  const { selectedPlanId } = useEmailPlan();
  const hasPlan = !!selectedPlanId;

  const [domain, setDomain] = useState('');
  useEffect(() => {
    const domains = { 1: 'cloudedata.info', 2: 'news.cloudedata.info', 3: 'enterprise.cloudedata.info' };
    setDomain(domains[selectedPlanId] || '');
  }, [selectedPlanId]);

  const [activeTab, setActiveTab] = useState('access');
  const [filters, setFilters] = useState({
    mailbox: 'all',
    status: 'all',
    startDate: '',
    endDate: '',
    protocol: 'all',
    action: 'all',
    deliveryStatus: 'all',
  });
  const [appliedFilters, setAppliedFilters] = useState({});
  const [selectedLog, setSelectedLog] = useState(null); // log for detail modal

  const handleFilterChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));
  const handleApplyFilters = () => setAppliedFilters({ ...filters });

  const mailboxes = useMemo(() => {
    if (selectedPlanId === 1) return ['care@cloudedata.info', 'info@cloudedata.info'];
    if (selectedPlanId === 2) return ['news@news.cloudedata.info', 'editor@news.cloudedata.info'];
    if (selectedPlanId === 3) return ['admin@enterprise.cloudedata.info', 'support@enterprise.cloudedata.info', 'info@enterprise.cloudedata.info'];
    return [];
  }, [selectedPlanId]);

  const { logs, loading } = useEmailLogs(selectedPlanId, activeTab, appliedFilters);

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      mailbox: 'all', status: 'all', startDate: '', endDate: '',
      protocol: 'all', action: 'all', deliveryStatus: 'all',
    }));
    setAppliedFilters({});
  }, [activeTab]);

  const renderTableHeaders = () => {
    switch (activeTab) {
      case 'access':
        return (
          <tr className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
            <th className="pb-3 pr-4">Time</th>
            <th className="pb-3 pr-4">Mailbox</th>
            <th className="pb-3 pr-4">IP address</th>
            <th className="pb-3 pr-4">Status</th>
            <th className="pb-3 pr-4">Protocol</th>
          </tr>
        );
      case 'actions':
        return (
          <tr className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
            <th className="pb-3 pr-4">Time</th>
            <th className="pb-3 pr-4">Mailbox</th>
            <th className="pb-3 pr-4">Action</th>
            <th className="pb-3 pr-4">Status</th>
            <th className="pb-3 pr-4">Details</th>
          </tr>
        );
      case 'delivery':
        return (
          <tr className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
            <th className="pb-3 pr-4">Time</th>
            <th className="pb-3 pr-4">From</th>
            <th className="pb-3 pr-4">To</th>
            <th className="pb-3 pr-4">Subject</th>
            <th className="pb-3 pr-4">Status</th>
            <th className="pb-3 pr-4">Info</th>
          </tr>
        );
      default: return null;
    }
  };

  const renderTableRows = () => {
    if (!logs || logs.length === 0) return null;
    return logs.map((log) => (
      <tr
        key={log.id}
        className="hover:bg-slate-50/50 transition cursor-pointer"
        onClick={() => setSelectedLog(log)}
      >
        {activeTab === 'access' && (
          <>
            <td className="py-4 pr-4 text-slate-700 whitespace-nowrap">{log.time}</td>
            <td className="py-4 pr-4 font-medium text-slate-800">{log.mailbox}</td>
            <td className="py-4 pr-4 text-slate-700 font-mono">{log.ip}</td>
            <td className="py-4 pr-4">
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${log.status === 'Success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                {log.status === 'Success' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                {log.status}
              </span>
            </td>
            <td className="py-4 pr-4 text-slate-700">{log.protocol}</td>
          </>
        )}
        {activeTab === 'actions' && (
          <>
            <td className="py-4 pr-4 text-slate-700 whitespace-nowrap">{log.time}</td>
            <td className="py-4 pr-4 font-medium text-slate-800">{log.mailbox}</td>
            <td className="py-4 pr-4 text-slate-700">{log.action}</td>
            <td className="py-4 pr-4">
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${log.status === 'Success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                {log.status === 'Success' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                {log.status}
              </span>
            </td>
            <td className="py-4 pr-4 text-slate-700 text-xs">{log.details}</td>
          </>
        )}
        {activeTab === 'delivery' && (
          <>
            <td className="py-4 pr-4 text-slate-700 whitespace-nowrap">{log.time}</td>
            <td className="py-4 pr-4 text-slate-700">{log.from}</td>
            <td className="py-4 pr-4 text-slate-700">{log.to}</td>
            <td className="py-4 pr-4 text-slate-700 max-w-[120px] truncate">{log.subject}</td>
            <td className="py-4 pr-4">
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${log.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : log.status === 'Deferred' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                {log.status}
              </span>
            </td>
            <td className="py-4 pr-4 text-slate-700 text-xs">{log.info}</td>
          </>
        )}
      </tr>
    ));
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
          <span className="font-bold text-slate-800">Email Logs</span>
        </div>
        <div className="flex gap-6">
          <EmailSidebar />
          <div className="flex-1">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-6 text-center border-2 border-slate-200/80"
            >
              <Mail size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-700 mb-2">Select a plan</h3>
              <p className="text-sm text-slate-500 mb-4">Please choose an email plan to view its logs.</p>
              <button
                onClick={() => navigate('/emails')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition shadow-md"
              >
                <ArrowLeft size={16} /> Go to Emails
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-6 md:p-10">
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
        <span className="font-bold text-slate-800">Email Logs</span>
      </div>

      <div className="flex gap-6">
        <EmailSidebar />
        <div className="flex-1 space-y-6">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-sm border-2 border-slate-200/80"
          >
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Email Logs</h1>
            <div className="flex border-b border-slate-200 mb-4">
              {['access', 'actions', 'delivery'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                    activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {activeTab === 'access' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Protocol</label>
                  <select value={filters.protocol} onChange={(e) => handleFilterChange('protocol', e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none">
                    <option value="all">All</option>
                    <option value="IMAP">IMAP</option>
                    <option value="SMTP">SMTP</option>
                    <option value="POP">POP</option>
                  </select>
                </div>
              )}
              {activeTab === 'actions' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Action</label>
                  <select value={filters.action} onChange={(e) => handleFilterChange('action', e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none">
                    <option value="all">All</option>
                    <option value="Read">Read</option>
                    <option value="Delete">Delete</option>
                    <option value="Send">Send</option>
                    <option value="Move">Move</option>
                    <option value="Flag">Flag</option>
                  </select>
                </div>
              )}
              {activeTab === 'delivery' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Delivery Status</label>
                  <select value={filters.deliveryStatus} onChange={(e) => handleFilterChange('deliveryStatus', e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none">
                    <option value="all">All</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Deferred">Deferred</option>
                    <option value="Bounced">Bounced</option>
                  </select>
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Status</label>
                <select value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none">
                  <option value="all">All</option>
                  <option value="Success">Success</option>
                  <option value="Failure">Failure</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Deferred">Deferred</option>
                  <option value="Bounced">Bounced</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">From</label>
                <input type="date" value={filters.startDate} onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">To</label>
                <input type="date" value={filters.endDate} onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none" />
              </div>
            </div>

            <div className="flex flex-wrap items-end gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Mailbox</label>
                <select value={filters.mailbox} onChange={(e) => handleFilterChange('mailbox', e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none">
                  <option value="all">All mailboxes</option>
                  {mailboxes.map(mb => <option key={mb} value={mb}>{mb}</option>)}
                </select>
              </div>
              <button
                onClick={handleApplyFilters}
                className="px-6 py-2.5 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 transition shadow-md flex items-center gap-2"
              >
                <Search size={16} /> Apply
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-sm border-2 border-slate-200/80"
          >
            {loading ? (
              <div className="flex justify-center py-16">
                <div className="animate-spin h-8 w-8 border-2 border-indigo-500 border-t-transparent rounded-full" />
              </div>
            ) : logs.length === 0 ? (
              <div className="text-center py-16">
                <Clock size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-lg font-bold text-slate-700 mb-2">No logs found</h3>
                <p className="text-sm text-slate-500">Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b-2 border-slate-200">
                    {renderTableHeaders()}
                  </thead>
                  <tbody className="divide-y-2 divide-slate-100">
                    {renderTableRows()}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          <div className="text-right">
            <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
              Learn more <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      {selectedLog && (
        <LogDetailModal
          log={selectedLog}
          activeTab={activeTab}
          onClose={() => setSelectedLog(null)}
        />
      )}
    </div>
  );
}