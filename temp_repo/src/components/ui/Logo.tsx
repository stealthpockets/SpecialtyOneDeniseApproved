import React from 'react';
import { CloudinaryImage } from './CloudinaryImage';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <CloudinaryImage
      localPath="/assets/logo/logo-horizontal-lightbackground.svg" 
      alt="Specialty One" 
      className={`h-10 w-auto ${className}`}
    />
  );
};
