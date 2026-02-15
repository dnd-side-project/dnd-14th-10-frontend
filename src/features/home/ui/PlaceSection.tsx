import { PlaceCard } from '@/entities/place/ui/PlaceCard';
import ChevronRightIcon from '@/shared/ui/icons/ChevronRight.svg?react';

export interface PlaceItem {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  isLiked?: boolean;
}

interface PlaceSectionProps {
  title: string;
  places: PlaceItem[];
  onMoreClick?: () => void;
  onPlaceClick?: (id: string) => void;
  onLikeClick?: (id: string) => void;
}

export default function PlaceSection({
  title,
  places,
  onMoreClick,
  onPlaceClick,
  onLikeClick,
}: PlaceSectionProps) {
  return (
    <section className='flex flex-col gap-3'>
      <div className='flex items-center justify-between px-5'>
        <h2 className='text-heading4 font-bold tracking-tight text-gray-950'>{title}</h2>
        <button type='button' onClick={onMoreClick} className='flex items-center justify-center'>
          <ChevronRightIcon className='size-7 text-gray-500' />
        </button>
      </div>

      <div className='scrollbar-hide flex gap-4 overflow-x-auto px-5'>
        {places.map((place) => (
          <PlaceCard
            key={place.id}
            id={place.id}
            name={place.name}
            location={place.location}
            imageUrl={place.imageUrl}
            isLiked={place.isLiked}
            onClick={() => onPlaceClick?.(place.id)}
            onLikeClick={(e) => {
              e.stopPropagation();
              onLikeClick?.(place.id);
            }}
          />
        ))}
      </div>
    </section>
  );
}
