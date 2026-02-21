import { isAxiosError } from 'axios';

import type { ApiError } from './error.types';

// Axios 에러인지 확인하고 타입 가드
export const isApiError = (error: unknown): error is ApiError => {
  return isAxiosError(error) && error.response?.data !== undefined;
};

// 에러 메시지 추출
export const getErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    return error.response?.data.message || '요청 처리 중 오류가 발생했습니다.';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return '알 수 없는 오류가 발생했습니다.';
};

// 필드 에러 메시지 추출 (폼 검증용)
export const getFieldErrors = (error: unknown): Record<string, string> => {
  if (!isApiError(error)) return {};

  const fieldErrors = error.response?.data.errors;
  if (!fieldErrors || !Array.isArray(fieldErrors)) return {};

  return fieldErrors.reduce(
    (acc, { field, reason }) => {
      acc[field] = reason;
      return acc;
    },
    {} as Record<string, string>,
  );
};

// HTTP 상태 코드 확인
export const getErrorStatus = (error: unknown): number | null => {
  if (isApiError(error)) {
    return error.response?.status || null;
  }
  return null;
};
