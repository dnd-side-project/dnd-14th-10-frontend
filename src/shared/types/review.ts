export type Mood = 'NOISY' | 'CHATTING' | 'CALM' | 'SILENT';
export type SpaceSize = 'SMALL' | 'MEDIUM' | 'LARGE';
export type OutletScore = 'FEW' | 'AVERAGE' | 'MANY';
export type CrowdStatus = 'RELAX' | 'NORMAL' | 'FULL';

export interface ReviewTagResponse {
  id: number;
  code: string;
  name: string;
}

export interface ReviewImageResponse {
  imageId: number;
  imageUrl: string;
  sequence: number;
}

export interface ReviewDetailResponse {
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
  tags: ReviewTagResponse[];
  images: ReviewImageResponse[];
  visitedAt: string;
  createdAt: string;
}

export interface PagedReviewResponse {
  content: ReviewDetailResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
