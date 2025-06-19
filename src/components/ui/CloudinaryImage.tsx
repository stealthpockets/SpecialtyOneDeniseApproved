import React, { useState, useCallback } from 'react';
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
import { createOptimizedImage, getCloudinaryPublicId } from '../../lib/cloudinary';
import { handleImageError, DEFAULT_TESTIMONIAL_IMAGE } from '../../utils/imageHelpers';
import { performanceMonitor } from '../../utils/performanceMonitor';
import { ImageErrorBoundary } from './ImageErrorBoundary';

interface CloudinaryImageProps {
  publicId?: string;
  localPath?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "eager" | "lazy";
  crop?: string;
  gravity?: string;
  fallbackSrc?: string;
  onClick?: () => void;
}

export const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  publicId,
  localPath,
  alt,
  width,
  height,
  className,
  loading = "eager",
  crop,
  gravity,
  fallbackSrc,
  onClick
}) => {
  const [imageLoadTime] = useState(() => performance.now());
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Determine the public ID to use
  const resolvedPublicId = publicId || (localPath ? getCloudinaryPublicId(localPath) : null);
  
  // Track image load performance
  const trackImageLoad = useCallback(() => {
    const loadTime = performance.now() - imageLoadTime;
    const imageName = publicId || localPath || 'unknown';
    performanceMonitor.trackImageLoad(imageName, loadTime);
    setIsLoading(false);
  }, [imageLoadTime, publicId, localPath]);
  
  // Add error handling for image load timeout
  React.useEffect(() => {
    if (isLoading && resolvedPublicId) {
      const timeout = setTimeout(() => {
        if (isLoading) {
          console.warn(`Image load timeout for: ${resolvedPublicId}`);
          setHasError(true);
          setIsLoading(false);
        }
      }, 10000); // 10 second timeout

      return () => clearTimeout(timeout);
    }
  }, [isLoading, resolvedPublicId]);
  
  // If no Cloudinary public ID is available, fall back to regular img tag
  if (!resolvedPublicId || hasError) {
    // Normalize local path for fallback
    let fallbackPath = localPath;
    if (fallbackPath) {
      // Handle backslashes and ensure correct path format
      fallbackPath = fallbackPath.replace(/\\/g, '/');
      // Ensure path starts with / for public directory
      if (!fallbackPath.startsWith('/')) {
        fallbackPath = '/' + fallbackPath;
      }
    }
    
    return (
      <img
        src={fallbackPath || fallbackSrc || DEFAULT_TESTIMONIAL_IMAGE}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        onLoad={trackImageLoad}
        onError={handleImageError}
        onClick={onClick}
      />
    );  }

  // Create optimized Cloudinary image
  const cloudinaryImage = createOptimizedImage(resolvedPublicId, {
    width,
    height,
    crop,
    gravity
  });

  return (
    <ImageErrorBoundary>
      <AdvancedImage
        cldImg={cloudinaryImage}
        alt={alt}
        className={className}
        plugins={[
          responsive({ steps: [400, 800, 1200, 1600] }),
          placeholder({ mode: 'blur' })
        ]}        loading={loading}
        onLoad={() => {
          trackImageLoad();
          setIsLoading(false);
        }}
        onClick={onClick}
        onError={() => {
          console.warn(`Cloudinary image failed to load: ${resolvedPublicId}`);
          setHasError(true);
          setIsLoading(false);
        }}
      />
    </ImageErrorBoundary>
  );
};

/**
 * Simplified CloudinaryImage for basic use cases
 */
interface SimpleCloudinaryImageProps {
  src: string; // Can be either publicId or local path
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export const SimpleCloudinaryImage: React.FC<SimpleCloudinaryImageProps> = ({
  src,
  alt,
  className,
  width,
  height
}) => {
  // Check if src looks like a Cloudinary public ID or local path
  const isLocalPath = src.startsWith('/') || src.startsWith('./') || src.includes('assets');
  
  return (
    <CloudinaryImage
      publicId={!isLocalPath ? src : undefined}
      localPath={isLocalPath ? src : undefined}
      alt={alt}
      className={className}
      width={width}
      height={height}
    />
  );
};

/**
 * Hero image component optimized for large hero sections
 */
interface HeroImageProps {
  publicId?: string;
  localPath?: string;
  alt: string;
  className?: string;
}

export const HeroImage: React.FC<HeroImageProps> = ({
  publicId,
  localPath,
  alt,
  className
}) => {
  return (
    <CloudinaryImage
      publicId={publicId}
      localPath={localPath}
      alt={alt}
      className={className}
      width={1920}
      height={1080}
      loading="eager"
      gravity="auto"
    />
  );
};

/**
 * Property card image optimized for property type cards
 */
interface PropertyImageProps {
  publicId?: string;
  localPath?: string;
  alt: string;
  className?: string;
}

export const PropertyImage: React.FC<PropertyImageProps> = ({
  publicId,
  localPath,
  alt,
  className
}) => {
  return (
    <CloudinaryImage
      publicId={publicId}
      localPath={localPath}
      alt={alt}
      className={className}
      width={600}
      height={400}
      gravity="auto"
    />
  );
};

/**
 * Profile image component optimized for leadership photos
 */
interface ProfileImageProps {
  publicId?: string;
  localPath?: string;
  alt: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  publicId,
  localPath,
  alt,
  className,
  size = 'medium'
}) => {
  const dimensions = {
    small: { width: 150, height: 150 },
    medium: { width: 300, height: 300 },
    large: { width: 500, height: 500 }
  };

  const { width, height } = dimensions[size];

  return (
    <CloudinaryImage
      publicId={publicId}
      localPath={localPath}
      alt={alt}
      className={className}
      width={width}
      height={height}
      gravity="face"
    />
  );
};

export default CloudinaryImage;
