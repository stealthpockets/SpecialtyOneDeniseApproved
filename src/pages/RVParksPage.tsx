import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { TestimonialsRV } from '../components/home/TestimonialsRV';
import { ProfileImage, CloudinaryImage } from '../components/ui/CloudinaryImage';
import { CloudinaryBackgroundImage } from '../components/ui/CloudinaryBackgroundImage';
import { SocialShare } from '../components/ui/SocialShare';
import { useInsights } from '../hooks/useInsights';
import { useMemo } from 'react';
import { SEOHead } from '../components/ui/SEOHead';

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
    image: "desert-trails.webp"
  },
  {
    title: "Caravan Oasis",
    subtitle: "Complex Utilities, Clean Close",
    location: "Yuma, AZ",
    description: "ADEQ, septic, and solar confusion. Closed clean.",
    image: "caravan-oasis.webp"
  }
];

const RVParksPage = () => {
  // Fetch all insights, then sort them to prioritize RV Parks, Self-Storage, and MH.
  const { insights, loading: insightsLoading, error: insightsError } = useInsights();

  // Sort insights: property type 2 (RV Parks) first, then 3 (Self-Storage), then 4 (MH).
  const sortedInsights = useMemo(() => {
    if (!insights) return [];
    return [...insights].sort((a, b) => {
      const getPriority = (id: number | undefined) => {
        if (id === 2) return 1; // Highest priority for RV Parks
        if (id === 3) return 2; // Second priority for Self-Storage
        if (id === 4) return 3; // Third priority for MH
        return 4; // Lower priority for everything else
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
        title="RV Park & Outdoor Hospitality Investment Brokerage | RV Resort Sales"
        description="Specialized investment brokerage for RV parks and outdoor hospitality properties. Expert valuation, market analysis, and advisory services for recreational vehicle resorts and campgrounds."
        keywords="RV parks, outdoor hospitality, RV resort investment, campground sales, recreational vehicle parks, RV park brokerage, outdoor hospitality investment"
        image="/assets/property-types/rv_park_resort_arizona.webp"
        url="https://specialtyone.com/rv-parks"
      />      <div className="flex flex-col min-h-screen bg-sand">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-luxury-dark opacity-95"></div>
        <CloudinaryBackgroundImage
          localPath="/assets/property-types/outdoor-hospitality-rv-park.webp"
          className="absolute inset-0 bg-cover bg-center"
        >
          <div></div>
        </CloudinaryBackgroundImage>
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/5"></div>
        </div>        
        <div className="container-custom relative z-10 flex items-center justify-center min-h-screen">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="heading-xl text-white mb-8 animate-fade-in">
              Outdoor Hospitality Isn't "Just a Park."
              <span className="block mt-2">It's an <span className="text-gradient-light">Operating Business.</span></span>
            </h1>
            <div className="space-y-6 mb-12 animate-fade-in max-w-3xl mx-auto" style={{ animationDelay: "0.2s" }}>
              <p className="text-xl text-white/95 leading-relaxed font-medium">
                We know the difference. That's why serious owners trust us to structure clean, efficient exits.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in mb-6" style={{ animationDelay: "0.3s" }}>
              <Button 
                to="/contact" 
                variant="primary"
                size="lg"
                className="bg-white text-plum hover:bg-white/90"
              >
                Get Listings or Request Valuation
              </Button>
            </div>
            <p className="text-caption text-white/70 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              One form. Whether you're selling, acquiring, or planning a 1031.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Grid */}
      <section className="section-padding bg-sand luxury-gradient-overlay">
        <div className="container-custom">
          <h2 className="heading-lg mb-16 text-center max-w-4xl mx-auto">
            <span className="text-gradient">Clean Closings.</span> Qualified Buyers.
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

      {/* Enhanced Specialization Section */}
      <section className="section-padding bg-sand luxury-gradient-overlay">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-lg mb-12 text-center">
              Most Brokers Price RV Parks Like Apartments.<br />
              <span className="text-gradient mt-2 block">We Don't.</span>
            </h2>
            <div className="space-y-6">
              <div className="card-luxury-white rounded-xl p-8 hover:shadow-card-hover transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-start gap-6">
                  <CheckCircle size={24} className="text-sage mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="heading-sm text-plum mb-4">Specialized Revenue Analysis</h3>
                    <p className="text-body text-gray-700 leading-relaxed">We underwrite seasonal, transient, and long-term income streams separately, accounting for occupancy patterns that change throughout the year.</p>
                  </div>
                </div>
              </div>

              <div className="card-luxury-white rounded-xl p-8 hover:shadow-card-hover transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-start gap-6">
                  <CheckCircle size={24} className="text-sage mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="heading-sm text-plum mb-4">Alternative Revenue Expertise</h3>
                    <p className="text-body text-gray-700 leading-relaxed">Park model, glamping, or cabin revenue? We know how to value it and present it to buyers who understand the operational dynamics.</p>
                  </div>
                </div>
              </div>

              <div className="card-luxury-white rounded-xl p-8 hover:shadow-card-hover transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="flex items-start gap-6">
                  <CheckCircle size={24} className="text-sage mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="heading-sm text-plum mb-4">Complex Issue Resolution</h3>
                    <p className="text-body text-gray-700 leading-relaxed">Septic, solar, zoning, and ADEQ issues? We've closed through them all and know which buyers have the expertise to handle operational challenges.</p>
                  </div>
                </div>
              </div>

              <div className="card-luxury-white rounded-xl p-8 hover:shadow-card-hover transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="flex items-start gap-6">
                  <CheckCircle size={24} className="text-sage mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="heading-sm text-plum mb-4">Institutional Buyer Network</h3>
                    <p className="text-body text-gray-700 leading-relaxed">Our buyer pool includes REITs, syndicators, and long-term operators who understand outdoor hospitality as a business, not just real estate.</p>
                  </div>
                </div>
              </div>

              <div className="card-luxury-white rounded-xl p-8 hover:shadow-card-hover transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-start gap-6">
                  <CheckCircle size={24} className="text-sage mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="heading-sm text-plum mb-4">Strategic Exit Planning</h3>
                    <p className="text-body text-gray-700 leading-relaxed">We help you exit with proper timing, tax-efficient structure, and complete certainty—managing every detail from valuation to wire transfer.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsRV />

      {/* Enhanced Case Studies */}
      <section className="section-padding bg-sand relative overflow-hidden">
        {/* Enhanced subtle purple gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-plum/8 to-amethyst/12 opacity-70"></div>
        
        <div className="container-custom relative z-10">
          <h2 className="heading-lg mb-16 text-center max-w-4xl mx-auto">
            Real Stories and Outcomes in <span className="text-gradient">Outdoor Hospitality</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {caseStudies.map((study, index) => (
              <Link
                key={index}
                to={`/success-stories/${study.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="relative rounded-xl overflow-hidden block group hover:shadow-card-hover transition-all duration-500 animate-fade-in card-luxury-white"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <CloudinaryImage 
                  localPath={study.image}
                  alt={study.title}
                  className="w-full h-[450px] object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 w-full content-padding pb-8 z-10 bg-gradient-to-t from-obsidian/95 via-deep-purple/40 to-transparent">
                  <h3 className="text-white heading-sm mb-3 group-hover:text-sage transition-colors duration-300">
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

      {/* For Sellers - Enhanced with luxury spacing */}
      <section className="py-24 bg-gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-modern-hero opacity-60"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-luxury text-white text-4xl md:text-5xl font-bold mb-12 leading-tight">
              You Don't Need More Bidders.<br />
              <span className="text-gradient-light">You Need a Buyer Who Closes.</span>
            </h2>
            <div className="space-y-8 mb-16">
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed font-medium max-w-3xl mx-auto">
                We qualify capital, structure the terms, and solve problems before you hit escrow.
              </p>
              <p className="text-lg md:text-xl opacity-85 leading-relaxed max-w-2xl mx-auto">
                Whether you need confidentiality or full exposure—we drive results.
              </p>
            </div>
            <Button 
              to="/contact"
              variant="primary"
              size="lg"
              className="bg-white text-plum hover:bg-cloud font-semibold text-lg px-8 py-4"
            >
              Talk Through Your Exit Strategy
            </Button>
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="py-16 bg-sand">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            What Actually Moves NOI in <span className="text-gradient">Outdoor Hospitality</span>
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
                        <CloudinaryImage
                          localPath={insight.image_url}
                          alt={insight.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="text-sm text-plum font-medium mb-2">
                        {insight.categories?.name || 'Outdoor Hospitality Insights'}
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
                View More Insights
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* For Buyers - Moved up before Andrew Warner */}
      <section className="py-24 bg-gradient-to-br from-luxury-dark to-amethyst text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-modern-hero opacity-60"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-luxury text-white text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Serious Buyers See the Deal.<br />
              <span className="text-gradient-light">The Internet Doesn't.</span>
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed font-medium max-w-3xl mx-auto">
              We don't blast every deal to a mass email list.<br />
              If you're in our network, you get early access to real RV park and outdoor hospitality listings—before they're picked apart or shopped to death.
            </p>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-12 border border-white/20 shadow-luxury max-w-2xl mx-auto">
              <p className="text-lg font-medium mb-6">
                We prioritize experienced operators, long-term capital, and serious 1031 buyers.
              </p>              <Button 
                href="https://form.typeform.com/to/Nq75Og0B"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                className="bg-white text-plum hover:bg-cloud font-semibold"
              >
                Apply for Buyer Access
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Talk to Specialist */}
      <section className="py-16 bg-cloud">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="bg-cloud rounded-lg p-8 text-center">
              <ProfileImage
                localPath="/assets/Leadership/andrew-headshot-image.webp"
                alt="Andrew Warner"
                className="w-32 h-32 rounded-full mx-auto object-cover mb-6"
                size="small"
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

      {/* Social Share Section - moved below Andrew Warner with matching styling */}
      <section className="py-16 bg-cloud">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-obsidian mb-6">
              Share RV Park Investment Insights
            </h3>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Help others discover specialized RV park and outdoor hospitality investment opportunities.
            </p>
            <SocialShare 
              url="https://specialtyone.com/rv-parks"
              title="RV Park & Outdoor Hospitality Investment Brokerage | Specialty One"
              description="Specialized investment brokerage for RV parks and outdoor hospitality properties. Expert valuation, market analysis, and advisory services."
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

export default RVParksPage;
