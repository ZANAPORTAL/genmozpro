
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from './LanguageContext';
import { ARTICLES, TOOLS } from '../constants';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredTools = TOOLS.filter(tool => 
    tool.title.toLowerCase().includes(query.toLowerCase()) || 
    tool.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredArticles = ARTICLES.filter(article => 
    article.title.toLowerCase().includes(query.toLowerCase()) || 
    article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
    article.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
  );

  const hasResults = filteredTools.length > 0 || filteredArticles.length > 0;

  return (
    <div className="fixed inset-0 z-[1000] animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl px-6">
        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[80vh]">
          <div className="p-8 border-b border-slate-100 flex items-center gap-6">
            <i className="fas fa-search text-2xl text-blue-600"></i>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="flex-grow text-2xl font-bold bg-transparent outline-none text-slate-900 placeholder:text-slate-300"
            />
            <button onClick={onClose} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
            {query.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-slate-50 rounded-[30px] flex items-center justify-center text-slate-200 text-4xl mx-auto mb-6">
                  <i className="fas fa-keyboard"></i>
                </div>
                <p className="text-slate-400 font-black uppercase tracking-widest text-sm">{t.searchTitle}</p>
              </div>
            ) : !hasResults ? (
              <div className="text-center py-20">
                <p className="text-slate-400 font-bold mb-2">{t.noResults}</p>
                <p className="text-2xl font-black text-slate-900">"{query}"</p>
              </div>
            ) : (
              <div className="space-y-12">
                {filteredTools.length > 0 && (
                  <div className="space-y-6">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-4">
                      {t.toolsCategory} <div className="h-px flex-grow bg-slate-100"></div>
                    </h3>
                    <div className="grid gap-4">
                      {filteredTools.map(tool => (
                        <Link 
                          key={tool.id} 
                          to={`/ferramenta/${tool.slug}`} 
                          onClick={onClose}
                          className="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 hover:bg-blue-600 group transition-all"
                        >
                          <div className={`w-14 h-14 rounded-2xl ${tool.color} flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition`}>
                            <i className={`fas ${tool.icon}`}></i>
                          </div>
                          <div>
                            <h4 className="font-black text-slate-900 group-hover:text-white transition">{tool.title}</h4>
                            <p className="text-sm text-slate-500 group-hover:text-blue-100 transition line-clamp-1">{tool.description}</p>
                          </div>
                          <i className="fas fa-chevron-right ml-auto text-slate-200 group-hover:text-white transition"></i>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {filteredArticles.length > 0 && (
                  <div className="space-y-6">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-4">
                      {t.articlesCategory} <div className="h-px flex-grow bg-slate-100"></div>
                    </h3>
                    <div className="grid gap-4">
                      {filteredArticles.map(article => (
                        <Link 
                          key={article.id} 
                          to={`/artigo/${article.slug}`} 
                          onClick={onClose}
                          className="flex items-center gap-6 p-4 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group"
                        >
                          <img src={article.image} alt="" className="w-16 h-16 rounded-2xl object-cover shadow-sm" />
                          <div>
                            <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-1">{article.title}</h4>
                            <p className="text-xs text-slate-500 line-clamp-1">{article.excerpt}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span>GENMOZPRO Search Engine v2.5</span>
            <div className="flex gap-4">
              <span>Esc to close</span>
              <span>Enter to select</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
