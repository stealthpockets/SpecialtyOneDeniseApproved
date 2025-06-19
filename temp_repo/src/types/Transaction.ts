export interface Transaction {
  rank: number;
  classification: 'MH' | 'RV' | 'SS';
  property: string;
  address: string;
  location?: string;
  size_nrsf?: number;
  units?: number;
  sale_price?: number;
  date_sold?: string;
  latitude: number;
  longitude: number;
}

export interface ClassificationInfo {
  label: string;
  color: string;
  bgColor: string;
  description: string;
}

export const CLASSIFICATION_MAP: Record<string, ClassificationInfo> = {
  MH: {
    label: 'Mobile Home',
    color: 'text-evergreen',
    bgColor: 'bg-gradient-to-r from-evergreen/20 to-sage/20 border border-evergreen/30',
    description: 'Mobile Home Communities'
  },
  RV: {
    label: 'RV Park',
    color: 'text-plum',
    bgColor: 'bg-gradient-to-r from-plum/20 to-amethyst/20 border border-plum/30',
    description: 'RV Parks & Resorts'
  },
  SS: {
    label: 'Self Storage',
    color: 'text-amethyst',
    bgColor: 'bg-gradient-to-r from-amethyst/20 to-plum/20 border border-amethyst/30',
    description: 'Self Storage Facilities'
  }
};
