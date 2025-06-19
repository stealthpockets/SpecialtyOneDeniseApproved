import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, MapPin, Building, TrendingUp, Users, Award } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { SEOHead } from '../components/ui/SEOHead';
import { CloudinaryImage } from '../components/ui/CloudinaryImage';
import { SocialShare } from '../components/ui/SocialShare';
import { useCaseStudies } from '../hooks/useCaseStudies';
import { CaseStudy } from '../types/caseStudy';

const SuccessStoriesPage = () => {
  const { caseStudies, loading, error } = useCaseStudies();
  const [filteredStories, setFilteredStories] = useState<CaseStudy[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const propertyTypes = ['All', 'Manufactured Housing', 'RV Park', 'Self-Storage'];

  useEffect(() => {
    if (caseStudies) {
      if (selectedFilter === 'All') {
        setFilteredStories(caseStudies);
      } else {
        setFilteredStories(caseStudies.filter(story => story.propertyType === selectedFilter));
      }
    }
  }, [caseStudies, selectedFilter]);

  return (
    <>
      <SEOHead
        title="Success Stories | $1B+ in Closed Transactions | Specialty One"
        description="Explore our proven track record of success in alternative real estate investments. Over $1B in closed transactions across manufactured housing, RV parks, and self-storage facilities."
        keywords="success stories, case studies, commercial real estate transactions, manufactured housing sales, RV park deals, self storage investments, CRE brokerage results"
        url="https://specialtyone.com/success-stories"
        image="/assets/success-stories/hero-success-stories.webp"
      />
      
      <div className="min-h-screen bg-luxury-dark">
        {/* Hero Section */}
        <section className="relative pt-40 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-luxury-dark opacity-95"></div>
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-luxury text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-[0.9]">
                Real Deals. Real Results.
                <span className="block text-luxury-light">No Guesswork.</span>
              </h1>
              <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed max-w-3xl mx-auto">
                Over $1B in closed transactions across manufactured housing, RV parks, and self-storage facilities. 
                Here's how we consistently deliver exceptional outcomes for our clients.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Button 
                  to="/contact"
                  variant="primary"
                  size="lg"
                  className="text-lg px-8 py-4"
                >
                  Write Your Success Story
                </Button>                <Button 
                  to="/track-record"
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-obsidian"
                >
                  View Track Record
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="py-24 bg-white">
          <div className="container-custom">            <div className="text-center mb-16">
              <h2 className="heading-luxury text-4xl md:text-5xl font-bold mb-6 text-obsidian">
                Performance <span className="text-gradient">That Speaks</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our track record isn't built on marketing claims—it's built on delivered results.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-plum to-amethyst w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-obsidian mb-3">$1B+</div>
                <div className="text-gray-600 font-medium">Total Transaction Volume</div>
              </div>
              
              <div className="text-center group">
                <div className="bg-gradient-to-br from-sage to-emerald-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-obsidian mb-3">100%</div>
                <div className="text-gray-600 font-medium">Success on MHRV Exclusive Listings</div>
              </div>
              
              <div className="text-center group">
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-obsidian mb-3">500+</div>
                <div className="text-gray-600 font-medium">Properties Evaluated</div>
              </div>
              
              <div className="text-center group">
                <div className="bg-gradient-to-br from-rose-500 to-pink-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-obsidian mb-3">25+</div>
                <div className="text-gray-600 font-medium">PE-Backed Buyers in Network</div>
              </div>
            </div>
          </div>
        </section>        {/* Success Stories Grid */}
        <section 
          className="py-24" 
          style={{ 
            background: 'linear-gradient(180deg, #ffffff 0%, #f5e8d1 50%, #ffffff 100%)',
            backgroundSize: '100% 100%'
          }}
        >
          <div className="container-custom">
            <div className="text-center mb-12">              <h2 className="heading-luxury text-4xl md:text-5xl font-bold mb-6 text-obsidian">
                Featured <span className="text-gradient">Success Stories</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Real transactions. Real outcomes. Real client experiences.
              </p>
              
              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedFilter(type)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      selectedFilter === type
                        ? 'bg-gradient-to-r from-plum to-amethyst text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            
            {loading && (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-plum mx-auto mb-4"></div>
                <p className="text-gray-600">Loading success stories...</p>
              </div>
            )}
            
            {error && (
              <div className="text-center py-20">
                <p className="text-red-600 text-lg">Error loading success stories: {error}</p>
              </div>
            )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map((story: CaseStudy) => (
                <Card 
                  key={story.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-500 group border-0 bg-white"
                >
                  <div className="relative h-64 overflow-hidden">
                    <CloudinaryImage 
                      localPath={story.heroImage}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <Badge 
                        color="primary" 
                        variant="gradient"
                        className="text-white font-medium"
                      >
                        {story.propertyType}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 text-white/90 text-sm">
                        <MapPin size={14} />
                        <span>{story.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-8">
                    <h3 className="heading-luxury text-xl font-bold mb-4 text-obsidian group-hover:text-plum transition-colors">
                      {story.title}
                    </h3>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="text-gray-700 text-sm font-medium mb-1">Challenge:</p>
                        <p className="text-gray-600 text-sm">{story.challenge}</p>
                      </div>
                      <div>
                        <p className="text-gray-700 text-sm font-medium mb-1">Solution:</p>
                        <p className="text-gray-600 text-sm">{story.solution}</p>
                      </div>
                        <div className="space-y-2">
                        {(Array.isArray(story.results) ? story.results : [story.results]).slice(0, 2).map((result: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-sage font-bold text-sm">✓</span>
                            <span className="text-gray-600 text-sm">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <Building size={16} className="text-plum" />
                        <span className="text-gray-600 text-sm font-medium">{story.agent}</span>
                      </div>
                      
                      <Link 
                        to={`/success-stories/${story.slug}`}
                        className="inline-flex items-center gap-2 text-plum hover:text-amethyst font-medium text-sm group-hover:translate-x-1 transition-all duration-300"
                      >
                        Read Story
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredStories.length === 0 && !loading && !error && (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg">No success stories found for the selected filter.</p>
              </div>
            )}
          </div>
        </section>        {/* Social Share Section */}
        <section className="py-16 bg-cloud">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-obsidian mb-4">
                Share Our Success Stories
              </h3>
              <p className="text-gray-600 mb-8">
                Help others discover our proven expertise in alternative real estate investments.
              </p>
              <SocialShare 
                url="https://specialtyone.com/success-stories"
                title="$1B+ Success Stories in Alternative Real Estate | Specialty One"
                description="Explore proven success stories in manufactured housing, RV parks, and self-storage investments. Real deals, real results."
                variant="large"
                className="justify-center"
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-gradient-luxury-dark">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-luxury text-white text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Ready to Create Your 
                <span className="block text-luxury-light">Success Story?</span>
              </h2>
              <p className="text-xl mb-12 text-white/90 leading-relaxed max-w-3xl mx-auto">
                Join the clients who've experienced exceptional outcomes with our specialized expertise 
                in alternative real estate investments.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Button 
                  to="/contact"
                  variant="primary"
                  size="lg"
                  className="text-lg px-8 py-4"
                >
                  Start Your Journey
                </Button>                <Button 
                  to="/exclusive-sellers"
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-obsidian"
                >
                  Exclusive Seller Network
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SuccessStoriesPage;
