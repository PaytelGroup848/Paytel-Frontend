// @ts-nocheck
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function Wordpress_Page() {
  // Video autoplay on scroll
  const videoRef = useRef(null);
  const videoSectionRef = useRef(null);
  const isVideoInView = useInView(videoSectionRef, { once: false, amount: 0.5 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    if (isVideoInView && videoRef.current && !isVideoPlaying) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else if (!isVideoInView && videoRef.current && isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  }, [isVideoInView, isVideoPlaying]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 overflow-x-hidden">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[20%] w-[60%] h-[60%] bg-indigo-100/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-100/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-cyan-100/20 rounded-full blur-[90px] animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="flex pt-14">
        <main className="flex-1 p-6 md:p-10 overflow-x-hidden relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto space-y-12"
          >
            {/* HEADER SECTION */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-3">
                <motion.div whileHover={{ rotate: 5, scale: 1.05 }} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-slate-100">
                  <i className="fa-brands fa-wordpress text-2xl"></i>
                </motion.div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-slate-900">WordPress Hosting</h1>
                  <p className="text-xs text-slate-500 font-medium">Manage and scale your online presence</p>
                </div>
              </div>

              <Link to="/plans">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="relative inline-flex items-center justify-center p-[2px] rounded-xl overflow-hidden group shadow-lg shadow-indigo-100">
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 animate-[spin_4s_linear_infinite]" />
                  <span className="relative px-6 py-3 bg-slate-900 rounded-xl text-[12px] font-black uppercase tracking-widest text-white group-hover:bg-slate-800 transition-all">
                    <i className="fa-solid fa-rocket mr-2 text-indigo-400"></i> Upgrade Now
                  </span>
                </motion.button>
              </Link>
            </motion.div>

            {/* MAIN PROMO CARD with NEW IMAGE */}
            <motion.section variants={itemVariants} className="relative bg-gradient-to-br from-indigo-700 via-purple-700 to-violet-800 p-8 md:p-16 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-200">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 animate-pulse" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl -ml-20 -mb-20 animate-pulse" style={{ animationDelay: '1s' }} />

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="max-w-xl text-center lg:text-left">
                  <span className="inline-block px-4 py-1.5 bg-indigo-500/30 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-indigo-100 mb-6 border border-white/10">
                    Performance Optimized
                  </span>
                  <h2 className="text-4xl md:text-6xl font-black leading-[1.05] text-white tracking-tighter">
                    Build faster with <span className="text-cyan-300 underline decoration-indigo-400/50 underline-offset-8">WordPress</span>
                  </h2>
                  <p className="text-base md:text-lg text-indigo-50/80 mt-8 leading-relaxed font-medium">
                    The world’s most popular website builder, supercharged by CloudeData's ultra-fast NVMe storage.
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-12">
                    <Link to="/plans">
                      <motion.button whileHover={{ y: -2 }} className="bg-white text-indigo-900 text-xs font-black uppercase tracking-widest px-10 py-5 rounded-2xl hover:bg-slate-50 transition-all shadow-2xl shadow-black/20">
                        Start Your Journey
                      </motion.button>
                    </Link>
                    <motion.button whileHover={{ y: -2 }} className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-black uppercase tracking-widest px-10 py-5 rounded-2xl hover:bg-white/20 transition-all">
                      Explore Features
                    </motion.button>
                  </div>
                </div>

                <div className="relative w-full max-w-[500px] group">
                  <div className="relative rounded-3xl overflow-hidden shadow-[0_32px_80px_-20px_rgba(0,0,0,0.4)] transform lg:rotate-3 group-hover:rotate-0 transition-all duration-700">
                    <img
                      src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop"
                      alt="WordPress dashboard"
                      className="w-full aspect-[4/3] object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                    />
                  </div>
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-6 -right-6 bg-emerald-500 text-white p-4 rounded-2xl shadow-xl flex flex-col items-center">
                    <span className="text-xl font-black">99.9%</span>
                    <span className="text-[9px] font-bold uppercase">Uptime</span>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* STATS SECTION - Enhanced */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-100 shadow-sm hover:shadow-lg transition-all">
                <i className="fa-brands fa-wordpress text-3xl text-indigo-500 mb-3"></i>
                <p className="text-2xl font-black text-slate-800">10M+</p>
                <p className="text-xs text-slate-500 font-medium">Websites Powered</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-100 shadow-sm hover:shadow-lg transition-all">
                <i className="fa-solid fa-gauge-high text-3xl text-indigo-500 mb-3"></i>
                <p className="text-2xl font-black text-slate-800">0.3s</p>
                <p className="text-xs text-slate-500 font-medium">Avg Load Time</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-100 shadow-sm hover:shadow-lg transition-all">
                <i className="fa-solid fa-globe text-3xl text-indigo-500 mb-3"></i>
                <p className="text-2xl font-black text-slate-800">200+</p>
                <p className="text-xs text-slate-500 font-medium">Global CDN Locations</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-100 shadow-sm hover:shadow-lg transition-all">
                <i className="fa-solid fa-headset text-3xl text-indigo-500 mb-3"></i>
                <p className="text-2xl font-black text-slate-800">24/7</p>
                <p className="text-xs text-slate-500 font-medium">Expert Support</p>
              </div>
            </motion.div>

            {/* FEATURE CARDS with NEW IMAGES */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard 
                icon="fa-bolt-lightning" 
                title="Litespeed Cache" 
                desc="4x faster page loading with our optimized server-side caching."
                image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop"
              />
              <FeatureCard 
                icon="fa-shield-halved" 
                title="Auto Updates" 
                desc="We keep your WordPress core and plugins secure automatically."
                image="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop"
              />
              <FeatureCard 
                icon="fa-microchip" 
                title="NVMe Storage" 
                desc="Say goodbye to slow HDDs. We use pure NVMe for maximum speed."
                image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop"
              />
            </motion.div>

            {/* NEW VIDEO SECTION - autoplay on scroll */}
            <motion.div ref={videoSectionRef} variants={itemVariants} className="relative rounded-3xl overflow-hidden shadow-xl group">
              <div className="relative aspect-video bg-black/10">
                <video
                  ref={videoRef}
                  src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-data-center-with-servers-3909-large.mp4"
                  poster="https://images.pexels.com/photos/2881230/pexels-photo-2881230.jpeg?auto=compress&cs=tinysrgb&w=800"
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all">
                    <i className="fa-solid fa-play text-white text-2xl ml-1"></i>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-white font-bold text-lg">WordPress Performance Demo</p>
                <p className="text-white/80 text-sm">Watch how CloudeData supercharges your WordPress site</p>
              </div>
            </motion.div>

            {/* PLUGINS & THEMES SHOWCASE (NEW) */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <i className="fa-brands fa-wordpress text-3xl text-indigo-600"></i>
                  <h3 className="text-xl font-black text-slate-800">50,000+ Plugins</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Access the entire WordPress plugin directory. From SEO to eCommerce, there's a plugin for everything.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["WooCommerce", "Yoast SEO", "Elementor", "WPForms", "MonsterInsights"].map((plugin) => (
                    <span key={plugin} className="px-3 py-1.5 bg-white rounded-full text-xs font-medium text-slate-600 shadow-sm">
                      {plugin}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-100 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <i className="fa-solid fa-paintbrush text-3xl text-emerald-600"></i>
                  <h3 className="text-xl font-black text-slate-800">Thousands of Themes</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Choose from thousands of free and premium themes. Build any website you can imagine.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Astra", "Divi", "OceanWP", "GeneratePress", "Neve"].map((theme) => (
                    <span key={theme} className="px-3 py-1.5 bg-white rounded-full text-xs font-medium text-slate-600 shadow-sm">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* HOW TO GET STARTED (Enhanced with icons) */}
            <motion.section variants={itemVariants} className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-black text-slate-900">Three steps to launch</h3>
                <p className="text-slate-500 text-sm mt-2">Professional hosting made simple.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                <Step number="1" title="Choose a Plan" desc="Select the WordPress plan that fits your needs." icon="fa-crown" />
                <Step number="2" title="Install in 1-Click" desc="Our auto-installer sets up WP in under 60 seconds." icon="fa-bolt" />
                <Step number="3" title="Go Live" desc="Connect your domain and share your site with the world." icon="fa-rocket" />
              </div>
            </motion.section>

            {/* FINAL CTA */}
            <motion.section variants={itemVariants} className="bg-slate-900 rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-black mb-4">Ready to build your dream?</h2>
                <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm">Join 10,000+ users who trust CloudeData for their online success.</p>
                <Link to="/plans">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest text-xs px-10 py-5 rounded-2xl transition-all">
                    Purchase Subscription
                  </motion.button>
                </Link>
              </div>
            </motion.section>

          </motion.div>
        </main>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

// Enhanced FeatureCard with image
function FeatureCard({ icon, title, desc, image }) {
  return (
    <motion.div whileHover={{ y: -8 }} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
      <div className="h-32 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-6">
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
          <i className={`fa-solid ${icon} text-lg`}></i>
        </div>
        <h4 className="font-black text-slate-900 mb-3">{title}</h4>
        <p className="text-sm text-slate-500 leading-relaxed font-medium">{desc}</p>
      </div>
    </motion.div>
  );
}

// Enhanced Step with icon
function Step({ number, title, desc, icon }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="text-center relative">
      <div className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-black mx-auto mb-6 shadow-xl relative z-10">
        {number}
      </div>
      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <i className={`fa-solid ${icon} text-lg`}></i>
      </div>
      <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
      <p className="text-sm text-slate-500 px-4">{desc}</p>
    </motion.div>
  );
}