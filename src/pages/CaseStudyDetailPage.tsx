import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Building, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Testimonials } from '../components/home/Testimonials';
import { useCaseStudy } from '../hooks/useCaseStudies';

const relatedCaseStudies = [
  {
    title: 'Desert Trails RV Park',
    location: 'Tucson, AZ',
    propertyType: 'RV Park',
    image: '/dist/assets/success-stories/desert-trails.webp',
    slug: 'desert-trails-rv-park'
  },
  {
    title: 'The Palms',
    location: 'Apache Junction, AZ',
    propertyType: 'Manufactured Housing',
    image: '/dist/assets/success-stories/the-palms.webp',
    slug: 'the-palms'
  },
  {
    title: 'American Self Storage',
    location: 'Chandler, AZ',
    propertyType: 'Self-Storage',
    image: '/dist/assets/success-stories/american-ss-mail.webp',
    slug: 'american-self-storage'
  }
];

const CaseStudyDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { caseStudy, loading } = useCaseStudy(slug || '');

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-sand">
        <div className="pt-32 pb-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-plum"></div>
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="flex flex-col min-h-screen bg-sand">
        <section className="pt-32 pb-20 bg-white">
          <div className="container-custom text-center">
            <h1 className="font-display text-4xl font-bold mb-4">Case Study Not Found</h1>
            <p className="text-lg text-gray-600 mb-8">The case study you're looking for doesn't exist.</p>
            <Button to="/success-stories" variant="primary">
              View All Success Stories
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-sand">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 z-0">
          <img 
            src={caseStudy.heroImage}
            alt={caseStudy.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian/80 to-obsidian/40"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Link 
                to="/success-stories" 
                className="inline-flex items-center text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Success Stories
              </Link>
            </div>

            {/* Property Type Badge */}
            <Badge color="primary" variant="gradient" className="mb-4">
              {caseStudy.propertyType}
            </Badge>

            {/* Title and Subtitle */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {caseStudy.title}
            </h1>
            
            {caseStudy.subtitle && (
              <p className="text-xl md:text-2xl text-white/90 mb-6">
                {caseStudy.subtitle}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <MapPin size={20} />
                <span>{caseStudy.location}</span>
              </div>
              
              {caseStudy.siteCount && (
                <div className="flex items-center gap-2">
                  <Building size={20} />
                  <span>{caseStudy.siteCount} Sites</span>
                </div>
              )}
              
              {caseStudy.timeToSale && (
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  <span>{caseStudy.timeToSale} to Close</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Building size={20} />
                <span>{caseStudy.agent}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Results */}
      <section className="py-16 bg-sand">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-bold mb-8 text-center">
              Key Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseStudy.results.map((result, index) => (
                <Card key={index} className="text-center py-6">
                  <CardContent>
                    <CheckCircle size={32} className="text-sage mx-auto mb-4" />
                    <p className="font-medium">{result}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Story */}
      <section className="py-16 bg-sand">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {caseStudy.introduction && (
              <div className="mb-12">
                <h2 className="font-display text-3xl font-bold mb-6">The Story</h2>
                <p className="text-lg leading-relaxed">{caseStudy.introduction}</p>
              </div>
            )}

            {caseStudy.detailedChallenge && (
              <div className="mb-12">
                <h3 className="font-display text-2xl font-bold mb-4">The Challenge</h3>
                <p className="text-lg leading-relaxed">{caseStudy.detailedChallenge}</p>
              </div>
            )}

            {caseStudy.approach && (
              <div className="mb-12">
                <h3 className="font-display text-2xl font-bold mb-4">Our Approach</h3>
                <p className="text-lg leading-relaxed">{caseStudy.approach}</p>
              </div>
            )}

            {caseStudy.testimonial && (
              <div className="mb-12">
                <Card className="bg-white border-l-4 border-plum">
                  <CardContent className="p-8">
                    <div className="text-5xl text-plum opacity-20 mb-4">"</div>
                    <blockquote className="text-xl font-medium mb-6 italic">
                      {caseStudy.testimonial.quote}
                    </blockquote>
                    <div>
                      <p className="font-bold text-lg">
                        — {caseStudy.testimonial.author}
                      </p>
                      {caseStudy.testimonial.title && caseStudy.testimonial.company && (
                        <p className="text-gray-600">
                          {caseStudy.testimonial.title}, {caseStudy.testimonial.company}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {caseStudy.outcome && (
              <div className="mb-12">
                <h3 className="font-display text-2xl font-bold mb-4">The Outcome</h3>
                <p className="text-lg leading-relaxed">{caseStudy.outcome}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      <section className="py-16 bg-sand">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            Related Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedCaseStudies.map((study, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge color="primary" variant="gradient">
                      {study.propertyType}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPin size={16} />
                    <span>{study.location}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold mb-4">
                    {study.title}
                  </h3>
                  <Button 
                    to={`/success/${study.slug}`}
                    variant="outline"
                    className="w-full"
                  >
                    Read Case Study
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Testimonials Component */}
      <Testimonials />

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
    </div>
  );
};

export default CaseStudyDetailPage;
