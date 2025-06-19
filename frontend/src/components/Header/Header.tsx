import { Avatar, Button } from '@admiral-ds/react-ui';
import Logo from '@assets/img/logo.svg';
import LogoLarge from '@assets/img/logo-l.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import sidebar from '@assets/icons/layout-text-sidebar.svg';
import Sidebar from '@components/Sidebar';
import { useMediaQuery } from 'react-responsive';
import { isAuth } from '../Auth';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slices/userSlice';

const Header = () => {
  const [opened, setOpened] = useState(false);
  const isMobileVersion = useMediaQuery({ query: '(min-width: 640px)' });

  const userLocal = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const user = isAuth();

  if (userLocal.login !== user?.login && user) {
    dispatch(
      setUser({
        login: user?.login,
        role: user?.role,
      })
    );
  }

  return (
    <header className="header w-full border-b bg-background sticky">
      <div className="container max-w-screen-2xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link className="h-8 flex" to={'/'}>
          {isMobileVersion ? (
            <img src={LogoLarge} alt="Logo" />
          ) : (
            <img src={Logo} alt="Logo" />
          )}
        </Link>
        <Sidebar setFunction={setOpened} isVisible={opened} />
        <section className="flex sm:gap-8 gap-2 items-center">
          {user ? (
            <>
              <Avatar dimension="s" userName={user.login} />
              <Button
                onClick={() => setOpened(true)}
                dimension="m"
                appearance="ghost"
                className="h-8"
              >
                <img src={sidebar} alt="sidebar" />
              </Button>
            </>
          ) : (
            <Link to="/auth/login" className="text-blue-500">
              Войти
            </Link>
          )}
        </section>
      </div>
    </header>
  );
};

export default Header;
