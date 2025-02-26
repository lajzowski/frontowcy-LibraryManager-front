import { Layout, theme } from 'antd';
import { Outlet } from 'react-router';

const { Header, Content, Footer } = Layout;

import './Dashboard.scss';
import { useEffect } from 'react';
import { UserAvatar } from '../../components/addons/UserAvatar/UserAvatar.tsx';
import { useAuthTest } from '../../hooks/useAuthTest.ts';
import { MyMenu } from '../MyMenu/MyMenu.tsx';
export const Dashboard = () => {
  const { token } = theme.useToken();

  useAuthTest();

  useEffect(() => {
    const body = document.body;
    body.style.backgroundColor = token.colorBgContainer; // Zmiana koloru tła
    body.style.color = token.colorText; // Zmiana koloru tekstu
  }, [token]);
  return (
    <Layout
      className={'container'}
      style={{ background: token.colorBgContainer }}
    >
      <Header className={'header'}>
        <div className={'logo'}>Frontowcy Library Manager</div>
        <MyMenu />
        <UserAvatar />
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer style={{ background: token.colorBgContainer }}>
        LibraryManager - 2025
      </Footer>
    </Layout>
  );
};
