import { useUserLoginStore } from './useUserLoginStore.ts';
import { useNavigate } from 'react-router';

export const useLogout = () => {
  const navigate = useNavigate();
  const { clear } = useUserLoginStore();

  return () => {
    clear();
    navigate('/logout');
  };
};
