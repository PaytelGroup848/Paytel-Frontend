import Navbar from "../Navbar";
import Footer from "../Footer";

import PricingService from "./PricingService";
import BenefitsPlan from "./BenefitsPlan";
import CloudePlans from "./CloudePlans";
import Plans from "../../pages/plans/Plan";
import PricingCards from "../C-panel/CpanelCards";
import BusyPlans from "../Services/busy on cloud/BusyPlans";
import TallyPlans from "../Services/tally on cloud/TallyPlans";


export default function PricingPage(){
    return <>

    <Navbar/>
    <PricingService/>
    <Plans/>
    <CloudePlans/>
    <PricingCards/>
    <BusyPlans/>
    <TallyPlans/>
    <BenefitsPlan/>

    <Footer/>
 
    </>
}