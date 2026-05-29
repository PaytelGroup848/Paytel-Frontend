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
  ArrowRight,
  LayoutGrid,
  User,
  Code2,
  LayoutDashboard, // <-- newly imported
} from "lucide-react";
import { useAuthStore } from "../store/authStore";

// ========== MEGA MENU SECTIONS (unchanged) ==========
const megaMenuSections = [
  {
    title: "Create a Website",
    icon: Code,
    items: [
      {
        label: "Managed WordPress Hosting",
        href: "/wordpress-page",
        description: "Fully managed, speed‑optimized WordPress hosting with daily backups.",
      },
      {
        label: "Migrate a Website",
        href: "#",
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
        href: "#",
        description: "Optimized PHP environment with full framework support.",
      },
      {
        label: "VPS Hosting",
        href: "/vps-cloud",
        description: "Scalable virtual private servers with root access.",
      },
      {
        label: "Node.js Hosting",
        href: "/hosting/nodejs",
        description: "High‑performance Node.js hosting with PM2 and auto‑scaling.",
      },
    ],
  },
  {
    title: "Other",
    icon: Cloud,
    items: [
      {
        label: "Business Email",
        href: "#",
        description: "Professional email hosting with collaboration tools.",
      },
      {
        label: "Self Hosted",
        href: "#",
        description: "Bring your own server – we manage the infrastructure.",
      },
    ],
  },
];

const NAV_LINKS = [
  { label: "Blog", href: "/cloud-hosting-blog", icon: BookOpen },
  { label: "Contact", href: "/contact", icon: PhoneCall },
];

export default function Navbar({ logoImg = "/Cloudedata.svg" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, clearAuth } = useAuthStore();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  // 'activeDropdown' not used currently but kept for future
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [authMenuOpen, setAuthMenuOpen] = useState(false);

  const navbarRef = useRef(null);
  const megaMenuRef = useRef(null);
  // authRef no longer needed – removed to clean up

  // Hide navbar on home until scrolled past hero (unchanged)
  const [showNav, setShowNav] = useState(location.pathname !== "/");

  useEffect(() => {
    if (location.pathname !== "/") {
      setShowNav(true);
      return;
    }
    const banner = document.getElementById("hero-banner");
    if (!banner) {
      setShowNav(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setShowNav(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(banner);
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Close popup when clicking outside the modal content (unchanged)
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
      // authMenuOpen now unused – kept for safety but doesn't affect anything
      if (
        authMenuOpen &&
        !event.target.closest(".auth-button")   // no longer exists but won't break
      ) {
        setAuthMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [megaMenuOpen, authMenuOpen]);

  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/register");
  const handleDashboard = () => navigate("/dashboard");  // new handler

const handleLogout = () => {
    clearAuth();
    navigate("/");
    setMobileOpen(false);
};

  const isActive = (href) => location.pathname === href;

  // ──────────────────────────────────────────────
  // DESKTOP AUTH BUTTONS (UPDATED)
  // ──────────────────────────────────────────────
  const renderDesktopAuth = () => {
    if (isAuthenticated) {
      return (
        <div className="flex items-center gap-3">
          {/* Dashboard button */}
          <button
            onClick={handleDashboard}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl shadow-md shadow-indigo-200/50 hover:shadow-lg hover:from-indigo-700 hover:to-indigo-600 transition-all"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </button>
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-700 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-300/70 shadow-sm hover:shadow-md hover:border-red-300 hover:text-red-600 transition-all"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-3">
        <button
          onClick={handleLogin}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-700 bg-transparent rounded-xl border border-slate-300/70 shadow-sm hover:shadow-md hover:border-indigo-300 hover:text-indigo-600 transition-all"
        >
          <LogIn size={16} />
          Login
        </button>
        <button
          onClick={handleSignup}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl shadow-md shadow-indigo-200/50 hover:shadow-lg hover:from-indigo-700 hover:to-indigo-600 transition-all"
        >
          <UserPlus size={16} />
          Sign Up
        </button>
      </div>
    );
  };

  return (
    <>
      <nav
        ref={navbarRef}
        className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-20 flex items-center bg-white/80 backdrop-blur-2xl border-b border-slate-100/50 shadow-sm transition-all duration-500 ${
          showNav ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ pointerEvents: showNav ? "auto" : "none" }}
      >
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between gap-4">
            {/* Logo (unchanged) */}
            <Link to="/" className="flex items-center shrink-0 group">
              <img
                src={logoImg}
                alt="CloudeData"
                className="h-12 w-auto md:h-14 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
                onError={(e) => (e.target.style.display = "none")}
              />
            </Link>

            {/* Desktop Navigation Pill (unchanged) */}
            <div className="hidden md:block">
              <div className="relative p-[1px] rounded-full bg-gradient-to-r from-slate-200 via-indigo-200 to-slate-200 shadow-sm">
                <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1">
                  <Link
                    to="/pricing"
                    className={`flex items-center gap-1.5 px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                      isActive("/pricing")
                        ? "text-indigo-600 bg-white/60 shadow-sm"
                        : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50/80"
                    }`}
                  >
                    <IndianRupee size={15} />
                    Pricing
                  </Link>

                  {/* Services Button */}
                  <div className="relative services-button">
                    <button
                      onClick={() => setMegaMenuOpen(true)}
                      className={`flex items-center gap-1.5 px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                        megaMenuOpen
                          ? "bg-indigo-600 text-white shadow-md"
                          : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50/80"
                      }`}
                    >
                      <LayoutGrid size={15} />
                      Services
                      <ChevronDown size={13} />
                    </button>
                  </div>

                  {NAV_LINKS.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.label}
                        to={link.href}
                        className={`flex items-center gap-1.5 px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                          isActive(link.href)
                            ? "text-indigo-600 bg-white/60 shadow-sm"
                            : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50/80"
                        }`}
                      >
                        <Icon size={15} />
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Desktop Auth Buttons (now updated) */}
            <div className="hidden md:block">{renderDesktopAuth()}</div>

            {/* Mobile menu button (unchanged) */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:text-indigo-600 rounded-xl hover:bg-slate-50 transition-all"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* ========== SERVICES MODAL (unchanged) ========== */}
      <AnimatePresence>
        {megaMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-md z-50"
              onClick={() => setMegaMenuOpen(false)}
            />
            <motion.div
              ref={megaMenuRef}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-6xl max-h-[85vh] overflow-y-auto bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 z-50 p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setMegaMenuOpen(false)}
                  className="p-2 rounded-full bg-white/80 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                {megaMenuSections.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="flex items-center gap-2 text-indigo-600 font-semibold text-base pb-2 border-b border-indigo-100">
                      <section.icon size={18} />
                      {section.title}
                    </div>
                    <div className="space-y-4">
                      {section.items.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          onClick={() => setMegaMenuOpen(false)}
                          className={`block group rounded-xl p-3 transition-all ${
                            item.href === "#"
                              ? "cursor-not-allowed opacity-70 hover:bg-white/50"
                              : "hover:bg-indigo-50/60"
                          }`}
                          {...(item.href === "#" && { onClick: (e) => e.preventDefault() })}
                        >
                          <div className="font-medium text-slate-800 group-hover:text-indigo-700 text-base">
                            {item.label}
                          </div>
                          <div className="text-sm text-slate-500 group-hover:text-slate-600 mt-1 leading-relaxed">
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

      {/* Mobile Sidebar (unchanged except for auth section) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white/95 backdrop-blur-2xl shadow-xl z-50 flex flex-col overflow-y-auto md:hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <img src={logoImg} alt="CloudeData" className="h-10 w-auto" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-slate-500 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex-1 px-5 py-6 space-y-5">
                <Link
                  to="/pricing"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 py-2 text-base font-medium transition ${
                    isActive("/pricing") ? "text-indigo-600" : "text-slate-700 hover:text-indigo-600"
                  }`}
                >
                  <IndianRupee size={16} />
                  Pricing
                </Link>

                <div className="space-y-5">
                  {megaMenuSections.map((section, idx) => (
                    <div key={idx}>
                      <h4 className="text-sm font-semibold text-indigo-600 mb-2 flex items-center gap-2">
                        <section.icon size={14} />
                        {section.title}
                      </h4>
                      <div className="space-y-3 pl-6">
                        {section.items.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block text-sm text-slate-600 hover:text-indigo-600 transition"
                            {...(item.href === "#" && { onClick: (e) => e.preventDefault() })}
                          >
                            <div>{item.label}</div>
                            <div className="text-xs text-slate-400">{item.description}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {NAV_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.label}
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 py-2 text-base font-medium transition ${
                        isActive(link.href) ? "text-indigo-600" : "text-slate-700 hover:text-indigo-600"
                      }`}
                    >
                      <Icon size={16} />
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Auth Section (updated) */}
              <div className="p-5 border-t border-slate-100 space-y-3">
                {isAuthenticated ? (
                  <>
                    <div className="text-center text-sm text-slate-500 mb-2">
                      👋 {user?.name || user?.email || "User"}
                    </div>
                    {/* Dashboard button added here */}
                    <button
                      onClick={() => {
                        handleDashboard();
                        setMobileOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl shadow-md hover:shadow-lg transition-all"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-red-600 bg-white rounded-xl border border-red-200 shadow-sm hover:bg-red-50 transition-all"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        handleLogin();
                        setMobileOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-slate-700 bg-white rounded-xl border border-slate-300 shadow-sm hover:border-indigo-300 hover:text-indigo-600 transition-all"
                    >
                      <LogIn size={16} />
                      Login
                    </button>
                    <button
                      onClick={() => {
                        handleSignup();
                        setMobileOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl shadow-md hover:shadow-lg transition-all"
                    >
                      <UserPlus size={16} />
                      Sign Up
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