import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, ChevronRight } from "lucide-react";

/* ─── Social Icons ──────────────────────────────────────────────────── */
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const footerLinks = {
  "Cloud Hosting": [
    { label: "VPS Hosting", href: "/vps-cloud" },
    { label: "Linux VPS", href: "/pricing" },
    { label: "Windows VPS", href: "/pricing" },
  ],
  "Cloud ERP": [
    { label: "Tally on Cloud", href: "/tally-on-cloud" },
    { label: "Busy on Cloud", href: "/busy-on-cloud" },
    { label: "Marg on Cloud", href: "/marg-on-cloud" },
    { label: "Education CRM", badge: "Popular", href: "/education-management-system" },
  ],
  Company: [
    { label: "Blog & Resources", href: "/cloud-hosting-blog" },
    { label: "Pricing Plans", href: "/pricing" },
    { label: "Contact Us", href: "/contact" },
  ],
};

const socialLinks = [
  { icon: <LinkedInIcon />, label: "LinkedIn", href: "https://www.linkedin.com/company/cloude-data", color: "hover:bg-[#0077B5]/20 hover:border-[#0077B5]/40 hover:text-[#0077B5]" },
  { icon: <TwitterIcon />, label: "Twitter / X", href: "https://x.com/CloudeData", color: "hover:bg-slate-100/10 hover:border-slate-400/40 hover:text-white" },
  { icon: <FacebookIcon />, label: "Facebook", href: "https://www.facebook.com/Cloudedataa/", color: "hover:bg-[#1877F2]/20 hover:border-[#1877F2]/40 hover:text-[#1877F2]" },
  { icon: <InstagramIcon />, label: "Instagram", href: "https://www.instagram.com/cloudedata/", color: "hover:bg-pink-500/20 hover:border-pink-500/40 hover:text-pink-400" },
  { icon: <YouTubeIcon />, label: "YouTube", href: "https://www.youtube.com/@Cloudedata", color: "hover:bg-[#FF0000]/20 hover:border-[#FF0000]/40 hover:text-[#FF0000]" },
];

const trustBadges = [
  { label: "99.9% Uptime SLA" },
  { label: "ISO 27001 Certified" },
  { label: "24/7 Expert Support" },
  { label: "India Data Centers" },
];

const contactDetails = {
  address: "A-212, First Floor, Okhla Industrial Estate Phase-3, New Delhi – 110020",
  email: "info@cloudedata.com",
  phone: "+91-9311472355",
};

/* ─── Stagger animation helpers ─────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
  viewport: { once: true },
});

/* ─── Sub-components ─────────────────────────────────────────────────── */
const SectionHeading = ({ children }) => (
  <h3 className="text-[11px] font-bold tracking-[0.18em] text-slate-300 uppercase mb-5 flex items-center gap-2">
    <span className="inline-block w-3 h-px bg-blue-500" />
    {children}
  </h3>
);

const FooterLink = ({ label, badge, href }) => (
  <li>
    <Link
      to={href}
      className="group flex items-center justify-between text-[13px] text-slate-400 hover:text-white transition-colors duration-200 py-[3px]"
    >
      <span className="flex items-center gap-1.5">
        <ChevronRight
          size={11}
          className="text-blue-500/0 group-hover:text-blue-500 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 shrink-0"
        />
        {label}
      </span>
      {badge && (
        <span className="text-[9px] font-bold tracking-wide px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/20">
          {badge}
        </span>
      )}
    </Link>
  </li>
);

/* ─── Main Footer ────────────────────────────────────────────────────── */
export default function Footer({ logoImg = "/Cloudedata.svg" }) {
  const legalLinks = [
    { label: "Privacy Policy", path: "/privacy-policy/" },
    { label: "Terms of Service", path: "/term-and-conditions/" },
    { label: "Refund Policy", path: "/refund-policy-cloude/" },
  ];

  return (
    <footer className="relative w-full bg-[#080d14] text-slate-400 overflow-hidden font-[system-ui]">
      {/* Background texture / glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/3 w-[600px] h-[600px] bg-blue-600/6 rounded-full blur-[120px]" />
        <div className="absolute -top-16 right-1/4 w-[400px] h-[400px] bg-blue-800/6 rounded-full blur-[100px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Top accent line */}
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-0">
        {/* Trust badges */}
        <motion.div {...fadeUp(0)} className="flex flex-wrap gap-2 mb-12">
          {trustBadges.map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-300 border border-slate-700/70 rounded-full px-3.5 py-1.5 bg-slate-800/40"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              {b.label}
            </span>
          ))}
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">
          {/* Brand column */}
          <motion.div {...fadeUp(0.05)} className="lg:col-span-4 flex flex-col gap-6">
            <Link to="/" className="inline-block w-fit group">
              <img
                src={logoImg}
                alt="CloudData"
                className="h-16 w-auto max-w-[240px] md:h-[70px] sm:h-14 object-contain brightness-120 group-hover:brightness-150 transition-all duration-300"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML =
                    '<span class="text-3xl font-black tracking-tight text-white transition-colors duration-300">Cloud<span class="text-blue-500">Data</span></span>';
                }}
              />
            </Link>

            <p className="text-[13px] leading-relaxed text-slate-400 max-w-xs">
              Enterprise-grade cloud infrastructure powering thousands of Indian businesses — from VPS hosting to ERP on cloud.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 flex items-center justify-center rounded-xl border border-slate-700/60 bg-slate-800/50 text-slate-400 transition-all duration-250 ${color}`}
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Contact block */}
            <div className="flex flex-col gap-3 pt-1 border-t border-slate-800">
              <a
                href={`tel:${contactDetails.phone.replace(/\D/g, "")}`}
                className="group flex items-center gap-3 text-[13px] text-slate-400 hover:text-white transition-colors"
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
                  <Phone size={14} />
                </span>
                <span>{contactDetails.phone}</span>
              </a>
              <a
                href={`mailto:${contactDetails.email}`}
                className="group flex items-center gap-3 text-[13px] text-slate-400 hover:text-white transition-colors"
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
                  <Mail size={14} />
                </span>
                <span>{contactDetails.email}</span>
              </a>
              <div className="flex items-start gap-3 text-[13px] text-slate-400">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0 mt-0.5">
                  <MapPin size={14} />
                </span>
                <span className="leading-relaxed">{contactDetails.address}</span>
              </div>
            </div>
          </motion.div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links], idx) => (
            <motion.div
              key={title}
              {...fadeUp(0.1 + idx * 0.07)}
              className="lg:col-span-2"
            >
              <SectionHeading>{title}</SectionHeading>
              <ul className="space-y-0.5">
                {links.map((link) => (
                  <FooterLink key={link.label} {...link} />
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div
          {...fadeUp(0.35)}
          className="border-t border-slate-800/70 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-slate-500"
        >
          <p>© {new Date().getFullYear()} CloudData Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-1">
            {legalLinks.map((link, i, arr) => (
              <span key={link.label} className="flex items-center gap-1">
                <Link to={link.path} className="hover:text-blue-400 transition-colors duration-200 px-1 py-0.5">
                  {link.label}
                </Link>
                {i < arr.length - 1 && <span className="text-slate-700 select-none">·</span>}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}