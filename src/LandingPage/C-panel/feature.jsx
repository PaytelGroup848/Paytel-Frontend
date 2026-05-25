import React, { useState } from 'react';

export default function CPanelHosting() {
  // Functional state for an interactive "Get Started" modal/action
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you! Redirecting you to set up your cPanel hosting for: ${email}`);
      setIsModalOpen(false);
      setEmail('');
    }
  };

  const features = [
    {
      title: "Launch with ease",
      description: "Everything you need to get started, including creating and automating server tasks, is included. cPanel empowers you to focus directly on the success of your customers.",
      icon: (
        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Control and flexibility",
      description: "Customize your offerings using hundreds of available features, or allow your customers total control. With cPanel you have the freedom to choose your business model.",
      icon: (
        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    },
    {
      title: "Fuel your business",
      description: "With revenue generating capabilities built in, from add-ons and third-party plugins to white-label software and transfer tools, you are able to easily manage and scale your business.",
      icon: (
        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-orange-500 selection:text-white">
      
      {/* HERO SECTION */}
      <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-orange-500 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500 blur-[120px]"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase tracking-wider">
              Premium Server Management
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">cPanel Hosting</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              cPanel provides the most reliable and intuitive server and site management platform. With a rich feature set and customer-first support, cPanel’s automated and configurable platform enables customers to focus on growing their businesses.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
               <a href="/contact">   <button 
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Get Started Now
              </button>
              </a> 
            </div>
          </div>

          {/* Visual Mockup Placeholder for Professional look */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50 shadow-2xl backdrop-blur-md transform hover:rotate-1 transition-transform duration-300">
              <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
                <div className="flex space-x-2 pb-2 border-b border-slate-800">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-800 rounded w-1/3"></div>
                  <div className="h-8 bg-slate-800/40 rounded w-full"></div>
                  <div className="h-20 bg-slate-800/20 rounded w-full border border-dashed border-slate-800 flex items-center justify-center text-xs text-slate-500">
                    [ cPanel Dashboard Preview ]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CORE FEATURES SECTION */}
      <section id="features" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Everything You Need To Build & Scale
          </h2>
          <div className="h-1 w-20 bg-orange-500 mx-auto rounded-full"></div>
          <p className="text-lg text-slate-600">
            Empower your infrastructure with optimized deployment workflows and total operational freedom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors duration-200">
                {item.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="bg-slate-900 text-white mx-4 sm:mx-8 my-12 rounded-3xl overflow-hidden relative shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-indigo-600/20 mix-blend-multiply pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center py-16 px-6 sm:px-12 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Create a Beautiful Website With Ease
          </h2>
          <p className="text-lg text-slate-300 max-w-xl mx-auto font-light">
            Build a beautiful website effortlessly using cPanel. Manage files, install apps, and customize with absolute ease!
          </p>
          <div className="pt-4">
            <button 
              className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg transition-colors duration-200"
            >
              Get Started Now
              <svg className="w-5 h-5 ml-2 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-8 text-xs text-slate-400 border-t border-slate-200">
        &copy; {new Date().getFullYear()} cPanel Hosting Platform. All rights reserved.
      </footer>

      {/* INTERACTIVE MODAL STATE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Deploy Your Site</h3>
            <p className="text-slate-500 text-sm mb-6">Enter your email address to initiate your server provisioning wizard.</p>
            
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-slate-900 transition-all text-sm"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors text-sm"
              >
                Launch Dashboard
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}