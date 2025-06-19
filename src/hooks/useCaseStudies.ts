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
        
        console.log('🔍 useCaseStudies filters:', JSON.stringify(filters, null, 2), 'at', new Date().toISOString());
        
        let query = supabase
          .from('case_studies')
          .select('*');
        
        // Revised filter application logic
        if (filters) {
          console.log('🔧 Processing filters:', JSON.stringify(filters, null, 2));
          
          // Apply status filter first if provided
          if (filters.status) {
            console.log(`📋 Applying status filter: ${filters.status}`);
            query = query.eq('status', filters.status);
          }
          
          // Handle confidential filtering with explicit logic
          if (filters.includeAll === true) {
            console.log('✅ includeAll is TRUE - NOT applying any confidential filter');
            // Do nothing - don't filter by is_confidential at all
          } else if (filters.isConfidential === true) {
            console.log('🔒 Filtering for confidential only');
            query = query.eq('is_confidential', true);
          } else if (filters.isConfidential === false) {
            console.log('👁️ Filtering for non-confidential only');
            query = query.eq('is_confidential', false);
          } else if (!filters.includeAll) {
            console.log('🛡️ Default filter: non-confidential only');
            // Default: only show non-confidential and completed
            if (!filters.status) {
              query = query.eq('status', 'completed');
            }
            query = query.eq('is_confidential', false);
          }

          // Apply other filters additively
          if (filters.propertyType) {
            query = query.eq('property_type', filters.propertyType);
          }
          if (filters.agent) {
            query = query.ilike('agent', `%${filters.agent}%`);
          }
        } else {
          // TEMPORARY: When no filters provided, get ALL completed case studies (including confidential)
          console.log('📋 No filters provided - getting ALL completed case studies');
          query = query.eq('status', 'completed');
          // Removed: .eq('is_confidential', false) to include confidential ones
        }
        
        query = query.order('published_at', { ascending: false });
        
        console.log('🚀 Final query about to execute:', query);
        
        const { data, error: supabaseError } = await query;
        
        if (supabaseError) {
          console.error('Supabase error fetching case studies:', supabaseError);
          throw new Error('Failed to fetch case studies due to a database error.');
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

            return camelCaseItem;
          } catch (error) {
            console.error('Error transforming case study data:', error, 'Original item:', item);
            return null; // Return null for any item that fails transformation
          }
        }).filter(Boolean) as CaseStudy[]; // Filter out nulls

        setCaseStudies(transformedData);

      } catch (err) {
        console.error('Error in fetchCaseStudies:', err);
        setError('An unexpected error occurred while fetching case studies.');
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
          .single();

        if (supabaseError) {
          console.error(`Error fetching case study with slug ${slug}:`, supabaseError);
          throw new Error('Failed to fetch case study due to a database error.');
        }

        if (data) {
          // Transform the data from database format to application format
          // First parse any JSON fields that come as strings
          const parsedData = parseJsonFields(data, ['results', 'testimonial', 'additional_images', 'tags']);
          
          // Then convert snake_case to camelCase
          const camelCaseData = snakeToCamel(parsedData) as CaseStudy;
          
          setCaseStudy(camelCaseData);
        }
      } catch (err) {
        console.error(`Error fetching case study with slug ${slug}:`, err);
        setError('An unexpected error occurred while fetching the case study.');
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
