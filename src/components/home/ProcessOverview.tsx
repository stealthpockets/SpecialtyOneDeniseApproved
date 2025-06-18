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
    <section className="section-padding bg-sand luxury-gradient-overlay">
      <div className="container-custom">
        <div className="text-center mb-20">
          <h2 className="heading-lg mb-6 max-w-4xl mx-auto">
            Our <span className="text-gradient">Certainty Protocol™</span> Closes What Others Can't
          </h2>
          <p className="text-body-lg text-gray-700 max-w-3xl mx-auto">
            No interns. No surprises. Clean closings, every time.
          </p>
        </div>
        
        <div className="relative">
          {/* Progress Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-plum via-amethyst to-sage transform -translate-x-1/2 z-0 opacity-30"></div>
          
          {/* Process Steps */}
          <div className="space-y-20 lg:space-y-0">
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
                  <div className="w-14 h-14 rounded-full bg-luxury-purple flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {index + 1}
                  </div>
                </div>
                
                {/* Step Content */}
                <div className={`
                  lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-20 lg:text-right' : 'lg:pl-20'}
                `}>
                  <div className="mb-6 lg:hidden">
                    <div className="w-14 h-14 rounded-full bg-luxury-purple flex items-center justify-center text-white font-bold text-xl mx-auto shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="mb-8 lg:hidden flex justify-center">
                    <div className="w-18 h-18 rounded-full bg-luxury-purple flex items-center justify-center shadow-lg">
                      {step.icon}
                    </div>
                  </div>
                  
                  <h3 className="heading-sm mb-4 text-center lg:text-inherit">
                    {step.title}
                  </h3>
                  <p className="text-body text-gray-700 text-center lg:text-inherit leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Icon Circle (Desktop) */}
                <div className={`hidden lg:flex lg:w-2/12 justify-center items-center`}>
                  <div className="w-18 h-18 rounded-full bg-luxury-purple flex items-center justify-center shadow-lg">
                    {step.icon}
                  </div>
                </div>
                
                {/* Spacer for Alignment */}
                <div className="hidden lg:block lg:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-20">
          <Button to="/advantage" variant="primary">
            See How We Work
          </Button>
        </div>
      </div>
    </section>
  );
};
