import Navbar from "../../Navbar";
import Footer from "../../Footer";
import Banner from "./Banner";
import Benefits from "./Benefits";
import FeaturesSection from "./Featuressection ";
import SocialProof from "./Socialproof ";
import FAQ from "./RmsFaq";


export default function RmsPage(){
    return<>
     <Navbar/>
     <Banner/>
     <FeaturesSection/>
     <FAQ/>
     <SocialProof/>

    <Footer/>
    </>
}