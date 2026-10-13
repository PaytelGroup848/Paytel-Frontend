import { motion } from "framer-motion";

/* ── Custom SVG illustrations ──────────────────── */
const CloudInfrastructureIcon = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
    </defs>
    <path d="M16 50h32a10 10 0 1 0-8-18 12 12 0 1 0-24 4 8 8 0 0 0 0 14z" fill="url(#grad1)" />
    <rect x="24" y="42" width="16" height="8" rx="2" fill="#1E3A5F" />
    <circle cx="32" cy="38" r="3" fill="#1E3A5F" />
    <line x1="28" y1="50" x2="36" y2="50" stroke="#1E3A5F" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SecurityIcon = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10">
    <defs>
      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
    </defs>
    <path d="M32 4L8 14v20c0 15.6 10.2 22.8 24 26 13.8-3.2 24-10.4 24-26V14z" fill="url(#grad2)" opacity="0.9" />
    <path d="M26 32l6 6 10-12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const UptimeIcon = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10">
    <defs>
      <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#grad3)" opacity="0.9" />
    <polyline points="20,42 28,32 36,38 44,24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="20" cy="42" r="3" fill="white" />
    <circle cx="28" cy="32" r="3" fill="white" />
    <circle cx="36" cy="38" r="3" fill="white" />
    <circle cx="44" cy="24" r="3" fill="white" />
  </svg>
);

const ControlPanelIcon = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10">
    <defs>
      <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
    </defs>
    <rect x="8" y="16" width="48" height="36" rx="4" fill="url(#grad4)" />
    <rect x="14" y="22" width="36" height="4" rx="2" fill="white" opacity="0.3" />
    <rect x="14" y="30" width="28" height="4" rx="2" fill="white" opacity="0.6" />
    <rect x="14" y="38" width="20" height="4" rx="2" fill="white" opacity="0.8" />
    <circle cx="48" cy="40" r="6" fill="white" />
    <path d="M46 40h4M48 38v4" stroke="url(#grad4)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const AccessIcon = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10">
    <defs>
      <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="24" fill="url(#grad5)" opacity="0.9" />
    <path d="M20 28h24M20 36h24" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <circle cx="32" cy="32" r="6" fill="white" />
    <circle cx="32" cy="32" r="3" fill="url(#grad5)" />
  </svg>
);

const SupportIcon = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10">
    <defs>
      <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#grad6)" opacity="0.9" />
    <path d="M24 28a8 8 0 0 1 16 0v4h-16z" fill="white" />
    <circle cx="24" cy="40" r="3" fill="white" />
    <circle cx="40" cy="40" r="3" fill="white" />
    <path d="M24 40v8h16v-8" stroke="white" strokeWidth="3" fill="none" />
  </svg>
);

const benefits = [
  {
    icon: CloudInfrastructureIcon,
    title: "Powerful Cloud Infrastructure",
    description:
      "Run your applications on high-performance cloud servers designed for speed, stability, and seamless scalability.",
  },
  {
    icon: SecurityIcon,
    title: "Enterprise-Grade Security",
    description:
      "Your data is protected with advanced encryption, firewall protection, DDoS mitigation, and Acronis-powered backup security.",
  },
  {
    icon: UptimeIcon,
    title: "99.95% Uptime Guarantee",
    description:
      "We ensure maximum availability so your business stays online, accessible, and operational without interruptions.",
  },
  {
    icon: ControlPanelIcon,
    title: "Easy-to-Manage Control Panel",
    description:
      "Monitor usage, manage users, scale resources, and control services from a simple, intuitive dashboard.",
  },
  {
    icon: AccessIcon,
    title: "Anywhere Access",
    description:
      "Access your cloud servers, Tally, Busy, or Marg from any device—desktop, laptop, tablet, or mobile—without location limits.",
  },
  {
    icon: SupportIcon,
    title: "24/7 Expert Support",
    description:
      "Our dedicated cloud specialists are available around the clock to assist you with setup, migration, and technical support whenever you need it.",
  },
];

export default function BenefitsPlan() {
  return (
    <section className="relative w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 py-24 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-sky-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
            Included with Every Cloudedata Plan
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto">
            All plans come with these essential features to power your business without compromise.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group relative bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-2"
              >
                {/* Icon container with gradient border */}
                <div className="relative w-16 h-16 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
                  <div className="relative w-full h-full bg-white rounded-2xl border border-blue-100 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <IconComponent />
                  </div>
                </div>

                {/* Text */}
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-700 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}