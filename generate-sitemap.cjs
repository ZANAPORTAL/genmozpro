const fs = require('fs');
// Importamos as listas que você já tem no projeto
// Nota: Ajuste os caminhos se necessário para chegar no seu constants.ts
const { ARTICLES, TOOLS } = require('./src/constants'); 

const BASE_URL = 'https://genmozpro.com';

function generate() {
  const urls = [
    '',
    '/artigos',
    '/privacidade',
    ...TOOLS.map(t => `/ferramenta/${t.slug}`),
    ...ARTICLES.map(a => `/artigo/${a.slug}`)
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
    <url>
      <loc>${BASE_URL}${url}</loc>
      <changefreq>weekly</changefreq>
      <priority>${url === '' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('')}
</urlset>`;

  fs.writeFileSync('./public/sitemap.xml', xml);
  console.log('✅ Sitemap.xml gerado automaticamente na pasta public!');
}

generate();
