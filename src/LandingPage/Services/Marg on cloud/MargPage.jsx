import Navbar from "../../Navbar";
import Footer from "../../Footer";
import Banner from "./Banner";
import Feature from "./features";
import MargPlans from "./MargPlans";
import MargSecurity from "./MragSecurity";
import { Helmet } from "react-helmet-async";

export default function Margpage() {
  return (
    <>
      <Helmet>
        <title>Marg on Cloud | Secure Marg ERP Hosting | Cloudedata</title>
        <meta
          name="description"
          content="Access Marg ERP on Cloud securely from anywhere with fast performance, automatic backups, high uptime, and 24/7 expert support by Cloudedata."
        />
        <link rel="canonical" href="https://cloudedata.com/marg-on-cloud" />
      </Helmet>
      <div>
        <Navbar />
        <Banner />
        <MargPlans />
        <Feature />
        <MargSecurity />
        <Footer />
      </div>
    </>
  );
}
