import PrimaryButton from '@/shared/ui/buttons/PrimaryButton';

interface ConfirmStepProps {
  onConfirm: () => void;
}

export default function ConfirmStep({ onConfirm }: ConfirmStepProps) {
  return (
    <div className='flex flex-1 flex-col'>
      <div className='flex flex-col gap-4'>
        <h2 className='text-heading3 leading-[1.3] font-medium tracking-tight text-black'>
          앞으로 더 좋은 서비스를
          <br />
          제공할 예정이에요
        </h2>
        <p className='text-caption1 leading-[1.3] tracking-tighter text-gray-600'>
          작업러들을 위한 작업 공간이 필요할 때 실패 없는 선택을 도울 수 있도록
          <br />
          다양한 기능들을 선보일 예정이에요
        </p>
      </div>

      <div className='mt-auto'>
        <PrimaryButton onClick={onConfirm}>탈퇴하기</PrimaryButton>
      </div>
    </div>
  );
}
