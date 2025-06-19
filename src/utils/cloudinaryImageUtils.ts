/**
 * Utility to help identify which Cloudinary images exist vs which need to be uploaded
 * This helps with the gradual migration from local assets to Cloudinary
 */

import { CLOUDINARY_MAPPINGS } from '../lib/cloudinary';

interface ImageStatus {
  localPath: string;
  cloudinaryId: string;
  exists: boolean;
  tested: boolean;
}

const imageStatusCache = new Map<string, ImageStatus>();

/**
 * Test if a Cloudinary image exists by making a HEAD request
 */
export const testCloudinaryImageExists = async (cloudinaryId: string): Promise<boolean> => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) return false;
  
  try {
    const url = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto/q_auto/${cloudinaryId}`;
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.warn(`Failed to test Cloudinary image: ${cloudinaryId}`, error);
    return false;
  }
};

/**
 * Get status of all mapped images (which exist vs which need uploading)
 */
export const getAllImageStatuses = async (): Promise<ImageStatus[]> => {
  const statuses: ImageStatus[] = [];
  
  for (const [_category, mappings] of Object.entries(CLOUDINARY_MAPPINGS)) {
    for (const [localPath, cloudinaryId] of Object.entries(mappings)) {
      const cacheKey = `${localPath}->${cloudinaryId}`;
      let status = imageStatusCache.get(cacheKey);
      
      if (!status) {
        status = {
          localPath,
          cloudinaryId,
          exists: false,
          tested: false
        };
        imageStatusCache.set(cacheKey, status);
      }
      
      if (!status.tested) {
        status.exists = await testCloudinaryImageExists(cloudinaryId);
        status.tested = true;
      }
      
      statuses.push(status);
    }
  }
  
  return statuses;
};

/**
 * Get list of images that need to be uploaded to Cloudinary
 */
export const getImagesToUpload = async (): Promise<string[]> => {
  const statuses = await getAllImageStatuses();
  return statuses
    .filter(status => !status.exists)
    .map(status => status.localPath);
};

/**
 * Get list of images that exist in Cloudinary
 */
export const getExistingImages = async (): Promise<string[]> => {
  const statuses = await getAllImageStatuses();
  return statuses
    .filter(status => status.exists)
    .map(status => status.localPath);
};

/**
 * Print a summary of image statuses to console
 */
export const printImageStatusSummary = async (): Promise<void> => {
  const statuses = await getAllImageStatuses();
  const existing = statuses.filter(s => s.exists);
  const missing = statuses.filter(s => !s.exists);
  
  console.group('📸 Cloudinary Image Status Summary');
  console.log(`✅ ${existing.length} images exist in Cloudinary`);
  console.log(`❌ ${missing.length} images need to be uploaded`);
  
  if (missing.length > 0) {
    console.group('❌ Missing images:');
    missing.forEach(({ localPath, cloudinaryId }) => {
      console.log(`  • ${localPath} → ${cloudinaryId}`);
    });
    console.groupEnd();
  }
  
  console.groupEnd();
};

// Auto-run in development mode for debugging
if (import.meta.env.DEV && typeof window !== 'undefined') {
  // Add to window for manual testing
  (window as any).cloudinaryImageUtils = {
    testCloudinaryImageExists,
    getAllImageStatuses,
    getImagesToUpload,
    getExistingImages,
    printImageStatusSummary
  };
}
