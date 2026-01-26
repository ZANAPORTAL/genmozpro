
import React, { useEffect, useState } from 'react';
import { useTranslation } from './LanguageContext';

interface SplashScreenProps {
  isVisible: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ isVisible }) => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 100;
          const increment = Math.random() * 20;
          return Math.min(prev + increment, 98); // Para no 98 até fechar
        });
      }, 100);
      return () => clearInterval(interval);
    } else {
      setProgress(100);
      const timeout = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center transition-all duration-500 bg-slate-900/90 backdrop-blur-xl ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="relative">
        {/* Logo Pulse */}
        <div className="w-24 h-24 bg-blue-600 rounded-[32px] flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-blue-500/40 animate-pulse mb-12">
          G
        </div>
        
        {/* Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/20 rounded-full blur-[60px] -z-10 animate-pulse"></div>
      </div>

      <div className="w-full max-w-xs px-4">
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-6">
          <div 
            className="h-full bg-blue-500 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-blue-100/60 font-black text-[10px] uppercase tracking-[0.4em] text-center animate-bounce">
          {t.processing}
        </p>
      </div>

      <div className="absolute bottom-12 text-[10px] font-black text-slate-500 uppercase tracking-widest">
        GENMOZPRO Secure Connection
      </div>
    </div>
  );
};

export default SplashScreen;
