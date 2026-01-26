
import React from 'react';
import SEO from '../components/SEO';
import { useTranslation } from '../components/LanguageContext';

const AboutUs: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-7xl mx-auto px-6 py-40">
      <SEO title={`${t.navAbout} | GENMOZPRO`} description={t.about_hero_sub} />
      
      <div className="mb-32 text-center max-w-4xl mx-auto">
        <span className="text-blue-600 font-black tracking-widest uppercase text-xs bg-blue-50 px-4 py-2 rounded-full mb-8 inline-block">{t.about_hero_tag}</span>
        <h1 className="text-7xl md:text-9xl font-black mb-12 tracking-tighter text-slate-900 leading-[0.85]">
          {t.about_hero_title.split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{t.about_hero_title.split(' ').slice(-1)}</span>
        </h1>
        <p className="text-2xl text-slate-500 font-medium leading-relaxed">
          {t.about_hero_sub}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-24 items-center mb-40">
        <div className="space-y-10">
          <h2 className="text-5xl font-black text-slate-900 leading-tight">{t.about_sec1_title}</h2>
          <div className="space-y-6 text-xl text-slate-600 leading-relaxed font-medium">
            <p>{t.about_sec1_p1}</p>
            <p>{t.about_sec1_p2}</p>
          </div>
          
          <div className="flex flex-wrap gap-12 pt-10 border-t border-slate-100">
            <div>
              <div className="text-4xl font-black text-blue-600 mb-2">100k+</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.about_stats_ops}</div>
            </div>
            <div>
              <div className="text-4xl font-black text-blue-600 mb-2">100%</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.about_stats_prec}</div>
            </div>
            <div>
              <div className="text-4xl font-black text-blue-600 mb-2">24/7</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.about_stats_nodes}</div>
            </div>
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute inset-0 bg-blue-600 rounded-[80px] blur-[100px] opacity-10 -z-10 group-hover:opacity-20 transition-opacity"></div>
          <div className="bg-white p-4 rounded-[80px] shadow-2xl border border-slate-100 overflow-hidden transform group-hover:-rotate-2 transition-transform duration-700">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000" className="rounded-[60px] w-full h-[600px] object-cover" alt="Fintech" />
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-white rounded-[100px] p-20 md:p-32 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl font-black mb-16">{t.about_pillars_title}</h2>
          <div className="grid md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-3xl mx-auto shadow-xl"><i className="fas fa-shield-alt"></i></div>
              <h3 className="text-2xl font-black">{t.about_p1_title}</h3>
              <p className="text-slate-400 font-medium">{t.about_p1_desc}</p>
            </div>
            <div className="space-y-6">
              <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-3xl mx-auto shadow-xl"><i className="fas fa-microchip"></i></div>
              <h3 className="text-2xl font-black">{t.about_p2_title}</h3>
              <p className="text-slate-400 font-medium">{t.about_p2_desc}</p>
            </div>
            <div className="space-y-6">
              <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-3xl mx-auto shadow-xl"><i className="fas fa-graduation-cap"></i></div>
              <h3 className="text-2xl font-black">{t.about_p3_title}</h3>
              <p className="text-slate-400 font-medium">{t.about_p3_desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
