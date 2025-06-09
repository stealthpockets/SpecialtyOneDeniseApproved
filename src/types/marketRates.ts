export interface MarketRate {
  id: string;
  label: string;
  shortLabel?: string;
  value: string;
  change?: {
    direction: 'up' | 'down' | 'same';
    percentage: number;
    previousValue?: string;
    displayText: string;
  };
  lastUpdated: string;
  priority: number;
  category: 'core' | 'extended' | 'additional';
}

export interface FREDRateResponse {
  observations: Array<{
    date: string;
    value: string;
  }>;
}

export interface RateSeriesConfig {
  id: string;
  label: string;
  shortLabel?: string;
  priority: number;
  category: 'core' | 'extended' | 'additional';
}

export interface ResponsiveRateConfig {
  core: string[];
  extended: string[];
  additional: string[];
}

export interface MarketRatesData {
  rates: Record<string, MarketRate>;
  lastFetched: string;
}

export type DisplayStrategy = 'core' | 'extended' | 'all';
