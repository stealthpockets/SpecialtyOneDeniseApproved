/**
 * Frontend Form Validation and Security Utilities
 * Prevents XSS attacks and ensures data integrity for contact forms
 */

export interface ValidationError {
  field: string;
  message: string;
}

export class FormValidator {
  /**
   * Sanitize user input by removing HTML tags and potential XSS vectors
   */
  static sanitizeInput(input: string): string {
    return input
      .trim()
      .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove script tags
      .replace(/<[^>]*>/g, '') // Remove all HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: URLs
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .replace(/&lt;script/gi, '') // Remove encoded script tags
      .replace(/&lt;\/script/gi, '')
      .replace(/&#x3C;script/gi, '')
      .replace(/&#60;script/gi, '');
  }

  /**
   * Validate name field
   */
  static validateName(name: string): { isValid: boolean; message?: string; sanitized: string } {
    const sanitized = this.sanitizeInput(name);
    
    if (sanitized.length < 2) {
      return { isValid: false, message: 'Name must be at least 2 characters long', sanitized };
    }
    
    if (sanitized.length > 100) {
      return { isValid: false, message: 'Name must be less than 100 characters', sanitized };
    }
    
    // Only allow letters, spaces, hyphens, and apostrophes
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    if (!nameRegex.test(sanitized)) {
      return { isValid: false, message: 'Name can only contain letters, spaces, hyphens, and apostrophes', sanitized };
    }
    
    return { isValid: true, sanitized };
  }

  /**
   * Validate email field
   */
  static validateEmail(email: string): { isValid: boolean; message?: string; sanitized: string } {
    const sanitized = this.sanitizeInput(email).toLowerCase();
    
    // RFC 5322 compliant email regex (simplified)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!emailRegex.test(sanitized)) {
      return { isValid: false, message: 'Please enter a valid email address', sanitized };
    }
    
    if (sanitized.length > 255) {
      return { isValid: false, message: 'Email address is too long', sanitized };
    }
    
    return { isValid: true, sanitized };
  }

  /**
   * Validate phone number
   */
  static validatePhone(phone: string): { isValid: boolean; message?: string; sanitized: string } {
    if (!phone) return { isValid: true, sanitized: '' }; // Phone is optional
    
    const sanitized = phone.replace(/\D/g, ''); // Keep only digits
    
    if (sanitized.length < 10) {
      return { isValid: false, message: 'Phone number must be at least 10 digits', sanitized };
    }
    
    if (sanitized.length > 15) {
      return { isValid: false, message: 'Phone number is too long', sanitized };
    }
    
    return { isValid: true, sanitized };
  }

  /**
   * Validate message/textarea field
   */
  static validateMessage(message: string): { isValid: boolean; message?: string; sanitized: string } {
    const sanitized = this.sanitizeInput(message);
    
    if (sanitized.length < 10) {
      return { isValid: false, message: 'Message must be at least 10 characters long', sanitized };
    }
    
    if (sanitized.length > 2000) {
      return { isValid: false, message: 'Message must be less than 2000 characters', sanitized };
    }
    
    return { isValid: true, sanitized };
  }

  /**
   * Validate company/organization field
   */
  static validateCompany(company: string): { isValid: boolean; message?: string; sanitized: string } {
    if (!company) return { isValid: true, sanitized: '' }; // Company is optional
    
    const sanitized = this.sanitizeInput(company);
    
    if (sanitized.length > 200) {
      return { isValid: false, message: 'Company name must be less than 200 characters', sanitized };
    }
    
    return { isValid: true, sanitized };
  }

  /**
   * Validate select/dropdown fields
   */
  static validateSelect(value: string, allowedValues: string[]): { isValid: boolean; message?: string; sanitized: string } {
    if (!value) return { isValid: true, sanitized: '' }; // Select fields can be optional
    
    const sanitized = this.sanitizeInput(value);
    
    if (!allowedValues.includes(sanitized)) {
      return { isValid: false, message: 'Please select a valid option', sanitized };
    }
    
    return { isValid: true, sanitized };
  }

  /**
   * Comprehensive form validation
   */
  static validateContactForm(formData: any): { isValid: boolean; errors: ValidationError[]; sanitizedData: any } {
    const errors: ValidationError[] = [];
    const sanitizedData: any = {};

    // Validate first name
    const firstNameResult = this.validateName(formData.firstName || '');
    sanitizedData.firstName = firstNameResult.sanitized;
    if (!firstNameResult.isValid) {
      errors.push({ field: 'firstName', message: firstNameResult.message! });
    }

    // Validate last name
    const lastNameResult = this.validateName(formData.lastName || '');
    sanitizedData.lastName = lastNameResult.sanitized;
    if (!lastNameResult.isValid) {
      errors.push({ field: 'lastName', message: lastNameResult.message! });
    }

    // Validate email
    const emailResult = this.validateEmail(formData.email || '');
    sanitizedData.email = emailResult.sanitized;
    if (!emailResult.isValid) {
      errors.push({ field: 'email', message: emailResult.message! });
    }

    // Validate phone
    const phoneResult = this.validatePhone(formData.phone || '');
    sanitizedData.phone = phoneResult.sanitized;
    if (!phoneResult.isValid) {
      errors.push({ field: 'phone', message: phoneResult.message! });
    }

    // Validate company
    const companyResult = this.validateCompany(formData.company || '');
    sanitizedData.company = companyResult.sanitized;
    if (!companyResult.isValid) {
      errors.push({ field: 'company', message: companyResult.message! });
    }

    // Validate message
    const messageResult = this.validateMessage(formData.message || '');
    sanitizedData.message = messageResult.sanitized;
    if (!messageResult.isValid) {
      errors.push({ field: 'message', message: messageResult.message! });
    }

    // Validate select fields if present
    if (formData.propertyType) {
      const allowedPropertyTypes = ['manufactured-housing', 'rv-parks', 'self-storage', 'other'];
      const propertyTypeResult = this.validateSelect(formData.propertyType, allowedPropertyTypes);
      sanitizedData.propertyType = propertyTypeResult.sanitized;
      if (!propertyTypeResult.isValid) {
        errors.push({ field: 'propertyType', message: propertyTypeResult.message! });
      }
    }

    if (formData.inquiryType) {
      const allowedInquiryTypes = ['selling', 'buying', '1031-exchange', 'market-info', 'general'];
      const inquiryTypeResult = this.validateSelect(formData.inquiryType, allowedInquiryTypes);
      sanitizedData.inquiryType = inquiryTypeResult.sanitized;
      if (!inquiryTypeResult.isValid) {
        errors.push({ field: 'inquiryType', message: inquiryTypeResult.message! });
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedData
    };
  }
}

/**
 * Rate limiting utility for client-side protection
 */
export class RateLimiter {
  private static readonly RATE_LIMIT_KEY = 'contactFormSubmissions';
  private static readonly MAX_SUBMISSIONS = 3;
  private static readonly TIME_WINDOW = 15 * 60 * 1000; // 15 minutes

  static canSubmit(): { allowed: boolean; message?: string } {
    try {
      const submissions = this.getSubmissions();
      const now = Date.now();
      
      // Clean old submissions
      const recentSubmissions = submissions.filter(time => now - time < this.TIME_WINDOW);
      
      if (recentSubmissions.length >= this.MAX_SUBMISSIONS) {
        return {
          allowed: false,
          message: 'Too many submissions. Please wait 15 minutes before submitting again.'
        };
      }
      
      return { allowed: true };
    } catch (error) {
      // If localStorage is not available, allow submission
      return { allowed: true };
    }
  }

  static recordSubmission(): void {
    try {
      const submissions = this.getSubmissions();
      const now = Date.now();
      
      // Add current submission
      submissions.push(now);
      
      // Keep only recent submissions
      const recentSubmissions = submissions.filter(time => now - time < this.TIME_WINDOW);
      
      localStorage.setItem(this.RATE_LIMIT_KEY, JSON.stringify(recentSubmissions));
    } catch (error) {
      // Silently fail if localStorage is not available
    }
  }

  private static getSubmissions(): number[] {
    try {
      const stored = localStorage.getItem(this.RATE_LIMIT_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  }
}

/**
 * HTTPS enforcement utility
 */
export class SecurityEnforcer {
  static enforceHTTPS(): void {
    if (
      typeof window !== 'undefined' &&
      window.location.protocol !== 'https:' &&
      window.location.hostname !== 'localhost' &&
      window.location.hostname !== '127.0.0.1' &&
      !window.location.hostname.includes('192.168.') &&
      !window.location.hostname.includes('10.0.')
    ) {
      window.location.replace('https:' + window.location.href.substring(window.location.protocol.length));
    }
  }

  /**
   * Check if we're in a secure context
   */
  static isSecureContext(): boolean {
    return typeof window !== 'undefined' && window.isSecureContext;
  }

  /**
   * Prevent sensitive data storage in browser
   */
  static preventSensitiveStorage(data: any): boolean {
    const sensitiveFields = ['password', 'token', 'api_key', 'secret', 'key'];
    const dataStr = JSON.stringify(data).toLowerCase();
    
    return !sensitiveFields.some(field => dataStr.includes(field));
  }
}
