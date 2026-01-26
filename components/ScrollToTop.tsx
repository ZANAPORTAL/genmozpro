
import React, { useState, useEffect } from 'react';
import { useTranslation } from './LanguageContext';

const ScrollToTop: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label={t.backToTop}
      className={`fixed bottom-8 right-8 z-[90] w-14 h-14 bg-blue-600 text-white rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-500 hover:bg-blue-700 hover:-translate-y-2 active:scale-90 ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-50 pointer-events-none'
      }`}
    >
      <i className="fas fa-chevron-up text-xl"></i>
    </button>
  );
};

export default ScrollToTop;
