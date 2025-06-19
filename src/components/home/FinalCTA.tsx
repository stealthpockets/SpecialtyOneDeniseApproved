import { Button } from '../ui/Button';

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
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">            <Button
              href="https://form.typeform.com/to/B0GIZ1ht"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="w-full sm:w-auto"
              size="lg"
            >
              Join Network
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
