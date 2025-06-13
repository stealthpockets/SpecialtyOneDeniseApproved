import React from 'react';
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
import { createOptimizedImage, getCloudinaryPublicId } from '../../lib/cloudinary';
import { handleImageError, DEFAULT_TESTIMONIAL_IMAGE } from '../../utils/imageHelpers';

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
  loading = "lazy",
  crop,
  gravity,
  fallbackSrc,
  onClick
}) => {
  // Determine the public ID to use
  const resolvedPublicId = publicId || (localPath ? getCloudinaryPublicId(localPath) : null);
  
  // If no Cloudinary public ID is available, fall back to regular img tag
  if (!resolvedPublicId) {
    return (
      <img
        src={localPath || fallbackSrc || DEFAULT_TESTIMONIAL_IMAGE}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        onError={handleImageError}
        onClick={onClick}
      />
    );
  }

  // Create optimized Cloudinary image
  const cloudinaryImage = createOptimizedImage(resolvedPublicId, {
    width,
    height,
    crop,
    gravity
  });

  return (
    <AdvancedImage
      cldImg={cloudinaryImage}
      alt={alt}
      className={className}
      plugins={[
        responsive({ steps: [400, 800, 1200, 1600] }),
        placeholder({ mode: 'blur' })
      ]}
      loading={loading}
      onClick={onClick}
      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
        // Fallback to regular img if Cloudinary fails
        const target = e.target as HTMLImageElement;
        const fallbackImage = document.createElement('img');
        fallbackImage.src = localPath || fallbackSrc || DEFAULT_TESTIMONIAL_IMAGE;
        fallbackImage.alt = alt;
        fallbackImage.className = className || '';
        if (width) fallbackImage.width = width;
        if (height) fallbackImage.height = height;
        fallbackImage.loading = loading;
        fallbackImage.onerror = (e) => handleImageError(e as any);
        if (onClick) fallbackImage.onclick = onClick;
        
        target.parentNode?.replaceChild(fallbackImage, target);
      }}
    />
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
