import Navbar from "../Navbar";
import Footer from "../Footer";
import WordPressBanner from "./banner";
import Plans from "../../pages/plans/Plan"
import MoneyBack from "../../components/moneyback";
import SuccessBanner from "../Home/successStories";
import MarqueeGallery from "../../components/MarqueeGallery";
import Banneroff from "../../components/banneroff";
import WordPressFeatures from "./featurWordpress";
import Reviews from "../Home/Review";
import WordPressFAQ from "./wordpressFaq";
import TrustBadge from "../Home/Trusted";
import ImageOnly from "../../components/dashboardImage";

import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function LandingWordpress() {
  const location = useLocation();
  const plansRef = useRef(null);

  useEffect(() => {
    if (location.state?.scrollToPlans && plansRef.current) {
      setTimeout(() => {
        plansRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <WordPressBanner/>
      <div className="mt-5 p-0">
        <TrustBadge/>
      </div>

      <div ref={plansRef}>   
        <Plans/>
      </div>

      <MoneyBack/>
      <MarqueeGallery/>
      <SuccessBanner/>
      <WordPressFeatures/>
      <Reviews/>
      <ImageOnly/>
      <Banneroff/>
      <WordPressFAQ/>
      <Footer />
    </>
  );
}