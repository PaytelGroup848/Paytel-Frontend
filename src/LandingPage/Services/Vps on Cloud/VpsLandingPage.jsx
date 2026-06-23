import Navbar from "../../Navbar";
import Footer from "../../Footer";
import Banner from "./banner";
import Features from "./Features";
import VpsPlans from "./VpsPlans";
import VpsMarketing from "./VpsMarketing";
import VpsFaq from "./VpsFaq";
import VpsComparison from "./comparePlans";
import SuccessBanner from "../../Home/successStories"
import  Moneyback from "../../../components/moneyback";
import OfferBanner from "../../../components/banneroff";
 




export default function VpsLandingpage(){
    return<>
   
        <Navbar/>
        <Banner/>
        <VpsPlans/>
        <Moneyback/>
        <Features/>
        <VpsComparison/>
    <SuccessBanner/>
        <VpsMarketing/>
        <OfferBanner/>
        
        <VpsFaq/>
        <Footer/>

    
     </>
}