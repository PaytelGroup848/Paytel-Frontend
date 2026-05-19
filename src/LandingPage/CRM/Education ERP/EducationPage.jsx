import { motion } from 'framer-motion';
import Banner from "./Banner";
import Collaboration from "./Collaboration";
import CrmBenefits from "./CrmBenefits";
import FeaturesCRM from "./FeaturesCRM";
import Facts from "./Facts";
import Navbar from "../../Navbar";
import Footer from "../../Footer";

export default function EducationPage() {
  // Fade up animation variants – no opacity changes over scroll
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  // Stagger children for sections
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  return (
    <>
      <Navbar />
      <motion.div 
        className="mt-5 overflow-x-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Banner */}
        <motion.div variants={fadeUpVariants}>
          <Banner />
        </motion.div>

        {/* FeaturesCRM */}
        <motion.div
          variants={fadeUpVariants}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, margin: "-100px" }}
        >
          <FeaturesCRM />
        </motion.div>

        {/* Facts */}
        <motion.div
          variants={fadeUpVariants}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Facts />
        </motion.div>

        {/* CrmBenefits */}
        <motion.div
          variants={fadeUpVariants}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, margin: "-100px" }}
        >
          <CrmBenefits />
        </motion.div>

        {/* Collaboration */}
        <motion.div
          variants={fadeUpVariants}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Collaboration />
        </motion.div>

        <Footer />
      </motion.div>
    </>
  );
}