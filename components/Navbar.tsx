
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from './LanguageContext';
import { Locale } from '../i18n';
import SearchOverlay from './SearchOverlay';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t, locale, setLocale } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isSearchOpen) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen]);

  const navLinks = [
    { name: t.navHome, path: '/' },
    { name: t.navGen, path: '/ferramenta/gerador-de-bin' },
    { name: t.navChecker, path: '/ferramenta/checker-de-bin' },
    { name: t.navArticles, path: '/artigos' },
    { name: t.navAbout, path: '/sobre-nos' },
    { name: t.navContact, path: '/contato' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? 'py-4' : 'py-8'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass border border-white/20 rounded-[32px] px-8 flex justify-between h-20 items-center shadow-2xl">
            <Link to="/" className="shrink-0">
              <Logo />
            </Link>
            
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[10px] font-black uppercase tracking-widest transition-all hover:text-blue-600 ${
                    location.pathname === link.path ? 'text-blue-600' : 'text-slate-500'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="h-6 w-px bg-slate-200 mx-2"></div>

              <button 
                onClick={() => setIsSearchOpen(true)}
                className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
              >
                <i className="fas fa-search text-sm"></i>
              </button>
              
              <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl">
                {(['en', 'pt', 'es'] as Locale[]).map(l => (
                  <button 
                    key={l}
                    onClick={() => setLocale(l)}
                    className={`text-[9px] font-black uppercase w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      locale === l ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:hidden flex items-center gap-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600"
              >
                <i className="fas fa-search text-lg"></i>
              </button>
              <button onClick={() => setIsOpen(true)} className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600">
                <i className="fas fa-bars-staggered text-xl"></i>
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-[200] animate-in fade-in">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
            <div className="absolute top-4 right-4 left-4 bg-white rounded-[40px] p-10 shadow-2xl animate-in slide-in-from-top-10">
               <div className="flex justify-between items-center mb-12">
                  <Logo />
                  <button onClick={() => setIsOpen(false)} className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center"><i className="fas fa-times"></i></button>
               </div>
               <div className="space-y-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block text-xl font-black ${
                        location.pathname === link.path ? 'text-blue-600' : 'text-slate-900'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
               </div>
            </div>
          </div>
        )}
      </nav>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
