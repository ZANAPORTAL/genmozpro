import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';
// Importamos suas constantes para que o sitemap saiba quais artigos existem
import { ARTICLES, TOOLS } from './src/constants'; 

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');

    // Geramos a lista de rotas dinâmicas automaticamente
    const dynamicRoutes = [
        '/',
        '/artigos',
        '/privacidade',
        '/sobre-nos',
        '/contato',
        ...TOOLS.map(t => `/ferramenta/${t.slug}`),
        ...ARTICLES.map(a => `/artigo/${a.slug}`)
    ];

    return {
        server: {
            port: 3000,
            host: '0.0.0.0',
        },
        plugins: [
            react(),
            // Configuração do Sitemap Automático
            sitemap({ 
                hostname: 'https://genmozpro.com',
                dynamicRoutes,
                // Garante que o arquivo seja gerado na pasta dist para o deploy
                outDir: 'dist' 
            }),
        ],
        define: {
            'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
            'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '.'),
            }
        }
    };
});
