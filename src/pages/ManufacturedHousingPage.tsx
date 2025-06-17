import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { TestimonialsMH } from '../components/home/TestimonialsMH';
import { useInsights } from '../hooks/useInsights';
import { useMemo } from 'react';

const stats = [
  {
    value: '$304M+',
    label: 'in MH & RV Transactions'
  },
  {
    value: '80+',
    label: 'Offers on Single MH Community'
  },
  {
    value: '<3%',
    label: 'Cap Rate Exit Mid-COVID'
  },
  {
    value: '100%',
    label: 'Success on Exclusive Listings'
  }
];


const caseStudies = [
  {
    title: "The Palms",
    subtitle: "Achieving a Sub-3% Cap Rate through Strategic Synergy",
    location: "Apache Junction, AZ",
    details: "88 Sites | Sub-3% Cap Rate",
    description: "Over 80 offers generated, closed at a sub-3% cap rate, and the buyer realized operational efficiencies, achieving a record-setting valuation.",
    image: "/dist/assets/success-stories/the-palms.webp"
  },
  {
    title: "Desert Retreat – Resurrected Listing, 30% NOI Growth",
    subtitle: "Sold after failed listing | 30% NOI gain",
    location: "Tucson, AZ",
    details: "43 Sites | 30% NOI Lift",
    description: "Achieved a 30% NOI lift in 12 months, secured multiple full-price offers, and closed above guidance after a previous failed listing.",
    image: "/assets/success-stories/desert-retreat.webp"
  }
];

const ManufacturedHousingPage = () => {
  // Memoize the filters object to prevent unnecessary re-renders
  const insightsFilters = useMemo(() => ({ propertyTypeId: 1 }), []);
  const { insights, loading: insightsLoading, error: insightsError } = useInsights(insightsFilters);

  return (
    <div className="flex flex-col min-h-screen bg-sand">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-sand">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Other Brokers List.
              <span className="block">We Deliver.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Most overpromise, misprice, and retrade.<br />
              We've never failed to close a manufactured housing listing.
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
              One form. Whether you're buying, selling, or planning a 1031.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-16 bg-cloud">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            100% Success Rate on Exclusive Listings.
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

      {/* Testimonials */}
      <TestimonialsMH />

      {/* Edge as Seller Section */}
      <section className="py-16 bg-cloud">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              The Last Thing You Need Is Another Bidding War That Falls Apart.
            </h2>
            <p className="text-lg mb-8 text-gray-700">
              You've seen it: brokers chase top-dollar offers, only to renegotiate mid-deal or fall out of escrow altogether.
              We don't play that game. We pre-underwrite, qualify buyers, and build deal certainty before we go live.
            </p>
            <Button 
              to="https://form.typeform.com/to/NKQAZkUv" 
              variant="primary"
              size="lg"
              icon={<ArrowRight size={20} />}
              iconPosition="right"
            >
              Talk Through Your Exit Strategy—Confidentially
            </Button>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-sand">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            Real Stories, Real Numbers, <span className="text-gradient">Real Results</span>
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
                  loading="lazy"
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

      {/* For Buyers */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Serious Buyers See the Deal. The Internet Doesn't.
            </h2>
            <p className="text-lg mb-8 opacity-90">
              We don't email-blast sensitive details to 5,000 "investors."<br />
              If you're in our network, you'll see high-quality opportunities early—before they're over-shopped or priced down.<br />
              If you're not, you won't.
            </p>
            <Button 
              to="/exclusive-buyers"
              variant="primary"
              size="lg"
            >
              Apply for Buyer Access
            </Button>
            <p className="text-sm mt-4 opacity-75">
              We prioritize family offices, long-term buyers, and serious 1031 investors.
            </p>
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="py-16 bg-sand">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            Insights That Actually Help You Operate—<span className="text-gradient">and Exit</span>
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
            <div className="bg-white rounded-lg p-8 text-center">
              <img 
                src="/assets/Leadership/andrew-headshot-image.webp" 
                alt="Andrew Warner" 
                className="w-32 h-32 rounded-full mx-auto object-cover mb-6"
                loading="lazy"
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
                "I've never listed an MH property I didn't close. That's not marketing. That's just how we operate."
              </blockquote>
              <Button 
                to="/contact"
                variant="primary"
                size="lg"
              >
                Talk to Andrew—Before You Miss the Next Deal
              </Button>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default ManufacturedHousingPage;
