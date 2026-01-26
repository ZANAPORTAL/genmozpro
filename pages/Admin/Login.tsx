
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/configService';
import { useTranslation } from '../../components/LanguageContext';

const AdminLogin: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(user, pass)) {
      navigate('/portal-secure-2025');
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-blue-600 rounded-[30px] flex items-center justify-center text-white text-4xl font-black mx-auto mb-8 shadow-2xl shadow-blue-500/40">
            G
          </div>
          <h1 className="text-3xl font-black text-white mb-2">{t.loginTitle}</h1>
          <p className="text-slate-500 uppercase tracking-widest text-[10px] font-black">GenMoz Pro Security Layer</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white p-10 rounded-[40px] shadow-2xl space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">{t.loginUser}</label>
            <input 
              type="text" 
              value={user}
              onChange={e => setUser(e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-blue-500 transition font-bold" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">{t.loginPass}</label>
            <input 
              type="password" 
              value={pass}
              onChange={e => setPass(e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-blue-500 transition font-bold" 
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-xs font-black text-center animate-bounce">
              INVALID CREDENTIALS. ACCESS DENIED.
            </p>
          )}

          <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-xl active:scale-95">
            {t.loginBtn}
          </button>
        </form>
        
        <p className="text-center mt-12 text-slate-700 text-[10px] font-black uppercase tracking-[0.3em]">
          Unauthorized access is logged.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
