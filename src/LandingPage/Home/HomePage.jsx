import { motion } from "framer-motion";
import Navbar from "../navbar";
import DemoBanner from "./DemoBanner";
import PlansCard from "./PlansCard";
import Review from "./Review";
import BusinessCard from "./businessCard";
import Services from "./Services";
import PlansAndPricing from "./PlansAndPricin";
import ContactCard from "./ContactCard";
import Footer from "../Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Main content with a subtle fade‑in effect */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-0"
      >
        <DemoBanner />
        <PlansCard />
        <Review />
        <BusinessCard />
        <Services />
        <PlansAndPricing />
        <ContactCard />
      </motion.main>

      <Footer />
    </>
  );
}