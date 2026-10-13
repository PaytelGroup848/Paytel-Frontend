import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  Cpu,
  Database,
  HardDrive,
  Monitor,
  Terminal,
  Star,
  MemoryStick,
  Wifi,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import SkeletonCard from "../../../components/ui/skeletons/SkeletonCard";
import { useVpsPlans } from "../../../hooks/useVps";
import RebuildVpsModal from "../../../pages/vps/slidebar/RebuildVpsModal";
import { metaPixel } from "../../../utils/metaPixel";

// ---- New: mobile component ----
import MobilePlansList from "./VpsPlansMobile";

const formatINR = (paise) => `₹${(Number(paise || 0) / 100).toLocaleString()}`;

// ---- Tiny media query hook ----
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
};

// ==================== Infinite Carousel (unchanged) ====================
const InfinitePlanCarousel = ({ plans, type, popularIdx, onNavigate }) => {
  // ... exactly the same code as before ...
  const CARDS_PER_PAGE = 4;
  const totalPlans = plans?.length ?? 0;
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  const goNext = useCallback(() => {
    if (totalPlans <= 1) return;
    setDirection("next");
    setActiveIndex((prev) => (prev + 1) % totalPlans);
  }, [totalPlans]);

  const goPrev = useCallback(() => {
    if (totalPlans <= 1) return;
    setDirection("prev");
    setActiveIndex((prev) => (prev - 1 + totalPlans) % totalPlans);
  }, [totalPlans]);

  const visibleCards = useMemo(() => {
    const cards = [];
    for (let i = 0; i < CARDS_PER_PAGE; i++) {
      const idx = (activeIndex + i) % totalPlans;
      cards.push({ ...plans[idx], _idx: idx });
    }
    return cards;
  }, [activeIndex, plans, totalPlans]);

  if (!plans || totalPlans === 0) return null;

  return (
    <div className="relative w-full max-w-[90vw] mx-auto">
      {totalPlans > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-xl border border-slate-200/60 text-slate-700 hover:bg-white hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-xl border border-slate-200/60 text-slate-700 hover:bg-white hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300"
          >
            <ArrowRight size={20} />
          </button>
        </>
      )}

      <div className="overflow-hidden rounded-3xl">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={activeIndex}
            custom={direction}
            initial={{ x: direction === "next" ? 200 : -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction === "next" ? -200 : 200, opacity: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-5 p-1"
          >
            {visibleCards.map((plan) => {
              const isPopular = plan._idx === popularIdx;
              return (
                <motion.div
                  key={plan.id}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className={`relative flex flex-col bg-white rounded-2xl overflow-hidden border transition-all duration-300
                    hover:shadow-2xl group cursor-pointer
                    ${
                      isPopular
                        ? "border-indigo-300 shadow-lg shadow-indigo-100/70 ring-2 ring-indigo-200"
                        : "border-slate-100 shadow-md hover:border-indigo-200"
                    }`}
                >
                  {isPopular && (
                    <div className="absolute -top-px left-0 right-0 flex justify-center">
                      <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-black px-5 py-1 rounded-b-xl flex items-center gap-1.5 shadow-md">
                        <Star className="w-3 h-3" fill="currentColor" />
                        MOST POPULAR
                      </div>
                    </div>
                  )}
                  <div
                    className={`h-1 w-full ${
                      isPopular
                        ? "bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400"
                        : "bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400"
                    }`}
                  />
                  <div
                    className={`flex flex-col flex-1 p-6 ${
                      isPopular ? "pt-7" : "pt-6"
                    }`}
                  >
                    {/* … card content unchanged … */}
                    <div className="mb-3">
                      <h3 className="text-lg font-black text-slate-800 tracking-tight truncate">
                        {plan.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                          Global Deploy
                        </span>
                      </div>
                    </div>
                    <div className="mb-4 pb-4 border-b border-slate-100">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-slate-900 tracking-tight">
                          {formatINR(plan.priceMonthly)}
                        </span>
                        <span className="text-slate-400 text-xs font-medium">/mo</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 flex-1 mb-5">
                      {[
                        { icon: Cpu, label: "vCPU", value: `${plan.vcpu} Cores` },
                        { icon: MemoryStick, label: "RAM", value: plan.ram },
                        { icon: HardDrive, label: "NVMe", value: plan.storage },
                        { icon: Wifi, label: "Speed", value: plan.portSpeed },
                        { icon: RotateCcw, label: "Backup", value: plan.backups },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <div
                              className={`p-1 rounded-md flex-shrink-0 ${
                                isPopular
                                  ? "bg-amber-50 text-amber-600"
                                  : "bg-indigo-50 text-indigo-500"
                              }`}
                            >
                              <Icon size={12} />
                            </div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                              {label}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-slate-700 text-right truncate">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() =>
                        onNavigate(`/vps/configure/${type}/${plan.id || plan._id}`)
                      }
                      className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300
                        flex items-center justify-center gap-2 group-hover:gap-3
                        ${
                          isPopular
                            ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-300"
                            : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300"
                        }`}
                    >
                      Deploy
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {totalPlans > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPlans }, (_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > activeIndex ? "next" : "prev");
                setActiveIndex(i);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "bg-indigo-600 w-8"
                  : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ==================== Main VpsPlans Component ====================
export default function VpsPlans() {
  const location = useLocation();
  const navigate = useNavigate();
  const [type, setType] = useState("linux");
  const { data: plans, isLoading } = useVpsPlans(type);
  const pricingRef = useRef(null);

  const popularIdx = plans ? Math.floor(plans.length / 2) : 0;

  // ---- Mobile detection ----
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    metaPixel.pageView();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-center">
          <div className="bg-bgLighter p-1 rounded-xl flex">
            <div className="w-32 h-10 bg-bgLight animate-pulse rounded-lg" />
            <div className="w-32 h-10 animate-pulse rounded-lg" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeletonCard height={400} />
          <SkeletonCard height={400} />
          <SkeletonCard height={400} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 font-sans text-slate-900 selection:bg-indigo-100 overflow-x-hidden">
      {/* Background blobs (unchanged) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[20%] w-[60%] h-[60%] bg-indigo-100/30 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-100/20 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-cyan-100/20 rounded-full blur-[90px] animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div ref={pricingRef} className="max-w-[1600px] mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Header – responsive text sizes */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-slate-100 px-5 py-1.5 md:px-6 md:py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="uppercase text-[10px] md:text-xs font-bold tracking-[2px] text-slate-500">
              Premium Cloud Infrastructure
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 mb-4">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              VPS Power
            </span>
          </h1>
          <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto font-light">
            High-performance NVMe VPS with dedicated resources. Lightning-fast deployment in under 60 seconds.
          </p>
        </div>

        {/* OS Toggle – slightly smaller on mobile */}
        <div className="flex justify-center mb-10 md:mb-12">
          <div className="bg-white p-1.5 rounded-3xl shadow-lg shadow-slate-200/80 border border-slate-100 flex">
            <button
              onClick={() => setType("linux")}
              className={`px-6 md:px-10 py-3 md:py-4 cursor-pointer rounded-2xl font-semibold text-xs md:text-sm transition-all duration-300 flex items-center gap-2 md:gap-3 ${
                type === "linux"
                  ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/30"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <Terminal size={18} className="hidden md:block" />
              <Terminal size={16} className="md:hidden" />
              LINUX VPS
            </button>
            <button
              onClick={() => setType("windows")}
              className={`px-6 md:px-10 py-3 md:py-4 rounded-2xl cursor-pointer font-semibold text-xs md:text-sm transition-all duration-300 flex items-center gap-2 md:gap-3 ${
                type === "windows"
                  ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/30"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <Monitor size={18} className="hidden md:block" />
              <Monitor size={16} className="md:hidden" />
              WINDOWS VPS
            </button>
          </div>
        </div>

        {/* Conditional rendering: mobile list or desktop carousel */}
        {isDesktop ? (
          <InfinitePlanCarousel
            plans={plans}
            type={type}
            popularIdx={popularIdx}
            onNavigate={(url) => navigate(url)}
          />
        ) : (
          <MobilePlansList
            plans={plans}
            type={type}
            popularIdx={popularIdx}
            onNavigate={(url) => navigate(url)}
          />
        )}

        <RebuildVpsModal type={type} />
      </div>
    </div>
  );
}