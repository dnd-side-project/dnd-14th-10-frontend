import { useNavigate } from 'react-router-dom';

import { useUpdateRegionMutation } from '@/entities/user/model/use-user-mutations';
import { useUserQuery } from '@/entities/user/model/use-user-query';
import AddressStep from '@/features/onboarding/ui/AddressStep';

export default function MyEditAddressPage() {
  const navigate = useNavigate();
  const { data: user } = useUserQuery();
  const updateRegionMutation = useUpdateRegionMutation();

  const handleSave = async (regionCode: number) => {
    try {
      await updateRegionMutation.mutateAsync(regionCode);
      navigate('/my/edit');
    } catch (error) {
      console.error('거주지 업데이트 실패:', error);
    }
  };

  return (
    <AddressStep
      onNext={handleSave}
      onBack={() => navigate('/my/edit')}
      initialRegionCode={user?.regionCode}
      buttonText='수정하기'
    />
  );
}
