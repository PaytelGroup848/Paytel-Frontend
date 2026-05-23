import { motion } from "framer-motion";
import Navbar from "./Navbar";   
 import Footer from "./Footer";   
import {
  Cloud,
  ShieldCheck,
  Globe,
  TrendingUp,
  Headphones,
  CheckCircle,
  ArrowUpCircle,
  Server,
  Cpu,
  Zap,
  LayoutDashboard,
  Users,
  Clock,
  Lightbulb,
  HeartHandshake,
  BadgeCheck,
  ChevronRight,
  Phone,
  MapPin,
  Mail,
  Award,
  Eye,
  Target,
  Gem,
} from "lucide-react";

const services = [
  {
    icon: Server,
    title: "High-Performance Cloud VPS",
    desc: "Linux & Windows VPS with dedicated resources, fast SSD storage, and low‑latency networks across India.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&auto=format&q=80",
  },
  {
    icon: LayoutDashboard,
    title: "ERP on Cloud",
    desc: "Access Marg, Tally, and Busy software securely on the cloud – real‑time collaboration and remote accounting.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format&q=80",
  },
  {
    icon: Cpu,
    title: "Co‑Location Services",
    desc: "Enterprise‑grade data center hosting for full control and security over your physical servers.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop&auto=format&q=80",
  },
  {
    icon: TrendingUp,
    title: "Scalable Infrastructure",
    desc: "Easily upgrade CPU, RAM, storage, or user access as your business grows – no downtime.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&auto=format&q=80",
  },
  {
    icon: Headphones,
    title: "24/7 IT Support",
    desc: "Dedicated support team to assist with setup, troubleshooting, and server management, day and night.",
    image:
      "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=600&h=400&fit=crop&auto=format&q=80",
  },
];

const benefits = [
  "Enterprise‑grade servers with Anti‑DDoS protection and automatic backups",
  "Manage accounting & ERP remotely, in real time",
  "Affordable plans for Linux VPS, Windows VPS, Marg, Tally, and Busy",
  "Resources grow with your business – truly scalable & flexible",
];

const technologyPoints = [
  {
    icon: Zap,
    title: "Advanced Cloud Platforms",
    desc: "Modern infrastructure built on cutting‑edge hardware and software stacks for peak performance.",
  },
  {
    icon: ArrowUpCircle,
    title: "Automation & Efficiency",
    desc: "Streamlined workflows and automated scaling reduce manual overhead and speed up deployments.",
  },
  {
    icon: TrendingUp,
    title: "Scalability & Flexibility",
    desc: "Instantly adjust resources to meet traffic spikes or long‑term growth without disruption.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability & Security",
    desc: "Bank‑grade encryption, DDoS mitigation, and redundant systems keep your data safe and accessible.",
  },
  {
    icon: Lightbulb,
    title: "Innovation for Growth",
    desc: "Continuous technology updates and proactive improvements help your business stay ahead.",
  },
];

const peoplePoints = [
  {
    icon: Users,
    title: "Expert Team",
    desc: "Skilled cloud architects, engineers, and support specialists with years of industry experience.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    desc: "Real humans, always available – not just bots. Rapid response and resolution guaranteed.",
  },
  {
    icon: HeartHandshake,
    title: "Customer‑Focused",
    desc: "We listen, adapt, and tailor solutions to fit your unique business challenges and goals.",
  },
  {
    icon: Lightbulb,
    title: "Innovation‑Driven",
    desc: "A culture of continuous learning and improvement keeps us – and your business – moving forward.",
  },
];

const teamMembers = [
  {
    name: "Rajesh Sharma",
    role: "CEO & Founder",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
  },
  {
    name: "Priya Patel",
    role: "CTO",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
  },
  {
    name: "Amit Kumar",
    role: "Head of Support",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
  },
  {
    name: "Sneha Verma",
    role: "Cloud Architect",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
  },
];

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden bg-slate-50 font-sans">
        <Navbar/>
      {/* ========== HERO – DARK & PROFESSIONAL ========== */}
      <section className="relative flex items-center min-h-[85vh] pt-20 pb-20 md:pt-28 md:pb-28 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
        {/* Background image overlay */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=1080&fit=crop&auto=format&q=80"
            alt="Tech background"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Animated glows */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
         
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight"
          >
            Find your online success with{" "}
            <span className="bg-gradient-to-r from-teal-400 to-indigo-300 bg-clip-text text-transparent">
              Cloudedata
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 max-w-3xl mx-auto text-lg text-slate-300 leading-relaxed"
          >
            Cloudedata is on a mission to make cloud technology simple, secure, and
            accessible for businesses of all sizes. From high‑performance cloud
            hosting and VPS solutions to accounting software on cloud and
            enterprise‑grade security powered by Acronis, we help you run, scale,
            and manage your business online – faster, smarter, and with complete
            confidence.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-500 text-white px-8 py-3.5 font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl transition-all"
            >
              Get Started
              <ChevronRight size={18} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/5 backdrop-blur-sm px-8 py-3.5 font-semibold text-white hover:bg-white/10 transition-all"
            >
              Contact Sales
            </a>
          </motion.div>
        </div>
      </section>

      {/* ========== TRUSTED PROVIDER ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1 text-xs font-bold tracking-wide text-indigo-700 uppercase mb-4">
                A Trusted Cloud Hosting Provider
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                Simplifying cloud for modern businesses
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Founded with a vision to simplify cloud services, Cloudedata has
                grown into a reliable partner for clients across India and beyond.
                Thousands of users – from startups to large enterprises – trust us
                for secure, scalable cloud hosting and smooth performance.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                With headquarters in Okhla Phase 3, New Delhi, we serve a diverse
                clientele across industries, providing everything from cloud VPS to
                ERP hosting, backed by Acronis‑powered security and 24/7 human
                support.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Enterprise‑grade security with Acronis backups",
                  "24/7 expert support, not automated bots",
                  "High-performance infrastructure in Indian data centers",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-700">
                    <CheckCircle size={18} className="text-teal-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-4">
                <div className="flex items-center gap-2">
                  <Award size={20} className="text-indigo-500" />
                  <span className="text-sm font-medium text-slate-600">ISO Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={20} className="text-teal-500" />
                  <span className="text-sm font-medium text-slate-600">GDPR Compliant</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&auto=format&q=80"
                alt="Cloud data center"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent" />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sm font-semibold text-slate-800">
                State-of-the-art data centers
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== MISSION & VALUES ========== */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Eye,
                title: "Our Vision",
                desc: "To become the most trusted cloud solutions partner in India, empowering businesses to achieve their full digital potential.",
              },
              {
                icon: Target,
                title: "Our Mission",
                desc: "Make cloud technology simple, secure, and accessible for every business, regardless of size or industry.",
              },
              {
                icon: Gem,
                title: "Our Values",
                desc: "Innovation, reliability, customer‑first approach, and continuous improvement guide everything we do.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center shadow-lg mb-5">
                  <item.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHAT WE OFFER (with images) ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center rounded-full bg-teal-100 border border-teal-200 px-4 py-1 text-sm font-semibold text-teal-700 uppercase">
              What We Offer
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
              Comprehensive cloud solutions
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center mb-4 shadow-md">
                    <service.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHY CHOOSE CLOUDEDATA ========== */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center rounded-full bg-indigo-100 border border-indigo-200 px-4 py-1 text-sm font-semibold text-indigo-700 uppercase">
              Why Choose Cloudedata?
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
              Built for your success
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-4 items-start rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                  <BadgeCheck size={22} className="text-teal-600" />
                </div>
                <p className="text-slate-700 text-sm font-medium">{benefit}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=400&fit=crop&auto=format&q=80"
              alt="Secure cloud infrastructure"
              className="w-full h-56 object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ========== OUR STRENGTHS (stats) ========== */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-indigo-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold"
          >
            Trusted by Thousands of Businesses
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-2xl mx-auto text-indigo-100 text-lg"
          >
            Don’t just take our word for it – thousands of businesses rely on
            Cloudedata for secure, high‑performance cloud hosting and VPS
            solutions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { value: "99.99%", label: "Uptime Guarantee" },
              { value: "12,000+", label: "Active Users" },
              { value: "24/7", label: "Expert Support" },
              { value: "50+", label: "Data Center Locations" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white/10 backdrop-blur-md p-8 border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="text-5xl font-black">{stat.value}</div>
                <div className="mt-3 text-sm font-medium text-indigo-100">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== TECHNOLOGY ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center rounded-full bg-teal-100 border border-teal-200 px-4 py-1 text-sm font-semibold text-teal-700 uppercase">
              Technology
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
              Innovation that moves your business forward
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-slate-600">
              Cloudedata combines modern cloud infrastructure, automation tools,
              and secure platforms to provide scalable, reliable, and
              cost‑effective solutions.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologyPoints.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center shadow-md">
                  <point.icon size={32} className="text-white" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{point.title}</h3>
                <p className="mt-2 text-slate-600 text-sm">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PEOPLE / TEAM ========== */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center rounded-full bg-indigo-100 border border-indigo-200 px-4 py-1 text-sm font-semibold text-indigo-700 uppercase">
              People
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
              Meet the team behind Cloudedata
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-slate-600">
              Our success is built on the skilled professionals who design,
              manage, and support your cloud services every day.
            </p>
          </motion.div>
          {/* Team members */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-xl border-4 border-white ring-2 ring-slate-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{member.name}</h3>
                <p className="text-teal-600 text-sm font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
          {/* People qualities */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {peoplePoints.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center">
                  <point.icon size={28} className="text-teal-600" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{point.title}</h3>
                <p className="mt-2 text-slate-600 text-sm">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== OUR LOCATION ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-slate-900">Visit Our Office</h2>
              <p className="mt-4 text-slate-600">
                We’re based in the heart of Okhla Phase 3, New Delhi – a thriving
                hub for technology and innovation. Drop by for a chat or a live
                demo of our cloud solutions.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-center gap-3 text-slate-700">
                  <MapPin size={20} className="text-indigo-500" />
                  Okhla Phase 3, New Delhi - 110020
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <Phone size={20} className="text-teal-500" />
                  +91 9311472355
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <Mail size={20} className="text-indigo-500" />
                  hello@cloudedata.in
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-xl h-72 md:h-80"
            >
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&h=600&fit=crop&auto=format&q=80"
                alt="Okhla Phase 3 location"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-slate-950 to-indigo-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&h=600&fit=crop&auto=format&q=80"
            alt="Cloud technology"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold"
          >
            Ready to simplify your cloud journey?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-slate-300 text-lg"
          >
            Talk to our experts or request a live demo today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <a
              href="tel:9311472355"
              className="inline-flex items-center gap-2 rounded-xl bg-teal-500 hover:bg-teal-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-teal-500/30 transition-all"
            >
              <Phone size={18} />
              +91 9311472355
            </a>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm px-8 py-3.5 font-semibold text-white hover:bg-white/20 transition-all"
            >
              Request a Demo
              <ChevronRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>
          <Footer/>
    </main>
  );
}