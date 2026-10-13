import { Headphones, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function PlanHelp() {
  return (
    <section className="mt-0 mb-0 w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-400 via-transparent to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #818cf8 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Glass card */}
        <div className="relative bg-white rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/60 overflow-hidden">
          {/* Inner gradient line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500" />

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-8 md:p-10 lg:p-12"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
                Not sure which plan to choose?
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our smart Agent is here to help you find the best package for
                your business.
              </p>
              <a href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm rounded-2xl shadow-xl shadow-indigo-200 hover:shadow-indigo-300/50 transition-all group"
                >
                  <Headphones size={20} />
                  Talk to Our Agent
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </motion.button>
              </a>
            </motion.div>

            {/* Right Video - Intro Video (wide/landscape format) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative flex justify-center me-5 lg:justify-end p-6 lg:p-0"
            >
              <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md">
                <video
                  className="w-full h-auto rounded-2xl shadow-md"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                >
                  <source src="/intro%20video_1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              {/* Decorative blobs */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-3xl opacity-40" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full blur-3xl opacity-30" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}