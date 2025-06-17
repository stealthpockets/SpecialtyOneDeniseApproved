import { LayeredHeroSection } from '../components/home/LayeredHeroSection';
import { TickerBox } from '../components/home/TickerBox';
import { HeroSection } from '../components/home/HeroSection';
import { TrustMetrics } from '../components/home/TrustMetrics';
import { PropertyTypes } from '../components/home/PropertyTypes';
import { CaseStudyHighlight } from '../components/home/CaseStudyHighlight';
import { ProcessOverview } from '../components/home/ProcessOverview';
import { Testimonials2 } from '../components/home/Testimonials2';
import { FinalCTA } from '../components/home/FinalCTA';

const HomePage = () => {
  return (
    <div className="bg-sand">
      <LayeredHeroSection />
      <TickerBox />
      <HeroSection />
      <TrustMetrics />
      <PropertyTypes />      <CaseStudyHighlight />
      <ProcessOverview />
      <Testimonials2 />
      <FinalCTA />
    </div>
  );
};

export default HomePage;
