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
  LayoutGrid,
  LayoutDashboard,
  Phone,
  Info,
  GraduationCap,
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
        href: "#",
        description: "User‑friendly control panel with one‑click installs.",
      },
      {
        label: "PHP Hosting",
        href: "/php-hosting",
        description: "Optimized PHP environment with full framework support.",
      },
      {
        label: "VPS Hosting",
        href: "/vps",
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
        href: "/emails",
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

export default function Navbar({ logoImg = "/Cloudedata.svg" }) {
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

  const PhoneButton = ({ className = "" }) => (
    <a
      href="tel:9311472357"
      className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all ${className}`}
    >
      <Phone size={18} />
      <span className="hidden sm:inline">9311472357</span>
    </a>
  );

  return (
    <>
      {/* Professional Glass Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-blue-200/60 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo - Left – size increased */}
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

            {/* Center Navigation - Balanced */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center bg-white/90 backdrop-blur-md rounded-3xl px-3 py-1.5 shadow border border-white/70">
                
                {/* Pricing – gradient bottom border on hover */}
                <Link
                  to="/pricing"
                  className={`px-6 py-2.5 rounded-3xl text-sm font-medium transition-all relative group
                    ${isActive("/pricing") 
                      ? "text-indigo-600" 
                      : "text-slate-700 hover:text-slate-900"}`}
                >
                  <span>Pricing</span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:w-4/5 transition-all duration-300" />
                </Link>

                {/* Services Mega Menu – unchanged */}
                <div 
                  className="relative services-button" 
                  onMouseEnter={() => setMegaMenuOpen(true)}
                >
                  <button
                    className={`px-6 py-2.5 rounded-3xl text-sm font-medium flex items-center gap-1 transition-all
                      ${megaMenuOpen ? "text-indigo-600" : "text-slate-700 hover:text-slate-900"}`}
                  >
                    Services
                    <ChevronDown size={16} className={`transition-transform ${megaMenuOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>

                {/* Other Links – gradient bottom border on hover */}
                {NAV_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.label}
                      to={link.href}
                      className={`px-6 py-2.5 rounded-3xl text-sm font-medium flex items-center gap-1.5 transition-all relative group
                        ${isActive(link.href) 
                          ? "text-indigo-600" 
                          : "text-slate-700 hover:text-slate-900"}`}
                    >
                      <Icon size={17} />
                      {link.label}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:w-4/5 transition-all duration-300" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Phone + Auth */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <PhoneButton />
              </div>

              {isAuthenticated ? (
                <div className="hidden md:flex items-center gap-3">
                  <button
                    onClick={handleDashboard}
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl hover:shadow-lg transition-all"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-3">
                  <button
                    onClick={handleLogin}
                    className="px-6 py-2.5 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignup}
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl hover:shadow-lg transition-all"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
              >
                <Menu size={26} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-20"></div>

      {/* Mega Menu */}
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
              {/* Mega Menu Content (same as before) */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setMegaMenuOpen(false)}
                  className="p-2 rounded-full bg-white/80 text-slate-500 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
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

      {/* Mobile Sidebar */}
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
              className="fixed top-0 right-0 h-full w-72 sm:w-80 max-w-[85vw] bg-white/95 backdrop-blur-2xl shadow-xl z-50 flex flex-col overflow-y-auto md:hidden"
            >
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100">
                <img
                  src={logoImg}
                  alt="CloudeData"
                  className="h-9 sm:h-11 w-auto"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-slate-500 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition"
                >
                  <X size={20} className="sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="flex-1 px-4 sm:px-5 py-5 sm:py-6 space-y-4 sm:space-y-5">
                <div className="block md:hidden">
                  <PhoneButton className="w-full justify-center" />
                </div>

                <Link
                  to="/pricing"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 py-2 text-base sm:text-lg font-medium transition ${
                    isActive("/pricing")
                      ? "text-indigo-600"
                      : "text-slate-700 hover:text-indigo-600"
                  }`}
                >
                  <IndianRupee size={18} /> Pricing
                </Link>

                <div className="space-y-4 sm:space-y-5">
                  {megaMenuSections.map((section, idx) => (
                    <div key={idx}>
                      <h4 className="text-sm sm:text-base font-semibold text-indigo-600 mb-2 flex items-center gap-2">
                        <section.icon size={16} />
                        {section.title}
                      </h4>
                      <div className="space-y-2 sm:space-y-3 pl-5 sm:pl-6">
                        {section.items.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block text-sm sm:text-base text-slate-600 hover:text-indigo-600 transition"
                            {...(item.href === "#" && {
                              onClick: (e) => e.preventDefault(),
                            })}
                          >
                            <div>{item.label}</div>
                            <div className="text-xs text-slate-400">
                              {item.description}
                            </div>
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
                      className={`flex items-center gap-3 py-2 text-base sm:text-lg font-medium transition ${
                        isActive(link.href)
                          ? "text-indigo-600"
                          : "text-slate-700 hover:text-indigo-600"
                      }`}
                    >
                      <Icon size={18} /> {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="p-4 sm:p-5 border-t border-slate-100 space-y-2 sm:space-y-3">
                {isAuthenticated ? (
                  <>
                    <div className="text-center text-sm text-slate-500 mb-1 sm:mb-2">
                      👋 {user?.name || user?.email || "User"}
                    </div>
                    <button
                      onClick={() => {
                        handleDashboard();
                        setMobileOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl shadow-md hover:shadow-lg transition-all"
                    >
                      <LayoutDashboard size={18} /> Dashboard
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-red-600 bg-white rounded-xl border border-red-200 shadow-sm hover:bg-red-50 transition-all"
                    >
                      <LogOut size={18} /> Logout
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
                      <LogIn size={18} /> Login
                    </button>
                    <button
                      onClick={() => {
                        handleSignup();
                        setMobileOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl shadow-md hover:shadow-lg transition-all"
                    >
                      <UserPlus size={18} /> Sign Up
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