import { useState } from "react";
import { motion } from "framer-motion";

const plans = [
  {
    vcpu: "2 Core",
    ram: "4 GB",
    storage: "40 GB",
    users: 3,
    halfYearly: 6000,
    yearly: 10800,
    popular: false,
  },
  {
    vcpu: "4 Core",
    ram: "8 GB",
    storage: "50 GB",
    users: 6,
    halfYearly: 10200,
    yearly: 17500,
    popular: false,
  },
  {
    vcpu: "6 Core",
    ram: "12 GB",
    storage: "60 GB",
    users: 9,
    halfYearly: 15700,
    yearly: 28000,
    popular: false,
  },
  {
    vcpu: "8 Core",
    ram: "16 GB",
    storage: "80 GB",
    users: 12,
    halfYearly: 20900,
    yearly: 35500,
    popular: true,
  },
  {
    vcpu: "10 Core",
    ram: "20 GB",
    storage: "90 GB",
    users: 15,
    halfYearly: 26000,
    yearly: 45000,
    popular: false,
  },
  {
    vcpu: "12 Core",
    ram: "24 GB",
    storage: "110 GB",
    users: 18,
    halfYearly: 31600,
    yearly: 54000,
    popular: false,
  },
  {
    vcpu: "16 Core",
    ram: "32 GB",
    storage: "150 GB",
    users: 25,
    halfYearly: 42000,
    yearly: 75000,
    popular: false,
  },
];

const allFeatures = [
  "256‑bit AES encryption",
  "Multi‑factor authentication",
  "Hourly automated backups",
  "99.99% uptime SLA",
  "24/7 phone & chat support",
  "Free data migration",
  "Real‑time collaboration",
  "Any device access (web & app)",
  "Automatic software updates",
];

export default function BusyPlans() {
  const [billingCycle, setBillingCycle] = useState("yearly");

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <section className="relative py-5 px-4 sm:px-8 bg-gradient-to-br from-[#f8faff] via-[#f0f4ff] to-[#f4f6fc] font-['Inter'] overflow-hidden">
        {/* Subtle background colours */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-indigo-300/10 rounded-full blur-3xl" />
          <div className="absolute -top-20 left-10 w-[30rem] h-[30rem] bg-purple-300/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-0 w-[28rem] h-[28rem] bg-cyan-300/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-[24rem] h-[24rem] bg-blue-300/10 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #4338ca 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-5 py-1.5 bg-white/80 backdrop-blur-sm border border-indigo-200/60 text-indigo-700 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase shadow-sm">
              Pricing Plans
            </span>
            <h2 className="mt-6 text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
              Move Your Business Ahead{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">
                with Confidence
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              Experience the smarter way of accounting with Busy on Cloud. Access
              your Busy software anywhere, anytime, and on any device or operating
              system, regardless of hardware or geographical constraints. Work
              flexibly, work together seamlessly, and grow your business to its
              full potential.
            </p>

            {/* Billing toggle */}
            <div className="mt-8 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-md border border-slate-200/80">
              <button
                onClick={() => setBillingCycle("halfYearly")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  billingCycle === "halfYearly"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Half Yearly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  billingCycle === "yearly"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Yearly (save ~10%)
              </button>
            </div>
          </motion.div>

          {/* Pricing Cards – gap reduced to 2 (0.5rem) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {plans.map((plan, index) => {
              const price =
                billingCycle === "yearly" ? plan.yearly : plan.halfYearly;
              const isPopular = plan.popular;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className={`relative rounded-2xl p-[1.5px] mb-4 bg-gradient-to-br from-indigo-400/80 via-purple-400/80 to-cyan-400/80 transition-shadow duration-300 ${
                    isPopular ? "scale-[1.03]" : ""
                  }`}
                  style={{
                    boxShadow: isPopular
                      ? "0 25px 45px -10px rgba(99,102,241,0.3)"
                      : "0 10px 25px -5px rgba(0,0,0,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = isPopular
                      ? "0 30px 55px -12px rgba(99,102,241,0.4)"
                      : "0 20px 35px -8px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = isPopular
                      ? "0 25px 45px -10px rgba(99,102,241,0.3)"
                      : "0 10px 25px -5px rgba(0,0,0,0.05)";
                  }}
                >
                  {/* Inner card – pure shiny white, padding‑bottom 0 */}
                  <div
                    className="relative h-full rounded-2xl flex flex-col overflow-hidden border border-gray-100"
                    style={{
                      background:
                        "linear-gradient(135deg, #ffffff 0%, #fcfcfc 50%, #ffffff 100%)",
                      boxShadow: "inset 0 1px 2px rgba(255,255,255,0.8)",
                    }}
                  >
                    {/* Padding top and sides kept, bottom removed */}
                    <div className="pt-2 mt-6 mb-6 px-6  pb-4 flex-1 flex flex-col">
                      {/* Popular badge */}
                      {isPopular && (
                        <div className="absolute top-0 right-0">
                          <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-bold rounded-bl-xl rounded-tr-xl shadow-md">
                            Most Popular
                          </span>
                        </div>
                      )}

                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-slate-800">
                          {plan.vcpu}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {plan.ram} RAM / {plan.storage} Storage
                        </p>
                      </div>

                      {/* Specs */}
                      <ul className="space-y-3 mb-6 flex-1">
                        <li className="flex items-center gap-2 text-sm text-slate-600">
                          <svg
                            className="w-4 h-4 text-indigo-500 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {plan.vcpu} Processor
                        </li>
                        <li className="flex items-center gap-2 text-sm text-slate-600">
                          <svg
                            className="w-4 h-4 text-indigo-500 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {plan.ram} RAM
                        </li>
                        <li className="flex items-center gap-2 text-sm text-slate-600">
                          <svg
                            className="w-4 h-4 text-indigo-500 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {plan.storage} SSD Storage
                        </li>
                        <li className="flex items-center gap-2 text-sm text-slate-600">
                          <svg
                            className="w-4 h-4 text-indigo-500 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Up to {plan.users} Users
                        </li>
                      </ul>

                      {/* Price */}
                      <div className="border-t border-slate-100 pt-4 mb-4">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-extrabold text-slate-800">
                            ₹{price.toLocaleString("en-IN")}
                          </span>
                          <span className="text-slate-400 text-sm">
                            /{billingCycle === "yearly" ? "yr" : "6mo"}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          {billingCycle === "yearly"
                            ? `Monthly equivalent: ₹${Math.round(
                                price / 12
                              ).toLocaleString("en-IN")}`
                            : `Monthly equivalent: ₹${Math.round(
                                price / 6
                              ).toLocaleString("en-IN")}`}
                        </p>
                      </div>

                      {/* CTA */}
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-200/80 hover:shadow-indigo-300/70 transition-shadow"
                      >
                        Buy Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* View all features */}
          <div className="mt-8 text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors"
            >
              View all features
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          </div>

          {/* Pricing note */}
          <p className="mt-4 text-center text-xs text-slate-400 max-w-2xl mx-auto">
            The displayed price is the monthly rate excluding applicable taxes.
            The total amount payable at checkout is calculated by multiplying the
            monthly rate by the selected billing period and adding applicable
            taxes.
          </p>

          {/* All Plans Include */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10"
          >
            <h3 className="text-2xl font-bold text-slate-800 text-center mb-10">
              All Plans Include
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allFeatures.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/70 backdrop-blur-md border border-slate-200 hover:border-indigo-300/60 transition-all shadow-sm hover:shadow-md"
                >
                  <svg
                    className="w-5 h-5 text-indigo-500 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-600 text-sm">{feat}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
    
    
      </section>
    </>
  );
}