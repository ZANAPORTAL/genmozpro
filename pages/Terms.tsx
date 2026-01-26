
import React from 'react';
import SEO from '../components/SEO';
import { useTranslation } from '../components/LanguageContext';

const Terms: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-5xl mx-auto px-6 py-40">
      <SEO 
        title={`${t.navPrivacy} | User Agreement`} 
        description="Terms and conditions for using the GENMOZPRO fintech tools and editorial content."
      />
      
      <div className="mb-20">
        <span className="text-emerald-600 font-black tracking-widest uppercase text-xs bg-emerald-50 px-4 py-2 rounded-full mb-6 inline-block">Operator Agreement v4.2</span>
        <h1 className="text-6xl font-black mb-8 tracking-tighter text-slate-900 leading-none">Terms of <span className="text-emerald-600">Service</span>.</h1>
        <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-3xl">
          By accessing the GENMOZPRO infrastructure, you agree to be bound by the following terms, conditions, and legal responsibilities.
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-slate-700 space-y-16 text-lg leading-relaxed">
        <section className="bg-emerald-50 p-12 rounded-[50px] border border-emerald-100">
          <h2 className="text-3xl font-black text-emerald-900 mb-6">1. Permitted Use</h2>
          <p className="text-emerald-900/80">
            GENMOZPRO provides simulation tools based on the <strong>Luhn Algorithm (Mod 10)</strong> and high-fidelity gateway responses. These are intended <strong>exclusively</strong> for educational purposes, software development testing, and Quality Assurance (QA). Any data generated is mathematically structured but does not represent real financial accounts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-6 border-l-4 border-emerald-600 pl-6 uppercase tracking-widest text-sm">2. Prohibited Activities</h2>
          <p>
            Users are strictly prohibited from utilizing this infrastructure for:
          </p>
          <ul className="grid md:grid-cols-2 gap-6 mt-8 list-none pl-0 font-bold">
            <li className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4">
              <i className="fas fa-times-circle text-red-500 mt-1"></i>
              Any form of fraud, phishing, or unauthorized financial transactions.
            </li>
            <li className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4">
              <i className="fas fa-times-circle text-red-500 mt-1"></i>
              Distributed Denial of Service (DDoS) attacks against our edge nodes.
            </li>
            <li className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4">
              <i className="fas fa-times-circle text-red-500 mt-1"></i>
              Reverse engineering of the proprietary Core-v4 Engine.
            </li>
            <li className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4">
              <i className="fas fa-times-circle text-red-500 mt-1"></i>
              Scraping technical whitepapers for commercial redistribution.
            </li>
          </ul>
        </section>

        <section className="bg-slate-900 text-white p-16 rounded-[60px] shadow-2xl">
          <h2 className="text-3xl font-black mb-8">3. Limitation of Liability</h2>
          <p className="text-slate-400">
            THIS PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. GENMOZPRO SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES RESULTING FROM THE MISUSE OF OUR ALGORITHMS. THE OPERATOR ASSUMES FULL LEGAL RESPONSIBILITY FOR ACTIONS PERFORMED WITH GENERATED DATA.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-6">4. Intellectual Property</h2>
          <p>
            All textual content, visual design elements, trademarks, and technical whitepapers are the exclusive property of GENMOZPRO. Unauthorized use of our brand for "phishing" or creating mirror sites will result in immediate legal action under international IP law.
          </p>
        </section>

        <section className="border-t border-slate-100 pt-16">
          <h2 className="text-2xl font-black text-slate-900 mb-4">5. Jurisdiction</h2>
          <p>
            These terms are governed by international electronic commerce laws. Any disputes will be resolved via digital mediation according to ICC standards.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
