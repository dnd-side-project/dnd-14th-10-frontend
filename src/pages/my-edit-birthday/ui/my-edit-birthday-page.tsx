import { useNavigate } from 'react-router-dom';

import { mockUserDetailData } from '@/features/my/model/mock-data';
import BirthdayStep from '@/features/onboarding/ui/BirthdayStep';

export default function MyEditBirthdayPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleSave = (birthday: string) => {
    // TODO: API 호출로 생년월일 업데이트
    console.log('생년월일 업데이트:', birthday);
    navigate('/my/edit');
  };

  return (
    <BirthdayStep
      onNext={handleSave}
      onBack={handleBack}
      initialValue={mockUserDetailData.birthday}
      buttonText='수정하기'
    />
  );
}
