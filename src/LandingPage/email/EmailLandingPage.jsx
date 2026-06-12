import Navbar from '../Navbar';
import Footer from '../Footer';
import EmailPlansPage from '../../pages/Emails/EmailPlan';


export default function  EmailLandingPage(){
    return<>
    <Navbar/>
    <div className="pt-16 md:pt-20">
        <EmailPlansPage/>
    </div>
    <Footer/>

    </>
}