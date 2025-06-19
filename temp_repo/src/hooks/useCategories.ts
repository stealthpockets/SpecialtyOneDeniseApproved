import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Category } from '../types/MarketReport';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('id, name')
          .order('name');
        if (error) {
          setError('Failed to load categories');
        } else {
          setCategories(data || []);
        }
      } catch (err) {
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Helper function to get category ID by name
  const getCategoryId = (name: string): number | null => {
    const category = categories.find(cat => cat.name === name);
    return category ? category.id : null;
  };

  // Helper function to get category name by ID
  const getCategoryName = (id: number): string | null => {
    const category = categories.find(cat => cat.id === id);
    return category ? category.name : null;
  };

  return { categories, loading, error, getCategoryId, getCategoryName };
};
