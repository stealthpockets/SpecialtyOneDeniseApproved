import { Lock, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

export const ExclusiveNetworks = () => {
  return (
    <section className="py-16 bg-gradient-hero text-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Quiet Listings. Vetted Buyers. Outcome-Obsessed.
          </h2>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            Choose the path that fits your strategic needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Buyers */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 animate-fade-in">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Lock size={32} className="text-white" />
              </div>
            </div>
            
            <h3 className="font-display text-2xl font-bold mb-4 text-center">
              For Buyers
            </h3>
            
            <p className="text-lg mb-6 text-center">
              Get access to real off-market deals before they hit LoopNet.
              Our exclusive network gives you early access to premium opportunities.
            </p>
            
            <ul className="mb-8 space-y-3">
              <li className="flex items-start">
                <span className="mr-2 mt-1 text-sage">✓</span>
                <span>Off-market listings you won't find elsewhere</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1 text-sage">✓</span>
                <span>NDA-gated packages with real underwriting</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1 text-sage">✓</span>
                <span>Direct seller conversations when timing demands it</span>
              </li>
            </ul>
            
            <div className="text-center">              <Button 
                href="https://form.typeform.com/to/B0GIZ1ht" 
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                Apply for Access
              </Button>
            </div>
          </div>
          
          {/* For Sellers */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <ShieldCheck size={32} className="text-white" />
              </div>
            </div>
            
            <h3 className="font-display text-2xl font-bold mb-4 text-center">
              For Sellers
            </h3>
            
            <p className="text-lg mb-6 text-center">
              Protect pricing. Limit noise. Close with confidence.
              Our confidential sales process keeps your business private.
            </p>
            
            <ul className="mb-8 space-y-3">
              <li className="flex items-start">
                <span className="mr-2 mt-1 text-sage">✓</span>
                <span>Only serious, vetted buyers see your information</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1 text-sage">✓</span>
                <span>No market noise, no endless questions, no wasted time</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1 text-sage">✓</span>
                <span>You approve every disclosure step—nothing leaks</span>
              </li>
            </ul>
            
            <div className="text-center">              <Button 
                href="https://form.typeform.com/to/I3hYeHFX" 
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                Request Confidential Sale
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
