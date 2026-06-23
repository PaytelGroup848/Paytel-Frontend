import { motion } from "framer-motion";
import {
  Server,
  Globe,
  Code,
  Mail,
  LifeBuoy,
  Shield,
  ArrowRight,
  Tally5,
} from "lucide-react";

const services = [
  {
    title: "VPS Hosting",
    desc: "Dedicated virtual private servers with full root access, scalable resources, and enterprise-grade DDoS protection. Ideal for growing businesses and high-traffic applications.",
    icon: Server,
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    title: "WordPress & cPanel Hosting",
    desc: "Optimized WordPress hosting with cPanel control panel, one-click installer, free SSL, and automatic updates. Perfect for blogs, portfolios, and business websites.",
    icon: Globe,
    gradient: "from-sky-500 to-indigo-600",
  },
  {
    title: "PHP Hosting",
    desc: "High-performance PHP hosting with support for PHP 8.x, MySQL, and easy deployment. Built for developers and dynamic web applications.",
    icon: Code,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    title: "Business Email Hosting",
    desc: "Professional email hosting with your own domain, advanced spam protection, and large mailboxes. Trusted communication for your brand.",
    icon: Mail,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "Managed Cloud Services",
    desc: "Let our experts handle setup, monitoring, and maintenance of your cloud infrastructure. Focus on your business while we manage the tech.",
    icon: LifeBuoy,
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    title: "Tally on Cloud Hosting",
    desc: "Access your Tally data securely from anywhere, anytime. Enjoy high-speed cloud infrastructure, multi-user access, and seamless business operations without local server limitations.",
    icon: Tally5,
    gradient: "from-rose-500 to-pink-600",
  },
];

const ServiceCard = ({ service, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.07, duration: 0.45, ease: "easeOut" }}
    viewport={{ once: true }}
    className="group relative rounded-2xl sm:rounded-3xl p-[1px] overflow-hidden transition-transform duration-300 hover:-translate-y-1"
    style={{
      background:
        "linear-gradient(155deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.04) 35%, rgba(255,255,255,0.02) 60%, rgba(255,255,255,0.12) 100%)",
    }}
  >
    <div
      className="relative h-full rounded-[15px] sm:rounded-[23px] flex flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(165deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.22)",
      }}
    >
      {/* Gradient accent top */}
      <div className={`h-[3px] w-full bg-gradient-to-r ${service.gradient} opacity-80`} />

      {/* hover glow */}
      <div
        className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 pointer-events-none`}
      />

      <div className="p-4 sm:p-7 flex flex-col flex-1">
        <div
          className={`w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br ${service.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg mb-3 sm:mb-5 group-hover:scale-110 transition-transform duration-300`}
          style={{ boxShadow: "0 8px 20px -6px rgba(0,0,0,0.4)" }}
        >
          <service.icon size={18} className="sm:hidden" strokeWidth={1.8} />
          <service.icon size={26} className="hidden sm:block" strokeWidth={1.8} />
        </div>

        <h3
          className="text-[13.5px] sm:text-xl text-white mb-1.5 sm:mb-3 leading-snug"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 560, letterSpacing: "-0.01em" }}
        >
          {service.title}
        </h3>

        <p className="text-[11.5px] sm:text-sm text-slate-300/85 leading-relaxed flex-1 font-normal line-clamp-4 sm:line-clamp-none">
          {service.desc}
        </p>

        <div className="mt-3 sm:mt-5 pt-3 sm:pt-4 border-t border-white/10 hidden sm:flex items-center gap-1.5 text-[12px] font-medium text-white/0 group-hover:text-white/70 transition-colors duration-300">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Learn more</span>
          <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
        </div>
      </div>
    </div>
  </motion.div>
);

export default function Services() {
  return (
    <section className="mt-0 mb-0 w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 py-14 md:py-24 px-3 sm:px-6 lg:px-8 relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Inter:wght@400;500;600;700&display=swap');
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Background decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-32 -left-20 w-[36rem] h-[36rem] bg-indigo-600/20 rounded-full blur-3xl"
          animate={{ x: [0, 40, -20, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-purple-600/20 rounded-full blur-3xl"
          animate={{ x: [0, -30, 20, 0], y: [0, -20, 30, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        {/* fine grid for texture */}
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 25%, black 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 25%, black 30%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto z-10" style={{ fontFamily: "'Inter', sans-serif" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 text-white/70 text-[10.5px] font-semibold px-3.5 py-1.5 rounded-full mb-4 sm:mb-6 tracking-[0.16em] uppercase">
            <Shield size={11} className="text-indigo-300" strokeWidth={2} />
            What we offer
          </div>

          <h2
            className="text-[1.7rem] sm:text-4xl md:text-5xl text-white mb-4 sm:mb-5 leading-[1.12]"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 560, letterSpacing: "-0.015em" }}
          >
            Our Core{" "}
            <span className="italic bg-gradient-to-r from-indigo-300 via-violet-300 to-purple-300 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-[13px] sm:text-base md:text-lg text-slate-300/80 leading-relaxed font-normal px-2">
            Enterprise-grade cloud solutions built for Indian businesses — from powerful VPS
            hosting to managed cloud services and secure business email, engineered for
            performance, reliability, and scale.
          </p>
        </motion.div>

        {/* Service Cards Grid — 2 columns on mobile, smooth scaling up */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
          {services.map((service, idx) => (
            <ServiceCard key={service.title} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}