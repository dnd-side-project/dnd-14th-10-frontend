import { useNavigate } from 'react-router-dom';

import { mockBadgeCategories } from '@/features/badge/model/mock-data';
import BadgeCategorySection from '@/features/badge/ui/BadgeCategorySection';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';

export default function BadgePage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <NavigationBar title='배지' onBack={handleBack} />

      <div className='flex flex-col gap-8 px-5 pt-6'>
        {mockBadgeCategories.map((category) => (
          <BadgeCategorySection key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
