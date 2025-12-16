import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-brand-950 rounded-2xl p-8 md:p-12 border border-brand-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10">
          <div className="inline-block p-3 rounded-xl bg-brand-900 border border-brand-700 mb-6">
             <svg className="w-8 h-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">{t.legal_page.about_title}</h1>
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
              {t.legal_page.about_content}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-brand-800">
            <div className="text-center">
               <div className="text-3xl font-bold text-white mb-1">50k+</div>
               <div className="text-xs text-gray-500 uppercase tracking-widest">Developers</div>
            </div>
            <div className="text-center">
               <div className="text-3xl font-bold text-white mb-1">99.9%</div>
               <div className="text-xs text-gray-500 uppercase tracking-widest">Uptime</div>
            </div>
            <div className="text-center">
               <div className="text-3xl font-bold text-white mb-1">24/7</div>
               <div className="text-xs text-gray-500 uppercase tracking-widest">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Privacy: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-brand-950 rounded-2xl p-8 md:p-12 border border-brand-800 shadow-2xl">
         <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-brand-900 rounded-lg border border-brand-700 text-brand-accent">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h1 className="text-3xl font-bold text-white">{t.legal_page.privacy_title}</h1>
         </div>
         
         <div className="space-y-6">
            <p className="text-gray-300 whitespace-pre-line leading-relaxed font-light">
              {t.legal_page.privacy_content}
            </p>
         </div>

         <div className="mt-10 p-4 bg-brand-900/50 rounded-lg border border-brand-800 flex items-start gap-3">
            <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-sm text-gray-500 italic">
               GDPR / CCPA Compliant. This site does not use tracking pixels for advertising purposes.
            </p>
         </div>
      </div>
    </div>
  );
};

export const Terms: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-brand-950 rounded-2xl p-8 md:p-12 border border-brand-800 shadow-2xl">
         <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-brand-900 rounded-lg border border-brand-700 text-blue-400">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <h1 className="text-3xl font-bold text-white">{t.legal_page.terms_title}</h1>
         </div>

         <div className="space-y-6">
            <p className="text-gray-300 whitespace-pre-line leading-relaxed font-light">
              {t.legal_page.terms_content}
            </p>
         </div>
         
         <div className="mt-12 border-t border-brand-800 pt-6">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Last Updated: October 2023</p>
         </div>
      </div>
    </div>
  );
};

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="bg-brand-950 rounded-2xl p-8 md:p-12 border border-brand-800 shadow-2xl">
        <div className="text-center mb-10">
           <h1 className="text-3xl font-bold text-white mb-4">{t.legal_page.contact_title}</h1>
           <p className="text-gray-400">{t.legal_page.contact_desc}</p>
        </div>
        
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message Sent / Mensagem Enviada!'); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
               <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t.legal_page.form_name}</label>
               <input type="text" className="w-full bg-brand-900 border border-brand-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-accent outline-none transition-all" required />
             </div>
             
             <div>
               <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t.legal_page.form_email}</label>
               <input type="email" className="w-full bg-brand-900 border border-brand-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-accent outline-none transition-all" required />
             </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t.legal_page.form_msg}</label>
            <textarea rows={5} className="w-full bg-brand-900 border border-brand-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-accent outline-none transition-all" required></textarea>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-brand-accent to-emerald-500 hover:to-emerald-400 text-brand-950 font-bold py-4 px-6 rounded-xl transition-all shadow-lg transform hover:-translate-y-1">
            {t.legal_page.form_btn}
          </button>
        </form>
        
        <div className="mt-10 pt-8 border-t border-brand-800 flex flex-col items-center gap-4">
           <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-brand-accent transition-colors text-sm font-semibold">Telegram Support</a>
              <a href="#" className="text-gray-500 hover:text-brand-accent transition-colors text-sm font-semibold">Email Us</a>
           </div>
           <p className="text-xs text-gray-600">
             San Francisco, CA • SP, Brazil
           </p>
        </div>
      </div>
    </div>
  );
};
