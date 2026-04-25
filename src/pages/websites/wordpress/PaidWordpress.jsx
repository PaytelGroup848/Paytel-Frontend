import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Server,
  Activity,
  Calendar,
  Cpu,
  Layers,
  Settings,
  ExternalLink,
  Shield,
  Zap,
  Globe
} from 'lucide-react';
import SkeletonTable from '../../../components/ui/skeletons/SkeletonTable';
import { useInstances } from '../../../hooks/useWordPress';

export default function PaidWordpress() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const { data, isLoading } = useInstances({ status: filter || undefined });
  const websites = data?.items || [];

  const siteLimit = 10;

  const filteredWebsites = useMemo(() => {
    return websites.filter((site) => {
      const matchesSearch = site.domain?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [searchTerm, websites]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans text-slate-900">
      <div className="flex pt-24">
        <main className="flex-1 p-6 sm:p-10 lg:p-16">
          <div className="max-w-6xl mx-auto">
            {/* ── MNC HEADER ── */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-indigo-600 font-bold tracking-tight text-[10px] uppercase">
                  <div className="p-1.5 bg-indigo-50 rounded-lg"><Cpu size={14} /></div>
                  Cluster: US-EAST-1 • Enterprise Tier
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                  WordPress <span className="text-indigo-600">Cloud</span>
                </h1>
                <p className="text-slate-500 text-sm font-medium max-w-lg">
                  Manage, monitor, and scale your managed WordPress instances.
                </p>
              </div>

              {/* Quota + New Instance Button */}
              <div className="inline-flex items-center bg-white border border-slate-200 rounded-2xl shadow-sm p-1.5">
                <div className="px-4 py-2 border-r border-slate-100 flex flex-col justify-center min-w-[130px]">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Slots Used</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-800">{websites.length} <span className="text-slate-300">/</span> {siteLimit}</span>
                    <div className="w-10 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${(websites.length / siteLimit) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/wordpress/domainEnter")}
                  className="bg-slate-900 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl transition-all active:scale-95 text-xs font-bold flex items-center gap-2 ml-1"
                >
                  <Plus size={16} strokeWidth={2} />
                  New Instance
                </button>
              </div>
            </header>

            {/* ── SEARCH & FILTERS ── */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <div className="flex-1 flex items-center gap-3 bg-white border border-slate-200 px-5 py-3 rounded-2xl focus-within:ring-2 focus-within:ring-indigo-200 transition-all w-full">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by domain or ID..."
                  className="w-full bg-transparent border-none outline-none text-sm font-medium text-slate-700 placeholder:text-slate-300"
                />
              </div>
              <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
                {[
                  { label: 'All', value: '' },
                  { label: 'Active', value: 'active' },
                  { label: 'Pending', value: 'pending_dns' },
                  { label: 'Provisioning', value: 'provisioning' },
                  { label: 'Failed', value: 'failed' },
                ].map((tab) => (
                  <button
                    key={tab.label}
                    onClick={() => setFilter(tab.value)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      filter === tab.value
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── INSTANCES LIST ── */}
            {isLoading ? (
              <SkeletonTable rows={5} cols={4} />
            ) : filteredWebsites.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
                <div className="grid grid-cols-1 divide-y divide-slate-100">
                  {filteredWebsites.map((site) => (
                    <WebsiteRow key={site.id || site._id} site={site} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Individual Website Row Component
// ──────────────────────────────────────────────
function WebsiteRow({ site }) {
  const navigate = useNavigate();
  const isActive = site.status === 'active';
  const isProvisioning = site.status === 'provisioning';
  const isPending = site.status === 'pending_dns';
  const isFailed = site.status === 'failed';

  const getStatusBadge = () => {
    if (isActive) return { label: 'Active', color: 'emerald', dot: 'bg-emerald-500' };
    if (isProvisioning) return { label: 'Provisioning', color: 'amber', dot: 'bg-amber-500' };
    if (isPending) return { label: 'Pending DNS', color: 'blue', dot: 'bg-blue-500' };
    if (isFailed) return { label: 'Failed', color: 'red', dot: 'bg-red-500' };
    return { label: site.status || 'Unknown', color: 'slate', dot: 'bg-slate-400' };
  };
  const status = getStatusBadge();

  // Safely open WordPress admin (wp-admin)
  const openWpAdmin = () => {
    if (!site.domain) return;
    const adminUrl = `https://${site.domain}/wp-admin`;
    window.open(adminUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="group flex flex-col lg:flex-row lg:items-center justify-between p-6 hover:bg-slate-50/80 transition-all duration-200">
      {/* Left: Icon + Details */}
      <div className="flex items-center gap-5 flex-1">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
          isActive
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
            : 'bg-slate-100 text-slate-400'
        }`}>
          <Server size={20} strokeWidth={1.5} />
        </div>
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">{site.domain || '—'}</h3>
            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-black uppercase border border-${status.color}-200 bg-${status.color}-50 text-${status.color}-700`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
            <span className="flex items-center gap-1.5"><Layers size={12} /> {site.planType || 'Business'}</span>
            <span className="flex items-center gap-1.5"><Calendar size={12} /> {site.createdAt ? new Date(site.createdAt).toLocaleDateString() : '—'}</span>
            <span className="flex items-center gap-1.5 text-indigo-500"><Activity size={12} /> {site.visitors?.toLocaleString() || 0} req/mo</span>
            <span className="flex items-center gap-1.5"><Globe size={12} /> PHP {site.phpVersion || '8.2'}</span>
          </div>
        </div>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex items-center gap-2 mt-5 lg:mt-0">
        <button
          onClick={() => navigate(`/wordpress/configure/${site.id || site._id}`)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
        >
          <Settings size={13} />
          Configure
        </button>

        {/* WordPress Admin Button – fixed */}
        <button
          onClick={openWpAdmin}
          disabled={!isActive}
          className={`px-4 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all ${
            isActive
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          WP Admin
          <ExternalLink size={11} />
        </button>

        <button
          onClick={() => navigate(`/wordpress/websitedashboard/${site.id || site._id}`)}
          disabled={!isActive}
          className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
            isActive
              ? 'bg-slate-900 text-white hover:bg-indigo-700 shadow-md'
              : 'bg-slate-100 text-slate-300 cursor-not-allowed'
          }`}
        >
          {isActive ? 'Manage' : isProvisioning ? 'Provisioning...' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Empty State Component
// ──────────────────────────────────────────────
function EmptyState() {
  const navigate = useNavigate();
  return (
    <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center">
      <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Server size={36} strokeWidth={1.2} />
      </div>
      <h3 className="text-2xl font-bold text-slate-800">No WordPress instances yet</h3>
      <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto mb-8">
        Deploy your first managed WordPress site on CloudeData Enterprise.
      </p>
      <button
        onClick={() => navigate("/wordpress/domainEnter")}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 transition-all inline-flex items-center gap-2"
      >
        <Plus size={16} />
        Create New Instance
      </button>
    </div>
  );
}