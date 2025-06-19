import React, { memo } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = memo(({
  size = 'md',
  message,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const containerClasses = {
    sm: 'min-h-[20vh]',
    md: 'min-h-[50vh]',
    lg: 'min-h-[60vh]'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${containerClasses[size]} ${className}`}>
      <div 
        className={`animate-spin rounded-full border-b-2 border-luxury-purple ${sizeClasses[size]}`}
        role="status"
        aria-label="Loading"
      />
      {message && (
        <p className="mt-4 text-gray-600 text-sm font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;
