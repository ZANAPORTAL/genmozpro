
import React from 'react';
import SEO from '../components/SEO';
import { useTranslation } from '../components/LanguageContext';

const Privacy: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-5xl mx-auto px-6 py-40">
      <SEO 
        title={`${t.navPrivacy} | Data Protection Protocols`} 
        description="Detailed information on how GENMOZPRO handles data, privacy, and user anonymity."
      />
      
      <div className="mb-20">
        <span className="text-blue-600 font-black tracking-widest uppercase text-xs bg-blue-50 px-4 py-2 rounded-full mb-6 inline-block">Compliance Version 4.2 - Jan 2026</span>
        <h1 className="text-6xl font-black mb-8 tracking-tighter text-slate-900 leading-none">Privacy & <span className="text-blue-600">Trust</span>.</h1>
        <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-3xl">
          At GENMOZPRO, privacy is not just a legal requirement; it is a fundamental architectural choice. We operate with extreme transparency regarding data handling.
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-slate-700 space-y-16 text-lg leading-relaxed">
        <section className="bg-white p-12 rounded-[50px] border border-slate-100 shadow-sm">
          <h2 className="text-3xl font-black text-slate-900 mb-6">1. Data Minimization & Anonymity</h2>
          <p>
            GENMOZPRO operates under the principle of <strong>Absolute Data Minimization</strong>. Our ecosystem is designed to function without the need for user accounts, real names, or identity verification for standard testing operations.
          </p>
          <p className="mt-4">
            We collect only the essential technical metadata required to maintain network integrity:
          </p>
          <ul className="list-disc pl-8 space-y-4 mt-6 font-medium">
            <li><strong>IP Truncation:</strong> Your IP address is processed temporarily for DDoS mitigation but is never stored in full. We use geo-hashing to identify traffic sources without pinpointing locations.</li>
            <li><strong>Session Cookies:</strong> We utilize minimal session cookies to preserve your language preferences and generator configurations during your active visit.</li>
            <li><strong>Telemetric Logs:</strong> Anonymized logs regarding tool usage volumes are used solely for server load balancing and scaling.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-6 border-l-4 border-blue-600 pl-6 uppercase tracking-widest text-sm">2. The "Stateless Core" Protocol</h2>
          <p>
            Our Stripe Live Checker and BIN Generator run on what we call a <strong>Stateless Core</strong>. Any card data entered for validation is held exclusively in the volatile memory (RAM) of our edge nodes. This data is physically destroyed millisecond after the API response is returned to your browser. We maintain <strong>Zero Persistent Databases</strong> for validation logs.
          </p>
        </section>

        <section className="bg-slate-900 text-white p-16 rounded-[60px] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full"></div>
          <h2 className="text-3xl font-black mb-8">3. AdX & Google AdSense Disclosure</h2>
          <p className="text-slate-300">
            To keep our infrastructure free for the developer community, we utilize programmatic advertising. Third-party vendors, including Google, use cookies to serve ads based on your prior visits. We do not share your technical validation data or BIN inputs with these vendors. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-blue-400 underline font-bold">Google Ad Settings</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-6">4. Global Regulatory Compliance (GDPR/LGPD)</h2>
          <p>
            While we do not maintain user profiles, we respect all rights under the General Data Protection Regulation (GDPR) and the Lei Geral de Proteção de Dados (LGPD):
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-100">
              <h3 className="font-black text-slate-900 mb-4">Right to Erasure</h3>
              <p className="text-sm">Since no data is stored persistently, your "right to be forgotten" is built into our architecture by default.</p>
            </div>
            <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-100">
              <h3 className="font-black text-slate-900 mb-4">Data Portability</h3>
              <p className="text-sm">Technical diagnostic logs can be exported directly via CSV within the tool interface for your own records.</p>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-16">
          <h2 className="text-2xl font-black text-slate-900 mb-4">5. Contact Information</h2>
          <p>
            For inquiries regarding privacy protocols or security audits, please reach out to our compliance officer:
          </p>
          <p className="mt-4 font-black text-blue-600 text-xl">
            compliance@genmozpro.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
