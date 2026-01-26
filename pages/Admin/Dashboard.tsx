
import React, { useState, useEffect, useRef } from 'react';
import { getConfig, saveConfig, getAds, saveAds, saveArticle } from '../../services/configService';
import { SiteConfig, AdConfig, Article } from '../../types';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ads' | 'scripts' | 'content' | 'settings'>('ads');
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(getConfig());
  const [adConfig, setAdConfig] = useState<AdConfig>(getAds());
  const [categories, setCategories] = useState<string[]>([
    'Fintech', 'AI', 'Security', 'Blockchain', 'Payment Systems', 'QA Testing', 'Quantum', 'Future', 'General'
  ]);
  const [showNewCatInput, setShowNewCatInput] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  
  const [newArticle, setNewArticle] = useState<Partial<Article>>({
    title: '', 
    excerpt: '', 
    content: '', 
    category: 'Fintech', 
    author: 'Admin', 
    image: '',
    keywords: []
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveSettings = () => {
    saveConfig(siteConfig);
    alert('Site settings saved and reloaded!');
  };

  const handleSaveAds = () => {
    saveAds(adConfig);
    alert('Ad blocks updated!');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Imagem muito grande! Por favor use uma imagem de até 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewArticle({ ...newArticle, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCategory = () => {
    if (newCatName && !categories.includes(newCatName)) {
      setCategories([...categories, newCatName]);
      setNewArticle({ ...newArticle, category: newCatName });
      setNewCatName('');
      setShowNewCatInput(false);
    }
  };

  const handleCreateArticle = () => {
    if (!newArticle.title || !newArticle.content) {
      alert("Título e conteúdo são obrigatórios.");
      return;
    }
    if (!newArticle.image) {
      alert("Todos os artigos devem ter uma imagem em destaque!");
      return;
    }

    const article: Article = {
      id: Date.now().toString(),
      slug: newArticle.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
      title: newArticle.title,
      excerpt: newArticle.excerpt || '',
      content: newArticle.content,
      author: newArticle.author || 'Admin',
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
      category: newArticle.category || 'General',
      image: newArticle.image,
      keywords: newArticle.keywords || []
    };
    
    saveArticle(article);
    alert('Artigo publicado com sucesso!');
    setNewArticle({ 
      title: '', 
      excerpt: '', 
      content: '', 
      category: categories[0], 
      author: 'Admin', 
      image: '',
      keywords: []
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center text-white text-3xl">
            <i className="fas fa-user-shield"></i>
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900">Admin Panel</h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">GENMOZPRO CMS v1.2</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="space-y-2">
            {[
              { id: 'ads', label: 'Monetization', icon: 'fa-dollar-sign' },
              { id: 'scripts', label: 'AdX & Scripts', icon: 'fa-code' },
              { id: 'content', label: 'Blog Editor', icon: 'fa-pen-nib' },
              { id: 'settings', label: 'Site Config', icon: 'fa-cog' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm transition-all ${
                  activeTab === tab.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'bg-white text-slate-500 hover:bg-slate-100'
                }`}
              >
                <i className={`fas ${tab.icon} w-5`}></i> {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[40px] shadow-2xl p-10 border border-slate-100">
              
              {activeTab === 'ads' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-black mb-8">Ad Blocks (AdSense / AdX)</h3>
                  {Object.keys(adConfig).map((key) => (
                    <div key={key}>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">{key}</label>
                      <textarea
                        value={(adConfig as any)[key]}
                        onChange={(e) => setAdConfig({ ...adConfig, [key]: e.target.value })}
                        className="w-full h-32 p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl font-mono text-xs focus:border-blue-500 outline-none transition"
                        placeholder="Paste script here..."
                      />
                    </div>
                  ))}
                  <button onClick={handleSaveAds} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-700 transition">Update Ads</button>
                </div>
              )}

              {activeTab === 'scripts' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-black mb-8">Global Scripts (AdX / Analytics)</h3>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Head Scripts (e.g. AdSense Tag)</label>
                    <textarea
                      value={siteConfig.headScripts}
                      onChange={(e) => setSiteConfig({ ...siteConfig, headScripts: e.target.value })}
                      className="w-full h-40 p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl font-mono text-xs focus:border-blue-500 outline-none transition"
                      placeholder="<script>...</script>"
                    />
                  </div>
                  <button onClick={handleSaveSettings} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-700 transition">Save & Apply Scripts</button>
                </div>
              )}

              {activeTab === 'content' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-black mb-8">Create New Article</h3>
                  
                  {/* Article Form */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Post Title</label>
                        <input 
                          type="text" 
                          placeholder="Ex: Revolução Quântica em 2026" 
                          value={newArticle.title}
                          onChange={e => setNewArticle({...newArticle, title: e.target.value})}
                          className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 font-bold"
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</label>
                          <button 
                            type="button"
                            onClick={() => setShowNewCatInput(!showNewCatInput)}
                            className="text-[10px] font-black text-blue-600 uppercase hover:underline"
                          >
                            {showNewCatInput ? 'Cancel' : '+ Add New'}
                          </button>
                        </div>
                        
                        {showNewCatInput ? (
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              value={newCatName}
                              onChange={e => setNewCatName(e.target.value)}
                              placeholder="New Category Name..."
                              className="flex-grow p-4 bg-slate-50 border-2 border-blue-100 rounded-2xl outline-none focus:border-blue-500 font-bold text-sm"
                            />
                            <button 
                              type="button"
                              onClick={handleAddCategory}
                              className="px-6 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase"
                            >
                              Add
                            </button>
                          </div>
                        ) : (
                          <select 
                            value={newArticle.category}
                            onChange={e => setNewArticle({...newArticle, category: e.target.value})}
                            className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 font-bold"
                          >
                            {categories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        )}
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Featured Image (Upload)</label>
                        <div className="relative h-40 group cursor-pointer">
                          <input 
                            ref={fileInputRef}
                            type="file" 
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                          />
                          <div className={`absolute inset-0 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all ${
                            newArticle.image ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50'
                          }`}>
                            {newArticle.image ? (
                              <img src={newArticle.image} alt="Preview" className="w-full h-full object-cover rounded-3xl opacity-80" />
                            ) : (
                              <>
                                <i className="fas fa-cloud-upload-alt text-3xl text-slate-300 mb-2"></i>
                                <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Select Image</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Article Excerpt (SEO)</label>
                        <textarea 
                          placeholder="A short summary for search engines..." 
                          value={newArticle.excerpt}
                          onChange={e => setNewArticle({...newArticle, excerpt: e.target.value})}
                          className="w-full h-[120px] p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 resize-none font-medium"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Author Name</label>
                        <input 
                          type="text" 
                          placeholder="Admin" 
                          value={newArticle.author}
                          onChange={e => setNewArticle({...newArticle, author: e.target.value})}
                          className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Full Content (Markdown Supported)</label>
                    <textarea 
                      placeholder="Write your article here..." 
                      value={newArticle.content}
                      onChange={e => setNewArticle({...newArticle, content: e.target.value})}
                      className="w-full h-96 p-8 bg-slate-50 border-2 border-slate-100 rounded-3xl outline-none focus:border-blue-500 font-mono text-sm leading-relaxed"
                    />
                  </div>

                  <button onClick={handleCreateArticle} className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-xl hover:bg-blue-600 transition shadow-2xl active:scale-95">
                    Publish Whitepaper <i className="fas fa-paper-plane ml-3"></i>
                  </button>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-black mb-8">Site Configuration</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Logo Text</label>
                      <input 
                        type="text" 
                        value={siteConfig.logoText}
                        onChange={e => setSiteConfig({...siteConfig, logoText: e.target.value})}
                        className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none focus:border-blue-500 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Logo Primary Color</label>
                      <input 
                        type="color" 
                        value={siteConfig.logoColor}
                        onChange={e => setSiteConfig({...siteConfig, logoColor: e.target.value})}
                        className="w-full h-[58px] p-2 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none"
                      />
                    </div>
                  </div>
                  <button onClick={handleSaveSettings} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-700 transition">Save Site Config</button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
