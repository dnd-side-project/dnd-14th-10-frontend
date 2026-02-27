import { useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import type { PlaceSummaryResponse } from '@/entities/place/model/place.types';
import { useNewPlacesQuery } from '@/entities/place/model/use-new-places-query';
import { usePopularPlacesQuery } from '@/entities/place/model/use-popular-places-query';
import { useRandomThemePlacesQuery } from '@/entities/place/model/use-random-theme-places-query';
import { useSimilarPlacesQuery } from '@/entities/place/model/use-similar-places-query';
import { useUserQuery } from '@/entities/user/model/use-user-query';
import CategoryTabs from '@/features/home/ui/CategoryTabs';
import type { Category } from '@/features/home/ui/CategoryTabs';
import HomeHeader from '@/features/home/ui/HomeHeader';
import PlaceSection from '@/features/home/ui/PlaceSection';
import type { PlaceItem } from '@/features/home/ui/PlaceSection';
import SearchDialog from '@/features/home/ui/SearchDialog';
import { useToggleWishlistMutation } from '@/features/toggle-wishlist/model/use-toggle-wishlist-mutation';
import { getCoordinateByRegionCode } from '@/shared/constants/region-coordinates';
import { useAuthStore } from '@/shared/store/use-auth-store';
import SearchInput from '@/shared/ui/inputs/SearchInput';

const DEFAULT_COORDINATE = { latitude: 37.5172, longitude: 127.0473 };
const DEFAULT_REGION_CODE = 1168000000;
const MAX_ITEMS = 6;

const mapToPlaceItem = (place: PlaceSummaryResponse): PlaceItem => ({
  id: String(place.id),
  name: place.name,
  location: place.addressDetail,
  imageUrl: place.representativeImageUrl,
  isLiked: place.isWished,
});

function HomePage() {
  const [category, setCategory] = useState<Category>('cafe');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { data: user } = useUserQuery();
  const toggleWishlistMutation = useToggleWishlistMutation();

  const coordinate = useMemo(() => {
    if (user?.regionCode) {
      return getCoordinateByRegionCode(user.regionCode) ?? DEFAULT_COORDINATE;
    }
    return DEFAULT_COORDINATE;
  }, [user]);

  const regionCode = user?.regionCode ?? DEFAULT_REGION_CODE;
  const apiCategory = category === 'cafe' ? 'CAFE' : 'PUBLIC';

  const baseParams = {
    longitude: coordinate.longitude,
    latitude: coordinate.latitude,
    category: apiCategory as 'CAFE' | 'PUBLIC',
  };

  const paramsWithRegion = {
    ...baseParams,
    regionCode,
  };

  const popularQuery = usePopularPlacesQuery(baseParams);
  const similarQuery = useSimilarPlacesQuery(paramsWithRegion, isAuthenticated);
  const randomThemeQuery = useRandomThemePlacesQuery(baseParams, !isAuthenticated);
  const newQuery = useNewPlacesQuery(paramsWithRegion);

  const popularPlaces = useMemo(
    () => (popularQuery.data?.slice(0, MAX_ITEMS) ?? []).map(mapToPlaceItem),
    [popularQuery.data],
  );

  const recommendedPlaces = useMemo(() => {
    if (isAuthenticated) {
      return (similarQuery.data?.slice(0, MAX_ITEMS) ?? []).map(mapToPlaceItem);
    }
    return (randomThemeQuery.data?.places?.slice(0, MAX_ITEMS) ?? []).map(mapToPlaceItem);
  }, [isAuthenticated, similarQuery.data, randomThemeQuery.data]);

  const newPlaces = useMemo(
    () => (newQuery.data?.slice(0, MAX_ITEMS) ?? []).map(mapToPlaceItem),
    [newQuery.data],
  );

  const recommendedTitle = useMemo(() => {
    if (isAuthenticated && user?.nickname) {
      return `'${user.nickname}'과 비슷한 분들이 좋아한 공간이에요`;
    }
    if (randomThemeQuery.data?.themeValue) {
      return `'${randomThemeQuery.data.themeValue}' 추천 공간`;
    }
    return '추천 공간';
  }, [isAuthenticated, user, randomThemeQuery.data]);

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handlePlaceClick = (id: string) => {
    navigate(`/place/${id}`);
  };

  const handleLikeClick = (id: string, isLiked: boolean) => {
    toggleWishlistMutation.mutate({
      placeId: Number(id),
      isWished: isLiked,
    });
  };

  const handleMoreClick = () => {
    navigate('/map');
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
          places={popularPlaces}
          isLoading={popularQuery.isLoading}
          emptyMessage='주변에 인기 공간이 없습니다'
          onMoreClick={handleMoreClick}
          onPlaceClick={handlePlaceClick}
          onLikeClick={(id) => {
            const place = popularPlaces.find((p) => p.id === id);
            if (place) handleLikeClick(id, place.isLiked ?? false);
          }}
        />

        <PlaceSection
          title={recommendedTitle}
          places={recommendedPlaces}
          isLoading={isAuthenticated ? similarQuery.isLoading : randomThemeQuery.isLoading}
          emptyMessage='추천 공간이 없습니다'
          onMoreClick={handleMoreClick}
          onPlaceClick={handlePlaceClick}
          onLikeClick={(id) => {
            const place = recommendedPlaces.find((p) => p.id === id);
            if (place) handleLikeClick(id, place.isLiked ?? false);
          }}
        />

        <PlaceSection
          title='주변에 새로 생겼어요'
          places={newPlaces}
          isLoading={newQuery.isLoading}
          emptyMessage='주변에 신규 공간이 없습니다'
          onMoreClick={handleMoreClick}
          onPlaceClick={handlePlaceClick}
          onLikeClick={(id) => {
            const place = newPlaces.find((p) => p.id === id);
            if (place) handleLikeClick(id, place.isLiked ?? false);
          }}
        />
      </div>
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}

export default HomePage;
