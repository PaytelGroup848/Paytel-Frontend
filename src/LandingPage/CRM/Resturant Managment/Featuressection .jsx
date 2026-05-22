import { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  ChefHat,
  Receipt,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Smart Dashboard",
    desc: "Real-time overview of orders, revenue, and staff — all at a glance.",
    tag: "Analytics",
    color: "red",
  },
  {
    icon: Calendar,
    title: "Table Reservations",
    desc: "Let guests book online, manage walk-ins, and auto-assign tables seamlessly.",
    tag: "Booking",
    color: "orange",
  },
  {
    icon: ClipboardList,
    title: "Order Management",
    desc: "Handle dine-in, takeaway, and delivery orders from a unified queue.",
    tag: "Operations",
    color: "red",
  },
  {
    icon: ChefHat,
    title: "Kitchen Display",
    desc: "Live KDS screen for chefs — tickets update in real-time as orders come in.",
    tag: "Kitchen",
    color: "orange",
  },
  {
    icon: Receipt,
    title: "Billing & Payments",
    desc: "Generate bills, split checks, and accept UPI, card, or cash effortlessly.",
    tag: "Finance",
    color: "red",
  },
  {
    icon: Users,
    title: "Staff Management",
    desc: "Track shifts, assign roles, and monitor performance across your team.",
    tag: "HR",
    color: "orange",
  },
];

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
        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-105`}
        >
          <Icon className={`w-6 h-6 ${c.text}`} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4">{desc}</p>

        {/* Tag */}
        <span
          className={`inline-block text-[10px] font-semibold uppercase tracking-wider ${c.tagBg} ${c.tagText} px-2.5 py-1 rounded-full`}
        >
          {tag}
        </span>
      </div>

      {/* Optional hover arrow effect (like Petpooja) */}
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

export default function FeaturesSection() {
  return (
    <section className="bg-gradient-to-b from-white to-red-50/30 py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <span>Everything You Need</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
            Powerful Features for{" "}
            <span className="text-red-600 italic">Modern Restaurants</span>
          </h2>

          <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
            From table booking to kitchen analytics — manage your entire restaurant
            from one sleek dashboard.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>

        {/* Bottom CTA (optional, like Petpooja) */}
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