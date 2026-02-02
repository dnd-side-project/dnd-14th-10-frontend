import { useParams } from 'react-router-dom';

function ReviewCreationPage() {
  const { id } = useParams<{ id: string }>();
  return <div>Review Creation Page for ID: {id}</div>;
}

export default ReviewCreationPage;
