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
 * Stagger testimonials by person to maximize name diversity
 * Ensures no person repeats until all other unique persons have been shown
 */
const staggerTestimonialsByPerson = (testimonials: CarouselTestimonialData[]): CarouselTestimonialData[] => {
  if (testimonials.length <= 1) return testimonials;

  // Group testimonials by person (author)
  const groupedByPerson = new Map<string, CarouselTestimonialData[]>();
  
  testimonials.forEach(testimonial => {
    const person = testimonial.author;
    if (!groupedByPerson.has(person)) {
      groupedByPerson.set(person, []);
    }
    groupedByPerson.get(person)!.push(testimonial);
  });

  // Round-robin distribution: take one testimonial from each person per round
  const staggered: CarouselTestimonialData[] = [];
  const maxTestimonials = Math.max(...Array.from(groupedByPerson.values()).map(group => group.length));
  
  for (let round = 0; round < maxTestimonials; round++) {
    for (const [person, personTestimonials] of groupedByPerson) {
      if (personTestimonials[round]) {
        staggered.push(personTestimonials[round]);
      }
    }
  }
  
  console.log('Testimonials staggered by person:', {
    original: testimonials.map(t => t.author),
    staggered: staggered.map(t => t.author),
    uniquePersons: groupedByPerson.size
  });
  
  return staggered;
};

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
        .select('id, testimonial_text, person, property_name, image_url, property_type, placement_type, status, is_strongest')
        .eq('placement_type', placementType)
        .eq('status', 'published')
        .eq('is_strongest', true)
        .is('deleted_at', null)
        .order('is_strongest', { ascending: false })
        .order('created_at', { ascending: true })
        .limit(9);

      if (supabaseError) {
        console.error("Error fetching:", supabaseError);
        throw supabaseError;
      } else {
        console.log("Fetched data:", data);
        console.log("Data length:", data?.length || 0);
        console.log("Placement types found:", data?.map(d => d.placement_type));
        console.log("Statuses found:", data?.map(d => d.status));
        
        // Debug: Show unique placement types
        const uniquePlacementTypes = [...new Set(data?.map(d => d.placement_type) || [])];
        console.log("Unique placement types:", uniquePlacementTypes);
        
        // Debug: Count by placement type
        const placementTypeCounts: Record<string, number> = {};
        data?.forEach(d => {
          placementTypeCounts[d.placement_type] = (placementTypeCounts[d.placement_type] || 0) + 1;
        });
        console.log("Placement type counts:", placementTypeCounts);
        
        // Debug: Filter specifically for Homepage - Carousel
        const homepageCarouselItems = data?.filter(d => d.placement_type === 'Homepage - Carousel') || [];
        console.log("Homepage - Carousel items:", homepageCarouselItems.length);
        console.log("Homepage - Carousel data:", homepageCarouselItems);
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
      
      // Apply staggering to maximize name diversity
      const staggeredTestimonials = staggerTestimonialsByPerson(formattedData);
      setTestimonials(staggeredTestimonials);
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
