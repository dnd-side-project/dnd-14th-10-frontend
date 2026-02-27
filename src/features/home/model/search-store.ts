import { create } from 'zustand';

import type { Category } from '@/features/home/ui/CategoryTabs';

interface SearchState {
  category: Category;
  selectedDistricts: Record<string, string[]>;
  atmospheres: string[];
  sizes: string[];
  searchTerm: string;
  setCategory: (category: Category) => void;
  toggleDistrict: (city: string, district: string) => void;
  selectAllDistricts: (city: string, districts: string[]) => void;
  toggleAtmosphere: (atmosphere: string) => void;
  toggleSize: (size: string) => void;
  setSize: (size: string) => void;
  setSearchTerm: (term: string) => void;
  reset: () => void;
}

const initialState = {
  category: 'cafe' as Category,
  selectedDistricts: {},
  atmospheres: [],
  sizes: [],
  searchTerm: '',
};

export const useSearchStore = create<SearchState>((set) => ({
  ...initialState,

  setCategory: (category) => set({ category }),

  toggleDistrict: (city, district) =>
    set((state) => {
      const current = state.selectedDistricts[city] || [];
      const isExist = current.includes(district);

      const nextDistricts = isExist
        ? current.filter((d) => d !== district)
        : [...current, district];

      const nextSelectedDistricts = { ...state.selectedDistricts };

      if (nextDistricts.length === 0) {
        delete nextSelectedDistricts[city];
      } else {
        nextSelectedDistricts[city] = nextDistricts;
      }

      return { selectedDistricts: nextSelectedDistricts };
    }),

  selectAllDistricts: (city, districts) =>
    set((state) => {
      const current = state.selectedDistricts[city] || [];
      const isAllSelected = current.length === districts.length;

      const nextSelectedDistricts = { ...state.selectedDistricts };

      if (isAllSelected) {
        delete nextSelectedDistricts[city];
      } else {
        nextSelectedDistricts[city] = districts;
      }

      return { selectedDistricts: nextSelectedDistricts };
    }),

  toggleAtmosphere: (atmosphere) =>
    set((state) => ({
      atmospheres: state.atmospheres.includes(atmosphere)
        ? state.atmospheres.filter((a) => a !== atmosphere)
        : [...state.atmospheres, atmosphere],
    })),

  toggleSize: (size) =>
    set((state) => ({
      sizes: state.sizes.includes(size)
        ? state.sizes.filter((s) => s !== size)
        : [...state.sizes, size],
    })),

  setSize: (size) => set((state) => ({ sizes: state.sizes.includes(size) ? [] : [size] })),

  setSearchTerm: (term) => set({ searchTerm: term }),

  reset: () => set(initialState),
}));
