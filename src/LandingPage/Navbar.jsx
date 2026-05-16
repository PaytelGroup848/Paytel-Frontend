import { useState } from "react";
import {
  ChevronDown,
  Menu,
  X,
  User,
  LogOut,
  LogIn,
  UserPlus,
  Bell,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Pricing", href: "/pricing" },
  {
    label: "Products",
    dropdown: [
      { label: "Busy on Cloud", href: "/products/busy-on-cloud" },
      { label: "Tally on Cloud", href: "/products/tally-on-cloud" },
      { label: "VPS Cloud", href: "/products/vps-cloud" },
      { label: "Marg Cloud", href: "/products/marg-cloud" },
    ],
  },
  { label: "Software / CRM", href: "/software-crm" },
  {
    label: "Hosting",
    dropdown: [
      { label: "WordPress Hosting", href: "/hosting/wordpress" },
      { label: "cPanel Hosting", href: "/hosting/cpanel" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
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
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleMobileDropdown = (label) => {
    setMobileExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 md:h-18 flex items-center bg-gradient-to-r from-blue-50/90 via-white/95 to-indigo-50/90 backdrop-blur-md shadow-[inset_0_-1px_0_rgba(0,0,0,0.06),0_6px_18px_-6px_rgba(0,0,0,0.12)]">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <a href="/" className="flex items-center shrink-0 pl-1 group">
            <img
              src={logoImg}
              alt="CloudeData"
              className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
              onError={(e) => (e.target.style.display = "none")}
            />
          </a>

          {/* Center Pill – all blue tones, glassy interior */}
          <div className="hidden md:block">
            <div className="relative p-[2px] rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-500 shadow-lg shadow-indigo-200/40 hover:shadow-indigo-300/50 transition-shadow duration-300">
              <div className="flex items-center gap-1 bg-gradient-to-b from-white/95 to-slate-50/90 backdrop-blur-[6px] rounded-full px-2 py-1.5">
                {NAV_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.dropdown ? (
                      <>
                        <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 rounded-full hover:bg-white/80 hover:shadow-sm transition-all duration-200">
                          {item.label}
                          <ChevronDown
                            size={14}
                            className={`transition-transform duration-300 ${
                              activeDropdown === item.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {/* Dropdown */}
                        <div
                          className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 origin-top ${
                            activeDropdown === item.label
                              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                              : "opacity-0 scale-95 translate-y-1 pointer-events-none"
                          }`}
                        >
                          <div className="bg-white/85 backdrop-blur-xl rounded-2xl border border-slate-200/70 shadow-xl shadow-slate-200/40 p-2 min-w-[220px]">
                            {item.dropdown.map((sub) => (
                              <a
                                key={sub.label}
                                href={sub.href}
                                className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/80 rounded-xl transition-colors"
                              >
                                {sub.label}
                                <ChevronRight size={14} className="text-slate-400" />
                              </a>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <a
                        href={item.href}
                        className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 rounded-full hover:bg-white/80 hover:shadow-sm transition-all duration-200"
                      >
                        {item.label}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side – notifications + profile */}
          <div className="hidden md:flex items-center gap-3">
            {/* Notification Bell */}
            <button className="relative p-2 text-slate-500 hover:text-indigo-600 rounded-full hover:bg-white/50 transition group">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white ring-2 ring-white animate-pulse">
                  {notifications}
                </span>
              )}
            </button>

            {/* Profile – blue gradient avatar ring */}
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
                      onClick={() => { onLogout(); setProfileOpen(false); }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => { onLogin(); setProfileOpen(false); }}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-indigo-50 rounded-xl transition"
                      >
                        <LogIn size={16} />
                        Login
                      </button>
                      <button
                        onClick={() => { onRegister(); setProfileOpen(false); }}
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
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-indigo-600 rounded-xl hover:bg-white/60 transition"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-lg transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: "4rem" }}
      >
        <div className="flex flex-col h-full overflow-y-auto p-6 space-y-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => toggleMobileDropdown(item.label)}
                    className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-slate-700 hover:text-indigo-600 rounded-xl hover:bg-indigo-50/70 transition"
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        mobileExpanded[item.label] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {mobileExpanded[item.label] && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-indigo-200 pl-4">
                      {item.dropdown.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-2.5 text-sm text-slate-500 hover:text-indigo-600 rounded-xl hover:bg-indigo-50/70 transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={item.href}
                  className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:text-indigo-600 rounded-xl hover:bg-indigo-50/70 transition"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}

          {/* Mobile Auth + Notifications */}
          <div className="pt-6 border-t border-slate-200 mt-4 space-y-3">
            <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-slate-700 hover:text-indigo-600 rounded-xl hover:bg-indigo-50/70 transition">
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
                onClick={() => { onLogout(); setMobileOpen(false); }}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => { onLogin(); setMobileOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-slate-700 hover:bg-indigo-50/70 rounded-xl transition"
                >
                  <LogIn size={18} />
                  Login
                </button>
                <button
                  onClick={() => { onRegister(); setMobileOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-md"
                >
                  <UserPlus size={18} />
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}