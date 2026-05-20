import React from 'react';
import { 
  FaRocket, 
  FaChartLine, 
  FaUsers, 
  FaShieldAlt, 
  FaHeadset,
  FaCloudUploadAlt,
  FaMobileAlt
} from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';

const CrmBenefits = () => {
  const benefits = [
    {
      icon: <FaRocket className="text-3xl" />,
      title: 'Faster Operations',
      description: 'Automate daily tasks like attendance, fee collection, and report generation – saving hours of manual work.',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      title: 'Data-Driven Insights',
      description: 'Real-time analytics dashboards help you track student performance, teacher efficiency, and financial health.',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: 'Enhanced Collaboration',
      description: 'Connect teachers, parents, and administrators with instant messaging, alerts, and shared calendars.',
      gradient: 'from-violet-500 to-purple-500'
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: 'Secure & Compliant',
      description: 'Role-based access, data encryption, and GDPR/SOC2 compliance ensure your institution’s data is safe.',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: <FaCloudUploadAlt className="text-3xl" />,
      title: 'Cloud Access Anywhere',
      description: 'Manage your school from any device – web, tablet, or mobile – with real-time sync and backups.',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      icon: <FaHeadset className="text-3xl" />,
      title: '24/7 Priority Support',
      description: 'Dedicated support team and extensive knowledge base to help you every step of the way.',
      gradient: 'from-rose-500 to-pink-500'
    }
  ];

  return (
    <div className="relative w-full bg-gradient-to-br from-[#F8FAFC] via-white to-[#F1F5F9] py-20 px-4 md:px-8 font-sans overflow-hidden">
      
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#1E2A2A] to-[#3A5E5E] bg-clip-text text-transparent">
            CRM Benefits
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto mt-3">
            Why thousands of educational institutions trust our CRM to transform their management
          </p>
        </div>

        {/* Two-column layout: Image + Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left side – Modern Image with morphism & gradient border */}
          <div className="relative group">
            {/* Gradient outer border (morphism) */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
            
            {/* Image card with glassmorphism */}
            <div className="relative bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/60 shadow-xl">
              <div className="flex flex-col items-center gap-4">
                {/* Abstract CRM dashboard illustration */}
                <div className="w-full bg-gradient-to-br from-slate-100 to-gray-200 rounded-xl p-4 shadow-inner">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <HiAcademicCap className="text-indigo-500 text-xl" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-8 bg-white/60 rounded-lg w-3/4"></div>
                    <div className="h-20 bg-white/40 rounded-lg"></div>
                    <div className="flex gap-2">
                      <div className="h-10 w-20 bg-emerald-100 rounded-lg"></div>
                      <div className="h-10 w-20 bg-cyan-100 rounded-lg"></div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-center text-sm">
                  Real-time dashboard • Smart reports • Parent portal
                </p>
                <div className="flex gap-4 text-3xl text-gray-400">
                  <FaCloudUploadAlt />
                  <FaMobileAlt />
                  <FaChartLine />
                </div>
              </div>
            </div>
          </div>

          {/* Right side – Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="relative group bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-gray-200/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Gradient border on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${benefit.gradient} bg-opacity-10 shadow-md mb-3`}>
                  <div className="text-white">{benefit.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{benefit.description}</p>
                
                {/* Shine effect */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-white to-transparent opacity-0 group-hover:opacity-100  transition-opacity rounded-tr-xl"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional subtle CTA */}
        <div className="text-center mt-16">
          <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
            Explore All Benefits
          </button>
        </div>
      </div>

      {/* Custom keyframes (if needed) */}
      <style>{`
        @keyframes soft-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.02); }
        }
        .animate-soft-pulse {
          animation: soft-pulse 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CrmBenefits;