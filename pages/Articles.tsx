
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getTranslatedArticles } from '../constants';
import { useTranslation } from '../components/LanguageContext';

const Articles: React.FC = () => {
  const { t } = useTranslation();
  const articles = useMemo(() => getTranslatedArticles(t), [t]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filteredArticles = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return articles;
    return articles.filter(article => 
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query)
    );
  }, [articles, searchQuery]);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const currentArticles = filteredArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const paginate = (n: number) => {
    setCurrentPage(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-32">
      <SEO title={`${t.navArticles} | GENMOZPRO`} description={t.heroSub} />
      
      <div className="mb-20 text-center">
        <span className="text-blue-600 font-black tracking-widest uppercase text-xs bg-blue-50 px-4 py-2 rounded-full mb-6 inline-block">Tech Hub 2026</span>
        <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-slate-900">{t.navArticles.split(' ').slice(0,-1).join(' ')} <span className="text-blue-600">{t.navArticles.split(' ').slice(-1)}</span>.</h1>
        
        <div className="max-w-2xl mx-auto relative group mt-12">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-14 pr-8 py-6 bg-white border-2 border-slate-100 rounded-[30px] shadow-sm outline-none focus:border-blue-600 transition-all font-medium text-lg"
          />
          <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-slate-400"></i>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {currentArticles.map((article) => (
          <article key={article.id} className="flex flex-col bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition group h-full">
            <Link to={`/artigo/${article.slug}`} className="block relative aspect-video overflow-hidden">
              <img src={article.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{article.category}</div>
            </Link>
            <div className="p-10 flex flex-col flex-1">
              <h2 className="text-2xl font-black mb-6 text-slate-900 group-hover:text-blue-600 transition line-clamp-2 leading-tight">
                <Link to={`/artigo/${article.slug}`}>{article.title}</Link>
              </h2>
              <p className="text-slate-600 line-clamp-3 mb-10 flex-1 leading-relaxed text-lg font-medium">{article.excerpt}</p>
              <Link to={`/artigo/${article.slug}`} className="mt-auto pt-6 border-t border-slate-50 text-blue-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                {t.article_read_more} <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-20 flex justify-center gap-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => paginate(i+1)} className={`w-14 h-14 rounded-2xl font-black text-lg transition-all ${currentPage === i+1 ? 'bg-blue-600 text-white shadow-xl' : 'bg-white text-slate-400 hover:bg-slate-50'}`}>{i+1}</button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Articles;
