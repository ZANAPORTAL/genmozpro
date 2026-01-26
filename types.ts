
export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  keywords: string[];
}

export interface NavItem {
  label: string;
  path: string;
}

export interface Tool {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface GeneratedBin {
  number: string;
  expiry: string;
  cvv: string;
  brand: string;
}

export interface AdConfig {
  headerAd: string;
  footerAd: string;
  sidebarAd: string;
  inArticleAd: string;
}

export interface SiteConfig {
  logoText: string;
  logoColor: string;
  adsTxt: string;
  headScripts: string;
  bodyScripts: string;
  footerScripts: string;
}
