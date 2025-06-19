import DetailTechnology from '@/components/Admin/DetailTechnology';
import isAdmin from '@/components/Auth/isAdmin';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate('/admin');
  }

  if (!isAdmin()) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="mt-10">
      <DetailTechnology technologyId={Number(id) || 0} />
    </div>
  );
};

export default Detail;
