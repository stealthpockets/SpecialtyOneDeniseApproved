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

/**
 * Transform case study data from database format to component format
 */
export const transformCaseStudy = (dbRecord: any): any => {
  // First parse JSON fields
  const parsedRecord = parseJsonFields(dbRecord, ['results', 'additional_images', 'testimonial', 'tags']);
  
  // Convert snake_case to camelCase
  const camelRecord = snakeToCamel(parsedRecord);
  
  // Apply specific transformations for case studies
  return {
    ...camelRecord,
    // Maintain both snake_case and camelCase for compatibility
    propertyType: camelRecord.propertyType || camelRecord.property_type,
    isConfidential: camelRecord.isConfidential || camelRecord.is_confidential,
    siteCount: camelRecord.siteCount || camelRecord.site_count,
    squareFootage: camelRecord.squareFootage || camelRecord.square_footage,
    salePrice: camelRecord.salePrice || camelRecord.sale_price,
    capRate: camelRecord.capRate || camelRecord.cap_rate,
    timeToSale: camelRecord.timeToSale || camelRecord.time_to_sale,
    heroImage: camelRecord.heroImage || camelRecord.hero_image,
    additionalImages: camelRecord.additionalImages || camelRecord.additional_images,
    detailedChallenge: camelRecord.detailedChallenge || camelRecord.detailed_challenge,
    agentImage: camelRecord.agentImage || camelRecord.agent_image,
    metaDescription: camelRecord.metaDescription || camelRecord.meta_description,
    createdAt: camelRecord.createdAt || camelRecord.created_at,
    updatedAt: camelRecord.updatedAt || camelRecord.updated_at,
    publishedAt: camelRecord.publishedAt || camelRecord.published_at,
  };
};
