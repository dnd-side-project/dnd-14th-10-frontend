import { useState } from 'react';

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { PlaceListItem, type PlaceListItemProps } from '@/entities/place/ui/PlaceListItem';
import { cn } from '@/lib/utils';

interface PlaceListDrawerProps {
  open: boolean;
  places: Omit<PlaceListItemProps, 'onClick'>[];
  onPlaceClick?: (index: number) => void;
}

const SNAP_POINTS = [0.4, 0.7, 1];

export function PlaceListDrawer({ open, places, onPlaceClick }: PlaceListDrawerProps) {
  const [snap, setSnap] = useState<number | string | null>(SNAP_POINTS[1]);

  return (
    <Drawer
      open={open}
      snapPoints={SNAP_POINTS}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      dismissible={false}
    >
      <DrawerContent
        showOverlay={snap === 1}
        className={cn(
          'z-[101] mx-auto max-w-[390px] rounded-t-xl px-0 outline-none focus:ring-0 focus:outline-none data-[vaul-drawer-direction=bottom]:border-0',
          'h-[100vh]',
          'data-[vaul-drawer-direction=bottom]:max-h-[calc(100vh-72px)]',
          'overflow-hidden',
        )}
      >
        <DrawerHeader className='sr-only'>
          <DrawerTitle>장소 리스트</DrawerTitle>
        </DrawerHeader>
        <div
          data-vaul-no-drag
          className={cn(
            'divide-gray-150 flex flex-1 flex-col divide-y overflow-y-auto overscroll-contain bg-white pt-5 pb-8',
            'max-h-[calc((100vh-var(--snap-point-height)-72px)-16px)]',
          )}
        >
          {places.map((place, index) => (
            <div key={index} className='py-5 first:pt-0 last:pb-0'>
              <PlaceListItem {...place} onClick={() => onPlaceClick?.(index)} />
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
