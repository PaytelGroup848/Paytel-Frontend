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

export default function LandingWordpress() {
  return (
    <>
      <Navbar />
      <WordPressBanner/>
      <Plans/>
      <MoneyBack/>
         <MarqueeGallery/>
      <SuccessBanner/>
      <WordPressFeatures/>
      <Reviews/>
      <Banneroff/>
      <WordPressFAQ/>
      <Footer />
    </>
  );
}