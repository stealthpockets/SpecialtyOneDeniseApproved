import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { PropertyTypeFilter } from '../components/ui/PropertyTypeFilter';
import { PropertyTypeBadge } from '../components/ui/PropertyTypeBadge';
import { useInsights } from '../hooks/useInsights';
import { usePropertyTypes } from '../hooks/usePropertyTypes';
import { useCategories } from '../hooks/useCategories';
import { ContentFilters } from '../types/MarketReport';
import { InsightsHeroSection } from '../components/insights/InsightsHeroSection';
import { FinalCTA } from '../components/home/FinalCTA';

const InsightsPage = () => {
  // Filter state
  const [selectedFilter, setSelectedFilter] = useState<ContentFilters>({});

  // Property types and categories
  const { propertyTypes } = usePropertyTypes();
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
    <div className="bg-sand min-h-screen">
      <InsightsHeroSection />
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-6 sr-only">Insights</h1>
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 items-center">
          <PropertyTypeFilter
            selectedFilter={selectedFilter}
            onFilterChange={handlePropertyTypeChange}
          />
          {/* Category Filter Dropdown */}
          <div>
            <label htmlFor="category" className="mr-2 font-medium">Theme:</label>
            <select
              id="category"
              value={selectedFilter.categoryId || ''}
              onChange={handleCategoryChange}
              className="border rounded px-2 py-1"
            >
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Insights List */}
        <div>
          {loading && <div>Loading...</div>}
          {error && <div className="text-red-600">Error loading insights: {error}</div>}
          {!loading && !error && (
            insights && insights.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {insights.map((insight) => (
                  <Card key={insight.id} className="flex flex-col h-full">
                    {insight.image_url && (
                      <img
                        src={insight.image_url}
                        alt={insight.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                        loading="lazy"
                      />
                    )}
                    <CardContent>
                      <div className="flex items-center gap-2 mb-2">
                        {insight.property_types && (
                          <PropertyTypeBadge propertyType={insight.property_types} />
                        )}
                        {insight.categories && (
                          <Badge color="secondary" variant="outline">
                            {insight.categories.name}
                          </Badge>
                        )}
                      </div>
                      <h2 className="text-lg font-semibold mb-1 leading-relaxed">
                        <Link to={`/insights/${insight.slug}`}>{insight.title}</Link>
                      </h2>
                      <p className="text-gray-700 mb-2 line-clamp-3">{insight.summary}</p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs text-gray-500">
                          {insight.published_at && new Date(insight.published_at).toLocaleDateString()}
                        </span>
                        <Button to={`/insights/${insight.slug}`} size="sm" variant="text">
                          Read More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p>No insights found.</p>
            )
          )}
        </div>
      </div>
      <FinalCTA />
    </div>
  );
};

export default InsightsPage;
