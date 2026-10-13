import React from 'react';
import { 
  FaMobileAlt, 
  FaSms, 
  FaFingerprint, 
  FaCreditCard, 
  FaSlidersH, 
  FaEnvelope, 
  FaChartBar, 
  FaClipboardList,
  FaSchool,
  FaUniversity,
  FaGraduationCap,
  FaBuilding,
  FaLandmark
} from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';

const Collaboration = () => {
  const features = [
    {
      icon: <FaMobileAlt className="text-3xl" />,
      title: 'Advanced Mobile Application',
      description: 'Access your school system anytime, anywhere with our smart mobile apps for students, parents, and teachers, seamless connectivity and real-time updates.',
      gradient: 'from-blue-600 to-cyan-500'
    },
    {
      icon: <FaSms className="text-3xl" />,
      title: 'SMS & Notification Integration',
      description: 'Stay connected with instant SMS and in-app notifications for important updates, alerts, and communication with students, parents, and staff.',
      gradient: 'from-emerald-600 to-teal-500'
    },
    {
      icon: <FaFingerprint className="text-3xl" />,
      title: 'Smart Attendance System',
      description: 'Track student and staff attendance in real-time with an efficient and easy-to-use digital attendance system for better monitoring and reporting.',
      gradient: 'from-violet-600 to-purple-500'
    },
    {
      icon: <FaCreditCard className="text-3xl" />,
      title: 'Online Payment Integration',
      description: 'Enable secure and hassle-free fee collection through multiple payment options including cards, net banking, and digital wallets.',
      gradient: 'from-amber-600 to-orange-500'
    },
    {
      icon: <FaSlidersH className="text-3xl" />,
      title: 'Flexible Customization',
      description: 'Customize the system as per your institution’s flexible requirements with flexible modules, features, and workflows.',
      gradient: 'from-indigo-600 to-blue-500'
    },
    {
      icon: <FaEnvelope className="text-3xl" />,
      title: 'Access via Email & Mobile App',
      description: 'Easily access student, teacher, and staff information through registered email or mobile app for quick and convenient use.',
      gradient: 'from-rose-600 to-pink-500'
    },
    {
      icon: <FaChartBar className="text-3xl" />,
      title: 'Data Analytics & Insights',
      description: 'Gain valuable insights with advanced reports and analytics to make smarter decisions and improve overall institutional performance.',
      gradient: 'from-cyan-600 to-blue-500'
    },
    {
      icon: <FaClipboardList className="text-3xl" />,
      title: 'Online Marks & Activity Monitoring',
      description: 'Track student performance, marks, and daily academic activities digitally with real-time updates.',
      gradient: 'from-teal-600 to-emerald-500'
    }
  ];

  const clients = [
    { name: 'Bright Future School', icon: <FaSchool className="text-4xl text-indigo-400" /> },
    { name: 'Elite International College', icon: <FaUniversity className="text-4xl text-emerald-400" /> },
    { name: 'Greenfield Academy', icon: <FaGraduationCap className="text-4xl text-amber-400" /> },
    { name: 'St. Mary’s Institution', icon: <FaBuilding className="text-4xl text-rose-400" /> },
    { name: 'Global Learning Trust', icon: <FaLandmark className="text-4xl text-cyan-400" /> }
  ];

  return (
    <div className="relative w-full bg-gradient-to-br from-[#1A1E2C] via-[#232838] to-[#1A1E2C] py-20 px-4 md:px-8 font-sans overflow-hidden">
      
      {/* Background decorative glows – subtle but rich */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/8 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl bg-white/5 blur-3xl rounded-full"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
            Smart School Management App for Seamless Collaboration
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto mt-4 text-lg leading-relaxed">  
            A powerful and user-friendly school ERP solution by Cloudedata that connects administrators, teachers, students, and parents on a single platform, ensuring smooth communication, better coordination, and real-time updates.
          </p>
        </div>

        {/* Features Grid - 8 cards (enhanced with better shadows & hover) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, idx) => (
            <div key={idx} className="relative group bg-gray-800/40 backdrop-blur-md rounded-xl p-5 border border-gray-700/50 hover:border-gray-500/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} shadow-lg mb-4`}>
                <div className="text-white">{feature.icon}</div>
              </div>
              <h3 className="text-lg font-bold text-gray-100 mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              
              {/* Glossy shine */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-tr-xl"></div>
            </div>
          ))}
        </div>

        {/* Our Valued Clients Section - refined */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-8">
            Our Valued Clients
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10">
            We are proud to partner with institutions and businesses who trust our CRM solutions.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {clients.map((client, idx) => (
              <div key={idx} className="flex flex-col items-center group w-32 md:w-36">
                <div className="w-24 h-24 bg-gray-800/50 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-gray-700/60 group-hover:border-indigo-500/40 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                  {client.icon}
                </div>
                <span className="mt-3 text-gray-300 font-medium text-sm text-center group-hover:text-white transition-colors">{client.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaboration;