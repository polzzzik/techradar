import { isAuth, RegisterForm } from '@/components/Auth';
import { Navigate } from 'react-router-dom';

const Register = (): React.ReactNode => {
  if (isAuth()) {
    return <Navigate to={'/'} />;
  }
  return <RegisterForm />;
};

export default Register;
