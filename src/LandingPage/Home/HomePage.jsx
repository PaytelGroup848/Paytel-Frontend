import { useEffect, useRef, createContext, useContext } from "react";
import { motion, useScroll, useSpring, useInView, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "../navbar";
import Banner from "./DemoBanner";
import Review from "./Review";
import BusinessCard from "./businessCard";
import Services from "./Services";
import PlansAndPricing from "./PlansAndPricing";
import ContactCard from "./ContactCard";
import ComparisonTable from './comparePlans';
import Footer from "../Footer";
import SuccessBanner from "./successStories";
import MoneyBack from "../../components/moneyback";
import OfferBanner from "../../components/banneroff";
import TrustBadge from "./Trusted";
import ImageOnly from "../../components/dashboardImage";

// ─────────────────────────────────────────────────────────────────────────────
// Smooth scroll progress bar at the top
// ─────────────────────────────────────────────────────────────────────────────
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[9999] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #6366f1, #3b82f6, #06b6d4)",
        transformOrigin: "0%",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2.5px",
        zIndex: 9999,
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section reveal wrapper — reusable, multiple animation variants
// ─────────────────────────────────────────────────────────────────────────────
const VARIANTS = {
  fadeUp: {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.93 },
    visible: { opacity: 1, scale: 1 },
  },
  clipReveal: {
    hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
    visible: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
  },
};

function SectionReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.7,
  threshold = 0.12,
  className = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  return (
    <motion.div
      ref={ref}
      variants={VARIANTS[variant]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Divider — subtle animated line between sections
// ─────────────────────────────────────────────────────────────────────────────
function SectionDivider() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="flex items-center justify-center py-2 px-6 sm:px-12 overflow-hidden">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-full max-w-5xl origin-left"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.15) 20%, rgba(99,102,241,0.25) 50%, rgba(99,102,241,0.15) 80%, transparent)",
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Scroll-parallax wrapper — subtle depth on scroll
// ─────────────────────────────────────────────────────────────────────────────
function ParallaxSection({ children, speed = 0.08, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  const smoothY = useSpring(y, { stiffness: 80, damping: 20 });

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page entry transition
// ─────────────────────────────────────────────────────────────────────────────
const pageVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HomePage
// ─────────────────────────────────────────────────────────────────────────────
export default function HomePage() {
  useEffect(() => {
    const originalOverflow = document.documentElement.style.overflowX;
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    return () => {
      document.documentElement.style.overflowX = originalOverflow;
      document.body.style.overflowX = "";
    };
  }, []);

  return (
    <div className="w-full overflow-x-clip">
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html, body { max-width: 100vw; overflow-x: hidden; }
        img, video, iframe, table { max-width: 100%; height: auto; }

        /* Smooth scroll for the whole page */
        html { scroll-behavior: smooth; }

        /* Reduced motion respect */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Scroll progress bar */}
      <ScrollProgressBar />

      <Navbar />

      {/* ── Page entry ── */}
      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="relative z-0 w-full overflow-x-hidden"
      >

        {/* Banner — no reveal, it's the hero, loads immediately */}
        <Banner />
        <TrustBadge/>

        <SectionDivider />

        {/* Plans & Pricing */}
        <SectionReveal variant="fadeUp" delay={0.05}>
          <PlansAndPricing />
        </SectionReveal>

        <SectionDivider />

        {/* Money Back */}
        <SectionReveal variant="scaleUp" delay={0.05} duration={0.65}>
          <MoneyBack />
        </SectionReveal>

        <SectionDivider />

        {/* Reviews */}
        <SectionReveal variant="fadeUp" delay={0.05}>
          <Review />
        </SectionReveal>

        <SectionDivider />

        {/* Comparison Table */}
        <SectionReveal variant="fadeIn" duration={0.8} delay={0.05}>
          <ComparisonTable />
        </SectionReveal>
        <SectionDivider />


        <SectionReveal variant="fadeUp" delay={0.05}>
          <ImageOnly/>
       </SectionReveal>

        {/* Services */}
        <SectionReveal variant="slideLeft" delay={0.05}>
          <Services />
        </SectionReveal>

        <SectionDivider />

        {/* Success Stories — subtle parallax depth */}
        <ParallaxSection speed={0.04}>
          <SectionReveal variant="fadeUp" delay={0.05}>
            <SuccessBanner />
          </SectionReveal>
        </ParallaxSection>

        <SectionDivider />

        


        {/* Business Card */}
        <SectionReveal variant="scaleUp" delay={0.05} duration={0.65}>
          <BusinessCard />
        </SectionReveal>

      </motion.main>

      {/* Contact & Footer */}
      <SectionReveal variant="fadeUp" delay={0.05}>
        <ContactCard />
      </SectionReveal>

       <SectionReveal variant="fadeUp" delay={0.05}>
          <OfferBanner/>
       </SectionReveal>



      <SectionReveal variant="fadeIn" duration={0.5}>
        <Footer />
      </SectionReveal>
    </div>
  );
}