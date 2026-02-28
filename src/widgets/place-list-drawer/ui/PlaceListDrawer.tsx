import { type ReactNode, useRef, useState } from 'react';

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';

import type { RecommendedPlace } from '@/entities/place/model/place.types';
import { PlaceListItem } from '@/entities/place/ui/PlaceListItem';
import { cn } from '@/lib/utils';

interface PlaceListDrawerProps {
  open: boolean;
  places: RecommendedPlace[];
  onPlaceClick?: (index: number) => void;
  onScrollEnd?: () => void;
  footer?: ReactNode;
}

const SNAP_POINTS = [0.5, 1];

export function PlaceListDrawer({
  open,
  places,
  onPlaceClick,
  onScrollEnd,
  footer,
}: PlaceListDrawerProps) {
  const [snap, setSnap] = useState<number | string | null>(SNAP_POINTS[0]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || !onScrollEnd) return;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 100) {
      onScrollEnd();
    }
  };

  return (
    <Drawer
      open={open}
      snapPoints={SNAP_POINTS}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      dismissible={false}
      modal={false}
    >
      <DrawerContent
        variant='panel'
        showOverlay={snap === 1}
        className={cn(
          'z-101 mx-auto max-w-[450px] px-0 outline-none focus:ring-0 focus:outline-none data-[vaul-drawer-direction=bottom]:border-0',
          'h-screen',
          'data-[vaul-drawer-direction=bottom]:max-h-[calc(100vh-72px)]',
          'overflow-hidden',
        )}
      >
        <DrawerHeader className='sr-only'>
          <DrawerTitle>장소 리스트</DrawerTitle>
        </DrawerHeader>
        <div
          ref={scrollRef}
          data-vaul-no-drag
          onScroll={handleScroll}
          className={cn(
            'divide-gray-150 flex flex-1 flex-col divide-y overflow-y-auto overscroll-contain bg-white pt-5 pb-8',
            'max-h-[calc((100vh-var(--snap-point-height)-72px)-16px)]',
          )}
        >
          {places.length === 0 ? (
            <div className='text-body2 flex flex-1 items-center justify-center py-16 text-gray-400'>
              해당하는 장소가 없습니다
            </div>
          ) : (
            places.map((place, index) => (
              <div key={place.id} className='py-5 first:pt-0 last:pb-0'>
                <PlaceListItem {...place} onClick={() => onPlaceClick?.(index)} />
              </div>
            ))
          )}
          {footer}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
