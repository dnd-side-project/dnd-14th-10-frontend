export interface WishlistItem {
  id: string;
  name: string;
  imageUrl?: string;
  likeCount: number;
  tags: string[];
  isLiked: boolean;
  isDeleted?: boolean;
}

export const mockWishlistItems: WishlistItem[] = [
  {
    id: '1',
    name: '반도니 작업실',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c',
    likeCount: 24,
    tags: ['#분위기 좋은', '#조용한'],
    isLiked: true,
    isDeleted: false,
  },
  {
    id: '2',
    name: '정지인의 아지트',
    imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
    likeCount: 18,
    tags: ['#작업하기 좋은', '#넓은'],
    isLiked: true,
    isDeleted: false,
  },
  {
    id: '3',
    name: '클라우드 스튜디오',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    likeCount: 42,
    tags: ['#햇살 좋은', '#감성적인'],
    isLiked: true,
    isDeleted: false,
  },
  {
    id: '4',
    name: '삭제된 장소',
    imageUrl: undefined,
    likeCount: 0,
    tags: [],
    isLiked: true,
    isDeleted: true,
  },
];
