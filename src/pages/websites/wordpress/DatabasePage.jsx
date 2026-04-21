import { useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import { motion, AnimatePresence } from 'framer-motion'; 
import { 
  Database, 
  ExternalLink, 
  ArrowLeft, 
  Copy, 
  Eye, 
  EyeOff, 
  Table, 
  RefreshCw, 
} from 'lucide-react'; 
import toast from 'react-hot-toast'; 
import { useDbTables, useDbCredentials } from '../../../hooks/useWordPress'; 
 
// phpMyAdmin Modal 
function PmaModal({ instanceId, isOpen, onClose, userData }) { 
  console.log("our fault", userData)
  const [showPass, setShowPass] = useState(false); 
  const { data: creds, isLoading } = useDbCredentials(instanceId, isOpen); 
 
  const copy = (text, label) => { 
    navigator.clipboard.writeText(text); 
    toast.success(`${label} copied!`); 
  }; 
 
  if (!isOpen) return null; 
 
  return ( 
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" 
      onClick={onClose} 
    > 
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        exit={{ opacity: 0, scale: 0.95 }} 
        transition={{ duration: 0.2 }} 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4" 
        onClick={(e) => e.stopPropagation()} 
      > 
        {/* Header */} 
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between"> 
          <div> 
            <h2 className="text-lg font-semibold text-slate-800"> 
              Database Access 
            </h2> 
            <p className="text-sm text-slate-500 mt-0.5"> 
              MySQL Panel for {creds?.domain} 
            </p> 
          </div> 
          <button 
            onClick={onClose} 
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500" 
          > 
            ✕ 
          </button> 
        </div> 
 
        <div className="p-6"> 
          {isLoading ? ( 
            <div className="space-y-3"> 
              {[1,2,3].map(i => ( 
                <div key={i} className="h-12 bg-slate-100 rounded-xl animate-pulse" /> 
              ))} 
            </div> 
          ) : ( 
            <div className="bg-slate-900 rounded-xl p-4 space-y-3"> 
              {/* URL */} 
              <div> 
                <label className="text-slate-400 text-xs mb-1 block"> 
                  phpMyAdmin URL 
                </label> 
                <div className="flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-2"> 
                  <a 
                    href={creds?.pmaUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-indigo-400 text-sm flex-1 truncate hover:underline" 
                  > 
                    {creds?.pmaUrl} 
                  </a> 
                  <button 
                    onClick={() => copy(creds?.pmaUrl, 'URL')} 
                    className="text-slate-400 hover:text-white shrink-0" 
                  > 
                    <Copy size={14} /> 
                  </button> 
                </div> 
              </div> 
 
              {/* Username */} 
              <div> 
                <label className="text-slate-400 text-xs mb-1 block"> 
                  Username 
                </label> 
                <div className="flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-2"> 
                  <span className="text-slate-200 text-sm flex-1"> 
                    {userData?.dbUser} 
                  </span> 
                  <button 
                    onClick={() => copy(userData?.dbUser, 'Username')} 
                    className="text-slate-400 hover:text-white shrink-0" 
                  > 
                    <Copy size={14} /> 
                  </button> 
                </div> 
              </div> 
 
              {/* Password */} 
              <div> 
                <label className="text-slate-400 text-xs mb-1 block"> 
                  Password 
                </label> 
                <div className="flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-2"> 
                  <span className="text-slate-200 text-sm flex-1 font-mono"> 
                    {showPass ? userData?.dbPassword : '••••••••••••'} 
                  </span> 
                  <button 
                    onClick={() => setShowPass(v => !v)} 
                    className="text-slate-400 hover:text-white shrink-0" 
                  > 
                    {showPass ? <EyeOff size={14} /> : <Eye size={14} />} 
                  </button> 
                  <button 
                    onClick={() => copy(userData?.dbPassword, 'Password')} 
                    className="text-slate-400 hover:text-white shrink-0" 
                  > 
                    <Copy size={14} /> 
                  </button> 
                </div> 
              </div> 
 
              {/* Open Button */} 
              <a 
                href={creds?.pmaUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="mt-2 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2" 
              > 
                Open phpMyAdmin 
                <ExternalLink size={14} /> 
              </a> 
            </div> 
          )} 
        </div> 
      </motion.div> 
    </div> 
  ); 
} 
 
// Main Database Page 
export default function DatabasePage() { 
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [pmaOpen, setPmaOpen] = useState(false); 
 
  const { data, isLoading, isError, refetch, isFetching } = useDbTables(id); 
 
  const copy = (text, label) => { 
    navigator.clipboard.writeText(text); 
    toast.success(`${label} copied!`); 
  }; 
 
  return ( 
    <div className="min-h-screen bg-slate-50"> 
      {/* Top bar */} 
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between"> 
        <div className="flex items-center gap-3"> 
          <button 
            onClick={() => navigate(`/wordpress/websitedashboard/${id}`)} 
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" 
          > 
            <ArrowLeft size={18} /> 
          </button> 
          <div> 
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5"> 
              <span 
                className="cursor-pointer hover:text-indigo-600" 
                onClick={() => navigate(`/wordpress/websitedashboard/${id}`)} 
              > 
                {data?.domain || 'Website'} 
              </span> 
              <span>›</span> 
              <span className="text-slate-800 font-medium">Database</span> 
            </div> 
            <h1 className="text-lg font-semibold text-slate-800 flex items-center gap-2"> 
              <Database size={18} className="text-indigo-600" /> 
              MySQL Database 
            </h1> 
          </div> 
        </div> 
 
        {/* Top right: Go to phpMyAdmin button */} 
        <button 
          onClick={() => setPmaOpen(true)} 
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-all" 
        > 
          <Database size={15} /> 
          Go to phpMyAdmin 
          <ExternalLink size={13} /> 
        </button> 
      </div> 
 
      <div className="px-6 py-6 max-w-6xl mx-auto"> 
        {/* DB Info Cards */} 
        {!isLoading && data && ( 
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"> 
            <div className="bg-white rounded-xl border border-slate-200 px-4 py-3"> 
              <p className="text-xs text-slate-500 mb-1">Database Name</p> 
              <div className="flex items-center gap-1"> 
                <p className="text-sm font-medium text-slate-800 truncate"> 
                  {data.dbName} 
                </p> 
                <button 
                  onClick={() => copy(data.dbName, 'DB Name')} 
                  className="text-slate-400 hover:text-indigo-600 shrink-0" 
                > 
                  <Copy size={12} /> 
                </button> 
              </div> 
            </div> 
            <div className="bg-white rounded-xl border border-slate-200 px-4 py-3"> 
              <p className="text-xs text-slate-500 mb-1">DB User</p> 
              <div className="flex items-center gap-1"> 
                <p className="text-sm font-medium text-slate-800 truncate"> 
                  {data.dbUser} 
                </p> 
                <button 
                  onClick={() => copy(data.dbUser, 'DB User')} 
                  className="text-slate-400 hover:text-indigo-600 shrink-0" 
                > 
                  <Copy size={12} /> 
                </button> 
              </div> 
            </div> 
            <div className="bg-white rounded-xl border border-slate-200 px-4 py-3"> 
              <p className="text-xs text-slate-500 mb-1">Total Tables</p> 
              <p className="text-sm font-medium text-slate-800"> 
                {data.tables?.length || 0} 
              </p> 
            </div> 
            <div className="bg-white rounded-xl border border-slate-200 px-4 py-3"> 
              <p className="text-xs text-slate-500 mb-1">Database Size</p> 
              <p className="text-sm font-medium text-slate-800"> 
                {data.dbSize} 
              </p> 
            </div> 
          </div> 
        )} 
 
        {/* Tables list */} 
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden"> 
          {/* Table header */} 
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between"> 
            <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2"> 
              <Table size={16} className="text-indigo-600" /> 
              Database Tables 
            </h2> 
            <button 
              onClick={() => refetch()} 
              disabled={isFetching} 
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 transition-colors disabled:opacity-50" 
            > 
              <RefreshCw size={13} className={isFetching ? 'animate-spin' : ''} /> 
              Refresh 
            </button> 
          </div> 
 
          {/* Loading skeleton */} 
          {isLoading && ( 
            <div className="divide-y divide-slate-100"> 
              {[1,2,3,4,5,6].map(i => ( 
                <div key={i} className="px-6 py-3 flex items-center gap-4"> 
                  <div className="h-4 bg-slate-100 rounded animate-pulse w-48" /> 
                  <div className="h-4 bg-slate-100 rounded animate-pulse w-16 ml-auto" /> 
                  <div className="h-4 bg-slate-100 rounded animate-pulse w-16" /> 
                  <div className="h-4 bg-slate-100 rounded animate-pulse w-16" /> 
                </div> 
              ))} 
            </div> 
          )} 
 
          {/* Error state */} 
          {isError && ( 
            <div className="px-6 py-12 text-center"> 
              <Database size={32} className="text-slate-300 mx-auto mb-3" /> 
              <p className="text-slate-500 text-sm"> 
                Failed to load database tables. 
              </p> 
              <button 
                onClick={() => refetch()} 
                className="mt-3 text-indigo-600 text-sm hover:underline" 
              > 
                Try again 
              </button> 
            </div> 
          )} 
 
          {/* Tables */} 
          {!isLoading && !isError && data?.tables && ( 
            <> 
              {/* Column headers */} 
              <div className="px-6 py-2 bg-slate-50 border-b border-slate-100 grid grid-cols-4 gap-4"> 
                <span className="text-xs font-medium text-slate-500"> 
                  Table Name 
                </span> 
                <span className="text-xs font-medium text-slate-500 text-right"> 
                  Rows 
                </span> 
                <span className="text-xs font-medium text-slate-500 text-right"> 
                  Size (KB) 
                </span> 
                <span className="text-xs font-medium text-slate-500 text-right"> 
                  Engine 
                </span> 
              </div> 
 
              {/* Rows */} 
              <div className="divide-y divide-slate-100"> 
                {data.tables.map((table, i) => ( 
                  <motion.div 
                    key={table.name} 
                    initial={{ opacity: 0, y: 4 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: i * 0.03 }} 
                    className="px-6 py-3 grid grid-cols-4 gap-4 hover:bg-slate-50 transition-colors" 
                  > 
                    <div className="flex items-center gap-2"> 
                      <Table size={14} className="text-indigo-400 shrink-0" /> 
                      <span className="text-sm text-slate-800 font-mono truncate"> 
                        {table.name} 
                      </span> 
                    </div> 
                    <span className="text-sm text-slate-600 text-right"> 
                      {table.rows.toLocaleString()} 
                    </span> 
                    <span className="text-sm text-slate-600 text-right"> 
                      {table.sizeKb} 
                    </span> 
                    <span className="text-xs text-slate-500 text-right"> 
                      {table.engine} 
                    </span> 
                  </motion.div> 
                ))} 
              </div> 
 
              {data.tables.length === 0 && ( 
                <div className="px-6 py-12 text-center"> 
                  <p className="text-slate-500 text-sm">No tables found.</p> 
                </div> 
              )} 
            </> 
          )} 
        </div> 
      </div> 
 
      {/* phpMyAdmin Modal */} 
      <AnimatePresence> 
        {pmaOpen && ( 
          <PmaModal 
            instanceId={id} 
            userData = {data}
            isOpen={pmaOpen} 
            onClose={() => setPmaOpen(false)} 
          /> 
        )} 
      </AnimatePresence> 
    </div> 
  ); 
}