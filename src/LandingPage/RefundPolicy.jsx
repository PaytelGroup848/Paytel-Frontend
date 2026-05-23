import { Shield, Globe, Users, Server, Lock, Mail, ExternalLink, FileText, CreditCard, AlertCircle, RefreshCw, Zap } from 'lucide-react';
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white shadow-2xl border-b border-slate-200/80">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto px-6 py-20 sm:py-24 lg:px-8 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <RefreshCw className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">Financial Policy</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Refund Policy
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

      {/* Document Body */}
      <div className="max-w-6xl mx-auto px-6 py-16 lg:px-8">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-transparent rounded-3xl blur-xl -z-10" />
          
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)]">
            <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600" />
            
            <div className="p-8 md:p-12 lg:p-16 space-y-10">
              {/* Introduction */}
              <section className="group hover:bg-slate-50/50 transition-colors duration-200 rounded-xl p-4 -m-4">
                <div className="flex items-center gap-3 mb-5 pb-2 border-b border-slate-200">
                  <div className="p-1.5 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg shadow-sm">
                    <AlertCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Refund Policy</h2>
                </div>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p>
                    Products purchased from Cloude Data may be refunded only if canceled within <strong className="text-blue-600">30 days</strong> of the date of the transaction.
                  </p>
                  <div className="bg-amber-50/80 rounded-xl p-5 border-l-4 border-amber-500">
                    <p className="text-sm">
                      <strong>Note:</strong> Due to their nature, cryptocurrencies, tokens and digital assets are generally irreversible and their exchange rates are highly volatile. We cannot be responsible for any risk including but not limited to exchange rate risk and market risk. Products purchased using cryptocurrencies, tokens or digital assets will not be refunded.
                    </p>
                  </div>
                  <p>
                    If a client’s actions are found to violate applicable laws or Cloude Data’s Terms of Services, any payments made to Cloude Data will not be refunded.
                  </p>
                  <p>
                    “Date of the transaction” means the date of purchase of any product or service, including the date any renewal is processed. You may cancel a product at any time, but a refund will only be issued if cancellation is requested within the refund timeframe specified for the applicable product, if available at all.
                  </p>
                </div>
              </section>

              {/* Products Available for Refund */}
              <section className="group hover:bg-slate-50/50 transition-colors duration-200 rounded-xl p-4 -m-4">
                <div className="flex items-center gap-3 mb-5 pb-2 border-b border-slate-200">
                  <div className="p-1.5 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg shadow-sm">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Products Available for Refund (Standard Terms)</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Hosting (all plans, except first payment after Free Trial)",
                    "Daily Backups",
                    "Cloude Data Email",
                    "Titan Email",
                    "Priority Support",
                    "NordVPN 6 and 12-month plans",
                    "VPN 6 and 12-month plans",
                    "KVM VPS (except upgrades)",
                    "Kubernetes",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Products NOT Available for Refund */}
              <section className="group hover:bg-slate-50/50 transition-colors duration-200 rounded-xl p-4 -m-4">
                <div className="flex items-center gap-3 mb-5 pb-2 border-b border-slate-200">
                  <div className="p-1.5 bg-gradient-to-br from-red-100 to-rose-100 rounded-lg shadow-sm">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Products NOT Eligible for Refunds</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {[
                    "Redemption Fees",
                    "VPS License",
                    "Upgrades for Minecraft (Game Panel) VPS",
                    "Upgrades for KVM VPS",
                    "Kubernetes",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-red-50/50 rounded-xl p-4 border border-red-200">
                  <p className="text-sm text-red-800">
                    Any products or services that were suspended, canceled, or terminated due to abusive usage or violation of Terms are not eligible for a refund. Cloude Data reserves the right to unilaterally decline refund requests if signs of refund abuse occur (e.g., repetitive refunds, bulk purchases and refunds).
                  </p>
                </div>
              </section>

              {/* Payment Methods & Refunds */}
              <section className="group hover:bg-slate-50/50 transition-colors duration-200 rounded-xl p-4 -m-4">
                <div className="flex items-center gap-3 mb-5 pb-2 border-b border-slate-200">
                  <div className="p-1.5 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg shadow-sm">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Payment Methods & Refund Rules</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Refunds to Balance</h3>
                    <p>We provide refunds to the original funding source. Once a refund is initiated for an invoice, it becomes irrevocable and cannot be refunded to a different source.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Refunds from Balance</h3>
                    <p>Over-funded balance can be refunded within 30 days of the payment that resulted in over-funding. In special cases, other payments can be refunded instead of the original payment if the 30-day timeframe applies.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Accounting ERP on Cloud</h3>
                    <div className="bg-red-50/80 rounded-xl p-4 border border-red-200">
                      <p className="font-medium text-red-800">All purchases of our Accounting ERP on Cloud services are non-refundable and non-cancellable. Once payment is made, no refunds will be issued. Subscriptions cannot be canceled or terminated before the end of the billing period.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Chargebacks */}
              <section className="group hover:bg-slate-50/50 transition-colors duration-200 rounded-xl p-4 -m-4">
                <div className="flex items-center gap-3 mb-5 pb-2 border-b border-slate-200">
                  <div className="p-1.5 bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg shadow-sm">
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Chargebacks</h2>
                </div>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p>
                    If we record a decline, chargeback, reversal, payment dispute, risk of payment fraud or other rejection of any payable fees on your account (“Chargeback”), this will be considered a breach of your payment obligations. You agree that Cloude Data may pursue all available lawful remedies, including immediate termination of your account and services.
                  </p>
                  <p>
                    In the event of a Chargeback, your account may be blocked without option to re-purchase, and any data may be subject to cancellation and loss. Your ability to checkout using credit card will not resume until you verify the payment method and pay all applicable fees, including fees incurred by Cloude Data for each Chargeback.
                  </p>
                  <div className="bg-red-50/80 rounded-xl p-4 border border-red-200">
                    <p className="font-medium text-red-800">Criminal fraud or obvious payment fraud (compromised credit card details) will result in permanent service termination without any option to recover.</p>
                  </div>
                  <p>
                    We encourage you to first contact our Customer Support team before filing a Chargeback to prevent service cancellation and avoid unwarranted Chargeback fees. We reserve the right to dispute any Chargeback by providing relevant documentation proving the transaction was authorized.
                  </p>
                </div>
              </section>

              {/* Contact Section */}
              <section className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 md:p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white rounded-xl shadow-md">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Questions?</h2>
                </div>
                <p className="text-slate-700 leading-relaxed mb-4">
                  If you have any questions regarding our Refund Policy, please contact our support team before making a purchase or filing a dispute.
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

        {/* Footer note */}
        <div className="mt-16 text-center text-sm text-slate-500 border-t border-slate-200 pt-8">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className="mt-2">© {new Date().getFullYear()} Cloudedata. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-4 text-xs text-slate-400">
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}