import { useState } from 'react';

import PrimaryButton from '@/shared/ui/buttons/PrimaryButton';

interface OtherReasonStepProps {
  onConfirm: (reason: string) => void;
}

const MAX_LENGTH = 1000;

export default function OtherReasonStep({ onConfirm }: OtherReasonStepProps) {
  const [reason, setReason] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_LENGTH) {
      setReason(value);
    }
  };

  const handleConfirm = () => {
    onConfirm(reason);
  };

  return (
    <div className='flex flex-1 flex-col'>
      <div className='flex flex-col gap-3'>
        <h2 className='text-heading3 leading-[1.3] font-medium tracking-tight text-black'>
          앞으로 더 좋은 서비스를
          <br />
          제공할 예정이에요
        </h2>
        <div className='relative'>
          <textarea
            value={reason}
            onChange={handleChange}
            placeholder='자유롭게 입력해 주세요'
            className='text-body1 h-[200px] w-full resize-none rounded-xl bg-gray-50 p-4 font-medium tracking-tight text-black placeholder:text-gray-500 focus:outline-none'
          />
          <span className='text-caption3 absolute right-4 bottom-4 tracking-tight text-gray-700'>
            {reason.length} / {MAX_LENGTH}
          </span>
        </div>
      </div>

      <div className='mt-auto'>
        <PrimaryButton onClick={handleConfirm}>탈퇴하기</PrimaryButton>
      </div>
    </div>
  );
}
