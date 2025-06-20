import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SEOHead } from '../components/ui/SEOHead';
import { CloudinaryImage } from '../components/ui/CloudinaryImage';
import { CaseStudyTemplate } from '../components/case-studies/CaseStudyTemplate';
import { useCaseStudy, useCaseStudies } from '../hooks/useCaseStudies';
import { transformCaseStudy } from '../utils/dataTransformers';
import { LegalDisclaimer } from '../components/ui/LegalDisclaimer';

const CaseStudyDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { caseStudy, loading } = useCaseStudy(slug || '');
  const { caseStudies } = useCaseStudies();

  // Get related case studies (exclude current one)
  const relatedStories = caseStudies
    ?.filter(story => story.slug !== slug)
    ?.slice(0, 3) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-plum mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading success story...</p>
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <>
        <SEOHead
          title="Success Story Not Found | Specialty One Investment Brokerage"
          description="The success story you're looking for doesn't exist. Explore our other case studies."
          url="https://specialtyone.com/success-stories"
        />
        <div className="min-h-screen bg-sand flex items-center justify-center">
          <div className="text-center max-w-lg mx-auto px-4">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Success Story Not Found</h1>
            <p className="text-base text-gray-600 mb-8">The success story you're looking for doesn't exist.</p>
            <Button to="/success-stories" variant="primary">
              View All Success Stories
            </Button>
          </div>
        </div>
      </>
    );
  }

  // Transform case study data to ensure compatibility
  const transformedCaseStudy = transformCaseStudy(caseStudy);

  return (
    <>
      <SEOHead
        title={`${caseStudy.title} Success Story | Specialty One Investment Brokerage`}
        description={caseStudy.metaDescription || caseStudy.meta_description || `${caseStudy.title} - A detailed success story from Specialty One's track record in ${caseStudy.propertyType || caseStudy.property_type} investments.`}
        keywords={`${(caseStudy.propertyType || caseStudy.property_type)?.toLowerCase()} success story, commercial real estate ${caseStudy.location}, CRE brokerage success, specialty property transaction, ${caseStudy.title}`}
        url={`https://specialtyone.com/success-stories/${slug}`}
        image={caseStudy.heroImage || caseStudy.hero_image}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-sand border-b border-sage/20 pt-8">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Link 
              to="/success-stories" 
              className="flex items-center gap-2 text-dark-purple hover:text-plum transition-colors font-medium"
            >
              <ArrowLeft size={16} />
              Back to Success Stories
            </Link>
            
            {/* Tags */}
            {transformedCaseStudy.tags && transformedCaseStudy.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(transformedCaseStudy.tags) ? transformedCaseStudy.tags : 
                  typeof transformedCaseStudy.tags === 'string' ? 
                    (transformedCaseStudy.tags.startsWith('[') ? JSON.parse(transformedCaseStudy.tags) : [transformedCaseStudy.tags]) : 
                    []
                ).map((tag: string, index: number) => (
                  <span 
                    key={index} 
                    className="bg-white border border-sage/30 text-sage px-3 py-1.5 rounded-full text-sm font-medium shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Case Study Content */}
      <CaseStudyTemplate caseStudy={transformedCaseStudy} />

      {/* Related Success Stories */}
      {relatedStories.length > 0 && (
        <section className="py-16 bg-sand">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-obsidian mb-4">More Success Stories</h2>
              <p className="text-base text-obsidian/70">Discover how we've helped other clients achieve their investment goals</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedStories.map((story) => (
                <Link
                  key={story.id}
                  to={`/success-stories/${story.slug}`}
                  className="group bg-white rounded-xl shadow-card border border-sage/20 overflow-hidden hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <CloudinaryImage
                      localPath={story.heroImage || story.hero_image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/90 backdrop-blur-sm text-sage px-2 py-1 rounded-full text-xs font-semibold">
                        {story.propertyType || story.property_type}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-obsidian mb-2 group-hover:text-plum transition-colors line-clamp-2">
                      {story.title}
                    </h3>
                    {story.subtitle && (
                      <p className="text-sm text-obsidian/70 mb-3 line-clamp-2">{story.subtitle}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-obsidian/60">
                      <span>{story.location}</span>
                      <span>•</span>
                      <span>{story.agent}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button to="/success-stories" variant="primary">
                View All Success Stories
              </Button>
            </div>
          </div>
        </section>
      )}
      <LegalDisclaimer />
    </>
  );
};

export default CaseStudyDetailPage;
