// 기본 사용자 정보 (인증 응답용)
export interface User {
  id: number;
  nickname: string;
  profileImg: string | null;
}

// 상세 사용자 정보 (프로필 조회용)
export interface UserProfile extends User {
  name: string;
  birth: string;
  gender: 'MALE' | 'FEMALE';
  locationConsent: boolean;
  regionCode: number;
  reviewCount: number;
  placeCount: number;
  badgeCount: number;
}

// 회원탈퇴 사유
export type WithdrawReason = 'LOW_USAGE' | 'PRIVACY_CONCERN' | 'OTHER';

export interface WithdrawReasonItem {
  code: WithdrawReason;
  description: string;
}
