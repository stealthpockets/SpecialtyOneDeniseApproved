/**
 * Utility functions for transforming data between database and application formats
 */

/**
 * Converts a snake_case database record to camelCase for frontend use
 * Handles nested objects and arrays
 */
export const snakeToCamel = (obj: any): any => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(snakeToCamel);
  }

  return Object.keys(obj).reduce((acc, key) => {
    // Convert key from snake_case to camelCase
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    
    // Handle nested objects and arrays recursively
    acc[camelKey] = snakeToCamel(obj[key]);
    
    return acc;
  }, {} as Record<string, any>);
};

/**
 * Parse JSONB strings from Supabase into JavaScript objects/arrays
 */
export const parseJsonFields = (record: any, jsonFields: string[]): any => {
  const result = { ...record };
  
  jsonFields.forEach(field => {
    if (result[field] && typeof result[field] === 'string') {
      try {
        result[field] = JSON.parse(result[field]);
      } catch (error) {
        console.error(`Error parsing JSON field ${field}:`, error);
      }
    }
  });
  
  return result;
};
