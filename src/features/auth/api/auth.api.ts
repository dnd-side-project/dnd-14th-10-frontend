import { apiClient } from '@/shared/api/client';

// POST /api/users/kakao (카카오 가입)
export const kakaoSignUp = (data: unknown) => {
  return apiClient.post('/users/kakao', data);
};

// POST /api/auth/login (로그인)
export const login = (data: unknown) => {
  return apiClient.post('/auth/login', data);
};
