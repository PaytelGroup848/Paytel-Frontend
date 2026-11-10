import Navbar from "../../LandingPage/Navbar";
import Footer from "../../LandingPage/Footer";
import HeroSection from "./components/HeroSection";
import WhyRemoteAccessSection from "./components/WhyRemoteAccessSection";
import FeaturePlatformSection from "./components/FeaturePlatformSection";
import MoreFeaturesShowcase from "./components/MoreFeaturesShowcase";
import PricingSection from "./components/PricingSection";
import CustomerSections from "./components/CustomerSections";

export default function LR() {
  return (
    <div className="min-h-screen overflow-hidden bg-white font-sans text-slate-900">
      <Navbar />
      <main>
        <HeroSection />
        <WhyRemoteAccessSection />
        <FeaturePlatformSection />
        <MoreFeaturesShowcase />
        <PricingSection />
        <CustomerSections />
      </main>
      <Footer />
    </div>
  );
}
