import { 
  Shield, Globe, Users, Server, Lock, Mail, ExternalLink, 
  Scale, BookOpen, Zap, Cpu, Database, Clock, CreditCard, 
  AlertCircle, FileText 
} from 'lucide-react';
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />
      
      {/* Hero Section – clean and minimal */}
      <div className="relative overflow-hidden bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-20 sm:py-24 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-600 rounded-xl shadow-md">
              <Scale className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">Legal Agreement</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Terms of Service
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl leading-relaxed">
            Please read this agreement carefully, as it contains important information regarding your legal rights and remedies.
          </p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-500 border-t border-slate-100 pt-6">
            <div className="flex items-center gap-2">
              <Mail size={15} className="text-blue-500" />
              <span>info@cloudedata.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={15} className="text-blue-500" />
              <span>www.cloudedata.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={15} className="text-blue-500" />
              <span>Effective: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Document Body – single column, document feel */}
      <div className="max-w-4xl mx-auto px-6 py-16 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />
          <div className="p-8 md:p-12 space-y-8">
            
            {/* Section 1 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-700" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">1. Overview</h2>
              </div>
              <p className="text-slate-700 leading-relaxed">
                “We”, “Us”, “Our” refer to Cloude Data. “You”, “User”, “Customer” refer to any individual or legal entity using our services. “Services” refer to all products and solutions offered by Cloude Data. This Agreement does not create any third-party rights.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <BookOpen className="h-5 w-5 text-blue-700" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">2. Definitions</h2>
              </div>
              <p className="text-slate-700 leading-relaxed">
                “We”, “Us”, “Our” = Cloude Data; “You”, “User”, “Customer” = individual or entity using services; “Services” = all products and solutions. This Agreement does not create any third-party rights.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <Zap className="h-5 w-5 text-blue-700" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">3. Modifications to Terms</h2>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Cloude Data reserves the right to modify these Terms at any time. Updated terms become effective immediately once posted on the website. Continued use of the website or services after updates indicates acceptance of the revised terms.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-700" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">4. Eligibility & Authority</h2>
              </div>
              <p className="text-slate-700 leading-relaxed">
                By using our services, you confirm that: (1) you are at least 18 years of age; (2) you are legally capable of entering binding contracts; (3) you are not restricted under Indian or international law; and (4) if acting on behalf of an organization, you have the legal authority to bind that organization to these Terms.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-700" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">5. Sanctions Compliance</h2>
              </div>
              <p className="text-slate-700 leading-relaxed">
                You represent that you are not subject to sanctions imposed by India, the United States, the European Union, the United Nations, or other governing authorities. Cloude Data reserves the right to suspend or terminate services immediately if sanctions violations are suspected.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <Lock className="h-5 w-5 text-blue-700" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">6. Account Registration & Security</h2>
              </div>
              <p className="text-slate-700 leading-relaxed">
                To access certain services, you must create an account. You agree to provide accurate and complete information, maintain confidentiality of login credentials, and notify us immediately of unauthorized access. You are solely responsible for all activities that occur under your account.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <Globe className="h-5 w-5 text-blue-700" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">7. International Data Transfer</h2>
              </div>
              <p className="text-slate-700 leading-relaxed">
                By accessing our website or services, you consent to the transfer, storage, and processing of data across international borders, including servers located outside your country.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-700" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">8. Account Sharing & Access Permissions</h2>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Users may grant limited access to trusted individuals. However, the account holder remains fully responsible for all actions taken through the account, and Cloude Data is not responsible for disputes between account holders and authorized users.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <Server className="h-5 w-5 text-blue-700" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">9. Service Availability</h2>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Cloude Data aims to provide services 24/7. However, service availability may be affected by scheduled maintenance, technical failures, or events beyond our control. We do not guarantee uninterrupted service and are not liable for downtime.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-blue-700" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">10. Acceptable Use Policy</h2>
              </div>
              <p className="text-slate-700 leading-relaxed">
                You agree not to use Cloude Data services for: illegal activities, child exploitation, terrorism, spam, malware distribution, cryptocurrency mining without permission, intellectual property violations, false claims, or activities threatening national security. Violations may result in immediate suspension or termination.
              </p>
            </section>

            {/* Sections 11–20 compact but readable */}
            <div className="space-y-8">
              {[
                { icon: Scale, title: "11. Intellectual Property Rights", content: "All content, software, trademarks, designs, and materials on the website are owned or licensed by Cloude Data and protected under intellectual property laws. You may not copy, reproduce, modify, or distribute any materials without written permission." },
                { icon: Database, title: "12. User Content", content: "You retain ownership of the content you host using our services. However, by uploading content, you grant Cloude Data a limited license to host and process the content solely for service delivery. You are responsible for ensuring that your content does not violate third-party rights." },
                { icon: Shield, title: "13. Monitoring & Termination", content: "Cloude Data reserves the right to monitor hosted content, remove prohibited materials, and suspend or terminate accounts without prior notice. Repeated violations may result in permanent service termination." },
                { icon: Mail, title: "14. No Spam Policy", content: "Sending spam, bulk messages, or unsolicited communications using Cloude Data services is strictly prohibited. Violations will result in immediate service suspension or termination." },
                { icon: Globe, title: "15. Third-Party Links", content: "Our website may contain links to third-party websites. Cloude Data is not responsible for their content, policies, or practices. Use third-party websites at your own risk." },
                { icon: Cpu, title: "16. AI & Automated Tools", content: "Cloude Data may provide AI‑based tools and automation features. Users are responsible for reviewing AI‑generated outputs before using them. Sensitive or confidential data should not be uploaded to AI tools." },
                { icon: AlertCircle, title: "17. Disclaimer of Warranties", content: "All services are provided 'as is' and 'as available' without warranties of any kind. Cloude Data does not guarantee uninterrupted service or accuracy of information." },
                { icon: Scale, title: "18. Limitation of Liability", content: "To the maximum extent permitted by law, Cloude Data will not be liable for loss of data, business interruption, loss of profits, or indirect damages. Total liability shall not exceed the amount paid by the user in the previous 12 months or ₹100,000, whichever is lower." },
                { icon: Shield, title: "19. Indemnification", content: "You agree to indemnify and hold Cloude Data harmless against claims arising from your use of services, violation of this Agreement, or infringement of third-party rights." },
                { icon: Zap, title: "20. Discontinued Services", content: "Cloude Data may discontinue services at any time. Where possible, customers will receive advance notice and may be provided with migration or refund options depending on the situation." },
              ].map((item, idx) => (
                <section key={idx}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                      <item.icon className="h-5 w-5 text-blue-700" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">{item.title}</h2>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{item.content}</p>
                </section>
              ))}
            </div>

            {/* Sections 21–23 */}
            <section>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <CreditCard className="h-5 w-5 text-blue-700" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">21. Fees, Payments & Renewals</h2>
              </div>
              <p className="text-slate-700 leading-relaxed">
                All prices exclude applicable taxes. Services may automatically renew unless disabled. Refunds are governed by the Refund Policy. Non‑payment may result in suspension or termination.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <Scale className="h-5 w-5 text-blue-700" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">22. Governing Law & Jurisdiction</h2>
              </div>
              <p className="text-slate-700 leading-relaxed">
                These Terms are governed by the laws of India. All disputes shall be subject to the exclusive jurisdiction of the courts in New Delhi.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-700" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">23. Contact Information</h2>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Email: info@cloudedata.com<br />
                Address: Okhla Industrial Estate, Phase 3, New Delhi – 110020, India
              </p>
            </section>

            {/* Section 24 – Service-Specific Terms */}
            <div className="mt-8 pt-4 border-t border-slate-200">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-1.5 bg-indigo-100 rounded-lg">
                    <Database className="h-5 w-5 text-indigo-700" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">24. Service-Specific Terms – Cloudedata Accounting ERP on Cloud</h2>
                </div>
                <div className="space-y-3 text-slate-700 text-sm">
                  <p><strong>24.1 Scope of Services:</strong> Secure cloud‑hosted access to Accounting ERP solutions including storage and management of client accounting data on dedicated cloud servers.</p>
                  <p><strong>24.2 Data Responsibility & Security:</strong> Cloude Data maintains uptime and data protection. In case of cyber‑attack, the most recent verified backup will be restored. Liability is limited to restoration up to the latest available backup.</p>
                  <p><strong>24.3 Client Conduct & Liability:</strong> Clients must use services responsibly and lawfully. Abusive, unlawful, or inappropriate conduct may result in service suspension or termination.</p>
                  <p><strong>24.4 Data Access & Client Control:</strong> Cloude Data does not access, modify, or control client data stored in the assigned cloud environment. Clients retain full responsibility for managing, copying, editing, and deleting their data.</p>
                  <p><strong>24.5 Malicious File Policy:</strong> Uploading malicious or harmful files is strictly prohibited. If such actions cause damage or service interruption, the client will be fully liable for losses and associated recovery costs.</p>
                  <p><strong>24.6 Backup Policy:</strong> Client data is backed up regularly (typically daily). In case of data loss, restoration will occur within 6–24 hours from the latest available backup.</p>
                  <p><strong>24.7 Server Maintenance & Downtime:</strong> Emergency maintenance may occur when required for system stability. Where possible, at least 1 hour prior notice will be provided.</p>
                  <p><strong>24.8 Support Availability:</strong> Support is available Monday–Saturday, 10:00 AM – 7:30 PM IST. All support requests must be submitted through the official support portal or support email.</p>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <p><strong>24.9 No Refund Policy:</strong> All payments made to Cloudedata are non‑refundable, including cases of cancellation, dissatisfaction, or downtime caused by third‑party or client‑side issues.</p>
                  </div>
                  <p><strong>24.10 Fees & Payment:</strong> Clients must pay the service fees as specified in their billing invoice, plan, and subscription period.</p>
                  <p><strong>24.11 Term, Renewal & Termination:</strong> Services automatically renew unless either party provides 30 days written notice. Upon termination, clients will have 2–3 days to export their data.</p>
                  <p><strong>24.12 Governing Law & Jurisdiction:</strong> These service‑specific terms are governed by the laws of India, and disputes fall under the courts of New Delhi.</p>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Questions?</h2>
              </div>
              <p className="text-slate-600 mb-4">If you have any questions regarding these Terms of Service, please contact us.</p>
              <div className="space-y-2">
                <a href="mailto:info@cloudedata.com" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition">
                  <Mail size={16} />
                  info@cloudedata.com
                </a>
                <a href="https://www.cloudedata.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition">
                  <Globe size={16} />
                  www.cloudedata.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center text-sm text-slate-400 border-t border-slate-200 pt-6">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className="mt-1">© {new Date().getFullYear()} Cloudedata. All rights reserved.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}