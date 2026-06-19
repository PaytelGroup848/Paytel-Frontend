import { motion } from "framer-motion";
import Navbar from "../navbar";
import Banner from "./DemoBanner";
import PlansCard from "./PlansCard";
import Review from "./Review";
import BusinessCard from "./businessCard";
import Services from "./Services";
import PlansAndPricing from "./PlansAndPricing";
import ContactCard from "./ContactCard";
import ComparisonTable from './comparePlans';
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


        <PlansCard />
        <PlansAndPricing />
        <Review />
        <BusinessCard />
        <ComparisonTable/>
        <Services />
        
        <ContactCard />
      </motion.main>

      <Footer />
    </>
  );
} 