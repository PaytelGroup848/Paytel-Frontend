import Navbar from '../Navbar';
import Footer from '../Footer';
import CpanelBanner from './Banner';
import CPanelHosting from './feature';
import PricingCards from './CpanelCards';
import HelpBanner from './CallAgent';

export default function CPanelPage() {
  return (
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
  );
}