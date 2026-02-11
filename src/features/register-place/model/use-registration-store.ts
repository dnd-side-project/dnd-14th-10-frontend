import { create } from 'zustand';

export type PlaceType = 'cafe' | 'public';

export interface LocationData {
  address: string;
  roadAddress?: string;
  latitude: number;
  longitude: number;
  placeName?: string;
}

export interface RegistrationFormData {
  // Step 1: 유형 선택
  placeType: PlaceType | null;

  // Step 2: 위치 검색
  location: LocationData | null;

  // Step 3: 상세 정보
  name: string;
  description: string;
  tags: string[];
  images: File[];
}

interface RegistrationStore {
  formData: RegistrationFormData;

  // Actions
  setPlaceType: (type: PlaceType) => void;
  setLocation: (location: LocationData) => void;
  setDetailInfo: (info: Pick<RegistrationFormData, 'name' | 'description' | 'tags' | 'images'>) => void;
  reset: () => void;
}

const initialFormData: RegistrationFormData = {
  placeType: null,
  location: null,
  name: '',
  description: '',
  tags: [],
  images: [],
};

export const useRegistrationStore = create<RegistrationStore>((set) => ({
  formData: initialFormData,

  setPlaceType: (type) =>
    set((state) => ({
      formData: { ...state.formData, placeType: type },
    })),

  setLocation: (location) =>
    set((state) => ({
      formData: { ...state.formData, location },
    })),

  setDetailInfo: (info) =>
    set((state) => ({
      formData: { ...state.formData, ...info },
    })),

  reset: () => set({ formData: initialFormData }),
}));
