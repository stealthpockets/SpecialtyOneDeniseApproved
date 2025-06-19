// Schema-aligned type definitions for content management system
// Updated to match actual Supabase database schema

export interface Author {
  id: string;
  name: string;
  email?: string;
  avatar_url?: string;
}

export interface PropertyType {
  id: number;
  name: 'Manufactured Housing' | 'RV Parks' | 'Self-Storage' | 'Multi-Asset';
  parent_id?: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

// Base content interface shared by both Insights and Market Reports
export interface BaseContent {
  id: string;
  slug: string;
  locale: string;
  title: string;
  summary?: string;
  content?: string;
  property_type_id?: number;
  category_id?: number;
  author_id?: string;
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  published_at?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  is_premium: boolean;
  views: number;
  downloads: number;  reading_time?: number;
  image_url?: string;
  pdf_url?: string;
  pages?: number; // For reports that have page counts
  
  // Joined data from relationships (nullable because joins may not return data)
  authors?: Author | null;
  property_types?: PropertyType | null;
  categories?: Category | null;
  tags?: Tag[];
}

// Market Report extends base content
export interface MarketReport extends BaseContent {}

// Insight extends base content  
export interface Insight extends BaseContent {}

// Filtering interface for content queries
export interface ContentFilters {
  propertyTypeId?: number;
  categoryId?: number;
  isPremium?: boolean;
  tagIds?: number[];
  search?: string;
}

// Property type constants for easy reference
export const PROPERTY_TYPES = {
  MANUFACTURED_HOUSING: 'Manufactured Housing' as const,
  RV_PARKS: 'RV Parks' as const,
  SELF_STORAGE: 'Self-Storage' as const,
  MULTI_ASSET: 'Multi-Asset' as const,
} as const;

// Raw Supabase response types (before transformation)
export interface SupabaseContentResponse {
  id: string;
  slug: string;
  locale: string;
  title: string;
  summary?: string;
  content?: string;
  property_type_id?: number;
  category_id?: number;
  author_id?: string;
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  published_at?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  is_premium: boolean;
  views: number;
  downloads: number;
  reading_time?: number;
  image_url?: string;
  pdf_url?: string;
  pages?: number;
  // Raw joined arrays from Supabase (before transformation)
  authors?: Author[] | Author | null;
  property_types?: PropertyType[] | PropertyType | null;
  categories?: Category[] | Category | null;
  tags?: Tag[];
}
