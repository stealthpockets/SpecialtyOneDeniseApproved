// Testimonial types for Supabase integration

export interface TestimonialData {
  id: number;
  created_at: string;
  person: string;
  property_name?: string | null;
  property_type: string;
  testimonial_text: string;
  placement_type: string;
  is_strongest: boolean;
  can_be_displayed_if_other_from_same_person: boolean;
  is_active: boolean;
  image_url?: string | null;
}

export interface CarouselTestimonialData {
  id: number;
  quote: string; // from testimonial_text
  author: string; // from person
  property?: string; // from property_name
  image_url?: string | null;
  property_type?: string | null;
}

// Placement type constants for consistent querying
export const PLACEMENT_TYPES = {
  HOMEPAGE_CAROUSEL: 'Homepage - Carousel',
  HOMEPAGE_GENERAL: 'Homepage - General Company/Service Testimonial',
  HOMEPAGE_TRUST_METRICS: 'Homepage - Trust Metrics/Success Snippet',
  PROPERTY_SELF_STORAGE: 'Property Type Page - Self-Storage',
  PROPERTY_MANUFACTURED_HOUSING: 'Property Type Page - Manufactured Housing',
  PROPERTY_RV_PARKS: 'Property Type Page - RV Parks',
  SUCCESS_STORIES: 'Success Stories Page / Case Study List Snippet',
  UNCATEGORIZED: 'Uncategorized'
} as const;

export type PlacementType = typeof PLACEMENT_TYPES[keyof typeof PLACEMENT_TYPES];

// Property type constants for fallback image logic
export const PROPERTY_TYPES = {
  SELF_STORAGE: 'Self-Storage',
  MANUFACTURED_HOUSING: 'Manufactured Housing',
  RV_PARK: 'RV Park',
  BUYER_VIEW: 'Buyer View',
  MULTI_ASSET: 'Multi-Asset'
} as const;

export type PropertyType = typeof PROPERTY_TYPES[keyof typeof PROPERTY_TYPES];
