import Navbar from "../../Navbar";
import Footer from "../../Footer";
import Banner from "./Banner";
import Benefits from "./Benefits";
import FeaturesSection from "./Featuressection ";
import SocialProof from "./Socialproof ";
import FAQ from "./RmsFaq";
import { Helmet } from "react-helmet-async";

export default function RmsPage() {
  return (
    <>
      <Helmet>
        <title>
          Restaurant Management System | POS & Billing Software | Cloudedata
        </title>
        <meta
          name="description"
          content="Manage billing, POS, inventory, orders, tables, and reports with Cloudedata Restaurant Management System for faster, smarter restaurant operations."
        />
        <link
          rel="canonical"
          href="https://cloudedata.com/restaurant-management-system"
        />
      </Helmet>
      <Navbar />
      <Banner />
      <FeaturesSection />
      <FAQ />
      <SocialProof />

      <Footer />
    </>
  );
}
