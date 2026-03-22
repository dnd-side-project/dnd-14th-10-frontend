import { create } from 'zustand';

import { REGION_COORDINATES } from '@/shared/constants/region-coordinates';

const DEFAULT_REGION_CODE = 1168000000; // 서울 강남구
const DEFAULT_SIGUNGU_NAME = '강남구';
const DEFAULT_COORD = REGION_COORDINATES[DEFAULT_REGION_CODE];

export interface LocationData {
  lat: number;
  lng: number;
  address: string;
  regionCode: number;
  sigunguName: string;
}

interface LocationState extends LocationData {
  setLocation: (data: LocationData) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  lat: DEFAULT_COORD.latitude,
  lng: DEFAULT_COORD.longitude,
  address: DEFAULT_SIGUNGU_NAME,
  regionCode: DEFAULT_REGION_CODE,
  sigunguName: DEFAULT_SIGUNGU_NAME,
  setLocation: (data) => set(data),
}));
