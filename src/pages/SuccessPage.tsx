import { useEffect, useState } from 'react';
import { ArrowRight, Building2, MapPin, Building } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { CloudinaryImage } from '../components/ui/CloudinaryImage';
import { useCaseStudies } from '../hooks/useCaseStudies';
import { CaseStudy } from '../../types/CaseStudy';

const SuccessPage = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('case_studies').select('*');
      if (error) {
        // console.error('Error fetching case studies:', error);
      } else {
        setCaseStudies(data as CaseStudy[]);
      }
      setLoading(false);
    };

    fetchCaseStudies();
  }, []);

  const [selectedStory, setSelectedStory] = useState<CaseStudy | null>(null);

  // Helper function to safely parse results
  const parseResults = (results: string | string[]) => {
    if (Array.isArray(results)) return results;
    if (typeof results === 'string') {
      try {
        return results.startsWith('[') ? JSON.parse(results) : [results];
      } catch {
        return [results];
      }
    }
    return [];
  };

  // Helper function to safely parse testimonial
  const parseTestimonial = (testimonial: any) => {
    if (typeof testimonial === 'object' && testimonial?.quote) return testimonial;
    if (typeof testimonial === 'string') {
      try {
        return testimonial.startsWith('{') ? JSON.parse(testimonial) : { quote: testimonial, author: 'Anonymous' };
      } catch {
        return { quote: testimonial, author: 'Anonymous' };
      }
    }
    return null;
  };

  return (
    <div className="flex flex-col min-h-screen bg-sand">
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-hero text-white relative overflow-hidden">
        {/* Subtle overlay pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>
        
        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center text-sand">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 animate-fade-in leading-tight">
              Real Deals. Real Results.
              <span className="block text-sage">No Guesswork.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 opacity-90 animate-fade-in max-w-3xl mx-auto leading-relaxed" style={{ animationDelay: "0.2s" }}>
              Over $1B in closed transactions across MH, RV, and Self-Storage.
              <span className="block mt-2 text-lg opacity-80">Here's how we did it.</span>
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button 
                to="/contact" 
                variant="primary"
                size="lg"
                className="text-lg px-8 py-4"
              >
                Write Your Success Story
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-20 bg-gradient-to-b from-sand to-cloud relative">
        {/* Decorative element */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-sage to-evergreen"></div>
        <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-obsidian mb-4">
                Performance That Speaks
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Numbers don't lie. Here's what we've accomplished for our clients.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center py-10 px-6 animate-fade-in bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent>
                  <div className="font-display text-5xl font-bold text-plum mb-3">
                    $1B+
                  </div>
                  <div className="text-gray-700 font-medium">
                    Total Transaction Volume
                  </div>
                  <div className="w-12 h-1 bg-gradient-to-r from-sage to-evergreen mx-auto mt-4"></div>
                </CardContent>
              </Card>
              
              <Card className="text-center py-10 px-6 animate-fade-in bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{ animationDelay: "0.1s" }}>
                <CardContent>
                  <div className="font-display text-5xl font-bold text-evergreen mb-3">
                    100%
                  </div>
                  <div className="text-gray-700 font-medium">
                    Success on Exclusive Listings
                  </div>
                  <div className="w-12 h-1 bg-gradient-to-r from-sage to-evergreen mx-auto mt-4"></div>
                </CardContent>
              </Card>
              
              <Card className="text-center py-10 px-6 animate-fade-in bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{ animationDelay: "0.2s" }}>
                <CardContent>
                  <div className="font-display text-5xl font-bold text-sage mb-3">
                    80+
                  </div>
                  <div className="text-gray-700 font-medium">
                    Offers on Single Listing
                  </div>
                  <div className="w-12 h-1 bg-gradient-to-r from-sage to-evergreen mx-auto mt-4"></div>
                </CardContent>
              </Card>
              
              <Card className="text-center py-10 px-6 animate-fade-in bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{ animationDelay: "0.3s" }}>
                <CardContent>
                  <div className="font-display text-5xl font-bold text-amethyst mb-3">
                    25+
                  </div>
                  <div className="text-gray-700 font-medium">
                    PE-Backed Buyers in Network
                  </div>
                  <div className="w-12 h-1 bg-gradient-to-r from-sage to-evergreen mx-auto mt-4"></div>
                </CardContent>
              </Card>
            </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cloud to-white"></div>
        
        <div className="container-custom relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-obsidian">
              Featured Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Real transactions. Real outcomes. Real client experiences.
              Browse our complete collection of success stories across different property types.
            </p>
          </div>
          
          {loading && (
            <div className="text-center py-16">
              <div className="inline-flex items-center gap-3 text-gray-600">
                <div className="w-5 h-5 border-2 border-plum border-t-transparent rounded-full animate-spin"></div>
                <p className="text-lg">Loading success stories...</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="text-center py-16">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-600 text-lg">Error loading success stories: {error}</p>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {caseStudies.map((story: CaseStudy, index: number) => (
              <Card 
                key={story.id}
                className="overflow-hidden animate-fade-in group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white border-0"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <CloudinaryImage
                    localPath={story.heroImage || story.hero_image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute top-6 right-6 flex flex-col gap-2">
                    <Badge color="primary" variant="gradient" className="shadow-lg">
                      {story.propertyType || story.property_type}
                    </Badge>
                    {(story.isConfidential || story.is_confidential) && (
                      <Badge color="secondary" variant="default" className="shadow-lg bg-gray-600 text-white">
                        Confidential
                      </Badge>
                    )}
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <div className="flex items-center gap-2 text-gray-500 mb-4">
                    <MapPin size={18} className="text-sage" />
                    <span className="font-medium">{story.location}</span>
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold mb-4 text-obsidian leading-tight">
                    {story.title}
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="bg-gradient-to-r from-sage/5 to-evergreen/5 p-4 rounded-lg">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        <span className="font-semibold text-evergreen">Challenge:</span> {story.challenge}
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-sage/5 to-evergreen/5 p-4 rounded-lg">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        <span className="font-semibold text-evergreen">Solution:</span> {story.solution}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="font-semibold text-gray-700 text-sm">Key Results:</p>
                      {parseResults(story.results).slice(0, 2).map((result: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-sage mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 text-sm leading-relaxed">{result}</span>
                        </div>
                      ))}
                      {parseResults(story.results).length > 2 && (
                        <div className="text-plum text-sm font-medium">
                          +{parseResults(story.results).length - 2} more results
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Building2 size={18} className="text-plum" />
                      <span className="text-gray-600 font-medium">{story.agent}</span>
                    </div>
                    
                    <Button 
                      onClick={() => setSelectedStory(story)}
                      variant="outline"
                      size="sm"
                      className="text-plum border-plum hover:bg-plum hover:text-white transition-all duration-300"
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
            {/* Modal Header */}
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b border-gray-200">
              <Badge color="primary" variant="gradient" className="text-lg px-4 py-2">
                {selectedStory.propertyType}
              </Badge>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin size={20} className="text-sage" />
                <span className="text-lg font-medium">{selectedStory.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Building size={20} className="text-plum" />
                <span className="text-lg font-medium">{selectedStory.agent}</span>
              </div>
            </div>

            <h2 className="font-display text-4xl font-bold mb-8 text-obsidian leading-tight">
              {selectedStory.title}
            </h2>

            {selectedStory.introduction && (
              <div className="mb-10 bg-gradient-to-r from-sage/5 to-evergreen/5 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-evergreen">Introduction</h3>
                <p className="text-lg leading-relaxed text-gray-700">{selectedStory.introduction}</p>
              </div>
            )}

            {selectedStory.detailedChallenge && (
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-4 text-obsidian flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-xl">!</span>
                  </div>
                  The Challenge
                </h3>
                <p className="text-lg leading-relaxed text-gray-700 pl-11">{selectedStory.detailedChallenge}</p>
              </div>
            )}

            {selectedStory.approach && (
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-4 text-obsidian flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xl">→</span>
                  </div>
                  Our Approach
                </h3>
                <p className="text-lg leading-relaxed text-gray-700 pl-11">{selectedStory.approach}</p>
              </div>
            )}

            {selectedStory.testimonial && (() => {
              const parsedTestimonialData = parseTestimonial(selectedStory.testimonial);
              return parsedTestimonialData ? (
                <blockquote className="my-12 bg-gradient-to-br from-sage/5 to-evergreen/5 p-8 rounded-2xl border-l-4 border-sage relative">
                  <div className="absolute top-4 left-4 text-6xl text-sage/20 font-serif">\"</div>
                  <p className="text-xl italic mb-6 leading-relaxed text-gray-700 pl-8">{parsedTestimonialData.quote}</p>
                  <footer className="text-lg font-semibold text-obsidian pl-8">
                    — {parsedTestimonialData.author}
                    {parsedTestimonialData.title && (
                      <span className="text-gray-600 font-normal">, {parsedTestimonialData.title}</span>
                    )}
                    {parsedTestimonialData.company && (
                      <span className="text-gray-600 font-normal"> at {parsedTestimonialData.company}</span>
                    )}
                  </footer>
                </blockquote>
              ) : null;
            })()}

            {selectedStory.outcome && (
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-4 text-obsidian flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xl">✓</span>
                  </div>
                  The Outcome
                </h3>
                <p className="text-lg leading-relaxed text-gray-700 pl-11">{selectedStory.outcome}</p>
              </div>
            )}

            {/* Fallback content with enhanced styling */}
            {!selectedStory.introduction && !selectedStory.detailedChallenge && !selectedStory.approach && !selectedStory.outcome && (
              <div className="mb-10 space-y-8">
                <h3 className="text-2xl font-bold mb-6 text-obsidian">Project Summary</h3>
                
                <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-xl border-l-4 border-red-500">
                  <h4 className="font-bold text-red-800 mb-3 text-lg">Challenge</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedStory.challenge}</p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border-l-4 border-blue-500">
                  <h4 className="font-bold text-blue-800 mb-3 text-lg">Solution</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedStory.solution}</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border-l-4 border-green-500">
                  <h4 className="font-bold text-green-800 mb-4 text-lg">Results Achieved</h4>
                  <ul className="space-y-3">
                    {parseResults(selectedStory.results).map((result: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <span className="text-gray-700 leading-relaxed">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-obsidian via-amethyst to-plum text-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-sage rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight">
              Ready to Write Your
              <span className="block text-sage">Success Story?</span>
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Whether you're buying or selling, we're here to make it happen.
              <span className="block mt-2 text-lg opacity-80">Let's talk about your goals and create a strategy that delivers results.</span>
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button 
                to="/contact"
                variant="primary"
                size="lg"
                icon={<ArrowRight size={24} />}
                iconPosition="right"
                className="text-lg px-10 py-5 bg-white text-plum hover:bg-sand transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Start Your Story
              </Button>
              
              <Button 
                to="/advantage"
                variant="outline"
                size="lg"
                className="text-lg px-10 py-5 border-2 border-white text-white hover:bg-white/10 transition-all duration-300"
              >
                See How We Work
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default SuccessPage;
