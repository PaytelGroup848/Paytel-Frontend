import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, Menu, X, User, LogOut, LogIn, UserPlus, Bell,
  Globe, Server, Cloud, Code, Monitor, BookOpen, PhoneCall,
  IndianRupee, ArrowRight, Sparkles,
} from "lucide-react";

/* ── Mega menu (Services) – Hosting items now included here ── */
const megaMenuSections = [
  {
    title: "Create Website",
    icon: Globe,
    items: [
      { label: "Migrate Website", href: "/migrate" },
      { label: "Managed WordPress Hosting", href: "/hosting/wordpress" },
    ],
  },
  {
    title: "Host & Deploy",
    icon: Server,
    items: [
       { label: "WordPress Hosting", href: "/website/wordpress" },
      { label: "Node.js", href: "/hosting/nodejs" },
      { label: "cPanel Hosting", href: "/hosting/cpanel" },
    
    ],
  },
  {
    title: "Accounting ERP on Cloud",
    icon: Cloud,
    items: [
      { label: "Busy on Cloud", href: "/Busy-on-cloud" },
      { label: "Tally on Cloud", href: "/Tally-on-cloud" },
      { label: "Marg on Cloud", href: "/Marg-on-cloud" },
      {label : "Vps on Cloud" , href : "/vps-on-cloud"}
    ],
  },
];

/* ── Software CRM dropdown ──────────────────────── */
const softwareCRMItems = [
  { label: "Education ERP", href: "/education-management-system" },
  { label: "Restaurant Management ERP", href: "/software/restaurant-erp" },
];

/* ── Remaining nav links (NO more Hosting) ─────── */
const NAV_LINKS = [
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "Contact Us", href: "/contact", icon: PhoneCall },
];

export default function Navbar({
  isLoggedIn = false,
  notifications = 0,
  logoImg = "/Cloudedata.svg",
  onLogin = () => {},
  onLogout = () => {},
  onRegister = () => {},
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // ── Hide on home page until scroll past hero banner ──
  const [showNav, setShowNav] = useState(window.location.pathname !== "/");

  useEffect(() => {
    // If not home page, always show the navbar
    if (window.location.pathname !== "/") {
      setShowNav(true);
      return;
    }

    const banner = document.getElementById("hero-banner");
    if (!banner) {
      setShowNav(true); // Fallback if banner missing
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide navbar while banner is in viewport, show when scrolled past
        setShowNav(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(banner);
    return () => observer.disconnect();
  }, []);

  const renderDropdown = (items) => (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/60 shadow-xl shadow-slate-200/30 p-2 min-w-[200px]">
        {items.map((sub) => (
          <a
            key={sub.label}
            href={sub.href}
            onClick={() => setActiveDropdown(null)}
            className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
          >
            {sub.label}
            <ArrowRight size={14} className="text-slate-400" />
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-[4.5rem] flex items-center bg-gradient-to-r from-white via-blue-50/80 to-white backdrop-blur-xl border-b border-slate-100/50 shadow-sm transition-all duration-300`}
        style={{
          opacity: showNav ? 1 : 0,
          pointerEvents: showNav ? "auto" : "none",
        }}
        aria-hidden={!showNav}
      >
        {/* unchanged children */}
      
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <a href="/" className="flex items-center shrink-0 group">
              <img
                src={logoImg}
                alt="CloudeData"
                className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
                onError={(e) => (e.target.style.display = "none")}
              />
            </a>

            {/* Desktop Center Pill – polished UI */}
            <div className="hidden md:block">
              <div className="relative p-[1.5px] rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-500 shadow-xl shadow-indigo-200/40">
                <div className="flex items-center gap-1 bg-white/90 backdrop-blur-lg rounded-full px-3 py-2 shadow-inner">
                  {/* Pricing */}
                  <a
                    href="/pricing"
                    className="flex items-center gap-1.5 px-5 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 rounded-full hover:bg-white/90 transition-all"
                  >
                    <IndianRupee size={15} />
                    Pricing
                  </a>

                  {/* Software CRM */}
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown("Software CRM")}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`flex items-center gap-1.5 px-5 py-2 text-sm font-semibold rounded-full transition-all ${
                        activeDropdown === "Software CRM"
                          ? "text-indigo-600 bg-white/90 shadow-sm"
                          : "text-slate-700 hover:text-indigo-600 hover:bg-white/90"
                      }`}
                    >
                      <Code size={16} />
                      Software CRM
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${
                          activeDropdown === "Software CRM" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === "Software CRM" &&
                        renderDropdown(softwareCRMItems)}
                    </AnimatePresence>
                  </div>

                  {/* Services (mega menu) – contains all Hosting items now */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setMegaMenuOpen(!megaMenuOpen);
                        setActiveDropdown(null);
                      }}
                      className={`flex items-center gap-1.5 px-5 py-2 text-sm font-semibold rounded-full transition-all ${
                        megaMenuOpen
                          ? "bg-indigo-600 text-white shadow-md"
                          : "text-slate-700 hover:text-indigo-600 hover:bg-white/90"
                      }`}
                    >
                      <Server size={16} />
                      Services
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${megaMenuOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {megaMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[1050px] max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-2xl shadow-indigo-200/30 overflow-hidden z-50"
                        >
                          <div className="grid grid-cols-4 gap-8 p-8">
                            {megaMenuSections.map((section, idx) => (
                              <div key={idx} className="space-y-4">
                                <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                                  <section.icon size={20} />
                                  {section.title}
                                </div>
                                <div className="space-y-2">
                                  {section.items.map((item) => (
                                    <a
                                      key={item.label}
                                      href={item.href}
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="block text-sm text-slate-600 hover:text-indigo-600 transition-colors py-2 rounded-lg hover:bg-indigo-50/70 px-2"
                                    >
                                      {item.label}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            ))}
                            {/* Promo Banner */}
                            <div className="relative bg-gradient-to-br from-indigo-500 to-purple-700 rounded-2xl p-6 flex flex-col justify-between overflow-hidden shadow-xl">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
                              <h3 className="text-white font-extrabold text-xl leading-tight mb-2">
                                Free Cloud Assessment
                              </h3>
                              <p className="text-indigo-200 text-sm leading-relaxed mb-6">
                                Get a custom roadmap for your cloud infrastructure.
                              </p>
                              <a
                                href="#"
                                onClick={() => setMegaMenuOpen(false)}
                                className="inline-flex items-center gap-2 bg-white/20 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-white/30 transition-all"
                              >
                                Book now
                                <ArrowRight size={16} />
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Blog & Contact (no Hosting) */}
                  {NAV_LINKS.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        className="flex items-center gap-1.5 px-5 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 rounded-full hover:bg-white/90 transition-all"
                      >
                        <Icon size={16} />
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="hidden md:flex items-center gap-3">
              <button className="relative p-2 text-slate-500 hover:text-indigo-600 rounded-full hover:bg-white/50 transition group">
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white ring-2 ring-white animate-pulse">
                    {notifications}
                  </span>
                )}
              </button>

              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-white/60 transition group"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 p-[2px] shadow-md group-hover:shadow-lg transition-shadow">
                    <div className="w-full h-full rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm">
                      <User size={18} className="text-blue-700" />
                    </div>
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-3 w-48 bg-white/90 backdrop-blur-lg rounded-2xl border border-slate-200/70 shadow-xl shadow-slate-200/40 p-2 z-50">
                    {isLoggedIn ? (
                      <button
                        onClick={() => {
                          onLogout();
                          setProfileOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            onLogin();
                            setProfileOpen(false);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-indigo-50 rounded-xl transition"
                        >
                          <LogIn size={16} />
                          Login
                        </button>
                        <button
                          onClick={() => {
                            onRegister();
                            setProfileOpen(false);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-md mt-1 transition-all"
                        >
                          <UserPlus size={16} />
                          Register
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:text-indigo-600 rounded-xl hover:bg-white/60 transition"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar – unchanged */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white/95 backdrop-blur-xl shadow-2xl z-50 flex flex-col overflow-y-auto md:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <span className="font-bold text-lg text-indigo-600">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-slate-500 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 px-4 py-6 space-y-4">
                <a
                  href="/pricing"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 py-2 text-base font-semibold text-slate-700 hover:text-indigo-600 transition"
                >
                  <IndianRupee size={18} />
                  Pricing
                </a>

                <div className="border-t border-slate-200 pt-4">
                  <h4 className="text-sm font-bold text-indigo-600 mb-2 flex items-center gap-2">
                    <Code size={16} />
                    Software CRM
                  </h4>
                  <div className="space-y-1 pl-6">
                    {softwareCRMItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-sm text-slate-600 hover:text-indigo-600 transition py-1"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Services (includes Hosting items now) */}
                <div className="border-t border-slate-200 pt-4 space-y-4">
                  {megaMenuSections.map((section, idx) => (
                    <div key={idx}>
                      <h4 className="text-sm font-bold text-indigo-600 mb-2 flex items-center gap-2">
                        <section.icon size={16} />
                        {section.title}
                      </h4>
                      <div className="space-y-1 pl-6">
                        {section.items.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block text-sm text-slate-600 hover:text-indigo-600 transition py-1"
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href="/blog"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 py-2 text-base font-semibold text-slate-700 hover:text-indigo-600 transition"
                >
                  <BookOpen size={18} />
                  Blog
                </a>
                <a
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 py-2 text-base font-semibold text-slate-700 hover:text-indigo-600 transition"
                >
                  <PhoneCall size={18} />
                  Contact Us
                </a>
              </div>

              <div className="p-4 border-t border-slate-200 space-y-3">
                <button className="flex items-center gap-3 w-full py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 transition">
                  <Bell size={18} />
                  Notifications
                  {notifications > 0 && (
                    <span className="ml-auto bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {notifications}
                    </span>
                  )}
                </button>
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-3 w-full py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        onLogin();
                        setMobileOpen(false);
                      }}
                      className="flex items-center gap-3 w-full py-2 text-sm font-medium text-slate-700 hover:bg-indigo-50 rounded-lg transition"
                    >
                      <LogIn size={18} />
                      Login
                    </button>
                    <button
                      onClick={() => {
                        onRegister();
                        setMobileOpen(false);
                      }}
                      className="flex items-center gap-3 w-full py-2 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md"
                    >
                      <UserPlus size={18} />
                      Register
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}