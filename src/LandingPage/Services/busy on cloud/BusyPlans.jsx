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
      </section>
    </>
  );
}
