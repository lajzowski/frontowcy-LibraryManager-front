import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useUserLoginStore } from './useUserLoginStore';
import { myConfig } from '../../config.ts';

export const useGetQuery = <T>(
  queryKey: string,
  relation?: 'categories' | 'equipments' | 'orders',
  sortBy?: string,
  options: { enabled?: boolean } = {} // Dodajemy opcję `enabled`
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

      if (!data.ok) throw new Error(String(data.status));

      return data.json();
    },
    ...options, // Nadpisujemy opcje, w tym np. `enabled`
  });
};
