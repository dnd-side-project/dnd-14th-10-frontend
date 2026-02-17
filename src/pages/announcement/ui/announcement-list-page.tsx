import { useNavigate } from 'react-router-dom';

import { mockAnnouncements } from '@/features/announcement/model/mock-data';
import AnnouncementItem from '@/features/announcement/ui/AnnouncementItem';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';

export default function AnnouncementListPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleItemClick = (id: string) => {
    navigate(`/announcement/${id}`);
  };

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <NavigationBar title='공지사항' onBack={handleBack} />

      <div className='flex flex-col px-5 pt-6'>
        {mockAnnouncements.map((announcement) => (
          <AnnouncementItem
            key={announcement.id}
            title={announcement.title}
            summary={announcement.summary}
            date={announcement.date}
            onClick={() => handleItemClick(announcement.id)}
          />
        ))}
      </div>
    </div>
  );
}
