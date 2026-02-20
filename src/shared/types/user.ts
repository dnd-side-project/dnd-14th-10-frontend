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
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  locationConsent: boolean;
  regionCode: number;
}
