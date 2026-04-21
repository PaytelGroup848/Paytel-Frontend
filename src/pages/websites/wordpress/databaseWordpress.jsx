import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Database, Plus, User, Lock, Trash2, Globe, 
  Search, ShieldCheck, ExternalLink, DatabaseZap, 
  MoreVertical, CheckCircle2, Copy 
} from "lucide-react";

const DatabaseManager = () => {
  const [dbName, setDbName] = useState("");
  const [dbUser, setDbUser] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Data for Scalability Test
  const [databases, setDatabases] = useState([
    { id: 1, name: "wp_cloude_prod", user: "admin_u1", size: "124 MB", host: "localhost" },
    { id: 2, name: "cloude_data_db", user: "dev_user", size: "45 MB", host: "127.0.0.1" },
  ]);

  const handleCreateDB = (e) => {
    e.preventDefault();
    // Logic for creation goes here
    const newEntry = {
      id: Date.now(),
      name: dbName,
      user: dbUser,
      size: "0 MB",
      host: "localhost"
    };
    setDatabases([newEntry, ...databases]);
    setDbName("");
    setDbUser("");
  };

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-[1200px] mx-auto">
      {/* --- SECTION 1: CREATE DATABASE --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
            <DatabaseZap size={20} />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-800 leading-none">Create New Database</h2>
            <p className="text-[11px] text-slate-400 mt-1 font-medium uppercase tracking-wider">Setup your MySQL environment</p>
          </div>
        </div>

        <form onSubmit={handleCreateDB} className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-700 flex items-center gap-2">
              <Database size={14} className="text-slate-400" /> Database Name
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-mono">u921_</span>
              <input 
                type="text" 
                value={dbName}
                onChange={(e) => setDbName(e.target.value)}
                placeholder="wordpress_db"
                className="w-full pl-14 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-sm mono"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-700 flex items-center gap-2">
              <User size={14} className="text-slate-400" /> Database User
            </label>
            <input 
              type="text" 
              value={dbUser}
              onChange={(e) => setDbUser(e.target.value)}
              placeholder="db_admin"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-sm mono"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-700 flex items-center gap-2">
              <Lock size={14} className="text-slate-400" /> Password
            </label>
            <div className="flex gap-2">
              <input 
                type="password" 
                placeholder="••••••••••••"
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-sm"
              />
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-indigo-200">
                <Plus size={16} /> Create
              </button>
            </div>
          </div>
        </form>
      </motion.div>

      {/* --- SECTION 2: LIST OF DATABASES --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-800">Current Databases</h2>
            <p className="text-sm text-slate-400 font-medium">Manage existing users and storage</p>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search databases..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none w-full md:w-64 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Database Name</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">User & Host</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Size</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <AnimatePresence>
                {databases.filter(db => db.name.toLowerCase().includes(searchTerm.toLowerCase())).map((db) => (
                  <motion.tr 
                    key={db.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="hover:bg-indigo-50/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 group-hover:bg-white text-slate-500 rounded-lg transition-colors">
                          <Database size={16} />
                        </div>
                        <span className="text-[14px] font-bold text-slate-700 mono">{db.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-semibold text-slate-600 flex items-center gap-1.5">
                          <User size={12} className="text-indigo-400" /> {db.user}
                        </span>
                        <span className="text-[11px] text-slate-400 mono flex items-center gap-1.5">
                          <Globe size={11} /> {db.host}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[12px] font-bold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-lg border border-emerald-100">
                        {db.size}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button title="phpMyAdmin" className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                        <ExternalLink size={16} />
                      </button>
                      <button title="Change Password" className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all">
                        <ShieldCheck size={16} />
                      </button>
                      <button 
                        onClick={() => setDatabases(databases.filter(d => d.id !== db.id))}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {databases.length === 0 && (
          <div className="p-20 text-center">
            <div className="inline-flex p-4 bg-slate-50 rounded-full mb-4">
              <Database size={32} className="text-slate-200" />
            </div>
            <p className="text-slate-400 text-sm font-medium">No databases found. Create one to get started.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DatabaseManager;