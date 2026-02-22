import { useState } from 'react';

import { useFunnel } from '@use-funnel/react-router-dom';
import { useNavigate } from 'react-router-dom';

import { signup } from '@/features/auth/api/auth.api';
import type { Gender, OnboardingSteps } from '@/features/onboarding/model/onboarding.types';
import AddressStep from '@/features/onboarding/ui/AddressStep';
import BirthdayStep from '@/features/onboarding/ui/BirthdayStep';
import NicknameStep from '@/features/onboarding/ui/NicknameStep';
import { getErrorMessage, getFieldErrors } from '@/shared/api/error.utils';
import { useAuthStore } from '@/shared/store/use-auth-store';

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

  const handleComplete = async (data: {
    birth: string;
    gender: Gender;
    regionCode: number;
    nickname: string;
  }) => {
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
      gender: data.gender,
      birth: data.birth,
      profileImg,
      locationConsent: true, // TODO: 위치 정보 동의 스텝 추가 시 수정
      regionCode: data.regionCode,
    };

    console.log('========== /api/auth/signup Request Body ==========');
    console.log(JSON.stringify(signupData, null, 2));
    console.log('==================================================');

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
      birth={({ history, context }) => {
        console.log('[Birth Step] context:', context);
        return (
          <BirthdayStep
            onNext={(birth, gender) => {
              console.log('[1단계] 생년월일, 성별:', { birth, gender });
              history.push('address', (prev) => ({ ...prev, birth, gender }));
            }}
            onBack={handleBackToLogin}
            initialValue={context.birth}
            initialGender={context.gender}
          />
        );
      }}
      address={({ history, context }) => {
        console.log('[Address Step] context:', context);
        return (
          <AddressStep
            onNext={(regionCode) => {
              console.log('[2단계] 거주지 선택:', {
                birth: context.birth,
                gender: context.gender,
                regionCode,
              });
              history.push('nickname', (prev) => ({ ...prev, regionCode }));
            }}
            onBack={() => {
              // context를 유지하면서 이전 단계로 이동
              history.push('birth', () => context);
            }}
            initialRegionCode={context.regionCode}
          />
        );
      }}
      nickname={({ history, context }) => {
        console.log('[Nickname Step] context:', context);
        return (
          <NicknameStep
            onComplete={(nickname) => {
              console.log('[3단계] 닉네임:', {
                birth: context.birth,
                gender: context.gender,
                regionCode: context.regionCode,
                nickname,
              });
              handleComplete({
                birth: context.birth,
                gender: context.gender,
                regionCode: context.regionCode,
                nickname,
              });
            }}
            onBack={() => {
              // context를 유지하면서 이전 단계로 이동
              history.push('address', () => context);
            }}
            isSubmitting={isSubmitting}
            initialValue={context.nickname}
          />
        );
      }}
    />
  );
}
