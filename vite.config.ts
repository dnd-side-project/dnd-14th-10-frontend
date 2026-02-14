import path from 'path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss(), svgr()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/naver-search': {
          target: 'https://openapi.naver.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/naver-search/, '/v1/search'),
          headers: {
            'X-Naver-Client-Id': env.VITE_NAVER_SEARCH_CLIENT_ID || '',
            'X-Naver-Client-Secret': env.VITE_NAVER_SEARCH_CLIENT_SECRET || '',
          },
        },
      },
    },
  };
});
