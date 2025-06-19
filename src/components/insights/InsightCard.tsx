import { Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { PropertyTypeBadge } from '../ui/PropertyTypeBadge';
import { Insight } from '../../types/MarketReport';

interface InsightCardProps {
  insight: Insight;
  className?: string;
}

export const InsightCard: React.FC<InsightCardProps> = ({ insight, className = '' }) => {
  return (
    <Card className={`group flex flex-col h-full bg-white/80 backdrop-blur-lg border border-white/40 hover:bg-white/90 hover:shadow-luxury transition-all duration-500 rounded-2xl overflow-hidden ${className}`}>
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
  );
};
