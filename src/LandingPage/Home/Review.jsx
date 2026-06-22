import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, Award, TrendingUp, Zap } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Amit Sharma",
    role: "CEO, TechSolutions",
    avatar: "https://i.pravatar.cc/150?img=11",
    time: "3 months ago",
    rating: 5,
    text: "Cloud infrastructure at its best! Tally on Cloud runs incredibly fast – we saw 40% better performance after switching. The migration was seamless and support team is exceptional.",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "CTO, DigitalWave",
    avatar: "https://i.pravatar.cc/150?img=5",
    time: "2 months ago",
    rating: 5,
    text: "Outstanding VPS service. The NVMe storage and uptime are unmatched. Their support team is always responsive and goes above and beyond to help.",
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    role: "Founder, BusySoft",
    avatar: "https://i.pravatar.cc/150?img=32",
    time: "1 year ago",
    rating: 5,
    text: "Busy on Cloud is flawless – it handles our daily workload without any lag. Highly recommended for businesses looking for reliable cloud solutions.",
  },
  {
    id: 4,
    name: "Sneha Iyer",
    role: "Finance Head, MargGroup",
    avatar: "https://i.pravatar.cc/150?img=9",
    time: "6 months ago",
    rating: 5,
    text: "Marg on Cloud is a game changer for our accounting needs. Simple, secure, and blazing fast. We've reduced our IT costs by 30% since switching.",
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "IT Director, GrowthLabs",
    avatar: "https://i.pravatar.cc/150?img=7",
    time: "4 months ago",
    rating: 5,
    text: "We migrated all our VPS to this provider and the process was seamless. Great value for money with enterprise-grade performance.",
  },
  {
    id: 6,
    name: "Ananya Reddy",
    role: "Operations Head, CloudFirst",
    avatar: "https://i.pravatar.cc/150?img=16",
    time: "8 months ago",
    rating: 5,
    text: "Excellent cloud solutions for growing businesses. Their uptime guarantee gives complete peace of mind. Best decision we made this year.",
  },
  {
    id: 7,
    name: "Deepak Malhotra",
    role: "MD, ServerPro India",
    avatar: "https://i.pravatar.cc/150?img=12",
    time: "5 months ago",
    rating: 5,
    text: "The Windows VPS performance is incredible. We're running multiple applications without any performance issues. Their infrastructure is top-notch.",
  },
  {
    id: 8,
    name: "Meera Desai",
    role: "Director, WebAgency",
    avatar: "https://i.pravatar.cc/150?img=23",
    time: "2 weeks ago",
    rating: 5,
    text: "WordPress hosting that actually delivers. Our client sites load 3x faster. The 1-click installer and free SSL made setup a breeze.",
  },
];

/* StarRating component */
const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0, rotate: -20 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
        viewport={{ once: true }}
      >
        <Star
          size={14}
          fill={i < rating ? "#f59e0b" : "none"}
          stroke={i < rating ? "#f59e0b" : "#94a3b8"}
          strokeWidth={2}
        />
      </motion.div>
    ))}
  </div>
);

/* Individual review card */
const ReviewCard = ({ review, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05, duration: 0.3 }}
    viewport={{ once: true }}
    whileHover={{ 
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3 }
    }}
    className="flex-shrink-0 w-[340px] sm:w-[380px] relative rounded-2xl p-[1.5px] bg-gradient-to-br from-indigo-400/60 via-purple-400/60 to-cyan-400/60 transition-all duration-300 hover:shadow-2xl"
  >
    {/* Inner glass card */}
    <div className="relative h-full rounded-2xl p-6 flex flex-col gap-4 bg-gradient-to-br from-white/95 via-white/90 to-blue-50/95 backdrop-blur-xl">
      {/* Decorative quote */}
      <div className="absolute top-2 right-4 text-7xl font-serif text-indigo-200/30 select-none pointer-events-none leading-none">
        "
      </div>

      {/* Header with avatar and info */}
      <div className="flex items-start gap-3">
        <div className="relative">
          <img
            src={review.avatar}
            alt={review.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-300/60 shadow-lg"
            loading="lazy"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center ring-2 ring-white">
            <Award size={10} className="text-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-slate-800">{review.name}</h4>
          <p className="text-xs text-slate-500 font-medium">{review.role}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-100/80 rounded-full px-2.5 py-0.5 border border-slate-200/50">
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </span>
            <span className="text-xs text-slate-400">{review.time}</span>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>

      {/* Review text */}
      <p className="text-sm text-slate-600 leading-relaxed flex-1 relative z-10 italic">
        "{review.text}"
      </p>

      {/* Verified badge */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
          <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-[10px] font-medium text-slate-500">Verified Purchase</span>
      </div>
    </div>
  </motion.div>
);

/* Main Reviews component */
export default function Reviews() {
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const animationRef1 = useRef(null);
  const animationRef2 = useRef(null);
  const isVisible = useRef(false);
  const sectionRef = useRef(null);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Smooth scroll animation
  useEffect(() => {
    const container1 = scrollRef1.current;
    const container2 = scrollRef2.current;
    if (!container1 || !container2) return;

    let lastTimestamp = 0;
    const speed = 0.6; // pixels per frame

    const scroll = (timestamp) => {
      if (isVisible.current) {
        if (lastTimestamp) {
          const delta = timestamp - lastTimestamp;
          const moveAmount = (delta * speed) / 16;

          // Row 1: Left to right
          container1.scrollLeft += moveAmount;
          const halfway1 = container1.scrollWidth / 2;
          if (container1.scrollLeft >= halfway1) {
            container1.scrollLeft -= halfway1;
          }

          // Row 2: Right to left
          container2.scrollLeft -= moveAmount;
          if (container2.scrollLeft <= 0) {
            container2.scrollLeft += container2.scrollWidth / 2;
          }
        }
        lastTimestamp = timestamp;
      } else {
        lastTimestamp = 0;
      }
      animationRef1.current = requestAnimationFrame(scroll);
    };

    animationRef1.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef1.current) cancelAnimationFrame(animationRef1.current);
    };
  }, []);

  // Duplicate reviews for seamless loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 py-10 md:py-10"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-96 h-96 bg-indigo-300/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/15 rounded-full blur-3xl"
        />
        
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, #4338ca 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-sm border border-indigo-200/60 text-indigo-700 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase shadow-lg shadow-indigo-100/30"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-indigo-500">
              <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
            </svg>
            Client Testimonials
          </motion.span>

          <h1 className="mt-6 text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
            Trusted by businesses{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              across India
            </span>
          </h1>
          
          <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto font-normal">
            Join thousands of satisfied customers who trust CloudeData for their cloud hosting needs
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
            {[
              { icon: Star, label: "4.9/5 Rating", value: "2,500+ Reviews" },
              { icon: TrendingUp, label: "99.9% Uptime", value: "Enterprise SLA" },
              { icon: Zap, label: "40% Faster", value: "Performance Boost" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-slate-200 shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <stat.icon size={18} className="text-indigo-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-800">{stat.label}</p>
                  <p className="text-xs text-slate-500">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Row 1: Left to Right */}
        <div className="relative mb-8">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 via-blue-50/30 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-indigo-50/20 via-blue-50/30 to-transparent pointer-events-none z-10" />
          
          <div
            ref={scrollRef1}
            className="flex gap-6 overflow-x-auto py-4 no-scrollbar"
            style={{ scrollBehavior: "auto" }}
          >
            {duplicatedReviews.map((review, idx) => (
              <ReviewCard key={`row1-${review.id}-${idx}`} review={review} index={idx} />
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 via-blue-50/30 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-indigo-50/20 via-blue-50/30 to-transparent pointer-events-none z-10" />
          
          <div
            ref={scrollRef2}
            className="flex gap-6 overflow-x-auto py-4 no-scrollbar"
            style={{ scrollBehavior: "auto", direction: "rtl" }}
          >
            {duplicatedReviews.map((review, idx) => (
              <div key={`row2-${review.id}-${idx}`} style={{ direction: "ltr" }}>
                <ReviewCard review={review} index={idx} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}