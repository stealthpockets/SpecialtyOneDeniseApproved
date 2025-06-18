import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 lg:pt-48 lg:pb-40 overflow-hidden">
      {/* Background Gradient with Radial Effect */}
      <div className="absolute inset-0 bg-radial-modern-hero-inverted opacity-90 z-0"></div>
      
      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center text-sand">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 animate-fade-in heading-luxury">
            We Sell What Generalist Brokers 
            <span className="relative">
              <span className="relative z-10"> Don't Understand.</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-sage opacity-60"></span>
            </span>
          </h1>
          
          <h2 className="text-xl md:text-2xl font-medium mb-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Manufactured Housing. RV Parks. Self-Storage.
          </h2>
          
          <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            $1B+ in Total Transactions | 100% Success on Exclusive MH & RV Listings
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button 
              to="https://form.typeform.com/to/B0GIZ1ht" 
              variant="primary" 
              size="lg"
              icon={<ArrowRight size={20} />}
              iconPosition="right"
            >
              Get Exclusive Listings
            </Button>
            
            <Button 
              to="/contact" 
              variant="outline" 
              size="lg"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              Contact Us
            </Button>
          </div>
          
          <p className="text-sm lg:text-base opacity-75 max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "0.5s" }}>
            Buyers, sellers, and 1031 investors—this is your entry point.
          </p>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute -bottom-8 left-0 right-0 h-16 bg-sand transform skew-y-1 z-1"></div>
    </section>
  );
};
