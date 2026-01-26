
import React, { useEffect } from 'react';
import { useTranslation } from './LanguageContext';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, ogImage, ogType }) => {
  const { locale } = useTranslation();

  useEffect(() => {
    const fullTitle = `${title} | GENMOZPRO`;
    document.title = fullTitle;
    document.documentElement.lang = locale;
    
    const defaultDesc = 'GENMOZPRO - The ultimate AI-powered BIN Generator and Fintech suite.';
    const finalDesc = description || defaultDesc;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', finalDesc);

    // Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords?.join(', ') || 'BIN Generator, Luhn Validator, Fintech, Stripe Checker');

    // Canonical
    const currentUrl = window.location.href;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // Open Graph Tags
    const ogTags = [
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: finalDesc },
      { property: 'og:url', content: currentUrl },
      { property: 'og:type', content: ogType || 'website' },
      { property: 'og:image', content: ogImage || 'https://picsum.photos/1200/630?grayscale' }, // Default fallback image
      { property: 'og:site_name', content: 'GENMOZPRO' }
    ];

    ogTags.forEach(tag => {
      let element = document.querySelector(`meta[property="${tag.property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });

    // Twitter Tags (Extra credit for world-class engineer)
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: finalDesc },
      { name: 'twitter:image', content: ogImage || 'https://picsum.photos/1200/630?grayscale' }
    ];

    twitterTags.forEach(tag => {
      let element = document.querySelector(`meta[name="${tag.name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', tag.name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });

  }, [title, description, keywords, locale, ogImage, ogType]);

  return null;
};

export default SEO;
