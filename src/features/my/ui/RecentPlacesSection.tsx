import { useRef, useState, type MouseEvent } from 'react';

import HeartFilledIcon from '@/shared/ui/icons/HeartFilled.svg?react';

interface RecentPlace {
  id: string;
  name: string;
  imageUrl: string;
  likeCount: number;
}

interface RecentPlacesSectionProps {
  places: RecentPlace[];
  onPlaceClick?: (id: string) => void;
}

export default function RecentPlacesSection({ places, onPlaceClick }: RecentPlacesSectionProps) {
  const hasPlaces = places.length > 0;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;

    if (Math.abs(walk) > 5) {
      setHasMoved(true);
    }

    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handlePlaceClick = (id: string) => {
    if (!hasMoved) {
      onPlaceClick?.(id);
    }
  };

  return (
    <div className='border-gray-150 flex flex-col gap-4 border-b px-5 py-8'>
      <h2 className='text-body1 font-bold tracking-tight text-gray-950'>최근 본 장소</h2>
      {hasPlaces ? (
        <div
          ref={scrollRef}
          className={`scrollbar-hide -mx-5 flex gap-4 overflow-x-auto px-5 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {places.map((place) => (
            <div
              key={place.id}
              className='flex w-[120px] shrink-0 cursor-pointer flex-col gap-2'
              onClick={() => handlePlaceClick(place.id)}
            >
              <div className='aspect-square w-full overflow-hidden rounded-xl border border-gray-300'>
                {place.imageUrl ? (
                  <img
                    src={place.imageUrl}
                    alt={place.name}
                    className='size-full object-cover'
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  />
                ) : (
                  <div className='flex size-full items-center justify-center bg-gray-100'>
                    <span className='text-xs text-gray-400'>이미지 없음</span>
                  </div>
                )}
              </div>
              <div className='flex flex-col gap-2'>
                <span className='text-body1 font-medium tracking-tight text-gray-950'>
                  {place.name}
                </span>
                <div className='flex items-center gap-1'>
                  <HeartFilledIcon className='text-primary-700 size-4.5' />
                  <span className='text-caption1 text-primary-700 tracking-tight'>
                    {place.likeCount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex h-[140px] items-center justify-center'>
          <p className='text-body1 tracking-tight text-gray-400'>최근 본 장소가 없어요</p>
        </div>
      )}
    </div>
  );
}
