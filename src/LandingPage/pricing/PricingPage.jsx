import Navbar from "../Navbar";
import Footer from "../Footer";

import PricingService from "./PricingService";
import BenefitsPlan from "./BenefitsPlan";
import CloudePlans from "./CloudePlans";
import Plans from "../../pages/plans/Plan";
import PricingCards from "../C-panel/CpanelCards";
import BusyPlans from "../Services/busy on cloud/BusyPlans";
import TallyPlans from "../Services/tally on cloud/TallyPlans";
import { Helmet } from "react-helmet-async";

export default function PricingPage() {
  return (
    <>
      <Helmet>
        <title>
          Cloud Hosting Pricing | VPS & Business Solutions | Cloudedata
        </title>
        <meta
          name="description"
          content="Explore Cloudedata pricing for cloud hosting, VPS, WordPress hosting, business email, and cloud solutions with affordable plans and expert support."
        />
        <link rel="canonical" href="https://cloudedata.com/pricing" />
      </Helmet>
      <Navbar />
      <PricingService />
      <Plans />
      <CloudePlans />
      <PricingCards />
      <BusyPlans />
      <TallyPlans />
      <BenefitsPlan />

      <Footer />
    </>
  );
}
