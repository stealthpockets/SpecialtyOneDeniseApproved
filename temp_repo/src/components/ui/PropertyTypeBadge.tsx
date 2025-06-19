import React from 'react';
import { Badge } from './Badge';
import { PropertyType } from '../../types/MarketReport';

interface PropertyTypeBadgeProps {
  propertyType: PropertyType | null | undefined;
  className?: string;
}

export const PropertyTypeBadge: React.FC<PropertyTypeBadgeProps> = ({
  propertyType,
  className = ''
}) => {
  if (!propertyType || !propertyType.name) {
    return null;
  }

  // Color mapping for different property types
  const getColorForPropertyType = (name: string) => {
    switch (name) {
      case 'Manufactured Housing':
        return 'primary';
      case 'RV Parks':
        return 'secondary';
      case 'Self-Storage':
        return 'success';
      case 'Multi-Asset':
        return 'warning';
      default:
        return 'primary';
    }
  };

  return (
    <Badge 
      color={getColorForPropertyType(propertyType.name)}
      variant="default"
      className={`text-xs ${className}`}
    >
      {propertyType.name}
    </Badge>
  );
};
