import { useNavigate } from 'react-router-dom';

import { mockUserDetailData } from '@/features/my/model/mock-data';
import AddressStep from '@/features/onboarding/ui/AddressStep';

export default function MyEditAddressPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleSave = (address: string) => {
    // TODO: API 호출로 거주지 업데이트
    console.log('거주지 업데이트:', address);
    navigate('/my/edit');
  };

  return (
    <AddressStep
      onNext={handleSave}
      onBack={handleBack}
      initialValue={mockUserDetailData.residence}
      buttonText='수정하기'
    />
  );
}
