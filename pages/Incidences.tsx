
import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { useTranslation } from '../components/LanguageContext';

interface Incidence {
  id: string;
  type: string;
  status: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  details: string;
}

const Incidences: React.FC = () => {
  const { t } = useTranslation();
  const [list, setList] = useState<Incidence[]>([]);

  useEffect(() => {
    const initial = Array.from({ length: 15 }, (_, i) => ({
      id: Math.random().toString(36).substr(2, 9),
      type: ['API_REQUEST', 'BIN_VALIDATION', 'GATEWAY_SYNC', 'LUNH_CHECK'][Math.floor(Math.random() * 4)],
      status: (['info', 'success', 'warning', 'error'] as const)[Math.floor(Math.random() * 4)],
      timestamp: new Date(Date.now() - i * 60000 * 5).toLocaleTimeString(),
      details: `System integrity check performed at node ${Math.floor(Math.random() * 100)}. Output valid.`
    }));
    setList(initial);

    const interval = setInterval(() => {
      const newInc: Incidence = {
        id: Math.random().toString(36).substr(2, 9),
        type: ['API_REQUEST', 'BIN_VALIDATION', 'GATEWAY_SYNC', 'LUNH_CHECK'][Math.floor(Math.random() * 4)],
        status: (['info', 'success', 'warning', 'error'] as const)[Math.floor(Math.random() * 4)],
        timestamp: new Date().toLocaleTimeString(),
        details: `Active monitoring pulse detected. Load balanced across clusters.`
      };
      setList(prev => [newInc, ...prev.slice(0, 19)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-40">
      <SEO title={t.incidencesTitle} description={t.incidencesSub} />
      
      <div className="mb-20">
        <span className="text-blue-600 font-black tracking-widest uppercase text-xs bg-blue-50 px-4 py-2 rounded-full mb-6 inline-block">Real-Time Logs</span>
        <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-slate-900">{t.incidencesTitle}</h1>
        <p className="text-xl text-slate-500 max-w-3xl leading-relaxed">
          {t.incidencesSub}
        </p>
      </div>

      <div className="bg-white rounded-[50px] shadow-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Timestamp</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Event Type</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {list.map(inc => (
                <tr key={inc.id} className="hover:bg-slate-50 transition-colors animate-in fade-in slide-in-from-left-2 duration-500">
                  <td className="px-8 py-6 font-mono text-sm text-slate-500">{inc.timestamp}</td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-600">
                      {inc.type}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`flex items-center gap-2 font-black text-xs uppercase tracking-widest ${
                      inc.status === 'success' ? 'text-emerald-500' :
                      inc.status === 'warning' ? 'text-amber-500' :
                      inc.status === 'error' ? 'text-red-500' : 'text-blue-500'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        inc.status === 'success' ? 'bg-emerald-500' :
                        inc.status === 'warning' ? 'bg-amber-500' :
                        inc.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                      } animate-pulse`}></div>
                      {inc.status}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-slate-500 font-medium text-sm">{inc.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Incidences;
