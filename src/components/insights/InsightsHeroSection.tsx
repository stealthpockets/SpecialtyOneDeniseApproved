import { Button } from '../ui/Button';

export const InsightsHeroSection = () => {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-br from-sand to-cloud">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-radial-modern-hero-inverted opacity-80 z-0"></div>
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center text-sand">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
            Investor Intelligence for MHC, RV, and Self-Storage Operators
          </h1>
          <h2 className="text-xl md:text-2xl font-medium mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Protect your downside. Unlock NOI. Stay 3 steps ahead.
          </h2>
          <p className="text-base md:text-lg mb-8 opacity-90 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Every post is written by operators, investors, or experts who live the assets they write about. No fluff. No filler. Just results.
          </p>
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              to="/newsletter" 
              variant="primary" 
              size="lg"
              iconPosition="left"
            >
              Subscribe for Insights
            </Button>
          </div>        </div>
      </div>
      <div className="absolute -bottom-8 left-0 right-0 h-16 bg-sand transform skew-y-1 z-1"></div>
    </section>
  );
};
