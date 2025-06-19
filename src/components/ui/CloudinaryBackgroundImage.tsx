import React, { useMemo } from 'react';
import { createOptimizedImage, getCloudinaryPublicId } from '../../lib/cloudinary';

interface CloudinaryBackgroundImageProps {
  localPath: string;
  children: React.ReactNode;
  className?: string;
  fallbackPath?: string;
}

// Cache for warning messages to prevent spam
const warnedPaths = new Set<string>();

/**
 * Component for using Cloudinary images as background images
 * Falls back to local path if Cloudinary mapping not found
 */
export const CloudinaryBackgroundImage: React.FC<CloudinaryBackgroundImageProps> = ({
  localPath,
  children,
  className = '',
  fallbackPath
}) => {
  const backgroundImage = useMemo(() => {
    // Remove leading slash and /assets/ if present for mapping lookup
    const cleanPath = localPath.replace(/^\/+/, '').replace(/^assets\//, '').replace(/^dist\/assets\//, '');
    
    // Get Cloudinary public ID
    const publicId = getCloudinaryPublicId(cleanPath);
    
    if (publicId) {
      // Use Cloudinary URL
      const cloudinaryUrl = createOptimizedImage(publicId, {
        width: 1920,
        height: 1080
      }).toURL();
      return `url('${cloudinaryUrl}')`;
    } else {
      // Fallback to local path
      const finalPath = fallbackPath || localPath;
      
      // Log missing mapping for development (only once per path)
      if (import.meta.env.DEV && !warnedPaths.has(cleanPath)) {
        console.warn(`No Cloudinary mapping found for: ${cleanPath}. Using fallback: ${finalPath}`);
        warnedPaths.add(cleanPath);
      }
      
      return `url('${finalPath}')`;
    }
  }, [localPath, fallbackPath]);

  return (
    <div 
      className={className}
      style={{ backgroundImage }}
    >
      {children}
    </div>
  );
};
