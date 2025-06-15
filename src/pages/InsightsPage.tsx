import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter, SortDesc, Crown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import SlideUpBanner from '../components/ui/SlideUpBanner';
import { useInsights } from '../hooks/useInsights';
import { ContentFilters } from '../types/MarketReport';

const propertyTypes = [
  "Manufactured Housing",
  "RV Parks",
  "RV Storage",
  "Self-Storage"
];

const investmentThemes = [
  "Cap Rates",
  "Operating Efficiency",
  "Exit Strategy",
  "Due Diligence",
  "Legislative Updates"
];

const formats = [
  "Insight",
  "Guide",
  "Checklist",
  "Horror Story",
  "Legislative Alert"
];

const InsightsPage = () => {
  const [selectedPropertyType, setSelectedPropertyType] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("editor");
  
  // Build filters object for the hook
  const filters: ContentFilters = {
    // TODO: Map property type names to IDs when property_types table is populated
    // For now, filtering will work once the backend property_types are populated
  };
  
  const { insights, loading, error } = useInsights(filters);

  return (
    <div className="flex flex-col min-h-screen bg-sand">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-sand">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Investor Intelligence for MHC, RV, and Self-Storage Operators
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Protect your downside. Unlock NOI. Stay 3 steps ahead.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <p className="text-lg">
                Every post is written by operators, investors, or experts who live in the assets they write about. 
                No fluff. No filler. Just results.
              </p>
            </div>
            <Button 
              to="/newsletter"
              variant="primary"
              size="lg"
            >
              Subscribe for Insights
            </Button>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 bg-cloud sticky top-20 z-30 border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Property Type Filter */}
              <div className="relative">
                <select 
                  className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 text-gray-700 cursor-pointer hover:border-plum focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                  value={selectedPropertyType || ""}
                  onChange={(e) => setSelectedPropertyType(e.target.value || null)}
                >
                  <option value="">Property Type</option>
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>

              {/* Theme Filter */}
              <div className="relative">
                <select 
                  className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 text-gray-700 cursor-pointer hover:border-plum focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                  value={selectedTheme || ""}
                  onChange={(e) => setSelectedTheme(e.target.value || null)}
                >
                  <option value="">Theme</option>
                  {investmentThemes.map(theme => (
                    <option key={theme} value={theme}>{theme}</option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>

              {/* Format Filter */}
              <div className="relative">
                <select 
                  className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 text-gray-700 cursor-pointer hover:border-plum focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                  value={selectedFormat || ""}
                  onChange={(e) => setSelectedFormat(e.target.value || null)}
                >
                  <option value="">Format</option>
                  {formats.map(format => (
                    <option key={format} value={format}>{format}</option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Sort */}
            <div className="relative">
              <select 
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 text-gray-700 cursor-pointer hover:border-plum focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="editor">Editor's Picks</option>
                <option value="views">Most Viewed</option>
                <option value="recent">Most Recent</option>
              </select>
              <SortDesc className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Carousel */}
      <section className="py-16 bg-sand">
        <div className="container-custom">
          {loading && (
            <div className="text-center py-12">
              <p className="text-lg">Loading insights...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-12">
              <p className="text-lg text-red-600">Error loading insights: {error}</p>
            </div>
          )}
          
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {insights.map((insight, index) => (
                <Link 
                  key={insight.id} 
                  to={`/insights/${insight.slug}`}
                  className="block animate-fade-in"
                  style={{ animationDelay: `${0.2 * index}s` }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <img 
                        src={insight.image_url || '/assets/property-types/manufactured-housing-community-investment.webp'}
                        alt={insight.title}
                        className="w-full h-full object-cover"
                      />
                      {index === 0 && (
                        <div className="absolute top-4 right-4">
                          <Badge color="primary" variant="gradient">
                            🔥 Editor's Pick
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex gap-2 mb-3">
                        {insight.is_premium && (
                          <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0">
                            <Crown className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                        <Badge color="secondary" variant="outline">
                          Insight
                        </Badge>
                        {insight.property_types && (
                          <Badge color="primary" variant="outline">
                            {insight.property_types.name}
                          </Badge>
                        )}
                        {insight.views > 0 && (
                          <Badge color="secondary" variant="outline">
                            {insight.views} views
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-display text-xl font-bold mb-3">
                        {insight.title}
                      </h3>
                      <div className="text-gray-600 mb-4 prose prose-sm max-w-none">
                        <ReactMarkdown>{insight.summary?.replace(/\\n/g, '\n') || ''}</ReactMarkdown>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm lg:text-base text-gray-500">
                          By {insight.authors?.name || 'Unknown Author'} • {insight.reading_time || 5} min read
                        </div>
                        <div className="px-4 py-2 border border-plum text-plum rounded-lg text-sm font-medium">
                          {insight.is_premium ? 'Preview' : 'Read Article'}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lead Magnet */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Want deal flow before it hits the market?
            </h2>
            <p className="text-xl mb-8">
              Download rent comps, NOI calculators, and due diligence checklists.
            </p>
            <Button 
              to="/tools"
              variant="primary"
              size="lg"
              icon={<ArrowRight size={20} />}
              iconPosition="right"
            >
              Get the Tools
            </Button>
          </div>
        </div>
      </section>

      {/* Success Story Tie-In */}
      <section className="py-16 bg-sand">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <h3 className="font-display text-2xl font-bold mb-4">
                  See How Theory Becomes Reality
                </h3>
                <p className="text-lg mb-6">
                  How we used this rent strategy to secure full price at Desert Trails →
                </p>
                <Button 
                  to="/success/desert-trails"
                  variant="primary"
                  icon={<ArrowRight size={20} />}
                  iconPosition="right"
                >
                  View Success Story
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <SlideUpBanner typeformId="FORM_ID_HERE" utmSource="insights_page" utmCampaign="market_intelligence_cta" />
    </div>
  );
};

export default InsightsPage;
