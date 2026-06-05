import React from 'react';
import { motion } from 'framer-motion';
import Banner from './Banner';
import BlogListing from './BlogListing';
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function BlogPage() {
  // Page fade-in animation
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  // Slide-up animation for content
  const slideUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 font-sans flex flex-col selection:bg-indigo-200/50">
      <Navbar />
  

      {/* Main Content */}
      <motion.main
        className="flex-grow"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Banner Section */}
        <Banner />

        {/* Blog Listing Section */}
        <motion.div
          variants={slideUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <BlogListing />
        </motion.div>
      </motion.main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}