//@ts-nocheck
import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Plus, 
  Search, 
  Layout, 
  Server, 
  ShieldCheck, 
  Settings, 
  ExternalLink, 
  Activity, 
  Calendar,
  Database,
  FolderTree,
  Terminal,
  Cpu,
  Layers
} from "lucide-react";

export default function PaidWordpress() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const [websites] = useState([
    {
      id: 1,
      domain: "mywebsite.com",
      status: "Active",
      plan: "Production Pro",
      visitors: "12.4k",
      createdAt: "Oct 12, 2025"
    },
    {
      id: 2,
      domain: "store-demo.com",
      status: "Pending",
      plan: "Business Node",
      visitors: "0",
      createdAt: "April 16, 2026"
    },
  ]);

  const siteLimit = 10;

  const filteredWebsites = useMemo(() => {
    return websites.filter(site => {
      const matchesSearch = site.domain.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === "All" || site.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filter, websites]);

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
                  onClick={() => navigate("/websites/wordpress/new")}
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
                {["All", "Active", "Pending"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${filter === tab ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* ── RESOURCE LIST ── */}
            {filteredWebsites.length === 0 ? (
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
  const isActive = site.status === "Active";
  const navigate = useNavigate();
  const [showTools, setShowTools] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setShowTools(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
             <span className="flex items-center gap-1.5"><Layers size={12} /> {site.plan}</span>
             <span className="flex items-center gap-1.5"><Calendar size={12} /> {site.createdAt}</span>
             <span className="flex items-center gap-1.5 text-indigo-500"><Activity size={12} /> {site.visitors} Req/mo</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 lg:mt-0">
        {isActive && (
          <>
            <button 
              onClick={() => window.open(`https://${site.domain}/wp-admin`, '_blank')}
              className="w-11 h-11 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200"
              title="Open Admin"
            >
              <ExternalLink size={18} />
            </button>

            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowTools(!showTools)}
                className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all border ${showTools ? 'bg-slate-900 text-white border-slate-900' : 'text-slate-400 hover:text-slate-900 border-transparent hover:border-slate-200'}`}
              >
                <Settings size={18} />
              </button>

              {showTools && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl z-30 py-2.5 overflow-hidden animate-in fade-in zoom-in-95">
                  <p className="px-5 py-2 text-[9px] font-black text-slate-300 uppercase tracking-widest">Instance Tools</p>
                  <DropdownLink icon={<FolderTree size={14}/>} label="File Manager" />
                  <DropdownLink icon={<Database size={14}/>} label="SQL Database" />
                  <DropdownLink icon={<ShieldCheck size={14}/>} label="SSL Config" />
                  <DropdownLink icon={<Terminal size={14}/>} label="Web Terminal" />
                </div>
              )}
            </div>
          </>
        )}
        
        <button 
          onClick={() => navigate("/wordpress/websitedashboard")}
          className={`ml-2 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isActive ? 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-sm' : 'bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-50'}`}
        >
          {isActive ? "Manage" : "Provisioning..."}
        </button>
      </div>
    </div>
  );
}

function DropdownLink({ icon, label }) {
  return (
    <button className="w-full text-left px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all flex items-center gap-3">
      <span className="opacity-60">{icon}</span>
      {label}
    </button>
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