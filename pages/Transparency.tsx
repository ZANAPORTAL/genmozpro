
import React from 'react';
import SEO from '../components/SEO';
import { useTranslation } from '../components/LanguageContext';

const Transparency: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-4xl mx-auto px-6 py-40">
      <SEO title={t.transparencyTitle} description={t.transparencySub} />
      
      <header className="mb-20 text-center">
        <span className="text-blue-600 font-black tracking-widest uppercase text-xs bg-blue-50 px-4 py-2 rounded-full mb-6 inline-block">Integridade GenMoz</span>
        <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-slate-900">{t.transparencyTitle}</h1>
        <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
          {t.transparencySub}
        </p>
      </header>

      <div className="space-y-16 prose prose-slate max-w-none">
        <section className="bg-white p-12 rounded-[50px] border border-slate-100 shadow-xl">
          <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl"><i className="fas fa-dollar-sign"></i></div>
            Como Ganhamos Dinheiro
          </h2>
          <p className="text-lg text-slate-600 leading-loose">
            O GENMOZPRO é mantido através de publicidade contextual (Google AdSense e Redes de AdX). Isso nos permite manter todas as nossas ferramentas de geração e validação 100% gratuitas para desenvolvedores e entusiastas de QA. Não vendemos dados de usuários, nem cobramos assinaturas para recursos básicos de motor.
          </p>
        </section>

        <section className="bg-white p-12 rounded-[50px] border border-slate-100 shadow-xl">
          <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-xl"><i className="fas fa-brain"></i></div>
            Uso de Inteligência Artificial
          </h2>
          <p className="text-lg text-slate-600 leading-loose">
            Utilizamos os modelos mais recentes (Gemini 2.5/3.0) para gerar insights técnicos e estruturar nossos whitepapers. Cada artigo passa por uma revisão humana para garantir que as informações de conformidade e as tendências de 2026 sejam precisas e seguras para nossos leitores.
          </p>
        </section>

        <section className="bg-white p-12 rounded-[50px] border border-slate-100 shadow-xl">
          <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center text-white text-xl"><i className="fas fa-handshake"></i></div>
            Compromisso Ético
          </h2>
          <p className="text-lg text-slate-600 leading-loose">
            Nossas ferramentas são projetadas estritamente para simulação de sistemas. Implementamos o algoritmo de Luhn (Módulo 10) para fins matemáticos e de integridade de formulários de pagamento. Repudiamos qualquer uso fraudulento das informações geradas e colaboramos ativamente com as diretrizes de segurança cibernética globais.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Transparency;
