// Image helper functions for testimonials

import { PROPERTY_TYPES } from '../types/testimonial';

/**
 * Get the appropriate image path for a testimonial
 * Uses specific image_url if provided, otherwise falls back to property-type-based images
 */
export const getTestimonialImagePath = (
  image_url?: string | null, 
  property_type?: string | null
): string => {
  // Use specific image if provided
  if (image_url) {
    return image_url;
  }
  
  // Fallback based on property_type
  switch (property_type) {
    case PROPERTY_TYPES.SELF_STORAGE:
      return '/assets/property-types/self-storage-investment-arizona.webp';
    case PROPERTY_TYPES.MANUFACTURED_HOUSING:
      return '/assets/property-types/rv_resort_investment_arizona.webp';
    case PROPERTY_TYPES.RV_PARK:
      return '/assets/property-types/rv-park-investment.webp';
    case PROPERTY_TYPES.BUYER_VIEW:
      return '/assets/property-types/parkmodel_rv_park_apache_junction_arizona.webp';
    case PROPERTY_TYPES.MULTI_ASSET:
      return '/assets/property-types/parkmodel_rv_park_apache_junction_arizona.webp';
    default:
      return '/assets/property-types/parkmodel_rv_park_apache_junction_arizona.webp';
  }
};

/**
 * Ultimate fallback image path for error handling
 */
export const DEFAULT_TESTIMONIAL_IMAGE = '/assets/property-types/parkmodel_rv_park_apache_junction_arizona.webp';

/**
 * Handle image load errors by setting a fallback image
 */
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
  const target = event.target as HTMLImageElement;
  if (target.src !== DEFAULT_TESTIMONIAL_IMAGE) {
    target.onerror = null; // Prevent infinite loop
    target.src = DEFAULT_TESTIMONIAL_IMAGE;
  }
};
