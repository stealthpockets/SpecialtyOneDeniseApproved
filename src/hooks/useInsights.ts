import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Insight, ContentFilters } from '../types/MarketReport';

export const useInsights = (filters?: ContentFilters) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        // Build query with all schema fields and joins (matching useMarketReports)
        let query = supabase
          .from('insights')
          .select(`
            id,
            slug,
            title,
            summary,
            content,
            published_at,
            image_url,
            reading_time,
            is_premium,
            views,
            downloads,
            property_type_id,
            category_id,
            authors (
              id,
              name
            )
          `)
          .eq('status', 'published')
          .is('deleted_at', null)
          .order('published_at', { ascending: false });

        // Apply filters
        if (filters?.propertyTypeId) {
          query = query.eq('property_type_id', filters.propertyTypeId);
        }
        if (filters?.categoryId) {
          query = query.eq('category_id', filters.categoryId);
        }
        if (filters?.isPremium !== undefined) {
          query = query.eq('is_premium', filters.isPremium);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching insights:', error);
          setError('Failed to load insights');
        } else {
          // Transform the data to handle joined arrays 
          const transformedData = (data || []).map(item => ({
            ...item,
            // Add missing required fields for Insight interface
            locale: 'en',
            status: 'published' as const,
            created_at: item.published_at || new Date().toISOString(),
            updated_at: item.published_at || new Date().toISOString(),
            deleted_at: undefined,
            pages: undefined,
            author_id: (item as any).authors?.[0]?.id || undefined,
            // Transform authors array to single object
            authors: Array.isArray((item as any).authors) && (item as any).authors.length > 0 ? (item as any).authors[0] : (item as any).authors,
            // Set property_types and categories to null for now (will add proper joins later)
            property_types: null,
            categories: null,
            tags: []
          }));
          setInsights(transformedData);
        }
      } catch (err) {
        console.error('Error fetching insights:', err);
        setError('Failed to load insights');
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
      try {
        const { data, error } = await supabase
          .from('insights')
          .select(`
            id,
            slug,
            locale,
            title,
            summary,
            content,
            property_type_id,
            category_id,
            author_id,
            status,
            published_at,
            created_at,
            updated_at,
            deleted_at,
            is_premium,
            views,
            downloads,
            reading_time,
            pages,
            image_url,
            authors (
              id,
              name,
              email,
              avatar_url
            ),
            property_types (
              id,
              name,
              parent_id
            ),
            categories (
              id,
              name
            )
          `)
          .eq('slug', slug)
          .eq('status', 'published')
          .is('deleted_at', null)
          .single();

        if (error) {
          console.error('Error fetching insight:', error);
          setError('Insight not found');
          setInsight(null);
        } else {
          // Transform the data to handle joined arrays (matching useMarketReport)
          const transformedData = {
            ...data,
            authors: data.authors && data.authors.length > 0 ? data.authors[0] : null,
            property_types: data.property_types && data.property_types.length > 0 ? data.property_types[0] : null,
            categories: data.categories && data.categories.length > 0 ? data.categories[0] : null
          };
          setInsight(transformedData);
        }
      } catch (err) {
        console.error('Error fetching insight:', err);
        setError('Failed to load insight');
        setInsight(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInsight();
  }, [slug]);

  return { insight, loading, error };
};
