import type {
  CrowdStatus,
  Mood,
  OutletScore,
  PlaceCategory,
  SpaceSize,
} from '@/features/register-place/model/register-place.types';

export interface Review {
  id: string;
  authorName: string;
  createdAt: string;
  content: string;
  imageUrl: string | null;
  tags: string[];
}

export interface ReviewTag {
  label: string;
  percentage: number;
}

// 리뷰 목록 API 응답 타입
export interface ReviewImage {
  imageId: number;
  imageUrl: string;
  sequence: number;
  isPrimary: boolean;
}

export interface ReviewTagItem {
  tagId: number;
  code: string;
  name: string;
}

export interface PlaceReview {
  reviewId: number;
  placeId: number;
  userId: number;
  userNickname: string;
  userProfileImg: string;
  rating: number;
  mood: Mood;
  spaceSize: SpaceSize;
  outletScore: OutletScore;
  crowdStatus: CrowdStatus;
  content: string;
  tags: ReviewTagItem[];
  images: ReviewImage[];
  visitedAt: string;
  createdAt: string;
}

export interface PageableSort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  paged: boolean;
  pageSize: number;
  unpaged: boolean;
  offset: number;
  sort: PageableSort;
}

export interface ReviewTagStat {
  tagId: number;
  code: string;
  name: string;
  count: number;
}

export interface ReviewRatingStat {
  averageRating: number;
  reviewCount: number;
}

export interface PlaceReviewsResponse {
  totalElements: number;
  totalPages: number;
  pageable: Pageable;
  numberOfElements: number;
  size: number;
  number: number;
  content: PlaceReview[];
  sort: PageableSort;
  first: boolean;
  last: boolean;
  empty: boolean;
}

interface PlaceImage {
  url: string;
  sequence: number;
  representativeFlag: boolean;
}

export interface PlaceDetail {
  id: number;
  name: string;
  category: PlaceCategory;
  addressDetail: string;
  latitude: number;
  longitude: number;
  images: PlaceImage[];
  averageRating: number;
  reviewCount: number;
  spaceSize: SpaceSize;
  mood: Mood;
  outletScore: OutletScore;
  crowdStatus: CrowdStatus;
  openTime: string | null;
  closeTime: string | null;
  floorInfo: number | null;
  restroomInfo: string | null;
  isWished: boolean;
  reviewTags: ReviewTag[];
  reviews: Review[];
}

export interface NearbyParams {
  lat: number;
  lng: number;
  radius?: number; // 미터 단위 반경
}

export interface Place {
  id: number;
  name: string;
  locationPoint: { lat: number; lng: number };
  outletScore: number;
  noiseLevel: number;
  address: string;
}

export interface RecommendedPlace {
  id: string;
  name: string;
  location: string;
  likeCount: number;
  tags: string[];
  images: string[];
}

export interface PlaceRecommendation {
  id: number;
  name: string;
  category: PlaceCategory;
  addressDetail: string;
  regionCode: number;
  representativeImageUrl: string;
  latitude: number;
  longitude: number;
  mood: Mood;
  spaceSize: SpaceSize;
  isWished: boolean;
}

export interface PlaceRecommendationResponse {
  themeType: string;
  themeValue: string;
  places: PlaceRecommendation[];
}

export interface PopularPlacesParams {
  longitude: number;
  latitude: number;
  category: PlaceCategory;
  radiusMeters?: number;
}

export interface SimilarPlacesParams {
  regionCode: number;
  category: PlaceCategory;
  longitude: number;
  latitude: number;
}
