import Navbar from "../Navbar";
import Footer from "../Footer";
import PhpPlans from "../../pages/websites/php/PhpPlans";
import { Helmet } from "react-helmet-async";

export default function PhpLandingPage() {
  return (
    <>
      <Helmet>
        <title>
          PHP Hosting in India | Fast & Secure Web Hosting | Cloudedata
        </title>
        <meta
          name="description"
          content="Host PHP websites with Cloudedata. Enjoy fast servers, free SSL, daily backups, high uptime, scalable hosting, and 24/7 expert support."
        />
        <link rel="canonical" href="https://cloudedata.com/php-hosting" />
      </Helmet>
      <Navbar />
      <div className="pt-16 md:pt-20">
        <PhpPlans />
      </div>
      <Footer />
    </>
  );
}
