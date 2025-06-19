import React from 'react';
import { Button } from './Button';
import { PROPERTY_TYPES, ContentFilters } from '../../types/MarketReport';

interface PropertyTypeFilterProps {
  selectedFilter: ContentFilters;
  onFilterChange: (filters: ContentFilters) => void;
  className?: string;
}

export const PropertyTypeFilter: React.FC<PropertyTypeFilterProps> = ({
  selectedFilter,
  onFilterChange,
  className = ''
}) => {
  const propertyTypes = [
    { id: null, name: 'All Property Types' },
    { id: 1, name: PROPERTY_TYPES.MANUFACTURED_HOUSING },
    { id: 2, name: PROPERTY_TYPES.RV_PARKS },
    { id: 3, name: PROPERTY_TYPES.SELF_STORAGE },
    { id: 4, name: PROPERTY_TYPES.MULTI_ASSET },
  ];

  const handleFilterClick = (propertyTypeId: number | null) => {
    onFilterChange({
      ...selectedFilter,
      propertyTypeId: propertyTypeId || undefined
    });
  };

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {propertyTypes.map((type) => {
        const isActive = selectedFilter.propertyTypeId === type.id;
        
        return (
          <Button
            key={type.id || 'all'}
            variant={isActive ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => handleFilterClick(type.id)}
            className="whitespace-nowrap"
          >
            {type.name}
          </Button>
        );
      })}
    </div>
  );
};
