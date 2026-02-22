import { useState } from 'react';

import { useFunnel } from '@use-funnel/react-router-dom';
import { useNavigate } from 'react-router-dom';

import { signup } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/features/auth/model/use-auth-store';
import type { OnboardingSteps } from '@/features/onboarding/model/onboarding.types';
import AddressStep from '@/features/onboarding/ui/AddressStep';
import BirthdayStep from '@/features/onboarding/ui/BirthdayStep';
import NicknameStep from '@/features/onboarding/ui/NicknameStep';
import { getErrorMessage, getFieldErrors } from '@/shared/api/error.utils';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const funnel = useFunnel<OnboardingSteps>({
    id: 'onboarding',
    initial: {
      step: 'birth',
      context: {},
    },
  });

  const handleComplete = async (data: { birth: string; address: string; nickname: string }) => {
    const signupToken = sessionStorage.getItem('signupToken');
    const oauthInfoStr = sessionStorage.getItem('oauthInfo');

    if (!signupToken) {
      console.warn('signupToken이 없습니다. 로그인 페이지로 이동합니다.');
      navigate('/login', { replace: true });
      return;
    }

    let name = '';
    let profileImg: string | undefined;

    if (oauthInfoStr) {
      try {
        const oauthInfo = JSON.parse(oauthInfoStr);
        name = oauthInfo.name || '';
        profileImg = oauthInfo.profileImg;
      } catch (e) {
        console.error('oauthInfo 파싱 실패:', e);
      }
    }

    setIsSubmitting(true);

    const signupData = {
      signupToken,
      name,
      nickname: data.nickname,
      gender: 'MALE' as const, // TODO: 성별 선택 스텝 추가 시 수정
      birth: data.birth,
      profileImg,
      locationConsent: true, // TODO: 위치 정보 동의 스텝 추가 시 수정
      regionCode: 1168010100, // TODO: 거주지(address)에서 regionCode로 변환하는 로직 추가 필요
    };

    console.log('회원가입 요청 데이터:', signupData);

    try {
      const response = await signup(signupData);

      useAuthStore.getState().setAuth(response.data.accessToken, response.data.user);

      sessionStorage.removeItem('signupToken');
      sessionStorage.removeItem('oauthInfo');

      navigate('/', { replace: true });
    } catch (error: unknown) {
      console.error('회원가입 실패:', error);

      const errorMessage = getErrorMessage(error);
      const fieldErrors = getFieldErrors(error);

      if (Object.keys(fieldErrors).length > 0) {
        console.error('필드 에러:', fieldErrors);
        alert(`입력 오류: ${Object.values(fieldErrors).join(', ')}`);
      } else {
        alert(errorMessage);
      }

      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login', { replace: true });
  };

  return (
    <funnel.Render
      birth={({ history }) => (
        <BirthdayStep
          onNext={(birth) => history.push('address', (prev) => ({ ...prev, birth }))}
          onBack={handleBackToLogin}
        />
      )}
      address={({ history }) => (
        <AddressStep
          onNext={(address) => history.push('nickname', (prev) => ({ ...prev, address }))}
          onBack={() => history.back()}
        />
      )}
      nickname={({ context }) => (
        <NicknameStep
          onComplete={(nickname) =>
            handleComplete({
              birth: context.birth,
              address: context.address,
              nickname,
            })
          }
          onBack={() => funnel.history.back()}
          isSubmitting={isSubmitting}
        />
      )}
    />
  );
}
