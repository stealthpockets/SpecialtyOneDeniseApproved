export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  location: string;
  propertyType: 'Manufactured Housing' | 'RV Park' | 'Self-Storage' | 'Multi-Asset';
  status: 'completed' | 'in-progress' | 'confidential'; // Will be 'confidential' if isConfidential is true
  isConfidential?: boolean; // Maps to DB is_confidential
  
  // Basic Info
  siteCount?: number;
  squareFootage?: number;
  salePrice?: string;
  capRate?: string;
  timeToSale?: string;
  
  // Content
  challenge: string;
  solution: string;
  results: string[];
  
  // Rich Content
  heroImage: string;
  additionalImages?: string[];
  
  // Detailed Story
  introduction?: string;
  detailedChallenge?: string;
  approach?: string;
  outcome?: string;
  
  // Testimonial
  testimonial?: {
    quote: string;
    author: string;
    title?: string;
    company?: string;
  };
  
  // Agent/Team
  agent: string;
  agentImage?: string;
  
  // SEO & Meta
  metaDescription?: string;
  tags?: string[];
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface CaseStudyFilters {
  propertyType?: string;
  status?: 'completed' | 'in-progress'; // 'confidential' status is handled by isConfidential
  agent?: string;
  tags?: string[];
  isConfidential?: boolean; // New filter for confidential deals
}