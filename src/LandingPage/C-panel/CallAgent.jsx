import { motion } from "framer-motion";
import { PhoneCall, ArrowRight, Headphones } from "lucide-react";

export default function HelpBanner() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzNzQxNTEiPjxwYXRoIGQ9Ik0yMCAwaDJ2NDBoLTJ6TTAgMTZoMnY4SDB6TTM4IDE2djhoLTIiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10" />
      <div className="absolute -right-24 top-0 h-full w-1/2 bg-gradient-to-l from-blue-600/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:flex lg:items-center lg:gap-12 lg:px-8 lg:py-20">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:flex-1"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-200 backdrop-blur">
            <Headphones size={14} />
            <span>Need Assistance?</span>
          </div>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Can’t find what you’re looking for?
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Our experts are ready to help.
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Get instant guidance on choosing the right plan, technical setup, or
            pricing. Talk to a real cloud specialist — no bots, no waiting.
          </p>

          {/* Call button */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-blue-500/40 transition hover:shadow-xl hover:from-blue-700 hover:to-cyan-700"
            >
              <PhoneCall size={18} />
              <span>Call Agent Now</span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <p className="flex items-center gap-1 text-sm text-slate-400">
              <span className="hidden sm:inline">Or dial</span>
              <span className="font-mono text-white">+91 93114 72355</span>
            </p>
          </div>
        </motion.div>

        {/* Right side image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex justify-center lg:mt-0 lg:flex-1 lg:justify-end"
        >
          <div className="relative">
            {/* Glow effect behind image */}
            <div className="absolute inset-0 -z-10 translate-x-6 translate-y-6 rounded-3xl bg-blue-600/20 blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80"
              alt="Support agent ready to help"
              className="w-full max-w-sm rounded-2xl object-cover shadow-2xl shadow-slate-900/50 ring-1 ring-white/10"
            />
            {/* Floating badge on image */}
            <div className="absolute -bottom-3 -left-3 rounded-xl bg-slate-900/90 px-4 py-2 text-sm font-semibold text-white backdrop-blur shadow-lg ring-1 ring-white/10">
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Available now
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}