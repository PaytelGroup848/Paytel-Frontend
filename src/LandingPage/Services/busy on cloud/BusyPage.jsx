import Banner from "./Banner";
import Features from "./Features";
import BusyFaq from "./BusyFaq";
import BusyPlans from "./BusyPlans";
import Review from "./Review";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import { Helmet } from "react-helmet-async";

export default function BusyPage() {
  return (
    <>
      <Helmet>
        <title>
          Busy on Cloud | Secure Busy Accounting Software | Cloudedata
        </title>
        <meta
          name="description"
          content="Run Busy Accounting Software on Cloud with secure access, automatic backups, high uptime, and 24/7 expert support from Cloudedata."
        />
        <link rel="canonical" href="https://cloudedata.com/busy-on-cloud" />
      </Helmet>
      <div>
        <Navbar />
        <Banner />
        <BusyPlans />
        <Features />
        <BusyFaq />

        <Review />
        <Footer />
      </div>
    </>
  );
}
