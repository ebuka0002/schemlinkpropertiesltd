import { useState, useEffect } from 'react';

/**
 * Custom hook to show/hide scroll to top button
 * @returns {boolean} whether to show the button
 */
export const useScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isVisible;
};
