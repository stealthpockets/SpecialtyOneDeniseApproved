import { CaseStudy } from '../../types/caseStudy'
import { MarkdownRenderer } from '../ui/MarkdownRenderer'
import { MetricCard } from '../ui/MetricCard'
import { FloatingCTA } from '../FloatingCTA'

interface CaseStudyTemplateProps {
  caseStudy: CaseStudy
}

export function CaseStudyTemplate({ caseStudy }: CaseStudyTemplateProps) {
  // Parse testimonial if it's a string
  const testimonial = typeof caseStudy.testimonial === 'string' 
    ? JSON.parse(caseStudy.testimonial) 
    : caseStudy.testimonial

  // Parse results if it's a string
  const results = typeof caseStudy.results === 'string'
    ? JSON.parse(caseStudy.results)
    : caseStudy.results

  // Parse tags if it's a string
  const tags = typeof caseStudy.tags === 'string'
    ? JSON.parse(caseStudy.tags)
    : caseStudy.tags

  return (
    <div className="case-study-detail">
      {/* Optimized Hero Section - Reduced Height to Show Metrics Above Fold */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  {caseStudy.property_type}
                </span>
                {caseStudy.is_confidential && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                    Confidential
                  </span>
                )}
              </div>

              {/* Hook-Based Headline */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                {caseStudy.title}
              </h1>
              {caseStudy.subtitle && (
                <p className="text-lg text-gray-600 mb-6">{caseStudy.subtitle}</p>
              )}

              {/* Key Metrics Above Fold - Prominently Displayed */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {caseStudy.cap_rate && (
                  <MetricCard 
                    value={`${caseStudy.cap_rate}%`}
                    label="Cap Rate" 
                    variant="success" 
                  />
                )}
                {caseStudy.time_to_sale && (
                  <MetricCard 
                    value={caseStudy.time_to_sale}
                    label="Timeline" 
                    variant="success" 
                  />
                )}
                {caseStudy.site_count && (
                  <MetricCard 
                    value={caseStudy.site_count.toString()}
                    label="Sites" 
                    variant="unique" 
                  />
                )}
              </div>

              {/* Primary CTA */}
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Get Your Analysis
              </button>
            </div>

            {/* Smaller Hero Image - Reduced from full height */}
            <div className="relative">
              <img 
                src={caseStudy.hero_image} 
                alt={caseStudy.title}
                className="w-full h-48 lg:h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Elevated Testimonial Section - Moved Up and Made Prominent */}
      {testimonial && (
        <section className="bg-purple-600 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-white">
              <svg className="w-10 h-10 mx-auto mb-4 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
              </svg>
              <blockquote className="text-xl lg:text-2xl font-medium mb-4">
                "{testimonial.quote}"
              </blockquote>
              <div className="text-purple-200">
                — {testimonial.author}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Main Content */}
          <main className="lg:col-span-3">
            
            {/* Transaction Highlights - Visually Prioritized */}
            <section id="highlights" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Transaction Highlights</h2>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                {results && Array.isArray(results) && results.length > 0 && (
                  <div className="space-y-3">
                    {results.map((result: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{result}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Challenge Section with Enhanced Markdown */}
            {caseStudy.detailed_challenge && (
              <section id="challenge" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">The Challenge</h2>
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <MarkdownRenderer 
                    content={caseStudy.detailed_challenge}
                    className="prose-gray"
                  />
                </div>
              </section>
            )}
            
            {/* Strategic Approach Section - Enhanced for Scannability */}
            {caseStudy.approach && (
              <section id="approach" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Strategic Approach</h2>
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <MarkdownRenderer 
                    content={caseStudy.approach}
                    className="prose-gray"
                  />
                </div>
              </section>
            )}
            
            {/* Outcome Section */}
            {caseStudy.outcome && (
              <section id="outcome" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">The Outcome</h2>
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <MarkdownRenderer 
                    content={caseStudy.outcome}
                    className="prose-gray"
                  />
                </div>
              </section>
            )}
          </main>
          
          {/* Enhanced Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              
              {/* Property Details */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Property Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Location</span>
                    <div className="font-medium text-gray-900">{caseStudy.location}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Property Type</span>
                    <div className="font-medium text-gray-900">{caseStudy.property_type}</div>
                  </div>
                  {caseStudy.site_count && (
                    <div>
                      <span className="text-sm text-gray-500">Site Count</span>
                      <div className="font-medium text-gray-900">{caseStudy.site_count}</div>
                    </div>
                  )}
                  {caseStudy.square_footage && (
                    <div>
                      <span className="text-sm text-gray-500">Square Footage</span>
                      <div className="font-medium text-gray-900">{caseStudy.square_footage.toLocaleString()}</div>
                    </div>
                  )}
                  {caseStudy.sale_price && (
                    <div>
                      <span className="text-sm text-gray-500">Sale Price</span>
                      <div className="font-medium text-gray-900">{caseStudy.sale_price}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Trust Metrics - Added as per UX teardown */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Why Sellers Choose Us</h3>
                <div className="space-y-3">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">100%</div>
                    <div className="text-sm text-green-800">Success Rate</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">$300M+</div>
                    <div className="text-sm text-purple-800">CRE Transacted</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">72%</div>
                    <div className="text-sm text-blue-800">Off-Market</div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {tags && Array.isArray(tags) && tags.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag: string, index: number) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Agent */}
              {caseStudy.agent && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Agent</h3>
                  <div className="font-medium text-gray-900">{caseStudy.agent}</div>
                </div>
              )}

              {/* Secondary CTA */}
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                Start Your Transaction
              </button>
            </div>
          </aside>
        </div>
      </div>

      <FloatingCTA />
    </div>
  )
}