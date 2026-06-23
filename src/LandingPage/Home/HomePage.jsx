import { useEffect } from "react";
import { motion } from "framer-motion";
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

export default function HomePage() {
  // 1. Lock body horizontal scroll from the start
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
    // 2. Outermost wrapper clips any overflowing content aggressively
    <div className="w-full overflow-x-clip">
      {/* 3. Global reset for any rogue full‑width elements */}
      <style>{`
        /* Force all elements to respect the viewport */
        *, *::before, *::after {
          box-sizing: border-box;
        }
        html, body {
          max-width: 100vw;
          overflow-x: hidden;
        }
        img, video, iframe, table {
          max-width: 100%;
          height: auto;
        }
      `}</style>

      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-0 w-full overflow-x-hidden"
      >
        <Banner />
        <PlansAndPricing />
        <MoneyBack />
        <Review />
        <ComparisonTable />
        <Services />
        <SuccessBanner />
        <BusinessCard />
      </motion.main>

      <ContactCard />
      <Footer />
    </div>
  );
}