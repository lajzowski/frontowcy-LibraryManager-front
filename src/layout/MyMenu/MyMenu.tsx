import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import { useUserLoginStore } from '../../hooks/useUserLoginStore.ts';

export const MyMenu = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { user } = useUserLoginStore();

  return (
    <Menu
      mode='horizontal'
      selectedKeys={[
        location.pathname.split('/')[1] === 'admin'
          ? location.pathname.split('/')[2]
          : location.pathname.split('/')[1],
      ]}
      defaultSelectedKeys={[location.pathname.split('/')[1]]}
      className={'menu'}
    >
      <Menu.Item key='books' onClick={() => navigate('/books')}>
        Lista Książek
      </Menu.Item>

      {user && user.rule === 'a9' ? (
        <>
          <Menu.Item key='rents' onClick={() => navigate('/admin/rents')}>
            Lista Wynajmów
          </Menu.Item>

          <Menu.Item key='logs' onClick={() => navigate('/admin/logs')}>
            Logi
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key='home' onClick={() => navigate('/stats')}>
            Statystyki
          </Menu.Item>
          <Menu.Item key='rents' onClick={() => navigate('/rents')}>
            Moje wypożyczenia
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};
