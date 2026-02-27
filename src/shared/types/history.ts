import type { Mood, PlaceCategory, SpaceSize } from '@/shared/types/place';

export interface HistoryItemResponse {
  historyId: number;
  placeId: number;
  placeName: string;
  category: PlaceCategory;
  addressDetail: string;
  regionCode: number;
  representativeImageUrl: string | null;
  latitude: number;
  longitude: number;
  viewedAt: string;
  wishCount: number;
  mood: Mood;
  spaceSize: SpaceSize;
}

export interface PagedHistoryResponse {
  content: HistoryItemResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
