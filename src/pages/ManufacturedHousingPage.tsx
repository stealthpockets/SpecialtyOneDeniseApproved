import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { TestimonialsRV } from '../components/home/TestimonialsRV';
import { ProfileImage, CloudinaryImage } from '../components/ui/CloudinaryImage';
import { CloudinaryBackgroundImage } from '../components/ui/CloudinaryBackgroundImage';
import { TickerBox } from '../components/home/TickerBox';
import { useInsights } from '../hooks/useInsights';
import { useMemo } from 'react';
import { SEOHead } from '../components/ui/SEOHead';
import { SocialShare } from '../components/ui/SocialShare';

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
    image: "the-palms.webp"
  },
  {
    title: "Desert Retreat – Resurrected Listing, 30% NOI Growth",
    subtitle: "Sold after failed listing | 30% NOI gain",
    location: "Tucson, AZ",
    details: "43 Sites | 30% NOI Lift",
    description: "Achieved a 30% NOI lift in 12 months, secured multiple full-price offers, and closed above guidance after a previous failed listing.",
    image: "desert-retreat.webp"
  }
];

const ManufacturedHousingPage = () => {
  // Memoize the filters object to prevent unnecessary re-renders
  const insightsFilters = useMemo(() => ({ propertyTypeId: 1 }), []);
  const { insights, loading: insightsLoading, error: insightsError } = useInsights(insightsFilters);

  return (
    <>
      <SEOHead
        title="Manufactured Housing Community Investment Brokerage | MHC Sales"
        description="Specialized investment brokerage for manufactured housing communities (MHC). $304M+ in transactions. Expert valuation, market analysis, and advisory services for mobile home parks."
        keywords="manufactured housing communities, mobile home parks, MHC investment, MHC brokerage, manufactured housing sales, mobile home park valuation, MHC advisory"
        image="/assets/property-types/manufactured-housing-community-investment.webp"
        url="https://specialtyone.com/manufactured-housing"
      />      <div className="flex flex-col min-h-screen bg-sand">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-luxury-dark opacity-95"></div>
        <CloudinaryBackgroundImage
          localPath="/assets/property-types/mobile-home-park-specialty-one.webp"
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
              Other Brokers <span className="text-white opacity-70">List.</span>
              <span className="block mt-2 text-gradient">We Deliver.</span>
            </h1>
            <p className="text-body-lg mb-12 opacity-85 animate-fade-in max-w-3xl mx-auto" style={{ animationDelay: "0.2s" }}>
              Most overpromise, misprice, and retrade.<br />
              We've never failed to close a manufactured housing listing.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in mb-6" style={{ animationDelay: "0.3s" }}>              <Button 
                href="https://form.typeform.com/to/Isxy11zm" 
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                className="bg-white text-plum hover:bg-white/90"
              >
                Get Listings or Request Valuation
              </Button>
            </div>
            <p className="text-caption text-white/70 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              One form. Whether you're buying, selling, or planning a 1031.
            </p>
          </div>
        </div>
      </section>

      {/* Market Rate Ticker */}
      <TickerBox />

      {/* Enhanced Stats Grid */}
      <section className="section-padding bg-sand luxury-gradient-overlay">
        <div className="container-custom">
          <h2 className="heading-lg mb-16 text-center max-w-4xl mx-auto">
            <span className="text-gradient">100% Success Rate</span> on Exclusive Listings.
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

      {/* Testimonials */}
      <TestimonialsRV />

      {/* Enhanced Edge as Seller Section */}
      <section className="section-padding bg-sand luxury-gradient-overlay">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-8">
              The Last Thing You Need Is Another <span className="text-gradient">Bidding War</span> That Falls Apart.
            </h2>
            <p className="text-body-lg mb-12 text-gray-700 leading-relaxed">
              You've seen it: brokers chase top-dollar offers, only to renegotiate mid-deal or fall out of escrow altogether.
              We don't play that game. We pre-underwrite, qualify buyers, and build deal certainty before we go live.
            </p>            <Button 
              href="https://form.typeform.com/to/NKQAZkUv" 
              target="_blank"
              rel="noopener noreferrer"
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

      {/* Enhanced Case Studies */}
      <section className="section-padding bg-sand relative overflow-hidden">
        {/* Enhanced subtle purple gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-plum/8 to-amethyst/12 opacity-70"></div>
        
        <div className="container-custom relative z-10">
          <h2 className="heading-lg mb-16 text-center max-w-4xl mx-auto">
            Real Stories, Real Numbers, <span className="text-gradient">Real Results</span>
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
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 w-full content-padding pb-8 z-10 bg-gradient-to-t from-obsidian/95 via-deep-purple/40 to-transparent">
                  <h3 className="text-white heading-sm mb-3 group-hover:text-sage transition-colors duration-300">
                    {study.title}
                  </h3>
                  <p className="text-white text-body mb-2">
                    {study.subtitle}
                  </p>
                  <p className="text-white/90 text-caption">
                    {study.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced For Buyers Section */}
      <section className="section-padding bg-luxury-purple text-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg text-white mb-8">
              <span className="text-gradient-light">Serious Buyers</span> See the Deal. The Internet Doesn't.
            </h2>
            <p className="text-body-lg mb-12 opacity-85 leading-relaxed">
              We don't email-blast sensitive details to 5,000 "investors."<br />
              If you're in our network, you'll see high-quality opportunities early—before they're over-shopped or priced down.<br />
              If you're not, you won't.
            </p>            <Button 
              href="https://form.typeform.com/to/b9sObSil"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              className="bg-white text-plum hover:bg-white/90 mb-6"
            >
              Apply for Buyer Access
            </Button>
            <p className="text-caption text-white/70">
              We prioritize family offices, long-term buyers, and serious 1031 investors.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Insights Section */}
      <section className="section-padding bg-sand luxury-gradient-overlay">
        <div className="container-custom">
          <h2 className="heading-lg mb-16 text-center max-w-4xl mx-auto">
            Insights That Actually Help You Operate—<span className="text-gradient">and Exit</span>
          </h2>
          {insightsLoading ? (
            <div className="text-center text-body">Loading insights...</div>
          ) : insightsError ? (
            <div className="text-center text-red-600 text-body">Error loading insights: {insightsError}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {insights.slice(0, 3).map((insight, index) => (
                <Link
                  key={insight.id}
                  to={`/insights/${insight.slug}`}
                  className="block group hover:shadow-card-hover transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${0.2 * index}s` }}
                >
                  <Card className="overflow-hidden h-full group-hover:scale-[1.02] transition-transform duration-300 card-luxury-white">
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
                    <CardContent className="content-padding">
                      <div className="text-caption text-plum font-medium mb-3">
                        {insight.categories?.name || 'Market Insights'}
                      </div>
                      <h3 className="heading-sm mb-4 leading-relaxed group-hover:text-plum transition-colors">
                        {insight.title}
                      </h3>
                      {insight.summary && (
                        <p className="text-body text-gray-600 line-clamp-2 mb-4">
                          {insight.summary}
                        </p>
                      )}
                      <div className="text-plum font-medium text-caption group-hover:underline">
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

      {/* Enhanced Talk to Specialist Section */}
      <section className="section-padding bg-cloud luxury-gradient-overlay">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="card-luxury-white rounded-xl content-padding py-12 text-center">
              <ProfileImage
                localPath="/assets/Leadership/andrew-headshot-image.webp"
                alt="Andrew Warner"
                className="w-32 h-32 rounded-full mx-auto object-cover mb-8 shadow-lg"
                size="small"
              />
              <h3 className="heading-md mb-3">
                Andrew Warner, CCIM
              </h3>
              <p className="text-body text-gray-600 mb-6">
                President | Manufactured Housing & RV
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                <a href="tel:602-730-9967" className="text-plum hover:text-amethyst transition-colors text-body">
                  📞 602-730-9967
                </a>
                <a href="mailto:andrew@specialtyone.com" className="text-plum hover:text-amethyst transition-colors text-body">
                  📧 andrew@specialtyone.com
                </a>
              </div>
              <blockquote className="text-body-lg italic mb-10 text-gray-700 max-w-2xl mx-auto">
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

      {/* Social Share Section */}
      <section className="py-16 bg-cloud">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="font-display text-2xl font-bold mb-6 text-gray-900">
              Share This Page
            </h3>
            <p className="text-gray-600 mb-8">
              Know someone interested in manufactured housing community investments? Share our expertise.
            </p>
            <SocialShare 
              url={typeof window !== 'undefined' ? window.location.href : 'https://specialtyone.com/manufactured-housing'}
              title="Manufactured Housing Community Investment Brokerage | Specialty One"
              description="Expert investment brokerage for manufactured housing communities. $304M+ in transactions with specialized market knowledge."
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

export default ManufacturedHousingPage;
