import React from 'react';
import { motion } from 'framer-motion';
import Banner from './Banner';
import Posts from './Posts';
import AboutUs from './AboutUs';
import { postsData, categoriesData } from './blogData';
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function BlogPage() {
  // Page load animations ke liye container variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Left grid aur Right sidebar ke aane me thoda gap
        delayChildren: 0.1,
      }
    }
  };

  // Har ek individual section ke liye slide-up animation
  const slideUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    // flex-col aur min-h-screen ensure karega ki Footer hamesha bottom me rahe
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col selection:bg-cyan-500/30">
      
      {/* 1. Global Navbar */}
      <Navbar />

      {/* Main Content Area (flex-grow pushes footer down) */}
      <div className="flex-grow flex flex-col relative z-10">
        
        {/* 2. Top Hero Section */}
        <Banner />

        {/* 3. Main Content & Sidebar Layout with Animations */}
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full"
          variants={pageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }} // Jab user scroll karke aayega tabhi animate hoga
        >
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
            
            {/* Left Area: Main Blog Grid (Takes ~65% width on Desktop) */}
            <motion.main 
              className="w-full lg:w-[65%]"
              variants={slideUpVariants}
            >
              <Posts posts={postsData} />
            </motion.main>

            {/* Right Area: Sticky Sidebar (Takes ~35% width on Desktop) */}
            <motion.aside 
              className="w-full lg:w-[35%] relative"
              variants={slideUpVariants}
            >
              {/* Sticky Wrapper - Requires fixed Navbar height adjustment (top-28 ensures it doesn't hide behind Navbar) */}
              <div className="sticky top-28 lg:top-32 transition-all duration-500"> 
                <AboutUs 
                  posts={postsData.slice(0, 4)} 
                  categories={categoriesData} 
                />
              </div>
            </motion.aside>
            
          </div>
        </motion.div>
      </div>

      {/* 4. Global Footer */}
      <Footer />
      
    </div>
  );
}