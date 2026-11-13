import { useEffect, useState } from "react";
import PrivacyPage from "./PrivacyPage";
import TermsAndConditions from "./TermsAndConditions";
import RefundPolicy from "./RefundPolicy";
import { testimonialImages } from "./data";
import HeroSection from "./HeroSection";
import FeaturesPricingSection from "./FeaturesPricingSection";
import ProductSection from "./ProductSection";
import TestimonialsSection from "./TestimonialsSection";
import StatsSection from "./StatsSection";
import FaqCtaSection from "./FaqCtaSection";
import Navbar from "../../LandingPage/Navbar";
import Footer from "../../LandingPage/Footer";

function Index() {
  const [showEnquiry, setShowEnquiry] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);

  const [, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => {
        return (prev + 1) % testimonialImages.length;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const [activeFeature, setActiveFeature] = useState(null);
  const scrollTo = (id) => {
    setMobileOpen(false);

    requestAnimationFrame(() => {
      const target = document.getElementById(id);

      if (!target) {
        return;
      }

      const headerOffset = 96;
      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  };
  const [currentPath, setCurrentPath] = useState(
    window.location.pathname
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigateTo = (path) => {
    if (window.location.pathname === path) {
      return;
    }

    window.history.pushState({}, "", path);

    setCurrentPath(path);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setMobileOpen(false);
  };



  const goToPrivacy = () => {
    navigateTo("/privacy-policy");
  };

  const goToTerms = () => {
    navigateTo("/terms-and-conditions");
  };

  const goToRefund = () => {
    navigateTo("/refund-policy");
  };

  const goToHome = () => {
    navigateTo("/");
  };
  if (currentPath === "/privacy-policy") {
    return <PrivacyPage onBack={goToHome} />;
  }

  if (currentPath === "/terms-and-conditions") {
    return <TermsAndConditions onBack={goToHome} />;
  }

  if (currentPath === "/refund-policy") {
    return <RefundPolicy onBack={goToHome} />;
  }

 
  return (
    <div className="min-h-screen bg-white text-slate-900">
      
      <main>
        <Navbar/>
        <HeroSection />
        <FeaturesPricingSection activeFeature={activeFeature} setActiveFeature={setActiveFeature} />
        <ProductSection scrollTo={scrollTo} />
        <TestimonialsSection />
        <StatsSection />
        <FaqCtaSection faqOpen={faqOpen} setFaqOpen={setFaqOpen}/>
        <Footer/>
      </main>
   
    </div>
  );
}

export default Index;
