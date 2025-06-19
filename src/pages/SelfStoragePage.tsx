import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { ProfileImage, CloudinaryImage } from '../components/ui/CloudinaryImage';
import { CloudinaryBackgroundImage } from '../components/ui/CloudinaryBackgroundImage';
import { SocialShare } from '../components/ui/SocialShare';
import { usePropertyTypeTestimonials } from '../hooks/useTestimonials';
import { useInsights } from '../hooks/useInsights';
import { useMemo } from 'react';
import { SEOHead } from '../components/ui/SEOHead';

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
  
  // Fetch all insights, then sort them to prioritize Self-Storage and RV Parks
  const { insights, loading: insightsLoading, error: insightsError } = useInsights();

  // Sort insights: property type 3 (Self-Storage) first, then 4 (RV Parks), then others.
  const sortedInsights = useMemo(() => {
    if (!insights) return [];
    return [...insights].sort((a, b) => {
      const getPriority = (id: number | undefined) => {
        if (id === 3) return 1; // Highest priority for Self-Storage
        if (id === 4) return 2; // Second priority for RV Parks
        return 3; // Lower priority for everything else
      };

      const priorityA = getPriority(a.property_types?.id);
      const priorityB = getPriority(b.property_types?.id);

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      // If priorities are the same, sort by publication date (newest first)
      return new Date(b.published_at || 0).getTime() - new Date(a.published_at || 0).getTime();
    });
  }, [insights]);

  return (
    <>
      <SEOHead
        title="Self-Storage Investment Brokerage | Self Storage Facility Sales"
        description="Specialized investment brokerage for self-storage facilities. $721M+ in transactions led by Denise Nuñez. Expert valuation, market analysis, and advisory services for storage properties."
        keywords="self storage investment, self storage brokerage, storage facility sales, self storage valuation, commercial storage properties, storage real estate"
        image="/assets/property-types/self-storage-investment-arizona.webp"
        url="https://specialtyone.com/self-storage"
      />
      <div className="flex flex-col min-h-screen bg-luxury-dark">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-luxury-dark opacity-95"></div>
        <CloudinaryBackgroundImage
          localPath="/assets/property-types/self-storage-investment-arizona.webp"
          className="absolute inset-0 bg-cover bg-center"
        >
          <div></div>
        </CloudinaryBackgroundImage>
        <div className="container-custom relative z-10 flex items-center justify-center min-h-screen">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-luxury text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-[0.9]">
              Self-Storage Investment Brokerage
              <span className="block mt-2">
                <span className="text-gradient">Expert Results</span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed max-w-3xl mx-auto">
              $721M+ in self-storage transactions. Led by 25-year industry veteran Denise Nuñez.<br />
              We don't dabble in storage—we've built careers in it.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button 
                to="/contact" 
                variant="primary"
                size="lg"
                className="bg-white text-plum hover:bg-white/90 text-lg px-8 py-4"
              >
                Free Storage Facility Valuation
              </Button>
            </div>
            <p className="text-sm mt-6 text-white/75">
              One form. Whether you're selling, acquiring, or planning a 1031.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-24 bg-sand">
        <div className="container-custom">
          <h2 className="heading-luxury text-obsidian text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
            <span className="text-gradient">$721M+</span> in Storage Transactions. <span className="text-gradient">200+</span> Facilities Sold.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card 
                key={index}
                className="text-center py-12 px-6 bg-gradient-subtle backdrop-blur-sm border border-luxury-light/20 hover:bg-white/80 transition-all duration-300"
              >
                <CardContent className="text-center flex flex-col items-center justify-center">
                  <div className="heading-luxury text-3xl md:text-4xl lg:text-5xl font-bold text-luxury-primary mb-4 text-center w-full whitespace-nowrap">
                    {stat.value}
                  </div>
                  <div className="text-luxury-dark/80 text-lg font-medium text-center w-full">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialization Section - Enhanced styling matching RV Parks */}
      <section className="py-24 bg-sand luxury-gradient-overlay">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-lg mb-12 text-center">
              Most Brokers Price Storage Like Warehouses.<br />
              <span className="text-gradient mt-2 block">We Don't.</span>
            </h2>
            <div className="space-y-6">
              <div className="card-luxury-white rounded-xl p-8 hover:shadow-card-hover transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-start gap-6">
                  <CheckCircle size={24} className="text-sage mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="heading-sm text-plum mb-4">Climate-Controlled vs. Standard Unit Economics</h3>
                    <p className="text-body text-gray-700 leading-relaxed">We understand the revenue premiums and operational costs that differentiate climate-controlled facilities from standard storage operations.</p>
                  </div>
                </div>
              </div>

              <div className="card-luxury-white rounded-xl p-8 hover:shadow-card-hover transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-start gap-6">
                  <CheckCircle size={24} className="text-sage mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="heading-sm text-plum mb-4">Specialty Revenue Stream Expertise</h3>
                    <p className="text-body text-gray-700 leading-relaxed">Mail centers, wine storage, and specialty revenue streams? We price them right and know which buyers value these income diversifiers.</p>
                  </div>
                </div>
              </div>

              <div className="card-luxury-white rounded-xl p-8 hover:shadow-card-hover transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="flex items-start gap-6">
                  <CheckCircle size={24} className="text-sage mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="heading-sm text-plum mb-4">Development and Expansion Analysis</h3>
                    <p className="text-body text-gray-700 leading-relaxed">Expansion potential, zoning, and development upside—we know what buyers pay for and how to structure deals around future growth opportunities.</p>
                  </div>
                </div>
              </div>

              <div className="card-luxury-white rounded-xl p-8 hover:shadow-card-hover transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="flex items-start gap-6">
                  <CheckCircle size={24} className="text-sage mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="heading-sm text-plum mb-4">Institutional Buyer Network</h3>
                    <p className="text-body text-gray-700 leading-relaxed">Our buyer network includes REITs, private equity, and long-term operators who understand storage as an investment class, not just real estate.</p>
                  </div>
                </div>
              </div>

              <div className="card-luxury-white rounded-xl p-8 hover:shadow-card-hover transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-start gap-6">
                  <CheckCircle size={24} className="text-sage mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="heading-sm text-plum mb-4">Proven Storage Expertise</h3>
                    <p className="text-body text-gray-700 leading-relaxed">25+ years of storage expertise with Denise Nuñez leading every deal—deep market knowledge that translates to better outcomes for our clients.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Trends */}
      <section className="py-24 bg-luxury-dark">
        <div className="container-custom">
          <h2 className="heading-luxury text-white text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
            What's Driving <span className="text-gradient">Storage Values</span> in 2024
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
      <section className="py-24 bg-sand">
        <div className="container-custom">
          <h2 className="heading-luxury text-obsidian text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
            What Storage Owners Say About <span className="text-gradient">Denise</span>
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

      {/* For Sellers */}
      <section className="py-24 bg-gradient-luxury-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-luxury text-white text-4xl md:text-5xl font-bold mb-8 leading-tight">
              You Don't Need More Tire Kickers.<br />
              <span className="text-gradient">You Need Qualified Capital.</span>
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
                Get Your Storage Facility Valued
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-padding bg-gradient-subtle luxury-gradient-overlay">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-6 max-w-4xl mx-auto">
              Real Deals. No Guesswork. Just <span className="text-gradient">Results</span>.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Case Study Image */}
            <div className="relative gradient-overlay rounded-xl overflow-hidden h-[450px] animate-fade-in shadow-card">
              <CloudinaryImage
                localPath="/dist/assets/success-stories/american-ss-mail.webp"
                alt="American Self Storage & Mail"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 w-full content-padding pb-8 z-10">
                <span className="bg-white/95 text-plum px-4 py-2 rounded-full text-caption font-medium backdrop-blur-sm">
                  Self-Storage
                </span>
                <h3 className="text-white heading-sm mt-3">
                  American Self Storage & Mail
                </h3>
                <p className="text-white text-body opacity-90">
                  Chandler, AZ
                </p>
              </div>
            </div>
            
            {/* Case Study Content */}
            <div className="flex flex-col justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h3 className="heading-md mb-4">
                American Self Storage & Mail
              </h3>
              <p className="text-body-lg mb-6 text-plum font-medium">
                Sold for $8.35M at 5% cap rate with expansion upside.
              </p>
              <p className="text-body mb-8 leading-relaxed">
                Below-market rents and expansion potential. Mail center + expansion upside.
                We positioned the facility to attract serious buyers who understood the value-add opportunity.
              </p>
              
              <div className="card-luxury-white p-8 rounded-xl mb-8 border-l-4 border-plum">
                <p className="italic text-gray-700 mb-3 text-body">
                  "Denise knew exactly how to position our facility to attract serious buyers. She didn't just find a buyer—she found the right one. Her market knowledge and connections made all the difference in getting us top dollar."
                </p>
                <p className="font-medium text-caption">
                  — Former Owner
                </p>
              </div>
              
              <Button 
                to="/success-stories" 
                variant="primary"
                icon={<ArrowRight size={20} />}
                iconPosition="right"
              >
                More Client Success Stories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What Actually Drives Storage NOI - Enhanced with Insights */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            What Actually Drives <span className="text-gradient">Storage NOI</span>
          </h2>
          {insightsLoading ? (
            <div className="text-center">Loading insights...</div>
          ) : insightsError ? (
            <div className="text-center text-red-600">Error loading insights: {insightsError}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sortedInsights.slice(0, 3).map((insight, index) => (
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
                        {insight.categories?.name || 'Storage Insights'}
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
          
          {sortedInsights.length > 3 && (
            <div className="text-center mt-8">
              <Button to="/insights" variant="outline">
                View More Self-Storage Insights
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* For Buyers */}
      <section className="py-24 bg-sand">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-luxury text-obsidian text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Serious Buyers See the Deal.<br />
              <span className="text-gradient">The Internet Doesn't.</span>
            </h2>
            <p className="text-xl mb-12 text-gray-700 leading-relaxed max-w-3xl mx-auto">
              We don't blast every storage deal to a mass email list.<br />
              If you're in our network, you get early access to real storage opportunities—before they're picked apart or shopped to death.
            </p>            <Button 
              href="https://form.typeform.com/to/AcxbfcXd"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              className="text-lg px-8 py-4"
            >
              Apply for Buyer Access
            </Button>
            <p className="text-base mt-6 text-gray-600">
              We prioritize experienced operators, institutional capital, and serious 1031 buyers.
            </p>
          </div>
        </div>
      </section>

      {/* Talk to Specialist */}
      <section className="py-24 bg-cloud">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
              <ProfileImage
                localPath="/assets/Leadership/denise-nunez-self-storage.webp"
                alt="Denise Nuñez"
                className="w-40 h-40 rounded-full mx-auto object-cover mb-8 border-4 border-gray-100"
                size="medium"
              />
              <h3 className="heading-luxury text-3xl font-bold mb-3 text-plum">
                Denise Nuñez
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                President | Storage Group
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
                <a href="tel:602-697-8868" className="text-plum hover:text-sage text-lg font-medium">
                  📞 602-697-8868
                </a>
                <a href="mailto:denise@specialtyone.com" className="text-plum hover:text-sage text-lg font-medium">
                  📧 denise@specialtyone.com
                </a>
              </div>
              <blockquote className="text-xl italic mb-12 text-gray-700 leading-relaxed max-w-2xl mx-auto">
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

      {/* Social Share Section - moved below Denise contact */}
      <section className="py-16 bg-cloud">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-obsidian mb-4">
              Share Self-Storage Investment Insights
            </h3>
            <p className="text-gray-600 mb-8">
              Help others discover specialized self-storage investment opportunities led by 25+ years of storage expertise.
            </p>
            <SocialShare 
              url="https://specialtyone.com/self-storage"
              title="Self-Storage Investment Brokerage | $721M+ in Transactions | Specialty One"
              description="Specialized investment brokerage for self-storage facilities. $721M+ in transactions led by Denise Nuñez with 25+ years of storage expertise."
              variant="large"
              className="justify-center"
            />
          </div>
        </div>
      </section>

      </div>
    </>
  );
};

export default SelfStoragePage;
