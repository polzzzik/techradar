import { TokenUser } from '@/types/TokenUser.interface';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const isAdmin = (): TokenUser | null => {
  const token = Cookies.get('user');

  if (!token) {
    return null;
  }

  try {
    const user: TokenUser = jwtDecode<TokenUser>(token);
    const isAdmin = user.role.includes('ADMIN');
    if (isAdmin) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Ошибка декодирования токена:', error);
    return null;
  }
};

export default isAdmin;
