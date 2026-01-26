
import { SiteConfig, AdConfig, Article } from '../types';
import { ARTICLES } from '../constants';

const SITE_CONFIG_KEY = 'genmoz_site_config';
const AD_CONFIG_KEY = 'genmoz_ad_config';
const CUSTOM_ARTICLES_KEY = 'genmoz_custom_articles';
const AUTH_KEY = 'genmoz_admin_auth';

const defaultSiteConfig: SiteConfig = {
  logoText: 'GENMOZPRO',
  logoColor: '#2563eb',
  adsTxt: 'google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0',
  headScripts: '',
  bodyScripts: '',
  footerScripts: ''
};

const defaultAdConfig: AdConfig = {
  headerAd: '<!-- AdSense Header Placeholder -->',
  footerAd: '<!-- AdSense Footer Placeholder -->',
  sidebarAd: '<!-- AdSense Sidebar Placeholder -->',
  inArticleAd: '<!-- AdSense In-Article Placeholder -->'
};

export const getConfig = (): SiteConfig => {
  const saved = localStorage.getItem(SITE_CONFIG_KEY);
  return saved ? JSON.parse(saved) : defaultSiteConfig;
};

export const saveConfig = (config: SiteConfig) => {
  localStorage.setItem(SITE_CONFIG_KEY, JSON.stringify(config));
  window.location.reload(); 
};

export const getAds = (): AdConfig => {
  const saved = localStorage.getItem(AD_CONFIG_KEY);
  return saved ? JSON.parse(saved) : defaultAdConfig;
};

export const saveAds = (ads: AdConfig) => {
  localStorage.setItem(AD_CONFIG_KEY, JSON.stringify(ads));
};

export const getArticles = (): Article[] => {
  const saved = localStorage.getItem(CUSTOM_ARTICLES_KEY);
  const custom = saved ? JSON.parse(saved) : [];
  return [...custom, ...ARTICLES];
};

export const saveArticle = (article: Article) => {
  const saved = localStorage.getItem(CUSTOM_ARTICLES_KEY);
  const custom = saved ? JSON.parse(saved) : [];
  localStorage.setItem(CUSTOM_ARTICLES_KEY, JSON.stringify([article, ...custom]));
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem(AUTH_KEY) === 'true';
};

export const login = (user: string, pass: string): boolean => {
  if (user === 'J-PRO' && pass === 'COMPRA@2025') {
    localStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = '#/';
};

export const injectScripts = () => {
  const config = getConfig();
  
  if (config.headScripts) {
    const range = document.createRange();
    const documentFragment = range.createContextualFragment(config.headScripts);
    document.head.appendChild(documentFragment);
  }

  if (config.bodyScripts) {
    const div = document.createElement('div');
    div.id = 'adx-body-scripts';
    div.style.display = 'none';
    div.innerHTML = config.bodyScripts;
    document.body.prepend(div);
  }

  if (config.footerScripts) {
    const div = document.createElement('div');
    div.id = 'adx-footer-scripts';
    div.style.display = 'none';
    div.innerHTML = config.footerScripts;
    document.body.appendChild(div);
  }
};
