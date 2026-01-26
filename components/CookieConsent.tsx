
import React, { useState, useEffect } from 'react';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[100] animate-in slide-in-from-bottom-10 duration-500">
      <div className="max-w-4xl mx-auto glass border border-white/40 shadow-2xl rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-slate-700">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
            <i className="fas fa-cookie-bite text-xl"></i>
          </div>
          <p className="text-sm leading-relaxed">
            Nós utilizamos cookies para melhorar sua experiência e analisar nosso tráfego. Ao continuar navegando, você concorda com nossa <a href="#" className="underline font-bold text-blue-600">Política de Privacidade</a>.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button onClick={accept} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition">
            Aceitar Todos
          </button>
          <button onClick={() => setIsVisible(false)} className="bg-white/50 text-slate-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-white transition border border-slate-200">
            Recusar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
