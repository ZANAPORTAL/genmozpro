
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { generateCardFromBin } from '../services/binService';
import { GeneratedBin } from '../types';
import { useTranslation } from '../components/LanguageContext';

const BinGeneratorPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [binInput, setBinInput] = useState('');
  const [quantity, setQuantity] = useState(10);
  const [month, setMonth] = useState('random');
  const [year, setYear] = useState('random');
  const [format, setFormat] = useState('PIPE');
  const [results, setResults] = useState<GeneratedBin[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!binInput || binInput.length < 6) {
      alert("Please enter a valid BIN (at least 6 digits)");
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const newResults = Array.from({ length: quantity }, () => generateCardFromBin(binInput, month, year));
      setResults(newResults);
      setIsGenerating(false);
    }, 800);
  };

  const getFormattedResults = () => {
    if (format === 'JSON') return JSON.stringify(results, null, 2);
    return results.map(r => `${r.number}|${r.expiry}|${r.cvv}`).join('\n');
  };

  const copyAll = () => {
    navigator.clipboard.writeText(getFormattedResults());
    alert('Copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-40">
      <SEO 
        title="Premium BIN Generator Pro"
        description="The most advanced BIN generator with Luhn algorithm support and real-time formatting."
      />
      
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Sidebar Controls */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-100">
            <h2 className="text-2xl font-black mb-8 text-slate-900 flex items-center gap-3">
              <i className="fas fa-sliders text-blue-600"></i> Configuration
            </h2>
            
            <div className="space-y-6">
              <div className="relative">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">BIN Base (6-12 digits)</label>
                <input 
                  type="text" 
                  value={binInput}
                  onChange={(e) => setBinInput(e.target.value.replace(/\D/g, '').slice(0, 12))}
                  className="w-full pl-6 pr-12 py-5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none transition font-mono text-xl"
                  placeholder="Insert BIN here..."
                />
                <i className="fas fa-credit-card absolute right-6 top-14 text-slate-300"></i>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Exp Month</label>
                  <select value={month} onChange={(e) => setMonth(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-blue-500 outline-none">
                    <option value="random">Random</option>
                    {Array.from({ length: 12 }, (_, i) => {
                      const m = (i + 1).toString().padStart(2, '0');
                      return <option key={m} value={m}>{m}</option>
                    })}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Exp Year</label>
                  <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-blue-500 outline-none">
                    <option value="random">Random</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      const y = (new Date().getFullYear() + i).toString();
                      return <option key={y} value={y}>{y}</option>
                    })}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Quantity</label>
                  <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-blue-500 outline-none">
                    {[10, 20, 50, 100, 500].map(q => <option key={q} value={q}>{q} Units</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Format</label>
                  <select value={format} onChange={(e) => setFormat(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-blue-500 outline-none">
                    <option value="PIPE">PIPE (|)</option>
                    <option value="JSON">JSON Data</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black text-xl hover:bg-blue-700 transition shadow-xl shadow-blue-500/30 flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50"
              >
                {isGenerating ? <i className="fas fa-circle-notch animate-spin"></i> : <i className="fas fa-microchip"></i>}
                {isGenerating ? 'Computing...' : 'Generate Assets'}
              </button>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[40px] text-white">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-4 text-blue-500">Security Tip</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our generator uses the <strong>Módulo 10</strong> algorithm to ensure every card passes basic structural validation of the world's largest payment gateways.
            </p>
          </div>
        </div>

        {/* Output Console */}
        <div className="lg:col-span-8">
          <div className="bg-[#0b0e14] rounded-[50px] overflow-hidden shadow-2xl border border-white/5 flex flex-col min-h-[650px]">
            <div className="px-10 py-6 border-b border-white/5 flex justify-between items-center bg-white/5 backdrop-blur-md">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              </div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                Live_Output.console v4.0
              </div>
            </div>

            <div className="flex-grow p-10 font-mono text-lg overflow-y-auto custom-scrollbar">
              {results.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-10">
                  <i className="fas fa-terminal text-9xl mb-8"></i>
                  <p className="font-black tracking-[0.5em] uppercase text-xl">System Idle</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {results.map((r, i) => (
                    <div key={i} className="flex items-center gap-6 group hover:bg-white/5 p-2 rounded-xl transition">
                      <span className="text-slate-700 text-xs">[{String(i+1).padStart(3, '0')}]</span>
                      <span className="text-white font-bold tracking-widest">{r.number}</span>
                      <span className="text-slate-600">|</span>
                      <span className="text-blue-400 font-bold">{r.expiry}</span>
                      <span className="text-slate-600">|</span>
                      <span className="text-emerald-400 font-bold">{r.cvv}</span>
                      <span className="ml-auto text-[10px] font-black px-2 py-1 bg-white/10 rounded text-slate-400 uppercase">{r.brand}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {results.length > 0 && (
              <div className="p-10 border-t border-white/5 bg-white/5 grid md:grid-cols-2 gap-6">
                <button onClick={copyAll} className="bg-white/10 text-white py-5 rounded-3xl font-black hover:bg-white/20 transition flex items-center justify-center gap-4">
                  <i className="fas fa-copy"></i> Copy All
                </button>
                <button 
                  onClick={() => navigate('/ferramenta/checker-de-bin', { state: { cards: getFormattedResults() } })}
                  className="bg-emerald-600 text-white py-5 rounded-3xl font-black hover:bg-emerald-500 transition shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-4"
                >
                  <i className="fas fa-bolt"></i> Push to Checker
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinGeneratorPage;
