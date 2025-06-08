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
        
        // Create Supabase query
        let query = supabase
          .from('case_studies')
          .select('*')
          .eq('status', 'completed');
        
        // Apply filters if provided
        if (filters?.propertyType) {
          query = query.eq('property_type', filters.propertyType);
        }
        
        if (filters?.agent) {
          query = query.ilike('agent', `%${filters.agent}%`);
        }
        
        // Add order by published date (newest first)
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
          // First parse any JSON fields that come as strings
          const parsedItem = parseJsonFields(item, ['results', 'testimonial', 'additional_images', 'tags']);
          
          // Then convert snake_case to camelCase
          return snakeToCamel(parsedItem) as CaseStudy;
        });
        
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
