import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { TestimonialsRV } from '../components/home/TestimonialsRV';
import { useInsights } from '../hooks/useInsights';
import { useMemo } from 'react';

const stats = [
  {
    value: '$304M+',
    label: 'Combined MH & RV Transactions'
  },
  {
    value: '100%',
    label: 'RV Park Listings Sold'
  },
  {
    value: '80+',
    label: 'Offers on Single Hybrid Listing'
  },
  {
    value: '25+',
    label: 'PE-Backed Buyers in Network'
  }
];

const caseStudies = [
  {
    title: "Desert Trails RV Park",
    subtitle: "Full Price Despite COVID & Zoning",
    location: "Tucson, AZ",
    description: "Zoning issues. COVID uncertainty. Closed at full price.",
    image: "/dist/assets/success-stories/desert-trails.webp"
  },
  {
    title: "Caravan Oasis",
    subtitle: "Complex Utilities, Clean Close",
    location: "Yuma, AZ",
    description: "ADEQ, septic, and solar confusion. Closed clean.",
    image: "/dist/assets/success-stories/caravan-oasis.webp"
  }
];

const RVParksPage = () => {
  // Memoize the filters object to prevent unnecessary re-renders
  const insightsFilters = useMemo(() => ({ propertyTypeId: 2 }), []);
  const { insights, loading: insightsLoading, error: insightsError } = useInsights(insightsFilters);
  return (
    <div className="flex flex-col min-h-screen bg-sand">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-sand">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Outdoor Hospitality Isn't "Just a Park."
              <span className="block">It's an Operating Business.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              We know the difference. That's why serious owners trust us to structure clean, efficient exits.<br />
              $300M+ in MH & RV Transactions. No marketing theater. No retrade culture.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button 
                to="/contact" 
                variant="primary"
                size="lg"
              >
                Get Listings or Request Valuation
              </Button>
            </div>
            <p className="text-sm lg:text-base mt-4 opacity-75 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              One form. Whether you're selling, acquiring, or planning a 1031.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-16 bg-cloud">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="text-gradient">Clean Closings.</span> Qualified Buyers.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card 
                key={index}
                className="text-center py-8 animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <CardContent>
                  <div className="font-display text-4xl font-bold text-plum mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-700">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialization Section */}
      <section className="pt-24 pb-16 bg-sand">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-center">
              Most Brokers Price RV Parks Like Apartments.<br />
              <span className="text-gradient mt-2 block">We Don't.</span>
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-start gap-4">
                  <CheckCircle size={20} className="text-sage mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-plum mb-2">Specialized Revenue Analysis</h3>
                    <p className="text-lg text-gray-700">We underwrite seasonal, transient, and long-term income streams separately</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-start gap-4">
                  <CheckCircle size={20} className="text-sage mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-plum mb-2">Alternative Revenue Expertise</h3>
                    <p className="text-lg text-gray-700">Park model, glamping, or cabin revenue? We know how to value it</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="flex items-start gap-4">
                  <CheckCircle size={20} className="text-sage mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-plum mb-2">Complex Issue Resolution</h3>
                    <p className="text-lg text-gray-700">Septic, solar, zoning, and ADEQ issues? We've closed through them all</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="flex items-start gap-4">
                  <CheckCircle size={20} className="text-sage mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-plum mb-2">Institutional Buyer Network</h3>
                    <p className="text-lg text-gray-700">Our buyer pool includes REITs, syndicators, and long-term operators</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-start gap-4">
                  <CheckCircle size={20} className="text-sage mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-plum mb-2">Strategic Exit Planning</h3>
                    <p className="text-lg text-gray-700">We help you exit with timing, structure, and certainty</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsRV />

      {/* Case Studies */}
      <section className="py-16 bg-sand">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            The Kind of Parks We've Sold—and How
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <Link
                key={index}
                to={`/success/${study.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="relative rounded-lg overflow-hidden gradient-overlay block group hover:shadow-xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <img 
                  src={study.image}
                  alt={study.title}
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 w-full p-6 z-10 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white text-2xl font-bold mb-2 group-hover:text-sage transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-white text-lg mb-2">
                    {study.subtitle}
                  </p>
                  <p className="text-white/90">
                    {study.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* For Sellers */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              You Don't Need More Bidders.<br />
              You Need a Buyer Who Closes.
            </h2>
            <p className="text-lg mb-8 opacity-90">
              We qualify capital, structure the terms, and solve problems before you hit escrow.<br />
              Whether you need confidentiality or full exposure—we drive results.
            </p>
            <Button 
              to="/contact"
              variant="primary"
              size="lg"
            >
              Talk Through Your Exit Strategy
            </Button>
          </div>
        </div>
      </section>

      {/* For Buyers */}
      <section className="py-16 bg-cloud">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Serious Buyers See the Deal.<br />
              The Internet Doesn't.
            </h2>
            <p className="text-lg mb-8">
              We don't blast every deal to a mass email list.<br />
              If you're in our network, you get early access to real RV park and outdoor hospitality listings—before they're picked apart or shopped to death.
            </p>
            <Button 
              to="/exclusive-buyers"
              variant="primary"
              size="lg"
            >
              Apply for Buyer Access
            </Button>
            <p className="text-sm mt-4 text-gray-600">
              We prioritize experienced operators, long-term capital, and serious 1031 buyers.
            </p>
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="py-16 bg-sand">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            What Actually Moves NOI in Outdoor Hospitality
          </h2>
          {insightsLoading ? (
            <div className="text-center">Loading insights...</div>
          ) : insightsError ? (
            <div className="text-center text-red-600">Error loading insights: {insightsError}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {insights.slice(0, 3).map((insight, index) => (
                <Link
                  key={insight.id}
                  to={`/insights/${insight.slug}`}
                  className="block group hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${0.2 * index}s` }}
                >
                  <Card className="overflow-hidden h-full group-hover:scale-[1.02] transition-transform duration-300">
                    {insight.image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={insight.image_url} 
                          alt={insight.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="text-sm text-plum font-medium mb-2">
                        {insight.categories?.name || 'Market Insights'}
                      </div>
                      <h3 className="text-xl font-bold mb-3 leading-relaxed group-hover:text-plum transition-colors">
                        {insight.title}
                      </h3>
                      {insight.summary && (
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {insight.summary}
                        </p>
                      )}
                      <div className="text-plum font-medium text-sm group-hover:underline">
                        Read Article →
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Talk to Specialist */}
      <section className="py-16 bg-cloud">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="bg-cloud rounded-lg p-8 text-center">
              <img 
                src="/assets/Leadership/andrew-headshot-image.webp" 
                alt="Andrew Warner" 
                className="w-32 h-32 rounded-full mx-auto object-cover mb-6" 
              />
              <h3 className="font-display text-2xl font-bold mb-2">
                Andrew Warner, CCIM
              </h3>
              <p className="text-gray-600 mb-4">
                President | Manufactured Housing & RV
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <a href="tel:602-730-9967" className="text-plum hover:text-amethyst">
                  📞 602-730-9967
                </a>
                <a href="mailto:andrew@specialtyone.com" className="text-plum hover:text-amethyst">
                  📧 andrew@specialtyone.com
                </a>
              </div>
              <blockquote className="text-lg italic mb-8">
                "We've closed destination resorts, transient parks, and long-term RV communities. We know the buyer. We know the process. And we know how to get it done."
              </blockquote>
              <Button 
                to="/contact"
                variant="primary"
                size="lg"
              >
                Talk to Andrew
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default RVParksPage;
