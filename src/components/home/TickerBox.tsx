import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'; // Added useMemo
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useFREDRates } from '../../hooks/useFREDRates';
import { MarketRate } from '../../types/marketRates';

interface TickerBoxProps {}

interface RateCategory {
  name: string;
  displayName: string;
  rates: MarketRate[];
}

interface RateDisplayProps { // Added interface for RateDisplay props
  rate: MarketRate;
  onMouseEnterRate: () => void;
  onMouseLeaveRate: () => void;
}

const RateDisplay: React.FC<RateDisplayProps> = React.memo(({ rate, onMouseEnterRate, onMouseLeaveRate }) => { // Wrapped with React.memo and added props
  const getTrendColor = (direction?: 'up' | 'down' | 'same'): string => {
    switch (direction) {
      case 'up': return 'text-green-400'; // Changed to green for up
      case 'down': return 'text-red-400';   // Changed to red for down
      case 'same': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getTrendIcon = (direction?: 'up' | 'down' | 'same') => {
    switch (direction) {
      case 'up': return <TrendingUp className="w-5 h-5" />;
      case 'down': return <TrendingDown className="w-5 h-5" />;
      case 'same': return <Minus className="w-5 h-5" />;
      default: return <Minus className="w-5 h-5" />;
    }
  };

  return (
    <span
      className="ticker-rate inline-flex items-center space-x-3 mr-8 transition-colors duration-150 p-2 rounded-md transform-gpu hover:bg-white/10 will-change-background"
      onMouseEnter={onMouseEnterRate} // Added onMouseEnter
      onMouseLeave={onMouseLeaveRate} // Added onMouseLeave
    >
      <span className="text-sand font-serif text-lg">
        {rate.shortLabel || rate.label}:
      </span>
      <span className="text-white font-extrabold text-xl">
        {rate.value}
      </span>
      {rate.change && (
        <span className={`inline-flex items-center space-x-2 ${getTrendColor(rate.change.direction)}`}>
          {getTrendIcon(rate.change.direction)}
          <span className="text-base font-medium">
            {rate.change.displayText}
          </span>
        </span>
      )}
    </span>
  );
}); // Closed React.memo

export const TickerBox: React.FC<TickerBoxProps> = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isContainerHovered, setIsContainerHovered] = useState(false);
  const [isRateItemHovered, setIsRateItemHovered] = useState(false);
  const { rates, loading, error } = useFREDRates(true);
  const tickerRef = useRef<HTMLDivElement>(null);
  const animationStartTimeRef = useRef<number | null>(null);
  const pauseStartTimeRef = useRef<number | null>(null);
  const pausedProgressRef = useRef<number | null>(null); // Added to store progress on pause

  // Refs for hover states to avoid stale closures in the animation loop
  const isContainerHoveredRef = useRef(isContainerHovered);
  const isRateItemHoveredRef = useRef(isRateItemHovered);

  useEffect(() => {
    isContainerHoveredRef.current = isContainerHovered;
  }, [isContainerHovered]);

  useEffect(() => {
    isRateItemHoveredRef.current = isRateItemHovered;
  }, [isRateItemHovered]);

  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const handleRateMouseEnter = useCallback(() => { // Added useCallback for hover handlers
    setIsRateItemHovered(true);
  }, []);

  const handleRateMouseLeave = useCallback(() => {
    setIsRateItemHovered(false);
  }, []);

  const organizeRatesByCategory = useCallback((marketRates: Record<string, MarketRate>): RateCategory[] => {
    const categories: RateCategory[] = [
      { name: 'treasury', displayName: 'Treasury Yields', rates: [] },
      { name: 'sofr', displayName: 'SOFR Rates', rates: [] },
      { name: 'commercial', displayName: 'Commercial', rates: [] },
      { name: 'other', displayName: 'Other Rates', rates: [] },
    ];

    const sortedRates = Object.values(marketRates).sort((a, b) => a.priority - b.priority);
    sortedRates.forEach(rate => {
      const rateId = rate.id.toLowerCase();
      const rateLabel = rate.label.toLowerCase();
      if (rateId.includes('10y') || rateId.includes('5y') || rateId.includes('3y') || 
          rateLabel.includes('treasury') || rateLabel.includes('10-year') || 
          rateLabel.includes('5-year') || rateLabel.includes('3-year')) {
        categories[0].rates.push(rate);
      } else if (rateId.includes('sofr') || rateLabel.includes('sofr')) {
        categories[1].rates.push(rate);
      } else if (rateId.includes('prime') || rateLabel.includes('prime') || 
                 rateLabel.includes('commercial') || rateId.includes('commercial')) {
        categories[2].rates.push(rate);
      } else {
        categories[3].rates.push(rate);
      }
    });
    return categories.filter(category => category.rates.length > 0);
  }, []); // Wrapped organizeRatesByCategory with useCallback

  const rateCategories = useMemo(() => {
    return rates?.rates ? organizeRatesByCategory(rates.rates) : [];
  }, [rates, organizeRatesByCategory]); // Memoized rateCategories

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker || rateCategories.length === 0) {
      animationStartTimeRef.current = null;
      pauseStartTimeRef.current = null;
      pausedProgressRef.current = null;
      return;
    }

    // Measure the actual width of the content
    const actualScrollWidth = ticker.scrollWidth; // Total width of [Set1][Set2]
    const singleSetWidthPixels = actualScrollWidth / 2; // Width of Set1

    // If singleSetWidthPixels is 0, content might not be fully laid out yet.
    // This could happen if the effect runs before children establish their width.
    // A more robust solution might involve a ResizeObserver or waiting for layout,
    // but for now, we'll proceed if > 0, otherwise the animation might not run.
    if (singleSetWidthPixels === 0) {
      // Optionally, log a warning or implement a retry mechanism if this happens frequently
      console.warn("Ticker content width is 0, animation might not work as expected.");
      return;
    }

    let animationFrameId: number;
    const animationCycleDuration = 45500; // ms, increased from 35000 to slow down by an additional 30%
    const resumeOffsetFactor = 0;

    const animate = (timestamp: number) => {
      if (!animationStartTimeRef.current) { // Simplified null check
        animationStartTimeRef.current = timestamp;
        if (isContainerHoveredRef.current || isRateItemHoveredRef.current) {
          pauseStartTimeRef.current = timestamp;
          pausedProgressRef.current = resumeOffsetFactor;
        }
      }

      const currentlyPaused = isContainerHoveredRef.current || isRateItemHoveredRef.current;

      if (currentlyPaused) {
        if (pauseStartTimeRef.current === null) {
          pauseStartTimeRef.current = timestamp;
          const elapsedActiveTimeBeforePause = timestamp - (animationStartTimeRef.current || timestamp); // Ensure current is not null
          const nonNegativeElapsed = Math.max(0, elapsedActiveTimeBeforePause);
          const currentProgressInCycle = (nonNegativeElapsed % animationCycleDuration) / animationCycleDuration;
          pausedProgressRef.current = currentProgressInCycle + resumeOffsetFactor;
        }
      } else { // RUNNING
        if (pauseStartTimeRef.current !== null) {
          if (pausedProgressRef.current !== null) {
            animationStartTimeRef.current = timestamp - (pausedProgressRef.current * animationCycleDuration);
          } else {
            animationStartTimeRef.current = timestamp;
          }
          pauseStartTimeRef.current = null;
        }

        const elapsedActiveTime = timestamp - (animationStartTimeRef.current || timestamp); // Ensure current is not null
        const nonNegativeElapsed = Math.max(0, elapsedActiveTime);
        const progressInCycle = (nonNegativeElapsed % animationCycleDuration) / animationCycleDuration;
        
        if (ticker) {
          // Use measured pixel width for translation
          ticker.style.transform = `translateX(-${progressInCycle * singleSetWidthPixels}px)`;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationStartTimeRef.current = null; 
    pauseStartTimeRef.current = null;
    pausedProgressRef.current = null;

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [rates, rateCategories]);

  if (!isDesktop) return null;

  return (
    <div
      className="ticker-container relative w-full h-[100px] bg-gray-900 overflow-hidden"
      onMouseEnter={() => setIsContainerHovered(true)} // Updated to setIsContainerHovered
      onMouseLeave={() => setIsContainerHovered(false)} // Updated to setIsContainerHovered
    >
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20">
        <span className="text-sand font-serif text-xl uppercase">
          Market Rates
        </span>
      </div>
      <div className="relative w-full h-full overflow-hidden z-10 will-change-transform">
        {loading ? (
          <div className="flex items-center justify-center h-full text-white">
            <span className="text-xl">Loading...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-red-400">
            <span className="text-xl">Error: {error}</span>
          </div>
        ) : rateCategories.length === 0 ? (
          <div className="flex items-center justify-center h-full text-yellow-400">
            <span className="text-xl">No Data Available</span>
          </div>
        ) : (
          <div ref={tickerRef} className="ticker-scroll flex items-center h-full whitespace-nowrap pt-16 pb-4 text-white will-change-transform backface-hidden">
            {rateCategories.map((category, categoryIndex) => (
              <div key={`cat-${categoryIndex}`} className="inline-flex items-center mr-12">
                <span className="text-sand font-serif text-lg mr-6">
                  {category.displayName}:
                </span>
                {category.rates.map((rate, rateIndex) => (
                  <RateDisplay
                    key={`rate-${categoryIndex}-${rateIndex}`}
                    rate={rate}
                    onMouseEnterRate={handleRateMouseEnter} // Passed handler
                    onMouseLeaveRate={handleRateMouseLeave} // Passed handler
                  />
                ))}
                {categoryIndex < rateCategories.length - 1 && (
                  <div className="mx-6">
                    <div className="w-px h-10 bg-gradient-to-b from-purple-600/50 via-purple-400/70 to-purple-600/50"></div>
                  </div>
                )}
              </div>
            ))}
            {/* Duplicate set for seamless scrolling */}
            {rateCategories.map((category, categoryIndex) => (
              <div key={`cat-dup-${categoryIndex}`} className="inline-flex items-center mr-12">
                <span className="text-sand font-serif text-lg mr-6">
                  {category.displayName}:
                </span>
                {category.rates.map((rate, rateIndex) => (
                  <RateDisplay
                    key={`rate-dup-${categoryIndex}-${rateIndex}`}
                    rate={rate}
                    onMouseEnterRate={handleRateMouseEnter} // Passed handler
                    onMouseLeaveRate={handleRateMouseLeave} // Passed handler
                  />
                ))}
                {categoryIndex < rateCategories.length - 1 && (
                  <div className="mx-6">
                    <div className="w-px h-10 bg-gradient-to-b from-purple-600/50 via-purple-400/70 to-purple-600/50"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};