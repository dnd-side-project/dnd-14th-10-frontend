import type { Mood, SpaceSize } from './place';

export interface WishlistItemResponse {
  wishlistId: number;
  placeId: number;
  placeName: string;
  representativeImageUrl: string | null;
  mood: Mood;
  spaceSize: SpaceSize;
  wishCount: number;
  wished: boolean;
  wishedAt: string;
}

export interface PagedWishlistResponse {
  content: WishlistItemResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export type WishlistSortType = 'LATEST' | 'NAME' | 'POPULAR';
