import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function OfferBanner() {
  return (
    <section className="relative w-full overflow-hidden py-12 md:py-16">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[320px] w-[320px] md:h-[550px] md:w-[550px] rounded-full bg-cyan-400/20 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          whileHover={{ scale: 1.015 }}
          className="
            relative
            w-full
            overflow-hidden
            rounded-3xl
            shadow-[0_20px_80px_rgba(0,0,0,0.15)]
            hover:shadow-[0_25px_100px_rgba(0,0,0,0.2)]
            transition-shadow
          "
        >
          {/* Banner Image – full width, adjusts with container */}
          <img
            src="/banneroff.jpg"
            alt="Special Offer"
            loading="lazy"
            draggable={false}
            className="block w-full h-auto object-contain select-none"
          />

          {/* Button – bottom right */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-20">
            <motion.a
              href="/pricing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                inline-flex items-center gap-1.5 md:gap-2
                px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4
                rounded-full
                bg-gradient-to-r from-cyan-500 to-blue-600
                text-white font-bold
                text-xs sm:text-sm md:text-base lg:text-lg
                shadow-lg shadow-cyan-500/30
                hover:shadow-cyan-500/50
                transition-all duration-300
                backdrop-blur-md
                border border-white/20
                whitespace-nowrap
              "
            >
              Get Started Today
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}