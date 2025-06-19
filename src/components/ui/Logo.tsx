import React, { useState } from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    // Fallback text logo
    return (
      <div className={`h-10 flex items-center font-display font-bold text-2xl text-plum ${className}`}>
        Specialty One
      </div>
    );
  }

  return (
    <img 
      src="/assets/logo/logo-horizontal-lightbackground.svg" 
      alt="Specialty One" 
      className={`h-10 w-auto ${className}`}
      loading="eager"
      onError={() => {
        console.error('Logo failed to load from /assets/logo/logo-horizontal-lightbackground.svg');
        setImageError(true);
      }}
    />
  );
};
