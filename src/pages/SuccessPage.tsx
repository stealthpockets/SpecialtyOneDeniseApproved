import React, { useState } from 'react';
import { ArrowRight, Building2, MapPin, Building } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';

interface SuccessStory {
  title: string;
  location: string;
  type: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  agent: string;
  fullStory?: {
    introduction: string;
    challenge: string;
    approach: string;
    testimonial?: {
      quote: string;
      author: string;
    };
    outcome: string;
  };
}

const successStories: SuccessStory[] = [
  {
    title: "Caravan Oasis",
    location: "Yuma, AZ",
    type: "RV Park",
    challenge: "Mixed waste issues and high operating costs threatened the sale.",
    solution: "Resolved ADEQ concerns and found a buyer who saw the potential.",
    results: [
      "$20,000+ annual cost savings",
      "Resolved complex waste management",
      "Clean close despite challenges"
    ],
    image: "/dist/assets/success-stories/caravan-oasis.webp",
    agent: "Russ Warner and Andrew Warner",
    fullStory: {
      introduction: "Caravan Oasis, a 550-site RV park (with planned expansion to 750 sites) in Yuma, Arizona, was a hidden gem with untapped potential. Its prime location drew RV travelers seeking warm weather, but a tangle of operational issues threatened to derail its sale.",
      challenge: "Mixed wastewater systems—combining older septic tanks with a newer treatment plant—created regulatory headaches, including Arizona Department of Environmental Quality (ADEQ) scrutiny over a misplaced test well. Add to that excessive septic pumping costs of over $20,000 annually and a large-scale solar installation with questionable returns, and buyers were hesitant, fearing hidden risks.",
      approach: "Russ Warner and Andrew Warner thrive on complex deals. They started by diving deep into the issues, working with environmental consultants and engineers to map out the wastewater systems and clarify ADEQ requirements. They discovered that the annual septic pumping was unnecessary, as it disrupted natural waste breakdown—a finding they validated with ADEQ contacts.",
      testimonial: {
        quote: "Russ and Andrew were instrumental in overcoming the hurdles we faced with Caravan Oasis. Their expertise and dedication led to a successful sale and significant cost savings. They found a buyer who not only saw the potential but enhanced the property's value.",
        author: "Anonymous Client"
      },
      outcome: "Their strategy paid off. The sale closed successfully, with the buyer implementing changes that slashed annual operating costs by over $20,000. This boosted the property's net operating income (NOI) and long-term value, proving Russ and Andrew's ability to turn complex challenges into profitable outcomes."
    }
  },
  {
    title: "Desert Trails RV Park",
    location: "Tucson, AZ",
    type: "RV Park",
    challenge: "Zoning issues and COVID uncertainty threatened the deal.",
    solution: "Structured clean terms and found the right buyer—closed at full price.",
    results: [
      "Closed at full asking price during COVID",
      "Resolved complex zoning challenges",
      "Zero price adjustments or retrades"
    ],
    image: "/dist/assets/success-stories/desert-trails.webp",
    agent: "Andrew Warner"
  },
  {
    title: "The Palms",
    location: "Apache Junction, AZ",
    type: "Manufactured Housing",
    challenge: "Needed maximum value while maintaining confidentiality.",
    solution: "Generated 80+ qualified offers through targeted marketing.",
    results: [
      "Achieved sub-3% cap rate",
      "80+ qualified offers",
      "Seamless, confidential process"
    ],
    image: "/dist/assets/success-stories/the-palms.webp",
    agent: "Andrew Warner"
  },
  {
    title: "American Self Storage",
    location: "Chandler, AZ",
    type: "Self-Storage",
    challenge: "Below-market rents and outdated facilities limited appeal.",
    solution: "Positioned value-add opportunity with expansion potential.",
    results: [
      "Sold for $8.35M at 5% cap rate",
      "Minimal days on market",
      "Buyer executed expansion plan"
    ],
    image: "/dist/assets/success-stories/american-ss-mail.webp",
    agent: "Denise Nuñez"
  },
  {
    title: "Desert Retreat",
    location: "Tucson, AZ",
    type: "Manufactured Housing",
    challenge: "Failed listing with another broker and market fatigue.",
    solution: "Fresh strategy and targeted marketing to value-add investors.",
    results: [
      "30% NOI increase",
      "Swift sale at strong price",
      "Overcame rising rates"
    ],
    image: "/dist/assets/success-stories/desert-retreat.webp",
    agent: "Andrew Warner"
  },
  {
    title: "Confidential RV Park",
    location: "Central Arizona",
    type: "RV Park",
    challenge: "Required total confidentiality and premium pricing.",
    solution: "Discreet marketing to vetted buyers with proven track records.",
    results: [
      "5% above market comps",
      "60-day close timeline",
      "Complete confidentiality maintained"
    ],
    image: "/dist/assets/success-stories/confidential-rv-resort.webp",
    agent: "Russ Warner and Andrew Warner"
  },
  {
    title: "Confidential Acquisition",
    location: "Phoenix, AZ",
    type: "Manufactured Housing",
    challenge: "Needed off-market trophy asset with tight timeline.",
    solution: "Leveraged relationships for first-look opportunity.",
    results: [
      "40-day close achieved",
      "Met strict return hurdles",
      "Zero post-close surprises"
    ],
    image: "/dist/assets/success-stories/confidential-mhc-buyer.webp",
    agent: "Russ Warner and Andrew Warner"
  },
  {
    title: "Mogollon RV",
    location: "Forest Lake, AZ",
    type: "RV Park",
    challenge: "Infrastructure limitations and perceived value constraints.",
    solution: "Highlighted unique market position and demand dynamics.",
    results: [
      "Premium 5% cap rate",
      "Set new market comp",
      "Found visionary buyer"
    ],
    image: "/dist/assets/success-stories/mogollon-rv.webp",
    agent: "Andrew Warner"
  }
];

const DetailedStory = ({ id, title, type, location, agent, children }: {
  id: string;
  title: string;
  type: string;
  location: string;
  agent: string;
  children: React.ReactNode;
}) => (
  <div id={id} className="py-16 border-b border-gray-200">
    <div className="max-w-4xl mx-auto">
      <Badge color="primary" variant="gradient" className="mb-4">
        {type}
      </Badge>
      
      <h2 className="font-display text-3xl font-bold mb-4">
        {title}
      </h2>
      
      <div className="flex items-center gap-4 text-gray-600 mb-6">
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Building size={16} />
          <span>{agent}</span>
        </div>
      </div>
      
      {children}
    </div>
  </div>
);

const SuccessPage = () => {
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-sand">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Real Deals. Real Results.
              <span className="block">No Guesswork.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Over $1B in closed transactions across MH, RV, and Self-Storage.
              Here's how we did it.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button 
                to="/contact" 
                variant="primary"
                className="bg-white text-plum hover:bg-cloud"
                size="lg"
              >
                Write Your Success Story
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center py-8 animate-fade-in">
              <CardContent>
                <div className="font-display text-4xl font-bold text-plum mb-2">
                  $1B+
                </div>
                <div className="text-gray-700">
                  Total Transaction Volume
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center py-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardContent>
                <div className="font-display text-4xl font-bold text-plum mb-2">
                  100%
                </div>
                <div className="text-gray-700">
                  Success on Exclusive Listings
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center py-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardContent>
                <div className="font-display text-4xl font-bold text-plum mb-2">
                  80+
                </div>
                <div className="text-gray-700">
                  Offers on Single Listing
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center py-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <CardContent>
                <div className="font-display text-4xl font-bold text-plum mb-2">
                  25+
                </div>
                <div className="text-gray-700">
                  PE-Backed Buyers in Network
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-cloud">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            Featured Success Stories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card 
                key={index}
                className="overflow-hidden animate-fade-in"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <div className="relative h-48">
                  <img 
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge color="primary" variant="gradient">
                      {story.type}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPin size={16} />
                    <span>{story.location}</span>
                  </div>
                  
                  <h3 className="font-display text-xl font-bold mb-3">
                    {story.title}
                  </h3>
                  
                  <div className="mb-4">
                    <p className="text-gray-600 mb-2">
                      <strong>Challenge:</strong> {story.challenge}
                    </p>
                    <p className="text-gray-600 mb-4">
                      <strong>Solution:</strong> {story.solution}
                    </p>
                    
                    <div className="space-y-2">
                      {story.results.map((result, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-sage">✓</span>
                          <span className="text-gray-600">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-plum" />
                      <span className="text-gray-600">{story.agent}</span>
                    </div>
                    
                    <Button 
                      onClick={() => setSelectedStory(story)}
                      variant="outline"
                      size="sm"
                    >
                      Full Story
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Story Modal */}
      <Modal
        isOpen={!!selectedStory}
        onClose={() => setSelectedStory(null)}
      >
        {selectedStory && selectedStory.fullStory && (
          <div className="prose max-w-none">
            <div className="flex items-center gap-4 mb-6">
              <Badge color="primary" variant="gradient">
                {selectedStory.type}
              </Badge>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} />
                <span>{selectedStory.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Building size={16} />
                <span>{selectedStory.agent}</span>
              </div>
            </div>

            <h2 className="font-display text-3xl font-bold mb-6">
              {selectedStory.title}
            </h2>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-3">Introduction</h3>
              <p>{selectedStory.fullStory.introduction}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-3">The Challenge</h3>
              <p>{selectedStory.fullStory.challenge}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-3">Our Approach</h3>
              <p>{selectedStory.fullStory.approach}</p>
            </div>

            {selectedStory.fullStory.testimonial && (
              <blockquote className="italic border-l-4 border-plum pl-4 my-8 bg-cloud p-6 rounded-lg">
                <p className="mb-4">{selectedStory.fullStory.testimonial.quote}</p>
                <footer className="font-medium">
                  — {selectedStory.fullStory.testimonial.author}
                </footer>
              </blockquote>
            )}

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-3">The Outcome</h3>
              <p>{selectedStory.fullStory.outcome}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-obsidian to-amethyst text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Whether you're buying or selling, we're here to make it happen.
              Let's talk about your goals and create a strategy that delivers results.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                to="/contact"
                variant="primary"
                size="lg"
                className="bg-white text-plum hover:bg-cloud"
                icon={<ArrowRight size={20} />}
                iconPosition="right"
              >
                Start Your Story
              </Button>
              
              <Button 
                to="/advantage"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                See How We Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-white">
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessPage;