import Navbar from "../../Navbar";
import Footer from "../../Footer";
import Banner from "./banner";
import Features from "./Features";
import VpsPlans from "./VpsPlans";
import VpsMarketing from "./VpsMarketing";
import VpsFaq from "./VpsFaq";
import VpsComparison from "./comparePlans";
import SuccessBanner from "../../Home/successStories";
import Moneyback from "../../../components/moneyback";
import OfferBanner from "../../../components/banneroff";
import TrustBadge from "../../Home/Trusted";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";

// ─── Reusable fade‑up section wrapper ──────────────────────────────────
const FadeUpSection = ({ children, className = "", delay = 0 }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, ease: "easeOut", delay }}
    className={className}
  >
    {children}
  </motion.section>
);

export default function VpsLandingpage() {
  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      gestureOrientation: "vertical",
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Navbar />

      {/* Banner – may have its own animations */}
      <Banner />

      <FadeUpSection delay={0.1} className="mt-5 p-0">
        <TrustBadge />
      </FadeUpSection>

      <FadeUpSection delay={0.15}>
        <VpsPlans />
      </FadeUpSection>

      <FadeUpSection delay={0.2}>
        <Moneyback />
      </FadeUpSection>

      
      <FadeUpSection delay={0.3}>
        <VpsComparison />
      </FadeUpSection>

      <FadeUpSection delay={0.25}>
        <Features />
      </FadeUpSection>


      <FadeUpSection delay={0.35}>
        <SuccessBanner />
      </FadeUpSection>

      <FadeUpSection delay={0.4}>
        <VpsMarketing />
      </FadeUpSection>

      <FadeUpSection delay={0.45}>
        <OfferBanner />
      </FadeUpSection>

      <FadeUpSection delay={0.5}>
        <VpsFaq />
      </FadeUpSection>

      <Footer />
    </>
  );
}