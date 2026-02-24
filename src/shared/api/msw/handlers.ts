import { http, HttpResponse } from 'msw';

import type { PlaceDetail, PlaceReviewsResponse } from '@/entities/place/model/place.types';
import type {
  PlaceRegisterRequest,
  PlaceRegisterResponse,
} from '@/features/register-place/model/register-place.types';

const createMockPlaceDetail = (id: string): PlaceDetail => ({
  id: Number(id),
  name: 'DND 10',
  category: 'PUBLIC',
  addressDetail: '서울 강남구 도산대로 00길 00',
  latitude: 37.5665,
  longitude: 126.978,
  images: [
    { url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400', sequence: 0, representativeFlag: true },
    { url: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400', sequence: 1, representativeFlag: false },
    { url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400', sequence: 2, representativeFlag: false },
  ],
  averageRating: 4.8,
  reviewCount: 16,
  spaceSize: 'LARGE',
  mood: 'CALM',
  outletScore: 'MANY',
  crowdStatus: 'RELAX',
  openTime: '09:00',
  closeTime: '22:00',
  floorInfo: 3,
  restroomInfo: '1층 로비 옆',
  isWished: false,
  reviewTags: [
    { label: '집중하기 좋아요', percentage: 76 },
    { label: '칸막이가 있어요', percentage: 68 },
    { label: '이용자들이 대부분 성인이에요', percentage: 60 },
    { label: '사장님이 친절해요', percentage: 46 },
    { label: '아늑해요', percentage: 46 },
    { label: '콘센트가 많아요', percentage: 38 },
    { label: '조용해요', percentage: 30 },
    { label: '주차가 편해요', percentage: 22 },
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

const createMockPlaceReviews = (placeId: string): PlaceReviewsResponse => ({
  totalElements: 4,
  totalPages: 1,
  pageable: {
    pageNumber: 0,
    paged: true,
    pageSize: 20,
    unpaged: false,
    offset: 0,
    sort: { sorted: false, unsorted: true, empty: true },
  },
  numberOfElements: 4,
  size: 20,
  number: 0,
  content: [
    {
      reviewId: 1,
      placeId: Number(placeId),
      userId: 1,
      userNickname: '홍길동',
      userProfileImg: '',
      rating: 4.5,
      mood: 'CALM',
      spaceSize: 'LARGE',
      outletScore: 'MANY',
      crowdStatus: 'RELAX',
      content:
        '리뷰 텍스트는 세줄까지 미리보기 노출이 됩니다. 세줄이상 넘어가면 ...으로 대체되어 보입니다.',
      tags: [
        { tagId: 1, code: 'QUIET', name: '조용해요' },
        { tagId: 2, code: 'OUTLET', name: '콘센트가 많아요' },
      ],
      images: [
        {
          imageId: 1,
          imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100',
          sequence: 0,
          isPrimary: true,
        },
      ],
      visitedAt: '2026-02-03T00:00:00',
      createdAt: '2026-02-03T00:00:00',
    },
    {
      reviewId: 2,
      placeId: Number(placeId),
      userId: 2,
      userNickname: '김철수',
      userProfileImg: '',
      rating: 5.0,
      mood: 'SILENT',
      spaceSize: 'LARGE',
      outletScore: 'MANY',
      crowdStatus: 'RELAX',
      content: '조용하고 집중하기 좋은 공간입니다. 콘센트도 많아서 노트북 작업하기 딱 좋아요.',
      tags: [{ tagId: 3, code: 'FOCUS', name: '집중하기 좋아요' }],
      images: [
        {
          imageId: 2,
          imageUrl: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=100',
          sequence: 0,
          isPrimary: true,
        },
      ],
      visitedAt: '2026-02-01T00:00:00',
      createdAt: '2026-02-01T00:00:00',
    },
    {
      reviewId: 3,
      placeId: Number(placeId),
      userId: 3,
      userNickname: '이영희',
      userProfileImg: '',
      rating: 4.0,
      mood: 'CHATTING',
      spaceSize: 'MEDIUM',
      outletScore: 'AVERAGE',
      crowdStatus: 'NORMAL',
      content: '분위기가 정말 좋고 사장님도 친절하세요. 자주 올 것 같아요!',
      tags: [
        { tagId: 4, code: 'KIND', name: '사장님이 친절해요' },
        { tagId: 5, code: 'COZY', name: '아늑해요' },
      ],
      images: [],
      visitedAt: '2026-01-28T00:00:00',
      createdAt: '2026-01-28T00:00:00',
    },
    {
      reviewId: 4,
      placeId: Number(placeId),
      userId: 4,
      userNickname: '박민수',
      userProfileImg: '',
      rating: 5.0,
      mood: 'CALM',
      spaceSize: 'LARGE',
      outletScore: 'MANY',
      crowdStatus: 'RELAX',
      content: '카공하기 최고의 장소입니다. 강력 추천해요.',
      tags: [{ tagId: 3, code: 'FOCUS', name: '집중하기 좋아요' }],
      images: [
        {
          imageId: 3,
          imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100',
          sequence: 0,
          isPrimary: true,
        },
      ],
      visitedAt: '2026-01-25T00:00:00',
      createdAt: '2026-01-25T00:00:00',
    },
  ],
  sort: { sorted: false, unsorted: true, empty: true },
  first: true,
  last: true,
  empty: false,
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

  // GET /api/places/:placeId/reviews/tag-stats (리뷰 태그 통계)
  http.get('/api/places/:placeId/reviews/tag-stats', () => {
    return HttpResponse.json([
      { tagId: 1, code: 'FOCUS', name: '집중하기 좋아요', count: 12 },
      { tagId: 2, code: 'PARTITION', name: '칸막이가 있어요', count: 10 },
      { tagId: 3, code: 'ADULT', name: '이용자들이 대부분 성인이에요', count: 9 },
      { tagId: 4, code: 'KIND', name: '사장님이 친절해요', count: 7 },
      { tagId: 5, code: 'COZY', name: '아늑해요', count: 7 },
      { tagId: 6, code: 'OUTLET', name: '콘센트가 많아요', count: 6 },
      { tagId: 7, code: 'QUIET', name: '조용해요', count: 5 },
      { tagId: 8, code: 'PARKING', name: '주차가 편해요', count: 3 },
    ]);
  }),

  // GET /api/places/:placeId/reviews/rating-stats (리뷰 별점 통계)
  http.get('/api/places/:placeId/reviews/rating-stats', () => {
    return HttpResponse.json({
      averageRating: 4.8,
      reviewCount: 16,
    });
  }),

  // GET /api/places/:placeId/reviews (리뷰 목록 조회)
  http.get('/api/places/:placeId/reviews', ({ params }) => {
    const { placeId } = params;
    return HttpResponse.json(createMockPlaceReviews(placeId as string));
  }),

  http.get('/api/places/:placeId', ({ params }) => {
    const { placeId } = params;
    const VALID_PLACE_IDS = ['1', '2', '3', '4', '5'];

    if (!VALID_PLACE_IDS.includes(placeId as string)) {
      return HttpResponse.json({ message: '존재하지 않는 장소입니다.' }, { status: 404 });
    }

    return HttpResponse.json(createMockPlaceDetail(placeId as string));
  }),

  // POST /api/places/images/presigned-url (Presigned URL 발급)
  http.post('/api/places/images/presigned-url', async ({ request }) => {
    const body = (await request.json()) as { filenames: string[] };
    console.log('[MSW] Presigned URL 요청:', body);

    const urls = body.filenames.map((filename) => {
      const uuid = crypto.randomUUID();
      const ext = filename.split('.').pop();
      const objectKey = `place/${uuid}.${ext}`;
      return {
        filename,
        url: `https://mock-storage.example.com/${objectKey}?presigned=true`,
        objectKey,
      };
    });

    return HttpResponse.json({ urls });
  }),

  // POST /api/places (장소 등록)
  http.post('/api/places', async ({ request }) => {
    const body = (await request.json()) as PlaceRegisterRequest;
    console.log('[MSW] 장소 등록 요청:', body);

    // 새로운 장소 ID 생성 (실제로는 서버에서 생성)
    const newPlaceId = Math.floor(Math.random() * 10000) + 1000;

    const response: PlaceRegisterResponse = {
      placeId: newPlaceId,
    };

    return HttpResponse.json(response, { status: 200 });
  }),

  // POST /api/reviews (리뷰 작성)
  http.post('/api/reviews', async ({ request }) => {
    const body = await request.json();
    console.log('[MSW] 리뷰 작성 요청:', body);
    return HttpResponse.json({
      reviewId: Math.floor(Math.random() * 10000),
      representativeImageUrl: '',
      reviewOrder: 1,
    });
  }),

  // POST /api/wishlists (찜 추가)
  http.post('/api/wishlists', async ({ request }) => {
    const body = await request.json();
    console.log('[MSW] 찜 추가 요청:', body);
    return HttpResponse.json(null, { status: 200 });
  }),
];
