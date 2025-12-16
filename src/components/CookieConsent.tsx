import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export const CookieConsent: React.FC = () => {
  const [show, setShow] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem('genmozpro_cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('genmozpro_cookie_consent', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-brand-900/95 border-t border-brand-700 backdrop-blur-sm shadow-2xl animate-fade-in-up">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-300 text-center sm:text-left">
          <p className="font-semibold text-white mb-1">{t.cookie_banner.title}</p>
          <p>{t.cookie_banner.text}</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
            <Link 
              to="/privacy"
              className="flex-1 sm:flex-none text-center whitespace-nowrap bg-brand-800 hover:bg-brand-700 text-gray-300 font-bold py-2 px-6 rounded-lg transition-all border border-brand-700"
            >
              {t.cookie_banner.btn_more}
            </Link>
            <button 
              onClick={handleAccept}
              className="flex-1 sm:flex-none whitespace-nowrap bg-brand-accent hover:bg-brand-accentHover text-white font-bold py-2 px-6 rounded-lg transition-all shadow-lg shadow-brand-accent/20 transform hover:-translate-y-0.5"
            >
              {t.cookie_banner.btn_accept}
            </button>
        </div>
      </div>
    </div>
  );
};
