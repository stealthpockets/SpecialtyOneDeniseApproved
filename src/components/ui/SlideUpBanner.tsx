import React, { useState, useEffect, useRef } from 'react';
import { X, BarChart2, ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface SlideUpBannerProps {
  typeformId: string;
  utmSource: string;
  utmCampaign: string;
}

const SlideUpBanner: React.FC<SlideUpBannerProps> = ({ typeformId, utmSource, utmCampaign }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [hasShownInitially, setHasShownInitially] = useState(false);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<'up' | 'down'>('down');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isClosed) {
        setIsVisible(true);
        setHasShownInitially(true);
      }
    }, 3000); // Show after 3 seconds initially

    return () => clearTimeout(timer);
  }, [isClosed]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      const newDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
      
      // Only update if direction actually changed and we've scrolled enough
      if (
        newDirection !== scrollDirection.current && 
        Math.abs(currentScrollY - lastScrollY.current) > 10 &&
        hasShownInitially &&
        !isClosed
      ) {
        scrollDirection.current = newDirection;
        
        // Show when scrolling up, hide when scrolling down
        if (newDirection === 'up' && currentScrollY > 300) {
          setIsVisible(true);
        } else if (newDirection === 'down') {
          setIsVisible(false);
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasShownInitially, isClosed]);

  const handleClose = () => {
    setIsVisible(false);
    setIsClosed(true); // Prevent from showing again in this session
  };

  if (!isVisible || isClosed) {
    return null;
  }

  const typeformUrl = `https://form.typeform.com/to/${typeformId}?utm_source=${utmSource}&utm_medium=slideup_banner&utm_campaign=${utmCampaign}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-plum to-amethyst text-white p-6 shadow-2xl z-[200] transform transition-transform duration-500 ease-out"
         style={{ transform: isVisible ? 'translateY(0)' : 'translateY(100%)' }}>
      <div className="container-custom flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <BarChart2 size={40} className="mr-4 text-sand" />
          <div>
            <h3 className="font-display text-xl font-bold">Stay Ahead with Market Intelligence</h3>
            <p className="text-sm opacity-90">Get exclusive insights, reports, and trends delivered to your inbox.</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            href={typeformUrl}
            variant="outline"
            size="md"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-plum hover:bg-sand border-sand"
            icon={<ArrowRight size={18} />}
            iconPosition="right"
          >
            Get Insights
          </Button>
          <button
            onClick={handleClose}
            className="text-white hover:text-sand transition-colors"
            aria-label="Close banner"
          >
            <X size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlideUpBanner;
