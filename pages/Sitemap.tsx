
import React, { useState } from 'react';
import SEO from '../components/SEO';
import { ARTICLES, TOOLS } from '../constants';
import { generateSitemapXML } from '../services/geminiService';

const Sitemap: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const urls = [
    '/',
    '/artigos',
    '/privacidade',
    ...TOOLS.map(t => `/ferramenta/${t.slug}`),
    ...ARTICLES.map(a => `/artigo/${a.slug}`)
  ];

  const xml = generateSitemapXML(urls);

  const handleCopy = () => {
    navigator.clipboard.writeText(xml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-40">
      <SEO 
        title="Sitemap XML - Indexação GENMOZPRO" 
        description="Mapa completo do site GENMOZPRO. Todas as ferramentas e artigos técnicos listados para o Google."
      />
      
      <div className="bg-white rounded-[50px] p-12 border border-slate-100 shadow-2xl mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div>
            <h1 className="text-5xl font-black mb-4">Sitemap Index</h1>
            <p className="text-slate-500 text-xl">Arquitetura de URLs para Google Search Console.</p>
          </div>
          <button 
            onClick={handleCopy}
            className="bg-blue-600 text-white px-10 py-4 rounded-3xl font-black hover:bg-blue-700 transition shadow-xl"
          >
            {copied ? 'Copiado!' : 'Copiar XML'}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-20">
          <div className="space-y-6">
            <h3 className="font-black text-xs uppercase tracking-widest text-slate-400">Páginas</h3>
            <ul className="space-y-3 font-bold text-blue-600">
              {urls.slice(0, 3).map(u => <li key={u}><a href={`#${u}`}>{u}</a></li>)}
            </ul>
          </div>
          <div className="space-y-6 md:col-span-2">
            <h3 className="font-black text-xs uppercase tracking-widest text-slate-400">Artigos (30 Itens)</h3>
            <ul className="grid md:grid-cols-2 gap-x-10 gap-y-3 font-bold text-blue-600 text-sm">
              {urls.filter(u => u.includes('/artigo')).map(u => <li key={u} className="truncate"><a href={`#${u}`}>{u}</a></li>)}
            </ul>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[40px] p-10 overflow-hidden relative">
          <div className="text-slate-500 text-[10px] font-black uppercase mb-6 flex justify-between">
            <span>sitemap.xml dynamic_output</span>
            <span className="text-blue-500">Status: Valid</span>
          </div>
          <pre className="text-emerald-400 font-mono text-xs overflow-x-auto h-80 custom-scrollbar leading-relaxed">
            {xml}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
