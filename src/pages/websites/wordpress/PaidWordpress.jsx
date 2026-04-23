import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Server,
  Activity,
  Calendar,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SkeletonTable from "../../../components/ui/skeletons/SkeletonTable";
import { useInstances } from "../../../hooks/useWordPress";

// ------------------------------
// 🌐 DYNAMIC BACKGROUND BANNER
// Website count ke hisaab se blur aur colors change honge
// ------------------------------
const WebsiteBasedBanner = ({ websites }) => {
  const activeCount = websites.filter((s) => s.status === "active").length;
  const totalCount = websites.length;

  // Color intensity based on usage (0 to 1)
  const intensity = Math.min(totalCount / 10, 1);

  // Dynamic gradient colors
  const gradientStart = `rgba(99, 102, 241, ${0.15 + intensity * 0.2})`; // indigo
  const gradientMid = `rgba(139, 92, 246, ${0.1 + intensity * 0.15})`;   // purple
  const gradientEnd = `rgba(14, 165, 233, ${0.05 + intensity * 0.1})`;    // sky

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main blur layers */}
      <div
        className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full blur-[120px] transition-colors duration-1000"
        style={{ backgroundColor: gradientStart }}
      />
      <div
        className="absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full blur-[120px] transition-colors duration-1000"
        style={{ backgroundColor: gradientMid }}
      />
      <div
        className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full blur-[130px] transition-colors duration-1000"
        style={{ backgroundColor: gradientEnd }}
      />

      {/* Website‑inspired floating particles (count = total websites) */}
      <div className="absolute inset-0">
        {websites.slice(0, 12).map((site, idx) => (
          <motion.div
            key={site.id || idx}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/40 backdrop-blur-sm"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: 0,
            }}
            animate={{
              x: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
              ],
              y: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
              ],
              scale: [0.8, 1.2, 0.9],
              opacity: [0.3, 0.7, 0.2],
            }}
            transition={{
              duration: 15 + idx * 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              boxShadow:
                site.status === "active"
                  ? "0 0 15px rgba(56, 189, 248, 0.5)"
                  : "0 0 8px rgba(148, 163, 184, 0.3)",
              backgroundColor: site.status === "active" ? "#38bdf8" : "#94a3b8",
            }}
          />
        ))}
      </div>

      {/* Subtle grid overlay (tech feel) */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

// Framer Motion variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", damping: 18 } },
};

const headerItem = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function PaidWordpress() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const { data, isLoading } = useInstances({ status: filter || undefined });
  const websites = data?.items || [];

  const siteLimit = 10;

  const filteredWebsites = useMemo(() => {
    return websites.filter((site) =>
      site.domain.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, websites]);

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-slate-50 via-white to-slate-50 font-sans text-slate-900 selection:bg-indigo-200/60">
      {/* 🔥 DYNAMIC BANNER BASED ON WEBSITES */}
      <WebsiteBasedBanner websites={websites} />

      <div className="flex relative z-10">
        <main className="flex-1 p-6 sm:p-10 lg:p-16">
          <div className="max-w-6xl mx-auto">
            {/* ── HEADER with Motion & Glass ── */}
            <motion.header
              variants={headerItem}
              initial="hidden"
              animate="show"
              className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
            >
              <div className="space-y-3">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 text-indigo-600 font-bold tracking-tight text-[10px] uppercase"
                >
                  <div className="p-1.5 bg-indigo-50/80 backdrop-blur-sm rounded-xl border border-indigo-100/50 shadow-sm">
                    <Cpu size={14} />
                  </div>
                  <span className="bg-indigo-50/60 backdrop-blur-sm px-3 py-1 rounded-full text-[8px] font-black border border-indigo-100/30">
                    <Sparkles size={10} className="inline mr-1" /> Cluster: US‑EAST‑1
                  </span>
                </motion.div>
                <h1 className="text-6xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  Cloude
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Data
                  </span>
                </h1>
                <p className="text-slate-500 text-base font-medium max-w-xl">
                  Manage and monitor your WordPress cloud instances with{" "}
                  <span className="text-indigo-600 font-semibold">AI‑powered</span> insights.
                </p>
              </div>

              {/* Quota Display with Glass Effect */}
              <motion.div
                whileHover={{ y: -2, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05)" }}
                className="inline-flex items-center bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-3xl shadow-lg p-2 group transition-all duration-300"
              >
                <div className="px-5 py-2 border-r border-slate-200/50 flex flex-col justify-center">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                    Slots Used
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-slate-800">
                      {websites.length}{" "}
                      <span className="text-slate-300">/</span> {siteLimit}
                    </span>
                    <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(websites.length / siteLimit) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => navigate("/wordpress/domainEnter")}
                  className="bg-gradient-to-br from-slate-900 to-slate-800 text-white px-6 py-3 rounded-2xl transition-all text-xs font-bold flex items-center gap-2 ml-1 shadow-lg shadow-indigo-500/10 border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  <Plus size={16} strokeWidth={3} />
                  New Instance
                </motion.button>
              </motion.div>
            </motion.header>

            {/* ── SEARCH & FILTER (Interactive) ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-10"
            >
              <div className="flex-1 flex items-center gap-3 bg-white/70 backdrop-blur-md border border-slate-200/70 px-5 py-4 rounded-2xl focus-within:ring-2 focus-within:ring-indigo-200/70 focus-within:border-indigo-300 focus-within:bg-white transition-all w-full shadow-sm">
                <Search
                  size={18}
                  className="text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search instances by domain or UUID..."
                  className="w-full bg-transparent border-none outline-none text-[15px] font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none"
                />
                {searchTerm && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => setSearchTerm("")}
                    className="text-slate-400 hover:text-slate-600 p-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-indigo-300 rounded-full"
                  >
                    ✕
                  </motion.button>
                )}
              </div>
              <div className="flex bg-white/40 backdrop-blur-sm p-1.5 rounded-2xl border border-slate-200/50 shadow-sm">
                {[
                  { label: "All", value: "" },
                  { label: "Active", value: "active" },
                  { label: "Pending", value: "pending_dns" },
                  { label: "Failed", value: "failed" },
                ].map((tab) => (
                  <motion.button
                    key={tab.label}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFilter(tab.value)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 ${
                      filter === tab.value
                        ? "bg-white text-slate-900 shadow-md border border-slate-100"
                        : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
                    }`}
                  >
                    {tab.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* ── RESOURCE LIST with Motion ── */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <SkeletonTable rows={6} cols={6} />
              ) : filteredWebsites.length === 0 ? (
                <EmptyStateMotion />
              ) : (
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]"
                >
                  <div className="grid grid-cols-1 divide-y divide-slate-100/70">
                    {filteredWebsites.map((site) => (
                      <motion.div key={site.id} variants={item}>
                        <WebsiteRow site={site} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* AI‑generated illustration footnote */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="text-center text-[10px] text-slate-400 mt-8 uppercase tracking-widest"
            >
              AI‑enhanced dashboard • real‑time monitoring
            </motion.p>
          </div>
        </main>
      </div>
    </div>
  );
}

function WebsiteRow({ site }) {
  const isActive = site.status === "active";

  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{
        backgroundColor: "rgba(248,250,252,0.6)",
        scale: 1.002,
        transition: { duration: 0.2 },
      }}
      className="group flex flex-col lg:flex-row lg:items-center justify-between p-6 transition-all duration-300"
    >
      <div className="flex items-center gap-6 flex-1">
        <motion.div
          whileHover={{ rotate: [0, -2, 2, 0], scale: 1.05 }}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
            isActive
              ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-200/50"
              : "bg-slate-100 text-slate-400"
          }`}
        >
          <Server size={24} strokeWidth={1.5} />
        </motion.div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-none">
              {site.domain}
            </h3>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase border ${
                isActive
                  ? "bg-emerald-50/80 text-emerald-700 border-emerald-200 shadow-sm"
                  : "bg-slate-100/80 text-slate-500 border-slate-200"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                }`}
              />
              {site.status}
            </motion.div>
          </div>
          <div className="flex items-center gap-6 text-[11px] font-bold text-slate-500 uppercase tracking-tight">
            <span className="flex items-center gap-1.5">
              <Layers size={12} /> {site.planType || "WP‑Cloud"}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />{" "}
              {new Date(site.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1.5 text-indigo-600">
              <Activity size={12} className="text-indigo-400" />{" "}
              {site.visitors || 0} Req/mo
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-5 lg:mt-0 ml-20 lg:ml-0">
        <motion.button
          whileHover={isActive ? { scale: 1.02 } : {}}
          whileTap={isActive ? { scale: 0.97 } : {}}
          onClick={() =>
            navigate(`/wordpress/websitedashboard/${site.id || site._id}`)
          }
          className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
            isActive
              ? "bg-gradient-to-r from-slate-50 to-white text-slate-800 border border-slate-200/80 hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-700 shadow-sm hover:shadow-md"
              : "bg-slate-100/80 text-slate-300 cursor-not-allowed border border-slate-100/80"
          }`}
          disabled={!isActive}
        >
          {isActive ? (
            <span className="flex items-center gap-1">Manage →</span>
          ) : (
            "pending..."
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

// Enhanced EmptyState with AI‑like abstract illustration
function EmptyStateMotion() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative bg-white/60 backdrop-blur-xl border-2 border-dashed border-slate-200/80 rounded-[3rem] p-16 text-center overflow-hidden shadow-inner"
    >
      {/* AI graphic element */}
      <div className="absolute top-10 right-10 opacity-20">
        <svg width="120" height="120" viewBox="0 0 100 100">
          <circle cx="20" cy="20" r="8" fill="currentColor" className="text-indigo-300" />
          <circle cx="80" cy="30" r="12" fill="currentColor" className="text-purple-300" />
          <circle cx="40" cy="70" r="6" fill="currentColor" className="text-sky-300" />
          <path d="M10,80 L90,20" stroke="currentColor" strokeWidth="2" className="text-slate-300" strokeDasharray="4" />
        </svg>
      </div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-400 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-100/30"
      >
        <Server size={44} strokeWidth={1.2} />
      </motion.div>
      <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">
        Infrastructure Empty
      </h2>
      <p className="text-slate-500 text-base mb-10 max-w-sm mx-auto">
        No active instances found on CloudeData. <br />
        <span className="text-indigo-600 font-medium">AI‑ready environment</span> awaiting your first deployment.
      </p>
      <motion.button
        whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgb(99 102 241 / 0.2)" }}
        whileTap={{ scale: 0.98 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-4 rounded-2xl font-black text-sm shadow-xl shadow-indigo-200/30 border border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        Provision First Node
      </motion.button>
    </motion.div>
  );
}