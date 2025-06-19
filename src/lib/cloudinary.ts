import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";

// Initialize Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },
  url: {
    secure: true
  }
});

/**
 * Create optimized Cloudinary image with standard transformations
 * @param publicId - The public ID of the image in Cloudinary
 * @param options - Optional transformation parameters
 */
export const createOptimizedImage = (
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: string;
    gravity?: string;
  } = {}
) => {
  // Create image instance without automatic versioning
  const image = cld.image(publicId);
  
  // CRITICAL: Remove any automatic version that might be added
  // This prevents the v1/ prefix that causes 404 errors
  image.setVersion('');
  
  // Apply resize if dimensions provided
  if (options.width || options.height) {
    const resize = auto();
    if (options.width) resize.width(options.width);
    if (options.height) resize.height(options.height);
    image.resize(resize);
  }
  
  // Apply gravity for smart cropping
  if (options.gravity) {
    image.resize(auto().gravity(autoGravity()));
  }
  
  // Apply optimizations for web delivery (skip for SVG files)
  if (!publicId.includes('logo') && !publicId.endsWith('.svg')) {
    image
      .delivery(format('auto')) // Auto-select best format (WebP, AVIF, etc.)
      .delivery(quality('auto')); // Auto-optimize quality
  }
    
  return image;
};

/**
 * Generate responsive image URLs for different breakpoints
 * @param publicId - The public ID of the image in Cloudinary
 * @param breakpoints - Array of width breakpoints
 */
export const generateResponsiveUrls = (
  publicId: string, 
  breakpoints: number[] = [400, 800, 1200, 1600]
) => {
  return breakpoints.map(width => ({
    width,
    url: createOptimizedImage(publicId, { width }).toURL()
  }));
};

/**
 * Cloudinary public ID mappings for existing assets
 * This allows gradual migration from local assets to Cloudinary
 */
export const CLOUDINARY_MAPPINGS = {  // Logo assets  // Logo mappings
  logo: {
    'logo-horizontal-lightbackground.svg': 'specialty-one/specialty-one/logo/logo-horizontal-lightbackground',
    'logo-horizontal-blackbackground.svg': 'specialty-one/specialty-one/logo/logo-horizontal-blackbackground',
    'logo-horizontal-lightbackground.png': 'specialty-one/logo/logo-horizontal-lightbackground',
    'logo-horizontal-blackbackground.png': 'specialty-one/logo/logo-horizontal-blackbackground',
    'Logo-icon-blackbackground.svg': 'specialty-one/logo/Logo-icon-blackbackground',
    'logo-icon-lightbackground.svg': 'specialty-one/logo/logo-icon-lightbackground',
    'logo-vertical-blackbackground.svg': 'specialty-one/logo/logo-vertical-blackbackground',
    'logo-vertical-lightbackgroung.svg': 'specialty-one/logo/logo-vertical-lightbackground',
  },
  
  // Leadership photos
  leadership: {
    'andrew-headshot-image.webp': 'specialty-one/specialty-one/leadership/andrew-headshot-image',
    'denise-nunez-self-storage.webp': 'specialty-one/specialty-one/leadership/denise-nunez-self-storage',  },
  
  // Property types
  propertyTypes: {
    'manufactured-housing-community-investment.webp': 'specialty-one/property-types/manufactured-housing-community-investment',
    'rv-park-investment.webp': 'specialty-one/property-types/rv-park-investment',
    'rv-park-investment-opportunity.webp': 'specialty-one/property-types/rv-park-investment-opportunity',
    'self-storage-facility-investment.webp': 'specialty-one/property-types/self-storage-facility-investment',
    'storage_facility_modern_arizona.webp': 'specialty-one/property-types/storage_facility_modern_arizona',
    'rv_resort_investment_arizona.webp': 'specialty-one/property-types/rv_resort_investment_arizona',
    'parkmodel_rv_park_apache_junction_arizona.webp': 'specialty-one/property-types/parkmodel_rv_park_apache_junction_arizona',
    'confidential-200+site-MHC-Sun_Valley.webp': 'specialty-one/property-types/confidential-200-site-MHC-Sun_Valley',
    'self-storage-investment-arizona.webp': 'specialty-one/specialty-one/property-types/self-storage-investment-arizona',
    'rv_park_mhp_resort_apache_junction.webp': 'specialty-one/property-types/rv_park_mhp_resort_apache_junction',
    'mh_park_apache_junction_arizona.webp': 'specialty-one/property-types/mh_park_apache_junction_arizona',
    'mhp_arizona_pueblo_mobile_manor.webp': 'specialty-one/property-types/mhp_arizona_pueblo_mobile_manor',
    'rv_park_resort_arizona.webp': 'specialty-one/property-types/rv_park_resort_arizona',
    // Background hero images - map to new Cloudinary uploads
    'mobile-home-park-specialty-one.webp': 'specialty-one/specialty-one/property-types/mobile-home-park-specialty-one',
    'outdoor-hospitality-rv-park.webp': 'specialty-one/specialty-one/property-types/outdoor-hospitality-rv-park',
  },
  
  // Success stories
  successStories: {
    'american-ss-mail.webp': 'specialty-one/success-stories/american-ss-mail',
    'caravan-oasis.webp': 'specialty-one/success-stories/caravan-oasis',
    'confidential-mhc-buyer.webp': 'specialty-one/success-stories/confidential-mhc-buyer',
    'confidential-rv-resort.webp': 'specialty-one/success-stories/confidential-rv-resort',
    'desert-retreat.webp': 'specialty-one/success-stories/desert-retreat',
    'desert-trails.webp': 'specialty-one/success-stories/desert-trails',
    'mogollon-rv.webp': 'specialty-one/success-stories/mogollon-rv',
    'the-palms.webp': 'specialty-one/success-stories/the-palms',
    'hero-success-stories.webp': 'specialty-one/success-stories/hero-success-stories',
    // Add support for more flexible path matching
    'success-stories/american-ss-mail.webp': 'specialty-one/success-stories/american-ss-mail',
    'success-stories/caravan-oasis.webp': 'specialty-one/success-stories/caravan-oasis',
    'success-stories/confidential-mhc-buyer.webp': 'specialty-one/success-stories/confidential-mhc-buyer',
    'success-stories/confidential-rv-resort.webp': 'specialty-one/success-stories/confidential-rv-resort',
    'success-stories/desert-retreat.webp': 'specialty-one/success-stories/desert-retreat',
    'success-stories/desert-trails.webp': 'specialty-one/success-stories/desert-trails',
    'success-stories/mogollon-rv.webp': 'specialty-one/success-stories/mogollon-rv',
    'success-stories/the-palms.webp': 'specialty-one/success-stories/the-palms',  },
  
  // Favicon assets
  favicon: {
    'android-chrome-192x192.png': 'favicon/android-chrome-192x192',
    'android-chrome-512x512.png': 'favicon/android-chrome-512x512',
    'apple-touch-icon.png': 'favicon/apple-touch-icon',
    'favicon-16x16.png': 'favicon/favicon-16x16',
    'favicon-32x32.png': 'favicon/favicon-32x32',
    'favicon.ico': 'favicon/favicon',
    'favicon.svg': 'favicon/favicon',
  }
};

/**
 * Get Cloudinary public ID from local asset path
 * @param localPath - Local asset path (e.g., '/assets/leadership/andrew-headshot-image.webp' or '/dist/assets/property-types/rv-park-investment.webp' or just 'the-palms.webp')
 * @returns Cloudinary public ID or null if not found
 */
export const getCloudinaryPublicId = (localPath: string): string | null => {
  if (!localPath) return null;

  // Extract the filename from the path
  const filename = localPath.split(/[\\/]/).pop();

  if (!filename) return null;

  // Check all categories for a direct match with the filename
  for (const category of Object.values(CLOUDINARY_MAPPINGS)) {
    for (const [key, value] of Object.entries(category)) {
      // The key in our mapping might be a full path, so we extract its filename too
      const keyFilename = key.split(/[\\/]/).pop();
      if (keyFilename === filename) {
        return value as string;
      }
    }
  }
  
  console.warn(`Cloudinary public ID not found for local path: ${localPath}`);
  return null;
};

export default cld;
