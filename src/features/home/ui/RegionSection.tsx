import { useState } from 'react';

import { useSearchStore } from '@/features/home/model/search-store';
import { KOREAN_CITIES, KOREAN_DISTRICTS } from '@/features/onboarding/model/onboarding.types';

import RegionPicker from './RegionPicker';

interface RegionSectionProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export default function RegionSection({ isExpanded, onToggle }: RegionSectionProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>('서울');
  const { selectedDistricts, toggleDistrict, selectAllDistricts, searchTerm, setSearchTerm } = useSearchStore();

  const regionSummary = Object.entries(selectedDistricts)
    .filter(([, districts]) => districts.length > 0)
    .map(([city, districts]) => {
      const allDistricts = KOREAN_DISTRICTS[city] || [];
      if (districts.length === allDistricts.length) {
        return `${city} 전체`;
      }
      return `${city} > ${districts.join(', ')}`;
    })
    .join(' / ');

  return (
    <RegionPicker
      cities={KOREAN_CITIES}
      districts={KOREAN_DISTRICTS}
      selectedCity={selectedCity}
      selectedDistricts={selectedDistricts}
      regionSummary={regionSummary}
      isExpanded={isExpanded}
      searchTerm={searchTerm}
      onToggle={onToggle}
      onCityChange={setSelectedCity}
      onDistrictToggle={toggleDistrict}
      onSelectAllDistricts={(city) => selectAllDistricts(city, KOREAN_DISTRICTS[city] || [])}
      onSearchTermChange={setSearchTerm}
    />
  );
}