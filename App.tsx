import React, { useState, useEffect } from 'react';
// Mudança aqui: Trocamos HashRouter por BrowserRouter
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import AuthorArticles from './pages/AuthorArticles';
import Sitemap from './pages/Sitemap';
import BinGeneratorPage from './pages/BinGeneratorPage';
import BinCheckerPage from './pages/BinCheckerPage';
import CookieConsent from './components/CookieConsent';
import Privacy from './pages/Privacy';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Disclaimer from './pages/Disclaimer';
import Terms from './pages/Terms';
import Incidences from './pages/Incidences';
import Transparency from './pages/Transparency';
import Newsletter from './pages/Newsletter';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminLogin from './pages/Admin/Login';
import SplashScreen from './components/SplashScreen';
import AdBlock from './components/AdBlock';
import ScrollToTop from './components/ScrollToTop';
import Logo from './components/Logo';
import { useTranslation } from './components/LanguageContext';
import { injectScripts, getAds, getConfig, isAuthenticated } from './services/configService';

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin-secure-gate" replace />;
  }
  return <>{children}</>;
};

const NavigationWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    injectScripts();
  }, []);

  useEffect(() => {
    setShowSplash(true);
    const timer = setTimeout(() => {
      setShowSplash(false);
      window.scrollTo(0, 0);
    }, 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <SplashScreen isVisible={showSplash} />
      {children}
    </>
  );
};

const App: React.FC = () => {
  const { t, locale } = useTranslation();
  const ads = getAds();
  const [footerEmail, setFooterEmail] = useState('');

  const handleFooterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(locale === 'pt' ? 'Inscrição realizada!' : 'Subscribed successfully!');
    setFooterEmail('');
  };

  return (
    // Mudança aqui: Trocamos <HashRouter> por <BrowserRouter>
    <BrowserRouter>
      <NavigationWrapper>
        <div className="min-h-screen flex flex-col selection:bg-blue-100 selection:text-blue-900 bg-white">
          <Navbar />
          <ScrollToTop />
          
          <div className="pt-32">
            <AdBlock code={ads.headerAd} className="max-w-7xl mx-auto px-6 h-32 mb-10" />
          </div>

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artigos" element={<Articles />} />
              <Route path="/artigo/:slug" element={<ArticleDetail />} />
              <Route path="/autor/:authorName" element={<AuthorArticles />} />
              <Route path="/ocorrencias" element={<Incidences />} />
              <Route path="/transparencia" element={<Transparency />} />
              <Route path="/newsletter" element={<Newsletter />} />
              <Route path="/ferramenta/gerador-de-bin" element={<BinGeneratorPage />} />
              <Route path="/ferramenta/checker-de-bin" element={<BinCheckerPage />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/privacidade" element={<Privacy />} />
              <Route path="/sobre-nos" element={<AboutUs />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/termos" element={<Terms />} />
              
              <Route path="/admin-secure-gate" element={<AdminLogin />} />
              <Route path="/portal-secure-2025" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />

              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          
          <CookieConsent />

          <AdBlock code={ads.footerAd} className="max-w-7xl mx-auto px-6 h-40 mt-10" />

          <footer className="bg-slate-900 text-white py-32 mt-20 rounded-t-[60px] md:rounded-t-[100px]">
            <div className="max-w-7xl mx-auto px-10 grid lg:grid-cols-4 gap-20">
              <div className="lg:col-span-2">
                <div className="mb-10">
                  <Logo light />
                </div>
                <p className="text-slate-400 max-w-md mb-12 text-xl leading-relaxed italic">
                  "{t.footerDesc}"
                </p>
                
                <form onSubmit={handleFooterSubscribe} className="max-w-sm mb-12 relative group">
                  <input 
                    type="email" 
                    value={footerEmail}
                    onChange={(e) => setFooterEmail(e.target.value)}
                    placeholder={t.newsletterTitle}
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 pl-6 pr-14 text-sm font-bold focus:outline-none focus:border-blue-500 transition-all"
                    required
                  />
                  <button type="submit" className="absolute right-2 top-2 bottom-2 aspect-square bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-500 transition-all">
                    <i className="fas fa-paper-plane text-xs"></i>
                  </button>
                </form>

                <div className="flex gap-6">
                  <Link to="/ocorrencias" className="text-emerald-400 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:translate-x-2 transition-all">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div> Live Feed
                  </Link>
                  <Link to="/newsletter" className="text-blue-400 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:translate-x-2 transition-all">
                    <i className="fas fa-envelope"></i> Newsletter
                  </Link>
                </div>
              </div>
              
              <div>
                <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-10 text-slate-500">Navigation</h4>
                <ul className="space-y-6">
                  <li><Link to="/artigos" className="text-slate-300 hover:text-blue-400 transition text-lg font-bold">{t.navArticles}</Link></li>
                  <li><Link to="/transparencia" className="text-slate-300 hover:text-blue-400 transition text-lg font-bold">{t.navTransparency}</Link></li>
                  <li><Link to="/ocorrencias" className="text-slate-300 hover:text-blue-400 transition text-lg font-bold">{t.navIncidences}</Link></li>
                  <li><Link to="/sitemap" className="text-slate-300 hover:text-blue-400 transition text-lg font-bold">Sitemap</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-10 text-slate-500">Legal</h4>
                <ul className="space-y-6">
                  <li><Link to="/privacidade" className="text-slate-300 hover:text-blue-400 transition text-lg font-bold">{t.navPrivacy}</Link></li>
                  <li><Link to="/termos" className="text-slate-300 hover:text-blue-400 transition text-lg font-bold">Terms</Link></li>
                  <li><Link to="/disclaimer" className="text-slate-300 hover:text-blue-400 transition text-lg font-bold">Disclaimer</Link></li>
                  <li><Link to="/admin-secure-gate" className="text-slate-800 hover:text-white transition text-[10px] font-black uppercase tracking-widest block pt-10">Gate Control</Link></li>
                </ul>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-10 mt-32 pt-12 border-t border-slate-800 text-center text-slate-500 text-sm font-black tracking-widest uppercase">
              &copy; {new Date().getFullYear()} {t.footerCopyright}
            </div>
          </footer>
        </div>
      </NavigationWrapper>
    </BrowserRouter>
  );
};

export default App;
