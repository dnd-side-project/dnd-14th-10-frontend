import type {
  CrowdStatus,
  Mood,
  OutletScore,
  PlaceCategory,
  SpaceSize,
} from '@/shared/types/place';

// 이미지 요청
export interface PlaceImageRequest {
  imageKey: string;
  sequence: number;
  isRepresentative: boolean;
}

// 장소 등록 요청
export interface PlaceRegisterRequest {
  name: string;
  category: PlaceCategory;
  latitude: number;
  longitude: number;
  regionCode: number;
  addressDetail: string;
  outletScore: OutletScore;
  spaceSize: SpaceSize;
  crowdStatus: CrowdStatus;
  mood: Mood;
  images: PlaceImageRequest[];
  floorInfo?: number;
  openTime?: string;
  closeTime?: string;
  restroomInfo?: string;
  tagIds?: number[];
}

// 장소 등록 응답
export interface PlaceRegisterResponse {
  placeId: number;
}

// Presigned URL 요청
export interface PresignedUrlRequest {
  filenames: string[];
}

// Presigned URL 응답 아이템
export interface PresignedUrlItem {
  filename: string;
  url: string;
  objectKey: string;
}

// Presigned URL 응답
export interface PresignedUrlResponse {
  urls: PresignedUrlItem[];
}

// UI에서 사용하는 옵션 라벨
export const OUTLET_SCORE_OPTIONS: { value: OutletScore; label: string }[] = [
  { value: 'FEW', label: '부족함' },
  { value: 'AVERAGE', label: '적당함' },
  { value: 'MANY', label: '넉넉함' },
];

export const SPACE_SIZE_OPTIONS: { value: SpaceSize; label: string }[] = [
  { value: 'SMALL', label: '소형' },
  { value: 'MEDIUM', label: '중형' },
  { value: 'LARGE', label: '대형' },
];

export const CROWD_STATUS_OPTIONS: { value: CrowdStatus; label: string }[] = [
  { value: 'RELAX', label: '여유' },
  { value: 'NORMAL', label: '보통' },
  { value: 'FULL', label: '혼잡' },
];

export const MOOD_OPTIONS: { value: Mood; label: string }[] = [
  { value: 'NOISY', label: '소란스러움' },
  { value: 'CHATTING', label: '대화하는 분위기' },
  { value: 'CALM', label: '차분한 분위기' },
  { value: 'SILENT', label: '고요해요' },
];
