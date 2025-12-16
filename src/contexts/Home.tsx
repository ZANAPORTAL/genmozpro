import React, { useState, useEffect } from 'react';
import { generateCard, generateExpiry, generateCVV, luhnCheck, identifyCardType } from '../utils/cardUtils';
import { analyzeBinWithAI, BinInfo } from '../services/gemini';
import { useLanguage } from '../contexts/LanguageContext';

// Tooltip Component
const Tooltip = ({ text, children, className = "" }: { text: string; children?: React.ReactNode; className?: string }) => (
  <div className={`relative group ${className}`}>
    {children}
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900/95 text-xs text-gray-200 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-gray-700 shadow-xl z-50">
      {text}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900/95"></div>
    </div>
  </div>
);

export const Home: React.FC = () => {
  // Translations
  const { t } = useLanguage();

  // Navigation State
  const [activeTab, setActiveTab] = useState<'gen' | 'format' | 'stripe'>('gen');

  // Generator State
  const [bin, setBin] = useState('');
  const [quantity, setQuantity] = useState(10);
  const [generatedCards, setGeneratedCards] = useState<string>('');
  const [includeDate, setIncludeDate] = useState(true);
  const [includeCVV, setIncludeCVV] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('Random');
  const [selectedYear, setSelectedYear] = useState('Random');
  
  // AI & Loading States
  const [aiInfo, setAiInfo] = useState<BinInfo | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [genStatusText, setGenStatusText] = useState('');
  
  // UX States
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);

  // Checker State
  const [cardsToCheck, setCardsToCheck] = useState('');
  const [checkedResults, setCheckedResults] = useState<{ number: string; status: string; message: string; badgeColor: string }[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'LIVE' | 'DIE'>('ALL');

  // Helpers
  const months = ['Random', ...Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'))];
  const currentYear = new Date().getFullYear();
  const years = ['Random', ...Array.from({ length: 10 }, (_, i) => (currentYear + i).toString())];

  // Clear results when switching tabs manually
  useEffect(() => {
    setIsChecking(false);
    setFilterStatus('ALL');
  }, [activeTab]);

  // Generator Logic with Simulated Loading
  const handleGenerate = async () => {
    if (!bin || bin.length < 6) {
      alert("Por favor, insira pelo menos os primeiros 6 dígitos (BIN).");
      return;
    }

    setIsGenerating(true);
    setGenProgress(0);
    setGeneratedCards(''); // Clear previous results immediately

    // 1. AI Analysis
    setLoadingAi(true);
    setAiInfo(null);
    setGenStatusText('AI Analyzing BIN...');
    
    // Non-blocking AI call
    analyzeBinWithAI(bin).then(info => {
      setAiInfo(info);
      setLoadingAi(false);
    }).catch(() => setLoadingAi(false));

    // 2. Simulate Algorithmic Complexity (Progress Bar)
    const steps = [
      { pct: 10, text: 'Init Luhn Algorithm...' },
      { pct: 30, text: 'Generating Matrices...' },
      { pct: 60, text: 'Calc Checksums...' },
      { pct: 85, text: 'Validating Formats...' },
      { pct: 100, text: 'Finalizing...' }
    ];

    for (const step of steps) {
      setGenStatusText(step.text);
      setGenProgress(step.pct);
      // Random delay between 100ms and 300ms to feel "organic"
      await new Promise(r => setTimeout(r, Math.random() * 200 + 100));
    }

    // 3. Generate Actual Data
    let results = [];
    for (let i = 0; i < quantity; i++) {
      let card = generateCard(bin);
      let line = card;
      if (includeDate) line += `|${generateExpiry(selectedMonth, selectedYear)}`;
      if (includeCVV) line += `|${generateCVV()}`;
      
      // Identify card type and append to line
      const type = identifyCardType(card);
      line += `|${type}`;

      results.push(line);
    }
    
    setGeneratedCards(results.join('\n'));
    setIsGenerating(false);
  };

  // Actions
  const handleCopy = () => {
    if (!generatedCards) return;
    navigator.clipboard.writeText(generatedCards);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleClear = () => {
    setGeneratedCards('');
    setAiInfo(null);
  };

  const handleTransfer = (target: 'format' | 'stripe') => {
    if (!generatedCards) {
      alert("Gere cartões primeiro!");
      return;
    }
    setCardsToCheck(generatedCards);
    
    // Visual Feedback
    setTransferSuccess(true);
    setTimeout(() => {
        setTransferSuccess(false);
        setActiveTab(target);
    }, 1200);
  };

  // Checker Logic
  const handleCheck = async () => {
    const lines = cardsToCheck.split('\n').filter(l => l.trim().length > 0);
    if (lines.length === 0) return;

    setIsChecking(true);
    setCheckedResults([]);
    setFilterStatus('ALL'); // Reset filter on new check

    let newResults: typeof checkedResults = [];
    const mode = activeTab === 'stripe' ? 'Stripe' : 'Format';
    
    for (const line of lines) {
      const parts = line.split('|');
      const number = parts[0]?.trim();
      const isValidFormat = luhnCheck(number);

      let status = '';
      let message = '';
      let badgeColor = '';
      let delay = 300; 

      if (mode === 'Format') {
        // Fast offline check
        status = isValidFormat ? 'LIVE' : 'DIE';
        message = isValidFormat ? 'Valid Format (Luhn)' : 'Invalid Format';
        badgeColor = isValidFormat ? 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20' : 'text-red-400 bg-red-400/10 border border-red-400/20';
      } else if (mode === 'Stripe') {
        // Simulated Stripe Gate Check
        delay = Math.floor(Math.random() * 1500) + 800; // Realistic latency
        
        if (!isValidFormat) {
          status = 'DIE';
          message = 'Stripe: Card number is incorrect';
          badgeColor = 'text-red-400 bg-red-400/10 border border-red-400/20';
        } else {
          // Simulate Stripe API responses
          const rand = Math.random();
          if (rand > 0.8) {
            status = 'LIVE';
            message = 'Stripe: Payment Succeeded (charge.succeeded)';
            badgeColor = 'text-brand-accent bg-brand-accent/10 border border-brand-accent/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
          } else if (rand > 0.6) {
             status = 'LIVE'; 
             message = 'Stripe: Approved (Auth Only)';
             badgeColor = 'text-blue-400 bg-blue-400/10 border border-blue-400/20';
          } else if (rand > 0.3) {
             status = 'DIE';
             message = 'Stripe: Your card has insufficient funds.';
             badgeColor = 'text-red-400 bg-red-400/10 border border-red-400/20';
          } else {
             status = 'DIE';
             message = 'Stripe: Your card was declined.';
             badgeColor = 'text-red-400 bg-red-400/10 border border-red-400/20';
          }
        }
      }

      await new Promise(r => setTimeout(r, delay));
      
      const result = { number: line, status, message, badgeColor };
      newResults = [...newResults, result];
      setCheckedResults(newResults);
    }
    
    setIsChecking(false);
  };

  const filteredResults = checkedResults.filter(r => {
    if (filterStatus === 'ALL') return true;
    return r.status === filterStatus;
  });

  // Export Results
  const handleExport = () => {
    if (filteredResults.length === 0) return;

    const csvContent = [
      "Number,Status,Message",
      ...filteredResults.map(r => `${r.number},${r.status},${r.message}`)
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `genmoz_results_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-10 pb-12 animate-fade-in-up">
      
      {/* Hero Section */}
      <div className="text-center space-y-4 pt-4 px-2">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          GenMoz<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-emerald-300">Pro</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto">{t.hero.subtitle}</p>
      </div>

      {/* NEW AI ASSISTANT PANEL */}
      <div className="max-w-3xl mx-auto px-2">
        <div className="bg-brand-900/60 backdrop-blur-md border border-brand-700/60 rounded-2xl p-6 shadow-2xl relative overflow-hidden group hover:border-brand-600 transition-colors">
           {/* Ambient light effect */}
           <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-accent/10 rounded-full blur-3xl group-hover:bg-brand-accent/20 transition-all"></div>
           
           <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
              {/* AI Avatar / Icon */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-800 to-brand-950 border border-brand-700 flex items-center justify-center shadow-lg relative">
                   <div className="absolute inset-0 rounded-full border border-brand-accent/30 animate-pulse-fast"></div>
                   <svg className="w-8 h-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                   </svg>
                </div>
              </div>

              {/* Message */}
              <div className="text-center sm:text-left flex-grow space-y-2">
                 <h2 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                    {t.hero.ai_greeting}
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                 </h2>
                 <p className="text-gray-400 text-sm">{t.hero.ai_question}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3">
                 <button 
                   onClick={() => setActiveTab('gen')}
                   className={`flex flex-col items-center justify-center px-4 py-2 md:px-5 md:py-3 rounded-xl border transition-all duration-300 ${activeTab === 'gen' ? 'bg-brand-accent/10 border-brand-accent text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-brand-800 border-brand-700 text-gray-400 hover:bg-brand-700 hover:text-white'}`}
                 >
                   <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">{t.hero.btn_gen_title}</span>
                   <span className="text-[9px] md:text-[10px] opacity-60">{t.hero.btn_gen_desc}</span>
                 </button>

                 <button 
                   onClick={() => setActiveTab('format')}
                   className={`flex flex-col items-center justify-center px-4 py-2 md:px-5 md:py-3 rounded-xl border transition-all duration-300 ${activeTab !== 'gen' ? 'bg-blue-500/10 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-brand-800 border-brand-700 text-gray-400 hover:bg-brand-700 hover:text-white'}`}
                 >
                   <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">{t.hero.btn_check_title}</span>
                   <span className="text-[9px] md:text-[10px] opacity-60">{t.hero.btn_check_desc}</span>
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* FLOATING MENU NAVIGATION (Synced with Assistant) */}
      <div className="flex justify-center sticky top-20 z-40 px-2 pointer-events-none">
        <div className="bg-brand-900/90 backdrop-blur-md border border-brand-700 p-1.5 rounded-2xl shadow-2xl flex flex-wrap justify-center gap-1.5 pointer-events-auto">
            <button
              onClick={() => setActiveTab('gen')}
              className={`relative px-4 py-2 md:px-6 md:py-3 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all duration-300 ${
                activeTab === 'gen' 
                  ? 'bg-brand-800 text-white shadow-lg shadow-brand-accent/10 border border-brand-600' 
                  : 'text-gray-400 hover:text-white hover:bg-brand-800/50'
              }`}
            >
              <svg className={`w-4 h-4 md:w-5 md:h-5 ${activeTab === 'gen' ? 'text-brand-accent' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              <span className="hidden xs:inline">{t.gen.tab_title}</span>
              {activeTab === 'gen' && <span className="absolute -bottom-1 left-1/2 w-1/2 h-0.5 bg-brand-accent -translate-x-1/2 rounded-full"></span>}
            </button>
            
            <button
              onClick={() => setActiveTab('format')}
              className={`relative px-4 py-2 md:px-6 md:py-3 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all duration-300 ${
                activeTab === 'format' 
                  ? 'bg-brand-800 text-white shadow-lg shadow-blue-500/10 border border-blue-500/50' 
                  : 'text-gray-400 hover:text-white hover:bg-brand-800/50'
              }`}
            >
              <svg className={`w-4 h-4 md:w-5 md:h-5 ${activeTab === 'format' ? 'text-blue-400' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {t.check.tab_live}
              {activeTab === 'format' && <span className="absolute -bottom-1 left-1/2 w-1/2 h-0.5 bg-blue-500 -translate-x-1/2 rounded-full"></span>}
            </button>
            
            <button
              onClick={() => setActiveTab('stripe')}
              className={`relative px-4 py-2 md:px-6 md:py-3 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all duration-300 ${
                activeTab === 'stripe' 
                  ? 'bg-brand-800 text-white shadow-lg shadow-indigo-500/10 border border-indigo-500/50' 
                  : 'text-gray-400 hover:text-white hover:bg-brand-800/50'
              }`}
            >
              <svg className={`w-4 h-4 md:w-5 md:h-5 ${activeTab === 'stripe' ? 'text-indigo-400' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              {t.check.tab_stripe}
              {activeTab === 'stripe' && <span className="absolute -bottom-1 left-1/2 w-1/2 h-0.5 bg-indigo-500 -translate-x-1/2 rounded-full"></span>}
            </button>
        </div>
      </div>

      {/* --- GENERATOR CONTENT --- */}
      {activeTab === 'gen' && (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in px-2">
          
          {/* Main Card */}
          <div className="bg-brand-800/50 rounded-2xl border border-brand-700/50 p-6 md:p-8 backdrop-blur-sm shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Column: Inputs */}
              <div className="space-y-6">
                 <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">{t.gen.input_label}</label>
                    <Tooltip text={t.tooltips.bin} className="w-full">
                      <div className="relative">
                        <input 
                          type="text" 
                          value={bin}
                          onChange={(e) => setBin(e.target.value.replace(/\D/g, '').slice(0, 12))}
                          placeholder="451416"
                          className="w-full bg-brand-900 border border-brand-700 rounded-xl px-4 py-4 text-2xl font-mono text-brand-accent tracking-widest focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all placeholder-gray-700"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">
                          {bin.length >= 6 && <svg className="w-6 h-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                      </div>
                    </Tooltip>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">{t.gen.month}</label>
                       <Tooltip text={t.tooltips.month} className="w-full">
                         <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="w-full bg-brand-900 border border-brand-700 rounded-lg px-3 py-2 text-white focus:border-brand-accent outline-none appearance-none">
                            {months.map(m => <option key={m} value={m}>{m}</option>)}
                         </select>
                       </Tooltip>
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">{t.gen.year}</label>
                       <Tooltip text={t.tooltips.year} className="w-full">
                         <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full bg-brand-900 border border-brand-700 rounded-lg px-3 py-2 text-white focus:border-brand-accent outline-none appearance-none">
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                         </select>
                       </Tooltip>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4 items-center">
                    <div>
                       <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">{t.gen.qty}</label>
                       <Tooltip text={t.tooltips.qty} className="w-full">
                         <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 10)} className="w-full bg-brand-900 border border-brand-700 rounded-lg px-3 py-2 text-white focus:border-brand-accent outline-none" min="1" max="100"/>
                       </Tooltip>
                    </div>
                    <div className="flex flex-col justify-end space-y-2 pt-6">
                       <Tooltip text={t.tooltips.date}>
                         <label className="flex items-center space-x-2 cursor-pointer group">
                            <input type="checkbox" checked={includeDate} onChange={(e) => setIncludeDate(e.target.checked)} className="form-checkbox text-brand-accent rounded bg-brand-900 border-brand-700 focus:ring-0 focus:ring-offset-0 w-4 h-4" />
                            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Date (mm|yyyy)</span>
                         </label>
                       </Tooltip>
                       <Tooltip text={t.tooltips.cvv}>
                         <label className="flex items-center space-x-2 cursor-pointer group">
                            <input type="checkbox" checked={includeCVV} onChange={(e) => setIncludeCVV(e.target.checked)} className="form-checkbox text-brand-accent rounded bg-brand-900 border-brand-700 focus:ring-0 focus:ring-offset-0 w-4 h-4" />
                            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">CVV (rnd)</span>
                         </label>
                       </Tooltip>
                    </div>
                 </div>

                 <Tooltip text={t.tooltips.generate} className="w-full">
                   <button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-brand-accent to-emerald-600 hover:from-brand-accentHover hover:to-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-accent/20 transform active:scale-95 transition-all flex items-center justify-center gap-2"
                   >
                     {isGenerating ? (
                       <>
                         <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                         {t.gen.processing}
                       </>
                     ) : (
                       <>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                          {t.gen.btn_generate}
                       </>
                     )}
                   </button>
                 </Tooltip>
              </div>

              {/* Right Column: AI Info & Stats */}
              <div className="flex flex-col gap-4">
                 {/* AI Box */}
                 <div className={`flex-grow bg-brand-900 rounded-xl border border-brand-700 p-5 relative overflow-hidden transition-all ${loadingAi ? 'animate-pulse' : ''}`}>
                    <div className="absolute top-0 right-0 p-3 opacity-20"><svg className="w-24 h-24 text-brand-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg></div>
                    
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-brand-700 pb-2 flex items-center gap-2">
                       <svg className="w-4 h-4 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                       AI Analysis
                    </h3>

                    {loadingAi ? (
                       <div className="space-y-3">
                          <div className="h-2 bg-brand-700 rounded w-3/4"></div>
                          <div className="h-2 bg-brand-700 rounded w-1/2"></div>
                          <div className="h-2 bg-brand-700 rounded w-5/6"></div>
                       </div>
                    ) : aiInfo ? (
                       <div className="space-y-3 relative z-10">
                          <div className="flex justify-between items-center"><span className="text-gray-500 text-sm">Bank:</span> <span className="text-white font-medium text-right">{aiInfo.bank || 'Unknown'}</span></div>
                          <div className="flex justify-between items-center"><span className="text-gray-500 text-sm">Country:</span> <span className="text-white font-medium text-right">{aiInfo.country || 'Unknown'}</span></div>
                          <div className="flex justify-between items-center"><span className="text-gray-500 text-sm">Type:</span> <span className="text-brand-accent font-bold text-right">{aiInfo.type} - {aiInfo.level}</span></div>
                          <div className="flex justify-between items-center"><span className="text-gray-500 text-sm">Brand:</span> <span className="text-white font-medium text-right uppercase">{aiInfo.brand}</span></div>
                       </div>
                    ) : (
                       <div className="flex items-center justify-center h-32 text-gray-600 text-sm italic">
                          Waiting for BIN...
                       </div>
                    )}
                 </div>

                 {/* Progress/Status */}
                 {isGenerating && (
                    <div className="bg-brand-900 rounded-xl border border-brand-700 p-4">
                       <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>{genStatusText}</span>
                          <span>{genProgress}%</span>
                       </div>
                       <div className="w-full bg-brand-800 rounded-full h-1.5">
                          <div className="bg-brand-accent h-1.5 rounded-full transition-all duration-300" style={{ width: `${genProgress}%` }}></div>
                       </div>
                    </div>
                 )}
              </div>
            </div>
          </div>

          {/* Results Console */}
          <div className="bg-brand-950 rounded-2xl border border-brand-800 shadow-2xl overflow-hidden flex flex-col">
            {/* Console Header */}
            <div className="bg-[#0b101e] border-b border-brand-800 px-4 py-3 flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <div className="flex space-x-1.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                  </div>
                  <span className="text-xs font-mono text-gray-500 ml-3">{t.gen.results}</span>
               </div>
               
               <div className="flex gap-2">
                  {/* Clear Button */}
                  <button 
                     onClick={handleClear}
                     className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-brand-900 hover:bg-red-900/20 text-gray-400 hover:text-red-400 border border-brand-700 hover:border-red-900/50 transition-colors text-xs font-bold"
                  >
                     <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                     {t.gen.clear}
                  </button>
                  
                  {/* Copy Button */}
                  <button 
                     onClick={handleCopy}
                     className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border transition-all text-xs font-bold ${copyFeedback ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-brand-900 hover:bg-brand-800 text-gray-300 border-brand-700'}`}
                  >
                     {copyFeedback ? (
                        <>
                           <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                           {t.gen.copied}
                        </>
                     ) : (
                        <>
                           <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                           {t.gen.copy}
                        </>
                     )}
                  </button>
               </div>
            </div>

            {/* Console Output */}
            <textarea 
               readOnly
               value={generatedCards}
               placeholder="// Output will appear here..."
               className="w-full h-64 bg-brand-950 text-gray-300 font-mono text-sm p-4 outline-none resize-none border-none focus:ring-0"
            />
            
            {/* Transfer Bar */}
            <div className="bg-brand-900 border-t border-brand-800 p-3 flex justify-end gap-3">
               {transferSuccess && (
                   <div className="flex items-center text-emerald-400 text-xs font-bold animate-pulse mr-auto pl-2">
                       <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                       {t.gen.transfer_success}
                   </div>
               )}
               <button 
                 onClick={() => handleTransfer('format')}
                 className="text-xs font-bold text-gray-400 hover:text-blue-400 flex items-center gap-1 transition-colors"
               >
                 Send to Live Check <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
               </button>
               <button 
                 onClick={() => handleTransfer('stripe')}
                 className="text-xs font-bold text-gray-400 hover:text-indigo-400 flex items-center gap-1 transition-colors"
               >
                 Send to Stripe Check <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
               </button>
            </div>
          </div>
        </div>
      )}

      {/* --- CHECKER / STRIPE CONTENT --- */}
      {(activeTab === 'format' || activeTab === 'stripe') && (
        <div className="max-w-5xl mx-auto space-y-6 animate-fade-in px-2">
           <div className="bg-brand-800/50 rounded-2xl border border-brand-700/50 p-6 backdrop-blur-sm shadow-xl flex flex-col md:flex-row gap-6">
              
              {/* Input Area */}
              <div className="flex-1 flex flex-col gap-4">
                 <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">{t.check.input_label}</label>
                    <span className="text-xs text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded border border-brand-accent/20">
                      {cardsToCheck.split('\n').filter(x => x.trim()).length} Lines
                    </span>
                 </div>
                 <textarea 
                   value={cardsToCheck}
                   onChange={(e) => setCardsToCheck(e.target.value)}
                   className="flex-grow bg-brand-900 border border-brand-700 rounded-xl p-4 font-mono text-sm text-gray-300 focus:ring-2 focus:ring-brand-accent outline-none min-h-[200px]"
                   placeholder="451416xxxx|mm|yyyy|cvv"
                 />
                 <Tooltip text={activeTab === 'stripe' ? t.tooltips.check_btn_stripe : t.tooltips.check_btn_live} className="w-full">
                   <button 
                    onClick={handleCheck}
                    disabled={isChecking}
                    className={`w-full py-4 rounded-xl font-bold shadow-lg transform active:scale-95 transition-all text-white flex items-center justify-center gap-2 ${activeTab === 'stripe' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500' : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500'}`}
                   >
                     {isChecking ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          Processing...
                        </>
                     ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {activeTab === 'stripe' ? t.check.btn_start_stripe : t.check.btn_start_format}
                        </>
                     )}
                   </button>
                 </Tooltip>
              </div>

              {/* Console / Output Area */}
              <div className="flex-1 bg-brand-950 rounded-xl border border-brand-800 flex flex-col h-[400px]">
                 {/* Console Header with Filters */}
                 <div className="bg-[#0b101e] border-b border-brand-800 px-4 py-2 flex flex-col sm:flex-row justify-between items-center gap-2">
                    <div className="flex items-center justify-between w-full sm:w-auto">
                        <span className="text-xs font-mono text-gray-500">CONSOLE OUTPUT</span>
                        <div className="flex gap-4 text-[10px] font-bold uppercase sm:hidden">
                           <span className="text-brand-accent">{t.check.console_live}: {checkedResults.filter(r => r.status === 'LIVE').length}</span>
                           <span className="text-red-500">{t.check.console_die}: {checkedResults.filter(r => r.status === 'DIE').length}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                       {/* Desktop Counter */}
                       <div className="hidden sm:flex gap-3 text-[10px] font-bold uppercase mr-4">
                           <span className="text-brand-accent bg-brand-accent/10 px-1.5 py-0.5 rounded border border-brand-accent/20">LIVE: {checkedResults.filter(r => r.status === 'LIVE').length}</span>
                           <span className="text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20">DIE: {checkedResults.filter(r => r.status === 'DIE').length}</span>
                       </div>
                       
                       <div className="flex items-center gap-2">
                         {/* Export Button */}
                         <button
                            onClick={handleExport}
                            disabled={filteredResults.length === 0}
                            className="flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-1 rounded border border-gray-700 hover:bg-brand-800 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                         >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            {t.check.export_csv}
                         </button>

                         {/* Filter Buttons */}
                         <div className="flex bg-brand-900 rounded-lg p-1 gap-1 w-full sm:w-auto">
                            {(['ALL', 'LIVE', 'DIE'] as const).map(status => (
                               <button
                                 key={status}
                                 onClick={() => setFilterStatus(status)}
                                 className={`flex-1 sm:flex-none text-[10px] font-bold px-3 py-1 rounded transition-all ${
                                   filterStatus === status 
                                     ? 'bg-brand-700 text-white shadow' 
                                     : 'text-gray-500 hover:text-gray-300'
                                 }`}
                               >
                                 {status}
                               </button>
                            ))}
                         </div>
                       </div>
                    </div>
                 </div>
                 
                 <div className="flex-grow overflow-y-auto p-2 space-y-1 custom-scrollbar">
                    {filteredResults.length === 0 ? (
                       <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-2">
                          <svg className="w-10 h-10 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          <span className="text-xs">{t.check.waiting}</span>
                       </div>
                    ) : (
                       filteredResults.map((res, idx) => (
                          <div key={idx} className={`text-xs font-mono p-2 rounded border flex items-center gap-2 animate-fade-in ${res.badgeColor}`}>
                             <span className={`font-bold ${res.status === 'LIVE' ? 'text-green-400' : 'text-red-400'}`}>
                                {res.status}
                             </span>
                             <span className="text-gray-400">|</span>
                             <span className="text-gray-300 truncate flex-grow">{res.number}</span>
                             <span className="text-[10px] opacity-70 hidden sm:inline-block">{res.message}</span>
                          </div>
                       ))
                    )}
                 </div>
              </div>

           </div>
        </div>
      )}
      
      {/* Features / Trust Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-brand-800/50 px-2">
         <div className="p-6 rounded-2xl bg-brand-800/30 border border-brand-700/30">
            <div className="w-12 h-12 bg-brand-900 rounded-xl flex items-center justify-center mb-4 text-brand-accent border border-brand-700">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            </div>
            <h3 className="text-white font-bold mb-2">{t.features.ai_title}</h3>
            <p className="text-sm text-gray-400">{t.features.ai_desc}</p>
         </div>
         <div className="p-6 rounded-2xl bg-brand-800/30 border border-brand-700/30">
             <div className="w-12 h-12 bg-brand-900 rounded-xl flex items-center justify-center mb-4 text-blue-400 border border-brand-700">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-white font-bold mb-2">{t.features.luhn_title}</h3>
            <p className="text-sm text-gray-400">{t.features.luhn_desc}</p>
         </div>
         <div className="p-6 rounded-2xl bg-brand-800/30 border border-brand-700/30">
             <div className="w-12 h-12 bg-brand-900 rounded-xl flex items-center justify-center mb-4 text-purple-400 border border-brand-700">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h3 className="text-white font-bold mb-2">{t.features.privacy_title}</h3>
            <p className="text-sm text-gray-400">{t.features.privacy_desc}</p>
         </div>
      </div>

    </div>
  );
};
