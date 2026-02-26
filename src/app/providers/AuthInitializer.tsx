import { useEffect, type ReactNode } from 'react';

import { refreshToken } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/shared/store/use-auth-store';
import FullPageSpinner from '@/shared/ui/FullPageSpinner';

interface AuthInitializerProps {
  children: ReactNode;
}

export default function AuthInitializer({ children }: AuthInitializerProps) {
  const isInitialized = useAuthStore((state) => state.isInitialized);

  console.log('AuthInitializer 렌더링, isInitialized:', isInitialized);

  useEffect(() => {
    const initializeAuth = async () => {
      console.log('🔄 인증 초기화 시작');
      const { setAuth, clearAuth, setInitialized } = useAuthStore.getState();

      try {
        const response = await refreshToken();
        console.log('✅ 토큰 갱신 성공');
        setAuth(response.data.accessToken);
      } catch {
        console.log('❌ 토큰 갱신 실패 (비로그인 상태)');
        clearAuth();
      } finally {
        console.log('🏁 인증 초기화 완료');
        setInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  if (!isInitialized) {
    console.log('⏳ 로딩 스피너 표시');
    return <FullPageSpinner />;
  }

  return <>{children}</>;
}
