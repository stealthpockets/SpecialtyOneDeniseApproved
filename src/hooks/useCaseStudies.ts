import { useState, useEffect } from 'react';
import { CaseStudy, CaseStudyFilters } from '../types/caseStudy';

// Mock data - replace with actual Supabase queries
const mockCaseStudies: CaseStudy[] = [
  {
    id: '1',
    slug: 'caravan-oasis',
    title: 'Caravan Oasis',
    subtitle: 'Complex Utilities, Clean Close',
    location: 'Yuma, AZ',
    propertyType: 'RV Park',
    status: 'completed',
    siteCount: 550,
    timeToSale: '45 Days',
    challenge: 'Mixed waste issues and high operating costs threatened the sale.',
    solution: 'Resolved ADEQ concerns and found a buyer who saw the potential.',
    results: [
      '$20,000+ annual cost savings',
      'Resolved complex waste management',
      'Clean close despite challenges'
    ],
    heroImage: '/dist/assets/success-stories/caravan-oasis.webp',
    agent: 'Russ Warner and Andrew Warner',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    publishedAt: '2024-01-15'
  },
  {
    id: '2',
    slug: 'desert-trails-rv-park',
    title: 'Desert Trails RV Park',
    subtitle: 'Full Price Despite COVID & Zoning',
    location: 'Tucson, AZ',
    propertyType: 'RV Park',
    status: 'completed',
    siteCount: 200,
    timeToSale: '30 Days',
    challenge: 'Zoning issues and COVID uncertainty threatened the deal.',
    solution: 'Structured clean terms and found the right buyer—closed at full price.',
    results: [
      'Closed at full asking price during COVID',
      'Resolved complex zoning challenges',
      'Zero price adjustments or retrades'
    ],
    heroImage: '/dist/assets/success-stories/desert-trails.webp',
    agent: 'Andrew Warner',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
    publishedAt: '2024-01-10'
  },
  {
    id: '3',
    slug: 'the-palms',
    title: 'The Palms',
    subtitle: '80+ Offers, Sub-3% Cap Rate',
    location: 'Apache Junction, AZ',
    propertyType: 'Manufactured Housing',
    status: 'completed',
    siteCount: 88,
    capRate: '<3%',
    timeToSale: '60 Days',
    challenge: 'Needed maximum value while maintaining confidentiality.',
    solution: 'Generated 80+ qualified offers through targeted marketing.',
    results: [
      'Achieved sub-3% cap rate',
      '80+ qualified offers',
      'Seamless, confidential process'
    ],
    heroImage: '/dist/assets/success-stories/the-palms.webp',
    agent: 'Andrew Warner',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
    publishedAt: '2024-01-05'
  }
];

export const useCaseStudies = (filters?: CaseStudyFilters) => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        setLoading(true);
        
        // TODO: Replace with actual Supabase query
        // let query = supabase
        //   .from('case_studies')
        //   .select('*')
        //   .eq('status', 'completed')
        //   .order('published_at', { ascending: false });
        
        // if (filters?.propertyType) {
        //   query = query.eq('property_type', filters.propertyType);
        // }
        
        // if (filters?.agent) {
        //   query = query.ilike('agent', `%${filters.agent}%`);
        // }
        
        // const { data, error } = await query;
        
        // Mock implementation
        let filteredStudies = [...mockCaseStudies];
        
        if (filters?.propertyType) {
          filteredStudies = filteredStudies.filter(
            study => study.propertyType === filters.propertyType
          );
        }
        
        if (filters?.agent) {
          filteredStudies = filteredStudies.filter(
            study => study.agent.toLowerCase().includes(filters.agent!.toLowerCase())
          );
        }
        
        setCaseStudies(filteredStudies);
        setError(null);
      } catch (err) {
        setError('Failed to fetch case studies');
        console.error('Error fetching case studies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, [filters]);

  return { caseStudies, loading, error };
};

export const useCaseStudy = (slug: string) => {
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        setLoading(true);
        
        // TODO: Replace with actual Supabase query
        // const { data, error } = await supabase
        //   .from('case_studies')
        //   .select('*')
        //   .eq('slug', slug)
        //   .single();
        
        // Mock implementation
        const foundStudy = mockCaseStudies.find(study => study.slug === slug);
        setCaseStudy(foundStudy || null);
        setError(foundStudy ? null : 'Case study not found');
      } catch (err) {
        setError('Failed to fetch case study');
        console.error('Error fetching case study:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCaseStudy();
    }
  }, [slug]);

  return { caseStudy, loading, error };
};