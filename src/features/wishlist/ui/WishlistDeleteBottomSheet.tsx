import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';

interface WishlistDeleteBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function WishlistDeleteBottomSheet({
  isOpen,
  onClose,
  onDelete,
}: WishlistDeleteBottomSheetProps) {
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className='rounded-t-[30px]' hideHandle>
        <DrawerTitle className='sr-only'>위시리스트 삭제</DrawerTitle>
        <div className='mx-auto mt-[10px] h-[5px] w-[43px] rounded-[30px] bg-[#d2d4d5]' />
        <div className='mt-[15px] flex flex-col px-5 pb-5'>
          <div className='flex items-center justify-center px-2 py-5'>
            <span className='text-body2 leading-[1.3] font-medium tracking-tight text-black'>
              위시리스트에서 삭제하시겠습니까?
            </span>
          </div>
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
