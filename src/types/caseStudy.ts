export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  location: string;
  property_type: string; // Match DB column name
  propertyType?: 'Manufactured Housing' | 'RV Park' | 'Self-Storage' | 'Multi-Asset'; // Computed from property_type
  status: 'completed' | 'in-progress' | 'confidential';
  is_confidential?: boolean; // Match DB column name
  isConfidential?: boolean; // Computed from is_confidential
  
  // Basic Info
  site_count?: number; // Match DB column name
  siteCount?: number; // Computed from site_count
  square_footage?: number; // Match DB column name
  squareFootage?: number; // Computed from square_footage
  sale_price?: string; // Match DB column name
  salePrice?: string; // Computed from sale_price
  cap_rate?: string; // Match DB column name
  capRate?: string; // Computed from cap_rate
  time_to_sale?: string; // Match DB column name
  timeToSale?: string; // Computed from time_to_sale
  
  // Content
  challenge: string;
  solution: string;
  results: string | string[]; // Can be JSON string or parsed array
  
  // Rich Content
  hero_image: string; // Match DB column name
  heroImage?: string; // Computed from hero_image
  additional_images?: string | string[]; // Match DB column name
  additionalImages?: string[]; // Computed from additional_images
  
  // Detailed Story
  introduction?: string;
  detailed_challenge?: string; // Match DB column name
  detailedChallenge?: string; // Computed from detailed_challenge
  approach?: string;
  outcome?: string;
  
  // Testimonial
  testimonial?: string | {
    quote: string;
    author: string;
    title?: string;
    company?: string;
  };
  
  // Agent/Team
  agent: string;
  agent_image?: string; // Match DB column name
  agentImage?: string; // Computed from agent_image
  
  // SEO & Meta
  meta_description?: string; // Match DB column name
  metaDescription?: string; // Computed from meta_description
  tags?: string | string[]; // Can be JSON string or parsed array
  
  // Timestamps
  created_at: string; // Match DB column name
  createdAt?: string; // Computed from created_at
  updated_at: string; // Match DB column name
  updatedAt?: string; // Computed from updated_at
  published_at?: string; // Match DB column name
  publishedAt?: string; // Computed from published_at
}

export interface CaseStudyFilters {
  propertyType?: string;
  status?: 'completed' | 'in-progress'; // 'confidential' status is handled by isConfidential
  agent?: string;
  tags?: string[];
  isConfidential?: boolean; // New filter for confidential deals
  includeAll?: boolean; // When true, ignores confidential filtering
}