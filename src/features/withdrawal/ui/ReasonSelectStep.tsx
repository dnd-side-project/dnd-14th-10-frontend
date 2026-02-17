import ChevronRight from '@/shared/ui/icons/ChevronRight.svg';

export type WithdrawalReason = 'not-using' | 'privacy-concern' | 'other';

interface ReasonSelectStepProps {
  onSelectReason: (reason: WithdrawalReason) => void;
}

const WITHDRAWAL_REASONS: { id: WithdrawalReason; label: string }[] = [
  { id: 'not-using', label: '서비스를 자주 이용하지 않아요' },
  { id: 'privacy-concern', label: '개인정보 보호가 걱정돼요' },
  { id: 'other', label: '기타' },
];

export default function ReasonSelectStep({ onSelectReason }: ReasonSelectStepProps) {
  return (
    <div className='flex flex-col gap-10'>
      <h2 className='text-heading3 font-medium tracking-tight text-black'>
        탈퇴 사유를 선택해 주세요
      </h2>
      <div className='flex flex-col'>
        {WITHDRAWAL_REASONS.map((reason) => (
          <button
            key={reason.id}
            type='button'
            onClick={() => onSelectReason(reason.id)}
            className='border-gray-150 flex h-12 items-center justify-between border-b'
          >
            <span className='text-body1 tracking-tight text-black'>{reason.label}</span>
            <img src={ChevronRight} alt='' className='size-6 text-gray-400' />
          </button>
        ))}
      </div>
    </div>
  );
}
