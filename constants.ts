
import { Article, Tool } from './types';
import { translations } from './i18n';

// Função para obter artigos traduzidos dinamicamente
export const getTranslatedArticles = (t: any): Article[] => {
  const topics = [
    { key: 'quantum', cat: 'Quantum' },
    { key: 'ai', cat: 'AI' },
    { key: 'blockchain', cat: 'Blockchain' },
    { key: 'security', cat: 'Security' }
  ];

  return Array.from({ length: 20 }, (_, i) => {
    const topic = topics[i % topics.length];
    const localized = t.article_topics[topic.key];
    
    return {
      id: `${i + 1}`,
      slug: localized.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
      title: localized.title + (i >= 4 ? ` #${Math.floor(i/4) + 1}` : ''),
      excerpt: localized.excerpt,
      content: `
# ${localized.title}

${localized.excerpt}

## Technical Analysis 2026

The integration of autonomous systems and financial decentralization has become the norm. 
Our Core-v4 engine replicates these conditions with total fidelity.

### Key Technology Pillars:
- **Extreme Scalability:** Millions of transactions per second.
- **Adaptive Security:** Algorithms that evolve with threats.
- **Native Interoperability:** Standardized API communication.

---
*Published by ${t.article_author_label} • GENMOZPRO Tech Hub*
      `,
      author: t.article_author_label,
      date: 'January 2026',
      category: topic.cat,
      image: `https://picsum.photos/1200/600?random=${i + 100}`,
      keywords: [topic.cat, 'Fintech', 'Security', 'GenMozPro']
    };
  });
};

// Fix: Export a static ARTICLES constant for components that don't have access to translation hooks (Sitemap, ConfigService, etc.)
export const ARTICLES = getTranslatedArticles(translations.en);

export const TOOLS: Tool[] = [
  { id: 'bin-gen', slug: 'gerador-de-bin', title: 'Generator', description: 'Advanced asset generation engine.', icon: 'fa-credit-card', color: 'bg-blue-600' },
  { id: 'bin-check', slug: 'checker-de-bin', title: 'Stripe Checker', description: 'Real-time gateway simulation.', icon: 'fa-vial', color: 'bg-emerald-600' }
];
