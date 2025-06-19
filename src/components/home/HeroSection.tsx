import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroSection = () => {
  return (
    <section className="relative section-padding overflow-hidden bg-luxury-purple">
      {/* Enhanced Background with subtle pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/5"></div>
      </div>
      
      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="heading-xl text-white mb-8 animate-fade-in">
            We Sell What Generalist Brokers 
            <span className="relative block mt-2">
              <span className="relative z-10">Don't Understand.</span>
              <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-sage opacity-70"></span>
            </span>
          </h1>
          
          <h2 className="heading-sm text-white/90 mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Manufactured Housing. RV Parks. Self-Storage.
          </h2>
          
          <p className="text-body-lg text-white/80 mb-12 animate-fade-in max-w-3xl mx-auto" style={{ animationDelay: "0.3s" }}>
            $1B+ in Total Transactions | 100% Success on Exclusive MH & RV Listings
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <a
              href="https://form.typeform.com/to/I3hYeHFX" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Get a Free Property Valuation
            </a>
          </div>
          
          <p className="text-caption text-white/70 max-w-2xl mx-auto animate-fade-in leading-relaxed" style={{ animationDelay: "0.5s" }}>
            Buyers, sellers, and 1031 investors—this is your entry point.
          </p>
        </div>
      </div>
      
      {/* Enhanced Decorative Elements */}
      <div className="absolute -bottom-8 left-0 right-0 h-16 bg-sand transform skew-y-1 z-1"></div>
    </section>
  );
};
