import { isAuth } from '@/components/Auth';
import PollOpen from '@/components/PollOpen';
import { Navigate } from 'react-router-dom';

const Poll = () => {
  if (!isAuth()) {
    return <Navigate to={'/'} />;
  }
  return (
    <div>
      <PollOpen />
    </div>
  );
};

export default Poll;
