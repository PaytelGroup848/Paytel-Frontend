import Navbar from "../../Navbar";
import Footer from "../../Footer";
import Banner from "./banner";
import Features from "./Features";
import VpsPlans from "./VpsPlans";
import VpsMarketing from "./VpsMarketing";
import VpsFaq from "./VpsFaq";





export default function VpsLandingpage(){
    return<>
   
        <Navbar/>
        <Banner/>
        <VpsPlans/>
        <Features/>
        <VpsMarketing/>
        <VpsFaq/>
        <Footer/>

    
     </>
}