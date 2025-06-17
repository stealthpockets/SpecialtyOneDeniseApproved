import { useState, useEffect } from 'react';
import { CaseStudy, CaseStudyFilters } from '../types/caseStudy';
import { supabase } from '../lib/supabase';
import { snakeToCamel, parseJsonFields } from '../utils/dataTransformers';

export const useCaseStudies = (filters?: CaseStudyFilters) => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        setLoading(true);
        
        let query = supabase
          .from('case_studies')
          .select('*');
        
        // Revised filter application logic
        if (filters) {
          if (filters.isConfidential === true) {
            query = query.eq('is_confidential', true);
          } else if (filters.isConfidential === false) {
            query = query.eq('is_confidential', false);
          } else if (filters.status) { // Only apply status if isConfidential was not explicitly true/false
            query = query.eq('status', filters.status);
          } else {
            // Default if filters object is present but doesn't set isConfidential (true/false) or status
            query = query.eq('status', 'completed').eq('is_confidential', false);
          }

          // Apply other filters additively
          if (filters.propertyType) {
            query = query.eq('property_type', filters.propertyType);
          }
          if (filters.agent) {
            query = query.ilike('agent', `%${filters.agent}%`);
          }
        } else {
          // Default when filters object itself is not provided
          query = query.eq('status', 'completed').eq('is_confidential', false);
        }
        
        query = query.order('published_at', { ascending: false });
        
        const { data, error: supabaseError } = await query;
        
        if (supabaseError) {
          throw new Error(supabaseError.message);
        }
        
        if (!data) {
          setCaseStudies([]);
          return;
        }
        
        // Transform the data from database format to application format
        const transformedData = data.map(item => {
          try {
            // Ensure item is a valid object before proceeding
            if (!item || typeof item !== 'object') {
              console.error('Invalid item received from database:', item);
              return null;
            }

            // First parse any JSON fields that come as strings
            const parsedItem = parseJsonFields(item, ['results', 'testimonial', 'additional_images', 'tags']);
            // snakeToCamel expects an object. If parsedItem is not, or item was bad, it could fail.
            if (!parsedItem || typeof parsedItem !== 'object') {
                console.error('Invalid item after parsing JSON fields:', parsedItem, 'Original item:', item);
                return null;
            }
            
            // Then convert snake_case to camelCase
            const camelCaseItem = snakeToCamel(parsedItem) as CaseStudy;
            if (!camelCaseItem || typeof camelCaseItem !== 'object') {
                console.error('Invalid item after snakeToCamel:', camelCaseItem, 'Parsed item:', parsedItem);
                return null;
            }
            
            // Explicitly map is_confidential to isConfidential and set status if needed
            // Ensure item.is_confidential exists before accessing
            if (Object.prototype.hasOwnProperty.call(item, 'is_confidential')) {
              camelCaseItem.isConfidential = item.is_confidential;
              if (item.is_confidential) {
                camelCaseItem.status = 'confidential';
              }
            } else {
              // Default if is_confidential is missing, though schema should prevent this
              camelCaseItem.isConfidential = false; 
            }
            return camelCaseItem;
          } catch (transformError) {
            console.error('Error transforming individual case study item:', item, transformError);
            return null; // Skip this item if transformation fails
          }
        }).filter(Boolean) as CaseStudy[]; // Filter out any nulls introduced by errors or invalid items
        
        setCaseStudies(transformedData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch case studies');
        console.error('Error fetching case studies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, [filters]);

  // Clean hook state return without logging

  return { caseStudies, loading, error };
};

export const useCaseStudy = (slug: string) => {
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        setLoading(true);
        
        // Fetch single case study by slug
        const { data, error: supabaseError } = await supabase
          .from('case_studies')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
        
        if (supabaseError) {
          throw new Error(supabaseError.message);
        }
        
        if (!data) {
          setCaseStudy(null);
          setError('Case study not found');
          return;
        }
        
        // Transform the data from database format to application format
        // First parse any JSON fields that come as strings
        const parsedData = parseJsonFields(data, ['results', 'testimonial', 'additional_images', 'tags']);
        
        // Then convert snake_case to camelCase
        const transformedData = snakeToCamel(parsedData) as CaseStudy;
        
        setCaseStudy(transformedData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch case study');
        console.error('Error fetching case study:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCaseStudy();
    }
  }, [slug]);

  return { caseStudy, loading, error };
};
