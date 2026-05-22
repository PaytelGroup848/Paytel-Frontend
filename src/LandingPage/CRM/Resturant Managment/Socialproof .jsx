import { useState } from "react";
import {
  Building2,
  ShoppingCart,
  Clock,
  Star,
  Quote,
  ChevronRight,
} from "lucide-react";

const stats = [
  { icon: Building2, num: "500", suffix: "+", label: "Restaurants" },
  { icon: ShoppingCart, num: "2", suffix: "M+", label: "Orders Managed" },
  { icon: Clock, num: "98", suffix: "%", label: "Uptime" },
  { icon: Star, num: "4.9", suffix: "★", label: "Avg. Rating" },
];

const testimonials = [
  {
    initials: "RK",
    name: "Rahul Kapoor",
    role: "Owner, Spice Route — Delhi",
    quote:
      "Since switching to this platform, our table turnaround time dropped by 30%. The kitchen display alone saved us from endless miscommunication.",
  },
  {
    initials: "PS",
    name: "Priya Sharma",
    role: "Director, Dosa House Chain — Bangalore",
    quote:
      "Managing three branches used to be chaos. Now I see all orders, revenue, and staff from one screen. Absolute game changer for multi-outlet ops.",
  },
  {
    initials: "AM",
    name: "Arjun Mehta",
    role: "F&B Manager, The Grand Café — Mumbai",
    quote:
      "The billing & UPI integration is flawless. Guests check out in seconds and our accounts team loves the automatic daily reports.",
  },
];

function StatCard({ icon: Icon, num, suffix, label }) {
  return (
    <div className="text-center p-6 border-r border-red-200/50 last:border-r-0">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-3xl md:text-4xl font-bold text-gray-900">
        {num}
        <span className="text-red-600">{suffix}</span>
      </div>
      <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mt-1">
        {label}
      </div>
    </div>
  );
}

function TestimonialCard({ initials, name, role, quote }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-red-500 text-red-500" />
        ))}
      </div>

      {/* Quote */}
      <div className="relative flex-1">
        <Quote className="absolute -top-1 -left-1 w-6 h-6 text-red-200 opacity-50" />
        <p className="text-gray-600 text-sm leading-relaxed pl-5 pt-1">
          {quote}
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-semibold text-sm shadow-md">
          {initials}
        </div>
        <div>
          <div className="font-semibold text-gray-900 text-sm">{name}</div>
          <div className="text-xs text-gray-400">{role}</div>
        </div>
      </div>

      {/* Hover arrow indicator */}
      <div
        className={`absolute bottom-4 right-4 transition-all duration-300 ${
          hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-1"
        }`}
      >
        <ChevronRight className="w-4 h-4 text-red-500" />
      </div>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="bg-white">
      {/* Stats Strip – dark but with red accents (optional) */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 px-6 lg:px-8 bg-gradient-to-b from-white to-red-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <Star size={14} className="fill-red-500" />
              <span>What Owners Say</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Loved by{" "}
              <span className="text-red-600 italic">Restaurant Teams</span>
            </h2>
            <p className="mt-3 text-gray-500 text-lg">
              Trusted by 500+ restaurants across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={idx} {...testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}