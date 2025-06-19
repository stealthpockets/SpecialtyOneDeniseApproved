/**
 * Security hooks for form protection and validation
 */

import { useState, useEffect } from 'react';
import { FormValidator, RateLimiter, SecurityEnforcer, ValidationError } from '../utils/formValidation';

export interface UseSecureFormProps {
  onSubmit: (sanitizedData: any) => Promise<void> | void;
  customValidation?: (data: any) => ValidationError[];
}

export interface UseSecureFormReturn {
  isSubmitting: boolean;
  validationErrors: ValidationError[];
  submitError: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent, formData: any) => Promise<void>;
  getFieldError: (fieldName: string) => string | undefined;
  clearErrors: () => void;
}

export function useSecureForm({ onSubmit, customValidation }: UseSecureFormProps): UseSecureFormReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [submitError, setSubmitError] = useState<string>('');

  // Enforce HTTPS on mount
  useEffect(() => {
    SecurityEnforcer.enforceHTTPS();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    
    // Clear validation errors for this field
    setValidationErrors(prev => prev.filter(error => error.field !== name));
    setSubmitError('');
  };

  const handleSubmit = async (e: React.FormEvent, formData: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setValidationErrors([]);
    setSubmitError('');

    try {
      // Check rate limiting
      const rateLimitCheck = RateLimiter.canSubmit();
      if (!rateLimitCheck.allowed) {
        setSubmitError(rateLimitCheck.message || 'Too many submissions');
        return;
      }

      // Basic validation
      const validation = FormValidator.validateContactForm(formData);

      // Custom validation if provided
      if (customValidation) {
        const customErrors = customValidation(formData);
        validation.errors.push(...customErrors);
        if (customErrors.length > 0) {
          validation.isValid = false;
        }
      }

      if (!validation.isValid) {
        setValidationErrors(validation.errors);
        setSubmitError('Please correct the errors below');
        return;
      }

      // Check if we're in a secure context
      if (!SecurityEnforcer.isSecureContext()) {
        setSubmitError('This form requires a secure connection. Please ensure you\'re using HTTPS.');
        return;
      }

      // Prevent sensitive data storage
      if (!SecurityEnforcer.preventSensitiveStorage(validation.sanitizedData)) {
        setSubmitError('Invalid data detected. Please review your submission.');
        return;
      }

      // Submit the form
      await onSubmit(validation.sanitizedData);
      
      // Record submission for rate limiting
      RateLimiter.recordSubmission();
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return validationErrors.find(error => error.field === fieldName)?.message;
  };

  const clearErrors = () => {
    setValidationErrors([]);
    setSubmitError('');
  };

  return {
    isSubmitting,
    validationErrors,
    submitError,
    handleInputChange,
    handleSubmit,
    getFieldError,
    clearErrors
  };
}

/**
 * Security status hook for monitoring security state
 */
export function useSecurityStatus() {
  const [isSecure, setIsSecure] = useState(false);
  const [securityWarnings, setSecurityWarnings] = useState<string[]>([]);

  useEffect(() => {
    const checkSecurity = () => {
      const warnings: string[] = [];
      let secure = true;

      // Check HTTPS
      if (!SecurityEnforcer.isSecureContext()) {
        warnings.push('Connection is not secure. Please use HTTPS.');
        secure = false;
      }

      // Check if running in development
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        warnings.push('Running in development mode.');
      }

      setIsSecure(secure);
      setSecurityWarnings(warnings);
    };

    checkSecurity();
  }, []);

  return {
    isSecure,
    securityWarnings
  };
}
