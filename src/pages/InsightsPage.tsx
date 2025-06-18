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
    <div className="bg-luxury-dark min-h-screen">
      <InsightsHeroSection />
      <div className="container-custom py-24">
        <h1 className="text-3xl font-bold mb-6 sr-only">Insights</h1>
        {/* Filters */}
        <div className="flex flex-wrap gap-6 mb-12 items-center">
          <PropertyTypeFilter
            selectedFilter={selectedFilter}
            onFilterChange={handlePropertyTypeChange}
          />
          {/* Category Filter Dropdown */}
          <div>
            <label htmlFor="category" className="mr-3 font-medium text-white">Theme:</label>
            <select
              id="category"
              value={selectedFilter.categoryId || ''}
              onChange={handleCategoryChange}
              className="bg-white/10 border border-white/30 rounded-xl px-4 py-2 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-luxury-accent"
            >
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="text-luxury-dark">{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Insights List */}
        <div>
          {loading && <div className="text-white/60">Loading...</div>}
          {error && <div className="text-red-400">Error loading insights: {error}</div>}
          {!loading && !error && (
            insights && insights.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {insights.map((insight) => (
                  <Card key={insight.id} className="flex flex-col h-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                    {insight.image_url && (
                      <img
                        src={insight.image_url}
                        alt={insight.title}
                        className="w-full h-48 object-cover rounded-t-2xl"
                        loading="lazy"
                      />
                    )}
                    <CardContent className="p-8 flex-grow flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        {insight.property_types && (
                          <PropertyTypeBadge propertyType={insight.property_types} />
                        )}
                        {insight.categories && (
                          <Badge color="secondary" variant="outline" className="border-white/40 text-white">
                            {insight.categories.name}
                          </Badge>
                        )}
                      </div>
                      <h2 className="text-xl font-bold mb-3 leading-tight text-white hover:text-luxury-accent transition-colors">
                        <Link to={`/insights/${insight.slug}`}>{insight.title}</Link>
                      </h2>
                      <p className="text-white/80 mb-4 line-clamp-3 leading-relaxed flex-grow">{insight.summary}</p>
                      <div className="flex items-center justify-between mt-auto pt-4">
                        <span className="text-sm text-white/60">
                          {insight.published_at && new Date(insight.published_at).toLocaleDateString()}
                        </span>
                        <Button to={`/insights/${insight.slug}`} size="sm" variant="text" className="text-luxury-accent hover:text-luxury-light">
                          Read More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-white/60 text-center text-lg">No insights found.</p>
            )
          )}
        </div>
      </div>
      <FinalCTA />
    </div>
  );
};

export default InsightsPage;
