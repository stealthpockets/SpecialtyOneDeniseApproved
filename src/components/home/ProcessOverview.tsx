import React from 'react';
import { ClipboardCheck, Users, LineChart, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';

const processSteps = [
  {
    icon: <ClipboardCheck size={32} className="text-white" />,
    title: 'Strategic Asset Assessment',
    description: 'We analyze your financials, timing, tax exposure, operational upside, and risks before the first buyer sees the deal.'
  },
  {
    icon: <Users size={32} className="text-white" />,
    title: 'Buyer Underwriting & Positioning',
    description: 'We know which buyers retrade, close, or stall. Our framework targets serious capital from day one.'
  },
  {
    icon: <LineChart size={32} className="text-white" />,
    title: 'Controlled Exposure & Tailored Marketing',
    description: 'Every deal gets custom video, photography, and dedicated property website with a unique marketing plan.'
  },
  {
    icon: <CheckCircle size={32} className="text-white" />,
    title: 'Negotiation & Close Management',
    description: 'From LOI to wire, we manage the deal like a product launch—structured terms and clean closing mechanics.'
  }
];

export const ProcessOverview = () => {
  return (
    <section className="py-16 bg-sand">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-gradient">Certainty Protocol™</span> Closes What Others Can't
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            No interns. No surprises. Clean closings, every time.
          </p>
        </div>
        
        <div className="relative">
          {/* Progress Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-plum to-sage transform -translate-x-1/2 z-0"></div>
          
          {/* Process Steps */}
          <div className="space-y-16 lg:space-y-0">
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                className={`
                  flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}
                  relative animate-fade-in
                `}
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                {/* Number Circle (Desktop) */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-plum to-amethyst flex items-center justify-center text-white font-bold text-xl">
                    {index + 1}
                  </div>
                </div>
                
                {/* Step Content */}
                <div className={`
                  lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}
                `}>
                  <div className="mb-4 lg:hidden">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-plum to-amethyst flex items-center justify-center text-white font-bold text-xl mx-auto">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="mb-6 lg:hidden flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-plum to-amethyst flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  
                  <h3 className="font-display text-xl font-bold mb-3 text-center lg:text-inherit">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 text-center lg:text-inherit">
                    {step.description}
                  </p>
                </div>
                
                {/* Icon Circle (Desktop) */}
                <div className={`hidden lg:flex lg:w-2/12 justify-center items-center`}>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-plum to-amethyst flex items-center justify-center shadow-lg">
                    {step.icon}
                  </div>
                </div>
                
                {/* Spacer for Alignment */}
                <div className="hidden lg:block lg:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-16">
          <Button to="/advantage" variant="primary">
            See How We Work
          </Button>
        </div>
      </div>
    </section>
  );
};