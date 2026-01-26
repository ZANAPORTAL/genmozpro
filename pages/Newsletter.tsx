
import React, { useState } from 'react';
import SEO from '../components/SEO';
import { useTranslation } from '../components/LanguageContext';

const Newsletter: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO title={t.newsletterTitle} description={t.newsletterSub} />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden bg-slate-900 text-white">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-blue-400 font-black tracking-[0.3em] uppercase text-xs mb-8 block">Inscrição Prioritária 2026</span>
          <h1 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.9]">
            {t.newsletterTitle}
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium mb-16">
            {t.newsletterSub}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700 mb-20">
             <i className="fab fa-stripe text-5xl"></i>
             <i className="fab fa-cc-visa text-5xl"></i>
             <i className="fab fa-cc-mastercard text-5xl"></i>
             <i className="fab fa-google-pay text-5xl"></i>
             <i className="fab fa-apple-pay text-5xl"></i>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: 'fa-gem', title: t.benefit1Title, desc: t.benefit1Desc, color: 'bg-blue-600' },
            { icon: 'fa-shield-alt', title: t.benefit2Title, desc: t.benefit2Desc, color: 'bg-emerald-600' },
            { icon: 'fa-users', title: t.benefit3Title, desc: t.benefit3Desc, color: 'bg-indigo-600' }
          ].map((benefit, i) => (
            <div key={i} className="bg-white p-12 rounded-[50px] shadow-2xl border border-slate-100 hover:-translate-y-2 transition-transform duration-500">
               <div className={`w-16 h-16 ${benefit.color} rounded-2xl flex items-center justify-center text-white text-2xl mb-8 shadow-xl`}>
                 <i className={`fas ${benefit.icon}`}></i>
               </div>
               <h3 className="text-2xl font-black text-slate-900 mb-4">{benefit.title}</h3>
               <p className="text-slate-500 text-lg leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-4xl mx-auto px-6 py-40">
        <div className="bg-white p-12 md:p-24 rounded-[80px] border border-slate-100 shadow-2xl text-center">
          {status === 'success' ? (
            <div className="animate-in zoom-in duration-500 space-y-8">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[40px] flex items-center justify-center text-4xl mx-auto animate-bounce">
                <i className="fas fa-check"></i>
              </div>
              <h2 className="text-4xl font-black text-slate-900">Assinatura Confirmada!</h2>
              <p className="text-slate-500 text-xl font-medium">Sua conexão com a Mainnet GenMoz Pro foi estabelecida com sucesso.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-blue-600 font-black uppercase tracking-widest text-xs hover:underline"
              >
                Voltar
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Insira suas credenciais de e-mail</h2>
              <form onSubmit={handleSubscribe} className="space-y-6">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none">
                    <i className="fas fa-envelope text-slate-300 group-focus-within:text-blue-600 transition-colors"></i>
                  </div>
                  <input 
                    required
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="ex: operator@fintech-security.com"
                    className="w-full pl-16 pr-8 py-7 bg-slate-50 border-2 border-slate-50 rounded-[35px] outline-none focus:border-blue-600 transition text-xl font-bold"
                  />
                </div>
                <button 
                  disabled={status === 'loading'}
                  className="w-full py-7 bg-blue-600 text-white rounded-[35px] font-black text-2xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/30 disabled:opacity-50 active:scale-95 flex items-center justify-center gap-4"
                >
                  {status === 'loading' ? <i className="fas fa-sync animate-spin"></i> : <i className="fas fa-paper-plane"></i>}
                  {status === 'loading' ? 'Processando...' : t.subscribeBtn}
                </button>
              </form>
              <div className="flex items-center justify-center gap-4">
                 <div className="flex -space-x-4">
                    {[1,2,3,4].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-10 h-10 rounded-full border-4 border-white shadow-sm" alt="User" />
                    ))}
                 </div>
                 <p className="text-xs font-black text-slate-400 uppercase tracking-widest">+52k Operators Joined</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer-ish Info */}
      <section className="max-w-4xl mx-auto px-6 pb-40 text-center opacity-30">
         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">
           © GENMOZPRO SECURE BROADCASTING • NO SPAM POLICY • ENCRYPTED CONNECTION
         </p>
      </section>
    </div>
  );
};

export default Newsletter;
