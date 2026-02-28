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
    // 빌드 최적화 설정
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    // 개발 서버 전용 설정 (배포 환경에서는 적용되지 않음)
    server: {
      proxy: {
        // /api로 시작하는 요청을 백엔드 서버로 프록시
        '/api': {
          // 프록시 대상 서버 URL
          target: env.VITE_API_BASE_URL || 'https://gojak.co.kr',
          // Host 헤더를 target URL로 변경 (CORS 우회)
          changeOrigin: true,
          // HTTPS 인증서 검증 활성화
          secure: true,
          // 쿠키의 Domain 값을 localhost로 변경 (개발 환경에서 쿠키 저장용)
          cookieDomainRewrite: {
            'gojak.co.kr': 'localhost',
          },
          // 프록시 응답 후처리: localhost에서 쿠키가 저장되도록 Secure, Domain 속성 제거
          configure: (proxy) => {
            proxy.on('proxyRes', (proxyRes) => {
              const setCookie = proxyRes.headers['set-cookie'];
              if (setCookie) {
                proxyRes.headers['set-cookie'] = setCookie.map((cookie) =>
                  cookie.replace(/;\s*Secure/gi, '').replace(/;\s*Domain=[^;]*/gi, ''),
                );
              }
            });
          },
        },
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
