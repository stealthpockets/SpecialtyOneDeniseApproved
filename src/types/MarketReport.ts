export interface MarketReport {
  type: 'Quarterly' | 'Annual' | 'Special' | 'Market Update';
  propertyType: 'Manufactured Housing' | 'RV Parks' | 'Self-Storage' | 'Multi-Asset';
  date: string;
  quarter?: string;
  year: number;
  title: string; // Added title property
  description: string;
  keyInsights: string[];
  downloadUrl?: string;
  isPremium?: boolean;
  image: string;
  pages?: number;
}
