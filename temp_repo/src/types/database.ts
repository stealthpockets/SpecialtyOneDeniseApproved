export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      testimonials: {
        Row: {
          id: number;
          created_at: string;
          person: string;
          property_name: string | null;
          property_type: string;
          testimonial_text: string;
          placement_type: string;
          is_strongest: boolean;
          can_be_displayed_if_other_from_same_person: boolean;
          is_active: boolean;
          image_url: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string;
          person: string;
          property_name?: string | null;
          property_type: string;
          testimonial_text: string;
          placement_type: string;
          is_strongest?: boolean;
          can_be_displayed_if_other_from_same_person?: boolean;
          is_active?: boolean;
          image_url?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string;
          person?: string;
          property_name?: string | null;
          property_type?: string;
          testimonial_text?: string;
          placement_type?: string;
          is_strongest?: boolean;
          can_be_displayed_if_other_from_same_person?: boolean;
          is_active?: boolean;
          image_url?: string | null;
        };
      };
      case_studies: {
        Row: {
          id: string;
          slug: string;
          title: string;
          subtitle: string | null;
          location: string;
          property_type: "Manufactured Housing" | "RV Park" | "Self-Storage" | "Multi-Asset";
          status: "completed" | "in-progress" | "confidential";
          site_count: number | null;
          square_footage: number | null;
          sale_price: string | null;
          cap_rate: string | null;
          time_to_sale: string | null;
          challenge: string;
          solution: string;
          results: string[];
          hero_image: string;
          additional_images: string[] | null;
          introduction: string | null;
          detailed_challenge: string | null;
          approach: string | null;
          outcome: string | null;
          testimonial: {
            quote: string;
            author: string;
            title?: string;
            company?: string;
          } | null;
          agent: string;
          agent_image: string | null;
          meta_description: string | null;
          tags: string[] | null;
          created_at: string;
          updated_at: string;
          published_at: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          subtitle?: string | null;
          location: string;
          property_type: "Manufactured Housing" | "RV Park" | "Self-Storage" | "Multi-Asset";
          status?: "completed" | "in-progress" | "confidential";
          site_count?: number | null;
          square_footage?: number | null;
          sale_price?: string | null;
          cap_rate?: string | null;
          time_to_sale?: string | null;
          challenge: string;
          solution: string;
          results: string[];
          hero_image: string;
          additional_images?: string[] | null;
          introduction?: string | null;
          detailed_challenge?: string | null;
          approach?: string | null;
          outcome?: string | null;
          testimonial?: {
            quote: string;
            author: string;
            title?: string;
            company?: string;
          } | null;
          agent: string;
          agent_image?: string | null;
          meta_description?: string | null;
          tags?: string[] | null;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          subtitle?: string | null;
          location?: string;
          property_type?: "Manufactured Housing" | "RV Park" | "Self-Storage" | "Multi-Asset";
          status?: "completed" | "in-progress" | "confidential";
          site_count?: number | null;
          square_footage?: number | null;
          sale_price?: string | null;
          cap_rate?: string | null;
          time_to_sale?: string | null;
          challenge?: string;
          solution?: string;
          results?: string[];
          hero_image?: string;
          additional_images?: string[] | null;
          introduction?: string | null;
          detailed_challenge?: string | null;
          approach?: string | null;
          outcome?: string | null;
          testimonial?: {
            quote: string;
            author: string;
            title?: string;
            company?: string;
          } | null;
          agent?: string;
          agent_image?: string | null;
          meta_description?: string | null;
          tags?: string[] | null;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
