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

export interface PlaceDetail {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  images: string[];
  address: string;
  outletStatus: string;
  crowdedness: string;
  calmnessIndex: number;
  restroomInfo: string;
  floorInfo: string;
  mapImageUrl: string;
  locationPoint: { lat: number; lng: number };
  reviewTags: ReviewTag[];
  reviews: Review[];
}

export interface NearbyParams {
  lat: number;
  lng: number;
  radius?: number; // 미터 단위 반경
}

export interface Place {
  id: string;
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
