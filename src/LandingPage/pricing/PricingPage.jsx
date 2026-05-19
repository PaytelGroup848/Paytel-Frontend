import Navbar from "../Navbar";
import Footer from "../Footer";

import PricingService from "./PricingService";
import BenefitsPlan from "./BenefitsPlan";
import CloudePlans from "./CloudePlans";


export default function PricingPage(){
    return <>

    <Navbar/>
  
    <PricingService/>
    <CloudePlans/>
    <BenefitsPlan/>

    <Footer/>
 
    </>
}