import { create } from 'zustand';

import type {
  CrowdStatus,
  Mood,
  OutletScore,
  PlaceCategory,
  PlaceImageRequest,
  SpaceSize,
} from './register-place.types';

export interface LocationData {
  address: string;
  roadAddress?: string;
  latitude: number;
  longitude: number;
  placeName?: string;
  regionCode?: number;
}

export interface DetailFormData {
  name: string;
  outletScore: OutletScore | null;
  spaceSize: SpaceSize | null;
  crowdStatus: CrowdStatus | null;
  mood: Mood | null;
  floorInfo?: number;
  openTime?: string;
  closeTime?: string;
  restroomInfo?: string;
  tagIds?: number[];
  images: PlaceImageRequest[];
}

export interface RegistrationFormData {
  // Step 1: 유형 선택
  category: PlaceCategory | null;

  // Step 2: 위치 검색
  location: LocationData | null;

  // Step 3: 상세 정보
  detail: DetailFormData;
}

export interface RegistrationCompleteData {
  thumbnail: string | null;
}

interface RegistrationStore {
  formData: RegistrationFormData;
  completeData: RegistrationCompleteData;

  // Actions
  setCategory: (category: PlaceCategory) => void;
  setLocation: (location: LocationData) => void;
  setDetail: (detail: Partial<DetailFormData>) => void;
  setThumbnail: (thumbnail: RegistrationCompleteData['thumbnail']) => void;
  reset: () => void;
}

const initialDetailData: DetailFormData = {
  name: '',
  outletScore: null,
  spaceSize: null,
  crowdStatus: null,
  mood: null,
  images: [],
};

const initialFormData: RegistrationFormData = {
  category: null,
  location: null,
  detail: initialDetailData,
};

export const useRegistrationStore = create<RegistrationStore>((set) => ({
  formData: initialFormData,
  completeData: {
    thumbnail: null,
  },

  setCategory: (category) =>
    set((state) => ({
      formData: { ...state.formData, category },
    })),

  setLocation: (location) =>
    set((state) => ({
      formData: { ...state.formData, location },
    })),

  setDetail: (detail) =>
    set((state) => ({
      formData: {
        ...state.formData,
        detail: { ...state.formData.detail, ...detail },
      },
    })),

  setThumbnail: (thumbnail) =>
    set((state) => ({
      completeData: { ...state.completeData, thumbnail },
    })),

  reset: () => set({ formData: initialFormData }),
}));

// PlaceType alias for backward compatibility
export type PlaceType = 'cafe' | 'public';
