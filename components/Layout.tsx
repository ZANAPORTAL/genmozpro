import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, lang, setLang } = useLanguage();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/contact', label: t.nav.contact },
    { to: '/privacy', label: t.nav.privacy },
    { to: '/terms', label: t.nav.terms },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-brand-950 font-sans">
      <nav className="fixed top-0 w-full z-50 bg-brand-950/90 backdrop-blur-xl border-b border-white/5 glow-accent">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand-accent rounded flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-brand-accent/20">
              <span className="text-white font-black text-lg">G</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">GenMoz<span className="text-brand-accent">Pro</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${location.pathname === link.to ? 'text-brand-accent' : 'text-slate-400 hover:text-white'}`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="h-4 w-px bg-white/10 mx-2"></div>
            
            <div className="flex items-center bg-black/30 p-1 rounded-lg border border-white/5">
              {['PT', 'EN', 'ES'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l.toLowerCase() as any)}
                  className={`text-[9px] font-black px-3 py-1 rounded-md transition-all ${
                    lang === l.toLowerCase() ? 'bg-brand-accent text-white shadow-md' : 'text-slate-500 hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-brand-900 border-b border-white/5 p-6 animate-fade-in space-y-4 shadow-2xl">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setIsMenuOpen(false)} className="block text-xs font-black uppercase text-white tracking-widest">{link.label}</Link>
            ))}
            <div className="flex gap-2 pt-4 border-t border-white/5">
              {['PT', 'EN', 'ES'].map((l) => (
                <button
                  key={l}
                  onClick={() => { setLang(l.toLowerCase() as any); setIsMenuOpen(false); }}
                  className={`text-[10px] font-black px-4 py-2 rounded-lg border border-white/10 ${lang === l.toLowerCase() ? 'bg-brand-accent text-white' : 'text-slate-500'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow pt-24">
        {children}
      </main>

      <footer className="bg-brand-950 border-t border-white/5 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-accent rounded flex items-center justify-center">
                <span className="text-white font-black text-lg">G</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">GenMoz<span className="text-brand-accent">Pro</span></span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">{t.footer.desc}</p>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest">{t.footer.section_tool}</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-brand-accent transition-colors">BIN Generator</Link></li>
              <li><Link to="/" className="hover:text-brand-accent transition-colors">CC Checker</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest">{t.footer.section_legal}</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-brand-accent transition-colors">{t.nav.about}</Link></li>
              <li><Link to="/contact" className="hover:text-brand-accent transition-colors">{t.nav.contact}</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-accent transition-colors">{t.nav.privacy}</Link></li>
              <li><Link to="/terms" className="hover:text-brand-accent transition-colors">{t.nav.terms}</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest">{t.footer.newsletter_title}</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-brand-accent w-full" />
              <button className="bg-brand-accent text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase">OK</button>
            </div>
            <div className="pt-2">
              <div className="bg-brand-900 border border-white/5 p-3 rounded-xl flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></div>
                <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest">{t.footer.status_online}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{t.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
};
