import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom"; // added useNavigate
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
} from "lucide-react";

/* ───────────────── Mega Menu (Services) ───────────────── */
const megaMenuSections = [
  {
    title: "Host & Deploy",
    icon: Server,
    items: [
      { label: "WordPress Hosting", href: "/wordpress-page", tag: "Popular" },
      { label: "Node.js Hosting", href: "/hosting/nodejs" },
      { label: "cPanel Hosting", href: "/c-panel", tag: "Enterprise" },
    ],
  },
  {
    title: "Accounting ERP on Cloud",
    icon: Cloud,
    items: [
      { label: "Busy on Cloud", href: "/Busy-on-cloud" },
      { label: "Tally on Cloud", href: "/Tally-on-cloud" },
      { label: "Marg on Cloud", href: "/Marg-on-cloud" },
      { label: "VPS on Cloud", href: "/vps" },
    ],
  },
];

/* ── Software CRM dropdown ── */
const softwareCRMItems = [
  { label: "Education ERP", href: "/education-management-system", tag: "New" },
  { label: "Restaurant Management ERP", href: "/restaurant-management-system" },
];

/* ── Main nav links ── */
const NAV_LINKS = [
  { label: "Blog", href: "/cloud-hosting-blog", icon: BookOpen },
  { label: "Contact", href: "/contact", icon: PhoneCall },
];

export default function Navbar({
  logoImg = "/Cloudedata.svg",
  isLoggedIn = false,
  userName = "Guest",
  onLogin,        // optional external handler
  onSignup,       // optional external handler
  onLogout,       // optional external handler
}) {
  const location = useLocation();
  const navigate = useNavigate(); // 👈 get navigate function

  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [authMenuOpen, setAuthMenuOpen] = useState(false);

  const navbarRef = useRef(null);
  const megaMenuRef = useRef(null);
  const softwareDropdownRef = useRef(null);
  const authRef = useRef(null);

  // Hide navbar on home until scrolled past hero
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Global click-outside handler for all popups
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
      if (
        activeDropdown === "Software CRM" &&
        softwareDropdownRef.current &&
        !softwareDropdownRef.current.contains(event.target) &&
        !event.target.closest(".software-crm-button")
      ) {
        setActiveDropdown(null);
      }
      if (
        authMenuOpen &&
        authRef.current &&
        !authRef.current.contains(event.target) &&
        !event.target.closest(".auth-button")
      ) {
        setAuthMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [megaMenuOpen, activeDropdown, authMenuOpen]);

  // Handlers for auth actions (use props if provided, else navigate)
  const handleLogin = () => {
    if (onLogin) onLogin();
    else navigate("/login");
  };

  const handleSignup = () => {
    if (onSignup) onSignup();
    else navigate("/register");
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
    else {
      // default logout: clear local storage and go home
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const renderDropdown = (items) => (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
    >
      <div className="bg-white/90 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-2xl shadow-indigo-500/10 p-2 min-w-[240px]">
        {items.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            onClick={() => setActiveDropdown(null)}
            className="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/70 rounded-xl transition-all duration-200 group"
          >
            <span>{item.label}</span>
            {item.tag && (
              <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                {item.tag}
              </span>
            )}
            <ArrowRight size={14} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>
    </motion.div>
  );

  // Helper to check active link
  const isActive = (href) => location.pathname === href;

  // Auth buttons
  const renderDesktopAuth = () => {
    if (isLoggedIn) {
      return (
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-red-600 bg-white/60 backdrop-blur-sm rounded-xl border border-red-200/60 shadow-sm hover:shadow-md hover:bg-red-50/80 transition-all duration-200"
        >
          <LogOut size={16} />
          Logout
        </button>
      );
    }
    return (
      <div className="flex items-center gap-3">
        <button
          onClick={handleLogin}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-700 bg-transparent rounded-xl border border-slate-300/70 shadow-sm hover:shadow-md hover:border-indigo-300 hover:text-indigo-600 transition-all duration-200"
        >
          <LogIn size={16} />
          Login
        </button>
        <button
          onClick={handleSignup}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl shadow-md shadow-indigo-200/50 hover:shadow-lg hover:from-indigo-700 hover:to-indigo-600 transition-all duration-200"
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
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0 group">
              <img
                src={logoImg}
                alt="CloudeData"
                className="h-12 w-auto md:h-14 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
                onError={(e) => (e.target.style.display = "none")}
              />
            </Link>

            {/* Desktop Navigation Pill */}
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

                  {/* Software CRM */}
                  <div
                    className="relative software-crm-button"
                    ref={softwareDropdownRef}
                    onMouseEnter={() => setActiveDropdown("Software CRM")}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`flex items-center gap-1.5 px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                        activeDropdown === "Software CRM"
                          ? "text-indigo-600 bg-white/60 shadow-sm"
                          : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50/80"
                      }`}
                    >
                      <Code size={15} />
                      Software CRM
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${
                          activeDropdown === "Software CRM" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === "Software CRM" && renderDropdown(softwareCRMItems)}
                    </AnimatePresence>
                  </div>

                  {/* Services Mega Menu */}
                  <div className="relative services-button">
                    <button
                      onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                      className={`flex items-center gap-1.5 px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                        megaMenuOpen
                          ? "bg-indigo-600 text-white shadow-md"
                          : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50/80"
                      }`}
                    >
                      <LayoutGrid size={15} />
                      Services
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${
                          megaMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {megaMenuOpen && (
                        <motion.div
                          ref={megaMenuRef}
                          initial={{ opacity: 0, y: 12, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 12, scale: 0.97 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-[1100px] max-w-[90vw] bg-white/95 backdrop-blur-2xl rounded-2xl border border-white/60 shadow-xl shadow-slate-200/50 overflow-hidden z-50"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
                            {megaMenuSections.map((section, idx) => (
                              <div key={idx} className="space-y-3">
                                <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm tracking-wide pb-2 border-b border-slate-100">
                                  <section.icon size={16} />
                                  {section.title}
                                </div>
                                <div className="space-y-1">
                                  {section.items.map((item) => (
                                    <Link
                                      key={item.label}
                                      to={item.href}
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="flex items-center justify-between group rounded-lg px-3 py-2 text-sm text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/40 transition-all"
                                    >
                                      <span>{item.label}</span>
                                      {item.tag && (
                                        <span className="text-[10px] font-medium bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
                                          {item.tag}
                                        </span>
                                      )}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                            {/* Promo Card */}
                            <div className="relative bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl p-5 flex flex-col justify-between overflow-hidden shadow-md">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                              <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-400/20 rounded-full blur-2xl" />
                              <h3 className="text-white font-bold text-base leading-tight mb-1">
                                Cloud Assessment
                              </h3>
                              <p className="text-indigo-100 text-xs leading-relaxed mb-4">
                                Free consultation & custom roadmap
                              </p>
                              <Link
                                to="/contact"
                                onClick={() => setMegaMenuOpen(false)}
                                className="inline-flex items-center justify-center gap-1.5 bg-white/20 text-white font-medium text-xs px-3 py-1.5 rounded-lg hover:bg-white/30 transition-all"
                              >
                                Claim Offer
                                <ArrowRight size={12} />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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

            {/* Desktop Auth Buttons */}
            <div className="hidden md:block">{renderDesktopAuth()}</div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:text-indigo-600 rounded-xl hover:bg-slate-50 transition-all"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

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

                <div>
                  <h4 className="text-sm font-semibold text-indigo-600 mb-2 flex items-center gap-2">
                    <Code size={14} />
                    Software CRM
                  </h4>
                  <div className="space-y-2 pl-6">
                    {softwareCRMItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex justify-between items-center text-sm text-slate-600 hover:text-indigo-600 transition py-1"
                      >
                        {item.label}
                        {item.tag && <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 rounded-full">{item.tag}</span>}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-5">
                  {megaMenuSections.map((section, idx) => (
                    <div key={idx}>
                      <h4 className="text-sm font-semibold text-indigo-600 mb-2 flex items-center gap-2">
                        <section.icon size={14} />
                        {section.title}
                      </h4>
                      <div className="space-y-2 pl-6">
                        {section.items.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex justify-between items-center text-sm text-slate-600 hover:text-indigo-600 transition py-1"
                          >
                            {item.label}
                            {item.tag && <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 rounded-full">{item.tag}</span>}
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

              {/* Mobile Auth Section */}
              <div className="p-5 border-t border-slate-100 space-y-3">
                {isLoggedIn ? (
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