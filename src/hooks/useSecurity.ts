import { useEffect } from 'react';
import { SecurityEnforcer } from '../utils/formValidation';

/**
 * Custom hook to enforce security measures across the application
 */
export const useSecurity = () => {
  useEffect(() => {
    // Enforce HTTPS
    SecurityEnforcer.enforceHTTPS();
    
    // Check for secure context
    if (!SecurityEnforcer.isSecureContext() && process.env.NODE_ENV === 'production') {
      console.warn('Application is not running in a secure context. Some features may be limited.');
    }
    
    // Prevent sensitive data in browser storage
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key: string, value: string) {
      try {
        const data = JSON.parse(value);
        if (!SecurityEnforcer.preventSensitiveStorage(data)) {
          console.warn('Attempted to store sensitive data in localStorage. Request blocked.');
          return;
        }
      } catch (e) {
        // If it's not JSON, proceed normally
      }
      originalSetItem.call(this, key, value);
    };
    
    const originalSetItemSession = sessionStorage.setItem;
    sessionStorage.setItem = function(key: string, value: string) {
      try {
        const data = JSON.parse(value);
        if (!SecurityEnforcer.preventSensitiveStorage(data)) {
          console.warn('Attempted to store sensitive data in sessionStorage. Request blocked.');
          return;
        }
      } catch (e) {
        // If it's not JSON, proceed normally
      }
      originalSetItemSession.call(this, key, value);
    };
    
    // Add security event listeners
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Clear sensitive form data when tab becomes hidden (optional)
        // This is more for banking/financial apps, but good practice
        console.debug('Tab hidden - consider clearing sensitive form data');
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      // Restore original methods (though this rarely happens in practice)
      localStorage.setItem = originalSetItem;
      sessionStorage.setItem = originalSetItemSession;
    };
  }, []);
  
  return {
    isSecureContext: SecurityEnforcer.isSecureContext(),
    enforceHTTPS: SecurityEnforcer.enforceHTTPS,
    preventSensitiveStorage: SecurityEnforcer.preventSensitiveStorage
  };
};
