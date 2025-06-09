import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useFREDRates } from '../../hooks/useFREDRates';
import { MarketRate } from '../../types/marketRates';

interface MarketRateBarProps {
  isDesktop: boolean;
}

const RateDisplay: React.FC<{ rate: MarketRate }> = ({ rate }) => {
  const getTrendColor = (direction?: 'up' | 'down' | 'same'): string => {
    switch (direction) {
      case 'up': return 'text-red-400'; // Red for rate increases
      case 'down': return 'text-green-400'; // Green for rate decreases  
      case 'same': return 'text-gray-400'; // Gray for no change
      default: return 'text-gray-400';
    }
  };

  const getTrendIcon = (direction?: 'up' | 'down' | 'same') => {
    switch (direction) {
      case 'up': return <TrendingUp className="w-3 h-3" />;
      case 'down': return <TrendingDown className="w-3 h-3" />;
      case 'same': return <Minus className="w-3 h-3" />;
      default: return <Minus className="w-3 h-3" />;
    }
  };

  return (
    <div className="flex flex-col items-center space-y-1 min-w-[80px]">
      {/* Rate Value - Most Prominent */}
      <span className="font-bold text-sand text-base leading-tight">
        {rate.value}
      </span>
      
      {/* Rate Label - Abbreviated, Smaller */}
      <span className="text-sage font-medium text-xs text-center leading-tight">
        {rate.shortLabel || rate.label}
      </span>
      
      {/* Trend Indicator - Compact */}
      {rate.change && (
        <div className={`flex items-center space-x-1 ${getTrendColor(rate.change.direction)}`}>
          {getTrendIcon(rate.change.direction)}
          <span className="text-xs font-medium">
            {rate.change.displayText}
          </span>
        </div>
      )}
    </div>
  );
};

export const MarketRateBar: React.FC<MarketRateBarProps> = ({ isDesktop }) => {
  const { rates, loading, error } = useFREDRates(isDesktop);
  const [isVisible, setIsVisible] = useState(true);

  // Smart scroll functionality for market rate bar only
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Hide market rate bar when scrolling down
      } else {
        setIsVisible(true); // Show market rate bar when scrolling up
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get all rates sorted by priority - no responsive logic needed
  const allRates = rates.rates ? Object.values(rates.rates).sort((a, b) => a.priority - b.priority) : [];

  if (!isDesktop) {
    return null;
  }

  return (
    <div className={`fixed top-[72px] left-0 right-0 z-[90] bg-obsidian/95 backdrop-blur-sm border-b border-gray-800/50 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container-custom py-3">
        <div className="flex justify-center space-x-4 lg:space-x-6 py-1 px-4">
          {loading ? (
            <div className="animate-pulse flex items-center space-x-2 text-sage">
              <div className="w-4 h-4 bg-sage/30 rounded animate-pulse"></div>
              <span className="text-sm">Loading market data...</span>
            </div>
          ) : error ? (
            <div className="text-red-400 flex items-center space-x-2">
              <Minus size={14} className="text-red-400" />
              <span className="text-sm">Market Data Error: {error}</span>
            </div>
          ) : !rates.rates || Object.keys(rates.rates).length === 0 ? (
            <div className="text-yellow-400 flex items-center space-x-2">
              <Minus size={14} className="text-yellow-400" />
              <span className="text-sm">No Rate Data Available</span>
            </div>
          ) : (
            <>
              {/* Display all rates with visual indicators */}
              {allRates.map((rate, index) => (
                <React.Fragment key={rate.id}>
                  <RateDisplay rate={rate} />
                  {index < allRates.length - 1 && (
                    <div className="w-px h-8 bg-sage/30"></div>
                  )}
                </React.Fragment>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
