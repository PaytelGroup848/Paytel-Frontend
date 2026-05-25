import { motion } from "framer-motion";
import {
  CheckCircle2,
  Server,
  Globe,
  Shield,
  Clock,
  HardDrive,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const pricingPlans = [
  {
    name: "Basic",
    description: "cPanel Hosting",
    price: 80,
    period: "Monthly",
    features: [
      "1 cPanel accounts",
      "Initial Setup",
      "50GB Storage (10GB each cPanel)",
      "Unlimited Bandwidth",
      "1 cPanel for 1 Website",
      "Free SSL Certificate",
      "2 Free Sub Domains per cPanel",
      "Daily Backups",
      "24/7 Support",
    ],
    popular: false,
    gradient: "from-blue-500 to-cyan-500",
    buttonStyle: "bg-gradient-to-r from-blue-600 to-cyan-600 text-white",
  },
  {
    name: "Economy",
    description: "cPanel Hosting",
    price: 300,
    period: "Monthly",
    features: [
      "Maximum 5 cPanel accounts",
      "15 minutes (Setup time)",
      "1TB Storage (100GB each cPanel)",
      "Unlimited Bandwidth",
      "1 cPanel for 1 Website",
      "Free SSL Certificate",
      "2 Free Sub Domains per cPanel",
      "Daily Backups",
      "24/7 Support",
    ],
    popular: true,
    gradient: "from-indigo-500 to-purple-600",
    buttonStyle: "bg-white text-purple-700 border border-purple-200 hover:bg-purple-50",
  },
  {
    name: "Business",
    description: "cPanel Hosting",
    price: 300, // Keep as per provided data
    period: "Monthly",
    features: [
      "Maximum 10 cPanel accounts",
      "15 minutes (Setup time)",
      "3TB Storage (50GB each cPanel)",
      "Unlimited Bandwidth",
      "1 cPanel for 1 Website",
      "Free SSL Certificate",
      "2 Free Sub Domains per cPanel",
      "Daily Backups",
      "24/7 Support",
    ],
    popular: false,
    gradient: "from-slate-700 to-slate-900",
    buttonStyle: "bg-gradient-to-r from-slate-700 to-slate-900 text-white",
  },
];

export default function PricingCards() {
  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Choose Your cPanel Plan
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            From startups to agencies, we have a hosting plan that fits your needs.
            All plans include free SSL, daily backups, and 24/7 support.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 items-start">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative flex flex-col rounded-2xl border ${
                plan.popular
                  ? "border-purple-200 shadow-xl shadow-purple-100/50 bg-white"
                  : "border-slate-200 shadow-lg shadow-slate-200/50 bg-white"
              } p-6 sm:p-8 transition-shadow hover:shadow-2xl`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-purple-200">
                     Most Popular Plan
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-800">{plan.name}</h3>
                <p className="text-sm text-slate-500">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold text-slate-900">₹{plan.price}</span>
                  <span className="text-lg text-slate-500">/{plan.period}</span>
                </div>
              </div>

              {/* Features list */}
              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 size={16} className="shrink-0 text-green-500 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Buy Now Button */}
              <button
                className={`mt-auto flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-extrabold shadow-md transition-all hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-offset-2 ${
                  plan.popular
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-purple-200 focus:ring-purple-300"
                    : plan.buttonStyle
                }`}
              >
                Buy Now <ArrowRight size={17} />
              </button>

              {/* Small trust badge */}
              <div className="mt-4 flex justify-center">
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Shield size={13} className="text-blue-500" />
                  <span>30‑Day Money‑Back Guarantee</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom assurance line */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <Server size={16} className="text-blue-600" />
            Instant Activation
          </div>
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-blue-600" />
            Global CDN
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-blue-600" />
            24/7 Support
          </div>
          <div className="flex items-center gap-2">
            <HardDrive size={16} className="text-blue-600" />
            NVMe Storage
          </div>
        </div>
      </div>
    </section>
  );
}