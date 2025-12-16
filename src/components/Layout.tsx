import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, lang, setLang } = useLanguage();

  const isActive = (path: string) => location.pathname === path ? 'text-brand-accent' : 'text-gray-300 hover:text-white';

  return (
    <nav className="bg-brand-900 border-b border-brand-700 sticky top-0 z-50 shadow-lg backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <svg className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              <span className="font-bold text-xl tracking-tight text-white">GenMoz<span className="text-brand-accent">Pro</span></span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className={`${isActive('/')} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>{t.nav.home}</Link>
              <Link to="/about" className={`${isActive('/about')} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>{t.nav.about}</Link>
              <Link to="/contact" className={`${isActive('/contact')} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>{t.nav.contact}</Link>
              
              {/* Language Switcher Small */}
              <div className="flex space-x-1 ml-4 border-l border-brand-700 pl-4">
                 {(['pt', 'en', 'es'] as const).map((l) => (
                   <button 
                    key={l}
                    onClick={() => setLang(l)}
                    className={`text-xs font-bold uppercase px-2 py-1 rounded ${lang === l ? 'bg-brand-accent/20 text-brand-accent' : 'text-gray-500 hover:text-gray-300'}`}
                   >
                     {l}
                   </button>
                 ))}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-brand-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-brand-700 focus:outline-none"
            >
              <span className="sr-only">Menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-brand-800 border-b border-brand-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{t.nav.home}</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{t.nav.about}</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{t.nav.contact}</Link>
             <div className="flex gap-2 px-3 py-2">
                 {(['pt', 'en', 'es'] as const).map((l) => (
                   <button key={l} onClick={() => setLang(l)} className={`text-xs font-bold uppercase px-2 py-1 rounded border border-brand-600 ${lang === l ? 'bg-brand-accent text-brand-950' : 'text-gray-400'}`}>{l}</button>
                 ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#0b101e] border-t border-brand-800 mt-auto">
      {/* Newsletter Section */}
      <div className="border-b border-brand-800/50 bg-brand-900/20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-white mb-1">{t.footer.newsletter_title}</h3>
                  <p className="text-sm text-gray-400">{t.footer.newsletter_desc}</p>
               </div>
               <div className="flex w-full md:w-auto gap-2">
                  <input type="email" placeholder="Email address" className="bg-brand-950 border border-brand-700 text-white rounded-lg px-4 py-2 text-sm w-full md:w-64 focus:border-brand-accent outline-none" />
                  <button className="bg-brand-accent hover:bg-brand-accentHover text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">{t.footer.newsletter_btn}</button>
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
               <svg className="h-6 w-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
               </svg>
               <span className="text-xl font-bold text-white">GenMoz<span className="text-brand-accent">Pro</span></span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t.footer.desc}
            </p>
            <div className="flex space-x-3 pt-4">
               {/* Professional Social Icons */}
               {[
                 { p: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" },
                 { p: "M12 2.163c3.204 0 3.584.012 4.85.072 3.266.153 4.797 1.745 4.953 5.035.058 1.266.069 1.645.069 4.808 0 3.163-.012 3.542-.069 4.808-.156 3.29-1.687 4.882-4.953 5.035-1.266.06-1.645.072-4.85.072-3.204 0-3.584-.012-4.85-.072-3.266-.153-4.797-1.745-4.953-5.035-.058-1.266-.069-1.645-.069-4.808 0-3.163.012-3.542.069-4.808.156-3.29 1.687-4.882 4.953-5.035 1.266-.06 1.645-.072 4.85-.072zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" }
               ].map((icon, i) => (
                 <a key={i} href="#" className="w-8 h-8 rounded bg-brand-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-700 transition-colors">
                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={icon.p}/></svg>
                 </a>
               ))}
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-6">{t.footer.product}</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-sm text-gray-500 hover:text-brand-accent transition-colors block">{t.footer.links.gen}</Link></li>
              <li><Link to="/" className="text-sm text-gray-500 hover:text-brand-accent transition-colors block">{t.footer.links.check}</Link></li>
              <li><span className="text-sm text-gray-700 cursor-not-allowed block">{t.footer.links.api}</span></li>
              <li><span className="text-sm text-gray-700 cursor-not-allowed block">{t.footer.links.status}</span></li>
            </ul>
          </div>

          {/* Column 3: Resources/Company */}
          <div>
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-6">{t.footer.company}</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-sm text-gray-500 hover:text-brand-accent transition-colors block">{t.nav.about}</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-500 hover:text-brand-accent transition-colors block">{t.nav.contact}</Link></li>
              <li><span className="text-sm text-gray-700 cursor-not-allowed block">{t.footer.links.blog}</span></li>
              <li><span className="text-sm text-gray-700 cursor-not-allowed block">{t.footer.links.help}</span></li>
            </ul>
          </div>

          {/* Column 4: Legal & Status */}
          <div>
             <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-6">{t.footer.legal}</h3>
             <ul className="space-y-4 mb-8">
              <li><Link to="/privacy" className="text-sm text-gray-500 hover:text-brand-accent transition-colors block">{t.nav.privacy}</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-500 hover:text-brand-accent transition-colors block">{t.nav.terms}</Link></li>
            </ul>
            
            <div className="bg-brand-900 border border-brand-800 rounded-lg p-3 inline-block">
               <div className="flex items-center gap-2 mb-1">
                 <span className="relative flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                 </span>
                 <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wide">All Systems Operational</span>
               </div>
               <p className="text-[9px] text-gray-600 font-mono">LATENCY: 24ms</p>
            </div>
          </div>

        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-brand-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} GenMozPro Solutions LLC. {t.footer.rights}</p>
          
          <div className="flex items-center gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
             {/* Simple visual placeholders for Payment Methods to look generic but professional */}
             <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold text-gray-400">VISA</div>
             <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold text-gray-400">MC</div>
             <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold text-gray-400">AMEX</div>
             <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold text-gray-400">BTC</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-900 text-slate-200">
      <Navbar />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};
