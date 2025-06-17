import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { usePropertyTypeTestimonials } from '../hooks/useTestimonials';
import { useInsights } from '../hooks/useInsights';
import { useMemo } from 'react';

const specializations = [
  {
    text: "We understand climate-controlled vs. standard unit economics",
    icon: <CheckCircle size={20} className="text-sage" />
  },
  {
    text: "Mail centers, wine storage, and specialty revenue streams? We price them right",
    icon: <CheckCircle size={20} className="text-sage" />
  },
  {
    text: "Expansion potential, zoning, and development upside—we know what buyers pay for",
    icon: <CheckCircle size={20} className="text-sage" />
  },
  {
    text: "Our buyer network includes REITs, private equity, and long-term operators",
    icon: <CheckCircle size={20} className="text-sage" />
  },
  {
    text: "25+ years of storage expertise with Denise Nuñez leading every deal",
    icon: <CheckCircle size={20} className="text-sage" />
  }
];

const stats = [
  {
    value: '$721M+',
    label: 'Self-Storage Transactions'
  },
  {
    value: '200+',
    label: 'Storage Facilities Sold'
  },
  {
    value: '25+',
    label: 'Years Storage Experience'
  },
  {
    value: '95%+',
    label: 'Occupancy on Premium Sales'
  }
];


const caseStudies = [
  {
    title: "American Self Storage",
    subtitle: "Value-Add Opportunity with Expansion Upside",
    location: "Chandler, AZ",
    description: "Below-market rents and expansion potential. Sold for $8.35M at 5% cap rate.",
    image: "/dist/assets/success-stories/american-ss-mail.webp"
  },
  {
    title: "Desert View Storage",
    subtitle: "Climate-Controlled Premium Positioning",
    location: "Phoenix, AZ",
    description: "Maximized climate-controlled unit premiums. Clean institutional sale.",
    image: "/dist/assets/property-types/self-storage-facility-investment.webp"
  }
];

const marketTrends = [
  {
    icon: '📈',
    title: 'Institutional Demand',
    description: 'REITs and PE firms driving cap rate compression in quality markets'
  },
  {
    icon: '🏗️',
    title: 'Development Costs',
    description: 'Rising construction costs making existing facilities more valuable'
  },
  {
    icon: '🌡️',
    title: 'Climate Control Premium',
    description: 'Growing demand for climate-controlled units in hot markets'
  },
  {
    icon: '📦',
    title: 'Ancillary Revenue',
    description: 'Mail centers, wine storage, and specialty services adding value'
  }
];

const SelfStoragePage = () => {
  const { testimonials, loading: testimonialsLoading, error: testimonialsError } = usePropertyTypeTestimonials('Self-Storage');
  
  // Memoize the filters object to prevent unnecessary re-renders
  const insightsFilters = useMemo(() => ({ propertyType: 3 }), []);
  const { insights, loading: insightsLoading, error: insightsError } = useInsights(insightsFilters);

  return (
    <div className="flex flex-col min-h-screen bg-sand">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-sand">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Self-Storage Isn't Just Real Estate.
              <span className="block">It's an Operating Business.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Led by Denise Nuñez with 25+ years of storage expertise.<br />
              $721M+ in transactions. We know what drives NOI—and what buyers pay for.
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
            <p className="text-sm mt-4 opacity-75 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              One form. Whether you're selling, acquiring, or planning a 1031.
            </p>
          </div>
        </div>
      </section>

      {/* Specialization Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-center">
              Most Brokers Price Storage Like Warehouses.<br />
              We Don't.
            </h2>
            <div className="space-y-4">
              {specializations.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 animate-fade-in"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  {item.icon}
                  <p className="text-lg">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-16 bg-cloud">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            $721M+ in Storage Transactions. 200+ Facilities Sold.
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

      {/* Market Trends */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            What's Driving Storage Values in 2024
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {marketTrends.map((trend, index) => (
              <Card 
                key={index}
                className="text-center py-8 animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <CardContent>
                  <div className="text-4xl mb-4">
                    {trend.icon}
                  </div>
                  <h3 className="font-bold mb-3">
                    {trend.title}
                  </h3>
                  <p className="text-gray-600">
                    {trend.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-cloud">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            What Storage Owners Say About Denise
          </h2>
          
          {testimonialsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((index) => (
                <div key={index} className="bg-white rounded-lg p-8 animate-fade-in">
                  <div className="text-center text-gray-500">Loading testimonials...</div>
                </div>
              ))}
            </div>
          ) : testimonialsError ? (
            <div className="text-center text-gray-600">
              <p>Unable to load testimonials at this time.</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center text-gray-600">
              <p>No testimonials available for this property type.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id || index}
                  className="bg-white rounded-lg p-8 animate-fade-in"
                  style={{ animationDelay: `${0.2 * index}s` }}
                >
                  <div className="text-5xl text-plum opacity-20 mb-4">"</div>
                  <blockquote className="text-lg font-medium mb-6">
                    {testimonial.quote}
                  </blockquote>
                  <div>
                    <p className="font-bold">
                      {testimonial.author}
                    </p>
                    {testimonial.property && (
                      <p className="text-gray-600">
                        {testimonial.property}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            Recent Storage Sales—and How We Did It
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <div 
                key={index}
                className="relative rounded-lg overflow-hidden gradient-overlay animate-fade-in"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <img 
                  src={study.image}
                  alt={study.title}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full p-6 z-10">
                  <h3 className="text-white text-2xl font-bold mb-2">
                    {study.title}
                  </h3>
                  <p className="text-white text-lg mb-2">
                    {study.subtitle}
                  </p>
                  <p className="text-white/90 mb-4">
                    {study.location}
                  </p>
                  <Button 
                    to={`/success/${study.title.toLowerCase().replace(/\s+/g, '-')}`}
                    variant="primary"
                  >
                    See Case Study
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Sellers */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              You Don't Need More Tire Kickers.<br />
              You Need Qualified Capital.
            </h2>
            <p className="text-lg mb-8 opacity-90">
              We pre-qualify buyers, structure clean terms, and solve operational issues before they become deal-killers.<br />
              Whether you need confidentiality or maximum exposure—we deliver results.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                to="/contact"
                variant="primary"
                size="lg"
              >
                Talk Through Your Exit Strategy
              </Button>
              <Button 
                to="/valuation"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Request a Free Valuation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* For Buyers */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Serious Buyers See the Deal.<br />
              The Internet Doesn't.
            </h2>
            <p className="text-lg mb-8">
              We don't blast every storage deal to a mass email list.<br />
              If you're in our network, you get early access to real storage opportunities—before they're picked apart or shopped to death.
            </p>
            <Button 
              to="/exclusive-buyers"
              variant="primary"
              size="lg"
            >
              Apply for Buyer Access
            </Button>
            <p className="text-sm lg:text-base mt-4 text-gray-600">
              We prioritize experienced operators, institutional capital, and serious 1031 buyers.
            </p>
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="py-16 bg-cloud">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            What Actually Drives Storage NOI
          </h2>
          {insightsLoading ? (
            <div className="text-center">Loading insights...</div>
          ) : insightsError ? (
            <div className="text-center text-red-600">Error loading insights: {insightsError}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {insights.slice(0, 3).map((insight, index) => (
                <Card 
                  key={insight.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${0.2 * index}s` }}
                >
                  <CardContent className="p-6">
                    <div className="text-sm text-plum font-medium mb-2">
                      {insight.categories?.name || 'Market Insights'}
                    </div>
                    <h3 className="text-xl font-bold mb-4 leading-relaxed">
                      {insight.title}
                    </h3>
                    <Button 
                      to={`/insights/${insight.slug}`}
                      variant="outline"
                    >
                      Read Article
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Button 
              to="/insights?filter=storage"
              variant="primary"
              icon={<ArrowRight size={20} />}
              iconPosition="right"
            >
              Browse All Storage Insights
            </Button>
          </div>
        </div>
      </section>

      {/* Talk to Specialist */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="bg-cloud rounded-lg p-8 text-center">
              <img 
                src="/assets/Leadership/denise-nunez-self-storage.webp" 
                alt="Denise Nuñez" 
                className="w-32 h-32 rounded-full mx-auto object-cover mb-6" 
              />
              <h3 className="font-display text-2xl font-bold mb-2">
                Denise Nuñez
              </h3>
              <p className="text-gray-600 mb-4">
                President | Storage Group
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <a href="tel:602-697-8868" className="text-plum hover:text-amethyst">
                  📞 602-697-8868
                </a>
                <a href="mailto:denise@specialtyone.com" className="text-plum hover:text-amethyst">
                  📧 denise@specialtyone.com
                </a>
              </div>
              <blockquote className="text-lg italic mb-8">
                "I've been in storage for 25+ years. I know what drives value, what buyers pay for, and how to structure deals that close. Let's talk about your facility."
              </blockquote>
              <Button 
                to="/contact"
                variant="primary"
                size="lg"
              >
                Talk to Denise
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Navigation */}
      <section className="py-16 bg-cloud">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Button 
              to="/manufactured-housing"
              variant="outline"
              className="text-center py-6"
            >
              🏘 Manufactured Housing
            </Button>
            <Button 
              to="/rv-parks"
              variant="outline"
              className="text-center py-6"
            >
              🚐 RV Parks
            </Button>
            <Button 
              to="/1031-exchange"
              variant="outline"
              className="text-center py-6"
            >
              🔁 1031 Exchange Strategy
            </Button>
            <Button 
              to="/success-stories"
              variant="outline"
              className="text-center py-6"
            >
              📖 Client Success Stories
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SelfStoragePage;
