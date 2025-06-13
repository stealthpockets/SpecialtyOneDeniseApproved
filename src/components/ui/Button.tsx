import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  target?: string; // Added target prop
  rel?: string;    // Added rel prop
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  className = '',
  icon,
  iconPosition = 'left',
  target, // Added target
  rel,    // Added rel
}) => {
  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2.5 px-5 text-base',
    lg: 'py-3 px-6 text-lg',
  };

  const variantClasses = {
    primary: 'button-gradient transform hover:-translate-y-0.5', // Simplified: hover:brightness-110 and hover:shadow-lg are in index.css via .button-gradient:hover
    secondary: 'button-secondary hover:brightness-110 hover:shadow-lg transform hover:-translate-y-0.5',
    outline: 'bg-transparent border border-plum text-plum hover:bg-plum/5 hover:shadow-md transform hover:-translate-y-0.5',
    text: 'bg-transparent text-plum hover:bg-plum/5 hover:shadow-sm transform hover:-translate-y-0.5',
  };

  const baseClasses = `
    inline-flex items-center justify-center rounded-md font-semibold transition-all duration-300
    ${sizeClasses[size]} ${variantClasses[variant]} ${className}
  `;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  );

  if (to) {
    return <Link to={to} className={baseClasses}>{content}</Link>;
  }

  if (href) {
    return <a href={href} className={baseClasses} target={target} rel={rel}>{content}</a>;
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
};