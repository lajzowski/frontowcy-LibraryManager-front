import { useUserLoginStore } from '../../../hooks/useUserLoginStore.ts';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './UserAvatar.scss';
import { useLogout } from '../../../hooks/useLogout.ts';
import { useNavigate } from 'react-router';

export const UserAvatar = () => {
  const { user } = useUserLoginStore();

  const logout = useLogout();

  const navigate = useNavigate();

  if (!user)
    return (
      <div className='user-login'>
        <p className={'login-link'} onClick={() => navigate('/login')}>
          Logowanie
        </p>

        <p className={'login-link'} onClick={() => navigate('/register')}>
          Rejestracja
        </p>
      </div>
    );

  return (
    <div className='user-avatar'>
      <div>
        <p className={'name'}>
          {user.firstname} {user.lastname}
        </p>
        <p className={'card'}>{user.cardNumber}</p>
        <p className={'login-link'} onClick={() => navigate('/profile')}>
          Profil
        </p>

        <p className={'login-link'} onClick={logout}>
          Wyloguj
        </p>
      </div>

      <Avatar shape='square' size={96} icon={<UserOutlined />} />
    </div>
  );
};
