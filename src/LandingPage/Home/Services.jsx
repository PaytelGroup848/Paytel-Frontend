import { motion } from "framer-motion";
import {
  Cloud,
  Server,
  HardDrive,
  Shield,
  Database,
  LifeBuoy,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    title: "Tally on Cloud Hosting",
    desc: "Run Tally ERP remotely with high speed, 24/7 access, and automatic backups. Perfect for accountants and SMEs.",
    icon: Cloud,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Cloud Servers",
    desc: "High‑performance virtual servers with NVMe storage, dedicated IPs, and root access for demanding apps.",
    icon: Server,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "VPS Hosting",
    desc: "Dedicated virtual private servers with full control, scalable resources, and DDoS protection.",
    icon: HardDrive,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Shared Hosting",
    desc: "Affordable, easy‑to‑use hosting for small websites and blogs, with cPanel and one‑click installs.",
    icon: Database,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Managed Cloud Services",
    desc: "Let our experts handle setup, monitoring, and maintenance of your cloud infrastructure.",
    icon: LifeBuoy,
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    title: "Data Backup & Disaster Recovery",
    desc: "Automated backups, snapshots, and recovery plans to keep your business safe from data loss.",
    icon: Shield,
    gradient: "from-red-500 to-pink-600",
  },
];

const ServiceCard = ({ service, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, duration: 0.4 }}
    viewport={{ once: true }}
    className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_40px_rgba(79,70,229,0.3)] transition-all duration-300 overflow-hidden flex flex-col"
  >
    {/* Gradient accent top – shines on dark */}
    <div className={`h-1.5 w-full bg-gradient-to-r ${service.gradient}`} />
    <div className="p-7 flex flex-col flex-1">
      <div className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg mb-5 group-hover:scale-110 transition-transform`}>
        <service.icon size={28} />
      </div>
      <h3 className="text-xl font-extrabold text-white mb-3 leading-tight">
        {service.title}
      </h3>
      <p className="text-sm text-slate-300 leading-relaxed flex-1">
        {service.desc}
      </p>
      <div className="mt-5 pt-4 border-t border-white/10">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 group-hover:gap-2.5 transition-all">
          Learn more <ArrowRight size={14} />
        </span>
      </div>
    </div>
  </motion.div>
);

export default function Services() {
  return (
    <section className="mt-0 mb-0 w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-20 w-[36rem] h-[36rem] bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-purple-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Our Main Services
          </h2>
          <p className="text-base md:text-lg text-slate-300 leading-relaxed font-medium">
            We offer safe and scalable cloud solutions that are specifically designed
            for businesses in India. Our services include Tally on Cloud Hosting for
            remote accounting, Cloud Servers for high‑performance applications, VPS
            Hosting for dedicated hosting, Shared Hosting for websites, Managed Cloud
            Services for cloud setup and management, and Data Backup & Disaster Recovery
            for safeguarding your important business data.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, idx) => (
            <ServiceCard key={service.title} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}