import { useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import { ButtonChangeStyle } from './components/ButtonChangeStyle/ButtonChangeStyle.tsx';
import { Route, Routes } from 'react-router';
import { Dashboard } from './layout/Dashboard/Dashboard.tsx';

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
        <Route path='/' element={<Dashboard />}></Route>
      </Routes>
    </ConfigProvider>
  );
};
