import MapPinIcon from '@/shared/ui/icons/MapPin.svg?react';

import type { LocationData } from '../model/use-registration-store';

interface SelectedLocationInfoProps {
  location: LocationData;
}

export function SelectedLocationInfo({ location }: SelectedLocationInfoProps) {
  return (
    <div className='bg-white px-5 pt-4'>
      <div className='flex items-start gap-2'>
        <MapPinIcon className='text-primary-700 mt-0.5 h-5 w-5 flex-shrink-0' />
        <div className='flex flex-col gap-0.5'>
          <span className='text-body2 font-medium text-gray-950'>{location.placeName}</span>
          <span className='text-caption1 text-gray-500'>
            {location.roadAddress || location.address}
          </span>
        </div>
      </div>
    </div>
  );
}
