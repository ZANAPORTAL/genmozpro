
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useTranslation } from '../components/LanguageContext';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'infra' | 'legal' | 'usage'>('infra');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqTabs = [
    { id: 'infra', label: t.faqTab1 },
    { id: 'legal', label: t.faqTab2 },
    { id: 'usage', label: t.faqTab3 }
  ];

  const currentFaqs = t.faqs[activeTab as keyof typeof t.faqs];

  return (
    <div className="space-y-32 pb-32">
      <SEO 
        title="GENMOZPRO - Next-Gen Fintech Suite"
        description="The ultimate platform for developers. Premium BIN generator, Stripe Live simulator, and high-tech financial education."
        keywords={['BIN Generator', 'Stripe Live Checker', 'Luhn Algorithm', 'Fintech Security', 'Fintech Whitepapers', 'FAQ']}
      />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-40">
          <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-blue-500 rounded-full mix-blend-multiply filter blur-[150px] animate-pulse"></div>
          <div className="absolute top-20 right-1/4 w-[600px] h-[600px] bg-indigo-500 rounded-full mix-blend-multiply filter blur-[150px] animate-pulse delay-700"></div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-6 py-2 mb-10 text-[10px] font-black tracking-[0.4em] text-blue-600 uppercase bg-blue-50 rounded-full border border-blue-100 shadow-sm">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></span>
            ECOSYSTEM UPDATED V4.2
          </div>
          <h1 className="text-6xl md:text-9xl font-black mb-12 tracking-tighter text-slate-900 leading-[0.85] lg:px-10">
            Intelligence that <span className="gradient-text">Defines</span> the Future.
          </h1>
          <p className="text-xl md:text-3xl text-slate-500 mb-16 max-w-4xl mx-auto leading-relaxed font-medium">
            Master the fintech market with surgical precision tools and executive-level editorial content.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link to="/ferramenta/gerador-de-bin" className="w-full sm:w-auto px-16 py-8 bg-slate-900 text-white rounded-[40px] font-black text-2xl hover:bg-blue-600 transition-all shadow-2xl hover:-translate-y-2 flex items-center justify-center gap-4 group">
              <i className="fas fa-microchip group-hover:rotate-90 transition-transform duration-500"></i> {t.openGen}
            </Link>
            <Link to="/artigos" className="w-full sm:w-auto px-16 py-8 bg-white text-slate-700 border-2 border-slate-100 rounded-[40px] font-black text-2xl hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-4">
              {t.readArticles} <i className="fas fa-chevron-right text-blue-500"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Guide Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="bg-white p-12 rounded-[60px] border border-slate-100 shadow-xl hover:shadow-2xl transition duration-500 group">
            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 text-3xl mb-10 group-hover:scale-110 transition-transform">
              <i className="fas fa-code-branch"></i>
            </div>
            <h3 className="text-3xl font-black mb-6">1. How to Generate</h3>
            <p className="text-slate-500 text-lg leading-relaxed">
              Enter the base BIN (6-12 digits). Our engine applies the Mod 10 algorithm to create structurally valid numbers for testing.
            </p>
          </div>
          <div className="bg-white p-12 rounded-[60px] border border-slate-100 shadow-xl hover:shadow-2xl transition duration-500 group">
            <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 text-3xl mb-10 group-hover:scale-110 transition-transform">
              <i className="fas fa-shield-virus"></i>
            </div>
            <h3 className="text-3xl font-black mb-6">2. How it Works</h3>
            <p className="text-slate-500 text-lg leading-relaxed">
              We use predictive analysis to identify global issuer patterns, ensuring generated data matches real institution structures.
            </p>
          </div>
          <div className="bg-white p-12 rounded-[60px] border border-slate-100 shadow-xl hover:shadow-2xl transition duration-500 group">
            <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center text-amber-600 text-3xl mb-10 group-hover:scale-110 transition-transform">
              <i className="fas fa-satellite-dish"></i>
            </div>
            <h3 className="text-3xl font-black mb-6">3. How to Validate</h3>
            <p className="text-slate-500 text-lg leading-relaxed">
              Use the Stripe Live Simulator to test gateway responses. Verify network logs, latency, and error codes in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-black tracking-widest uppercase text-[10px] bg-blue-50 px-4 py-2 rounded-full mb-6 inline-block">Support Portal</span>
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter">{t.faqTitle}</h2>
        </div>

        <div className="bg-white rounded-[50px] border border-slate-100 shadow-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-100 bg-slate-50/50 p-2">
            {faqTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); setOpenFaq(null); }}
                className={`flex-1 py-6 rounded-[30px] font-black text-xs uppercase tracking-widest transition-all ${
                  activeTab === tab.id 
                  ? 'bg-white text-blue-600 shadow-xl' 
                  : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="p-8 md:p-12 space-y-4">
            {currentFaqs.map((faq, index) => (
              <div 
                key={index} 
                className={`rounded-[30px] border transition-all duration-500 ${
                  openFaq === index ? 'bg-slate-50 border-blue-100' : 'bg-white border-transparent'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-8 text-left group"
                >
                  <span className={`text-xl font-black transition-colors ${
                    openFaq === index ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'
                  }`}>
                    {faq.q}
                  </span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    openFaq === index ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-50'
                  }`}>
                    <i className="fas fa-chevron-down text-xs"></i>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${
                  openFaq === index ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-8 pb-8 text-slate-500 text-lg leading-relaxed font-medium">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Authority Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-slate-900 rounded-[80px] p-16 md:p-32 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]"></div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-black mb-10 leading-[0.9]">Technical Excellence <br/><span className="text-blue-500">Guaranteed.</span></h2>
              <div className="space-y-8 mb-16">
                <div className="flex items-start gap-6">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 mt-1 shrink-0"><i className="fas fa-check"></i></div>
                  <p className="text-xl text-slate-300"><strong>Data Sync:</strong> Database synchronized with the latest BINs launched by global Neobanks.</p>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 mt-1 shrink-0"><i className="fas fa-check"></i></div>
                  <p className="text-xl text-slate-300"><strong>Privacy Protocol:</strong> Total anonymization of tests, following strict data protection guidelines.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-[60px] shadow-2xl rotate-3">
               <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800" className="rounded-[50px] w-full" alt="High Tech Server Room" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
