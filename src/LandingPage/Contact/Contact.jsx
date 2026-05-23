import React from 'react';
import { Mail, Phone, MapPin, Clock, Building, ShieldCheck, User, Briefcase, FileText, ChevronRight } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* 1. Professional Banner Section */}
      <section className="bg-slate-900 py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            How can we assist your business today?
          </h1>
          <p className="text-lg text-slate-400 font-light">
            Whether you're looking to scale your infrastructure or need technical support, our team is ready to provide enterprise-grade solutions.
          </p>
        </div>
      </section>

      {/* 2. Main Contact Page Layout */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Left Column: Corporate & Department Data */}
          <div className="lg:col-span-1 space-y-10">
            
            {/* Headquarters Card */}
            <section className="bg-white p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Building className="w-5 h-5 text-blue-700" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900">Corporate HQ</h2>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                Paytel Financial Technologies Pvt. Ltd.
              </p>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                A 212, First Floor, Okhla Industrial Estate Phase-3, New Delhi, 110020, India
              </p>
            </section>

            {/* Departmental Routing */}
            <div className="space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-200 pb-2">Departmental Lines</h2>
              
              <div className="space-y-5">
                {[
                  { label: "Enterprise Sales", email: "sales@cloudedata.com" },
                  { label: "Technical Support", email: "support@cloudedata.com" },
                  { label: "Billing & Accounting", email: "billing@cloudedata.com" },
                  { label: "Corporate Inquiries", email: "info@cloudedata.com" }
                ].map((dept, i) => (
                  <div key={i}>
                    <p className="text-xs font-bold text-slate-900">{dept.label}</p>
                    <a href={`mailto:${dept.email}`} className="text-sm text-blue-700 hover:underline">{dept.email}</a>
                  </div>
                ))}
                <div>
                  <p className="text-xs font-bold text-slate-900">Direct Phone Line</p>
                  <p className="text-sm text-slate-700">+91-9311472355</p>
                </div>
              </div>
            </div>

            {/* Service Availability */}
            <section>
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-slate-400" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900">Service Hours</h2>
              </div>
              <p className="text-xs text-slate-600">Mon-Fri: 09:00 - 18:00 IST<br />Technical Support: 24/7/365</p>
            </section>
          </div>

          {/* Right Column: Extended Professional Form */}
          <div className="lg:col-span-2 bg-white p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold mb-6 text-slate-900">Service Request Portal</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2"><User size={14}/> Full Name</label>
                <input type="text" className="w-full border border-slate-300 p-3 text-sm focus:border-blue-700 focus:ring-1 focus:ring-blue-700 outline-none transition-all" placeholder="Enter Full Name" />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2"><Mail size={14}/> Work Email</label>
                <input type="email" className="w-full border border-slate-300 p-3 text-sm focus:border-blue-700 focus:ring-1 focus:ring-blue-700 outline-none transition-all" placeholder="name@company.com" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2"><Briefcase size={14}/> Company/Org</label>
                <input type="text" className="w-full border border-slate-300 p-3 text-sm focus:border-blue-700 focus:ring-1 focus:ring-blue-700 outline-none transition-all" placeholder="Organization Name" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2"><FileText size={14}/> Department Route</label>
                <select className="w-full border border-slate-300 p-3 text-sm focus:border-blue-700 focus:ring-1 focus:ring-blue-700 outline-none bg-white">
                  <option>Enterprise Sales</option>
                  <option>Technical Infrastructure</option>
                  <option>Billing & Accounting</option>
                  <option>General Inquiry</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500">Project Requirements</label>
                <textarea rows="6" className="w-full border border-slate-300 p-3 text-sm focus:border-blue-700 focus:ring-1 focus:ring-blue-700 outline-none transition-all" placeholder="Describe your technical requirements or support issue..." />
              </div>

              <div className="md:col-span-2 flex items-center justify-between pt-4">
                <p className="text-[10px] text-slate-500 flex items-center gap-1"><ShieldCheck size={12}/> Secure 256-bit Encrypted Transmission</p>
                <button className="bg-slate-900 text-white font-bold py-3 px-8 text-sm hover:bg-blue-800 transition-all uppercase tracking-wider flex items-center gap-2">
                  Submit Inquiry <ChevronRight size={16}/>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}