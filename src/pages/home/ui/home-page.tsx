import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  mockNewCafePlaces,
  mockNewPublicPlaces,
  mockPopularCafePlaces,
  mockPopularPublicPlaces,
  mockRecommendedCafePlaces,
  mockRecommendedPublicPlaces,
} from '@/features/home/model/mock-data';
import CategoryTabs from '@/features/home/ui/CategoryTabs';
import type { Category } from '@/features/home/ui/CategoryTabs';
import HomeHeader from '@/features/home/ui/HomeHeader';
import PlaceSection from '@/features/home/ui/PlaceSection';
import type { PlaceItem } from '@/features/home/ui/PlaceSection';
import SearchDialog from '@/features/home/ui/SearchDialog';
import { useAuthStore } from '@/shared/store/use-auth-store';
import SearchInput from '@/shared/ui/inputs/SearchInput';

const userName = '홍길동';
const userLocation = '강남구';

function HomePage() {
  const [category, setCategory] = useState<Category>('cafe');
  const [likedPlaces, setLikedPlaces] = useState<Set<string>>(new Set());
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const popularPlaces = category === 'cafe' ? mockPopularCafePlaces : mockPopularPublicPlaces;
  const recommendedPlaces =
    category === 'cafe' ? mockRecommendedCafePlaces : mockRecommendedPublicPlaces;
  const newPlaces = category === 'cafe' ? mockNewCafePlaces : mockNewPublicPlaces;

  const applyLikedStatus = (places: PlaceItem[]): PlaceItem[] => {
    return places.map((place) => ({
      ...place,
      isLiked: likedPlaces.has(place.id),
    }));
  };

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handlePlaceClick = (id: string) => {
    navigate(`/place/${id}`);
  };

  const handleLikeClick = (id: string) => {
    setLikedPlaces((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const placeCategory = category === 'cafe' ? 'CAFE' : 'PUBLIC';

  const handleMoreClick = (type: string, title: string) => {
    const params = new URLSearchParams({
      type,
      category: title,
      placeCategory,
    });
    navigate(`/map/recommended?${params.toString()}`);
  };

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <div className='bg-gray-100 pt-5'>
        <HomeHeader />
        <div className='px-5 pt-[17px]'>
          <SearchInput onClick={handleSearchClick} />
        </div>
        <CategoryTabs activeCategory={category} onCategoryChange={handleCategoryChange} />
      </div>

      <div className='flex flex-1 flex-col gap-[52px] pt-6 pb-10'>
        <PlaceSection
          title='인기있는 작업 공간'
          places={applyLikedStatus(popularPlaces)}
          onMoreClick={() => handleMoreClick('popular', '인기있는 작업 공간')}
          onPlaceClick={handlePlaceClick}
          onLikeClick={handleLikeClick}
        />

        {isAuthenticated ? (
          <PlaceSection
            title={`'${userName}'과 비슷한 분들이 좋아한 공간이에요`}
            places={applyLikedStatus(recommendedPlaces)}
            onMoreClick={() =>
              handleMoreClick('similar', `'${userName}'과 비슷한 분들이 좋아한 공간이에요`)
            }
            onPlaceClick={handlePlaceClick}
            onLikeClick={handleLikeClick}
          />
        ) : (
          <PlaceSection
            title={`${userLocation} 주변 랜덤 추천`}
            places={applyLikedStatus(newPlaces)}
            onMoreClick={() => handleMoreClick('random-theme', `${userLocation} 주변 랜덤 추천`)}
            onPlaceClick={handlePlaceClick}
            onLikeClick={handleLikeClick}
          />
        )}

        <PlaceSection
          title={`${userLocation} 주변에 새로 생겼어요`}
          places={applyLikedStatus(newPlaces)}
          onMoreClick={() => handleMoreClick('new', `${userLocation} 주변에 새로 생겼어요`)}
          onPlaceClick={handlePlaceClick}
          onLikeClick={handleLikeClick}
        />
      </div>
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}

export default HomePage;
