
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Initialize GoogleGenAI within the function using process.env.API_KEY directly as per guidelines
export const generateBlogArticle = async (topic: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Escreva um artigo de blog profissional e detalhado sobre o tópico: "${topic}". 
    O artigo deve ser formatado em Markdown, ter um tom informativo e ser otimizado para SEO. 
    Inclua introdução, subtítulos (H2) e conclusão.`,
    config: {
      temperature: 0.7,
      topP: 0.8,
    }
  });

  // Fix: Access .text property directly (it is not a method)
  return response.text;
};

export const generateSitemapXML = (urls: string[]) => {
  const domain = window.location.origin + window.location.pathname;
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  urls.forEach(url => {
    xml += `  <url>\n    <loc>${domain}#${url}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  });
  
  xml += `</urlset>`;
  return xml;
};
