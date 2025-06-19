import { useEffect, useState } from 'react';
import { useInsights } from '../../hooks/useInsights';
import { useCategories } from '../../hooks/useCategories';
import { InsightCard } from './InsightCard';
import { ContentFilters } from '../../types/MarketReport';

interface InsightsByCategoryProps {
  categoryName: string;
  maxCount?: number;
  className?: string;
}

export const InsightsByCategory: React.FC<InsightsByCategoryProps> = ({ 
  categoryName, 
  maxCount = 3,
  className = '' 
}) => {
  const { categories, loading: categoriesLoading, getCategoryId } = useCategories();
  const [categoryId, setCategoryId] = useState<string | null>(null);
  
  // Debug: Log available categories when they load
  useEffect(() => {
    if (categories.length > 0) {
      const foundCategory = categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
      if (foundCategory) {
        setCategoryId(foundCategory.id);
      } 
    }
  }, [categoryName, categories]);

  const { insights, loading, error } = useInsights({ categoryId });
  
  // Limit results if maxCount is specified
  const displayInsights = maxCount ? insights.slice(0, maxCount) : insights;

  // Only show loading if categories are still loading
  const isLoading = categoriesLoading;
  
  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(maxCount)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-white/60 rounded-2xl h-80 border border-white/40">
                <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center ${className}`}>
        <div className="text-red-500">Error loading insights: {error}</div>
      </div>
    );
  }
  if (!isLoading && (!displayInsights || displayInsights.length === 0)) {
    return (
      <div className={`text-center ${className}`}>
        <div className="text-charcoal/60">
          No insights found for "{categoryName}".
          <br />
          <strong>Available categories:</strong> {categories.map(c => c.name).join(', ')}
          <br />
          <small className="text-xs text-gray-500">
            Categories data: {JSON.stringify(categories.map(c => ({ id: c.id, name: c.name })), null, 2)}
          </small>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayInsights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </div>
  );
};
