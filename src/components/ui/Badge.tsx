import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'gradient';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  color = 'primary',
  className = '',
}) => {
  const colorClasses = {
    primary: {
      default: 'bg-plum text-white',
      outline: 'border-plum text-plum',
      gradient: 'bg-gradient-to-r from-plum to-amethyst text-white',
    },
    secondary: {
      default: 'bg-sage text-white',
      outline: 'border-sage text-sage',
      gradient: 'bg-gradient-to-r from-sage to-evergreen text-white',
    },
    success: {
      default: 'bg-green-500 text-white',
      outline: 'border-green-500 text-green-500',
      gradient: 'bg-gradient-to-r from-green-400 to-green-600 text-white',
    },
    warning: {
      default: 'bg-amber-500 text-white',
      outline: 'border-amber-500 text-amber-500',
      gradient: 'bg-gradient-to-r from-amber-400 to-amber-600 text-white',
    },
    error: {
      default: 'bg-red-500 text-white',
      outline: 'border-red-500 text-red-500',
      gradient: 'bg-gradient-to-r from-red-400 to-red-600 text-white',
    },
  };

  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  const variantClasses = variant === 'outline' ? 'bg-transparent border' : '';

  return (
    <span
      className={`
        ${baseClasses}
        ${variantClasses}
        ${colorClasses[color][variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};