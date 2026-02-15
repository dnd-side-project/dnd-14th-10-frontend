import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';

interface PlaceManageBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function PlaceManageBottomSheet({
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: PlaceManageBottomSheetProps) {
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className='rounded-t-[30px]' hideHandle>
        <DrawerTitle className='sr-only'>장소 관리</DrawerTitle>
        <div className='mx-auto mt-[10px] h-[5px] w-[43px] rounded-[30px] bg-[#d2d4d5]' />
        <div className='mt-[15px] flex flex-col px-5 pb-5'>
          <button
            type='button'
            onClick={onEdit}
            className='border-gray-150 flex items-center justify-center border-b px-2 py-5'
          >
            <span className='text-body2 leading-[1.3] font-medium tracking-tight text-black'>
              정보 수정
            </span>
          </button>
          <button
            type='button'
            onClick={onDelete}
            className='flex items-center justify-center px-2 py-5'
          >
            <span className='text-body2 leading-[1.3] font-medium tracking-tight text-[#FE4E15]'>
              삭제
            </span>
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
