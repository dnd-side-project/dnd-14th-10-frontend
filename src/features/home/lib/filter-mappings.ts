import type { Mood, PlaceCategory, SpaceSize } from '@/shared/types/place';

export const ATMOSPHERE_TO_MOOD: Record<string, Mood> = {
  '소란스러움': 'NOISY',
  '대화하는 분위기': 'CHATTING',
  '잔잔한 분위기': 'CALM',
  '고요해요': 'SILENT',
};

export const SIZE_TO_SPACE_SIZE: Record<string, SpaceSize> = {
  '소형': 'SMALL',
  '중형': 'MEDIUM',
  '대형': 'LARGE',
};

export const CATEGORY_TO_API: Record<string, PlaceCategory> = {
  cafe: 'CAFE',
  public: 'PUBLIC',
};
