import { Button } from '../ui/Button';

export const FinalCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-obsidian to-amethyst text-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            The Best Deals Never Hit the Open Market. Want In?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join our network of serious buyers and sellers who prioritize execution over marketing fluff.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <Button 
              to="/exclusive-buyers" 
              variant="primary"
              className="w-full sm:w-auto"
              size="lg"
            >
              Get Exclusive Listings
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
            <a href="/valuation" className="text-white hover:text-sage transition-colors inline-flex items-center">
              Need a property valuation?
              <span className="ml-1 underline">Request One</span>
            </a>
            
            <span className="hidden sm:inline text-gray-400">•</span>
            
            <a href="/1031-exchange" className="text-white hover:text-sage transition-colors inline-flex items-center">
              Planning a 1031?
              <span className="ml-1 underline">Start Strategy</span>
            </a>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="font-medium">
              Serious buyers and sellers read Specialty One's insights before making moves.
            </p>
            <a 
              href="/newsletter" 
              className="inline-block mt-3 border border-white/30 hover:border-white hover:bg-white/10 text-white px-4 py-2 rounded-md transition-all duration-200"
            >
              Join the Newsletter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
