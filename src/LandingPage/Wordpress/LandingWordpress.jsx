import Navbar from "../Navbar";
import Footer from "../Footer";
import WordPressBanner from "./banner";
import Plans from "../../pages/plans/Plan";
import MoneyBack from "../../components/moneyback";
import SuccessBanner from "../Home/successStories";
import MarqueeGallery from "../../components/MarqueeGallery";
import Banneroff from "../../components/banneroff";
import WordPressFeatures from "./featurWordpress";
import Reviews from "../Home/Review";
import WordPressFAQ from "./wordpressFaq";
import TrustBadge from "../Home/Trusted";
import ImageOnly from "../../components/dashboardImage";

import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { Helmet } from "react-helmet-async";

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

// ─── Main landing page ─────────────────────────────────────────────────
export default function LandingWordpress() {
  const location = useLocation();
  const plansRef = useRef(null);

  // Smooth scroll to plans on mount (if requested)
  useEffect(() => {
    if (location.state?.scrollToPlans && plansRef.current) {
      // Small delay so Lenis is ready
      setTimeout(() => {
        plansRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  }, [location]);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://easings.net
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
      <Helmet>
        <title>
          WordPress Hosting in India | Fast & Secure Hosting | Cloudedata
        </title>
        <meta
          name="description"
          content="Launch your website with Cloudedata WordPress Hosting—fast performance, free SSL, daily backups, 99.99% uptime & 24/7 support."
        />
        <link rel="canonical" href="https://cloudedata.com/wordpress-hosting" />
      </Helmet>
      <Navbar />

      {/* Banner – already might have its own animations */}
      <WordPressBanner />

      {/* Trust badges */}
      <FadeUpSection delay={0.1} className="mt-5 p-0">
        <TrustBadge />
      </FadeUpSection>

      {/* Plans – we want the plansRef for scrolling, but still animate the wrapper */}
      <div ref={plansRef}>
        <FadeUpSection delay={0.15}>
          <Plans />
        </FadeUpSection>
      </div>

      <FadeUpSection delay={0.2}>
        <MoneyBack />
      </FadeUpSection>

      <FadeUpSection delay={0.25}>
        <MarqueeGallery />
      </FadeUpSection>

      <FadeUpSection delay={0.3}>
        <SuccessBanner />
      </FadeUpSection>

      <FadeUpSection delay={0.35}>
        <WordPressFeatures />
      </FadeUpSection>

      <FadeUpSection delay={0.4}>
        <Reviews />
      </FadeUpSection>

      <FadeUpSection delay={0.45}>
        <ImageOnly />
      </FadeUpSection>

      <FadeUpSection delay={0.5}>
        <Banneroff />
      </FadeUpSection>

      <FadeUpSection delay={0.55}>
        <WordPressFAQ />
      </FadeUpSection>

      <Footer />
    </>
  );
}
