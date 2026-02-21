import { StrictMode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { setupInterceptors } from '@/app/lib/setup-interceptors';

import AuthInitializer from '@/app/providers/AuthInitializer';
import { router } from '@/app/providers/router';

import './index.css';

setupInterceptors();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

async function enableMocking() {
  if (import.meta.env.MODE !== 'mock') {
    return;
  }
  const { worker } = await import('./shared/api/msw/browser');
  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthInitializer>
          <RouterProvider router={router} />
        </AuthInitializer>
      </QueryClientProvider>
    </StrictMode>,
  );
});
