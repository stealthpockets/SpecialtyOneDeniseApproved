import { useState } from 'react';
import { ArrowRight, Building2, MapPin, Building } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useCaseStudies } from '../hooks/useCaseStudies';
import { CaseStudy } from '../types/caseStudy';

const SuccessPage = () => {
  const { caseStudies, loading, error } = useCaseStudies();
  const [selectedStory, setSelectedStory] = useState<CaseStudy | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-sand">
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
                size="lg"
              >
                Write Your Success Story
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-16 bg-sand">
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
          
          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading success stories...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-12">
              <p className="text-red-600">Error loading success stories: {error}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((story: CaseStudy, index: number) => (
              <Card 
                key={story.id}
                className="overflow-hidden animate-fade-in"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <div className="relative h-48">
                  <img 
                    src={story.heroImage}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge color="primary" variant="gradient">
                      {story.propertyType}
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
                      {story.results.map((result: string, idx: number) => (
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
        {selectedStory && (
          <div className="prose max-w-none">
            <div className="flex items-center gap-4 mb-6">
              <Badge color="primary" variant="gradient">
                {selectedStory.propertyType}
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

            {selectedStory.introduction && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3">Introduction</h3>
                <p>{selectedStory.introduction}</p>
              </div>
            )}

            {selectedStory.detailedChallenge && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3">The Challenge</h3>
                <p>{selectedStory.detailedChallenge}</p>
              </div>
            )}

            {selectedStory.approach && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3">Our Approach</h3>
                <p>{selectedStory.approach}</p>
              </div>
            )}

            {selectedStory.testimonial && (
              <blockquote className="italic border-l-4 border-plum pl-4 my-8 bg-cloud p-6 rounded-lg">
                <p className="mb-4">{selectedStory.testimonial.quote}</p>
                <footer className="font-medium">
                  — {selectedStory.testimonial.author}
                  {selectedStory.testimonial.title && (
                    <span className="text-gray-500">, {selectedStory.testimonial.title}</span>
                  )}
                  {selectedStory.testimonial.company && (
                    <span className="text-gray-500"> at {selectedStory.testimonial.company}</span>
                  )}
                </footer>
              </blockquote>
            )}

            {selectedStory.outcome && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3">The Outcome</h3>
                <p>{selectedStory.outcome}</p>
              </div>
            )}

            {/* Fallback content if no detailed story available */}
            {!selectedStory.introduction && !selectedStory.detailedChallenge && !selectedStory.approach && !selectedStory.outcome && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3">Summary</h3>
                <div className="space-y-4">
                  <p><strong>Challenge:</strong> {selectedStory.challenge}</p>
                  <p><strong>Solution:</strong> {selectedStory.solution}</p>
                  <div>
                    <strong>Results:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      {selectedStory.results.map((result: string, idx: number) => (
                        <li key={idx}>{result}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
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
      <section className="py-16 bg-sand">
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
