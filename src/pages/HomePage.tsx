import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TrustMetrics } from '../components/home/TrustMetrics';
import { PropertyTypes } from '../components/home/PropertyTypes';
import { CaseStudyHighlight } from '../components/home/CaseStudyHighlight';
import { ProcessOverview } from '../components/home/ProcessOverview';
import { ExclusiveNetworks } from '../components/home/ExclusiveNetworks';
import { Testimonials } from '../components/home/Testimonials';
import { FinalCTA } from '../components/home/FinalCTA';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <TrustMetrics />
      <PropertyTypes />
      <CaseStudyHighlight />
      <ProcessOverview />
      <ExclusiveNetworks />
      <Testimonials />
      <FinalCTA />
    </>
  );
};

export default HomePage;