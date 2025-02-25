import { Content } from '../../layout/Content/Content.tsx';
import { Descriptions, DescriptionsProps } from 'antd';
import { useUserLoginStore } from '../../hooks/useUserLoginStore.ts';
import './Profile.scss';
import { ButtonRemoveAccount } from '../addons/ButtonRemoveAccount/ButtonRemoveAccount.tsx';

export const Profile = () => {
  const { user } = useUserLoginStore();

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Imię',
      children: <p>{user?.firstname}</p>,
    },
    {
      key: '2',
      label: 'Nazwisko',
      children: <p>{user?.lastname}</p>,
    },
    {
      key: '3',
      label: 'E-mail',
      children: <p>{user?.email}</p>,
    },
    {
      key: '4',
      label: 'Numer Karty',
      children: <p>{user?.cardNumber}</p>,
    },
    {
      key: '5',
      label: 'Rola',
      children: <p>{user?.rule.includes('a') ? 'Administrator' : 'Klient'}</p>,
    },
    {
      key: '5',
      label: 'Rezygnacja',
      children: (
        <div className={'remove-row'}>
          <ButtonRemoveAccount />
        </div>
      ),
    },
  ];

  return (
    <Content
      title={'Profil Użytkownika'}
      subtitle={'Dane zalogowanego użytkownika'}
    >
      <div className={'profile-container'}>
        <Descriptions
          column={2}
          layout={'horizontal'}
          title='Informacje o użytkowniku'
          items={items}
          styles={{
            label: {
              alignContent: 'center',
            },
            content: {
              width: '350px',
              height: '100px',
              alignContent: 'center',
              letterSpacing: '2px',
            },
            header: {
              width: '500px',
              alignContent: 'center',
            },
            root: {
              marginTop: '15px',
            },
          }}
          bordered
        />
      </div>
    </Content>
  );
};
