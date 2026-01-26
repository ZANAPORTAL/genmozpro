
import React from 'react';
import SEO from '../components/SEO';

const Disclaimer: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-40">
      <SEO title="Legal Disclaimer | GENMOZPRO" />
      <div className="bg-red-50 border border-red-100 rounded-[40px] p-12 mb-16 flex items-start gap-8">
        <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center text-white text-3xl shrink-0">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <div>
          <h1 className="text-4xl font-black text-red-900 mb-4">Important Disclaimer</h1>
          <p className="text-red-700/80 leading-relaxed font-bold">
            Please read this legal notice carefully before using any tools provided on GENMOZPRO.
          </p>
        </div>
      </div>

      <div className="prose prose-slate max-w-none text-slate-700 space-y-10 text-lg">
        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-4">Educational and Testing Purposes Only</h2>
          <p>
            All tools provided by GENMOZPRO, including the BIN Generator and Live Checker, are strictly for <strong>educational and development testing (QA) purposes only</strong>. We do not encourage, support, or facilitate any illegal activities, including credit card fraud or unauthorized transactions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-4">No Financial Advice</h2>
          <p>
            The content provided in our tech blog and articles is for informational purposes and does not constitute financial or legal advice. Users should consult with professionals before making significant financial or security decisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-4">Limitation of Liability</h2>
          <p>
            GENMOZPRO and its owners shall not be held liable for any damages, legal issues, or financial losses resulting from the misuse of our tools. The user assumes full responsibility for how they utilize the generated data.
          </p>
        </section>

        <section className="bg-slate-50 p-10 rounded-3xl border border-slate-100">
          <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Security Notice</p>
          <p className="italic">
            "Our algorithms utilize the Luhn Módulo 10 checksum to ensure structural validity. This is a mathematical property and does not imply that the data belongs to a real person or active account."
          </p>
        </section>
      </div>
    </div>
  );
};

export default Disclaimer;
