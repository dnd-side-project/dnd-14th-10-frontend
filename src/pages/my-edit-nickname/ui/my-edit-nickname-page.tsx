import { useNavigate } from 'react-router-dom';

import { useUpdateNicknameMutation } from '@/entities/user/model/use-user-mutations';
import { useUserQuery } from '@/entities/user/model/use-user-query';
import NicknameStep from '@/features/onboarding/ui/NicknameStep';

export default function MyEditNicknamePage() {
  const navigate = useNavigate();
  const { data: user } = useUserQuery();
  const updateNicknameMutation = useUpdateNicknameMutation();

  const handleSave = async (nickname: string) => {
    try {
      await updateNicknameMutation.mutateAsync(nickname);
      navigate('/my/edit');
    } catch (error) {
      console.error('닉네임 업데이트 실패:', error);
    }
  };

  return (
    <NicknameStep
      onComplete={handleSave}
      onBack={() => navigate('/my/edit')}
      initialValue={user?.nickname || ''}
      buttonText='수정하기'
    />
  );
}
