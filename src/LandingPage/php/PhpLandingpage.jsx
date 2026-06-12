import Navbar from '../Navbar';
import Footer from '../Footer';
import PhpPlans from '../../pages/websites/php/PhpPlans';


export default function PhpLandingPage(){
    return<>


     <Navbar/>
      <div className="pt-16 md:pt-20">
            <PhpPlans/>
     </div>
     <Footer/>
         </>
}