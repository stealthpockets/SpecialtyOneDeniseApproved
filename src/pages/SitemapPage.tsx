import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';

const SitemapPage = () => {
  const mainPages = [
    { name: 'Home', path: '/', description: 'Specialty One Investment Brokerage homepage' },
    { name: 'About', path: '/about', description: 'Learn about our team and company history' },
    { name: 'Contact', path: '/contact', description: 'Get in touch with our investment specialists' },
    { name: 'The Advantage', path: '/advantage', description: 'How our specialized approach delivers results' },
  ];

  const propertyTypes = [
    { name: 'Manufactured Housing', path: '/manufactured-housing', description: 'Manufactured housing community investments' },
    { name: 'RV Parks & Outdoor Hospitality', path: '/rv-parks', description: 'RV park and outdoor hospitality property investments' },
    { name: 'Self-Storage', path: '/self-storage', description: 'Self-storage facility investments and advisory' },
  ];

  const services = [
    { name: '1031 Exchange', path: '/1031-exchange', description: 'Tax-deferred exchange solutions for real estate investors' },
    { name: 'Track Record', path: '/track-record', description: 'Our proven investment brokerage track record' },
  ];

  const resources = [
    { name: 'Success Stories', path: '/success-stories', description: 'Case studies of successful transactions' },
    { name: 'Insights', path: '/insights', description: 'Market insights and investment analysis' },
    { name: 'Market Reports', path: '/market-reports', description: 'Comprehensive market research and reports' },
  ];

  const networks = [
    { name: 'Exclusive Buyer Network', path: '/exclusive-buyers', description: 'Access to qualified institutional buyers' },
    { name: 'Exclusive Seller Network', path: '/exclusive-sellers', description: 'Off-market investment opportunities' },
  ];

  const legal = [
    { name: 'Privacy Policy', path: '/privacy', description: 'Our privacy policy and data protection practices' },
    { name: 'Terms of Service', path: '/terms', description: 'Terms and conditions of use' },
  ];

  const SitemapSection = ({ 
    title, 
    items, 
    description 
  }: { 
    title: string; 
    items: { name: string; path: string; description: string }[]; 
    description?: string;
  }) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-obsidian mb-3">{title}</h2>
      {description && (
        <p className="text-gray-600 mb-6 text-lg">{description}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div key={item.path} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-plum/20">
            <Link 
              to={item.path}
              className="group block"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-plum group-hover:text-amethyst transition-colors">
                  {item.name}
                </h3>
                <ChevronRight 
                  size={20} 
                  className="text-gray-400 group-hover:text-plum transition-colors" 
                />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <SEOHead
        title="Sitemap | Specialty One Investment Brokerage"
        description="Complete sitemap of Specialty One's website - find all pages related to manufactured housing, RV parks, self-storage investments, and market insights."
        keywords="sitemap, website navigation, manufactured housing, RV parks, self storage, investment brokerage, market reports"
        url="https://specialtyone.com/sitemap"
      />
      
      <div className="min-h-screen bg-sand">
        {/* Header */}
        <section className="bg-gradient-to-r from-plum to-amethyst text-white py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Site Map
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                Navigate our complete website dedicated to specialized real estate investment brokerage
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <nav className="bg-white border-b border-gray-200">
          <div className="container-custom py-4">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-plum transition-colors">
                Home
              </Link>
              <ChevronRight size={16} className="mx-2" />
              <span className="text-plum font-medium">Site Map</span>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="container-custom py-16">
          <div className="max-w-6xl mx-auto">
            
            <SitemapSection
              title="Main Pages"
              items={mainPages}
              description="Core pages about our company and services"
            />

            <SitemapSection
              title="Investment Property Types"
              items={propertyTypes}
              description="Specialized brokerage services for alternative real estate asset classes"
            />

            <SitemapSection
              title="Services"
              items={services}
              description="Additional investment and advisory services"
            />

            <SitemapSection
              title="Resources & Insights"
              items={resources}
              description="Market intelligence, case studies, and industry insights"
            />

            <SitemapSection
              title="Exclusive Networks"
              items={networks}
              description="Access to qualified buyers and off-market opportunities"
            />

            <SitemapSection
              title="Legal & Policies"
              items={legal}
              description="Terms, privacy, and legal information"
            />

            {/* Additional Info */}
            <div className="mt-16 p-8 bg-white rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-obsidian mb-4">
                About This Sitemap
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  This sitemap provides a comprehensive overview of all pages on the Specialty One website. 
                  We specialize in manufactured housing communities, RV parks, and self-storage investments, 
                  providing expert brokerage services with over $1 billion in closed transactions.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Our website is designed to help property owners, investors, and industry professionals 
                  access market insights, connect with qualified buyers and sellers, and understand 
                  our specialized approach to alternative real estate investments.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  For questions about our services or website, please <Link to="/contact" className="text-plum hover:text-amethyst">contact us</Link> directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SitemapPage;
