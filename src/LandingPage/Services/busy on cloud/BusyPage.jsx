import Banner from "./Banner";
import Features from "./Features";
import BusyFaq from "./BusyFaq";
import BusyPlans from "./BusyPlans";
import Review from "./Review";
import Navbar from "../../Navbar";
import Footer from "../../Footer";







export default function BusyPage() {
  return (
    <div>
        <Navbar/>
      <Banner />
       <BusyPlans />
      <Features />
      <BusyFaq />
     
      <Review />
      <Footer />
    </div>
  );
}