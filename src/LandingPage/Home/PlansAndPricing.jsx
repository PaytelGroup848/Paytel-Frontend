import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Star,
  Globe,
  HardDrive,
  Shield,
  Zap,
  Server,
  Database,
  Users,
  Headphones,
  RefreshCw,
  Lock,
  Cpu,
  MemoryStick,
  Wifi,
  ArrowUpRight,
} from "lucide-react";
import { Infinity as InfinityIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBillingPlans } from "../../hooks/useBilling";
import { useVpsPlans } from "../../hooks/useVps";

// ─── Helpers ──────────────────────────────────────────────────────────────────
// WordPress monthly field — already in rupees (e.g. 61), NOT paise
const wpPrice = (val) => {
  const n = Number(val);
  if (!n || isNaN(n)) return 0;
  // If value looks like paise (> 500), convert; else treat as rupees
  return n > 500 ? Math.round(n / 100) : n;
};

// VPS priceMonthly — in paise, convert to rupees
const vpsPrice = (val) => {
  const n = Number(val);
  if (!n || isNaN(n)) return 0;
  return Math.round(n / 100);
};

const fmtINR = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

// ─── Hardcoded Tally card ─────────────────────────────────────────────────────
const TALLY_PLAN = {
  id: "tally",
  name: "Tally on  Cloud",
  price: "₹299",
  originalPrice: "₹1,495",
  period: "/mo",
  desc: "Secure Tally ERP hosting with multi-user access and auto backups.",
  features: [
    { text: "Managed Server", icon: Server },
    { text: "Auto Backup", icon: Database },
    { text: "High Security", icon: Lock },
    { text: "Unlimited Companies", icon: InfinityIcon },
    { text: "Multi-User", icon: Users },
    { text: "99.9% Uptime", icon: Shield },
  ],
  popular: false,
  cta: "Get Started",
  type: "tally",
  route: "/tally-hosting",
};

// ─── PlanCard — exactly same UI as original Plan.jsx ─────────────────────────
const PlanCard = ({ plan, index, onCta }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, margin: "-10px" }}
      whileHover={{
        y: -6,
        boxShadow: "0 20px 40px -12px rgba(0,0,0,0.08)",
        transition: { duration: 0.25 },
      }}
      className={`relative flex flex-col bg-white rounded-2xl border border-slate-200/80 border-t-[3px] transition-all duration-300 ${
        plan.popular
          ? "border-t-blue-500 shadow-[0_8px_25px_rgba(59,130,246,0.1)] scale-[1.02] z-10"
          : "border-t-blue-400 shadow-sm"
      }`}
    >
      {/* 80% OFF badge — top right */}
      <div className="absolute top-0 right-0 z-20">
        <span className="me-3 text-green-600 text-[16px] font-bold tracking-wide">
          80% OFF
        </span>
      </div>

      {/* MOST POPULAR ribbon */}
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[11px] font-semibold px-5 py-1.5 rounded-full shadow-lg shadow-blue-500/30 border-2 border-white tracking-wide">
            <Star size={11} fill="white" stroke="white" /> MOST POPULAR
          </span>
        </div>
      )}

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Name + desc */}
        <div className="mb-5">
          <h3 className="text-xl font-bold text-slate-800 tracking-tight mb-2">
            {plan.name}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
            {plan.desc}
          </p>
        </div>

        {/* Pricing */}
        <div className="mb-5">
          <div className="flex items-baseline gap-1.5 mb-4">
            <span className="text-5xl font-bold text-slate-800 tracking-tight">
              {plan.price}
            </span>
            <span className="text-2xl text-slate-950 font-normal">
              {plan.period}
            </span>
          </div>
          {/* Original price struck through */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg text-slate-900 line-through">
              {plan.originalPrice}
            </span>
            <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              Save 80%
            </span>
          </div>

          <button
            onClick={() => onCta(plan)}
            className={`w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group ${
              plan.popular
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-md shadow-blue-500/20"
                : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200 hover:border-slate-300"
            }`}
          >
            {plan.cta}
            <ArrowUpRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>

        <div className="border-t border-slate-100 mb-4" />

        {/* Features */}
        <ul className="space-y-3 flex-1">
          {plan.features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <li key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-blue-600" strokeWidth={3} />
                </div>
                <span className="text-lg text-slate-700 font-bold">
                  {feature.text}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 border-t-[3px] border-t-blue-400 overflow-hidden animate-pulse shadow-sm">
      <div className="p-6 space-y-4">
        <div className="h-6 w-32 bg-slate-100 rounded" />
        <div className="h-4 w-48 bg-slate-100 rounded" />
        <div className="h-12 w-28 bg-slate-100 rounded" />
        <div className="h-4 w-24 bg-slate-100 rounded" />
        <div className="h-11 bg-slate-100 rounded-xl" />
        <div className="h-px bg-slate-100" />
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-4 bg-slate-100 rounded w-full" />
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function PlansAndPricing() {
  const navigate = useNavigate();

  // WordPress — sabse sasta
  const { data: wpPlans, isLoading: wpLoading } = useBillingPlans();

  const cheapestWp = useMemo(() => {
    if (!wpPlans?.length) return null;
    return [...wpPlans].sort(
      (a, b) => wpPrice(a.monthly) - wpPrice(b.monthly),
    )[0];
  }, [wpPlans]);

  // Linux VPS — sabse sasta
  const { data: linuxPlans, isLoading: linuxLoading } = useVpsPlans("linux");
  const cheapestLinux = useMemo(() => {
    if (!linuxPlans?.length) return null;
    return [...linuxPlans].sort(
      (a, b) => vpsPrice(a.priceMonthly) - vpsPrice(b.priceMonthly),
    )[0];
  }, [linuxPlans]);

  // Windows VPS — id: "windows-small"
  const { data: winPlans, isLoading: winLoading } = useVpsPlans("windows");
  const windowsSmall = useMemo(() => {
    if (!winPlans?.length) return null;
    return (
      winPlans.find((p) => (p.id || p._id) === "windows-small") || winPlans[0]
    );
  }, [winPlans]);

  const isLoading = wpLoading || linuxLoading || winLoading;

  // ── Build card objects with overridden headings ──────────────────────
  const wpCard = cheapestWp
    ? {
        id: cheapestWp.id || cheapestWp._id,
        name: "WordPress", // ← custom heading
        price: fmtINR(wpPrice(cheapestWp.price)),
        originalPrice: fmtINR(Math.round(wpPrice(cheapestWp.price) / 0.2)),
        period: "/mo",
        desc: "Easy one-click WordPress installation for blogs and small business websites.",
        features:
          Array.isArray(cheapestWp.features) && cheapestWp.features.length
            ? cheapestWp.features
                .slice(0, 6)
                .map((f) => ({ text: f, icon: Check }))
            : [
                { text: "1 Website", icon: Globe },
                { text: "10 GB SSD", icon: HardDrive },
                { text: "Free SSL", icon: Shield },
                { text: "Unmetered BW", icon: InfinityIcon },
                { text: "24/7 Support", icon: Headphones },
                { text: "1-Click WP", icon: RefreshCw },
              ],
        popular: false,
        cta: "Get Started",
        type: "wordpress",
        route: "/wordpress-hosting",
        planId: cheapestWp.id || cheapestWp._id,
      }
    : null;

  const linuxCard = cheapestLinux
    ? {
        id: cheapestLinux.id || cheapestLinux._id,
        name: "Linux VPS", // ← custom heading
        price: fmtINR(vpsPrice(cheapestLinux.priceMonthly)),
        originalPrice: fmtINR(
          Math.round(vpsPrice(cheapestLinux.priceMonthly) / 0.2),
        ),
        period: "/mo",
        desc: "High-performance Linux server with root access and NVMe storage.",
        features: [
          { text: `${cheapestLinux.vcpu || "2"} vCPU`, icon: Cpu },
          { text: cheapestLinux.ram || "4 GB RAM", icon: MemoryStick },
          { text: cheapestLinux.storage || "60 GB SSD", icon: HardDrive },
          { text: cheapestLinux.portSpeed || "1 Gbps", icon: Wifi },
          { text: "Root Access", icon: Lock },
          { text: "NVMe SSD", icon: Zap },
        ],
        popular: false,
        cta: "Choose Linux",
        type: "linux",
        route: "/vps-hosting",
        planId: cheapestLinux.id || cheapestLinux._id,
      }
    : null;

  const winCard = windowsSmall
    ? {
        id: windowsSmall.id || windowsSmall._id,
        name: "Windows VPS", // ← custom heading
        price: fmtINR(vpsPrice(windowsSmall.priceMonthly)),
        originalPrice: fmtINR(
          Math.round(vpsPrice(windowsSmall.priceMonthly) / 0.2),
        ),
        period: "/mo",
        desc: "Dedicated Windows server with full admin control and 100% uptime guarantee.",
        features: [
          { text: `${windowsSmall.vcpu || "2"} vCPU`, icon: Cpu },
          { text: windowsSmall.ram || "6 GB RAM", icon: MemoryStick },
          { text: windowsSmall.storage || "60 GB SSD", icon: HardDrive },
          { text: "100% Uptime", icon: Shield },
          { text: "Admin Access", icon: Lock },
          { text: "DDoS Protected", icon: Shield },
        ],
        popular: true, // ← windows-small = MOST POPULAR
        cta: "Choose Windows",
        type: "windows",
        route: "/vps-hosting",
        planId: windowsSmall.id || windowsSmall._id,
      }
    : null;

  const cards = [wpCard, linuxCard, winCard, TALLY_PLAN].filter(Boolean);

  const handleCta = (plan) => {
    {
      console.log("this is my plan====", plan);
    }
    if (plan.type === "wordpress") navigate(`/wordpress/configure/${plan.id}`);
    else if (plan.type === "linux" || plan.type === "windows")
      navigate(`/vps/configure/${plan.type}/${plan.planId}`);
    else navigate(plan.route || "/");
  };

  return (
    <section className="relative w-full bg-[#fafbfc] py-10 md:py-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.03)_0%,transparent_70%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.02)_0%,transparent_50%)] pointer-events-none" />

      <div
        className="relative mx-auto"
        style={{ width: "93%", maxWidth: "none" }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <h2 className="text-5xl md:text-6xl lg:text-6xl font-bold text-slate-800 mb-4 tracking-tight leading-tight">
            Choose your perfect plan
          </h2>
          <p className="text-base md:text-lg text-slate-500 font-normal max-w-xl mx-auto">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Cards grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
            {[1, 2, 3, 4].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
            {cards.map((plan, idx) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                index={idx}
                onCta={handleCta}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-slate-800 to-slate-700 text-white text-sm font-semibold rounded-xl hover:from-blue-600 hover:to-blue-500 transition-all duration-300 group shadow-lg shadow-slate-200"
          >
            Compare all plans
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
          <p className="text-xs text-slate-400 mt-4 font-normal">
            * Prices exclude applicable taxes. Total calculated at checkout.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
