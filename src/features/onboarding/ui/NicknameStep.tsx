import { useEffect, useState } from 'react';

import OnboardingLayout from '@/features/onboarding/ui/OnboardingLayout';
import { checkNickname } from '@/features/user/api/user.api';
import PrimaryButton from '@/shared/ui/buttons/PrimaryButton';
import FormLabel from '@/shared/ui/forms/FormLabel';

interface NicknameStepProps {
  onComplete: (nickname: string) => void;
  onBack: () => void;
  initialValue?: string;
  buttonText?: string;
  isSubmitting?: boolean;
}

const hasSpecialCharacters = (str: string): boolean => {
  const specialCharPattern = /[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]/;
  return specialCharPattern.test(str);
};

export default function NicknameStep({
  onComplete,
  onBack,
  initialValue = '',
  buttonText = '시작하기',
  isSubmitting = false,
}: NicknameStepProps) {
  const [nickname, setNickname] = useState(initialValue);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isDuplicateChecking, setIsDuplicateChecking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isOverLimit = nickname.length > 10;
  const hasSpecialChars = hasSpecialCharacters(nickname);
  const hasValidationError = isOverLimit || hasSpecialChars;
  const isValid = nickname.length > 0 && !hasValidationError;

  const getValidationErrorMessage = (): string | null => {
    if (isOverLimit) {
      return '글자 수 10자를 넘기면 안됩니다.';
    }
    if (hasSpecialChars) {
      return '닉네임에 특수문자는 사용할 수 없습니다.';
    }
    return null;
  };

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
    setErrorMessage(null);
  };

  const handleComplete = async () => {
    if (!isValid) return;

    try {
      setIsDuplicateChecking(true);
      setErrorMessage(null);

      const response = await checkNickname(nickname);

      if (!response.data.available) {
        setErrorMessage('이미 사용 중인 닉네임입니다.');
        return;
      }

      onComplete(nickname);
    } catch (error) {
      console.error('닉네임 중복 검사 실패:', error);
      setErrorMessage('닉네임 확인 중 오류가 발생했습니다.');
    } finally {
      setIsDuplicateChecking(false);
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
          className='px-5 transition-all duration-200'
          style={{
            paddingBottom: keyboardHeight > 0 ? keyboardHeight + 16 : 0,
          }}
        >
          <PrimaryButton
            onClick={handleComplete}
            disabled={!isValid || isSubmitting || isDuplicateChecking}
          >
            {isSubmitting ? '처리 중...' : isDuplicateChecking ? '확인 중...' : buttonText}
          </PrimaryButton>
        </div>
      }
    >
      <div className='mt-10'>
        <div className='flex items-baseline gap-2'>
          <FormLabel>닉네임</FormLabel>
          <span className='text-[16px] text-gray-500'>( 최대 글자 수 10자 제한 )</span>
        </div>
        <input
          type='text'
          value={nickname}
          onChange={handleChange}
          placeholder='예) 고심하는 작업'
          className={`mt-4 h-12 w-full rounded-lg bg-gray-100 px-4 text-[16px] text-gray-900 placeholder:text-gray-500 focus:outline-none ${
            hasValidationError || errorMessage ? 'border-warning-default border' : ''
          }`}
        />
        {(getValidationErrorMessage() || errorMessage) && (
          <p className='text-warning-default mt-2 text-[12px]'>
            {getValidationErrorMessage() || errorMessage}
          </p>
        )}
      </div>
    </OnboardingLayout>
  );
}
