import { useMemo } from 'react';
import { useInsights } from '../../hooks/useInsights';
import { useCategories } from '../../hooks/useCategories';
import { InsightCard } from './InsightCard';
import { ContentFilters } from '../../types/MarketReport';

interface InsightsByCategoryProps {
  categoryName?: string;
  categoryId?: number;
  maxCount?: number;
  className?: string;
}

export const InsightsByCategory: React.FC<InsightsByCategoryProps> = ({ 
  categoryName, 
  categoryId,
  maxCount = 3,
  className = '' 
}) => {
  const { categories, loading: categoriesLoading, getCategoryId } = useCategories();
  
  const filters: ContentFilters = useMemo(() => {
    // If categoryId is provided directly, use it
    if (categoryId) {
      return { categoryId };
    }
    
    // Otherwise, try to get categoryId from categoryName
    if (categoryName && !categoriesLoading && categories.length) {
      const foundCategoryId = getCategoryId(categoryName);
      return foundCategoryId ? { categoryId: foundCategoryId } : {};
    }
    
    return {};
  }, [categoryId, categoryName, categoriesLoading, categories, getCategoryId]);
  
  const { insights, loading: insightsLoading, error } = useInsights(filters);
    // Limit results if maxCount is specified
  const displayInsights = useMemo(() => {
    return maxCount ? insights.slice(0, maxCount) : insights;
  }, [insights, maxCount]);
  
  // Only wait for categories to load if we need to resolve a categoryName
  const isLoading = (categoryName && !categoryId ? categoriesLoading : false) || insightsLoading;

  if (isLoading) {
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
  if (!displayInsights || displayInsights.length === 0) {
    const displayName = categoryName || `category ID ${categoryId}`;
    return (
      <div className={`text-center ${className}`}>
        <div className="text-charcoal/60">No insights found for "{displayName}".</div>
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
