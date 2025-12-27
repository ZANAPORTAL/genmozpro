import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const CookieConsent: React.FC = () => {
  const [show, setShow] = useState(false);
  const { t } = useLanguage();
  
  useEffect(() => { 
    if (!localStorage.getItem('genmoz_cookie_accepted')) {
      setTimeout(() => setShow(true), 1500);
    }
  }, []);

  const accept = () => { 
    localStorage.setItem('genmoz_cookie_accepted', 'true'); 
    setShow(false); 
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[400px] z-[100] animate-fade-in">
      <div className="glass-card p-6 rounded-2xl shadow-2xl border-white/10 glow-accent space-y-4">
        <div className="flex items-start gap-4">
          <div className="bg-brand-accent/10 p-2 rounded-lg text-brand-accent">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 20c4.083 0 7.674-2.43 9.283-5.93a10.008 10.008 0 00.126-1.57A10.003 10.003 0 0012 2.5a10.003 10.003 0 00-9.409 6.5" />
            </svg>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            {t.cookie_banner.text}
          </p>
        </div>
        <button 
          onClick={accept} 
          className="w-full bg-brand-accent hover:brightness-110 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-brand-accent/20"
        >
          {t.cookie_banner.btn_accept}
        </button>
      </div>
    </div>
  );
};
