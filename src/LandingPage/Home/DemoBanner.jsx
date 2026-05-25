import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import axios from 'axios';   // <-- axios import
import {
  ArrowRight,
  Cloud,
  Database,
  Menu,
  ServerCog,
  ShieldCheck,
  X,
  Phone,
  Rocket,
  UserCircle,
  AtSign,
  Smartphone,
  Package,
  Send,
  ChevronRight,
  ChevronDown,
  Zap,
  Globe,
  Lock,
  TrendingUp
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'About Us', href: '/about-us' },
  {
    label: 'Software CRM',
    dropdown: [
      { label: 'Education CRM', href: '/education-management-system' },
      { label: 'Restaurant Management', href: '/restaurant-management-system' },
    ]
  },
  { label: 'Blog', href: '/cloud-hosting-blog', external: true },
  { label: 'Contact', href: '/contact', external: true },
];

const STATS = [
  { value: 99.99, suffix: '%', label: 'Uptime SLA' },
  { value: 12, suffix: 'K+', label: 'Active Users' },
  { value: 8, suffix: 'ms', label: 'Avg Latency' },
];

const BENEFITS = [
  { icon: Lock, text: 'Bank-grade encryption' },
  { icon: Zap, text: 'Lightning-fast performance' },
  { icon: Globe, text: 'Global CDN network' },
  { icon: TrendingUp, text: 'Auto-scaling infrastructure' },
];

const PRODUCT_OPTIONS = [
  'Tally on Cloud',
  'Marg on Cloud',
  'Busy on Cloud',
  'VPS Infrastructure',
];

function AnimatedNumber({ value, suffix = '' }) {
  const [display, setDisplay] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplay(value);
      return undefined;
    }

    let frameId;
    let startTime;
    const duration = 1200;

    const update = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = value * eased;

      setDisplay(value % 1 === 0 ? Math.round(next) : Number(next.toFixed(2)));

      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      }
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [shouldReduceMotion, value]);

  return (
    <>
      {display}
      {suffix}
    </>
  );
}

// ---------- MODIFIED LeadCaptureCard with backend integration ----------
function LeadCaptureCard() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    message: ''   // optional
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // clear messages on new input
    if (success) setSuccess('');
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    // validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.product) {
      setError('Please fill all required fields.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/public/submit', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        product: formData.product,
        message: formData.message || 'No message provided'
      });

      if (response.data.success) {
        setSuccess('Thank you! Your request has been submitted. Our team will contact you soon.');
        // reset form
        setFormData({ name: '', email: '', phone: '', product: '', message: '' });
      } else {
        setError('Submission failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Network error. Please check your connection or try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
      className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
    >
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 blur-2xl"
      />

      <div className="group relative overflow-hidden rounded-3xl border border-indigo-400/30 bg-gradient-to-br from-slate-900/80 via-indigo-950/60 to-black/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent" />
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

        <div className="relative mb-8">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="mb-4 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-3.5 shadow-lg shadow-indigo-500/40"
          >
            {/* optional icon placeholder */}
          </motion.div>
          <h3 className="text-3xl font-semibold tracking-tight text-white">
            Request a Live Demo
          </h3>
          <p className="mt-2 text-base text-slate-300">
            Experience enterprise-grade cloud infrastructure. Our solutions architects will guide you through a personalized demo.
          </p>
        </div>

        {/* Success/Error messages */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 rounded-xl bg-green-500/20 border border-green-400/50 p-3 text-sm text-green-300"
            >
              {success}
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 rounded-xl bg-red-500/20 border border-red-400/50 p-3 text-sm text-red-300"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <UserCircle size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full rounded-xl border border-indigo-400/20 bg-slate-800/50 py-4 pl-12 pr-4 text-base text-white placeholder-slate-400 outline-none backdrop-blur-sm transition-all focus:border-indigo-400 focus:bg-slate-800/70 focus:ring-4 focus:ring-indigo-500/20"
              required
            />
          </div>

          <div className="relative group">
            <AtSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Work Email"
              className="w-full rounded-xl border border-indigo-400/20 bg-slate-800/50 py-4 pl-12 pr-4 text-base text-white placeholder-slate-400 outline-none backdrop-blur-sm transition-all focus:border-indigo-400 focus:bg-slate-800/70 focus:ring-4 focus:ring-indigo-500/20"
              required
            />
          </div>

          <div className="relative group">
            <Smartphone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full rounded-xl border border-indigo-400/20 bg-slate-800/50 py-4 pl-12 pr-4 text-base text-white placeholder-slate-400 outline-none backdrop-blur-sm transition-all focus:border-indigo-400 focus:bg-slate-800/70 focus:ring-4 focus:ring-indigo-500/20"
              required
            />
          </div>

          <div className="relative group">
            <Package size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-400" />
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              className="w-full appearance-none rounded-xl border border-indigo-400/20 bg-slate-800/50 py-4 pl-12 pr-10 text-base text-white outline-none backdrop-blur-sm transition-all focus:border-indigo-400 focus:bg-slate-800/70 focus:ring-4 focus:ring-indigo-500/20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 1rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.25rem'
              }}
              required
            >
              <option value="" disabled>Select Solution</option>
              {PRODUCT_OPTIONS.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </div>

          {/* Optional message field - uncomment if needed */}
          {/* 
          <div className="relative group">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Additional message (optional)"
              rows="3"
              className="w-full rounded-xl border border-indigo-400/20 bg-slate-800/50 py-3 pl-4 pr-4 text-base text-white placeholder-slate-400 outline-none backdrop-blur-sm transition-all focus:border-indigo-400 focus:bg-slate-800/70 focus:ring-4 focus:ring-indigo-500/20"
            />
          </div>
          */}

          <motion.button
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-4 text-base font-medium text-white shadow-lg shadow-indigo-500/40 transition-all hover:shadow-xl hover:shadow-indigo-500/50 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="relative z-10">{loading ? 'Submitting...' : 'Request Demo'}</span>
            {!loading && <Send size={16} className="relative z-10 ml-1 transition-transform group-hover:translate-x-1" />}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-700 opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.button>

          <p className="text-center text-xs text-slate-400">
            By submitting, you agree to our{' '}
            <a href="#privacy" className="font-medium text-indigo-400 underline-offset-2 hover:underline">
              Privacy Policy
            </a>
          </p>
        </form>
      </div>
    </motion.div>
  );
}

// DropdownMenu component (unchanged)
function DropdownMenu({ item, closeMenu }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-medium text-white/90 transition-all hover:bg-white/10 hover:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {item.label}
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-white/20 bg-purple-900/95 shadow-xl backdrop-blur-xl"
          >
            {item.dropdown.map((subItem) => (
              <a
                key={subItem.label}
                href={subItem.href}
                onClick={closeMenu}
                className="block px-4 py-3 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
              >
                {subItem.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Main ProfessionalBanner component (unchanged except using the new LeadCaptureCard)
export default function ProfessionalBanner() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const closeMenu = () => setMobileOpen(false);

  return (
    <section
      id="hero-banner"
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 font-sans"
    >
      {/* Animated Background Effects - same as before */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -left-40 top-0 h-[800px] w-[800px] rounded-full bg-blue-600/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -right-40 top-40 h-[700px] w-[700px] rounded-full bg-cyan-500/15 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/18 blur-[100px]"
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e40af15_1px,transparent_1px),linear-gradient(to_bottom,#1e40af15_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_40%,#000_60%,transparent_100%)]" />

        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute h-1 w-1 rounded-full bg-blue-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Navigation - same as before */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute inset-x-0 top-4 z-50 px-4 sm:top-6 sm:px-6 lg:px-8"
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between rounded-2xl border border-blue-400/20 bg-white/5 px-4 shadow-2xl shadow-blue-900/40 backdrop-blur-2xl sm:px-6"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(30, 64, 175, 0.04) 100%)',
            boxShadow: '0 8px 32px 0 rgba(37, 99, 235, 0.25), inset 0 1px 0 0 rgba(96, 165, 250, 0.15)'
          }}
        >
          <a href="#hero-banner" onClick={closeMenu} className="flex items-center gap-2 group">
            {!logoFailed ? (
              <img
                src="/Cloudedata.svg"
                alt="Cloudedata"
                className="h-7 w-auto object-contain transition-transform group-hover:scale-105"
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg shadow-blue-500/40">
                  <Cloud size={20} className="text-white" />
                </div>
                <span className="text-xl font-semibold tracking-tight text-white">
                  Cloudedata
                </span>
              </div>
            )}
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              if (link.dropdown) {
                return <DropdownMenu key={link.label} item={link} closeMenu={closeMenu} />;
              }

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-white/90 transition-all hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:9311472355"
              className="hidden items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium text-white transition-all hover:bg-white/10 md:flex"
            >
              <Phone size={16} />
              <span>9311472355</span>
            </a>

            <a
              href="/login"
              className="hidden rounded-xl px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/10 md:block"
            >
              Login
            </a>
 
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/register"
              className="hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/40 transition-all hover:shadow-xl hover:shadow-blue-500/50 md:block"
            >
              Sign Up
            </motion.a>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10 md:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-4 mt-2 origin-top overflow-hidden rounded-2xl border border-blue-400/20 bg-slate-900/95 p-4 shadow-xl backdrop-blur-2xl md:hidden"
            >
              <div className="flex flex-col space-y-1">
                {NAV_LINKS.map((link) => {
                  if (link.dropdown) {
                    return (
                      <div key={link.label} className="flex flex-col">
                        <div className="rounded-lg px-4 py-3 text-sm font-medium text-white">
                          {link.label}
                        </div>
                        {link.dropdown.map((subItem) => (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            onClick={closeMenu}
                            className="rounded-lg px-6 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    );
                  }

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      onClick={closeMenu}
                      className="rounded-lg px-4 py-3 text-sm font-medium text-white hover:bg-white/10"
                    >
                      {link.label}
                    </a>
                  );
                })}

                <div className="my-2 h-px bg-white/10" />

                <a
                  href="tel:9311472355"
                  className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white hover:bg-white/10"
                >
                  <Phone size={16} />
                  <span>9311472355</span>
                </a>

                <a
                  href="/login"
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-white hover:bg-white/10"
                >
                  Login
                </a>

                <a
                  href="/register"
                  onClick={closeMenu}
                  className="mt-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-center text-sm font-medium text-white shadow-lg shadow-blue-500/40"
                >
                  Sign Up
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-16 pt-32 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-8 lg:pt-24">

        {/* Left Column: Hero Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            Transform Your Business with{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Next-Gen Cloud Solutions
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            Deploy enterprise-grade infrastructure with unmatched performance, security, and scalability. Built for businesses that demand excellence.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {BENEFITS.map(({ icon: Icon, text }) => (
              <motion.div
                key={text}
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-sm font-normal text-white"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 backdrop-blur-sm border border-blue-400/20">
                  <Icon size={18} className="text-blue-400" />
                </div>
                {text}
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="#demo"
              className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 text-base font-medium text-white shadow-2xl shadow-blue-500/40 transition-all hover:shadow-blue-500/50"
            >
              <span className="relative z-10">Start Free Trial</span>
              <ArrowRight size={18} className="relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-600 opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#pricing"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-blue-400/30 bg-blue-500/10 px-8 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-blue-500/20"
            >
              View Pricing
              <ChevronRight size={18} />
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 overflow-hidden rounded-2xl border border-blue-400/20 bg-blue-500/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                  Starting From
                </span>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tight text-white">₹290</span>
                  <span className="text-base font-normal text-slate-300">/user/mo</span>
                </div>
              </div>

              <div className="hidden h-16 w-px bg-blue-400/20 sm:block" />

              <div className="flex gap-8">
                {STATS.slice(0, 2).map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="text-3xl font-semibold tracking-tight text-cyan-400">
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="mt-1 text-xs font-normal text-slate-300">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Lead Capture Card */}
        <div className="relative lg:pl-8">
          <LeadCaptureCard />
        </div>
      </div>

      {/* Bottom Feature Ribbon */}
      <div className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-sm font-normal text-purple-100 sm:flex-row sm:px-6 lg:px-8">
          <span className="hidden font-semibold text-white sm:block">Trusted Infrastructure:</span>
          <div className="flex w-full flex-wrap justify-between gap-6 sm:w-auto sm:gap-8">
            {[
              { icon: ServerCog, text: 'Bare Metal Servers' },
              { icon: ShieldCheck, text: 'DDoS Protection' },
              { icon: Database, text: 'NVMe Storage' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5 text-white">
                <Icon size={18} className="text-purple-400" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}