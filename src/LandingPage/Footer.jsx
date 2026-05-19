import { motion } from "framer-motion";
import { MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";

// Custom SVG icons with dark mode styling
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const footerLinks = {
  Product: [
    "VPS Hosting",
    "Linux VPS",
    "Windows VPS",
    "Tally on Cloud",
    "Busy on Cloud",
    "Marg on Cloud",
    "Education CRM",
  ],
  Company: [
    "About Cloudedata",
    "Contact Us",
    "Pricing",
    "Blog",
  ],
};

const contactDetails = {
  address: "A 212 First Floor, Okhla Industrial Estate Phase-3, New Delhi, 110020",
  email: "info@cloudedata.com",
  phone: "+91-9311472355",
};

export default function Footer({ logoImg = "/Cloudedata.svg" }) {
  return (
    <footer className="w-full bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-400 border-t border-slate-800/80 mt-0 mb-0 relative overflow-hidden">
      {/* Glow Effect Element for premium touch */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Brand + Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <a href="/" className="inline-flex items-center gap-2 mb-4 brightness-125 dark:invert-0">
              <img
                src={logoImg}
                alt="CloudeData"
                className="h-12 w-auto object-contain"
                onError={(e) => (e.target.style.display = "none")}
              />
            </a>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed mb-6">
              Reliable Cloud Solutions for Modern Businesses – Cloude Data
            </p>
            
            {/* Social Icons with subtle glow hover */}
            <div className="flex items-center gap-3">
              <a href="#" className="p-2.5 rounded-xl text-slate-400 bg-slate-900/60 border border-slate-800/80 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-950/20 transition-all duration-300" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href="#" className="p-2.5 rounded-xl text-slate-400 bg-slate-900/60 border border-slate-800/80 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-950/20 transition-all duration-300" aria-label="Twitter">
                <TwitterIcon />
              </a>
              <a href="#" className="p-2.5 rounded-xl text-slate-400 bg-slate-900/60 border border-slate-800/80 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-950/20 transition-all duration-300" aria-label="Facebook">
                <FacebookIcon />
              </a>
            </div>
          </motion.div>

          {/* Link columns (Product & Company) */}
          {Object.entries(footerLinks).map(([title, links], idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx + 1) * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`${title === "Product" ? "lg:col-span-3" : "lg:col-span-2"}`}
            >
              <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-1 group w-fit"
                    >
                      <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 group-hover:after:w-full">
                        {link}
                      </span>
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all duration-300"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin size={16} className="text-cyan-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{contactDetails.address}</span>
              </li>
              <li>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-cyan-400 transition-colors group"
                >
                  <Mail size={16} className="text-cyan-500 shrink-0" />
                  <span className="group-hover:underline underline-offset-4">{contactDetails.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactDetails.phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-cyan-400 transition-colors group"
                >
                  <Phone size={16} className="text-cyan-500 shrink-0" />
                  <span className="group-hover:underline underline-offset-4">{contactDetails.phone}</span>
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500"
        >
          <p>© {new Date().getFullYear()} CloudeData. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cyan-400 transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}