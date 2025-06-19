import { useState, useEffect } from 'react';
import { Button } from './Button';

interface FloatingCTAProps {
  text?: string;
  href?: string;
  onClick?: () => void;
}

export function FloatingCTA({ 
  text = "Get Your Analysis", 
  href = "/contact",
  onClick 
}: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(progress);
      // Show after scrolling past hero section (approximately 400px)
      setIsVisible(scrollTop > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg border border-sage/20 p-4 max-w-sm">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-1 mb-3">
          <div 
            className="bg-plum h-1 rounded-full transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
        
        <p className="text-sm text-gray-600 mb-3">
          Ready to achieve similar results?
        </p>
        
        {onClick ? (
          <button 
            onClick={onClick}
            className="w-full bg-plum hover:bg-dark-purple text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            {text}
          </button>
        ) : (
          <Button 
            to={href}
            variant="primary"
            className="w-full text-center"
          >
            {text}
          </Button>
        )}
      </div>
    </div>
  );
}
