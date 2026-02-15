export interface Review {
  id: string;
  placeName: string;
  date: string;
  content: string;
  images: string[];
  tags: string[];
}

export const mockReviews: Review[] = [
  {
    id: '1',
    placeName: '스타벅스 강남점',
    date: '25.02.15',
    content:
      '조용하고 분위기가 좋아요. 콘센트도 많고 와이파이도 빨라서 작업하기 정말 좋습니다. 다만 주말에는 사람이 많아서 자리 잡기가 어려울 수 있어요.',
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=400'],
    tags: ['대화소리가 조금 들려요', '와이파이 빠름', '콘센트 많음'],
  },
  {
    id: '2',
    placeName: '투썸플레이스 역삼점',
    date: '25.02.10',
    content: '넓고 쾌적한 공간이에요. 테이블 간격이 넓어서 작업하기 좋습니다.',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400',
    ],
    tags: ['조용함', '넓은 공간'],
  },
  {
    id: '3',
    placeName: '블루보틀 삼청점',
    date: '25.01.28',
    content: '커피가 맛있고 인테리어가 예뻐요. 사진 찍기 좋습니다.',
    images: [
      'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=400',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    ],
    tags: ['인테리어 예쁨'],
  },
];
