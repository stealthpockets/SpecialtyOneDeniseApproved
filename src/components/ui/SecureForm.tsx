/**
 * Secure form components with built-in validation and security features
 */

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface SecureFormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
  options?: { value: string; label: string }[];
  rows?: number;
  className?: string;
}

export function SecureFormField({
  label,
  name,
  type = 'text',
  required = false,
  maxLength,
  minLength,
  pattern,
  placeholder,
  value,
  onChange,
  error,
  options,
  rows = 4,
  className = ''
}: SecureFormFieldProps) {
  const baseClassName = `w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent ${
    error ? 'border-red-300' : 'border-gray-300'
  } ${className}`;

  const renderField = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={name}
            name={name}
            required={required}
            maxLength={maxLength}
            minLength={minLength}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rows={rows}
            className={baseClassName}
          />
        );
      
      case 'select':
        return (
          <select
            id={name}
            name={name}
            required={required}
            value={value}
            onChange={onChange}
            className={baseClassName}
          >
            <option value="">Select {label}</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      default:
        return (
          <input
            type={type}
            id={name}
            name={name}
            required={required}
            maxLength={maxLength}
            minLength={minLength}
            pattern={pattern}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={baseClassName}
          />
        );
    }
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {renderField()}
      {error && (
        <p className="mt-1 text-red-600 text-sm flex items-center">
          <AlertCircle size={16} className="mr-1" />
          {error}
        </p>
      )}
    </div>
  );
}

interface SecureFormErrorDisplayProps {
  error?: string;
  className?: string;
}

export function SecureFormErrorDisplay({ error, className = '' }: SecureFormErrorDisplayProps) {
  if (!error) return null;

  return (
    <div className={`p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center ${className}`}>
      <AlertCircle size={20} className="mr-3 flex-shrink-0" />
      <span>{error}</span>
    </div>
  );
}

interface SecureSubmitButtonProps {
  isSubmitting: boolean;
  children: React.ReactNode;
  className?: string;
  loadingText?: string;
}

export function SecureSubmitButton({
  isSubmitting,
  children,
  className = '',
  loadingText = 'Submitting...'
}: SecureSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full flex items-center justify-center py-3 px-6 bg-plum hover:bg-plum/90 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-plum focus:ring-offset-2 ${className}`}
    >
      {isSubmitting ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}

interface SecurityIndicatorProps {
  isSecure: boolean;
  warnings: string[];
  className?: string;
}

export function SecurityIndicator({ isSecure, warnings, className = '' }: SecurityIndicatorProps) {
  if (isSecure && warnings.length === 0) {
    return (
      <div className={`flex items-center text-green-600 text-sm ${className}`}>
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
        Secure connection
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {warnings.map((warning, index) => (
        <div key={index} className="flex items-center text-amber-600 text-sm">
          <AlertCircle size={16} className="mr-2 flex-shrink-0" />
          {warning}
        </div>
      ))}
    </div>
  );
}
