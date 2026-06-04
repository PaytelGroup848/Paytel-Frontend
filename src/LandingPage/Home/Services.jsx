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
    desc: "Dedicated virtual private servers with full root access, scalable resources, and enterprise‑grade DDoS protection. Ideal for growing businesses and high‑traffic applications.",
    icon: Server,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "WordPress & cPanel Hosting",
    desc: "Optimized WordPress hosting with cPanel control panel, one‑click installer, free SSL, and automatic updates. Perfect for blogs, portfolios, and business websites.",
    icon: Globe,
    gradient: "from-sky-500 to-indigo-600",
  },
  {
    title: "PHP Hosting",
    desc: "High‑performance PHP hosting with support for PHP 8.x, MySQL, and easy deployment. Built for developers and dynamic web applications.",
    icon: Code,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Business Email Hosting",
    desc: "Professional email hosting with your own domain, advanced spam protection, and large mailboxes. Trusted communication for your brand.",
    icon: Mail,
    gradient: "from-emerald-500 to-teal-500",
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
    {/* Gradient accent top */}
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
            Our Core Services
          </h2>
          <p className="text-base md:text-lg text-slate-300 leading-relaxed font-medium">
            We provide enterprise‑grade cloud solutions tailored for Indian businesses. 
            From powerful VPS hosting to managed cloud services and secure business email, 
            every solution is built for performance, reliability, and scalability.
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