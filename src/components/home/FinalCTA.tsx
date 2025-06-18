import { Button } from '../ui/Button';
import { Link } from 'react-router-dom'; // Import Link

export const FinalCTA = () => {
  return (
    <section className="section-padding bg-luxury-purple text-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="heading-lg mb-6 text-white">
            The Best Deals Never Hit the Open Market. Want In?
          </h2>
          <p className="text-body-lg mb-12 opacity-85 max-w-2xl mx-auto">
            Join our network of serious buyers and sellers who prioritize execution over marketing fluff.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
            <Button
              to="/exclusive-buyers"
              variant="primary"
              className="w-full sm:w-auto"
              size="lg"
            >
              Join Network
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-caption">
            <Link to="https://form.typeform.com/to/I3hYeHFX" className="text-white/80 hover:text-white transition-colors inline-flex items-center group">
              Need a property valuation?
              <span className="ml-2 underline group-hover:no-underline">Request One</span>
            </Link>
            
            <span className="hidden sm:inline text-white/40">•</span>
            
            <Link to="https://form.typeform.com/to/oX1bWHD5" className="text-white/80 hover:text-white transition-colors inline-flex items-center group">
              Planning a 1031?
              <span className="ml-2 underline group-hover:no-underline">Start Strategy</span>
            </Link>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/20">
            <p className="heading-sm text-white/90 mb-4">
              Serious buyers and sellers read Specialty One's insights before making moves.
            </p>
            <Link 
              to="/newsletter"
              className="inline-block card-glassmorphism text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-white/20 text-caption font-medium"
            >
              Join the Newsletter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
