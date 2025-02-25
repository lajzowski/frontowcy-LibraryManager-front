import { useUserLoginStore } from './useUserLoginStore.ts';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';

export const useLogout = () => {
  const navigate = useNavigate();
  const { clear } = useUserLoginStore();
  const queryClient = useQueryClient();

  return () => {
    clear();
    queryClient.clear();
    navigate('/logout');
  };
};
