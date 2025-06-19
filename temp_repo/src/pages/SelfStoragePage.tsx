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
  const insightsFilters = useMemo(() => ({ propertyTypeId: 3 }), []);
  const { insights, loading: insightsLoading, error: insightsError } = useInsights(insightsFilters);

  return (
    <div className="flex flex-col min-h-screen bg-luxury-dark">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-luxury-dark opacity-95"></div>
        <div className="absolute inset-0 bg-[url('/assets/property-types/self-storage-investment-arizona.webp')] bg-cover bg-center"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-luxury text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-[0.9]">
              Self-Storage Isn't Just Real Estate.
              <span className="block text-luxury-light">It's an Operating Business.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed max-w-3xl mx-auto">
              Led by Denise Nuñez with 25+ years of storage expertise.<br />
              $721M+ in transactions. We know what drives NOI—and what buyers pay for.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button 
                to="/contact" 
                variant="primary"
                size="lg"
                className="text-lg px-8 py-4"
              >
                Get Listings or Request Valuation
              </Button>
            </div>
            <p className="text-sm mt-6 text-white/75">
              One form. Whether you're selling, acquiring, or planning a 1031.
            </p>
          </div>
        </div>
      </section>

      {/* Specialization Section */}
      <section className="py-24 bg-luxury-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-luxury text-white text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
              Most Brokers Price Storage Like Warehouses.<br />
              <span className="text-luxury-light">We Don't.</span>
            </h2>
            <div className="grid gap-8">
              {specializations.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-6 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="text-luxury-accent text-2xl mt-1">
                    <CheckCircle size={24} />
                  </div>
                  <p className="text-xl text-white/90 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <h2 className="heading-luxury text-luxury-dark text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
            $721M+ in Storage Transactions. 200+ Facilities Sold.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card 
                key={index}
                className="text-center py-12 px-8 bg-gradient-subtle backdrop-blur-sm border border-luxury-light/20 hover:bg-white/80 transition-all duration-300"
              >
                <CardContent>
                  <div className="heading-luxury text-5xl md:text-6xl font-bold text-luxury-primary mb-4">
                    {stat.value}
                  </div>
                  <div className="text-luxury-dark/80 text-lg font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Market Trends */}
      <section className="py-24 bg-luxury-dark">
        <div className="container-custom">
          <h2 className="heading-luxury text-white text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
            What's Driving Storage Values in 2024
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {marketTrends.map((trend, index) => (
              <Card 
                key={index}
                className="text-center py-12 px-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <CardContent>
                  <div className="text-6xl mb-6">
                    {trend.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">
                    {trend.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    {trend.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <h2 className="heading-luxury text-luxury-dark text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
            What Storage Owners Say About Denise
          </h2>
          
          {testimonialsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((index) => (
                <div key={index} className="bg-gradient-subtle backdrop-blur-sm border border-luxury-light/20 rounded-2xl p-12">
                  <div className="text-center text-luxury-dark/60">Loading testimonials...</div>
                </div>
              ))}
            </div>
          ) : testimonialsError ? (
            <div className="text-center text-luxury-dark/60">
              <p>Unable to load testimonials at this time.</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center text-luxury-dark/60">
              <p>No testimonials available for this property type.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id || index}
                  className="bg-gradient-subtle backdrop-blur-sm border border-luxury-light/20 rounded-2xl p-12 hover:bg-white/80 transition-all duration-300"
                >
                  <div className="text-7xl text-luxury-primary/20 mb-6 leading-none">"</div>
                  <blockquote className="text-xl font-medium mb-8 text-luxury-dark/90 leading-relaxed">
                    {testimonial.quote}
                  </blockquote>
                  <div>
                    <p className="font-bold text-luxury-dark text-lg">
                      {testimonial.author}
                    </p>
                    {testimonial.property && (
                      <p className="text-luxury-dark/60 mt-1">
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
      <section className="py-24 bg-luxury-dark">
        <div className="container-custom">
          <h2 className="heading-luxury text-white text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
            Recent Storage Sales—and How We Did It
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {caseStudies.map((study, index) => (
              <div 
                key={index}
                className="group relative rounded-3xl overflow-hidden"
              >
                <div className="relative h-[500px] overflow-hidden">
                  <img 
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-luxury-dark/50 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-8 z-10">
                  <h3 className="text-white text-3xl font-bold mb-3 leading-tight">
                    {study.title}
                  </h3>
                  <p className="text-luxury-light text-xl mb-3">
                    {study.subtitle}
                  </p>
                  <p className="text-white/90 mb-6 text-lg">
                    {study.location}
                  </p>
                  <p className="text-white/90 mb-8 text-lg leading-relaxed">
                    {study.description}
                  </p>
                  <Button 
                    to={`/success/${study.title.toLowerCase().replace(/\s+/g, '-')}`}
                    variant="primary"
                    size="lg"
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
      <section className="py-24 bg-gradient-luxury-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-luxury text-white text-4xl md:text-5xl font-bold mb-8 leading-tight">
              You Don't Need More Tire Kickers.<br />
              <span className="text-luxury-light">You Need Qualified Capital.</span>
            </h2>
            <p className="text-xl mb-12 text-white/90 leading-relaxed max-w-3xl mx-auto">
              We pre-qualify buyers, structure clean terms, and solve operational issues before they become deal-killers.<br />
              Whether you need confidentiality or maximum exposure—we deliver results.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button 
                to="/contact"
                variant="primary"
                size="lg"
                className="text-lg px-8 py-4"
              >
                Talk Through Your Exit Strategy
              </Button>
              <Button 
                to="/valuation"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-4"
              >
                Request a Free Valuation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* For Buyers */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-luxury text-luxury-dark text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Serious Buyers See the Deal.<br />
              <span className="text-luxury-primary">The Internet Doesn't.</span>
            </h2>
            <p className="text-xl mb-12 text-luxury-dark/80 leading-relaxed max-w-3xl mx-auto">
              We don't blast every storage deal to a mass email list.<br />
              If you're in our network, you get early access to real storage opportunities—before they're picked apart or shopped to death.
            </p>
            <Button 
              to="/exclusive-buyers"
              variant="primary"
              size="lg"
              className="text-lg px-8 py-4"
            >
              Apply for Buyer Access
            </Button>
            <p className="text-base mt-6 text-luxury-dark/60">
              We prioritize experienced operators, institutional capital, and serious 1031 buyers.
            </p>
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="py-24 bg-luxury-dark">
        <div className="container-custom">
          <h2 className="heading-luxury text-white text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
            What Actually Drives Storage NOI
          </h2>
          {insightsLoading ? (
            <div className="text-center text-white/60">Loading insights...</div>
          ) : insightsError ? (
            <div className="text-center text-red-400">Error loading insights: {insightsError}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {insights.slice(0, 3).map((insight) => (
                <Card 
                  key={insight.id}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <CardContent className="p-8">
                    <div className="text-sm text-luxury-accent font-medium mb-3 uppercase tracking-wider">
                      {insight.categories?.name || 'Market Insights'}
                    </div>
                    <h3 className="text-2xl font-bold mb-6 text-white leading-tight">
                      {insight.title}
                    </h3>
                    <Button 
                      to={`/insights/${insight.slug}`}
                      variant="outline"
                      className="border-white/60 text-white hover:bg-white/20 hover:border-white"
                    >
                      Read Article
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Button 
              to="/insights?filter=storage"
              variant="primary"
              size="lg"
              icon={<ArrowRight size={20} />}
              iconPosition="right"
              className="text-lg px-8 py-4"
            >
              Browse All Storage Insights
            </Button>
          </div>
        </div>
      </section>

      {/* Talk to Specialist */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-subtle backdrop-blur-sm border border-luxury-light/20 rounded-3xl p-12 text-center">
              <img 
                src="/assets/Leadership/denise-nunez-self-storage.webp" 
                alt="Denise Nuñez" 
                className="w-40 h-40 rounded-full mx-auto object-cover mb-8 border-4 border-luxury-light/20" 
              />
              <h3 className="heading-luxury text-3xl font-bold mb-3 text-luxury-dark">
                Denise Nuñez
              </h3>
              <p className="text-luxury-dark/70 mb-8 text-lg">
                President | Storage Group
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
                <a href="tel:602-697-8868" className="text-luxury-primary hover:text-luxury-accent text-lg font-medium">
                  📞 602-697-8868
                </a>
                <a href="mailto:denise@specialtyone.com" className="text-luxury-primary hover:text-luxury-accent text-lg font-medium">
                  📧 denise@specialtyone.com
                </a>
              </div>
              <blockquote className="text-xl italic mb-12 text-luxury-dark/80 leading-relaxed max-w-2xl mx-auto">
                "I've been in storage for 25+ years. I know what drives value, what buyers pay for, and how to structure deals that close. Let's talk about your facility."
              </blockquote>
              <Button 
                to="/contact"
                variant="primary"
                size="lg"
                className="text-lg px-8 py-4"
              >
                Talk to Denise
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Navigation */}
      <section className="py-24 bg-luxury-dark">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Button 
              to="/manufactured-housing"
              variant="outline"
              className="text-center py-8 border-white/60 text-white hover:bg-white/20 hover:border-white text-lg"
            >
              🏘 Manufactured Housing
            </Button>
            <Button 
              to="/rv-parks"
              variant="outline"
              className="text-center py-8 border-white/60 text-white hover:bg-white/20 hover:border-white text-lg"
            >
              🚐 RV Parks
            </Button>
            <Button 
              to="/1031-exchange"
              variant="outline"
              className="text-center py-8 border-white/60 text-white hover:bg-white/20 hover:border-white text-lg"
            >
              🔁 1031 Exchange Strategy
            </Button>
            <Button 
              to="/success-stories"
              variant="outline"
              className="text-center py-8 border-white/60 text-white hover:bg-white/20 hover:border-white text-lg"
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
