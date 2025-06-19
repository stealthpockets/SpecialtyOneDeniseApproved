import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Insight, ContentFilters } from '../types/MarketReport';

export const useInsights = (filters?: ContentFilters) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        setError(null);let query = supabase
          .from('insights')
          .select(`
            id,
            slug,
            title,
            summary,
            content,
            published_at,
            image_url,
            pdf_url,
            reading_time,
            is_premium,
            views,
            downloads,
            property_type_id,
            category_id,
            authors (id, name),
            property_types (id, name),
            categories (id, name)
          `)
          .eq('status', 'published')
          .is('deleted_at', null)
          .order('published_at', { ascending: false });        // Apply filters if provided
        if (filters?.propertyTypeId) {
          query = query.eq('property_type_id', filters.propertyTypeId);
        }

        if (filters?.categoryId) {
          query = query.eq('category_id', filters.categoryId);
        }

        if (filters?.search) {
          query = query.or(`title.ilike.%${filters.search}%,summary.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }        if (data) {
          // Transform raw Supabase data to proper Insight format
          const transformedData: Insight[] = data.map((item: any): Insight => {
            // Handle joined data arrays properly
            const singleAuthor = Array.isArray(item.authors) && item.authors.length > 0 
              ? item.authors[0] 
              : (item.authors && !Array.isArray(item.authors) ? item.authors : null);
            
            const singlePropertyType = Array.isArray(item.property_types) && item.property_types.length > 0 
              ? item.property_types[0] 
              : (item.property_types && !Array.isArray(item.property_types) ? item.property_types : null);
            
            const singleCategory = Array.isArray(item.categories) && item.categories.length > 0 
              ? item.categories[0] 
              : (item.categories && !Array.isArray(item.categories) ? item.categories : null);

            return {
              ...item,
              locale: item.locale || 'en',
              status: (item.status as Insight['status']) || 'published',
              created_at: item.created_at || item.published_at || new Date().toISOString(),
              updated_at: item.updated_at || item.published_at || new Date().toISOString(),
              deleted_at: item.deleted_at || undefined,
              author_id: singleAuthor?.id || item.author_id,
              authors: singleAuthor,
              property_types: singlePropertyType,
              categories: singleCategory,
              tags: item.tags || []
            };
          });setInsights(transformedData);
        }
      } catch (err) {
        console.error('Error fetching insights:', err);
        setError('Failed to fetch insights. Please try again later.');
        setInsights([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [filters]);

  return { insights, loading, error };
};

export const useInsight = (slug: string) => {
  const [insight, setInsight] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsight = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);        const { data, error } = await supabase
          .from('insights')
          .select(`
            id,
            slug,
            title,
            summary,
            content,
            published_at,
            image_url,
            pdf_url,
            reading_time,
            is_premium,
            views,
            downloads,
            property_type_id,
            category_id,
            authors (id, name),
            property_types (id, name),
            categories (id, name)
          `)
          .eq('slug', slug)
          .eq('status', 'published')
          .is('deleted_at', null)
          .single();

        if (error) {
          throw error;
        }        if (data) {
          // Transform single insight data (with type assertion for missing fields)
          const item = data as any;
          const singleAuthor = Array.isArray(item.authors) && item.authors.length > 0 
            ? item.authors[0] 
            : (item.authors && !Array.isArray(item.authors) ? item.authors : null);
          
          const singlePropertyType = Array.isArray(item.property_types) && item.property_types.length > 0 
            ? item.property_types[0] 
            : (item.property_types && !Array.isArray(item.property_types) ? item.property_types : null);
          
          const singleCategory = Array.isArray(item.categories) && item.categories.length > 0 
            ? item.categories[0] 
            : (item.categories && !Array.isArray(item.categories) ? item.categories : null);

          const transformedData: Insight = {
            ...item,
            locale: item.locale || 'en',
            status: (item.status as Insight['status']) || 'published',
            created_at: item.created_at || item.published_at || new Date().toISOString(),
            updated_at: item.updated_at || item.published_at || new Date().toISOString(),
            deleted_at: item.deleted_at || undefined,
            author_id: singleAuthor?.id || item.author_id,
            authors: singleAuthor,
            property_types: singlePropertyType,
            categories: singleCategory,
            tags: item.tags || []
          };
          setInsight(transformedData);
        }
      } catch (err) {
        console.error('Error fetching insight:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch insight');
        setInsight(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInsight();
  }, [slug]);

  return { insight, loading, error };
};
