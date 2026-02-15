import cafePlaceholder from '@/shared/assets/images/cafe-placeholder.png';
import publicPlaceholder from '@/shared/assets/images/public-placeholder.png';

import type { PlaceItem } from '../ui/PlaceSection';

// 카페 카테고리 목업 이미지
const cafeImage = cafePlaceholder;

// 공공시설 카테고리 목업 이미지
const publicImage = publicPlaceholder;

// 인기있는 작업 공간 (카페)
export const mockPopularCafePlaces: PlaceItem[] = [
  {
    id: 'cafe-1',
    name: '스타벅스 강남점',
    location: '서울 강남구',
    imageUrl: cafeImage,
    isLiked: false,
  },
  {
    id: 'cafe-2',
    name: '블루보틀 삼청',
    location: '서울 종로구',
    imageUrl: cafeImage,
    isLiked: true,
  },
  {
    id: 'cafe-3',
    name: '투썸플레이스',
    location: '서울 강남구',
    imageUrl: cafeImage,
    isLiked: false,
  },
  {
    id: 'cafe-4',
    name: '앤트러사이트',
    location: '서울 마포구',
    imageUrl: cafeImage,
    isLiked: false,
  },
];

// 인기있는 작업 공간 (공공시설)
export const mockPopularPublicPlaces: PlaceItem[] = [
  {
    id: 'public-1',
    name: '국립중앙도서관',
    location: '서울 서초구',
    imageUrl: publicImage,
    isLiked: false,
  },
  {
    id: 'public-2',
    name: '강남도서관',
    location: '서울 강남구',
    imageUrl: publicImage,
    isLiked: true,
  },
  {
    id: 'public-3',
    name: '서초구립도서관',
    location: '서울 서초구',
    imageUrl: publicImage,
    isLiked: false,
  },
  {
    id: 'public-4',
    name: '마포평생학습관',
    location: '서울 마포구',
    imageUrl: publicImage,
    isLiked: false,
  },
];

// 비슷한 분들이 좋아한 공간 (카페)
export const mockRecommendedCafePlaces: PlaceItem[] = [
  {
    id: 'rec-cafe-1',
    name: '테라로사 강남',
    location: '서울 강남구',
    imageUrl: cafeImage,
    isLiked: false,
  },
  {
    id: 'rec-cafe-2',
    name: '폴 바셋 역삼',
    location: '서울 강남구',
    imageUrl: cafeImage,
    isLiked: true,
  },
  {
    id: 'rec-cafe-3',
    name: '커피빈 선릉',
    location: '서울 강남구',
    imageUrl: cafeImage,
    isLiked: false,
  },
];

// 비슷한 분들이 좋아한 공간 (공공시설)
export const mockRecommendedPublicPlaces: PlaceItem[] = [
  {
    id: 'rec-public-1',
    name: '역삼도서관',
    location: '서울 강남구',
    imageUrl: publicImage,
    isLiked: false,
  },
  {
    id: 'rec-public-2',
    name: '개포디지털혁신파크',
    location: '서울 강남구',
    imageUrl: publicImage,
    isLiked: true,
  },
  {
    id: 'rec-public-3',
    name: '청담도서관',
    location: '서울 강남구',
    imageUrl: publicImage,
    isLiked: false,
  },
];

// 주변에 새로 생긴 공간 (카페)
export const mockNewCafePlaces: PlaceItem[] = [
  {
    id: 'new-cafe-1',
    name: '모모스커피 신사',
    location: '서울 강남구',
    imageUrl: cafeImage,
    isLiked: false,
  },
  {
    id: 'new-cafe-2',
    name: '센터커피 청담',
    location: '서울 강남구',
    imageUrl: cafeImage,
    isLiked: true,
  },
  {
    id: 'new-cafe-3',
    name: '루프트 강남',
    location: '서울 강남구',
    imageUrl: cafeImage,
    isLiked: false,
  },
];

// 주변에 새로 생긴 공간 (공공시설)
export const mockNewPublicPlaces: PlaceItem[] = [
  {
    id: 'new-public-1',
    name: '삼성창업지원센터',
    location: '서울 강남구',
    imageUrl: publicImage,
    isLiked: false,
  },
  {
    id: 'new-public-2',
    name: '강남시민센터',
    location: '서울 강남구',
    imageUrl: publicImage,
    isLiked: true,
  },
  {
    id: 'new-public-3',
    name: '선정릉역 스터디카페',
    location: '서울 강남구',
    imageUrl: publicImage,
    isLiked: false,
  },
];
