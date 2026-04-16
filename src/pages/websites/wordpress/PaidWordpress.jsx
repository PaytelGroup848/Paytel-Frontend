//@ts-nocheck
import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaidWordpress() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const [websites] = useState([
    {
      id: 1,
      domain: "mywebsite.com",
      status: "Active",
      type: "WordPress",
      plan: "Pro",
      visitors: "12.4k",
      storage: 45,
    },
    {
      id: 2,
      domain: "store-demo.com",
      status: "Pending",
      type: "WordPress",
      plan: "Business",
      visitors: "0",
      storage: 0,
    },
  ]);

  const filteredWebsites = useMemo(() => {
    return websites.filter(site => {
      const matchesSearch = site.domain.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === "All" || site.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filter, websites]);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <div className="flex pt-16">
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            
            {/* HEADER */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  My <span className="text-indigo-600">Websites</span>
                </h1>
                <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-widest mt-1">
                  Manage your CloudeData cloud instances
                </p>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => window.open('https://wordpress.org/support/', '_blank')}
                  className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                  <i className="fa-solid fa-book text-[11px]"></i>
                  WP Overview
                </button>
                <button 
                  onClick={() => navigate("/websites/wordpress/new")}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95 text-[10px] font-bold uppercase tracking-widest"
                >
                  <i className="fa-solid fa-plus text-[9px]"></i>
                  New Instance
                </button>
              </div>
            </header>

            {/* QUICK STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
               <MiniStat label="Total Sites" value={websites.length} icon="fa-globe" color="text-indigo-600" />
               <MiniStat label="Active" value={websites.filter(s => s.status === "Active").length} icon="fa-check-circle" color="text-emerald-600" />
               <MiniStat label="Storage" value="45%" icon="fa-database" color="text-blue-600" />
               <MiniStat label="Visitors" value="12.4k" icon="fa-chart-line" color="text-amber-600" />
            </div>

            {/* SEARCH & FILTERS */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
              <div className="flex-1 flex items-center gap-3 bg-white border border-slate-200 px-4 py-2.5 rounded-xl focus-within:ring-2 ring-indigo-50 transition-all w-full shadow-sm">
                <i className="fa-solid fa-magnifying-glass text-slate-400 text-xs"></i>
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter by domain..." 
                  className="w-full bg-transparent border-none outline-none text-[13px] font-medium text-slate-600 placeholder:text-slate-300"
                />
              </div>
              <div className="flex bg-slate-200/50 p-1 rounded-xl">
                {["All", "Active", "Pending"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${filter === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* LIST */}
            {filteredWebsites.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-4">
                {filteredWebsites.map((site) => (
                  <WebsiteRow key={site.id} site={site} />
                ))}
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

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowTools(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="group bg-white border border-slate-200 rounded-2xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:border-indigo-300 transition-all shadow-sm">
      
      <div className="flex items-center gap-4 flex-1">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all ${isActive ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-300'}`}>
          <i className={isActive ? "fa-brands fa-wordpress" : "fa-solid fa-circle-notch fa-spin text-sm"}></i>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-[15px] font-bold text-slate-800 tracking-tight">{site.domain}</h3>
            <span className={`px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-widest ${isActive ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
              {site.status}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-medium text-slate-400">
             <span>{site.plan} Plan</span>
             <span>•</span>
             <span className="flex items-center gap-1"><i className="fa-solid fa-bolt text-[9px] text-amber-400"></i> {site.visitors} visits</span>
          </div>
        </div>
      </div>

      {/* ACTIONS AREA */}
      <div className="flex flex-wrap items-center gap-2 pt-3 lg:pt-0 border-t lg:border-none">
        {isActive && (
          <>
            {/* WordPress Admin Button */}
            <button 
              onClick={() => window.open(`https://${site.domain}/wp-admin`, '_blank')}
              className="px-4 py-2 bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-slate-200 transition-all flex items-center gap-2"
            >
              <i className="fa-brands fa-wordpress-simple"></i>
              WP Admin
            </button>

            {/* Tools Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowTools(!showTools)}
                className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border flex items-center gap-2 ${showTools ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
              >
                Tools
                <i className={`fa-solid fa-chevron-down text-[8px] transition-transform ${showTools ? 'rotate-180' : ''}`}></i>
              </button>

              {showTools && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl z-20 py-2 animate-in fade-in slide-in-from-top-1">
                  <DropdownLink icon="fa-folder-tree" label="File Manager" onClick={() => navigate('/tools/files')} />
                  <DropdownLink icon="fa-database" label="SQL Database" onClick={() => navigate('/tools/databases')} />
                  <div className="h-px bg-slate-100 my-1 mx-2"></div>
                  <DropdownLink icon="fa-shield-halved" label="Security SSL" onClick={() => navigate('/tools/security')} />
                </div>
              )}
            </div>
          </>
        )}
        
        <button 
          onClick={() => navigate("/wordpress/websitedashboard")}
          className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${isActive ? 'bg-slate-900 text-white hover:bg-indigo-600 shadow-md shadow-slate-200 hover:shadow-indigo-100' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
        >
          {isActive ? "Dashboard" : "Setting up..."}
        </button>
      </div>
    </div>
  );
}

function DropdownLink({ icon, label, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="w-full text-left px-4 py-2 text-[11px] font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all flex items-center gap-3"
    >
      <i className={`fa-solid ${icon} w-4 text-center opacity-70`}></i>
      {label}
    </button>
  );
}

function MiniStat({ label, value, icon, color }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${color} text-sm`}>
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <div>
        <p className="text-[13px] font-bold text-slate-900 leading-none">{value}</p>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">{label}</p>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-16 text-center">
      <div className="w-16 h-16 bg-slate-50 text-slate-200 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
        <i className="fa-solid fa-cloud-arrow-up"></i>
      </div>
      <h2 className="text-lg font-bold text-slate-900">No websites found</h2>
      <p className="text-slate-400 text-xs mb-8">Deploy your first WordPress instance in seconds.</p>
      <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px]">Create Instance</button>
    </div>
  );
}