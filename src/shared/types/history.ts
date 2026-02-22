import type { PlaceCategory } from './wishlist';

export interface HistoryItemResponse {
  historyId: number;
  placeId: number;
  placeName: string;
  category: PlaceCategory;
  addressDetail: string;
  regionCode: number;
  representativeImageKey: string | null;
  latitude: number;
  longitude: number;
  viewedAt: string;
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
