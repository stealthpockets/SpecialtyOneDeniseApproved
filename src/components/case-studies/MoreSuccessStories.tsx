import React from 'react';
import { useCaseStudies } from '../../hooks/useCaseStudies';
import { CaseStudy } from '../../types/caseStudy';
import { Button } from '../ui/Button';
import { CloudinaryImage } from '../ui/CloudinaryImage';
import { Badge } from '../ui/Badge';

interface MoreSuccessStoriesProps {
  currentId: string;
  propertyType: string;
}

export const MoreSuccessStories: React.FC<MoreSuccessStoriesProps> = ({ currentId, propertyType }) => {
  const { caseStudies, loading, error } = useCaseStudies();

  const relatedStories = caseStudies
    .filter(cs => cs.id !== currentId && (cs.propertyType === propertyType || cs.property_type === propertyType))
    .slice(0, 3);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading stories.</div>;
  if (relatedStories.length === 0) return null;

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-obsidian mb-4">More Success Stories</h2>
          <p className="text-lg text-obsidian/70 max-w-2xl mx-auto">
            Discover how we've helped other clients achieve their investment goals in the {propertyType} space.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedStories.map((story: CaseStudy) => (
            <div key={story.id} className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 border border-sand overflow-hidden group">
              <a href={`/success-stories/${story.slug}`} className="block">
                <div className="relative h-48 overflow-hidden">
                  <CloudinaryImage
                    localPath={story.heroImage || story.hero_image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                <div className="p-6">
                  <Badge className="mb-4">{story.propertyType || story.property_type}</Badge>
                  <h3 className="font-bold text-xl text-obsidian mb-2 leading-tight group-hover:text-sage transition-colors">{story.title}</h3>
                  <p className="text-sm text-obsidian/60">{story.location}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button to="/success-stories" variant="outline" size="lg">
            View All Success Stories
          </Button>
        </div>
      </div>
    </div>
  );
};
