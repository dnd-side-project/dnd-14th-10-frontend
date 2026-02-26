import { useNavigate } from 'react-router-dom';

import {
  useUpdateBirthMutation,
  useUpdateGenderMutation,
} from '@/entities/user/model/use-user-mutations';
import { useUserQuery } from '@/entities/user/model/use-user-query';
import type { Gender } from '@/features/onboarding/model/onboarding.types';
import BirthdayStep from '@/features/onboarding/ui/BirthdayStep';

export default function MyEditBirthdayPage() {
  const navigate = useNavigate();
  const { data: user } = useUserQuery();
  const updateBirthMutation = useUpdateBirthMutation();
  const updateGenderMutation = useUpdateGenderMutation();

  const handleSave = async (birthday: string, gender: Gender) => {
    try {
      await Promise.all([
        updateBirthMutation.mutateAsync(birthday),
        updateGenderMutation.mutateAsync(gender),
      ]);
      navigate('/my/edit');
    } catch (error) {
      console.error('생년월일/성별 업데이트 실패:', error);
    }
  };

  return (
    <BirthdayStep
      onNext={handleSave}
      onBack={() => navigate('/my/edit')}
      initialValue={user?.birth || ''}
      initialGender={user?.gender}
      buttonText='수정하기'
    />
  );
}
