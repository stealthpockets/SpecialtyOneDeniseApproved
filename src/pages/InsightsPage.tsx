import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { PropertyTypeFilter } from '../components/ui/PropertyTypeFilter';
import { PropertyTypeBadge } from '../components/ui/PropertyTypeBadge';
import { useInsights } from '../hooks/useInsights';
import { useCategories } from '../hooks/useCategories';
import { ContentFilters } from '../types/MarketReport';
import { InsightsHeroSection } from '../components/insights/InsightsHeroSection';
import { FinalCTA } from '../components/home/FinalCTA';
import { SEOHead } from '../components/ui/SEOHead';

const InsightsPage = () => {
  // Filter state
  const [selectedFilter, setSelectedFilter] = useState<ContentFilters>({});

  // Property types and categories
  const { categories } = useCategories();

  // Build filters object for the hook
  const filters: ContentFilters = useMemo(() => {
    return {
      propertyTypeId: selectedFilter.propertyTypeId,
      categoryId: selectedFilter.categoryId,
    };
  }, [selectedFilter]);

  // Fetch insights
  const { insights, loading, error } = useInsights(filters);

  // Handlers
  const handlePropertyTypeChange = (filters: ContentFilters) => {
    setSelectedFilter((prev) => ({ ...prev, propertyTypeId: filters.propertyTypeId }));
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value ? Number(e.target.value) : undefined;
    setSelectedFilter((prev) => ({ ...prev, categoryId }));
  };

  return (
    <>
      <SEOHead
        title="Commercial Real Estate Insights | Market Analysis & Trends"
        description="Expert insights on manufactured housing, RV parks, and self-storage markets. Get the latest CRE market analysis, trends, and investment intelligence from Specialty One."
        keywords="commercial real estate insights, CRE market analysis, manufactured housing trends, RV park market, self storage insights, investment analysis, market reports"
        url="https://specialtyone.com/insights"
      />
      <div className="bg-gradient-to-br from-sand via-cloud to-sand min-h-screen">
      <InsightsHeroSection />
      <div className="container-custom py-24">
        <h1 className="text-3xl font-bold mb-6 sr-only">Insights</h1>
        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 mb-16 shadow-luxury border border-white/30">
          <div className="flex flex-wrap gap-6 items-center">
            <PropertyTypeFilter
              selectedFilter={selectedFilter}
              onFilterChange={handlePropertyTypeChange}
            />
            {/* Category Filter Dropdown */}
            <div>
              <label htmlFor="category" className="mr-3 font-semibold text-charcoal">Theme:</label>
              <select
                id="category"
                value={selectedFilter.categoryId || ''}
                onChange={handleCategoryChange}
                className="bg-white/90 border border-white/40 rounded-xl px-4 py-3 text-charcoal backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-plum/30 focus:border-plum/50 transition-all duration-300 font-medium"
              >
                <option value="">All</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="text-charcoal">{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* Insights List */}
        <div>
          {loading && <div className="text-charcoal/60 text-center text-lg">Loading...</div>}
          {error && <div className="text-red-500 text-center text-lg">Error loading insights: {error}</div>}
          {!loading && !error && (
            insights && insights.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {insights.map((insight) => (
                  <Card key={insight.id} className="group flex flex-col h-full bg-white/80 backdrop-blur-lg border border-white/40 hover:bg-white/90 hover:shadow-luxury transition-all duration-500 rounded-2xl overflow-hidden">
                    {insight.image_url && (
                      <img
                        src={insight.image_url}
                        alt={insight.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                    <CardContent className="p-8 flex-grow flex flex-col">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge color="secondary" variant="outline" className="border-plum/40 text-plum bg-white/60 backdrop-blur-sm">
                          {insight.categories?.name || 'Insight'}
                        </Badge>
                        {insight.property_types && (
                          <PropertyTypeBadge propertyType={insight.property_types} />
                        )}
                      </div>
                      <h2 className="text-xl font-display font-bold mb-3 leading-tight text-charcoal group-hover:text-plum transition-colors">
                        <Link to={`/insights/${insight.slug}`}>{insight.title}</Link>
                      </h2>
                      <p className="text-charcoal/70 mb-4 line-clamp-3 leading-relaxed flex-grow font-medium">{insight.summary}</p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-charcoal/10">
                        <span className="text-sm text-charcoal/60 font-medium">
                          {insight.published_at && new Date(insight.published_at).toLocaleDateString()}
                        </span>
                        <Button to={`/insights/${insight.slug}`} size="sm" variant="text" className="text-plum hover:text-amethyst font-semibold">
                          Read More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-charcoal/60 text-center text-lg">No insights found.</p>
            )
          )}
        </div>
      </div>
      <FinalCTA />
      </div>
    </>
  );
};

export default InsightsPage;
