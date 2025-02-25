import { useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import { ButtonChangeStyle } from './components/addons/ButtonChangeStyle/ButtonChangeStyle.tsx';
import { Route, Routes } from 'react-router';
import { Dashboard } from './layout/Dashboard/Dashboard.tsx';
import { Registration } from './components/Registration/Registration.tsx';
import { Login } from './components/Login/Login.tsx';
import { Logout } from './components/Logout/Logout.tsx';
import { Books } from './components/Books/Books.tsx';
import { BookOne } from './components/Books/BookOne.tsx';
import { RentsHistory } from './components/RentsHistory/RentsHistory.tsx';
import { Profile } from './components/Profile/Profile.tsx';
import { AccountRemoved } from './components/AccountRemoved/AccountRemoved.tsx';
import { AdminRents } from './components/adminComponents/AdminRents/AdminRents.tsx';

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

          <Route path={'books'} element={<Books />} />
          <Route path={'books/:slug'} element={<BookOne />} />

          <Route path={'rents'} element={<RentsHistory />} />
          <Route path={'profile'} element={<Profile />} />
          <Route path={'account-removed'} element={<AccountRemoved />} />

          <Route path={'admin/rents'} element={<AdminRents />} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
};
