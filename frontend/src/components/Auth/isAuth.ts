import { TokenUser } from '@/types/TokenUser.interface';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const isAuth = (): TokenUser | null => {
  const token = Cookies.get('user');

  if (!token) {
    return null;
  }

  try {
    const user: TokenUser = jwtDecode<TokenUser>(token);
    return user;
  } catch (error) {
    console.error('Ошибка декодирования токена:', error);
    return null;
  }
};

export default isAuth;
