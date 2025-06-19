import { isAuth, LoginForm } from '@/components/Auth';
import { Navigate } from 'react-router-dom';

const Login = (): React.ReactNode => {
  if (isAuth()) {
    return <Navigate to={'/'} />;
  }

  return <LoginForm />;
};

export default Login;
