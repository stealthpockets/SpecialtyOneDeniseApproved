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
      className={`w-auto ${className}`}
      loading="eager"
      width={240}
      height={48}
      crop="pad"
      fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjQ4IiB2aWV3Qm94PSIwIDAgMjQwIDQ4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8dGV4dCB4PSIxMCIgeT0iMzAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzMzMzMzMyI+U3BlY2lhbHR5IE9uZTwvdGV4dD4KPHN2Zz4="
    />
  );
};
