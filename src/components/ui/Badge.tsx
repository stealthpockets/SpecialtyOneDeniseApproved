import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'gradient' | 'secondary' | 'destructive';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  color = 'primary',
  size = 'md',
  className = '',
}) => {
  const colorClasses = {
    primary: {
      default: 'bg-plum text-white',
      outline: 'border-plum text-plum',
      gradient: 'bg-gradient-to-r from-plum to-amethyst text-white',
      secondary: 'bg-sage/10 text-sage',
      destructive: 'bg-red-500 text-white',
    },
    secondary: {
      default: 'bg-sage text-white',
      outline: 'border-sage text-sage',
      gradient: 'bg-gradient-to-r from-sage to-evergreen text-white',
      secondary: 'bg-sand text-obsidian',
      destructive: 'bg-red-500 text-white',
    },
    success: {
      default: 'bg-green-500 text-white',
      outline: 'border-green-500 text-green-500',
      gradient: 'bg-gradient-to-r from-green-400 to-green-600 text-white',
      secondary: 'bg-green-100 text-green-700',
      destructive: 'bg-red-500 text-white',
    },
    warning: {
      default: 'bg-amber-500 text-white',
      outline: 'border-amber-500 text-amber-500',
      gradient: 'bg-gradient-to-r from-amber-400 to-amber-600 text-white',
      secondary: 'bg-amber-100 text-amber-700',
      destructive: 'bg-red-500 text-white',
    },
    error: {
      default: 'bg-red-500 text-white',
      outline: 'border-red-500 text-red-500',
      gradient: 'bg-gradient-to-r from-red-400 to-red-600 text-white',
      secondary: 'bg-red-100 text-red-700',
      destructive: 'bg-red-500 text-white',
    },
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  const baseClasses = 'inline-flex items-center rounded-full font-medium';
  const variantClasses = variant === 'outline' ? 'bg-transparent border' : '';

  return (
    <span
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses}
        ${colorClasses[color][variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};