import { motion } from "framer-motion";

export default function OfferBanner() {
  return (
    <section className="w-full flex justify-center px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative w-full overflow-hidden rounded-3xl shadow-2xl shadow-slate-300/50 ring-1 ring-slate-200/60"
        style={{ maxWidth: "88vw" }}
      >
        {/* ── Full banner image — replace src with your offer image ── */}
        <img
          src="/banneroff.png"   // ← apna image path yahan lagao
          alt="Special offer"
          className="w-full h-auto block object-cover"
          draggable={false}
          loading="lazy"
        />

        {/* Subtle bottom-edge shine */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}