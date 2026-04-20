import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Server, 
  Activity,
  Calendar,
  Cpu, 
  Layers
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
      const matchesSearch = site.domain.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [searchTerm, websites]);

  return (
    <div className="min-h-screen  bg-[#FAFBFC] font-sans text-slate-900 selection:bg-indigo-100">
      <div className="flex pt-24">
        <main className="flex-1 p-6 sm:p-10 lg:p-16">
          <div className="max-w-5xl mx-auto">
            
            {/* ── MNC HEADER ── */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-indigo-600 font-bold tracking-tight text-[10px] uppercase">
                  <div className="p-1.5 bg-indigo-50 rounded-lg"><Cpu size={14} /></div>
                  Cluster: US-EAST-1
                </div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tight">
                  Cloude<span className="text-slate-300">Data</span>
                </h1>
                <p className="text-slate-400 text-sm font-medium">Manage and monitor your WordPress cloud instances.</p>
              </div>

              {/* Quota Integrated Button */}
              <div className="inline-flex items-center bg-white border border-slate-200 rounded-2xl shadow-sm p-1.5 group hover:border-slate-300 transition-all">
                <div className="px-4 py-2 border-r border-slate-100 flex flex-col justify-center">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Slots Used</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-800">{websites.length} <span className="text-slate-300">/</span> {siteLimit}</span>
                    <div className="w-8 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(websites.length/siteLimit)*100}%` }}></div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => navigate("/wordpress/domainEnter")}
                  className="bg-slate-900 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl transition-all active:scale-95 text-xs font-bold flex items-center gap-2 ml-1"
                >
                  <Plus size={16} strokeWidth={3} />
                  New Instance
                </button>
              </div>
            </header>

            {/* ── SEARCH & TOOLS ── */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <div className="flex-1 flex items-center gap-3 bg-white border border-slate-200 px-5 py-3.5 rounded-2xl focus-within:ring-4 ring-indigo-500/5 transition-all w-full group">
                <Search size={18} className="text-slate-300 group-focus-within:text-indigo-600" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search instances by domain or UUID..." 
                  className="w-full bg-transparent border-none outline-none text-[15px] font-medium text-slate-700 placeholder:text-slate-300"
                />
              </div>
              <div className="flex bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50">
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
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filter === tab.value ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── RESOURCE LIST ── */}
            {isLoading ? (
              <SkeletonTable rows={6} cols={6} />
            ) : filteredWebsites.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
                <div className="grid grid-cols-1 divide-y divide-slate-100">
                  {filteredWebsites.map((site) => (
                    <WebsiteRow key={site.id} site={site} />
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

function WebsiteRow({ site }) {
  const isActive = site.status === 'active';
  const navigate = useNavigate();

  return (
    <div className="group flex flex-col lg:flex-row lg:items-center justify-between p-6 hover:bg-slate-50/80 transition-all duration-300">
      
      <div className="flex items-center gap-6 flex-1">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 group-hover:scale-105' : 'bg-slate-100 text-slate-400'}`}>
          <Server size={24} strokeWidth={1.5} />
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-none">{site.domain}</h3>
            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9px] font-black uppercase border ${isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
               <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-slate-300'}`} />
               {site.status}
            </div>
          </div>
          <div className="flex items-center gap-5 text-[11px] font-bold text-slate-400 uppercase tracking-tight">
             <span className="flex items-center gap-1.5"><Layers size={12} /> {site.planType || '-'}</span>
             <span className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(site.createdAt).toLocaleDateString()}</span>
             <span className="flex items-center gap-1.5 text-indigo-500"><Activity size={12} /> {site.visitors || 0} Req/mo</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 lg:mt-0">
        <button 
          onClick={() => navigate(`/wordpress/websitedashboard/${site.id || site._id}`)}
          className={`ml-2 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isActive ? 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-sm' : 'bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-50'}`}
          disabled={!isActive}
        >
          {isActive ? "Manage" : "Provisioning..."}
        </button>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] p-24 text-center">
      <div className="w-20 h-20 bg-slate-50 text-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-8">
        <Server size={40} strokeWidth={1} />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Infrastructure Empty</h2>
      <p className="text-slate-400 text-sm mb-10 max-w-xs mx-auto">No active instances found on CloudeData. Start by provisioning a new WordPress node.</p>
      <button className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-xs shadow-xl shadow-indigo-100">Provision First Node</button>
    </div>
  );
}