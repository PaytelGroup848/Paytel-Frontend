import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  Database,
  HardDrive,
  LockKeyhole,
  Menu,
  Network,
  ServerCog,
  ShieldCheck,
  X,
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'Products', href: '#products' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
];

const STATS = [
  { value: 99.99, suffix: '%', label: 'Uptime SLA' },
  { value: 12, suffix: 'K+', label: 'Active Users' },
  { value: 8, suffix: 'ms', label: 'Avg Latency' },
];

const BENEFITS = [
  'Secure cloud servers',
  'Application hosting',
  'Managed backups',
  'Firewall protection',
];

const CLOUD_LAYERS = [
  { title: 'Compute', detail: 'High-performance cloud servers', icon: ServerCog },
  { title: 'Storage', detail: 'Backup-ready business data', icon: HardDrive },
  { title: 'Network', detail: 'Reliable low-latency access', icon: Network },
  { title: 'Security', detail: 'Protected cloud environment', icon: LockKeyhole },
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
    const duration = 1100;

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

function CloudServiceVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.25, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-xl lg:-mt-8 lg:mx-0 lg:max-w-none"
    >
      <div className="absolute -inset-6 rounded-[2rem] bg-blue-500/20 blur-3xl" />

      <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.08] p-4 shadow-[0_34px_100px_rgba(2,8,23,0.48)] backdrop-blur-xl sm:p-5">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />

        <div className="rounded-[1.5rem] bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(15,23,42,0.48),rgba(30,64,175,0.28),rgba(8,47,73,0.48))] p-5 ring-1 ring-white/10 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-700 dark:text-cyan-200">
                Cloudedata Platform
              </p>
              <h3 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                Cloud services built for modern teams
              </h3>
            </div>
            <div className="rounded-2xl bg-white/10 p-3 text-cyan-100 ring-1 ring-white/10">
              <Cloud size={28} />
            </div>
          </div>

          <div className="relative mt-8 rounded-[1.5rem] bg-slate-950/30 p-5 ring-1 ring-white/10">
            <div className="absolute left-1/2 top-8 h-[72%] w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300/0 via-cyan-300/50 to-cyan-300/0" />
            <div className="absolute left-10 right-10 top-1/2 h-px bg-gradient-to-r from-cyan-300/0 via-cyan-300/45 to-cyan-300/0" />

            <div className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-blue-500/20 ring-1 ring-cyan-200/25 sm:h-40 sm:w-40">
              <div className="absolute inset-4 rounded-full border border-cyan-200/20" />
              <div className="absolute inset-8 rounded-full border border-cyan-200/20" />
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-[0_18px_48px_rgba(14,165,233,0.24)] sm:h-20 sm:w-20">
                <Cloud size={36} />
              </div>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {CLOUD_LAYERS.map(({ title, detail, icon: Icon }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + index * 0.08, duration: 0.45 }}
                  className="rounded-2xl bg-white/[0.09] p-4 ring-1 ring-white/10"
                >
                  <Icon size={20} className="text-cyan-200" />
                  <p className="mt-3 text-sm font-extrabold text-white">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-300">{detail}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-2xl bg-white/[0.08] ring-1 ring-white/10">
            {[
              { label: 'Servers', value: 'Cloud' },
              { label: 'Security', value: 'Managed' },
              { label: 'Support', value: 'Expert' },
            ].map((item, index) => (
              <div
                key={item.label}
                className={`p-3 text-center ${index > 0 ? 'border-l border-white/10' : ''}`}
              >
                <p className="text-sm font-extrabold text-white sm:text-base">{item.value}</p>
                <p className="mt-1 text-[10px] font-bold uppercase text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Banner() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [activeHref, setActiveHref] = useState('#products');

  useEffect(() => {
    const updateFromHash = () => {
      if (window.location.hash) {
        setActiveHref(window.location.hash);
      }
    };

    updateFromHash();
    window.addEventListener('hashchange', updateFromHash);

    const sections = NAV_LINKS
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    if (!sections.length) {
      return () => window.removeEventListener('hashchange', updateFromHash);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      { threshold: [0.25, 0.45, 0.65] }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('hashchange', updateFromHash);
      observer.disconnect();
    };
  }, []);

  const closeMenu = () => setMobileOpen(false);

  return (
    <section
      id="hero-banner"
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50 text-slate-900"
    >
      {/* Background gradients – light and soft */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute right-0 top-24 h-[420px] w-[420px] rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent" />
      </div>

      <motion.nav
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 top-4 z-30 px-4 sm:top-6 sm:px-6 lg:px-8"
      >
        <div className="relative mx-auto h-16 w-full max-w-7xl overflow-hidden rounded-2xl border border-slate-200/60 bg-white/60 shadow-lg backdrop-blur-xl">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.3)_0%,rgba(59,130,246,0.08)_35%,rgba(14,165,233,0.05)_65%,rgba(255,255,255,0.2)_100%)]"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            style={{ backgroundSize: '220% 220%' }}
          />

          <div className="relative flex h-full items-center justify-between gap-3 px-4 sm:px-5">
            <a href="#hero-banner" onClick={closeMenu} className="flex min-w-0 items-center gap-3">
              {!logoFailed ? (
                <img
                  src="/Cloudedata.svg"
                  alt="Cloudedata"
                  className="h-8 w-auto shrink-0 object-contain"
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                <span className="text-lg font-extrabold tracking-normal text-slate-800">Cloudedata</span>
              )}
            </a>

            <div className="hidden items-center gap-1 rounded-2xl bg-slate-100/50 p-1 md:flex">
              {NAV_LINKS.map((link) => {
                const isActive = activeHref === link.href;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setActiveHref(link.href)}
                    className={`relative rounded-xl px-4 py-2 text-sm font-bold transition ${
                      isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-xl bg-white shadow-md ring-1 ring-slate-200"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                );
              })}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="#login"
                className="hidden text-sm font-bold text-slate-600 transition hover:text-slate-900 md:inline"
              >
                Login
              </a>

              <motion.a
                href="#demo"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex min-h-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 text-sm font-extrabold text-white shadow-md transition hover:shadow-lg sm:px-5"
              >
                Book Demo
              </motion.a>

              <button
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/60 text-slate-700 md:hidden"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mx-auto mt-3 w-full max-w-7xl rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur-xl md:hidden"
            >
              <div className="grid gap-2">
                {NAV_LINKS.map((link) => {
                  const isActive = activeHref === link.href;

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => {
                        setActiveHref(link.href);
                        closeMenu();
                      }}
                      className={`rounded-xl px-3 py-3 text-sm font-bold transition ${
                        isActive
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}

                <a
                  href="#login"
                  onClick={closeMenu}
                  className="rounded-xl px-3 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
                >
                  Login
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-7xl items-center gap-10 px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0"
        >
          <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1.5 text-xs font-bold uppercase text-blue-700">
            <Cloud size={15} className="shrink-0" />
            <span className="truncate">Enterprise cloud infrastructure</span>
          </div>

          <p className="mb-4 max-w-xl text-sm font-extrabold uppercase tracking-[0.18em] text-blue-600">
            Cloud services for growing businesses
          </p>

          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-normal text-slate-900 sm:text-5xl lg:text-6xl">
            Build faster, host smarter and scale your business on Cloudedata
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Cloudedata helps you deploy cloud servers, host business applications, secure data
            and support teams with infrastructure designed for speed, resilience and control.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {BENEFITS.map((benefit) => (
              <div key={benefit} className="flex min-w-0 items-center gap-2 text-sm font-bold text-slate-700">
                <CheckCircle2 size={17} className="shrink-0 text-blue-600" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#demo"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 text-sm font-extrabold text-white shadow-md transition hover:shadow-lg"
            >
              Start Free Trial
              <ArrowRight size={17} />
            </a>

            <a
              href="#pricing"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white/70 px-6 text-sm font-extrabold text-slate-700 transition hover:bg-white"
            >
              View Pricing
            </a>
          </div>

          <div className="mt-8 sm:mt-10">
            <div className="flex flex-wrap items-end gap-x-3">
              <p className="w-full text-xs font-extrabold uppercase tracking-[0.16em] text-blue-600">
                Starting from
              </p>
              <p className="text-4xl font-extrabold tracking-normal text-slate-900 sm:text-5xl">
                Rs. 290
                <span className="text-base font-bold text-slate-500"> /user/month</span>
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 overflow-hidden rounded-2xl border border-slate-200 bg-white/60 backdrop-blur-sm">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={`min-w-0 p-3 text-center sm:p-4 ${index > 0 ? 'border-l border-slate-200' : ''}`}
              >
                <p className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <CloudServiceVisual />
      </div>

      <div className="relative z-10 border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 py-4 text-sm font-bold text-slate-700 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { icon: ServerCog, text: 'Cloud server deployment' },
            { icon: ShieldCheck, text: 'Security and firewall options' },
            { icon: Database, text: 'Backup-ready storage' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon size={17} className="text-blue-600" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}