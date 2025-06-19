import { useMemo } from 'react';
import { useInsights } from '../../hooks/useInsights';
import { InsightCard } from './InsightCard';
import { ContentFilters } from '../../types/MarketReport';

interface InsightsByCategorySimpleProps {
  categoryId: number;
  maxCount?: number;
  className?: string;
}

export const InsightsByCategorySimple: React.FC<InsightsByCategorySimpleProps> = ({ 
  categoryId, 
  maxCount = 3,
  className = '' 
}) => {
  // Create simple filters with the category ID
  const filters: ContentFilters = useMemo(() => ({
    categoryId
  }), [categoryId]);
  
  const { insights, loading, error } = useInsights(filters);
  
  // Limit results if maxCount is specified
  const displayInsights = useMemo(() => {
    return maxCount ? insights.slice(0, maxCount) : insights;
  }, [insights, maxCount]);

  if (loading) {
    return (
      <div className={className}>
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
    return (
      <div className={`text-center ${className}`}>
        <div className="text-charcoal/60">
          No insights found for category ID {categoryId}.
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {displayInsights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>
    </div>
  );
};
