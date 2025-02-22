import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { myConfig } from '../../config.ts';
import { useUserLoginStore } from './useUserLoginStore.ts';

export const useGetQuery = <T>(
  queryKey: string,
  relation?: 'categories' | 'equipments' | 'orders',
  sortBy?: string
): UseQueryResult<T> => {
  const { accessKey } = useUserLoginStore.getState();
  return useQuery<T>({
    queryKey: queryKey.includes('/') ? queryKey.split('/') : [queryKey],
    queryFn: async () => {
      const data = await fetch(
        `${myConfig.api}${queryKey}${relation ? `${queryKey.slice(-1) === '&' ? '' : '?'}_embed=${relation}` : ''}${sortBy ? `${relation ? '&' : queryKey.includes('?') ? '&' : '?'}_sort=${sortBy}` : ''}`,
        {
          headers: {
            'Content-Type': 'application/json',
            ...(accessKey ? { Authorization: `Bearer ${accessKey}` } : {}),
          },
        }
      );
      return data.json();
    },
  });
};
