// Image helper functions for testimonials with Cloudinary integration

import { PROPERTY_TYPES } from '../types/testimonial';
import { createOptimizedImage } from '../lib/cloudinary';

// Cloudinary base URL - get from environment or default to cloud name
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'specialtyone'}/image/upload`;

/**
 * Generate Cloudinary URL for property type fallback images
 */
const getCloudinaryUrl = (publicId: string): string => {
  try {
    return createOptimizedImage(publicId, { width: 800 }).toURL();
  } catch (error) {
    // Fallback to direct URL construction without forcing .webp extension
    return `${CLOUDINARY_BASE_URL}/${publicId}`;
  }
};

/**
 * Get the appropriate image path for a testimonial
 * Uses specific image_url if provided, otherwise falls back to property-type-based Cloudinary images
 */
export const getTestimonialImagePath = (
  image_url?: string | null, 
  property_type?: string | null
): string => {
  // Use specific image if provided
  if (image_url) {
    return image_url;
  }
  
  // Fallback based on property_type - using Cloudinary URLs
  switch (property_type) {
    case PROPERTY_TYPES.SELF_STORAGE:
      return getCloudinaryUrl('self-storage-investment-arizona');
    case PROPERTY_TYPES.MANUFACTURED_HOUSING:
      return getCloudinaryUrl('rv_resort_investment_arizona');
    case PROPERTY_TYPES.RV_PARK:
      return getCloudinaryUrl('rv-park-investment');
    case PROPERTY_TYPES.BUYER_VIEW:
      return getCloudinaryUrl('v1750360262/specialty-one/property-types/parkmodel-rv-park-apache-junction-arizona');
    case PROPERTY_TYPES.MULTI_ASSET:
      return getCloudinaryUrl('v1750360262/specialty-one/property-types/parkmodel-rv-park-apache-junction-arizona');
    default:
      return getCloudinaryUrl('v1750360262/specialty-one/property-types/parkmodel-rv-park-apache-junction-arizona');
  }
};

/**
 * Ultimate fallback image path for error handling - now uses Cloudinary with full path
 */
export const DEFAULT_TESTIMONIAL_IMAGE = getCloudinaryUrl('v1750360262/specialty-one/property-types/parkmodel-rv-park-apache-junction-arizona');

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
