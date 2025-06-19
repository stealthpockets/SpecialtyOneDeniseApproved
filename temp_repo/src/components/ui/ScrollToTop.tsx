import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * 
 * This component automatically scrolls the window to the top when the route changes.
 * It's a utility component that doesn't render any visual elements.
 * 
 * Usage: Place inside Router but outside Routes in your App component.
 */
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top immediately when route changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // This component doesn't render anything
  return null;
};

export default ScrollToTop;
