import Navbar from "../Navbar";
import Footer from "../Footer";

import PricingService from "./PricingService";
import BenefitsPlan from "./BenefitsPlan";
import CloudePlans from "./CloudePlans";
import Plans from "../../pages/plans/Plan";


export default function PricingPage(){
    return <>

    <Navbar/>
    <PricingService/>
    <Plans/>
    <CloudePlans/>
    <BenefitsPlan/>

    <Footer/>
 
    </>
}