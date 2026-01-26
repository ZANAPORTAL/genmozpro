
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getTranslatedArticles } from '../constants';
import { Article } from '../types';
import { useTranslation } from '../components/LanguageContext';

const ArticleDetail: React.FC = () => {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const articles = useMemo(() => getTranslatedArticles(t), [t]);
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const found = articles.find(a => a.slug === slug);
    if (!found) {
      navigate('/artigos');
    } else {
      setArticle(found);
      window.scrollTo(0, 0);
    }
  }, [slug, articles, navigate]);

  if (!article) return null;

  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('# ')) return <h1 key={i} className="text-4xl md:text-6xl font-black mb-8 mt-12 text-slate-900 tracking-tighter">{line.replace('# ', '')}</h1>;
      if (line.startsWith('## ')) return <h2 key={i} className="text-3xl md:text-4xl font-black mb-6 mt-16 text-slate-900 border-l-4 border-blue-600 pl-6">{line.replace('## ', '')}</h2>;
      if (line.startsWith('- ')) return <li key={i} className="ml-6 mb-2 list-disc text-lg text-slate-600 font-medium">{line.replace('- ', '')}</li>;
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="text-lg md:text-xl text-slate-600 leading-loose mb-6 font-medium">{line}</p>;
    });
  };

  return (
    <div className="pb-32 pt-48">
      <SEO title={`${article.title} | GENMOZPRO`} description={article.excerpt} ogImage={article.image} ogType="article" />
      
      <article className="max-w-5xl mx-auto px-6">
        <header className="mb-20">
          <Link to="/artigos" className="text-blue-600 font-black mb-10 inline-flex items-center gap-4 hover:-translate-x-2 transition-transform text-sm uppercase tracking-widest">
            <i className="fas fa-arrow-left"></i> {t.navArticles}
          </Link>
          <div className="flex gap-4 mb-10">
            <span className="bg-blue-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">{article.category}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.9] mb-12 tracking-tighter">{article.title}</h1>
        </header>

        <img src={article.image} alt="" className="w-full h-[500px] object-cover rounded-[60px] shadow-2xl mb-24" />

        <div className="max-w-4xl mx-auto">
          <div className="article-body mb-20">
            {renderContent(article.content)}
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;
