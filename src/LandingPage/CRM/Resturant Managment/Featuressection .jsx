import { useState } from "react";
import {
  Zap,
  ChefHat,
  Package,
  Monitor,
  Server,
  LayoutDashboard,
  TrendingUp,
  Coffee,
  Cake,
  Beer,
  ShoppingBag,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

// ------------------------------------------------------------
// Value Proposition Grid Matrix (4 core modules)
// ------------------------------------------------------------
const coreModules = [
  {
    icon: Zap,
    title: "Lightning-Fast Restaurant Billing Software",
    desc: "Speed up table turnovers with a state-of-the-art software for restaurant billing. Generate encrypted customer receipts within seconds, handle multi-mode payments split-ups, and enjoy uninterrupted operations even during internet dropouts with automated sync features.",
    tag: "Billing",
    color: "red",
  },
  {
    icon: ChefHat,
    title: "Kitchen Order Ticket (KOT) Automation",
    desc: "What is KOT in restaurant ecosystems? It is the backbone of food preparation. Our integrated digital kitchen order ticket system instantly routes custom table orders right from our mobile ordering apps to your processing workspace monitors without human error delay.",
    tag: "Kitchen",
    color: "orange",
  },
  {
    icon: Package,
    title: "Intelligent Restaurant Inventory Management",
    desc: "Stop profit leakage instantly. Our advanced modules monitor real-time raw ingredient consumption patterns, set up dynamic recipe costs, and throw automated low-stock warnings before kitchen processing lines come to a complete halt.",
    tag: "Inventory",
    color: "red",
  },
  {
    icon: Monitor,
    title: "Smart Kitchen Display System (KDS)",
    desc: "Replace messy paper slips forever. Sync front counter orders to our interactive kitchen display system, giving your chefs direct, color-coded visibility into live preparation timers, custom cooking changes, and delivery queues.",
    tag: "Display",
    color: "orange",
  },
];

// ------------------------------------------------------------
// Specialized Niche Solutions (4 boxes)
// ------------------------------------------------------------
const nicheSolutions = [
  {
    icon: Coffee,
    title: "Cafes & Express Bistro Outlets",
    desc: "Run a rapid checkout line using our custom-tuned cafe POS system and specialized cafe billing software built specifically to keep busy rush hours moving flawlessly.",
    color: "red",
  },
  {
    icon: Cake,
    title: "Bakeries & Confectioneries",
    desc: "Incorporate custom weighing scale machines, verify multi-unit measurements, tracking manufacturing date stamps, and control ingredients using premium bakery software and intuitive bakery billing software.",
    color: "orange",
  },
  {
    icon: Beer,
    title: "High-Volume Resto-Bars & Pubs",
    desc: "Implement highly accurate liquor tracking tools, manage table sitting spaces, handle corporate happy-hour pricing changes, and split guest tabs effortlessly with integrated bar software.",
    color: "red",
  },
  {
    icon: ShoppingBag,
    title: "Takeaways, Drive-Thrus & Tea Stalls",
    desc: "Optimize quick counter order flows with our ultra-lightweight tea POS and scalable EPOS software for takeaway setups.",
    color: "orange",
  },
];

// ------------------------------------------------------------
// Reusable Feature Card (matches original styling)
// ------------------------------------------------------------
function FeatureCard({ icon: Icon, title, desc, tag, color }) {
  const [hovered, setHovered] = useState(false);

  const colorClasses = {
    red: {
      bg: "bg-red-50",
      text: "text-red-600",
      border: "border-red-200",
      tagBg: "bg-red-100",
      tagText: "text-red-700",
      hoverBorder: "group-hover:border-red-300",
    },
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      border: "border-orange-200",
      tagBg: "bg-orange-100",
      tagText: "text-orange-700",
      hoverBorder: "group-hover:border-orange-300",
    },
  };

  const c = colorClasses[color];

  return (
    <div
      className={`group relative bg-white rounded-2xl border ${c.border} ${c.hoverBorder} shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-default`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="p-6">
        <div
          className={`w-12 h-12 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-105`}
        >
          <Icon className={`w-6 h-6 ${c.text}`} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">{desc}</p>
        <span
          className={`inline-block text-[10px] font-semibold uppercase tracking-wider ${c.tagBg} ${c.tagText} px-2.5 py-1 rounded-full`}
        >
          {tag}
        </span>
      </div>
      <div
        className={`absolute bottom-4 right-4 transition-all duration-300 ${
          hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-1"
        }`}
      >
        <ArrowRight className={`w-4 h-4 ${c.text}`} />
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// Niche Solution Card (simpler, without tag)
// ------------------------------------------------------------
function NicheCard({ icon: Icon, title, desc, color }) {
  const [hovered, setHovered] = useState(false);
  const colorClasses = {
    red: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
    orange: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200" },
  };
  const c = colorClasses[color];

  return (
    <div
      className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 p-5 cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center shrink-0`}>
          <Icon className={`w-5 h-5 ${c.text}`} />
        </div>
        <div>
          <h4 className="font-bold text-gray-800 mb-1">{title}</h4>
          <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// Main Component
// ------------------------------------------------------------
export default function FeaturesSection() {
  return (
    <section className="bg-gradient-to-b from-white to-red-50/30 py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <span>All-in-One Restaurant ERP</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
            Everything you need to{" "}
            <span className="text-red-600 italic">run a smarter restaurant</span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
            From front-of-house to back‑office – one unified platform.
          </p>
        </div>

        {/* Value Proposition Grid Matrix (4 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {coreModules.map((module, idx) => (
            <FeatureCard key={idx} {...module} />
          ))}
        </div>

        {/* Unified Cloud Modules & Specifications */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Next-Gen <span className="text-red-600">POS Billing Software</span> for Restaurant Chains
            </h3>
            <p className="mt-4 text-gray-600 text-lg">
              Cloudedata provides an all-inclusive, feature-rich POS billing software for restaurant owners who want extreme control over corporate operations. From handling floor layout tables, tracking separate captain apps, to distributing digitized WhatsApp receipts, this setup stands tall as the premier restaurant billing software India has ever experienced for uncompromised stability.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
            <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-red-600" />
              Centralized Restaurant Management Software Features
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-gray-700"><strong>Multi-Outlet Uniformity:</strong> Push menu additions, dynamic seasonal pricing revisions, and centralized taxation variations across 100+ locations via one unified cloud terminal interface.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-gray-700"><strong>Omnichannel Order Injection:</strong> Integrate Swiggy, Zomato, and custom online ordering portals straight into your central dashboard, bypassing tedious hardware tablets entirely.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specialized Niche Solutions Section (4 boxes) */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Built for <span className="text-red-600">every kind of F&B business</span>
            </h3>
            <p className="text-gray-500 mt-2">One platform, infinitely adaptable.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {nicheSolutions.map((solution, idx) => (
              <NicheCard key={idx} {...solution} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg shadow-red-200 transition-all duration-200">
            Explore All Features
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}