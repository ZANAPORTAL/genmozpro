
import React, { useState } from 'react';
import SEO from '../components/SEO';
import { useTranslation } from '../components/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-40">
      <SEO title={`${t.navContact} | GENMOZPRO`} description={t.contact_sub} />
      
      <div className="grid lg:grid-cols-12 gap-20 items-start">
        <div className="lg:col-span-5 space-y-16">
          <div>
            <h1 className="text-6xl font-black mb-8 tracking-tighter text-slate-900 leading-none">{t.contact_title.split(' ').slice(0,-1).join(' ')} <span className="text-blue-600">{t.contact_title.split(' ').slice(-1)}</span></h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed">{t.contact_sub}</p>
          </div>

          <div className="space-y-10">
            <div className="flex gap-8 items-start group">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-blue-600 text-2xl border border-slate-100 group-hover:scale-110 transition-transform duration-500">
                <i className="fas fa-envelope-open-text"></i>
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-xl mb-2">{t.contact_dept_tech}</h4>
                <p className="font-black text-blue-600 text-lg">support@genmozpro.com</p>
              </div>
            </div>

            <div className="flex gap-8 items-start group">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-emerald-600 text-2xl border border-slate-100 group-hover:scale-110 transition-transform duration-500">
                <i className="fas fa-briefcase"></i>
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-xl mb-2">{t.contact_dept_partner}</h4>
                <p className="font-black text-emerald-600 text-lg">partners@genmozpro.com</p>
              </div>
            </div>

            <div className="flex gap-8 items-start group">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-indigo-600 text-2xl border border-slate-100 group-hover:scale-110 transition-transform duration-500">
                <i className="fab fa-telegram-plane"></i>
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-xl mb-2">{t.contact_dept_community}</h4>
                <p className="font-black text-indigo-600 text-lg">@GenMozProOfficial</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white p-12 md:p-20 rounded-[80px] border border-slate-100 shadow-2xl relative">
            {sent ? (
              <div className="text-center py-20 animate-in zoom-in">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[40px] flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">
                  <i className="fas fa-check"></i>
                </div>
                <h2 className="text-4xl font-black text-slate-900">{t.contact_form_success}</h2>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <h2 className="text-4xl font-black text-slate-900 mb-4">{t.contact_form_title}</h2>
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.contact_form_name}</label>
                    <input required type="text" className="w-full px-8 py-6 bg-slate-50 border-2 border-slate-50 rounded-[30px] outline-none focus:border-blue-500 transition font-bold" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.contact_form_email}</label>
                    <input required type="email" className="w-full px-8 py-6 bg-slate-50 border-2 border-slate-50 rounded-[30px] outline-none focus:border-blue-500 transition font-bold" />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.contact_form_msg}</label>
                  <textarea required rows={6} className="w-full px-8 py-6 bg-slate-50 border-2 border-slate-50 rounded-[30px] outline-none focus:border-blue-500 transition resize-none font-medium"></textarea>
                </div>
                <button type="submit" className="w-full bg-slate-900 text-white py-8 rounded-[35px] font-black text-2xl hover:bg-blue-600 transition-all shadow-2xl active:scale-95">
                  {t.contact_form_btn}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
