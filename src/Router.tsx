import { useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import { ButtonChangeStyle } from './components/ButtonChangeStyle/ButtonChangeStyle.tsx';
import { Route, Routes } from 'react-router';
import { Dashboard } from './layout/Dashboard/Dashboard.tsx';
import { Registration } from './components/Registration/Registration.tsx';
import { Login } from './components/Login/Login.tsx';
import { Logout } from './components/Logout/Logout.tsx';

const systemPrefersDark = window.matchMedia(
  '(prefers-color-scheme: dark)'
).matches;

export const Router = () => {
  const [isDarkMode, setIsDarkMode] = useState(systemPrefersDark);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm, // Wybór motywu
      }}
    >
      <ButtonChangeStyle
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      <Routes>
        <Route path='/' element={<Dashboard />}>
          <Route path={'register'} element={<Registration />} />
          <Route path={'login'} element={<Login />} />
          <Route path={'logout'} element={<Logout />} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
};
