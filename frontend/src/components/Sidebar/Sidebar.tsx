import { Button, Drawer, DrawerTitle } from '@admiral-ds/react-ui';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import isAdmin from '../Auth/isAdmin';

interface SidebarProps {
  isVisible: boolean;
  setFunction: (state: boolean) => void;
}

const Sidebar = ({ isVisible, setFunction }: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('user');
    navigate('/');
    setFunction(false);
  };

  return (
    <Drawer
      isOpen={isVisible}
      onClose={() => setFunction(false)}
      aria-labelledby="drawer-title"
    >
      <DrawerTitle id="drawer-title">Меню</DrawerTitle>
      <section className="h-full flex flex-col justify-between p-6">
        <ul className="flex flex-col gap-4">
          <li>
            {isAdmin() && (
              <Link className="text-main text-xl hover:text-blue-500" to={'/admin'}>
                Панель администратора
              </Link>
            )}
          </li>
          <li>
            <Link className="text-main text-xl hover:text-blue-500" to={'/poll'}>
              Опрос
            </Link>
          </li>
        </ul>
        <Button onClick={handleLogout} appearance="danger" dimension="s">
          Выйти
        </Button>
      </section>
    </Drawer>
  );
};

export default Sidebar;
