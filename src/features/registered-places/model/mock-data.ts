export interface RegisteredPlace {
  id: string;
  name: string;
  imageUrl?: string;
  likeCount: number;
  tags: string[];
  isLiked: boolean;
}

export const mockRegisteredPlaces: RegisteredPlace[] = [
  {
    id: '1',
    name: '스타벅스 강남점',
    imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400',
    likeCount: 236,
    tags: ['#잔잔한 분위기', '#대형'],
    isLiked: true,
  },
  {
    id: '2',
    name: '투썸플레이스 역삼점',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
    likeCount: 182,
    tags: ['#잔잔한 분위기', '#대형'],
    isLiked: true,
  },
  {
    id: '3',
    name: '블루보틀 삼청점',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
    likeCount: 421,
    tags: ['#잔잔한 분위기', '#대형'],
    isLiked: false,
  },
  {
    id: '4',
    name: '카페 드 파리',
    imageUrl: undefined,
    likeCount: 98,
    tags: ['#잔잔한 분위기', '#대형'],
    isLiked: true,
  },
];
