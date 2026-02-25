import { create } from 'zustand';

interface LocationState {
  lat: number;
  lng: number;
  address: string;
  setLocation: (lat: number, lng: number, address: string) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  lat: 37.4979,
  lng: 127.0276,
  address: '서울특별시 강남구',
  setLocation: (lat, lng, address) => set({ lat, lng, address }),
}));
