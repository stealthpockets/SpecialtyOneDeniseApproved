import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const CaseStudyHighlight = () => {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 heading-luxury">
            Real Deals. No Guesswork. Just <span className="text-gradient">Results</span>.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Case Study Image */}
          <div className="relative gradient-overlay rounded-lg overflow-hidden h-[400px] animate-fade-in">
            <img 
              src="/dist/assets/success-stories/desert-trails.webp" 
              alt="Desert Trails RV Park" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 w-full p-6 z-10">
              <span className="bg-white/90 text-plum px-3 py-1 rounded-full text-sm font-medium">
                RV Park
              </span>
              <h3 className="text-white text-2xl font-bold mt-2">
                Desert Trails RV Park
              </h3>
              <p className="text-white text-lg">
                Tucson, AZ
              </p>
            </div>
          </div>
          
          {/* Case Study Content */}
          <div className="flex flex-col justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Desert Trails RV Park
            </h3>
            <p className="text-xl mb-4 text-plum font-medium">
              Closed at full asking price—during COVID.
            </p>
            <p className="text-lg mb-6">
              Zoning issues. Incomplete financials. COVID uncertainty. 
              We engineered a clean close with a premium outcome when others would've failed.
            </p>
            
            <div className="bg-white p-6 rounded-lg mb-6 border-l-4 border-plum shadow-sm">
              <p className="italic text-gray-700 mb-2">
                "Andrew took charge of everything. We closed at full price—even during COVID."
              </p>
              <p className="font-medium">
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
