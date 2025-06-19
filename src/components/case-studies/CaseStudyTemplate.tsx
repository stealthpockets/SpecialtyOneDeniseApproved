import React from 'react';
import { CloudinaryImage } from '../ui/CloudinaryImage';
import { Badge } from '../ui/Badge';
import { MarkdownRenderer } from '../ui/MarkdownRenderer';
import { MetricCard } from '../ui/MetricCard';
import type { CaseStudy } from '../../types/caseStudy';
import '../../styles/markdown-content.css';

interface CaseStudyTemplateProps {
  caseStudy: CaseStudy;
}

// Property type styling configuration
export const getPropertyTypeStyles = (propertyType: string) => {
  const normalizedType = propertyType.toLowerCase().replace(/\s+/g, '-');
  
  const styleMap: Record<string, {
    gradient: string;
    badge: string;
    accent: string;
    icon: string;
  }> = {    'manufactured-housing': {
      gradient: 'from-dark-purple via-[#500F61] to-dark-purple',
      badge: 'bg-gradient-to-r from-dark-purple to-[#500F61] text-white',
      accent: 'border-dark-purple',
      icon: 'M3 21V9l9-6 9 6v12h-4v-7h-10v7H3z'
    },
    'rv-park': {
      gradient: 'from-sage via-evergreen to-sage',
      badge: 'bg-gradient-to-r from-sage to-evergreen text-white',
      accent: 'border-sage',
      icon: 'M4 6h16v2H4V6zm0 5h16v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6z'
    },
    'self-storage': {
      gradient: 'from-evergreen via-sage to-evergreen',
      badge: 'bg-gradient-to-r from-evergreen to-sage text-white',
      accent: 'border-evergreen',
      icon: 'M4 4h16v16H4V4zm2 2v12h12V6H6z'
    },
    'multi-asset': {
      gradient: 'from-sage to-evergreen',
      badge: 'bg-gradient-to-r from-sage to-evergreen text-white',
      accent: 'border-sage',
      icon: 'M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z'
    }
  };

  return styleMap[normalizedType] || styleMap['manufactured-housing'];
};

const ImpactListItem: React.FC<{ text: string }> = ({ text }) => {
  return (
    <li className="flex items-start gap-4 p-4 bg-white/50 rounded-lg border border-sand">
      <div className="flex-shrink-0 pt-1">
        <div className="w-8 h-8 bg-gradient-to-br from-sage to-evergreen rounded-full flex items-center justify-center text-white shadow-sm">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <p className="text-xl text-[#500F61] font-medium leading-relaxed">{text}</p>
    </li>
  );
};

const MetricHighlightCard: React.FC<{ value: string; label: string; }> = ({ value, label }) => {
  return (
    <div className="group bg-white p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-sage/10 text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-sage to-evergreen"></div>
      <div className="text-5xl font-bold text-evergreen mb-3 transition-transform group-hover:scale-110 duration-300">{value}</div>
      <div className="text-base font-semibold text-[#500F61]/70 uppercase tracking-wider">{label}</div>
    </div>
  );
};

const PropertyTypeBadge: React.FC<{ type: string; className?: string }> = ({ type, className = "" }) => {
  const styles = getPropertyTypeStyles(type);
  
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${styles.badge} ${className}`}>
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d={styles.icon} />
      </svg>
      {type}
    </div>
  );
};

export const CaseStudyTemplate: React.FC<CaseStudyTemplateProps> = ({ caseStudy }) => {
  const {
    title,
    subtitle,
    location,
    property_type,
    propertyType,
    hero_image,
    heroImage,
    results,
    introduction,
    detailed_challenge,
    detailedChallenge,
    approach,
    outcome,
    testimonial,
    agent,
    is_confidential,
    isConfidential,
    time_to_sale,
    timeToSale,
    cap_rate,
    capRate,
    site_count,
    siteCount
  } = caseStudy;

  // Use the most appropriate field (camelCase first, then snake_case fallback)
  const displayPropertyType = propertyType || property_type;
  const displayHeroImage = heroImage || hero_image;
  const displayIsConfidential = isConfidential || is_confidential;
  const displayTimeToSale = timeToSale || time_to_sale;
  const displayCapRate = capRate || cap_rate;
  const displaySiteCount = siteCount || site_count;
  const displayDetailedChallenge = detailedChallenge || detailed_challenge;

  // Parse results and testimonial if they're strings
  const parsedResults = typeof results === 'string' ? 
    (results.startsWith('[') ? JSON.parse(results) : [results]) : 
    (results || []);
    const parsedTestimonial = typeof testimonial === 'string' ? 
    (testimonial.startsWith('{') ? JSON.parse(testimonial) : { quote: testimonial, author: 'Anonymous' }) : 
    testimonial;

  const propertyStyles = getPropertyTypeStyles(displayPropertyType);
  return (
    <div className="min-h-screen bg-white">
      {/* Compact Hero Section */}
      <section className="bg-gradient-to-br from-sand to-cloud py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <PropertyTypeBadge type={displayPropertyType} />
                {displayIsConfidential && (
                  <Badge variant="destructive" size="sm">
                    Confidential
                  </Badge>
                )}
              </div>

              {/* Title & Subtitle */}
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-[#500F61] mb-4 leading-tight">
                {title}
              </h1>
                {subtitle && (
                <p className="text-2xl text-[#500F61]/70 mb-8">
                  {subtitle}
                </p>
              )}

              {/* Key Metrics Above Fold */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {displayCapRate && (
                  <MetricCard 
                    value={`${displayCapRate}%`}
                    label="Cap Rate" 
                    variant="success" 
                  />
                )}
                {displayTimeToSale && (
                  <MetricCard 
                    value={displayTimeToSale}
                    label="Timeline" 
                    variant="success" 
                  />
                )}
                {displaySiteCount && (
                  <MetricCard 
                    value={displaySiteCount.toString()}
                    label="Sites" 
                    variant="unique" 
                  />
                )}
              </div>              {/* Location and Agent */}
              <div className="flex flex-wrap items-center gap-4 text-[#500F61]/60 mb-8 text-lg">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {location}
                </span>
                <span>•</span>
                <span>{agent}</span>
              </div>

              {/* Primary CTA */}
              <button className="bg-[#500F61] hover:bg-[#400c4e] text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Get Your Analysis
              </button>
            </div>

            {/* Hero Image - Reduced Size */}
            <div className="relative">
              {displayHeroImage && (
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <CloudinaryImage
                    localPath={displayHeroImage}
                    alt={title}
                    className="w-full h-64 lg:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              )}
            </div>
          </div>
        </div>      </section>      {/* Elevated Testimonial */}
      {parsedTestimonial?.quote && (
        <div className="py-20 bg-gradient-to-br from-sand to-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-sage/3 rounded-full -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#500F61]/3 rounded-full translate-x-32 translate-y-32"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-white p-12 md:p-16 rounded-2xl shadow-lg border border-obsidian/10 relative">
                {/* Quote icon background */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-gradient-to-br from-sage to-evergreen rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M10 8c-3.3 0-6 2.7-6 6v10h10v-10h-6c0-2.2 1.8-4 4-4v-2zm16 0c-3.3 0-6 2.7-6 6v10h10v-10h-6c0-2.2 1.8-4 4-4v-2z" />
                    </svg>
                  </div>
                </div>
                
                <div className="text-2xl md:text-3xl text-[#500F61] font-medium leading-relaxed mb-8 italic">
                  <MarkdownRenderer content={parsedTestimonial.quote} />
                </div>
                
                <div className="w-16 h-1 bg-gradient-to-r from-sage to-evergreen mx-auto mb-6"></div>
                
                <div className="text-center">
                  <p className="text-lg font-bold text-sage mb-1">
                    {parsedTestimonial.author}
                  </p>
                  {parsedTestimonial.title && (
                    <p className="text-lg text-[#500F61]/70 font-medium mb-1">{parsedTestimonial.title}</p>
                  )}
                  {parsedTestimonial.company && (
                    <p className="text-lg text-[#500F61]/60">{parsedTestimonial.company}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transaction Highlights */}
      <div className="bg-gradient-to-br from-sand via-white to-sand py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#500F61] mb-6">
              Transaction Highlights
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-sage to-evergreen mx-auto mb-4"></div>
            <p className="text-lg text-[#500F61]/70 max-w-3xl mx-auto">
              Key metrics and outcomes that demonstrate our proven track record of success.
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {displaySiteCount && (
              <MetricHighlightCard value={displaySiteCount.toString()} label="Sites" />
            )}
            {displayCapRate && (
              <MetricHighlightCard value={`${displayCapRate}%`} label="Cap Rate" />
            )}
            {displayTimeToSale && (
              <MetricHighlightCard value={displayTimeToSale} label="Timeline" />
            )}
            <MetricHighlightCard value="100%" label="Client Success Rate" />
          </div>

          {/* Results List */}
          {parsedResults && parsedResults.length > 0 && (
            <div className="max-w-4xl mx-auto mt-16">
              <div className="py-8">
                <div className="w-1/2 mx-auto border-t border-obsidian/10"></div>
              </div>
              <h3 className="text-2xl font-bold text-[#500F61] mb-8 text-center">Key Outcomes</h3>
              <ul className="space-y-6">
                {parsedResults.map((result: string, index: number) => (
                  <ImpactListItem key={index} text={result} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Introduction */}
      {introduction && (
        <div className="py-16 bg-sand">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className={`bg-white p-10 rounded-2xl shadow-card border-l-4 ${propertyStyles.accent} relative`}>
                <div className="absolute top-4 right-4">
                  <div className={`w-8 h-8 bg-gradient-to-br ${propertyStyles.gradient} rounded-full flex items-center justify-center`}>
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-xl text-[#500F61] leading-relaxed italic font-medium">
                  <MarkdownRenderer content={introduction} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content with Sidebar Layout */}
      <div className="py-20 bg-gradient-to-br from-sand via-cloud to-sand">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <main className="lg:col-span-3 space-y-16">
              {/* Challenge Section */}
              {displayDetailedChallenge && (
                <section className="relative">
                  <h2 className="text-4xl font-bold text-[#500F61] mb-8">The Challenge</h2>
                  <div className="bg-white rounded-lg shadow-sm border p-10">
                    <MarkdownRenderer 
                      content={displayDetailedChallenge}
                      className="prose-gray text-lg markdown-content"
                    />
                  </div>
                </section>
              )}              {/* Approach Section */}
              {approach && (
                <section className="relative">
                  <h2 className="text-4xl font-bold text-[#500F61] mb-8">Our Strategic Approach</h2>
                  <div className="bg-white rounded-lg shadow-sm border p-10">
                    <MarkdownRenderer 
                      content={approach}
                      className="prose-gray text-lg markdown-content"
                    />
                  </div>
                </section>
              )}              {/* Results Section */}
              {outcome && (
                <section className="relative">
                  <h2 className="text-4xl font-bold text-[#500F61] mb-8">The Outcome</h2>
                  <div className="bg-white rounded-lg shadow-sm border p-10">
                    <MarkdownRenderer 
                      content={outcome}
                      className="prose-gray text-lg markdown-content"
                    />
                  </div>
                </section>
              )}
            </main>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Property Details */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="font-semibold text-[#500F61] mb-4 text-lg">Property Details</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-base text-gray-500">Location</span>
                      <div className="font-medium text-[#500F61] text-lg">{location}</div>
                    </div>
                    <div>
                      <span className="text-base text-gray-500">Property Type</span>
                      <div className="font-medium text-[#500F61] text-lg">{displayPropertyType}</div>
                    </div>
                    {displaySiteCount && (
                      <div>
                        <span className="text-base text-gray-500">Site Count</span>
                        <div className="font-medium text-[#500F61] text-lg">{displaySiteCount}</div>
                      </div>
                    )}
                    {displayCapRate && (
                      <div>
                        <span className="text-base text-gray-500">Cap Rate</span>
                        <div className="font-medium text-[#500F61] text-lg">{displayCapRate}%</div>
                      </div>
                    )}
                    {displayTimeToSale && (
                      <div>
                        <span className="text-base text-gray-500">Timeline</span>
                        <div className="font-medium text-[#500F61] text-lg">{displayTimeToSale}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Agent */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="font-semibold text-[#500F61] mb-4 text-lg">Agent</h3>
                  <div className="font-medium text-[#500F61] text-lg">{agent}</div>
                </div>

                {/* CTA */}
                <button className="w-full bg-[#500F61] hover:bg-[#400c4e] text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                  Get Your Strategy Call
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-luxury-dark text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let our specialized expertise drive superior results for your {displayPropertyType?.toLowerCase() || 'investment'} investment.
          </p>
          <button className="bg-white text-dark-purple px-8 py-3 rounded-lg font-semibold hover:bg-sand hover:text-obsidian transition-colors">
            Get Your Strategy Call
          </button>
        </div>
      </div>

    </div>
  );
};
