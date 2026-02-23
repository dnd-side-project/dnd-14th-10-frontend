import type { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import { useAuthStore } from '@/features/auth/model/use-auth-store';
import FullPageSpinner from '@/shared/ui/FullPageSpinner';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  if (!isInitialized) {
    return <FullPageSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
}
