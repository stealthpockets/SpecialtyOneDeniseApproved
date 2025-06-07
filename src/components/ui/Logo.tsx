import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <img 
      src="/dist/assets/logo/logo-horizontal-lightbackground.svg" 
      alt="Specialty One" 
      className={`h-10 w-auto ${className}`}
    />
  );
};