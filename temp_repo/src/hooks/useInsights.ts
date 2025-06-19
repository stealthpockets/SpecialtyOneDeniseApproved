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
          .order('published_at', { ascending: false });

        // Apply filters if provided
        if (filters?.propertyType) {
          query = query.eq('property_type_id', filters.propertyType);
        }

        if (filters?.category) {
          query = query.eq('category_id', filters.category);
        }

        if (filters?.searchQuery) {
          query = query.or(`title.ilike.%${filters.searchQuery}%,summary.ilike.%${filters.searchQuery}%,content.ilike.%${filters.searchQuery}%`);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        if (data) {
          const transformedData: Insight[] = data.map((item: any): Insight => ({
            ...item,
            property_type_id: item.property_type_id || undefined,
            category_id: item.category_id || undefined,
            author_id: (item as any).authors?.[0]?.id || undefined,
            locale: 'en',
            status: 'published' as const,
            created_at: item.published_at || new Date().toISOString(),
            updated_at: item.published_at || new Date().toISOString(),
            deleted_at: undefined,
            pages: undefined,
            // Transform joined arrays to single objects
            authors: Array.isArray((item as any).authors) && (item as any).authors.length > 0 ? (item as any).authors[0] : (item as any).authors,
            property_types: Array.isArray((item as any).property_types) && (item as any).property_types.length > 0 ? (item as any).property_types[0] : (item as any).property_types,
            categories: Array.isArray((item as any).categories) && (item as any).categories.length > 0 ? (item as any).categories[0] : (item as any).categories,
            tags: []
          }));          setInsights(transformedData);
        }
      } catch (err) {
        console.error('Error fetching insights:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch insights');
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
        }

        if (data) {
          const transformedData: Insight = {
            ...data,
            property_type_id: data.property_type_id || undefined,
            category_id: data.category_id || undefined,
            author_id: (data as any).authors?.[0]?.id || undefined,
            locale: 'en',
            status: 'published' as const,
            created_at: data.published_at || new Date().toISOString(),
            updated_at: data.published_at || new Date().toISOString(),
            deleted_at: undefined,
            pages: undefined,
            // Transform joined arrays to single objects
            authors: Array.isArray((data as any).authors) && (data as any).authors.length > 0 ? (data as any).authors[0] : (data as any).authors,
            property_types: Array.isArray((data as any).property_types) && (data as any).property_types.length > 0 ? (data as any).property_types[0] : (data as any).property_types,
            categories: Array.isArray((data as any).categories) && (data as any).categories.length > 0 ? (data as any).categories[0] : (data as any).categories,
            tags: []
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
