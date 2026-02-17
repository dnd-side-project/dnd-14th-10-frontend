import { http, HttpResponse } from 'msw';

import type { PlaceDetail } from '@/entities/place/model/place.types';
import type {
  PlaceRegisterRequest,
  PlaceRegisterResponse,
} from '@/features/register-place/model/register-place.types';

const createMockPlaceDetail = (id: string): PlaceDetail => ({
  id,
  name: 'DND 10',
  category: '공공시설',
  rating: 4.8,
  reviewCount: 16,
  tags: ['잔잔한 분위기', '대형'],
  images: [
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
    'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
  ],
  address: '서울 강남구 도산대로 00길 00',
  outletStatus: '넉넉함',
  crowdedness: '여유',
  calmnessIndex: 85,
  restroomInfo: '알려지지 않음',
  floorInfo: '3층',
  mapImageUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400',
  locationPoint: { lat: 37.5665, lng: 126.978 },
  reviewTags: [
    { label: '집중하기 좋아요', percentage: 76 },
    { label: '칸막이가 있어요', percentage: 68 },
    { label: '이용자들이 대부분 성인이에요', percentage: 60 },
    { label: '사장님이 친절해요', percentage: 46 },
    { label: '아늑해요', percentage: 46 },
  ],
  reviews: [
    {
      id: '1',
      authorName: '홍길동',
      createdAt: '2026.02.03',
      content:
        '리뷰 텍스트는 세줄까지 미리보기 노출이 됩니다. 세줄이상 넘어가면 ...으로 대체되어 보이니 어쩌구저쩌구 욜로욜로 에베베베ㅔ 퇴근하고싶어요 집인데 집가고싶어요 왜 아직도 야작을 해야하는거지?',
      imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100',
      tags: ['대화소리가 조금 들려요', '콘센트가 많아요', '조용해요'],
    },
    {
      id: '2',
      authorName: '김철수',
      createdAt: '2026.02.01',
      content: '조용하고 집중하기 좋은 공간입니다. 콘센트도 많아서 노트북 작업하기 딱 좋아요.',
      imageUrl: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=100',
      tags: ['집중하기 좋아요', '콘센트가 많아요'],
    },
    {
      id: '3',
      authorName: '이영희',
      createdAt: '2026.01.28',
      content: '분위기가 정말 좋고 사장님도 친절하세요. 자주 올 것 같아요!',
      imageUrl: null,
      tags: ['사장님이 친절해요', '아늑해요'],
    },
    {
      id: '4',
      authorName: '박민수',
      createdAt: '2026.01.25',
      content: '카공하기 최고의 장소입니다. 강력 추천해요.',
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100',
      tags: ['집중하기 좋아요'],
    },
  ],
});

const MOCK_RECOMMENDED_PLACES = [
  {
    id: '1',
    name: '스타벅스 강남점',
    location: '서울 강남구',
    likeCount: 236,
    tags: ['잔잔한 분위기', '대형'],
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    ],
  },
  {
    id: '2',
    name: '블루보틀 삼청점',
    location: '서울 종로구',
    likeCount: 184,
    tags: ['조용함', '뷰맛집'],
    images: [
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    ],
  },
  {
    id: '3',
    name: '카페 온더플랜',
    location: '서울 마포구',
    likeCount: 312,
    tags: ['콘센트 많음', '넓은 좌석'],
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400',
    ],
  },
  {
    id: '4',
    name: '카공족',
    location: '서울 마포구',
    likeCount: 312,
    tags: ['콘센트 많음', '넓은 좌석'],
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400',
    ],
  },
  {
    id: '5',
    name: '투썸플레이스 역삼점',
    location: '서울 강남구',
    likeCount: 158,
    tags: ['디저트', '넓은 공간'],
    images: [
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
    ],
  },
];

// Mock 사용자 데이터
const MOCK_USER_INFO = {
  id: 'user-1',
  name: '홍길동',
  avatarUrl: null,
  stats: {
    placeCount: 5,
    reviewCount: 25,
    badgeCount: 3,
  },
};

// Mock 최근 본 장소 데이터
const MOCK_USER_HISTORIES = [
  {
    id: 'place-1',
    name: '장소 이름',
    imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400',
    likeCount: 236,
  },
  {
    id: 'place-2',
    name: '장소 이름',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
    likeCount: 450,
  },
  {
    id: 'place-3',
    name: '장소 이름',
    imageUrl: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=400',
    likeCount: 103,
  },
];

// Mock 배지 데이터
const MOCK_USER_BADGES = [
  {
    id: 'badge-1',
    name: '첫 리뷰',
    imageUrl: 'https://em-content.zobj.net/source/apple/391/sports-medal_1f3c5.png',
  },
  {
    id: 'badge-2',
    name: '탐험가',
    imageUrl: 'https://em-content.zobj.net/source/apple/391/sports-medal_1f3c5.png',
  },
  {
    id: 'badge-3',
    name: '인기인',
    imageUrl: 'https://em-content.zobj.net/source/apple/391/sports-medal_1f3c5.png',
  },
];

export const handlers = [
  // 사용자 정보 조회
  http.get('/api/users/me', () => {
    return HttpResponse.json(MOCK_USER_INFO);
  }),

  // 최근 본 장소 조회
  http.get('/api/users/me/histories', () => {
    return HttpResponse.json(MOCK_USER_HISTORIES);
  }),

  // 배지 조회
  http.get('/api/users/me/badges', () => {
    return HttpResponse.json(MOCK_USER_BADGES);
  }),

  http.get('/api/places/nearby', () => {
    const mockPlaces = Array.from({ length: 100 }, (_, i) => ({
      id: String(i + 1),
      name: `카공하기 좋은 카페 ${i + 1}`,
      locationPoint: {
        lat: 37.5665 + (Math.random() - 0.5) * 0.1,
        lng: 126.978 + (Math.random() - 0.5) * 0.1,
      },
      outletScore: Math.floor(Math.random() * 5) + 1,
      noiseLevel: Math.floor(Math.random() * 3) + 1,
      address: `서울특별시 중구 테스트 주소 ${i + 1}`,
    }));
    return HttpResponse.json(mockPlaces);
  }),

  http.get('/api/places/recommend', () => {
    return HttpResponse.json(MOCK_RECOMMENDED_PLACES);
  }),

  http.get('/api/places/:placeId', ({ params }) => {
    const { placeId } = params;
    return HttpResponse.json(createMockPlaceDetail(placeId as string));
  }),

  // POST /api/places (장소 등록)
  http.post('/api/places', async ({ request }) => {
    const body = (await request.json()) as PlaceRegisterRequest;
    console.log('[MSW] 장소 등록 요청:', body);

    // 새로운 장소 ID 생성 (실제로는 서버에서 생성)
    const newPlaceId = Math.floor(Math.random() * 10000) + 1000;

    const response: PlaceRegisterResponse = {
      id: newPlaceId,
    };

    return HttpResponse.json(response, { status: 201 });
  }),
];
