import { useFunnel } from '@use-funnel/react-router-dom';
import { useNavigate } from 'react-router-dom';

import type { OnboardingSteps } from '@/features/onboarding/model/onboarding.types';
import AddressStep from '@/features/onboarding/ui/AddressStep';
import BirthdayStep from '@/features/onboarding/ui/BirthdayStep';
import NicknameStep from '@/features/onboarding/ui/NicknameStep';

export default function OnboardingPage() {
  const navigate = useNavigate();

  const funnel = useFunnel<OnboardingSteps>({
    id: 'onboarding',
    initial: {
      step: 'birthday',
      context: {},
    },
  });

  const handleComplete = (data: { birthday: string; address: string; nickname: string }) => {
    // TODO: 온보딩 데이터를 서버에 전송하거나 로컬에 저장
    console.log('온보딩 완료:', data);

    // 홈으로 이동
    navigate('/', { replace: true });
  };

  const handleBackToLogin = () => {
    navigate('/login', { replace: true });
  };

  return (
    <funnel.Render
      birthday={({ history }) => (
        <BirthdayStep
          onNext={(birthday) => history.push('address', (prev) => ({ ...prev, birthday }))}
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
              birthday: context.birthday,
              address: context.address,
              nickname,
            })
          }
          onBack={() => funnel.history.back()}
        />
      )}
    />
  );
}
