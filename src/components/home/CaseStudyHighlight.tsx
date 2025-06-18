import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const CaseStudyHighlight = () => {
  return (
    <section className="section-padding bg-gradient-subtle luxury-gradient-overlay">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-6 max-w-4xl mx-auto">
            Real Deals. No Guesswork. Just <span className="text-gradient">Results</span>.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Case Study Image */}
          <div className="relative gradient-overlay rounded-xl overflow-hidden h-[450px] animate-fade-in shadow-card">
            <img 
              src="/dist/assets/success-stories/desert-trails.webp" 
              alt="Desert Trails RV Park" 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 w-full content-padding pb-8 z-10">
              <span className="bg-white/95 text-plum px-4 py-2 rounded-full text-caption font-medium backdrop-blur-sm">
                RV Park
              </span>
              <h3 className="text-white heading-sm mt-3">
                Desert Trails RV Park
              </h3>
              <p className="text-white text-body opacity-90">
                Tucson, AZ
              </p>
            </div>
          </div>
          
          {/* Case Study Content */}
          <div className="flex flex-col justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="heading-md mb-4">
              Desert Trails RV Park
            </h3>
            <p className="text-body-lg mb-6 text-plum font-medium">
              Closed at full asking price—during COVID.
            </p>
            <p className="text-body mb-8 leading-relaxed">
              Zoning issues. Incomplete financials. COVID uncertainty. 
              We engineered a clean close with a premium outcome when others would've failed.
            </p>
            
            <div className="card-luxury-white p-8 rounded-xl mb-8 border-l-4 border-plum">
              <p className="italic text-gray-700 mb-3 text-body">
                "Andrew took charge of everything. We closed at full price—even during COVID."
              </p>
              <p className="font-medium text-caption">
                — Pericles Wyatt
              </p>
            </div>
            
            <Button 
              to="/success-stories" 
              variant="primary"
              icon={<ArrowRight size={20} />}
              iconPosition="right"
            >
              More Client Success Stories
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
