import { apiClient } from '@/shared/api/client';

export type PlaceSortType = 'LATEST' | 'NAME' | 'POPULAR';

export interface MyPlaceItemResponse {
  placeId: number;
  placeName: string;
  representativeImageUrl: string | null;
  mood: 'NOISY' | 'CHATTING' | 'CALM' | 'SILENT';
  spaceSize: 'SMALL' | 'MEDIUM' | 'LARGE';
  wishCount: number;
  wished: boolean;
}

export interface PagedMyPlacesResponse {
  content: MyPlaceItemResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface GetMyPlacesParams {
  page?: number;
  size?: number;
  sortType?: PlaceSortType;
}

export const getMyPlaces = (params: GetMyPlacesParams = {}) => {
  const { page = 0, size = 10, sortType = 'LATEST' } = params;
  return apiClient.get<PagedMyPlacesResponse>('/places/me', {
    params: { page, size, sortType },
  });
};
