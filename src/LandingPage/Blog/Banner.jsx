import { motion } from "framer-motion";

export default function Banner() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  return (
    <div className="relative w-full min-h-[50%] lg:min-h-[50%] flex items-center overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50/80 to-pink-50/70 selection:bg-cyan-500/30">
      <motion.div
        className="relative z-10 w-full  mx-auto px-4 sm:px-6 lg:px-8 pt-30 pb-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Main heading – fixed clipping */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8 px-4"
          >
            <span className="inline-block bg-gradient-to-b from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent pb-2">
              Cloudedata
            </span>{" "}
            <span className=" pb-3 inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-xl">
              Blogs
            </span>
          </motion.h1>

          {/* Subtitle */}
          {/* <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mb-8 font-normal leading-relaxed tracking-wide px-4 mt-3"
          >
            Cutting‑edge conversations on cloud infrastructure, distributed
            microservices, and real‑time data pipelines.
          </motion.p> */}
        </div>
      </motion.div>
    </div>
  );
}
