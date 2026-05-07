import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, Zap, Copy, Activity, Search, 
  ChevronRight, Calendar, CreditCard,
  Cpu, Database, HardDrive, Terminal, 
  Globe, Plus, MoreHorizontal, ShieldCheck
} from 'lucide-react';
import {   Monitor, MapPin,  ArrowRight } from 'lucide-react';
import { useVpsInstances } from '../../hooks/useVps';
import SkeletonList from '../../components/ui/skeletons/SkeletonList';
import {  SiDebian, SiCentos, SiUbuntu, SiRockylinux, SiAlmalinux, SiFedora, SiArchlinux, SiAlpinelinux, SiOpensuse } from 'react-icons/si';
import { FaWindows } from "react-icons/fa";
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const VPSDashboard = () => {

  const { data: instances, isLoading } = useVpsInstances();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

const OSIcon = ({ os }) => {
  const name = os?.toLowerCase() || '';

  const getIcon = () => {
    if (name.includes('ubuntu'))                          return { Icon: SiUbuntu,    color: '#E95420', bg: '#FEF0EB' };
    if (name.includes('debian'))                          return { Icon: SiDebian,    color: '#A80030', bg: '#FCEEF2' };
    if (name.includes('centos'))                          return { Icon: SiCentos,    color: '#932279', bg: '#F5EEF8' };
    if (name.includes('rocky'))                           return { Icon: SiRockylinux,color: '#10B981', bg: '#ECFDF5' };
    if (name.includes('alma'))                            return { Icon: SiAlmalinux, color: '#FF6600', bg: '#FFF3EB' };
    if (name.includes('fedora'))                          return { Icon: SiFedora,    color: '#294172', bg: '#EEF1F8' };
    if (name.includes('arch'))                            return { Icon: SiArchlinux, color: '#1793D1', bg: '#EBF6FC' };
    if (name.includes('alpine'))                          return { Icon: SiAlpinelinux,color: '#0D597F', bg: '#E9F2F7' };
    if (name.includes('opensuse') || name.includes('suse')) return { Icon: SiOpensuse, color: '#73BA25', bg: '#F2FAEB' };
    if (name.includes('windows')) return { Icon: FaWindows, color: '#0078D4', bg: '#EBF4FD' };
    return null;
  };

  const match = getIcon();

  if (!match) {
    return (
      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100">
        <Monitor size={20} className="text-slate-400" />
      </div>
    );
  }

  const { Icon, color, bg } = match;

  return (
    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
      <Icon size={22} color={color} />
    </div>
  );
};
  
    const filteredInstances = instances?.filter(inst => 
    inst.hostname?.toLowerCase().includes(search.toLowerCase()) ||
    inst.ip?.includes(search)
  );

  // console.log("this is my vps paid",filteredInstances )


  // Redirect Function
  const handleManageClick = (vpsId) => {
    // Navigating to your specific path
    window.location.href = `http://localhost:5173/vps/vps_overview`;
  };

  if (isLoading) {
      return (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">Infrastructure</h1>
              <p className="text-sm text-textMuted">Real-time status of your virtual fleet.</p>
            </div>
          </div>
          <SkeletonList rows={5} />
        </div>
      );
    }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 lg:p-20 font-sans text-slate-800">
      
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Infrastructure</h1>
          <p className="text-slate-500 font-medium mt-1 text-sm">Real-time status of your virtual fleet.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" size={16} />
            <input
              type="text"
              placeholder="Search instances..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-bgLighter border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 w-64 focus:outline-none focus:border-primary transition-all"
            />
          </div>
          

          <button
          onClick={() => navigate('/vps')}
           className="flex cursor-pointer items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95">
            <Plus size={18} /> New Server
          </button>
        </div>
      </div>

      {/* Vertical Cards Container */}

 {filteredInstances?.length === 0 ? (
          <div className="bg-bgLighter border border-dashed border-border rounded-2xl p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
              <Server size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold">No instances found</h3>
              <p className="text-textMuted">Deploy your first VPS in minutes.</p>
            </div>
            <Button variant="primary" onClick={() => navigate('/vps')}>Deploy Now</Button>
          </div>
        ) : (
          filteredInstances?.map((instance) => {
            const isExpiringSoon = instance.expiresAt && (new Date(instance.expiresAt) - new Date()) < 30 * 24 * 60 * 60 * 1000;

            return (
              <div 
                key={instance.id} 
                className="bg-bgLighter border mb-5 border-gray-300 rounded-2xl p-5 hover:border-primary/60 transition-all group flex flex-col md:flex-row md:items-center gap-6"
              >
                <div className="flex items-center gap-4 flex-1">
                  <OSIcon os={instance.os} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold truncate max-w-[200px]">{instance.hostname}</h3>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        {instance.ip}
                      </div>
                    </div>
                    <div className="text-xs text-textMuted mt-0.5 flex items-center gap-3">
                      <span className="font-semibold text-text">{instance.planId?.name || 'Standard Plan'}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {instance.location}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:flex items-center gap-8 md:gap-12">
                  <div className="space-y-1">
                    <div className="text-[10px] text-textMuted font-bold uppercase tracking-wider">CPU Load</div>
                    <div className="font-bold text-gray-700">{instance.cpuLoad || 0}%</div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-[10px] text-textMuted font-bold uppercase tracking-wider">Expiry Date</div>
                    <div className={`font-bold  flex items-center gap-1.5 ${isExpiringSoon ? 'text-red-500' : 'text-gray-700'}`}>
                      <Calendar size={14} />
                      {instance.expiresAt ? new Date(instance.expiresAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                </div>

                 <button 
                onClick={() => navigate(`/vps/paid/${instance.id}`)}
                className="flex-grow lg:flex-none border cursor-pointer border-blue-300 px-4 py-3 bg-blue-50 text-blue-700 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-800 hover:text-white transition-all duration-300"
               >
                 Dashboard <ChevronRight size={16} />
               </button>
              </div>
            );
            })
        )}
     
    </div>
  );
};

export default VPSDashboard;