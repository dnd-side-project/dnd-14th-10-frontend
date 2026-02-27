import type { Mood, SpaceSize } from '@/features/register-place/model/register-place.types';

import type { PlaceCategory } from './wishlist';

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
