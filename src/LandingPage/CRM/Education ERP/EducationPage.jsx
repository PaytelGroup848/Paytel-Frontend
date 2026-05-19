import Banner from "./Banner"
import Collaboration from "./Collaboration"
import CrmBenefits from "./CrmBenefits"
import FeaturesCRM from "./FeaturesCRM"
import Facts from "./Facts"
import Navbar from "../../Navbar";
 import Footer from "../../Footer"


export default function EducationPage() {
    return <>
    <Navbar/>
    <div className="mt-5">

         <Banner/>

    </div>
   
    <FeaturesCRM/>
    <Facts/>
    <CrmBenefits/>
    <Collaboration/>
    <Footer/>
    
    </>
}