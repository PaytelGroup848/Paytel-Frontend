import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Amit Sharma",
    avatar: "https://i.pravatar.cc/150?img=11",
    time: "3 months ago",
    rating: 5,
    text: "Cloud infrastructure at its best! Tally on Cloud runs incredibly fast – we saw 40% better performance after switching.",
  },
  {
    id: 2,
    name: "Priya Patel",
    avatar: "https://i.pravatar.cc/150?img=5",
    time: "2 months ago",
    rating: 5,
    text: "Outstanding VPS service. The NVMe storage and uptime are unmatched. Their support team is always responsive.",
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    avatar: "https://i.pravatar.cc/150?img=32",
    time: "1 year ago",
    rating: 5,
    text: "Busy on Cloud is flawless – it handles our daily workload without any lag. Highly recommended.",
  },
  {
    id: 4,
    name: "Sneha Iyer",
    avatar: "https://i.pravatar.cc/150?img=9",
    time: "6 months ago",
    rating: 5,
    text: "Marg on Cloud is a game changer for our accounting needs. Simple, secure, and blazing fast.",
  },
  {
    id: 5,
    name: "Vikram Singh",
    avatar: "https://i.pravatar.cc/150?img=7",
    time: "4 months ago",
    rating: 5,
    text: "We migrated all our VPS to this provider and the process was seamless. Great value for money.",
  },
  {
    id: 6,
    name: "Ananya Reddy",
    avatar: "https://i.pravatar.cc/150?img=16",
    time: "8 months ago",
    rating: 5,
    text: "Excellent cloud solutions for growing businesses. Their uptime guarantee gives complete peace of mind.",
  },
];

/* ── StarRating with micro‑animation ── */
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

/* ── Individual card (shiny + glass) ── */
const ReviewCard = ({ review, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className="flex-shrink-0 w-[320px] sm:w-[360px] relative rounded-2xl p-[1px] bg-gradient-to-br from-indigo-400/70 via-purple-400/70 to-cyan-400/70 transition-all duration-300"
    style={{
      boxShadow: "0 4px 20px -5px rgba(0,0,0,0.05), 0 0 0 1px rgba(99,102,241,0.05)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow =
        "0 20px 35px -8px rgba(99,102,241,0.15), 0 0 0 1px rgba(99,102,241,0.3)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow =
        "0 4px 20px -5px rgba(0,0,0,0.05), 0 0 0 1px rgba(99,102,241,0.05)";
    }}
  >
    {/* Inner shiny white glass */}
    <div
      className="relative h-full rounded-2xl p-6 flex flex-col gap-4 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(252,252,252,0.8) 50%, rgba(255,255,255,0.9) 100%)",
        backdropFilter: "blur(10px)",
        boxShadow: "inset 0 1px 2px rgba(255,255,255,0.6)",
      }}
    >
      {/* Big faint quote mark */}
      <div className="absolute top-2 right-4 text-8xl font-serif text-indigo-100/40 select-none pointer-events-none">
        “
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={review.avatar}
            alt={review.name}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-400/60"
            loading="lazy"
          />
          <div className="absolute inset-0 rounded-full bg-indigo-400/20 blur-md -z-10" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-slate-800">{review.name}</h4>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-600 bg-slate-100/80 rounded-full px-2 py-0.5">
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
        <div className="ml-auto">
          <StarRating rating={review.rating} />
        </div>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed flex-1 relative z-10">
        “{review.text}”
      </p>
    </div>
  </motion.div>
);

/* ── Main component ── */
export default function Reviews() {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const isVisible = useRef(false);
  const isHovering = useRef(false);
  const sectionRef = useRef(null);

  // Intersection Observer – auto play only when section is in view
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

  // Auto scroll animation – smooth and infinite
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let lastTimestamp = 0;
    const speed = 0.5; // pixels per frame (~30px/sec)

    const scroll = (timestamp) => {
      if (isVisible.current && !isHovering.current) {
        // Use time delta for consistent speed
        if (lastTimestamp) {
          const delta = timestamp - lastTimestamp;
          container.scrollLeft += (delta * speed) / 16; // normalize to 60fps
        }
        lastTimestamp = timestamp;

        // Seamless looping: when scroll reaches duplicate set, reset without visual jump
        const halfway = container.scrollWidth / 2;
        if (container.scrollLeft >= halfway) {
          container.scrollLeft -= halfway;
        }
      } else {
        lastTimestamp = 0; // reset timestamp on pause
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Pause on hover
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const pause = () => { isHovering.current = true; };
    const resume = () => { isHovering.current = false; };

    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", resume);

    return () => {
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full mt-2 p-0 mb-0 overflow-hidden relative bg-gradient-to-br from-[#f8faff] via-[#f0f4ff] to-[#f4f6fc]"
    >
      {/* Soft blobs in background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-indigo-300/10 rounded-full blur-3xl" />
        <div className="absolute -top-20 left-10 w-[30rem] h-[30rem] bg-purple-300/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-[28rem] h-[28rem] bg-cyan-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[24rem] h-[24rem] bg-blue-300/10 rounded-full blur-3xl" />

        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #4338ca 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-5 py-1.5 bg-white/80 backdrop-blur-sm border border-indigo-200/60 text-indigo-700 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase shadow-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-indigo-500">
              <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
            </svg>
            Client Testimonials
          </span>
          <h1 className="mt-6 text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            Trusted by Businesses{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">
              Across India
            </span>
          </h1>
          <p className="mt-3 text-slate-500 text-lg max-w-2xl mx-auto">
            See what our clients say about CloudeData
          </p>
        </motion.div>

        {/* Scroll container with side blur */}
        <div className="relative">
          {/* Left blur overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#f8faff] via-[#f0f4ff]/80 to-transparent pointer-events-none z-10" />
          {/* Right blur overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#f4f6fc] via-[#f0f4ff]/80 to-transparent pointer-events-none z-10" />

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto py-2 no-scrollbar"
            style={{ scrollBehavior: "smooth" }}
          >
            {reviews.map((review, idx) => (
              <ReviewCard key={review.id} review={review} index={idx} />
            ))}
            {/* Duplicate set for seamless loop */}
            {reviews.map((review, idx) => (
              <ReviewCard key={`dup-${review.id}`} review={review} index={idx + reviews.length} />
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