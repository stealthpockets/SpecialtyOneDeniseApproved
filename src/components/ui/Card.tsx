import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  hover = true,
  style
}) => {
  return (
    <div 
      className={`
        bg-cloud rounded-lg shadow-card overflow-hidden
        ${hover ? 'transition-all duration-300 hover:shadow-card-hover' : ''}
        ${className}
      `}
      style={style}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
};

export const CardImage: React.FC<{ 
  src: string; 
  alt: string;
  overlay?: boolean;
  className?: string;
}> = ({ 
  src, 
  alt,
  overlay = false,
  className = '' 
}) => {
  return (
    <div className={`relative ${overlay ? 'gradient-overlay' : ''} ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
      />
    </div>
  );
};
