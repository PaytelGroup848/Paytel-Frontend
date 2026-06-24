import { motion } from "framer-motion";

export default function OfferBanner() {
  return (
    <section className="relative w-full overflow-hidden py-12 md:py-16">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[320px] w-[320px] md:h-[550px] md:w-[550px] rounded-full bg-cyan-400/20 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          whileHover={{
            scale: 1.015,
          }}
          className="
            relative
            w-full
            max-w-6xl
            overflow-hidden
            rounded-3xl
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            shadow-[0_20px_80px_rgba(0,0,0,0.15)]
          "
        >
          {/* Top Glow */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

          {/* Banner Image */}
          <img
            src="/banneroff.png"
            alt="Special Offer"
            loading="lazy"
            draggable={false}
            className="
              block
              w-full
              h-auto
              object-contain
              select-none
            "
          />

          {/* Bottom Shine */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}