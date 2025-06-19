import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MarketReport, ContentFilters } from '../types/MarketReport';

export const useMarketReports = (filters?: ContentFilters) => {
  const [marketReports, setMarketReports] = useState<MarketReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketReports = async () => {
      try {
        // Build query with all schema fields and joins
        let query = supabase
          .from('market_reports')
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
          console.error('Error fetching market reports:', error);
          setError('Failed to load market reports');
        } else {          // Transform the data to handle authors array (Supabase returns array even for single join)
          const transformedData = (data || []).map((item: any) => {
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
              status: (item.status as MarketReport['status']) || 'published',
              created_at: item.created_at || item.published_at || new Date().toISOString(),
              updated_at: item.updated_at || item.published_at || new Date().toISOString(),
              deleted_at: item.deleted_at || undefined,
              author_id: singleAuthor?.id || item.author_id,
              authors: singleAuthor,
              property_types: singlePropertyType,
              categories: singleCategory,
              tags: item.tags || []
            };
          });
          setMarketReports(transformedData);
        }
      } catch (err) {
        console.error('Error fetching market reports:', err);
        setError('Failed to load market reports');
      } finally {
        setLoading(false);
      }
    };

    fetchMarketReports();
  }, [filters]);

  return { marketReports, loading, error };
};

export const useMarketReport = (slug: string) => {
  const [marketReport, setMarketReport] = useState<MarketReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketReport = async () => {
      try {
        const { data, error } = await supabase
          .from('market_reports')
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
          console.error('Error fetching market report:', error);
          setError('Market report not found');
          setMarketReport(null);        } else {
          // Transform the data to handle joined arrays
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

          const transformedData = {
            ...item,
            locale: item.locale || 'en',
            status: (item.status as MarketReport['status']) || 'published',
            created_at: item.created_at || item.published_at || new Date().toISOString(),
            updated_at: item.updated_at || item.published_at || new Date().toISOString(),
            deleted_at: item.deleted_at || undefined,
            author_id: singleAuthor?.id || item.author_id,
            authors: singleAuthor,
            property_types: singlePropertyType,
            categories: singleCategory,
            tags: item.tags || []
          };
          setMarketReport(transformedData);
        }
      } catch (err) {
        console.error('Error fetching market report:', err);
        setError('Failed to load market report');
        setMarketReport(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketReport();
  }, [slug]);

  return { marketReport, loading, error };
};
