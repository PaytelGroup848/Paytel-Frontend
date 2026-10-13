import Navbar from "../Navbar";
import Footer from "../Footer";
import EmailPlansPage from "../../pages/Emails/EmailPlan";
import { Helmet } from "react-helmet-async";

export default function EmailLandingPage() {
  return (
    <>
      <Helmet>
        <title>
          Business Email Hosting Plans | Secure Email Solutions | Cloudedata
        </title>
        <meta
          name="description"
          content="Choose Cloudedata business email hosting plans with secure mailboxes, spam protection, reliable uptime, and 24/7 expert support for your business."
        />
        <link rel="canonical" href="https://cloudedata.com/emails/plan" />
      </Helmet>
      <Navbar />
      <div className="pt-16 md:pt-20">
        <EmailPlansPage />
      </div>
      <Footer />
    </>
  );
}
