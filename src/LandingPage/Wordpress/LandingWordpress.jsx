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
export default function LandingWordpress() {
  return (
    <>
      <Navbar />
      <WordPressBanner/>
      <div className="mt-5 p-0">
             <TrustBadge/>
      </div>
 
      <Plans/>
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