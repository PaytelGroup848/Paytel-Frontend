import Navbar from "../Navbar";
import Footer from "../Footer";
import VpsPlans from "../../pages/vps/VpsPlans";

export default function Landingvps() {
  return (
    <>
      <Navbar />
      
      <div className="pt-16 md:pt-20">
        <VpsPlans />
      </div>
      <Footer />
    </>
  );
}