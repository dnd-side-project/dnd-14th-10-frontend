import { useNavigate } from 'react-router-dom';

import { mockUserDetailData } from '@/features/my/model/mock-data';
import NicknameStep from '@/features/onboarding/ui/NicknameStep';

export default function MyEditNicknamePage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleSave = (nickname: string) => {
    // TODO: API 호출로 이름 업데이트
    console.log('이름 업데이트:', nickname);
    navigate('/my/edit');
  };

  return (
    <NicknameStep
      onComplete={handleSave}
      onBack={handleBack}
      initialValue={mockUserDetailData.name}
      buttonText='수정하기'
    />
  );
}
