export type PlaceCategory = 'CAFE' | 'PUBLIC';

export interface WishlistItemResponse {
  wishlistId: number;
  placeId: number;
  placeName: string;
  category: PlaceCategory;
  addressDetail: string;
  regionCode: number;
  representativeImageKey: string | null;
  latitude: number;
  longitude: number;
  createdAt: string;
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

export interface WishCountResponse {
  wishCount: number;
}
