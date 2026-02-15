import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import ConfirmStep from '@/features/withdrawal/ui/ConfirmStep';
import OtherReasonStep from '@/features/withdrawal/ui/OtherReasonStep';
import ReasonSelectStep, { type WithdrawalReason } from '@/features/withdrawal/ui/ReasonSelectStep';
import WithdrawalHeader from '@/features/withdrawal/ui/WithdrawalHeader';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';

type WithdrawalStep = 'reason-select' | 'confirm' | 'other-reason';

export default function WithdrawalPage() {
  const [step, setStep] = useState<WithdrawalStep>('reason-select');
  const [selectedReason, setSelectedReason] = useState<WithdrawalReason | null>(null);

  const navigate = useNavigate();

  const handleBack = () => {
    if (step === 'reason-select') {
      navigate(-1);
    } else {
      setStep('reason-select');
    }
  };

  const handleSelectReason = (reason: WithdrawalReason) => {
    setSelectedReason(reason);
    if (reason === 'other') {
      setStep('other-reason');
    } else {
      setStep('confirm');
    }
  };

  const handleConfirm = () => {
    // TODO: API 호출로 회원탈퇴 처리
    console.log('회원탈퇴 처리:', selectedReason);
    navigate('/login');
  };

  const handleOtherReasonConfirm = (reason: string) => {
    // TODO: API 호출로 회원탈퇴 처리 (기타 사유 포함)
    console.log('회원탈퇴 처리 (기타 사유):', reason);
    navigate('/login');
  };

  return (
    <div className='flex min-h-screen flex-col bg-white pt-6 pb-10'>
      <NavigationBar onBack={handleBack} />

      <div className='flex flex-1 flex-col gap-12 px-5 pt-6'>
        <WithdrawalHeader />

        {step === 'reason-select' && <ReasonSelectStep onSelectReason={handleSelectReason} />}

        {step === 'confirm' && <ConfirmStep onConfirm={handleConfirm} />}

        {step === 'other-reason' && <OtherReasonStep onConfirm={handleOtherReasonConfirm} />}
      </div>
    </div>
  );
}
