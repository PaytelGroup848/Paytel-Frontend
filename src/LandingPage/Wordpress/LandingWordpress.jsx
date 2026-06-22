import Navbar from "../Navbar";
import Footer from "../Footer";
import WordPressBanner from "./banner";
import Plans from "../../pages/plans/Plan"
import MoneyBack from "../../components/moneyback";


export default function LandingWordpress() {
  return (
    <>
      <Navbar />
      <WordPressBanner/>
      <Plans/>
      <MoneyBack/>
    


      <Footer />
    </>
  );
}