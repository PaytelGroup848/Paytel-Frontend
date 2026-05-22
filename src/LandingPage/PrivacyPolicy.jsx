import { Shield, Globe, Users, Server, Lock, Mail, ExternalLink, FileText, Award } from 'lucide-react';
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100">
      <Navbar />
      
      {/* Hero Section – Premium with layered shadows */}
      <div className="relative overflow-hidden bg-white shadow-2xl border-b border-slate-200/80">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto px-6 py-20 sm:py-24 lg:px-8 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">Legal Document</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Privacy & Terms
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-3xl leading-relaxed">
            Please read this agreement carefully, as it contains important information regarding your legal rights and remedies.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm border-t border-slate-100 pt-6">
            <div className="flex items-center gap-2 text-slate-600">
              <Mail size={15} className="text-blue-500" />
              <span>support@cloudedata.com</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Globe size={15} className="text-blue-500" />
              <span>www.cloudedata.com</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Shield size={15} className="text-blue-500" />
              <span>Effective: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Document Body – Premium card with strong shadows and borders */}
      <div className="max-w-6xl mx-auto px-6 py-16 lg:px-8">
        <div className="relative">
          {/* Decorative background blur */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-transparent rounded-3xl blur-xl -z-10" />
          
          {/* Main document card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)]">
            {/* Inner gold/blue accent line at top */}
            <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600" />
            
            <div className="p-8 md:p-12 lg:p-16 space-y-10">
              {/* Section 1 */}
              <section className="group hover:bg-slate-50/50 transition-colors duration-200 rounded-xl p-4 -m-4">
                <div className="flex items-center gap-3 mb-5 pb-2 border-b border-slate-200">
                  <div className="p-1.5 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg shadow-sm group-hover:shadow-md transition-all">
                    <Globe className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">1. Overview</h2>
                </div>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p>
                    This Universal Terms of Service Agreement (“Agreement”) is entered into between Cloudedata and you (“User”) and becomes effective on the date you access our website or electronically accept these terms.
                  </p>
                  <p>Unless stated otherwise, the contracting entity is:</p>
                  <div className="bg-gradient-to-r from-slate-50 to-white rounded-xl p-5 border-l-4 border-blue-500 shadow-sm">
                    <p className="font-semibold text-slate-800">Paytel Financial Technologies Pvt. Ltd.</p>
                    <p className="text-sm text-slate-600">Registered Address: Okhla Industrial Estate, Phase 3, New Delhi – 110020, India</p>
                  </div>
                  <p>This Agreement governs your use of:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>The Cloudedata website (“Site”)</li>
                    <li>All products and services provided by Cloudedata (“Services”)</li>
                  </ul>
                  <p>
                    Your use of the Site or Services confirms that you have read and understood this Agreement, agree to comply with all applicable policies, and are using our Services for commercial or professional purposes. Cloudedata reserves the right to update or modify these terms at any time; continued use constitutes acceptance.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section className="group hover:bg-slate-50/50 transition-colors duration-200 rounded-xl p-4 -m-4">
                <div className="flex items-center gap-3 mb-5 pb-2 border-b border-slate-200">
                  <div className="p-1.5 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg shadow-sm group-hover:shadow-md transition-all">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">2. Eligibility & Authority</h2>
                </div>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p>To use Cloudedata Services, you confirm that:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>You are at least 18 years of age</li>
                    <li>You are legally capable of entering into binding agreements</li>
                    <li>You are not prohibited under applicable laws of India or other jurisdictions</li>
                  </ul>
                  <p>
                    If you accept this Agreement on behalf of a business or legal entity, you confirm that you have full authority to bind that entity to these terms. You remain responsible for all activities conducted through your account.
                  </p>
                </div>
              </section>

              {/* Section 3 */}
              <section className="group hover:bg-slate-50/50 transition-colors duration-200 rounded-xl p-4 -m-4">
                <div className="flex items-center gap-3 mb-5 pb-2 border-b border-slate-200">
                  <div className="p-1.5 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg shadow-sm group-hover:shadow-md transition-all">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">3. Sanctions & Compliance</h2>
                </div>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p>
                    You represent and warrant that you are not located in, resident of, or operating from a sanctioned country, nor affiliated with any sanctioned individual or entity. You will not use Cloudedata Services for or on behalf of any sanctioned party.
                  </p>
                  <p>
                    Cloudedata reserves the right to conduct sanctions screening, request verification information, and suspend or terminate Services immediately if sanctions violations are detected. You agree to indemnify Cloudedata against any losses arising from non-compliance.
                  </p>
                </div>
              </section>

              {/* Section 4 */}
              <section className="group hover:bg-slate-50/50 transition-colors duration-200 rounded-xl p-4 -m-4">
                <div className="flex items-center gap-3 mb-5 pb-2 border-b border-slate-200">
                  <div className="p-1.5 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg shadow-sm group-hover:shadow-md transition-all">
                    <Lock className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">4. Account Registration & Security</h2>
                </div>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p>
                    To access certain Services, you must create a Cloudedata account. You agree to provide accurate and complete account information, keep login credentials secure, and update information promptly.
                  </p>
                  <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-xl p-5 border border-blue-200 shadow-inner">
                    <p className="text-sm font-medium text-blue-800 flex items-center gap-2">
                      <Lock size={16} />
                      Security recommendation: Change your password at least once every six (6) months.
                    </p>
                  </div>
                  <p>
                    Cloudedata is not responsible for losses resulting from unauthorised access caused by your failure to secure your credentials.
                  </p>
                </div>
              </section>

              {/* Section 5 */}
              <section className="group hover:bg-slate-50/50 transition-colors duration-200 rounded-xl p-4 -m-4">
                <div className="flex items-center gap-3 mb-5 pb-2 border-b border-slate-200">
                  <div className="p-1.5 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg shadow-sm group-hover:shadow-md transition-all">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">5. Account Access & Sharing</h2>
                </div>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p>
                    Cloudedata allows controlled account access to trusted third parties. By granting access, you acknowledge that access is provided at your own risk, authorised users may view limited personal and billing information, and certain critical actions remain restricted.
                  </p>
                  <p>
                    You assume full legal and financial responsibility for actions taken by authorised users. Cloudedata is not responsible for disputes between account holders and authorised third parties.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section className="group hover:bg-slate-50/50 transition-colors duration-200 rounded-xl p-4 -m-4">
                <div className="flex items-center gap-3 mb-5 pb-2 border-b border-slate-200">
                  <div className="p-1.5 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg shadow-sm group-hover:shadow-md transition-all">
                    <Globe className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">6. International Data Transfers</h2>
                </div>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p>
                    If you access Cloudedata Services from outside the country where our servers are located, your data may be transferred across international borders. By using our Services, you consent to such transfers in compliance with applicable data protection laws.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section className="group hover:bg-slate-50/50 transition-colors duration-200 rounded-xl p-4 -m-4">
                <div className="flex items-center gap-3 mb-5 pb-2 border-b border-slate-200">
                  <div className="p-1.5 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg shadow-sm group-hover:shadow-md transition-all">
                    <Server className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">7. Service Availability</h2>
                </div>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p>
                    Cloudedata aims to provide services 24/7, using commercially reasonable efforts. However, you acknowledge that services may occasionally be unavailable due to scheduled maintenance, system upgrades, network failures, cybersecurity incidents, or events beyond our reasonable control.
                  </p>
                  <p>
                    Cloudedata does not guarantee uninterrupted availability and shall not be liable for downtime beyond its reasonable control.
                  </p>
                </div>
              </section>

              {/* Section 8 */}
              <section className="group hover:bg-slate-50/50 transition-colors duration-200 rounded-xl p-4 -m-4">
                <div className="flex items-center gap-3 mb-5 pb-2 border-b border-slate-200">
                  <div className="p-1.5 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg shadow-sm group-hover:shadow-md transition-all">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">8. Pre-Release & Beta Services</h2>
                </div>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p>
                    From time to time, Cloudedata may offer beta services or limited preview features. These services are provided “as-is” and may be modified or discontinued at any time.
                  </p>
                </div>
              </section>

              {/* Contact Section – Premium gradient card */}
              <section className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 md:p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white rounded-xl shadow-md">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Contact Information</h2>
                </div>
                <p className="text-slate-700 leading-relaxed mb-4">
                  For questions regarding these Terms of Service, please contact:
                </p>
                <div className="space-y-3">
                  <a href="mailto:support@cloudedata.com" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium group">
                    <Mail size={16} className="group-hover:scale-110 transition-transform" />
                    support@cloudedata.com
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a href="https://www.cloudedata.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium group">
                    <Globe size={16} className="group-hover:scale-110 transition-transform" />
                    www.cloudedata.com
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Footer note – elegant */}
        <div className="mt-16 text-center text-sm text-slate-500 border-t border-slate-200 pt-8">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className="mt-2">© {new Date().getFullYear()} Cloudedata. All rights reserved.</p>
          
        </div>
      </div>

      <Footer />
    </div>
  );
}