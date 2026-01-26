
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import { useTranslation } from '../components/LanguageContext';

interface CheckLog {
  id: string;
  card: string;
  status: 'live' | 'dead' | 'warn' | 'processing';
  message: string;
  time: string;
  code: string;
}

const BinCheckerPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [input, setInput] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [logs, setLogs] = useState<CheckLog[]>([]);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.state?.cards) {
      setInput(location.state.cards);
    }
  }, [location]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCheck = async () => {
    const cards = input.split('\n').filter(c => c.trim().length > 10);
    if (cards.length === 0) return;

    setIsChecking(true);
    setLogs([]);
    setProgress({ current: 0, total: cards.length });

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const logId = Math.random().toString(36).substr(2, 9);
      
      // Step 1: Initial Request
      setLogs(prev => [{
        id: logId,
        card,
        status: 'processing',
        message: 'Establishing Handshake...',
        time: new Date().toLocaleTimeString(),
        code: 'SSL_INIT'
      }, ...prev]);

      // Delay 1: Network latency simulation
      await new Promise(r => setTimeout(r, 800 + Math.random() * 1200));

      // Step 2: Intermediate processing
      setLogs(prev => prev.map(l => l.id === logId ? { 
        ...l, 
        message: 'Authenticating with Stripe Cloud...', 
        code: 'API_AUTH' 
      } : l));

      // Delay 2: Gateway response simulation (Total check time ~2-4s)
      await new Promise(r => setTimeout(r, 1200 + Math.random() * 2000));

      const roll = Math.random();
      let result: Partial<CheckLog>;

      if (roll > 0.85) {
        result = { status: 'live', message: 'Success (CVV Match)', code: '00 - APPROVED' };
      } else if (roll > 0.7) {
        result = { status: 'warn', message: 'Insufficient Funds', code: '51 - DECLINED' };
      } else if (roll > 0.35) {
        result = { status: 'dead', message: 'Card Rejected', code: '05 - REFUSED' };
      } else if (roll > 0.1) {
        result = { status: 'dead', message: 'Invalid Expiry', code: 'EXPIRED' };
      } else {
        result = { status: 'dead', message: 'Gateway Timeout', code: 'T504' };
      }

      setLogs(prev => prev.map(l => l.id === logId ? { ...l, ...result } : l));
      setProgress(prev => ({ ...prev, current: i + 1 }));
      
      // Safety break to prevent browser hang on very large lists
      if (i % 5 === 0) await new Promise(r => setTimeout(r, 100));
    }
    setIsChecking(false);
  };

  const handleClearAll = () => {
    setLogs([]);
    setProgress({ current: 0, total: 0 });
  };

  const exportToCSV = () => {
    if (logs.length === 0) return;
    
    const headers = "Card,Status,Message,Code,Time\n";
    const rows = logs
      .filter(l => l.status !== 'processing')
      .map(l => `"${l.card}","${l.status.toUpperCase()}","${l.message}","${l.code}","${l.time}"`)
      .join("\n");
      
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `genmozpro_results_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = {
    live: logs.filter(l => l.status === 'live').length,
    dead: logs.filter(l => l.status === 'dead').length,
    warn: logs.filter(l => l.status === 'warn').length,
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-40">
      <SEO title="Stripe Live Checker Pro" description="Professional gateway simulation for payment system testing." />
      
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Left Input */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white p-10 rounded-[50px] shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Stripe <span className="text-blue-600">Checker</span></h2>
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-400">v4.2 API</div>
              </div>
            </div>

            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="4539780000000000|12|26|000"
              className="w-full h-[400px] bg-slate-50 border-2 border-slate-50 rounded-[32px] p-8 font-mono text-lg focus:border-blue-500 outline-none transition resize-none mb-8"
              disabled={isChecking}
            />

            <button 
              onClick={handleCheck}
              disabled={isChecking || !input}
              className="w-full bg-[#635bff] text-white py-6 rounded-[32px] font-black text-xl hover:bg-[#544dc9] transition shadow-2xl flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50"
            >
              {isChecking ? <i className="fas fa-circle-notch animate-spin"></i> : <i className="fab fa-stripe-s"></i>}
              {isChecking ? `Validating (${progress.current}/${progress.total})` : 'Start Validation'}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[32px] text-center">
              <div className="text-3xl font-black text-emerald-600">{stats.live}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Live</div>
            </div>
            <div className="bg-amber-50 border border-amber-100 p-6 rounded-[32px] text-center">
              <div className="text-3xl font-black text-amber-600">{stats.warn}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-amber-400">Warn</div>
            </div>
            <div className="bg-red-50 border border-red-100 p-6 rounded-[32px] text-center">
              <div className="text-3xl font-black text-red-600">{stats.dead}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-red-400">Dead</div>
            </div>
          </div>
        </div>

        {/* Right Console */}
        <div className="lg:col-span-7">
          <div className="bg-[#1a1f26] rounded-[50px] shadow-2xl overflow-hidden border border-white/5 flex flex-col h-full min-h-[700px]">
            <div className="px-10 py-6 border-b border-white/5 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Network_Inspector.log</span>
              </div>
              <div className="flex gap-4 items-center">
                {logs.length > 0 && !isChecking && (
                  <>
                    <button 
                      onClick={exportToCSV}
                      className="text-[10px] font-black text-emerald-500 hover:text-white transition uppercase flex items-center gap-2"
                    >
                      <i className="fas fa-file-csv text-sm"></i> {t.exportCsv}
                    </button>
                    <button 
                      onClick={handleClearAll}
                      className="text-[10px] font-black text-red-400 hover:text-white transition uppercase flex items-center gap-2"
                    >
                      <i className="fas fa-trash-alt text-sm"></i> {t.clearAll || 'Clear All'}
                    </button>
                  </>
                )}
                {logs.length === 0 && (
                   <button onClick={handleClearAll} className="text-[10px] font-black text-slate-600 hover:text-white transition uppercase">Reset</button>
                )}
              </div>
            </div>

            <div ref={scrollRef} className="flex-grow p-10 space-y-4 overflow-y-auto custom-scrollbar font-mono">
              {logs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-10">
                  <i className="fas fa-wifi text-6xl mb-6"></i>
                  <p className="font-black uppercase tracking-widest">Awaiting Gateway Request</p>
                </div>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className={`p-4 rounded-2xl border flex items-center gap-6 transition-all animate-in slide-in-from-bottom-2 ${
                    log.status === 'live' ? 'bg-emerald-500/10 border-emerald-500/20' :
                    log.status === 'dead' ? 'bg-red-500/10 border-red-500/20' :
                    log.status === 'warn' ? 'bg-amber-500/10 border-amber-500/20' : 'bg-white/5 border-white/10'
                  }`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm ${
                      log.status === 'live' ? 'bg-emerald-500 text-white' :
                      log.status === 'dead' ? 'bg-red-500 text-white' :
                      log.status === 'warn' ? 'bg-amber-500 text-white' : 'bg-white/10 text-slate-400'
                    }`}>
                      {log.status === 'processing' ? <i className="fas fa-sync animate-spin"></i> : <i className={`fas ${log.status === 'live' ? 'fa-check' : 'fa-times'}`}></i>}
                    </div>
                    <div className="flex-grow">
                      <div className="text-white font-bold text-sm tracking-widest">{log.card}</div>
                      <div className={`text-[10px] font-black uppercase tracking-widest mt-1 ${
                        log.status === 'live' ? 'text-emerald-400' :
                        log.status === 'dead' ? 'text-red-400' :
                        log.status === 'warn' ? 'text-amber-400' : 'text-slate-500'
                      }`}>
                        {log.message} • {log.code}
                      </div>
                    </div>
                    <div className="text-[10px] font-black text-slate-600">{log.time}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinCheckerPage;
