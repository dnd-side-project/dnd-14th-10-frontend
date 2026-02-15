import { useEffect, useState } from 'react';

import OnboardingLayout from '@/features/onboarding/ui/OnboardingLayout';
import PrimaryButton from '@/shared/ui/buttons/PrimaryButton';
import FormLabel from '@/shared/ui/forms/FormLabel';

interface NicknameStepProps {
  onComplete: (nickname: string) => void;
  onBack: () => void;
}

const getKoreanLength = (str: string): number => {
  return str.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣]/g, '').length;
};

const getEnglishLength = (str: string): number => {
  return str.replace(/[^a-zA-Z]/g, '').length;
};

export default function NicknameStep({ onComplete, onBack }: NicknameStepProps) {
  const [nickname, setNickname] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const koreanLength = getKoreanLength(nickname);
  const englishLength = getEnglishLength(nickname);

  const isKoreanOverLimit = koreanLength > 6;
  const isEnglishOverLimit = englishLength > 10;
  const hasError = isKoreanOverLimit || isEnglishOverLimit;
  const isValid = nickname.length > 0 && !hasError;

  const getErrorMessage = (): string | null => {
    if (isKoreanOverLimit) {
      return '한글 6자를 넘기면 안됩니다.';
    }
    if (isEnglishOverLimit) {
      return '영문 10자를 넘기면 안됩니다.';
    }
    return null;
  };

  const errorMessage = getErrorMessage();

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const viewportHeight = window.visualViewport.height;
        const windowHeight = window.innerHeight;
        const diff = windowHeight - viewportHeight;
        setKeyboardHeight(diff > 0 ? diff : 0);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize, { passive: true });
      window.visualViewport.addEventListener('scroll', handleResize, { passive: true });
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
        window.visualViewport.removeEventListener('scroll', handleResize);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleComplete = () => {
    if (isValid) {
      onComplete(nickname);
    }
  };

  return (
    <OnboardingLayout
      title={
        <>
          사용할 닉네임을
          <br />
          입력해주세요.
        </>
      }
      onBack={onBack}
      footer={
        <div
          className='px-5 pb-8 transition-all duration-200'
          style={{
            paddingBottom: keyboardHeight > 0 ? keyboardHeight + 16 : 32,
          }}
        >
          <PrimaryButton onClick={handleComplete} disabled={!isValid}>
            시작하기
          </PrimaryButton>
        </div>
      }
    >
      <div className='mt-10'>
        <div className='flex items-baseline gap-2'>
          <FormLabel>닉네임</FormLabel>
          <span className='text-[16px] text-gray-500'>( 최대 한글 6자, 영문 10자 )</span>
        </div>
        <input
          type='text'
          value={nickname}
          onChange={handleChange}
          placeholder='예) 고심하는 작업'
          className={`mt-4 h-12 w-full rounded-lg bg-gray-100 px-4 text-[16px] text-gray-900 placeholder:text-gray-500 focus:outline-none ${
            hasError ? 'border-warning-default border' : ''
          }`}
        />
        {errorMessage && <p className='text-warning-default mt-2 text-[12px]'>{errorMessage}</p>}
      </div>
    </OnboardingLayout>
  );
}
