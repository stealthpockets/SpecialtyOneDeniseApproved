import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { PropertyType } from '../types/MarketReport';

export const usePropertyTypes = () => {
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const { data, error } = await supabase
          .from('property_types')
          .select('id, name, parent_id')
          .order('name');

        if (error) {
          console.error('Error fetching property types:', error);
          setError('Failed to load property types');
        } else {
          setPropertyTypes(data || []);
        }
      } catch (err) {
        console.error('Error fetching property types:', err);
        setError('Failed to load property types');
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyTypes();
  }, []);

  // Helper function to get property type ID by name
  const getPropertyTypeId = (name: string): number | null => {
    const propertyType = propertyTypes.find(pt => pt.name === name);
    return propertyType ? propertyType.id : null;
  };

  // Helper function to get property type name by ID
  const getPropertyTypeName = (id: number): string | null => {
    const propertyType = propertyTypes.find(pt => pt.id === id);
    return propertyType ? propertyType.name : null;
  };

  return { 
    propertyTypes, 
    loading, 
    error, 
    getPropertyTypeId, 
    getPropertyTypeName 
  };
};
