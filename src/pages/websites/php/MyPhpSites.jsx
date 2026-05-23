import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Globe, 
  Activity, 
  Clock, 
  ArrowRight, 
  ExternalLink, 
  Server,
  Database,
  Code2,
  AlertCircle,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePhpInstances, useDeletePhpInstance } from '../../../hooks/usePhpHosting';
import  Badge  from '../../../components/ui/Badge';
import Button  from '../../../components/ui/Button';
import toast from 'react-hot-toast';

const StatusBadge = ({ status }) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 font-black uppercase text-[10px]">Active</Badge>;
    case 'provisioning':
      return <Badge className="bg-blue-50 text-blue-600 border-blue-100 font-black uppercase text-[10px] animate-pulse">Installing...</Badge>;
    case 'pending_dns':
      return <Badge className="bg-amber-50 text-amber-600 border-amber-100 font-black uppercase text-[10px]">Pending DNS</Badge>;
    case 'pending_setup':
      return <Badge className="bg-indigo-50 text-indigo-600 border-indigo-100 font-black uppercase text-[10px]">Setup Required</Badge>;
    case 'failed':
      return <Badge className="bg-red-50 text-red-600 border-red-100 font-black uppercase text-[10px]">Failed</Badge>;
    case 'suspended':
      return <Badge className="bg-slate-50 text-slate-600 border-slate-100 font-black uppercase text-[10px]">Suspended</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const TypeBadge = ({ type }) => {
  const icons = {
    html: <Code2 size={12} />,
    php: <Server size={12} />,
    mysql: <Database size={12} />
  };
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider border border-slate-200">
      {icons[type]}
      {type}
    </div>
  );
};

export default function MyPhpSites() {
  const navigate = useNavigate();
  const { data, isLoading } = usePhpInstances();
  const deleteInstance = useDeletePhpInstance();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this site? All files and data will be permanently removed.')) {
      await deleteInstance.mutateAsync(id);
    }
  };

  const handleAction = (instance) => {
    if (instance.status === 'pending_setup' || instance.status === 'pending_dns' || instance.status === 'provisioning') {
      navigate(`/websites/php/dns/${instance.id}`);
    } else if (instance.status === 'active') {
      navigate(`/websites/php/dashboard/${instance.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">My PHP Hosting</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Manage your PHP and HTML websites from one place.</p>
          </div>
          <Button 
            onClick={() => navigate('/websites/php')}
            className="h-14 px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-200 flex items-center gap-3"
          >
            <Plus size={20} />
            New Site
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-white rounded-3xl border border-slate-100 animate-pulse" />
            ))}
          </div>
        ) : data?.items?.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {data.items.map((instance) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={instance.id}
                className="group bg-white rounded-3xl p-6 border border-slate-100 hover:border-indigo-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/30 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-600 border border-slate-100 group-hover:bg-indigo-50 transition-colors">
                      <Globe size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        {instance.domain || 'No domain set'}
                        {instance.domain && (
                          <ExternalLink 
                            size={14} 
                            className="text-slate-300 group-hover:text-indigo-400 cursor-pointer" 
                            onClick={() => window.open(`http://${instance.domain}`, '_blank')} 
                          />
                        )}
                      </h3>
                      <div className="flex items-center gap-3 mt-1.5">
                        <TypeBadge type={instance.siteType} />
                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                        <StatusBadge status={instance.status} />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 lg:gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expires On</p>
                      <p className="text-xs font-black text-slate-900 mt-0.5">
                        {new Date(instance.expiresAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleAction(instance)}
                        className={`h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          instance.status === 'active' 
                            ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white border border-indigo-100' 
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                      >
                        {instance.status === 'active' ? 'Dashboard' : instance.status === 'pending_setup' ? 'Setup Domain' : 'Verify DNS'}
                        <ArrowRight size={14} className="ml-2" />
                      </Button>
                      
                      <button
                        onClick={() => handleDelete(instance.id)}
                        className="w-12 h-12 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white border border-red-100 flex items-center justify-center transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] p-20 text-center border border-dashed border-slate-200 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mx-auto mb-6">
              <Server size={40} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">No Active Sites</h2>
            <p className="text-slate-500 font-medium max-w-sm mx-auto mt-2 mb-10">
              You haven't created any PHP or HTML hosting instances yet. Start by choosing a plan.
            </p>
            <Button 
              onClick={() => navigate('/websites/php')}
              className="h-14 px-10 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-200"
            >
              Choose a Plan
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
