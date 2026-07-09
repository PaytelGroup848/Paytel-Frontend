import Navbar from "../Navbar";
import Footer from "../Footer";
import CpanelBanner from "./Banner";
import CPanelHosting from "./feature";
import PricingCards from "./CpanelCards";
import HelpBanner from "./CallAgent";
import { Helmet } from "react-helmet-async";

export default function CPanelPage() {
  return (
    <>
      <Helmet>
        <title>
          cPanel Hosting in India | Fast, Secure Web Hosting | Cloudedata
        </title>
        <meta
          name="description"
          content="Get reliable cPanel hosting with free SSL, daily backups, unlimited bandwidth, fast setup, and 24/7 expert support from Cloudedata."
        />
        <link rel="canonical" href="https://cloudedata.com/c-panel" />
      </Helmet>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <CpanelBanner />
          <CPanelHosting />
          <PricingCards />
          <HelpBanner />
        </main>
        <Footer />
      </div>
    </>
  );
}
