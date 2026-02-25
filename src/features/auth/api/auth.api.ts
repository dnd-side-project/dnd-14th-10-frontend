import { apiClient, authClient } from '@/shared/api/client';
import type { User } from '@/shared/types/user';

export interface OAuthInfo {
  name: string;
  profileImg: string;
}

// POST /api/auth/oauth/{provider} - OAuth 로그인
export interface OAuthRequest {
  code: string;
  redirectUri: string;
}

export interface OAuthResponse {
  isNewUser: boolean;
  accessToken?: string;
  expiresIn?: number;
  user?: User;
  signupToken?: string;
  oauthInfo?: OAuthInfo;
}

export const kakaoOAuthLogin = (data: OAuthRequest) => {
  return authClient.post<OAuthResponse>('/auth/oauth/kakao', data);
};

/** OAuth 로그인 (kakaoOAuthLogin alias) */
export const login = kakaoOAuthLogin;

// POST /api/auth/signup - 회원가입
export interface SignupRequest {
  signupToken: string;
  name: string;
  nickname: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  birth: string;
  profileImg?: string;
  locationConsent: boolean;
  regionCode: number;
}

export interface SignupResponse {
  accessToken: string;
  expiresIn: number;
  user: User;
}

export const signup = (data: SignupRequest) => {
  return authClient.post<SignupResponse>('/auth/signup', data);
};

/** 카카오 회원가입 (signup alias) */
export const kakaoSignUp = signup;

// POST /api/auth/refresh - 토큰 갱신
export interface RefreshResponse {
  accessToken: string;
  expiresIn: number;
}

export const refreshToken = () => {
  return authClient.post<RefreshResponse>('/auth/refresh');
};

// POST /api/auth/logout - 로그아웃
export const logout = () => {
  return apiClient.post('/auth/logout');
};
