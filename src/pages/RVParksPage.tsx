import { ArrowRight, CheckCircle, Building2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const specializations = [
  {
    text: "We underwrite seasonal, transient, and long-term income streams separately",
    icon: <CheckCircle size={20} className="text-sage" />
  },
  {
    text: "Park model, glamping, or cabin revenue? We know how to value it",
    icon: <CheckCircle size={20} className="text-sage" />
  },
  {
    text: "Septic, solar, zoning, and ADEQ issues? We've closed through them all",
    icon: <CheckCircle size={20} className="text-sage" />
  },
  {
    text: "Our buyer pool includes REITs, syndicators, and long-term operators",
    icon: <CheckCircle size={20} className="text-sage" />
  },
  {
    text: "We help you exit with timing, structure, and certainty",
    icon: <CheckCircle size={20} className="text-sage" />
  }
];

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

const testimonials = [
  {
    quote: "They made a tough deal look easy. Transparent, detail-oriented, and delivered the right buyer.",
    author: "George Bunting",
    property: "Caravan Oasis & Desert Trails"
  },
  {
    quote: "Andrew took charge of everything. We closed at full price—even during COVID.",
    author: "Pericles Wyatt",
    property: "Desert Trails RV Park"
  },
  {
    quote: "Knowledgeable, honest, and the process couldn't have gone smoother.",
    author: "Phil Hu",
    property: "Lost Dutchman RV Resort"
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

const insights = [
  {
    title: "Seasonal vs. Year-Round: What Buyers Value Most",
    category: "Valuation"
  },
  {
    title: "How to Underwrite Cabin & Glamping Revenue Without Overpricing",
    category: "Due Diligence"
  },
  {
    title: "The Zoning Red Flag That Kills RV Park Escrows",
    category: "Risk Management"
  }
];

const RVParksPage = () => {
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
            <p className="text-sm mt-4 opacity-75 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              One form. Whether you're selling, acquiring, or planning a 1031.
            </p>
          </div>
        </div>
      </section>

      {/* Specialization Section */}
      <section className="py-16 bg-sand">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-center">
              Most Brokers Price RV Parks Like Apartments.<br />
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
            $300M+ in MH & RV Closings. Clean Deals. Qualified Buyers.
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
      <section className="py-16 bg-sand">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            What RV Park Sellers Say After the Deal Closes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-cloud rounded-lg p-8 animate-fade-in"
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
                  <p className="text-gray-600">
                    {testimonial.property}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-cloud">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            The Kind of Parks We've Sold—and How
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
              You Don't Need More Bidders.<br />
              You Need a Buyer Who Closes.
            </h2>
            <p className="text-lg mb-8 opacity-90">
              We qualify capital, structure the terms, and solve problems before you hit escrow.<br />
              Whether you need confidentiality or full exposure—we drive results.
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
      <section className="py-16 bg-sand">
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
      <section className="py-16 bg-cloud">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            What Actually Moves NOI in Outdoor Hospitality
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {insights.map((insight, index) => (
              <Card 
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <CardContent className="p-6">
                  <div className="text-sm text-plum font-medium mb-2">
                    {insight.category}
                  </div>
                  <h3 className="text-xl font-bold mb-4">
                    {insight.title}
                  </h3>
                  <Button 
                    to={`/insights/${insight.title.toLowerCase().replace(/\s+/g, '-')}`}
                    variant="outline"
                  >
                    Read Article
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button 
              to="/insights?filter=rv"
              variant="primary"
              icon={<ArrowRight size={20} />}
              iconPosition="right"
            >
              Browse All RV Insights
            </Button>
          </div>
        </div>
      </section>

      {/* Talk to Specialist */}
      <section className="py-16 bg-sand">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="bg-cloud rounded-lg p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-plum to-amethyst flex items-center justify-center mx-auto mb-6">
                <Building2 size={40} className="text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">
                Andrew Warner, CCIM
              </h3>
              <p className="text-gray-600 mb-4">
                President | Manufactured Housing & RV
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <a href="tel:602-708-7305" className="text-plum hover:text-amethyst">
                  📞 602-708-7305
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
              to="/self-storage"
              variant="outline"
              className="text-center py-6"
            >
              📦 Self-Storage
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

export default RVParksPage;
