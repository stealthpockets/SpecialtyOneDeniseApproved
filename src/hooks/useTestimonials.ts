import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { CarouselTestimonialData } from '../types/testimonial';

interface UseTestimonialsReturn {
  testimonials: CarouselTestimonialData[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch testimonials from Supabase by placement type
 */
export const useTestimonials = (placementType: string): UseTestimonialsReturn => {
  const [testimonials, setTestimonials] = useState<CarouselTestimonialData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching testimonials...");
      console.log("placement_type:", placementType);

      const { data, error: supabaseError } = await supabase
        .from('testimonials')
        .select('id, testimonial_text, person, property_name, image_url, property_type')
        .eq('placement_type', placementType)
        .eq('is_active', true)
        .order('is_strongest', { ascending: false })
        .order('created_at', { ascending: true });

      if (supabaseError) {
        console.error("Error fetching:", supabaseError);
        throw supabaseError;
      } else {
        console.log("Fetched data:", data);
        console.log("Data length:", data?.length || 0);
      }

      // Transform Supabase data to component format
      const formattedData: CarouselTestimonialData[] = data?.map((item: any) => ({
        id: item.id,
        quote: item.testimonial_text,
        author: item.person,
        property: item.property_name || undefined,
        image_url: item.image_url,
        property_type: item.property_type,
      })) || [];

      console.log("Formatted testimonials:", formattedData);
      setTestimonials(formattedData);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch testimonials');
      
      // Fallback to empty array on error
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [placementType]);

  return {
    testimonials,
    loading,
    error,
    refetch: fetchTestimonials
  };
};

/**
 * Hook specifically for homepage carousel testimonials
 */
export const useCarouselTestimonials = () => {
  return useTestimonials('Homepage - Carousel');
};

/**
 * Hook for property type page testimonials
 */
export const usePropertyTypeTestimonials = (propertyType: 'Self-Storage' | 'Manufactured Housing' | 'RV Parks') => {
  return useTestimonials(`Property Type Page - ${propertyType}`);
};

/**
 * Hook for trust metrics testimonials
 */
export const useTrustMetricsTestimonials = () => {
  return useTestimonials('Homepage - Trust Metrics/Success Snippet');
};

/**
 * Hook for success stories page testimonials
 */
export const useSuccessStoriesTestimonials = () => {
  return useTestimonials('Success Stories Page / Case Study List Snippet');
};
