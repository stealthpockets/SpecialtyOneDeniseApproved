import { useState, useEffect, useMemo, useCallback } from 'react';
import { MarketRatesData, MarketRate, FREDRateResponse, RateSeriesConfig, DisplayStrategy } from '../types/marketRates';

// const FRED_API_BASE = 'https://api.stlouisfed.org/fred/series/observations'; // Commented out or remove
const SUPABASE_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fred-proxy`;
const CACHE_KEY = 'specialty_one_market_rates_v3';
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
    return fallbackRates;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Updated to fetch all series data from the proxy in one go
  const fetchAllRatesFromProxy = async (seriesConfigs: RateSeriesConfig[]): Promise<Record<string, { value: string; change?: { direction: 'up' | 'down' | 'same'; percentage: number; previousValue?: string; displayText: string; } }>> => {
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (!supabaseAnonKey) {
      throw new Error('Supabase anon key not configured');
    }    const seriesIds = seriesConfigs.map(s => s.id).join(',');
    const url = `${SUPABASE_FUNCTION_URL}?series_id=${seriesIds}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch rates from proxy: ${response.statusText}`);
    }    const proxyData = await response.json();
    
    const processedRates: Record<string, { value: string; change?: { direction: 'up' | 'down' | 'same'; percentage: number; previousValue?: string; displayText: string; } }> = {};

    for (const seriesConfig of seriesConfigs) {
      const seriesId = seriesConfig.id;
      const seriesData = proxyData[seriesId];

      if (seriesData && seriesData.observations && seriesData.observations.length > 0) {
        // Filter out invalid observations (those with '.' values)
        const validObservations = seriesData.observations.filter((obs: any) => obs.value !== '.');
          if (validObservations.length === 0) {
          processedRates[seriesId] = { value: 'N/A' };
          continue;
        }

        // The proxy returns observations in descending order (most recent first)
        const latestObservation = validObservations[0]; // Most recent
        const previousObservation = validObservations.length > 1 ? validObservations[1] : null;

        const currentValue = parseFloat(latestObservation.value);
        let changeInfo: { direction: 'up' | 'down' | 'same'; percentage: number; previousValue?: string; displayText: string; } | undefined;

        if (previousObservation) {
          const previousValue = parseFloat(previousObservation.value);
          const diff = currentValue - previousValue;
          
          if (!isNaN(diff)) {
            const direction = diff > 0 ? 'up' : diff < 0 ? 'down' : 'same';
            const percentageChange = Math.abs(diff);
            const displayText = `${diff >= 0 ? '+' : ''}${diff.toFixed(2)}%`;
            
            changeInfo = {
              direction,
              percentage: percentageChange,
              previousValue: previousValue.toFixed(2) + '%',
              displayText
            };          } else {
            changeInfo = undefined;
          }
        }
          processedRates[seriesId] = { 
          value: currentValue.toFixed(2) + '%', 
          change: changeInfo 
        };
      } else {
        processedRates[seriesId] = { value: 'N/A' };
      }
    }
    
    return processedRates;
  };

  useEffect(() => {
    if (!enabled) {

      setRates(fallbackRates); // Reset to fallback if disabled
      return;
    }

    const fetchRates = async () => {
      setLoading(true);
      setError(null);


      try {
        // Check cache first
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const parsedCache: MarketRatesData = JSON.parse(cachedData);
          if (new Date().getTime() - new Date(parsedCache.lastFetched).getTime() < CACHE_DURATION) {

            setRates(parsedCache);
            setLoading(false);
            return;
          }

        }

        // Fetch all rates from the proxy
        const fetchedRateDetails = await fetchAllRatesFromProxy(CRE_RATE_SERIES);
        
        const newMarketRates: Record<string, MarketRate> = {};
        const now = new Date().toISOString();

        CRE_RATE_SERIES.forEach(series => {
          const detail = fetchedRateDetails[series.id];
          if (detail) {
            newMarketRates[series.id] = {
              id: series.id,
              label: series.label,
              shortLabel: series.shortLabel,
              value: detail.value,
              change: detail.change,
              lastUpdated: now, // All rates updated at the same time from proxy
              priority: series.priority,
              category: series.category,
            };
          } else {
            // Use fallback for this specific rate if proxy didn't return it
            console.warn(`Using fallback for ${series.id} as it was not in proxy response`);
            const fallbackRate = fallbackRates.rates[series.id];
            if (fallbackRate) {
                newMarketRates[series.id] = { ...fallbackRate, lastUpdated: now };
            }
          }
        });
        
        const newRatesData: MarketRatesData = {
          rates: newMarketRates,
          lastFetched: now,
        };



        setRates(newRatesData);
        localStorage.setItem(CACHE_KEY, JSON.stringify(newRatesData));

      } catch (err: any) {
        console.error('useFREDRates: Error fetching rates:', err);
        setError(err.message || 'Failed to fetch market rates');
        // Fallback to existing (potentially cached or initial) rates on error
        // Or explicitly set to fallbackRates if preferred:
        // setRates(fallbackRates); 
        // console.log('useFREDRates: Using fallback rates due to error');
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [enabled]); // Re-fetch if 'enabled' changes

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

  const sortedRates = useMemo(() => {
    const sr = Object.values(rates.rates).sort((a, b) => a.priority - b.priority);

    return sr;
  }, [rates]);
  const getDisplayRates = useCallback((strategy: DisplayStrategy, screenWidth: number, showMore: boolean): MarketRate[] => {

    let displayableRates: MarketRate[];

    switch (strategy) {
      case 'fixed':
        displayableRates = sortedRates.slice(0, 4); // Always show top 4 (core)
        break;
      case 'responsive':
        if (screenWidth >= 1400) {
          displayableRates = sortedRates.filter(r => r.category === 'core' || r.category === 'extended');
        } else {
          displayableRates = sortedRates.filter(r => r.category === 'core');
        }
        break;
      default: // 'core'
        displayableRates = sortedRates.filter(r => r.category === 'core');
    }
    
    if (showMore) {
        const additionalRates = sortedRates.filter(r => r.category === 'additional');
        // Add additional rates, ensuring no duplicates if they somehow overlapped
        additionalRates.forEach(ar => {
            if (!displayableRates.find(dr => dr.id === ar.id)) {
                displayableRates.push(ar);
            }        });
        // Re-sort to ensure priority is maintained after adding additional rates
        displayableRates.sort((a, b) => a.priority - b.priority);
    }
    

    return displayableRates;
  }, [sortedRates]);

  return { rates: sortedRates, loading, error, getDisplayRates };
};
