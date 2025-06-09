import { useState, useEffect, useMemo } from 'react';
import { MarketRatesData, MarketRate, FREDRateResponse, RateSeriesConfig, DisplayStrategy } from '../types/marketRates';

const FRED_API_BASE = 'https://api.stlouisfed.org/fred/series/observations';
const CACHE_KEY = 'specialty_one_market_rates';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Enhanced CRE-focused rate series configuration
const CRE_RATE_SERIES: RateSeriesConfig[] = [
  // Core rates (always visible) - Priority 1-4
  { id: 'DPRIME', label: 'Prime Rate', shortLabel: 'Prime', priority: 1, category: 'core' },
  { id: 'DGS10', label: '10Y Treasury', shortLabel: '10Y T', priority: 2, category: 'core' },
  { id: 'MORTGAGE30US', label: '30Y Mortgage', shortLabel: '30Y', priority: 3, category: 'core' },
  { id: 'SOFR', label: 'SOFR', shortLabel: 'SOFR', priority: 4, category: 'core' },
  
  // Extended rates (≥1400px) - Priority 5-6
  { id: 'DGS5', label: '5Y Treasury', shortLabel: '5Y T', priority: 5, category: 'extended' },
  { id: 'DCPN3M', label: 'Commercial Paper', shortLabel: 'Comm', priority: 6, category: 'extended' },
  
  // Additional rates (Show More) - Priority 7-9
  { id: 'SOFR30DAYAVG', label: '1-Mo SOFR Avg', shortLabel: '1M SOFR', priority: 7, category: 'additional' },
  { id: 'SOFR90DAYAVG', label: '3-Mo SOFR Avg', shortLabel: '3M SOFR', priority: 8, category: 'additional' },
  { id: 'DGS3', label: '3Y Treasury', shortLabel: '3Y T', priority: 9, category: 'additional' }
];

// Enhanced fallback data with all 9 CRE-focused rates
const createFallbackRates = (): MarketRatesData => {
  const now = new Date().toISOString();
  const rates: Record<string, MarketRate> = {};
  
  // Create fallback data for each rate series
  const fallbackData = [
    { id: 'DPRIME', value: '8.50%', change: { direction: 'up' as const, percentage: 0.25, displayText: '+0.25%' }},
    { id: 'DGS10', value: '4.33%', change: { direction: 'down' as const, percentage: 0.12, displayText: '-0.12%' }},
    { id: 'MORTGAGE30US', value: '7.12%', change: { direction: 'up' as const, percentage: 0.08, displayText: '+0.08%' }},
    { id: 'SOFR', value: '5.40%', change: { direction: 'same' as const, percentage: 0.00, displayText: '—' }},
    { id: 'DGS5', value: '4.15%', change: { direction: 'down' as const, percentage: 0.05, displayText: '-0.05%' }},
    { id: 'DCPN3M', value: '5.85%', change: { direction: 'up' as const, percentage: 0.15, displayText: '+0.15%' }},
    { id: 'SOFR30DAYAVG', value: '5.38%', change: { direction: 'same' as const, percentage: 0.02, displayText: '+0.02%' }},
    { id: 'SOFR90DAYAVG', value: '5.35%', change: { direction: 'down' as const, percentage: 0.03, displayText: '-0.03%' }},
    { id: 'DGS3', value: '4.05%', change: { direction: 'up' as const, percentage: 0.07, displayText: '+0.07%' }}
  ];
  
  CRE_RATE_SERIES.forEach(series => {
    const fallback = fallbackData.find(f => f.id === series.id);
    if (fallback) {
      rates[series.id] = {
        id: series.id,
        label: series.label,
        shortLabel: series.shortLabel,
        value: fallback.value,
        change: fallback.change,
        lastUpdated: now,
        priority: series.priority,
        category: series.category
      };
    }
  });
  
  return {
    rates,
    lastFetched: now
  };
};

const fallbackRates = createFallbackRates();

export const useFREDRates = (enabled: boolean = true) => {
  const [rates, setRates] = useState<MarketRatesData>(() => {
    console.log('useFREDRates: Initializing with fallback rates', { ratesCount: Object.keys(fallbackRates.rates).length });
    return fallbackRates;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRateFromFRED = async (seriesId: string): Promise<{ value: string; change?: { direction: 'up' | 'down' | 'same'; percentage: number; previousValue?: string; displayText: string; } }> => {
    const apiKey = import.meta.env.VITE_FRED_API_KEY;
    if (!apiKey) {
      throw new Error('FRED API key not configured');
    }

    // Fetch last 10 observations to get current and previous values
    const url = `${FRED_API_BASE}?series_id=${seriesId}&api_key=${apiKey}&file_type=json&limit=10&sort_order=desc`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${seriesId}: ${response.statusText}`);
    }

    const data: FREDRateResponse = await response.json();
    
    if (!data.observations || data.observations.length === 0) {
      throw new Error(`No data available for ${seriesId}`);
    }

    // Filter out invalid values and get the two most recent valid observations
    const validObservations = data.observations.filter(obs => obs.value !== '.');
    
    if (validObservations.length === 0) {
      return { value: 'N/A' };
    }

    const currentValue = parseFloat(validObservations[0].value);
    const formattedValue = `${currentValue.toFixed(2)}%`;

    // Calculate change if we have a previous value
    if (validObservations.length > 1) {
      const previousValue = parseFloat(validObservations[1].value);
      const changeAmount = currentValue - previousValue;
      const changePercentage = Math.abs(changeAmount);
      
      let direction: 'up' | 'down' | 'same' = 'same';
      if (changeAmount > 0.01) direction = 'up';
      else if (changeAmount < -0.01) direction = 'down';
      
      const displayText = changePercentage > 0.01 ? 
        `${direction === 'up' ? '+' : ''}${changeAmount.toFixed(2)}%` : 
        '—';

      return {
        value: formattedValue,
        change: {
          direction,
          percentage: changePercentage,
          previousValue: `${previousValue.toFixed(2)}%`,
          displayText
        }
      };
    }

    return { value: formattedValue };
  };

  const fetchAllRates = async (): Promise<MarketRatesData> => {
    try {
      const now = new Date().toISOString();
      const rates: Record<string, MarketRate> = {};

      // Fetch all rate series in parallel
      const ratePromises = CRE_RATE_SERIES.map(async (series) => {
        try {
          const rateData = await fetchRateFromFRED(series.id);
          return {
            seriesId: series.id,
            data: rateData,
            config: series
          };
        } catch (error) {
          console.warn(`Failed to fetch ${series.id}:`, error);
          // Return fallback data for this specific rate INCLUDING change data
          const fallback = fallbackRates.rates[series.id];
          return {
            seriesId: series.id,
            data: { 
              value: fallback?.value || 'N/A',
              change: fallback?.change  // 🔧 FIX: Include change data from fallback
            },
            config: series
          };
        }
      });

      const results = await Promise.all(ratePromises);

      // Process results into rates object
      results.forEach(({ seriesId, data, config }) => {
        rates[seriesId] = {
          id: seriesId,
          label: config.label,
          shortLabel: config.shortLabel,
          value: data.value,
          change: data.change,
          lastUpdated: now,
          priority: config.priority,
          category: config.category
        };
      });

      return {
        rates,
        lastFetched: now
      };
    } catch (error) {
      console.warn('Failed to fetch FRED rates, using fallback data:', error);
      return fallbackRates;
    }
  };

  const loadCachedRates = (): MarketRatesData | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) {
        console.log('useFREDRates: No cache found in localStorage');
        return null;
      }

      const data = JSON.parse(cached);
      
      // Validate cache structure
      if (!data || !data.rates || !data.lastFetched) {
        console.log('useFREDRates: Invalid cache structure, clearing cache');
        localStorage.removeItem(CACHE_KEY);
        return null;
      }

      const cacheAge = Date.now() - new Date(data.lastFetched).getTime();
      
      if (cacheAge > CACHE_DURATION) {
        console.log('useFREDRates: Cache expired, removing');
        localStorage.removeItem(CACHE_KEY);
        return null;
      }

      console.log('useFREDRates: Valid cache found', {
        age: Math.round(cacheAge / 1000 / 60), // minutes
        ratesCount: Object.keys(data.rates).length
      });

      return data;
    } catch (error) {
      console.warn('useFREDRates: Error loading cached rates:', error);
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
  };

  const cacheRates = (data: MarketRatesData) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn('Error caching rates:', error);
    }
  };

  useEffect(() => {
    if (!enabled) {
      console.log('useFREDRates: Hook disabled, not fetching rates');
      return;
    }

    const loadRates = async () => {
      console.log('useFREDRates: Starting to load rates...');
      setLoading(true);
      setError(null);

      // Try to load from cache first
      console.log('useFREDRates: Checking cache...');
      const cachedRates = loadCachedRates();
      if (cachedRates && cachedRates.rates) {
        console.log('useFREDRates: Found cached rates', { 
          ratesCount: Object.keys(cachedRates.rates).length 
        });
        setRates(cachedRates);
        setLoading(false);
        return;
      }

      console.log('useFREDRates: No cache found, fetching fresh data...');
      // Fetch fresh data
      try {
        const freshRates = await fetchAllRates();
        console.log('useFREDRates: Fresh rates fetched', { ratesCount: Object.keys(freshRates.rates).length });
        setRates(freshRates);
        cacheRates(freshRates);
      } catch (err) {
        console.error('useFREDRates: Error fetching rates', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch market rates');
        console.log('useFREDRates: Using fallback rates', { ratesCount: Object.keys(fallbackRates.rates).length });
        setRates(fallbackRates);
      } finally {
        setLoading(false);
        console.log('useFREDRates: Loading complete');
      }
    };

    loadRates();
  }, [enabled]);

  // Helper function to get display strategy based on screen width
  const getDisplayStrategy = useMemo(() => {
    return (screenWidth: number, showAll: boolean): DisplayStrategy => {
      if (showAll) return 'all';
      if (screenWidth >= 1400) return 'extended';
      return 'core';
    };
  }, []);

  // Helper function to filter rates by display strategy
  const getDisplayedRates = useMemo(() => {
    return (allRates: Record<string, MarketRate>, screenWidth: number, showAll: boolean): MarketRate[] => {
      const strategy = getDisplayStrategy(screenWidth, showAll);
      
      let filteredRates: MarketRate[];
      
      switch (strategy) {
        case 'all':
          filteredRates = Object.values(allRates);
          break;
        case 'extended':
          filteredRates = Object.values(allRates).filter(rate => 
            rate.category === 'core' || rate.category === 'extended'
          );
          break;
        case 'core':
        default:
          filteredRates = Object.values(allRates).filter(rate => 
            rate.category === 'core'
          );
          break;
      }
      
      // Sort by priority
      return filteredRates.sort((a, b) => a.priority - b.priority);
    };
  }, [getDisplayStrategy]);

  return { 
    rates, 
    loading, 
    error, 
    getDisplayedRates,
    getDisplayStrategy 
  };
};
