import React, { useState } from 'react';
import { 
  FaRocket, 
  FaChartLine, 
  FaUsers, 
  FaShieldAlt, 
  FaHeadset,
  FaCloudUploadAlt,
  FaArrowRight,
  FaCheckCircle
} from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';
import { RiDashboardHorizontalLine, RiMacLine } from 'react-icons/ri';

const CrmBenefits = () => {
  const [activeTab, setActiveTab] = useState('academics');

  const benefits = [
    {
      icon: <FaRocket />,
      title: 'Accelerated Operations',
      description: 'Automate high-friction daily tasks like complex attendance registries, flexible tuition collections, and unified report building.'
    },
    {
      icon: <FaChartLine />,
      title: 'Data-Driven Intelligence',
      description: 'Real-time diagnostic analytics pipelines allow administrators to track ongoing classroom trends, financial health metrics, and staff allocations.'
    },
    {
      icon: <FaUsers />,
      title: 'Unified Communication Matrix',
      description: 'Tightly bind educators, legal guardians, and backend managers together with automated operational announcements and central calendars.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Enterprise-Grade Security',
      description: 'Rigid role-based access control structures, layered field encryption protocols, and verified compliance maps ensure maximum file integrity.'
    },
    {
      icon: <FaCloudUploadAlt />,
      title: 'Decentralized Cloud Architecture',
      description: 'Manage and scale institutional endpoints dynamically from any secure device with redundant transactional backup arrays.'
    },
    {
      icon: <FaHeadset />,
      title: 'Continuous Support & SLA',
      description: 'Gain direct access to a dedicated deployment support architecture coupled with an extensive real-time knowledge infrastructure.'
    }
  ];

  return (
    <section className="relative w-full bg-gradient-to-br from-[#F8FAFC] via-white to-[#EFF6FF] py-32 px-6 md:px-12 lg:px-16 font-sans overflow-hidden select-none">
      
      {/* Light background grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Soft glowing accents (light) */}
      <div className="absolute top-1/4 left-[-10%] w-[600px] h-[600px] bg-blue-200/30 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-10%] w-[600px] h-[600px] bg-indigo-200/20 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-24 border-b border-gray-200/80 pb-12">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/80 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" /> Infrastructure Capabilities
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.05]">
              Systemic Management, <br />Optimized At Scale.
            </h2>
          </div>
          <p className="text-gray-600 max-w-md text-sm sm:text-base font-medium leading-relaxed lg:text-right">
            Discover why global educational frameworks deploy our transactional engine to replace legacy infrastructure and shield core operations.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Interactive Terminal UI (light themed) */}
          <div className="lg:col-span-6 xl:col-span-5 relative w-full max-w-xl mx-auto lg:max-w-none">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-200/40 to-indigo-200/40 rounded-2xl blur-xl opacity-50 pointer-events-none" />
            
            <div className="relative bg-white/90 border border-gray-200/80 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden">
              
              {/* Window Header */}
              <div className="flex justify-between items-center bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-gray-100 border border-gray-300 text-gray-600">
                  <RiMacLine className="text-xs text-gray-500" />
                  <span className="text-[10px] font-bold tracking-wider uppercase">core-workspace-v3.0</span>
                </div>
                <div className="w-10" />
              </div>

              {/* Tabs */}
              <div className="grid grid-cols-3 border-b border-gray-200 text-center text-xs font-bold tracking-wide uppercase bg-gray-50">
                <button 
                  onClick={() => setActiveTab('academics')}
                  className={`py-3 transition-colors border-b-2 ${activeTab === 'academics' ? 'border-blue-500 text-blue-700 bg-blue-50/40' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Academics
                </button>
                <button 
                  onClick={() => setActiveTab('finance')}
                  className={`py-3 transition-colors border-b-2 ${activeTab === 'finance' ? 'border-indigo-500 text-indigo-700 bg-indigo-50/40' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Finance
                </button>
                <button 
                  onClick={() => setActiveTab('security')}
                  className={`py-3 transition-colors border-b-2 ${activeTab === 'security' ? 'border-violet-500 text-violet-700 bg-violet-50/40' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Security
                </button>
              </div>

              {/* Dynamic Content */}
              <div className="p-6 h-[260px] flex flex-col justify-between text-left bg-white">
                {activeTab === 'academics' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Curriculum Deployments</span>
                      <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">99.8% Efficient</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                        <FaCheckCircle className="text-blue-500 text-xs" /> Dynamic Timetable Optimization
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                        <FaCheckCircle className="text-blue-500 text-xs" /> Automated Parent Performance Portal
                      </div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl space-y-1.5">
                      <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase tracking-wide"><span>Data Processing load</span><span>44ms latency</span></div>
                      <div className="h-1 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 w-[72%] rounded-full" /></div>
                    </div>
                  </div>
                )}

                {activeTab === 'finance' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Automated Revenue Streams</span>
                      <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">Gateway Sync Active</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                        <FaCheckCircle className="text-indigo-500 text-xs" /> Micro-payment Ledger Routing
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                        <FaCheckCircle className="text-indigo-500 text-xs" /> Real-time Institutional Expense Matrix
                      </div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl space-y-1.5">
                      <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase tracking-wide"><span>Transactional volume</span><span>$248.5K / daily average</span></div>
                      <div className="h-1 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 w-[91%] rounded-full" /></div>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Encrypted System Core</span>
                      <span className="text-xs font-extrabold text-violet-700 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded">GDPR / SOC2 Compliant</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                        <FaCheckCircle className="text-violet-500 text-xs" /> Dynamic RBAC Role Allocations
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                        <FaCheckCircle className="text-violet-500 text-xs" /> Continuous Redundant Database Mirroring
                      </div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl space-y-1.5">
                      <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase tracking-wide"><span>Encryption status</span><span>AES-256 Bit verified</span></div>
                      <div className="h-1 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 w-[100%] rounded-full" /></div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 border-t border-gray-200 pt-3 text-[11px] text-gray-500 font-medium">
                  <RiDashboardHorizontalLine className="text-blue-500" />
                  <span>Analytical workspace engine linked to real-time microservices.</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Benefits Cards with Gradient Outline Borders */}
          <div className="lg:col-span-6 xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {benefits.map((benefit, idx) => (
              <div 
                key={idx} 
                className="relative group bg-white rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: '1px solid transparent',
                  backgroundClip: 'padding-box',
                  backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #60A5FA, #C084FC, #F472B6)',
                  backgroundOrigin: 'border-box',
                  backgroundRepeat: 'no-repeat',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}
              >
                {/* Hover gradient border enhancement */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-indigo-500/0 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="space-y-4 text-left">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 border border-gray-200 group-hover:text-blue-600 transition-all duration-300 shadow-sm">
                    <span className="text-base">{benefit.icon}</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-gray-900 tracking-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
                
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-gray-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-tr-xl pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-20">
          <button 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-white group"
            aria-label="Initialize Core Platform Access"
          >
            Explore System Architecture
            <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
};

export default CrmBenefits;