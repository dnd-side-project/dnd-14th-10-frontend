import { useParams } from 'react-router-dom';

function SpaceDetailPage() {
  const { id } = useParams<{ id: string }>();
  return <div>Space Detail Page for ID: {id}</div>;
}

export default SpaceDetailPage;
