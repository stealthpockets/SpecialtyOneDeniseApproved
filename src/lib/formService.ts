import { supabase } from './supabase';

// Type definitions for form data
export interface ContactFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company?: string;
  property_type?: string;
  inquiry_type?: string;
  message: string;
  preferred_contact?: 'email' | 'phone';
}

export interface BuyerApplicationData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company?: string;
  title: string;
  investment_range: string;
  property_types: string[];
  markets?: string;
  timeline?: string;
  experience?: string;
  references?: string;
  additional_info?: string;
}

export interface SellerInquiryData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  property_type: string;
  property_location?: string;
  ownership_type?: string;
  timeline?: string;
  confidentiality_level?: string;
  current_situation?: string;
  goals?: string;
  additional_info?: string;
}

// Form submission functions
export const submitContactForm = async (formData: ContactFormData) => {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([{
        ...formData,
        preferred_contact: formData.preferred_contact || 'email'
      }])
      .select();

    if (error) {
      console.error('Contact form submission error:', error);
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Contact form submission failed:', error);
    throw error;
  }
};

export const submitBuyerApplication = async (formData: BuyerApplicationData) => {
  try {
    const { data, error } = await supabase
      .from('buyer_applications')
      .insert([formData])
      .select();

    if (error) {
      console.error('Buyer application submission error:', error);
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Buyer application submission failed:', error);
    throw error;
  }
};

export const submitSellerInquiry = async (formData: SellerInquiryData) => {
  try {
    const { data, error } = await supabase
      .from('seller_inquiries')
      .insert([formData])
      .select();

    if (error) {
      console.error('Seller inquiry submission error:', error);
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Seller inquiry submission failed:', error);
    throw error;
  }
};

// Utility function to validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Utility function to format phone number
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};
