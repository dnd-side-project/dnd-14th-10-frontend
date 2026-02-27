import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useWithdrawMutation } from '@/entities/user/model/use-user-mutations';
import ConfirmStep from '@/features/withdrawal/ui/ConfirmStep';
import OtherReasonStep from '@/features/withdrawal/ui/OtherReasonStep';
import ReasonSelectStep from '@/features/withdrawal/ui/ReasonSelectStep';
import WithdrawalHeader from '@/features/withdrawal/ui/WithdrawalHeader';
import { useAuthStore } from '@/shared/store/use-auth-store';
import type { WithdrawReason } from '@/shared/types/user';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';

type WithdrawalStep = 'reason-select' | 'confirm' | 'other-reason';

export default function WithdrawalPage() {
  const [step, setStep] = useState<WithdrawalStep>('reason-select');
  const [selectedReason, setSelectedReason] = useState<WithdrawReason | null>(null);

  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setLoggingOut = useAuthStore((state) => state.setLoggingOut);
  const queryClient = useQueryClient();
  const withdrawMutation = useWithdrawMutation();

  const handleBack = () => {
    if (step === 'reason-select') {
      navigate(-1);
    } else {
      setStep('reason-select');
    }
  };

  const handleSelectReason = (reason: WithdrawReason) => {
    setSelectedReason(reason);
    if (reason === 'OTHER') {
      setStep('other-reason');
    } else {
      setStep('confirm');
    }
  };

  const handleConfirm = async () => {
    if (!selectedReason) return;

    setLoggingOut(true);
    try {
      await withdrawMutation.mutateAsync({ reason: selectedReason });
      clearAuth();
      queryClient.clear();
      navigate('/login');
    } catch (error) {
      console.error('회원탈퇴 실패:', error);
      setLoggingOut(false);
    }
  };

  const handleOtherReasonConfirm = async (detail: string) => {
    setLoggingOut(true);
    try {
      await withdrawMutation.mutateAsync({ reason: 'OTHER', detail });
      clearAuth();
      queryClient.clear();
      navigate('/login');
    } catch (error) {
      console.error('회원탈퇴 실패:', error);
      setLoggingOut(false);
    }
  };

  return (
    <div className='flex min-h-screen flex-col bg-white pb-3'>
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
