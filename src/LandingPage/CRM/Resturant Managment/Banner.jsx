import { useState } from "react";
import { Utensils, Clock, CheckCircle, ArrowRight, Sparkles } from "lucide-react";

export default function Banner() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-red-50 via-white to-red-50 rounded-2xl shadow-xl">
      {/* Red accent background shapes */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-red-600/10 rounded-full blur-3xl -z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-20 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span>Restaurant ERP Platform</span>
            </div>

            {/* H1 updated as per instructions */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
              Robust Restaurant Management System & <span className="text-red-600">Advanced Restaurant ERP Software</span>
            </h1>

            {/* Sub‑headline (full SEO‑optimised paragraph) */}
            <p className="mt-4 text-lg text-gray-600 max-w-xl">
              Welcome to India's best restaurant billing software. Go beyond a basic point-of-sale terminal—experience the absolute finest billing software for restaurant outlets, fine dines, and franchises designed to seamlessly regulate live kitchen order receipts, multi-brand catalog scaling, and end-to-end accounting on the cloud.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              {/* Primary CTA */}
              <button
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="group bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg shadow-red-200 transition-all duration-200 flex items-center gap-2"
              >
                Deploy Free Restaurant Billing System
                <ArrowRight
                  size={18}
                  className={`transition-transform duration-200 ${
                    hovered ? "translate-x-1" : ""
                  }`}
                />
              </button>

              {/* Secondary CTA */}
              <button className="text-gray-700 font-medium hover:text-red-600 transition-colors flex items-center gap-2 px-4 py-2 rounded-full hover:bg-red-50">
                <Clock size={18} />
                Schedule a Demo for Best Billing Software for Restaurant
              </button>
            </div>

            {/* Stats Section (kept as before – still relevant) */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-6 border-t border-gray-200">
              {[
                { value: "15k+", label: "Active Restaurants", icon: Utensils },
                { value: "99.9%", label: "Uptime SLA", icon: CheckCircle },
                { value: "500M+", label: "Orders Processed", icon: Clock },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-start">
                  <div className="flex items-center gap-1.5 text-red-600 mb-1">
                    <stat.icon size={18} />
                    <span className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content – Feature Cards (unchanged – still matches restaurant ERP) */}
          <div className="relative">
            <div className="relative bg-white/40 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 p-4">
              {/* Decorative ring */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-red-600/20 rounded-full blur-2xl" />

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-xl p-5 text-white shadow-lg">
                  <Utensils size={28} className="mb-3" />
                  <h3 className="font-bold text-lg">Table Management</h3>
                  <p className="text-sm text-red-100 mt-1">Real‑time floor view</p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-3">
                    <CheckCircle size={20} className="text-red-600" />
                  </div>
                  <h3 className="font-bold text-gray-800">Online Orders</h3>
                  <p className="text-xs text-gray-500 mt-1">Integrated with Zomato, Swiggy</p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-3">
                    <Clock size={20} className="text-red-600" />
                  </div>
                  <h3 className="font-bold text-gray-800">Analytics</h3>
                  <p className="text-xs text-gray-500 mt-1">Sales & inventory insights</p>
                </div>

                <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-5 text-white shadow-lg">
                  <h3 className="font-bold text-lg">QR Ordering</h3>
                  <p className="text-sm text-red-100 mt-1">Contactless & fast</p>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2 text-sm font-medium text-red-600 border border-red-100">
              Trusted by 15,000+ outlets
            </div>
          </div>
        </div>
      </div>

      {/* Bottom red wave / separator */}
      <div className="relative h-2 w-full bg-gradient-to-r from-red-500 to-red-700 mt-8" />
    </div>
  );
}