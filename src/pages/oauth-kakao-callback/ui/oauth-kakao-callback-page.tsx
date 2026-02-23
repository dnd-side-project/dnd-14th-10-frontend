import { useEffect, useRef, useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { kakaoOAuthLogin } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/features/auth/model/use-auth-store';
import { getErrorMessage, getErrorStatus } from '@/shared/api/error.utils';

export default function OAuthKakaoCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const isProcessingRef = useRef(false);

  useEffect(() => {
    const handleKakaoCallback = async () => {
      if (isProcessingRef.current) return;
      isProcessingRef.current = true;

      const code = searchParams.get('code');
      const errorParam = searchParams.get('error');

      if (errorParam) {
        const errorDescription =
          searchParams.get('error_description') || '카카오 로그인에 실패했습니다.';
        setError(errorDescription);
        return;
      }

      if (!code) {
        setError('인증 코드가 없습니다. 다시 로그인해주세요.');
        return;
      }

      try {
        const redirectUri = `${window.location.origin}/oauth/kakao/callback`;
        const response = await kakaoOAuthLogin({ code, redirectUri });
        const data = response.data;

        if (data.isNewUser && data.signupToken && data.oauthInfo) {
          sessionStorage.setItem('signupToken', data.signupToken);
          sessionStorage.setItem('oauthInfo', JSON.stringify(data.oauthInfo));
          navigate('/onboarding', { replace: true });
        } else if (!data.isNewUser && data.accessToken && data.user) {
          useAuthStore.getState().setAuth(data.accessToken, data.user);
          navigate('/', { replace: true });
        } else {
          setError('로그인 응답이 올바르지 않습니다.');
        }
      } catch (err: unknown) {
        console.error('카카오 로그인 실패:', err);

        const errorMessage = getErrorMessage(err);
        const status = getErrorStatus(err);

        if (status === 400) {
          setError(`잘못된 요청입니다: ${errorMessage}`);
        } else if (status === 401) {
          setError('인증에 실패했습니다. 다시 로그인해주세요.');
        } else if (status === 500) {
          setError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        } else {
          setError(errorMessage);
        }
      }
    };

    handleKakaoCallback();
  }, [searchParams, navigate]);

  if (error) {
    return (
      <div className='flex min-h-dvh flex-col items-center justify-center bg-white px-5'>
        <p className='text-body1 mb-6 text-center text-red-500'>{error}</p>
        <button
          type='button'
          onClick={() => navigate('/login', { replace: true })}
          className='bg-primary-500 rounded-lg px-6 py-3 text-white'
        >
          로그인 페이지로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className='flex min-h-dvh flex-col items-center justify-center bg-white'>
      <div className='border-t-primary-500 h-10 w-10 animate-spin rounded-full border-4 border-gray-200' />
      <p className='text-body1 mt-4 text-gray-600'>로그인 중...</p>
    </div>
  );
}
