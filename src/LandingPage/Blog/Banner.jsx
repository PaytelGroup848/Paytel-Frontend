import { motion } from 'framer-motion';

export default function Banner() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };

  return (
    <div className="relative w-full min-h-[500px] lg:min-h-[600px] flex items-center overflow-hidden bg-[#030712] selection:bg-cyan-500/30 select-none">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1350&q=80"
          alt="Cloud data infrastructure"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.07] mix-blend-luminosity"
        />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-blue-600/20 to-cyan-500/0 blur-[120px] animate-pulse duration-[8000ms]" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-indigo-500/15 via-purple-500/5 to-transparent blur-[140px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030712]/50 to-slate-50" />
      </div>

      <div 
        className="absolute inset-0 opacity-[0.15] z-0 pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at 50% 50%, black 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 60%, transparent 100%)'
        }}
      />

      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div variants={fadeInUp} className="flex items-center gap-2.5 px-4 py-2 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-full text-xs font-medium tracking-widest text-cyan-400 shadow-xl shadow-black/40 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Cloud Insights & Dev Tutorials
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
            <span className="inline-block bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">Cloudedata</span>{' '}
            <span className="inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(34,211,238,0.2)]">Blog</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-base md:text-xl text-slate-400 max-w-2xl mb-10 font-normal leading-relaxed tracking-wide">
            Cutting-edge conversations on cloud infrastructure, distributed microservices, and real-time data pipelines.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}