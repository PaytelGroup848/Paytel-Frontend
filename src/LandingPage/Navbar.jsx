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

const LOGO_FALLBACKS = [
  "/Cloudedata.svg",
  "/cloudedata.svg",
  "/Cloudedata.png",
  "/cloudedata.png",
  "/logo.svg",
  "/logo.png",
];

const megaMenuSections = [
  {
    title: "Create a Website",
    icon: Code,
    items: [
      {
        label: "Managed WordPress Hosting",
        href: "/wordpress-hosting",
        description:
          "Fully managed, speed-optimized WordPress hosting with daily backups.",
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
        description: "User-friendly control panel with one-click installs.",
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
        description:
          "High-performance Node.js hosting with PM2 and auto-scaling.",
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
        description:
          "Run Busy accounting software on high-performance cloud servers.",
      },
      {
        label: "Marg on Cloud",
        href: "/marg-on-cloud",
        description:
          "Secure Marg ERP access from anywhere with multi-user support.",
      },
      {
        label: "Tally on Cloud",
        href: "/tally-on-cloud",
        description:
          "TallyPrime on cloud with auto backup and bank-grade security.",
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
        description: "Bring your own server. We manage the infrastructure.",
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
        description: "Complete LMS and school management solutions.",
      },
      {
        label: "Restaurant Management",
        href: "/restaurant-management-system",
        description: "All-in-one restaurant POS and management system.",
      },
    ],
  },
];

const NAV_LINKS = [
  { label: "About Us", href: "/about-us", icon: Info },
  { label: "Blog", href: "/cloud-hosting-blog", icon: BookOpen },
  { label: "Contact", href: "/contact", icon: PhoneCall },
];

function LogoImage({ logoImg = LOGO_FALLBACKS[0], className = "" }) {
  const [srcIndex, setSrcIndex] = useState(0);
  const sources = [logoImg, ...LOGO_FALLBACKS.filter((src) => src !== logoImg)];

  return (
    <img
      src={sources[srcIndex]}
      alt="CloudeData"
      className={className}
      onError={() => {
        setSrcIndex((index) => Math.min(index + 1, sources.length - 1));
      }}
    />
  );
}

export default function Navbar({
  logoImg = "/Cloudedata.svg",
  phoneNumber = "9311472357",
}) {
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

  const PhoneButton = ({ className = "", forceShow = false }) => (
    <a
      href={`tel:${phoneNumber}`}
      className={`flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl active:scale-95 ${className} ${
        forceShow ? "justify-center" : ""
      }`}
    >
      <Phone size={18} />
      <span className={`${forceShow ? "inline" : "hidden sm:inline"}`}>
        {phoneNumber}
      </span>
    </a>
  );

  return (
    <>
      {/* Top Navbar – hidden when mobile menu is open */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 border-b border-blue-200/60 bg-white/70 shadow-sm backdrop-blur-2xl transition-all ${
          mobileOpen ? "hidden" : ""
        }`}
      >
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          <div className="flex h-20 items-center justify-between">
            <Link to="/" className="flex flex-shrink-0 items-center">
              <img
                src="/Cloudedata.svg"
                style={{
                  height: "48px",
                  marginTop: "15px",
                  marginLeft: "20px",
                }}
                alt="Cloudedata"
              />
            </Link>

            <div className="hidden items-center lg:flex">
              <div className="flex items-center rounded-3xl border border-white/70 bg-white/90 px-3 py-1.5 shadow backdrop-blur-md">
                <Link
                  to="/pricing"
                  className={`group relative rounded-3xl px-6 py-2.5 text-sm font-medium transition-all ${
                    isActive("/pricing")
                      ? "text-indigo-600"
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  <span>Pricing</span>
                  <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 group-hover:w-4/5" />
                </Link>

                <div
                  className="services-button relative"
                  onMouseEnter={() => setMegaMenuOpen(true)}
                >
                  <button
                    className={`flex items-center gap-1 rounded-3xl px-6 py-2.5 text-sm font-medium transition-all ${
                      megaMenuOpen
                        ? "text-indigo-600"
                        : "text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    Services
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${megaMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>

                {NAV_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.label}
                      to={link.href}
                      className={`group relative flex items-center gap-1.5 rounded-3xl px-6 py-2.5 text-sm font-medium transition-all ${
                        isActive(link.href)
                          ? "text-indigo-600"
                          : "text-slate-700 hover:text-slate-900"
                      }`}
                    >
                      <Icon size={17} />
                      {link.label}
                      <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 group-hover:w-4/5" />
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden lg:block">
                <PhoneButton />
              </div>

              {isAuthenticated ? (
                <div className="hidden items-center gap-3 lg:flex">
                  <button
                    onClick={handleDashboard}
                    className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg active:scale-95"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="rounded-2xl border border-transparent px-6 py-2.5 text-sm font-medium text-red-600 transition-all hover:border-red-200 hover:bg-red-50 active:scale-95"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="hidden items-center gap-3 lg:flex">
                  <button
                    onClick={handleLogin}
                    className="rounded-2xl px-6 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-indigo-50 hover:text-indigo-600 active:scale-95"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignup}
                    className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg active:scale-95"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              <button
                onClick={() => setMobileOpen(true)}
                className="rounded-xl p-2 text-slate-700 transition-all hover:bg-slate-100 active:scale-95 lg:hidden"
                aria-label="Open menu"
              >
                <Menu size={26} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mega Menu (Desktop) */}
      <AnimatePresence>
        {megaMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md"
              onClick={() => setMegaMenuOpen(false)}
            />
            <motion.div
              ref={megaMenuRef}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[95vw] max-w-6xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-white/60 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl md:p-8"
              onMouseLeave={() => setMegaMenuOpen(false)}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute right-4 top-4 z-10">
                <button
                  onClick={() => setMegaMenuOpen(false)}
                  className="rounded-full bg-white/80 p-2 text-slate-500 hover:bg-slate-100"
                  aria-label="Close services menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
                {megaMenuSections.map((section) => (
                  <div key={section.title} className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-indigo-100 pb-3 font-semibold text-indigo-600">
                      <section.icon size={20} />
                      {section.title}
                    </div>
                    <div className="space-y-4">
                      {section.items.map((item) =>
                        item.href === "#" ? (
                          <button
                            key={item.label}
                            type="button"
                            className="block w-full rounded-2xl p-3 text-left transition-all hover:bg-indigo-50/70"
                          >
                            <div className="font-medium text-slate-800">
                              {item.label}
                            </div>
                            <div className="mt-1 text-sm text-slate-500">
                              {item.description}
                            </div>
                          </button>
                        ) : (
                          <Link
                            key={item.label}
                            to={item.href}
                            onClick={() => setMegaMenuOpen(false)}
                            className="group block rounded-2xl p-3 transition-all hover:bg-indigo-50/70"
                          >
                            <div className="font-medium text-slate-800 group-hover:text-indigo-700">
                              {item.label}
                            </div>
                            <div className="mt-1 text-sm text-slate-500">
                              {item.description}
                            </div>
                          </Link>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar – with better spacing for the X button */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-black/70 to-slate-900/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute bottom-0 right-0 top-0 flex w-80 max-w-[90vw] flex-col border-l border-white/50 bg-white/95 shadow-2xl backdrop-blur-2xl"
            >
              {/* Header with logo and close button – extra right margin for X */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-white px-5 py-4 pr-3">
                <LogoImage
                  logoImg={logoImg}
                  className="block h-9 w-auto max-w-[75%] object-contain"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full bg-white/80 p-2 text-slate-500 shadow-sm transition-all hover:bg-indigo-50 hover:text-indigo-600 active:scale-95 ml-2 mr-1"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
                <PhoneButton className="w-full" forceShow />

                <Link
                  to="/pricing"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-lg font-semibold transition-colors ${
                    isActive("/pricing")
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-800 hover:bg-slate-50 hover:text-indigo-600"
                  }`}
                >
                  <IndianRupee size={22} /> Pricing
                </Link>

                <div className="space-y-5">
                  {megaMenuSections.map((section) => (
                    <div key={section.title}>
                      <div className="mb-3 flex items-center gap-2.5 px-1 font-semibold text-indigo-600">
                        <section.icon size={18} />
                        <span className="text-sm uppercase tracking-wider">
                          {section.title}
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {section.items.map((item) =>
                          item.href === "#" ? (
                            <button
                              key={item.label}
                              type="button"
                              className="group flex w-full items-center justify-between gap-3 rounded-xl border border-transparent px-4 py-3.5 text-left shadow-sm transition-all hover:border-indigo-100 hover:bg-indigo-50/70 hover:shadow-md active:scale-[0.98]"
                            >
                              <div className="min-w-0">
                                <p className="truncate text-base font-semibold text-slate-800 group-hover:text-indigo-700">
                                  {item.label}
                                </p>
                                <p className="mt-0.5 line-clamp-1 text-xs text-slate-400">
                                  {item.description}
                                </p>
                              </div>
                              <ChevronRight
                                size={18}
                                className="flex-shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-indigo-500"
                              />
                            </button>
                          ) : (
                            <Link
                              key={item.label}
                              to={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="group flex items-center justify-between gap-3 rounded-xl border border-transparent px-4 py-3.5 shadow-sm transition-all hover:border-indigo-100 hover:bg-indigo-50/70 hover:shadow-md active:scale-[0.98]"
                            >
                              <div className="min-w-0">
                                <p className="truncate text-base font-semibold text-slate-800 group-hover:text-indigo-700">
                                  {item.label}
                                </p>
                                <p className="mt-0.5 line-clamp-1 text-xs text-slate-400">
                                  {item.description}
                                </p>
                              </div>
                              <ChevronRight
                                size={18}
                                className="flex-shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-indigo-500"
                              />
                            </Link>
                          ),
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-1">
                  {NAV_LINKS.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.label}
                        to={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-lg font-medium transition-all ${
                          isActive(link.href)
                            ? "bg-indigo-50 text-indigo-600"
                            : "text-slate-800 hover:bg-slate-50 hover:text-indigo-600"
                        }`}
                      >
                        <Icon size={20} /> {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 border-t border-slate-100 bg-gradient-to-b from-white to-slate-50/50 px-5 py-5">
                {isAuthenticated ? (
                  <>
                    <div className="text-center text-sm font-medium text-slate-500">
                      {user?.name || user?.email || "User"}
                    </div>
                    <button
                      onClick={() => {
                        handleDashboard();
                        setMobileOpen(false);
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg active:scale-95"
                    >
                      <LayoutDashboard size={18} /> Dashboard
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileOpen(false);
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50/80 py-3.5 text-sm font-semibold text-rose-600 transition-all hover:bg-rose-100 active:scale-95"
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
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-indigo-300 hover:text-indigo-600 active:scale-95"
                    >
                      <LogIn size={18} /> Login
                    </button>
                    <button
                      onClick={() => {
                        handleSignup();
                        setMobileOpen(false);
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg active:scale-95"
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
