import React, { useState, useEffect, useMemo } from 'react';
import { generateCard, generateExpiry, generateCVV, luhnCheck, getCardType } from '../utils/cardUtils';
import { analyzeBinWithAI, BinInfo } from '../services/gemini';
import { useLanguage } from '../contexts/LanguageContext';

interface CheckResult {
  data: string;
  status: string;
  id: number;
  brand?: string;
  expiry?: string;
  cvv?: string;
  statusType: 'live' | 'die' | 'unknown';
}

type ResultFilter = 'all' | 'live' | 'unknown' | 'die';

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'gen' | 'check' | 'stripe'>('gen');
  const [activeResultFilter, setActiveResultFilter] = useState<ResultFilter>('all');
  
  // Generator State
  const [bin, setBin] = useState('');
  const [qty, setQty] = useState('10');
  const [selMonth, setSelMonth] = useState('Random');
  const [selYear, setSelYear] = useState('Random');
  const [includeDate, setIncludeDate] = useState(true);
  const [includeCvv, setIncludeCvv] = useState(true);
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiInfo, setAiInfo] = useState<BinInfo | null>(null);

  // Checker State
  const [checkList, setCheckList] = useState('');
  const [results, setResults] = useState<CheckResult[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [currentCheckingLine, setCurrentCheckingLine] = useState<number | null>(null);

  const counts = useMemo(() => ({
    all: results.length,
    live: results.filter(r => r.statusType === 'live').length,
    unknown: results.filter(r => r.statusType === 'unknown').length,
    die: results.filter(r => r.statusType === 'die').length
  }), [results]);

  const filteredResultsList = useMemo(() => {
    if (activeResultFilter === 'all') return results;
    return results.filter(r => r.statusType === activeResultFilter);
  }, [results, activeResultFilter]);

  useEffect(() => {
    if (bin.length >= 6) {
      const timer = setTimeout(() => {
        analyzeBinWithAI(bin.slice(0, 6)).then(setAiInfo);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setAiInfo(null);
    }
  }, [bin]);

  const handleGenerate = () => {
    if (bin.length < 6) return;
    setIsGenerating(true);
    const cards = [];
    const count = Math.min(parseInt(qty) || 1, 1000);
    const brand = getCardType(bin);
    
    for (let i = 0; i < count; i++) {
      const cardNum = generateCard(bin);
      let entry = cardNum;
      if (includeDate) entry += `|${generateExpiry(selMonth, selYear)}`;
      if (includeCvv) entry += `|${generateCVV()}`;
      
      const countryStr = aiInfo ? `${aiInfo.country} ${aiInfo.country_flag}` : '';
      const countryLabel = aiInfo ? ` [${brand} - ${countryStr}]` : ` [${brand}]`;
      cards.push(entry + countryLabel);
    }
    setGeneratedText(cards.join('\n'));
    setIsGenerating(false);
  };

  const simulateStripeNuanced = (cardNum: string, cvv: string, ai: BinInfo | null): { status: string; statusType: 'live' | 'die' | 'unknown' } => {
    const isValidLuhn = luhnCheck(cardNum);
    if (!isValidLuhn) return { status: 'Luhn Error', statusType: 'die' };
    
    let seed = Math.random();
    if (ai) {
      const level = ai.level.toLowerCase();
      if (level.includes('infinite') || level.includes('platinum') || level.includes('black')) seed -= 0.15;
    }

    if (seed < 0.15) return { status: 'Approved', statusType: 'live' };
    if (seed < 0.35) return { status: 'CVC Match', statusType: 'live' };
    if (seed < 0.45) return { status: 'Timeout', statusType: 'unknown' };
    if (seed < 0.65) return { status: 'Low Funds', statusType: 'die' };
    return { status: 'Declined', statusType: 'die' };
  };

  const handleCheck = async (mode: 'cc' | 'stripe') => {
    const lines = checkList.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (!lines.length) return;
    
    setIsChecking(true);
    setResults([]);
    setActiveResultFilter('all');
    
    for (let i = 0; i < lines.length; i++) {
      setCurrentCheckingLine(i);
      const line = lines[i];
      const rawCard = line.split(' [')[0];
      const parts = rawCard.split('|').map(p => p.trim());
      const cardNum = parts[0];
      const brand = getCardType(cardNum);
      const cvv = parts[3] || parts[parts.length - 1];
      
      // Realistic simulation delay: 1.2s to 2.8s per line
      const realisticDelay = 1200 + Math.random() * 1600;
      await new Promise(r => setTimeout(r, realisticDelay)); 
      
      let statusData;
      if (mode === 'cc') {
        const valid = luhnCheck(cardNum);
        statusData = {
          status: valid ? t.check.live_label : t.check.die_label,
          statusType: (valid ? 'live' : 'die') as 'live' | 'die' | 'unknown'
        };
      } else {
        statusData = simulateStripeNuanced(cardNum, cvv, aiInfo);
      }
      
      setResults(prev => [{ 
        data: rawCard, 
        status: statusData.status, 
        id: Date.now() + i,
        brand,
        statusType: statusData.statusType
      }, ...prev]);
    }
    setIsChecking(false);
    setCurrentCheckingLine(null);
  };

  const clearResults = () => {
    setGeneratedText('');
    setResults([]);
    setActiveResultFilter('all');
  };

  const copyResults = (typeFilter: ResultFilter = 'all') => {
    let textToCopy = '';
    if (activeTab === 'gen') {
      textToCopy = generatedText.split('\n').filter(l => l.trim()).map(l => l.split(' [')[0]).join('\n');
    } else {
      const targetResults = typeFilter === 'all' ? results : results.filter(r => r.statusType === typeFilter);
      textToCopy = targetResults.map(r => r.data).join('\n');
    }
    navigator.clipboard.writeText(textToCopy);
    alert(t.gen.copied);
  };

  const sendToChecker = (mode: 'check' | 'stripe') => {
    const cleaned = generatedText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => line.split(' [')[0])
      .join('\n');
    
    setCheckList(cleaned);
    setActiveTab(mode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isBinInvalid = bin.length < 6;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-12 md:space-y-16 animate-fade-in">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter">
          {t.hero.title.slice(0, 6)}<span className="text-brand-accent">{t.hero.title.slice(6)}</span>
        </h1>
        <h2 className="text-slate-500 font-medium text-sm md:text-base max-w-2xl mx-auto">
          {t.hero.subtitle}
        </h2>
      </section>

      <section className="max-w-3xl mx-auto w-full">
        <div className="glass-card p-6 md:p-8 rounded-[24px] md:rounded-[32px] flex flex-col md:flex-row items-center gap-6 border-white/5 glow-accent">
          <div className="w-14 h-14 bg-brand-accent/10 rounded-full flex items-center justify-center border border-brand-accent/20 flex-shrink-0">
            <svg className="w-7 h-7 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex-grow text-center md:text-left">
            <h3 className="text-white font-bold text-base">{t.assistant.hello}</h3>
            <p className="text-slate-500 text-xs">{t.assistant.ask}</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button onClick={() => setActiveTab('gen')} className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'gen' ? 'bg-brand-accent text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}>
              {t.assistant.btn_gen}
            </button>
            <button onClick={() => setActiveTab('check')} className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'check' || activeTab === 'stripe' ? 'bg-brand-accent text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}>
              {t.assistant.btn_val}
            </button>
          </div>
        </div>
      </section>

      <div className="space-y-8">
        <div className="flex justify-center">
          <div className="bg-brand-900/60 p-1 rounded-2xl flex border border-white/5">
            <button onClick={() => setActiveTab('gen')} className={`px-6 py-3 rounded-xl transition-all ${activeTab === 'gen' ? 'bg-brand-accent/10 text-brand-accent shadow-inner' : 'text-slate-500 hover:text-white'}`}>
              <span className="text-[10px] font-black uppercase tracking-widest">{t.gen.tab_title}</span>
            </button>
            <button onClick={() => setActiveTab('check')} className={`px-6 py-3 rounded-xl transition-all ${activeTab === 'check' ? 'bg-brand-accent/10 text-brand-accent shadow-inner' : 'text-slate-500 hover:text-white'}`}>
              <span className="text-[10px] font-black uppercase tracking-widest">{t.check.tab_title}</span>
            </button>
            <button onClick={() => setActiveTab('stripe')} className={`px-6 py-3 rounded-xl transition-all ${activeTab === 'stripe' ? 'bg-brand-accent/10 text-brand-accent shadow-inner' : 'text-slate-500 hover:text-white'}`}>
              <span className="text-[10px] font-black uppercase tracking-widest">{t.check.tab_stripe}</span>
            </button>
          </div>
        </div>

        <div className="glass-card rounded-[24px] md:rounded-[40px] border-white/5 overflow-hidden shadow-2xl">
          {activeTab === 'gen' ? (
            <div className="grid lg:grid-cols-2">
              <div className="p-6 md:p-14 space-y-8 border-r border-white/5">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.gen.input_label}</label>
                    {isBinInvalid && bin.length > 0 && <span className="text-[9px] text-red-400 font-bold uppercase tracking-widest">{t.gen.bin_required}</span>}
                  </div>
                  <input type="text" value={bin} onChange={e => setBin(e.target.value.replace(/\D/g, '').slice(0, 16))} placeholder="451416" className={`w-full input-dark p-6 rounded-2xl text-3xl font-mono tracking-widest ${isBinInvalid && bin.length > 0 ? 'border-red-500/50' : ''}`} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.gen.month}</label>
                    <select value={selMonth} onChange={e => setSelMonth(e.target.value)} className="w-full input-dark p-4 rounded-xl text-sm font-bold appearance-none cursor-pointer">
                      <option value="Random">{t.gen.random}</option>
                      {Array.from({length: 12}, (_, i) => (i+1).toString().padStart(2, '0')).map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.gen.year}</label>
                    <select value={selYear} onChange={e => setSelYear(e.target.value)} className="w-full input-dark p-4 rounded-xl text-sm font-bold appearance-none cursor-pointer">
                      <option value="Random">{t.gen.random}</option>
                      {Array.from({length: 10}, (_, i) => (new Date().getFullYear() + i).toString()).map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.gen.qty}</label>
                  <input type="number" value={qty} onChange={e => setQty(e.target.value)} className="w-full input-dark p-4 rounded-xl text-sm font-bold" />
                </div>
                <button onClick={handleGenerate} disabled={isGenerating || isBinInvalid} className={`w-full py-6 rounded-2xl font-black text-[10px] tracking-[0.3em] uppercase transition-all shadow-xl ${isBinInvalid ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50' : 'bg-brand-accent text-white hover:brightness-110 active:scale-[0.98] shadow-brand-accent/20'}`}>
                  {isGenerating ? '...' : t.gen.btn_generate}
                </button>
              </div>
              <div className="p-8 md:p-14 bg-black/20 flex flex-col justify-center items-center text-center space-y-8 min-h-[400px]">
                {aiInfo ? (
                  <div className="space-y-8 w-full animate-fade-in">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 bg-brand-accent/5 rounded-full flex items-center justify-center border border-brand-accent/10">
                        <span className="text-4xl">{aiInfo.country_flag}</span>
                      </div>
                      <div>
                        <h4 className="text-white font-black text-2xl uppercase tracking-tight">{aiInfo.bank}</h4>
                        <p className="text-brand-accent text-sm font-bold uppercase tracking-widest">{aiInfo.country}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <span className="block text-[8px] font-black text-slate-500 uppercase mb-1">Level</span>
                        <span className="text-xs font-bold text-white uppercase">{aiInfo.level}</span>
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <span className="block text-[8px] font-black text-slate-500 uppercase mb-1">Network</span>
                        <span className="text-xs font-bold text-white uppercase">{aiInfo.brand}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="opacity-10 space-y-4 flex flex-col items-center">
                    <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    <p className="text-[10px] font-black uppercase tracking-widest italic">{bin.length >= 6 ? t.gen.analyzing : t.gen.placeholder}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-6 md:p-14 space-y-8">
              <div className={`relative space-y-4 ${isChecking ? 'checker-scanning' : ''}`}>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.check.input_label}</label>
                <textarea 
                  value={checkList} 
                  onChange={(e) => setCheckList(e.target.value)} 
                  className={`w-full h-80 input-dark p-8 rounded-3xl font-mono text-sm leading-relaxed resize-none transition-all ${isChecking ? 'opacity-40 select-none grayscale cursor-wait' : ''}`} 
                  placeholder="Numero|Mes|Ano|CVV..." 
                  disabled={isChecking}
                />
              </div>
              <button 
                onClick={() => handleCheck(activeTab === 'check' ? 'cc' : 'stripe')} 
                disabled={isChecking || !checkList.trim()} 
                className={`w-full py-6 rounded-2xl font-black text-[10px] tracking-[0.3em] uppercase transition-all shadow-xl text-white ${isChecking ? 'btn-processing scale-[0.98]' : activeTab === 'check' ? 'bg-brand-accent shadow-brand-accent/20' : 'bg-brand-secondary shadow-brand-secondary/20 hover:brightness-110 active:scale-[0.98]'}`}
              >
                {isChecking ? `${t.check.status_processing} (${currentCheckingLine !== null ? currentCheckingLine + 1 : 0}/${checkList.split('\n').filter(l => l.trim()).length})` : t.check.btn_start}
              </button>
            </div>
          )}
        </div>
      </div>

      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
          <div className="space-y-4 w-full md:w-auto">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">{t.gen.results}</span>
             {(activeTab === 'check' || activeTab === 'stripe') && results.length > 0 && (
               <div className="flex flex-wrap gap-2 items-center bg-black/40 p-1.5 rounded-2xl border border-white/5 shadow-xl w-fit">
                 <button onClick={() => setActiveResultFilter('all')} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeResultFilter === 'all' ? 'bg-white/10 text-white shadow-inner' : 'text-slate-500'}`}>All {counts.all}</button>
                 <button onClick={() => setActiveResultFilter('live')} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeResultFilter === 'live' ? 'bg-emerald-500/20 text-emerald-400' : 'text-emerald-500/30'}`}>Live {counts.live}</button>
                 <button onClick={() => setActiveResultFilter('unknown')} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeResultFilter === 'unknown' ? 'bg-amber-500/20 text-amber-400' : 'text-amber-500/30'}`}>Unknown {counts.unknown}</button>
                 <button onClick={() => setActiveResultFilter('die')} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeResultFilter === 'die' ? 'bg-red-500/20 text-red-400' : 'text-red-500/30'}`}>Die {counts.die}</button>
               </div>
             )}
          </div>
          <div className="flex gap-2 self-end w-full md:w-auto">
            <button onClick={clearResults} className="flex-1 md:flex-none px-6 py-2.5 bg-white/5 hover:bg-white/10 text-[9px] font-black uppercase tracking-widest text-slate-400 rounded-xl transition-all border border-white/5">{t.check.clear}</button>
            <button onClick={() => copyResults(activeResultFilter)} className="flex-1 md:flex-none px-6 py-2.5 bg-brand-accent/10 hover:bg-brand-accent/20 text-[9px] font-black uppercase tracking-widest text-brand-accent rounded-xl transition-all border border-brand-accent/20">{activeResultFilter === 'all' ? t.check.copy_all : t.check.copy_live}</button>
          </div>
        </div>

        <div className="glass-card rounded-[32px] p-6 md:p-10 min-h-[500px] border-white/5 relative overflow-hidden shadow-2xl">
          <div className="results-area max-h-[800px] overflow-y-auto pr-2">
            {activeTab === 'gen' ? (
              <div className="space-y-1">
                {!generatedText && <p className="text-slate-700 font-mono text-xs text-center py-24 italic opacity-30">{t.gen.waiting}</p>}
                {generatedText.split('\n').filter(l => l.trim()).map((line, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 border-b border-white/5 px-4 hover:bg-white/5 transition-all rounded-lg group">
                    <span className="font-mono text-xs md:text-sm text-slate-400 group-hover:text-white transition-colors tracking-widest">{line}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in" key={activeResultFilter}>
                {results.length === 0 && <p className="text-slate-700 font-mono text-xs text-center py-24 italic opacity-30">{t.check.status_ready}</p>}
                {filteredResultsList.map((r) => (
                  <div key={r.id} className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-5 rounded-2xl border font-mono text-xs transition-all animate-fade-in group border-l-8 ${r.statusType === 'live' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400 border-l-emerald-500' : r.statusType === 'unknown' ? 'bg-amber-500/5 border-amber-500/20 text-amber-400 border-l-amber-500' : 'bg-red-500/5 border-red-500/20 text-red-500/60 border-l-red-500'}`}>
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className={`font-black px-2.5 py-1 rounded text-[9px] uppercase tracking-tighter ${r.statusType === 'live' ? 'bg-emerald-500 text-brand-950' : r.statusType === 'unknown' ? 'bg-amber-500 text-brand-950' : 'bg-red-500 text-white'}`}>{r.status}</span>
                      <span className="tracking-widest font-bold break-all">{r.data}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-4 sm:mt-0 opacity-40 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-black uppercase bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">{r.brand}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {activeTab === 'gen' && generatedText && (
            <div className="mt-10 pt-8 border-t border-white/5 flex flex-wrap gap-6 justify-end">
               <button onClick={() => sendToChecker('check')} className="flex items-center gap-3 text-[10px] font-black text-slate-400 hover:text-brand-accent uppercase tracking-widest transition-all group"><span>{t.gen.send_checker}</span><svg className="w-4 h-4 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></button>
               <button onClick={() => sendToChecker('stripe')} className="flex items-center gap-3 text-[10px] font-black text-slate-400 hover:text-brand-secondary uppercase tracking-widest transition-all group"><span>{t.gen.send_stripe}</span><svg className="w-4 h-4 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></button>
            </div>
          )}
        </div>
      </section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { icon: 'flask', title: t.features.ai_title, desc: t.features.ai_desc },
          { icon: 'check', title: t.features.luhn_title, desc: t.features.luhn_desc },
          { icon: 'lock', title: t.features.lock_title, desc: t.features.lock_desc }
        ].map((f, i) => (
          <div key={i} className="glass-card p-10 rounded-[32px] space-y-6 group hover:border-brand-accent/20 transition-all duration-500 hover:translate-y-[-4px]">
             <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-accent group-hover:bg-brand-accent/10 transition-all">
                {f.icon === 'flask' ? <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.503 1.508a2 2 0 01-2.046 1.414h-3.02a2 2 0 01-2.046-1.414l-.503-1.508a2 2 0 00-1.96-1.414l-2.387.477a2 2 0 00-1.022.547l-1.161 1.161a2 2 0 01-2.828 0l-3.536-3.536a2 2 0 010-2.828l1.161-1.161a2 2 0 00.547-1.022l.477-2.387a2 2 0 00-1.414-1.96L3.162 10.3c-.87-.29-1.414-1.206-1.414-2.046V5.234" /></svg> : f.icon === 'check' ? <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> : <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
             </div>
             <div className="space-y-3">
                <h4 className="text-white font-bold tracking-tight text-lg">{f.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
             </div>
          </div>
        ))}
      </section>
    </div>
  );
};
