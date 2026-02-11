import { useCallback, useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

interface UseFunnelOptions<T extends string> {
  steps: readonly T[];
  initialStep: T;
  stepQueryKey?: string;
}

interface UseFunnelReturn<T extends string> {
  step: T;
  setStep: (step: T, options?: { replace?: boolean }) => void;
  goBack: () => void;
  canGoBack: boolean;
  isStep: (step: T) => boolean;
  currentIndex: number;
  totalSteps: number;
  progress: number;
}

/**
 * 퍼널(단계별 플로우) 관리를 위한 커스텀 훅
 *
 * @description
 * - URL query parameter로 현재 step 동기화
 * - 브라우저 뒤로가기 자동 지원
 * - 타입 안전한 step 전환
 *
 * @example
 * const { step, setStep, goBack } = useFunnel({
 *   steps: ['type', 'location', 'detail', 'complete'] as const,
 *   initialStep: 'type',
 * });
 */
export function useFunnel<T extends string>({
  steps,
  initialStep,
  stepQueryKey = 'step',
}: UseFunnelOptions<T>): UseFunnelReturn<T> {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL에서 현재 step 읽기
  const currentStep = useMemo(() => {
    const urlStep = searchParams.get(stepQueryKey) as T | null;
    // URL의 step이 유효한 step인지 확인
    if (urlStep && steps.includes(urlStep)) {
      return urlStep;
    }
    return initialStep;
  }, [searchParams, stepQueryKey, steps, initialStep]);

  const currentIndex = steps.indexOf(currentStep);

  // step 변경 함수
  const setStep = useCallback(
    (newStep: T, options?: { replace?: boolean }) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(stepQueryKey, newStep);

      setSearchParams(newParams, {
        replace: options?.replace ?? false,
      });
    },
    [searchParams, setSearchParams, stepQueryKey],
  );

  // 이전 step으로 이동
  const goBack = useCallback(() => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setStep(steps[prevIndex], { replace: true });
    }
  }, [currentIndex, steps, setStep]);

  // 특정 step인지 확인
  const isStep = useCallback((step: T) => currentStep === step, [currentStep]);

  return {
    step: currentStep,
    setStep,
    goBack,
    canGoBack: currentIndex > 0,
    isStep,
    currentIndex,
    totalSteps: steps.length,
    progress: ((currentIndex + 1) / steps.length) * 100,
  };
}

/**
 * 퍼널 컨텍스트 타입 정의 헬퍼
 * 각 step별로 필요한 데이터 타입을 정의할 때 사용
 */
export type FunnelContext<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K];
};
