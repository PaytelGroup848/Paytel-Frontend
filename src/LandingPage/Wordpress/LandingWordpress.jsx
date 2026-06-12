import Navbar from "../Navbar";
import Footer from "../Footer";
import Wordpress_Page from "../../pages/websites/wordpress/WordPress_Page";

export default function LandingWordpress() {
  return (
    <>
      <Navbar />
      <div className="pt-16 md:pt-20">
        <Wordpress_Page />
      </div>
      <Footer />
    </>
  );
}