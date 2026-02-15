import { useNavigate, useParams } from 'react-router-dom';

import { mockAnnouncements } from '@/features/announcement/model/mock-data';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';

export default function AnnouncementDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const announcement = mockAnnouncements.find((item) => item.id === id);

  const handleBack = () => {
    navigate(-1);
  };

  if (!announcement) {
    return (
      <div className='flex min-h-screen flex-col bg-white pt-6 pb-10'>
        <NavigationBar title='공지사항 상세' onBack={handleBack} />
        <div className='flex flex-1 items-center justify-center'>
          <p className='text-body1 text-gray-500'>공지사항을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen flex-col bg-white pt-6 pb-10'>
      <NavigationBar title='공지사항 상세' onBack={handleBack} />

      <div className='flex flex-col pt-6'>
        <div className='border-gray-150 flex flex-col gap-4 border-b px-5 py-5'>
          <p className='text-heading4 leading-[1.3] font-medium tracking-tight text-gray-950'>
            {announcement.title}
          </p>
          <p className='text-body2 leading-[1.3] tracking-tight text-gray-500'>
            {announcement.date}
          </p>
        </div>

        <div className='px-5 py-4'>
          <p className='text-body2 leading-[1.3] tracking-tight text-gray-950'>
            {announcement.content}
          </p>
        </div>
      </div>
    </div>
  );
}
