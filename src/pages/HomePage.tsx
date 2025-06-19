import { LayeredHeroSection } from '../components/home/LayeredHeroSection';
import { TickerBox } from '../components/home/TickerBox';
import { HeroSection } from '../components/home/HeroSection';
import { TrustMetrics } from '../components/home/TrustMetrics';
import { PropertyTypes } from '../components/home/PropertyTypes';
import { CaseStudyHighlight } from '../components/home/CaseStudyHighlight';
import { ProcessOverview } from '../components/home/ProcessOverview';
import { Testimonials2 } from '../components/home/Testimonials2';
import { FinalCTA } from '../components/home/FinalCTA';
import { SEOHead } from '../components/ui/SEOHead';

const HomePage = () => {
  return (
    <>
      <SEOHead
        title="Specialty One Investment Brokerage | We Sell What Generalist Brokers Don't Understand"
        description="Specialized commercial real estate brokerage for manufactured housing, RV parks, and self-storage properties. $1B+ in closed transactions. Expert advisory and 1031 exchange services."
        keywords="commercial real estate brokerage, manufactured housing communities, RV parks, self storage investment, 1031 exchange, CRE advisory, specialty properties, investment brokerage"
        url="https://specialtyone.com"
      />
      <div className="bg-sand">
        <LayeredHeroSection />
        <TickerBox />
        <HeroSection />
        <TrustMetrics />        <PropertyTypes />        <CaseStudyHighlight />
        <ProcessOverview />
        <Testimonials2 />
        
        <FinalCTA />
      </div>
    </>
  );
};

export default HomePage;
