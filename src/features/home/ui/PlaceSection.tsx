import { PlaceCard } from '@/entities/place/ui/PlaceCard';
import { useDragScroll } from '@/shared/lib/use-drag-scroll';
import ChevronRightIcon from '@/shared/ui/icons/ChevronRight.svg?react';

import EmptyPlaceSection from './EmptyPlaceSection';
import PlaceCardSkeleton from './PlaceCardSkeleton';

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
  isLoading?: boolean;
  emptyMessage?: string;
  onMoreClick?: () => void;
  onPlaceClick?: (id: string) => void;
  onLikeClick?: (id: string) => void;
}

export default function PlaceSection({
  title,
  places,
  isLoading,
  emptyMessage,
  onMoreClick,
  onPlaceClick,
  onLikeClick,
}: PlaceSectionProps) {
  const { ref: scrollRef, isDragged } = useDragScroll<HTMLDivElement>();

  const handlePlaceClick = (id: string) => {
    if (isDragged) return;
    onPlaceClick?.(id);
  };

  const handleLikeClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (isDragged) return;
    onLikeClick?.(id);
  };

  if (isLoading) {
    return (
      <section className='flex flex-col gap-3'>
        <div className='flex items-center justify-between px-5'>
          <div className='h-6 w-40 animate-pulse rounded bg-gray-200' />
        </div>
        <div className='scrollbar-hide flex gap-4 overflow-x-auto px-5'>
          {Array.from({ length: 4 }).map((_, i) => (
            <PlaceCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (places.length === 0 && emptyMessage) {
    return (
      <section className='flex flex-col gap-3'>
        <div className='flex items-center justify-between px-5'>
          <h2 className='text-heading4 font-bold tracking-tight text-gray-950'>{title}</h2>
        </div>
        <div className='px-5'>
          <EmptyPlaceSection message={emptyMessage} />
        </div>
      </section>
    );
  }

  return (
    <section className='flex flex-col gap-3'>
      <div className='flex items-center justify-between px-5'>
        <h2 className='text-heading4 font-bold tracking-tight text-gray-950'>{title}</h2>
        <button type='button' onClick={onMoreClick} className='flex items-center justify-center'>
          <ChevronRightIcon className='size-7 text-gray-500' />
        </button>
      </div>

      <div ref={scrollRef} className='scrollbar-hide flex gap-4 overflow-x-auto px-5'>
        {places.map((place) => (
          <PlaceCard
            key={place.id}
            id={place.id}
            name={place.name}
            location={place.location}
            imageUrl={place.imageUrl}
            isLiked={place.isLiked}
            onClick={() => handlePlaceClick(place.id)}
            onLikeClick={(e) => handleLikeClick(e, place.id)}
          />
        ))}
      </div>
    </section>
  );
}
