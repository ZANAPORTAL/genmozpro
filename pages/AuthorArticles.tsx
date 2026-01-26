
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getArticles } from '../services/configService';
import { Article } from '../types';
import { useTranslation } from '../components/LanguageContext';

const AuthorArticles: React.FC = () => {
  const { authorName } = useParams<{ authorName: string }>();
  const { t } = useTranslation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [authorInfo, setAuthorInfo] = useState({ name: '', initial: '' });

  useEffect(() => {
    if (authorName) {
      const decodedName = decodeURIComponent(authorName);
      setAuthorInfo({ name: decodedName, initial: decodedName[0] || 'A' });
      const allArticles = getArticles();
      const filtered = allArticles.filter(a => a.author.toLowerCase() === decodedName.toLowerCase());
      setArticles(filtered);
    }
    window.scrollTo(0, 0);
  }, [authorName]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-32">
      <SEO 
        title={`Artigos de ${authorInfo.name} | GENMOZPRO`} 
        description={`Explore todos os insights técnicos e whitepapers publicados por ${authorInfo.name} na Central Tech.`}
      />
      
      <div className="mb-24 text-center">
        <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-black mx-auto mb-10 shadow-2xl shadow-blue-500/30">
          {authorInfo.initial}
        </div>
        <span className="text-blue-600 font-black tracking-widest uppercase text-xs mb-4 block">{t.allByAuthor}</span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900">{authorInfo.name}</h1>
        <p className="text-xl text-slate-500 mt-8 max-w-2xl mx-auto">
          {articles.length} whitepapers publicados com foco em infraestrutura fintech e conformidade cibernética.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {articles.map((article) => (
          <article key={article.id} className="flex flex-col bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition group h-full">
            <Link to={`/artigo/${article.slug}`} className="block relative aspect-video overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                {article.category}
              </div>
            </Link>
            <div className="p-10 flex flex-col flex-1">
              <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 mb-6 uppercase tracking-widest">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.author}</span>
              </div>
              <h2 className="text-2xl font-black mb-6 text-slate-900 group-hover:text-blue-600 transition line-clamp-2 leading-tight">
                <Link to={`/artigo/${article.slug}`}>{article.title}</Link>
              </h2>
              <p className="text-slate-600 line-clamp-3 mb-10 flex-1 leading-relaxed text-lg font-medium">
                {article.excerpt}
              </p>
              <Link to={`/artigo/${article.slug}`} className="mt-auto pt-6 border-t border-slate-50 text-blue-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                Ler Whitepaper <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-40 bg-slate-50 rounded-[60px] border-2 border-dashed border-slate-200">
          <h2 className="text-2xl font-black text-slate-900">Nenhum artigo encontrado.</h2>
          <Link to="/artigos" className="text-blue-600 font-bold mt-4 inline-block">Voltar para Central Tech</Link>
        </div>
      )}
    </div>
  );
};

export default AuthorArticles;
