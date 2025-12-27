import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Page: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="max-w-4xl mx-auto py-12 md:py-24 px-4 sm:px-6 animate-fade-in">
    <div className="glass-card p-8 md:p-16 rounded-[32px] md:rounded-[40px] border-brand-800 shadow-2xl">
      <header className="mb-12 border-b border-white/5 pb-10">
        <span className="text-[10px] font-black text-brand-accent uppercase tracking-[0.4em] mb-4 block">Compliance & Legal</span>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">{title}</h1>
      </header>
      <div className="text-slate-400 leading-relaxed space-y-10 text-base md:text-lg article-content">
        {children}
      </div>
    </div>
  </div>
);

export const About = () => {
  const { t } = useLanguage();
  return (
    <Page title={t.legal.about_t}>
      <article className="space-y-8">
        <p className="text-white text-xl md:text-2xl font-medium leading-snug">
          {t.legal.about_content}
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <section className="p-8 bg-brand-900/50 rounded-3xl border border-white/5 space-y-4">
            <h3 className="text-brand-accent font-black text-xs uppercase tracking-widest">{t.legal.mission}</h3>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">{t.legal.mission_content}</p>
          </section>
          <section className="p-8 bg-brand-900/50 rounded-3xl border border-white/5 space-y-4">
            <h3 className="text-brand-accent font-black text-xs uppercase tracking-widest">{t.legal.vision}</h3>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">{t.legal.vision_content}</p>
          </section>
        </div>
      </article>
    </Page>
  );
};

export const Privacy = () => {
  const { t } = useLanguage();
  return (
    <Page title={t.legal.privacy_t}>
      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-white font-bold text-xl uppercase tracking-tight">1. {t.nav.privacy}</h2>
          <p>{t.legal.privacy_intro}</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-white font-bold text-xl uppercase tracking-tight">2. {t.legal.privacy_cookies_t}</h2>
          <p>{t.legal.privacy_cookies_desc}</p>
        </section>

        <section className="space-y-4 p-6 bg-brand-accent/5 border border-brand-accent/20 rounded-2xl">
          <h2 className="text-brand-accent font-bold text-xl uppercase tracking-tight">3. {t.legal.privacy_data_t}</h2>
          <p className="text-white/80">{t.legal.privacy_data_desc}</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-white font-bold text-xl uppercase tracking-tight">4. {t.legal.privacy_ads_t}</h2>
          <p>{t.legal.privacy_ads_desc}</p>
        </section>
      </div>
    </Page>
  );
};

export const Terms = () => {
  const { t } = useLanguage();
  return (
    <Page title={t.legal.terms_t}>
      <div className="space-y-12">
        <p className="text-white/70 italic text-xl">{t.legal.terms_intro}</p>

        <section className="space-y-4">
          <h2 className="text-white font-bold text-xl uppercase tracking-tight">1. {t.legal.terms_conduct_t}</h2>
          <p>{t.legal.terms_conduct_desc}</p>
        </section>

        <section className="space-y-4 border-l-4 border-red-500/30 pl-8 py-2">
          <h2 className="text-white font-bold text-xl uppercase tracking-tight">2. {t.legal.terms_disclaimer_t}</h2>
          <p className="text-sm italic">{t.legal.terms_disclaimer_desc}</p>
        </section>
      </div>
    </Page>
  );
};

export const Contact = () => {
  const { t } = useLanguage();
  const [sent, setSent] = React.useState(false);

  return (
    <Page title={t.legal.contact_t}>
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <p className="text-xl text-white/80 leading-snug">{t.legal.contact_desc}</p>
          <div className="space-y-6 pt-6">
            <div className="flex items-center gap-6 p-6 bg-brand-900/40 rounded-3xl border border-white/5">
              <div className="w-14 h-14 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Electronic Mail</p>
                <p className="text-white font-bold text-lg">legal@genmozpro.com</p>
              </div>
            </div>
          </div>
        </div>
        
        <form className="space-y-6" onSubmit={e => { e.preventDefault(); setSent(true); }}>
          {sent ? (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center bg-brand-accent/5 border border-brand-accent/20 rounded-3xl space-y-6 animate-fade-in">
              <div className="w-20 h-20 bg-brand-accent text-brand-950 rounded-full flex items-center justify-center text-3xl font-bold shadow-xl shadow-brand-accent/20">✓</div>
              <p className="text-white font-black uppercase tracking-widest text-sm text-center px-8">{t.legal.contact_success}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full input-dark p-5 rounded-2xl outline-none text-white text-sm" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Email Address</label>
                <input type="email" placeholder="john@company.com" className="w-full input-dark p-5 rounded-2xl outline-none text-white text-sm" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Message</label>
                <textarea placeholder="How can we help you?" className="w-full input-dark p-5 rounded-3xl outline-none text-white text-sm h-40 resize-none" required />
              </div>
              <button className="w-full bg-brand-accent py-6 rounded-2xl font-black text-brand-950 text-xs tracking-[0.3em] hover:brightness-110 active:scale-[0.98] transition-all uppercase shadow-lg shadow-brand-accent/20">
                {t.legal.contact_btn}
              </button>
            </div>
          )}
        </form>
      </div>
    </Page>
  );
};
