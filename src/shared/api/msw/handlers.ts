import { http, HttpResponse } from 'msw';

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

export const handlers = [
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
];
