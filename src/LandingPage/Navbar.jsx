import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  LogOut,
  LogIn,
  UserPlus,
  Server,
  Cloud,
  Code,
  BookOpen,
  PhoneCall,
  IndianRupee,
  LayoutDashboard,
  Phone,
  Info,
  GraduationCap,
  ChevronRight,
  CloudLightning,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";

// ========== MEGA MENU SECTIONS ==========
const megaMenuSections = [
  {
    title: "Create a Website",
    icon: Code,
    items: [
      {
        label: "Managed WordPress Hosting",
        href: "/wordpress-hosting",
        description: "Fully managed, speed‑optimized WordPress hosting with daily backups.",
      },
      {
        label: "Migrate a Website",
        href: "/migrate-website",
        description: "Free, seamless migration service with zero downtime.",
      },
    ],
  },
  {
    title: "Host and Deploy",
    icon: Server,
    items: [
      {
        label: "cPanel Hosting",
        href: "/c-panel",
        description: "User‑friendly control panel with one‑click installs.",
      },
      {
        label: "PHP Hosting",
        href: "/php-hosting",
        description: "Optimized PHP environment with full framework support.",
      },
      {
        label: "VPS Hosting",
        href: "/vps-cloud",
        description: "Scalable virtual private servers with root access.",
      },
      {
        label: "Node.js Hosting",
        href: "#",
        description: "High‑performance Node.js hosting with PM2 and auto‑scaling.",
      },
    ],
  },
  {
    title: "Cloud ERP",
    icon: CloudLightning,
    items: [
      {
        label: "Busy on Cloud",
        href: "/busy-on-cloud",
        description: "Run Busy accounting software on high-performance cloud servers.",
      },
      {
        label: "Marg on Cloud",
        href: "/marg-on-cloud",
        description: "Secure Marg ERP access from anywhere with multi-user support.",
      },
      {
        label: "Tally on Cloud",
        href: "/tally-on-cloud",
        description: "TallyPrime on cloud with auto backup & bank-grade security.",
      },
    ],
  },
  {
    title: "Other",
    icon: Cloud,
    items: [
      {
        label: "Business Email",
        href: "/emails/plan",
        description: "Professional email hosting with collaboration tools.",
      },
      {
        label: "Self Hosted",
        href: "#",
        description: "Bring your own server – we manage the infrastructure.",
      },
    ],
  },
  {
    title: "Softwares",
    icon: GraduationCap,
    items: [
      {
        label: "Education Management",
        href: "/education-management-system",
        description: "Complete LMS & school management solutions.",
      },
      {
        label: "Restaurant Management",
        href: "/restaurant-management-system",
        description: "All‑in‑one restaurant POS & management system.",
      },
    ],
  },
];

const NAV_LINKS = [
  { label: "About Us", href: "/about-us", icon: Info },
  { label: "Blog", href: "/cloud-hosting-blog", icon: BookOpen },
  { label: "Contact", href: "/contact", icon: PhoneCall },
];

export default function Navbar({ logoImg = "/Cloudedata.svg", phoneNumber = "9311472357" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, clearAuth } = useAuthStore();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const megaMenuRef = useRef(null);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        megaMenuOpen &&
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target) &&
        !event.target.closest(".services-button")
      ) {
        setMegaMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [megaMenuOpen]);

  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/register");
  const handleDashboard = () => navigate("/home");
  const handleLogout = () => {
    clearAuth();
    navigate("/");
    setMobileOpen(false);
  };

  const isActive = (href) => location.pathname === href;

  // Phone button (desktop – number on sm+; mobile me forceShow = true)
  const PhoneButton = ({ className = "", forceShow = false }) => (
    <a
      href={`tel:${phoneNumber}`}
      className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all active:scale-95 ${className} ${
        forceShow ? "justify-center" : ""
      }`}
    >
      <Phone size={18} />
      <span className={`${forceShow ? "inline" : "hidden sm:inline"}`}>{phoneNumber}</span>
    </a>
  );

  return (
    <>
      {/* ========== DESKTOP NAVBAR ========== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-blue-200/60 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={logoImg}
                alt="CloudeData"
                className="h-10 lg:h-12 w-auto transition-transform hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/Cloudedata.svg";
                }}
              />
            </Link>

            {/* Desktop Center Navigation */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center bg-white/90 backdrop-blur-md rounded-3xl px-3 py-1.5 shadow border border-white/70">
                {/* Pricing */}
                <Link
                  to="/pricing"
                  className={`px-6 py-2.5 rounded-3xl text-sm font-medium transition-all relative group ${
                    isActive("/pricing") ? "text-indigo-600" : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  <span>Pricing</span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:w-4/5 transition-all duration-300" />
                </Link>

                {/* Services Mega Menu Trigger */}
                <div
                  className="relative services-button"
                  onMouseEnter={() => setMegaMenuOpen(true)}
                >
                  <button
                    className={`px-6 py-2.5 rounded-3xl text-sm font-medium flex items-center gap-1 transition-all ${
                      megaMenuOpen ? "text-indigo-600" : "text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    Services
                    <ChevronDown size={16} className={`transition-transform ${megaMenuOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>

                {/* Other Nav Links */}
                {NAV_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.label}
                      to={link.href}
                      className={`px-6 py-2.5 rounded-3xl text-sm font-medium flex items-center gap-1.5 transition-all relative group ${
                        isActive(link.href) ? "text-indigo-600" : "text-slate-700 hover:text-slate-900"
                      }`}
                    >
                      <Icon size={17} />
                      {link.label}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:w-4/5 transition-all duration-300" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right Side – Phone + Auth */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:block">
                <PhoneButton />
              </div>

              {isAuthenticated ? (
                <div className="hidden lg:flex items-center gap-3">
                  <button
                    onClick={handleDashboard}
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl hover:shadow-lg transition-all active:scale-95"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-200 active:scale-95"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-3">
                  <button
                    onClick={handleLogin}
                    className="px-6 py-2.5 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignup}
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl hover:shadow-lg transition-all active:scale-95"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-all active:scale-95"
              >
                <Menu size={26} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ========== DESKTOP MEGA MENU OVERLAY ========== */}
      <AnimatePresence>
        {megaMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-md z-50"
              onClick={() => setMegaMenuOpen(false)}
            />
            <motion.div
              ref={megaMenuRef}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-6xl max-h-[85vh] overflow-y-auto bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 z-50 p-6 md:p-8"
              onMouseLeave={() => setMegaMenuOpen(false)}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setMegaMenuOpen(false)}
                  className="p-2 rounded-full bg-white/80 text-slate-500 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mt-6">
                {megaMenuSections.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="flex items-center gap-2 text-indigo-600 font-semibold pb-3 border-b border-indigo-100">
                      <section.icon size={20} />
                      {section.title}
                    </div>
                    <div className="space-y-4">
                      {section.items.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          onClick={() => setMegaMenuOpen(false)}
                          className="block group rounded-2xl p-3 hover:bg-indigo-50/70 transition-all"
                          {...(item.href === "#" && { onClick: (e) => e.preventDefault() })}
                        >
                          <div className="font-medium text-slate-800 group-hover:text-indigo-700">
                            {item.label}
                          </div>
                          <div className="text-sm text-slate-500 mt-1">
                            {item.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ========== MOBILE SIDEBAR ========== */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-black/70 to-slate-900/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Sidebar panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[90vw] bg-white/95 backdrop-blur-2xl shadow-2xl flex flex-col border-l border-white/50"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-white">
                <img
                  src={logoImg}
                  alt="CloudeData"
                  className="h-9 w-auto"
                  onError={(e) => { e.target.src = "/Cloudedata.svg"; }}
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-full bg-white/80 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm active:scale-95"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
                {/* Phone number – always visible, full width */}
                <PhoneButton className="w-full" forceShow />

                {/* Pricing */}
                <Link
                  to="/pricing"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 py-3 text-lg font-semibold transition-colors rounded-xl px-4 ${
                    isActive("/pricing")
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-slate-800 hover:text-indigo-600 hover:bg-slate-50"
                  }`}
                >
                  <IndianRupee size={22} /> Pricing
                </Link>

                {/* Mega sections – cards with highlights */}
                <div className="space-y-5">
                  {megaMenuSections.map((section, idx) => (
                    <div key={idx}>
                      <div className="flex items-center gap-2.5 text-indigo-600 font-semibold mb-3 px-1">
                        <section.icon size={18} />
                        <span className="text-sm uppercase tracking-wider">{section.title}</span>
                      </div>
                      <div className="space-y-1.5">
                        {section.items.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between gap-3 py-3.5 px-4 rounded-xl transition-all border border-transparent hover:border-indigo-100 hover:bg-indigo-50/70 active:scale-[0.98] shadow-sm hover:shadow-md group"
                            {...(item.href === "#" && { onClick: (e) => e.preventDefault() })}
                          >
                            <div className="min-w-0">
                              <p className="text-base font-semibold text-slate-800 group-hover:text-indigo-700 truncate">
                                {item.label}
                              </p>
                              <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                                {item.description}
                              </p>
                            </div>
                            <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-500 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional nav links */}
                <div className="space-y-1">
                  {NAV_LINKS.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.label}
                        to={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 py-3.5 px-4 text-lg font-medium transition-all rounded-xl ${
                          isActive(link.href)
                            ? "text-indigo-600 bg-indigo-50"
                            : "text-slate-800 hover:text-indigo-600 hover:bg-slate-50"
                        }`}
                      >
                        <Icon size={20} /> {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Auth footer */}
              <div className="px-5 py-5 border-t border-slate-100 bg-gradient-to-b from-white to-slate-50/50 space-y-3">
                {isAuthenticated ? (
                  <>
                    <div className="text-center text-sm text-slate-500 font-medium">
                       {user?.name || user?.email || "User"}
                    </div>
                    <button
                      onClick={() => { handleDashboard(); setMobileOpen(false); }}
                      className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all"
                    >
                      <LayoutDashboard size={18} /> Dashboard
                    </button>
                    <button
                      onClick={() => { handleLogout(); setMobileOpen(false); }}
                      className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-semibold text-rose-600 bg-rose-50/80 rounded-xl border border-rose-200 hover:bg-rose-100 active:scale-95 transition-all"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => { handleLogin(); setMobileOpen(false); }}
                      className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-semibold text-slate-700 bg-white rounded-xl border border-slate-300 shadow-sm hover:border-indigo-300 hover:text-indigo-600 active:scale-95 transition-all"
                    >
                      <LogIn size={18} /> Login
                    </button>
                    <button
                      onClick={() => { handleSignup(); setMobileOpen(false); }}
                      className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all"
                    >
                      <UserPlus size={18} /> Sign Up
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}