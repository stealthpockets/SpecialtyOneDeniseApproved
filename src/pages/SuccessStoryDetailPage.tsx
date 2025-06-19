import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CaseStudy } from '../types/caseStudy';
import { snakeToCamel, parseJsonFields } from '../utils/dataTransformers';
import { SEOHead } from '../components/ui/SEOHead';
import { CloudinaryImage } from '../components/ui/CloudinaryImage';
import { SocialShare } from '../components/ui/SocialShare';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { MoreSuccessStories } from '../components/case-studies/MoreSuccessStories';

const SuccessStoryDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [story, setStory] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStory = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from('case_studies')
          .select('*')
          .eq('slug', slug)
          .single();

        if (supabaseError) {
          throw new Error('Failed to fetch success story from the database.');
        }

        if (data) {
          const parsedItem = parseJsonFields(data, ['results', 'testimonial', 'additional_images', 'tags']);
          const camelCaseItem = snakeToCamel(parsedItem) as CaseStudy;
          setStory(camelCaseItem);
        } else {
          setError("The success story you're looking for doesn't exist.");
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
        console.error('Error fetching success story:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-luxury-dark">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-plum"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white text-center px-4">
        <h1 className="text-4xl font-bold text-obsidian mb-4">Success Story Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">{error}</p>
        <Button to="/success-stories" variant="primary">
          View All Success Stories
        </Button>
      </div>
    );
  }

  if (!story) {
    return null;
  }

  const pageUrl = `https://specialtyone.com/success-stories/${story.slug}`;
  const pageTitle = `${story.title} | Specialty One Success Story`;

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={story.metaDescription || story.challenge}
        keywords={story.tags ? (Array.isArray(story.tags) ? story.tags.join(', ') : story.tags) : ''}
        url={pageUrl}
        image={story.heroImage}
      />
      <div className="bg-white text-obsidian">
        <article>
          {/* Header */}
          <header className="relative bg-luxury-dark text-white py-20 sm:py-32">
            <div className="absolute inset-0">
              <CloudinaryImage
                localPath={story.heroImage}
                alt={`Hero image for ${story.title}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="container-custom relative z-10 text-center">
              <h1 className="heading-luxury text-4xl md:text-6xl font-bold mb-4">{story.title}</h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">{story.subtitle}</p>
            </div>
          </header>

          {/* Main Content */}
          <div className="container-custom py-16 lg:py-24">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <div className="mb-8">
                <Button to="/success-stories" variant="outline" className="group">
                  <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                  Back to Success Stories
                </Button>
              </div>

              {/* Story Body */}
              <div className="prose lg:prose-xl max-w-none">
                {story.introduction && <p className="lead">{story.introduction}</p>}
                
                <h2>The Challenge</h2>
                <p>{story.detailedChallenge || story.challenge}</p>
                
                <h2>Our Approach</h2>
                <p>{story.approach}</p>
                
                <h2>The Outcome</h2>
                <p>{story.outcome}</p>

                <h3>Key Results:</h3>
                <ul>
                  {Array.isArray(story.results) && story.results.map((result, index) => (
                    <li key={index}>{result}</li>
                  ))}
                </ul>
              </div>

              {/* Testimonial */}
              {story.testimonial && typeof story.testimonial === 'object' && (
                <aside className="my-12 p-8 bg-gradient-to-r from-plum to-amethyst text-white rounded-lg shadow-lg">
                  <blockquote className="text-2xl font-semibold italic mb-4">
                    "{story.testimonial.quote}"
                  </blockquote>
                  <footer className="text-right">
                    <p className="font-bold text-lg">{story.testimonial.author}</p>
                    {story.testimonial.title && <p className="text-sm">{story.testimonial.title}, {story.testimonial.company}</p>}
                  </footer>
                </aside>
              )}

              {/* Additional Images */}
              {story.additionalImages && story.additionalImages.length > 0 && (
                <div className="my-12">
                  <h2 className="text-3xl font-bold text-center mb-8">Property Gallery</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {story.additionalImages.map((image, index) => (
                      <CloudinaryImage
                        key={index}
                        localPath={image}
                        alt={`${story.title} gallery image ${index + 1}`}
                        className="rounded-lg shadow-md w-full h-full object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Social Share */}
              <div className="my-12 text-center">
                <h3 className="text-2xl font-bold mb-4">Share This Success Story</h3>
                <SocialShare
                  url={pageUrl}
                  title={pageTitle}
                  description={story.metaDescription || story.challenge}
                  variant="large"
                  className="justify-center"
                />
              </div>
            </div>
          </div>
        </article>
        
        <MoreSuccessStories currentId={story.id} propertyType={story.propertyType || story.property_type || ''} />
      </div>
    </>
  );
};

export default SuccessStoryDetailPage;
