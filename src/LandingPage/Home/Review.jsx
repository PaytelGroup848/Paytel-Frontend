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

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        fill={i < rating ? "#f59e0b" : "none"}
        stroke={i < rating ? "#f59e0b" : "#cbd5e1"}
        strokeWidth={2}
      />
    ))}
  </div>
);

const ReviewCard = ({ review, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
    viewport={{ once: true }}
    className="flex-shrink-0 w-[320px] sm:w-[360px] bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all p-6 flex flex-col gap-4"
  >
    <div className="flex items-center gap-3">
      <img
        src={review.avatar}
        alt={review.name}
        className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-100"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-slate-800">{review.name}</h4>
        <div className="flex items-center gap-2 mt-0.5">
          {/* Google badge */}
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500 bg-slate-100 rounded-full px-2 py-0.5">
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
    <p className="text-sm text-slate-600 leading-relaxed flex-1">{review.text}</p>
  </motion.div>
);

export default function Reviews() {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const isVisible = useRef(false);
  const isHovering = useRef(false);
  const sectionRef = useRef(null);

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

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollAmount = 0;
    const speed = 0.4;

    const scroll = () => {
      if (isVisible.current && !isHovering.current) {
        scrollAmount += speed;
        if (scrollAmount >= container.scrollWidth / 2) {
          scrollAmount = 0;
          container.scrollLeft = 0;
        } else {
          container.scrollLeft = scrollAmount;
        }
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

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
      className="w-full mt-2 p-0 mb-0 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
            Trusted by Businesses Across India
          </h1>
          <p className="text-slate-500 text-lg">
            See what our clients say about CloudeData
          </p>
        </motion.div>

        {/* Scrollable track with fade‑edge mask */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden py-2 no-scrollbar"
          style={{
            scrollBehavior: "smooth",
            maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
          }}
        >
          {reviews.map((review, idx) => (
            <ReviewCard key={review.id} review={review} index={idx} />
          ))}
          {reviews.map((review, idx) => (
            <ReviewCard key={`dup-${review.id}`} review={review} index={idx + reviews.length} />
          ))}
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