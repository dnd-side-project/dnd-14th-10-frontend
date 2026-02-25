import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useSearchStore } from '@/features/home/model/search-store';
import { cn } from '@/lib/utils';
import CloseIcon from '@/shared/ui/icons/Close.svg?react';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';

import AtmosphereSection from './AtmosphereSection';
import CategoryTabs from './CategoryTabs';
import RegionSection from './RegionSection';
import SizeSection from './SizeSection';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type ExpandedSection = 'region' | 'atmosphere' | 'size' | null;

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const navigate = useNavigate();
  const { category, setCategory, selectedDistricts, atmospheres, sizes, searchTerm, reset } =
    useSearchStore();
  const [expandedSection, setExpandedSection] = useState<ExpandedSection>('region');

  const handleToggleSection = (section: ExpandedSection) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.append('category', category);

    const districtParams = Object.entries(selectedDistricts)
      .map(([city, districts]) => `${city}:${districts.join(',')}`)
      .join('|');
    if (districtParams) {
      params.append('districts', districtParams);
    }

    if (atmospheres.length > 0) {
      params.append('atmospheres', atmospheres.join(','));
    }

    if (sizes.length > 0) {
      params.append('sizes', sizes.join(','));
    }

    if (searchTerm) {
      params.append('query', searchTerm);
    }

    onClose();
    navigate(`/map/search?${params.toString()}`);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className={cn(
          'h-dvh w-screen max-w-none rounded-none border-none p-0',
          'fixed top-0 left-0 !translate-x-0 !translate-y-0',
          '!animate-none !duration-0',
          'data-[state=open]:!zoom-in-100 data-[state=closed]:!zoom-out-100',
          'data-[state=open]:!slide-in-from-top-0 data-[state=closed]:!slide-out-to-top-0',
          '[&>button]:hidden',
        )}
      >
        <DialogHeader className='sr-only'>
          <DialogTitle>검색 필터 설정</DialogTitle>
          <DialogDescription>지역, 분위기, 크기별로 카페를 검색할 수 있습니다.</DialogDescription>
        </DialogHeader>
        <div className='flex h-full flex-col'>
          <NavigationBar
            left={
              <button type='button' onClick={handleClose}>
                <CloseIcon className='size-6 text-gray-950' />
              </button>
            }
          />

          <div className='flex-1 overflow-y-auto'>
            <CategoryTabs activeCategory={category} onCategoryChange={setCategory} />

            <div className='flex flex-col gap-5 px-5'>
              <RegionSection
                isExpanded={expandedSection === 'region'}
                onToggle={() => handleToggleSection('region')}
              />
              <AtmosphereSection
                isExpanded={expandedSection === 'atmosphere'}
                onToggle={() => handleToggleSection('atmosphere')}
              />
              <SizeSection
                isExpanded={expandedSection === 'size'}
                onToggle={() => handleToggleSection('size')}
              />
            </div>
          </div>

          <div className='px-5 py-3'>
            <button
              type='button'
              onClick={handleSearch}
              className='bg-primary-700 h-[52px] w-full rounded-lg text-[16px] font-bold text-white'
            >
              검색하기
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
