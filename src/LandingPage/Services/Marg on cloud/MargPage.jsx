import Navbar from "../../Navbar";
import Footer from"../../Footer";
import Banner from "./Banner";
import Feature from "./features";
import MargPlans from "./MargPlans";
import MargSecurity from "./MragSecurity";

export default function Margpage(){
    return(
        <div>
            <Navbar/>
            <Banner/>
            <Feature/>
            <MargPlans/>
            <MargSecurity/>
            <Footer/>
        </div>
    )
}