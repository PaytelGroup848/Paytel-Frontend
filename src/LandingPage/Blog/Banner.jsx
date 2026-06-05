import { motion } from 'framer-motion';

export default function Banner() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };

  return (
    <div className="relative w-full min-h-[550px] lg:min-h-[650px] flex items-center overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50/80 to-pink-50/70 selection:bg-cyan-500/30">
      
      {/* Soft background pattern */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1350&q=80"
          alt="Cloud data infrastructure"
          className="absolute inset-0 w-full h-full object-cover opacity-5 mix-blend-overlay"
        />
        
        {/* Animated gradient orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-indigo-300/30 to-purple-300/20 blur-[140px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-gradient-to-tl from-pink-300/20 via-amber-200/20 to-transparent blur-[150px]"
        />
        
        {/* Vignette overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/20" />
      </div>

      {/* Grid pattern – more subtle */}
      <div 
        className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16"
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
            </span>{' '}
            <span className=" pb-3 inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-xl">
              Blog
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={fadeInUp} 
            className="text-lg md:text-xl text-slate-600 max-w-2xl mb-8 font-normal leading-relaxed tracking-wide px-4 mt-3"
          >
            Cutting‑edge conversations on cloud infrastructure, distributed microservices, and real‑time data pipelines.
          </motion.p>

        
        </div>
      </motion.div>
    </div>
  );
}