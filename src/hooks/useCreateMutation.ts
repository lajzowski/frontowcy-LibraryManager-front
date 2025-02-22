import { useMutation } from '@tanstack/react-query';
import { myConfig } from '../../config.ts';
import { useUserLoginStore } from './useUserLoginStore.ts';

export const useCreateMutation = <
  TResponse,
  TCreate extends object, // Dane do tworzenia (bez id)
  TUpdate extends TCreate & { id: string }, // Dane do edycji (z id)
>(
  queryKey: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST'
) => {
  return useMutation<TResponse, unknown, TCreate | TUpdate>({
    mutationFn: async (data) => {
      const url = `${myConfig.api}${
        'id' in data ? `${queryKey}/${data.id}` : `${queryKey}`
      }`;

      const accessKey = useUserLoginStore.getState().accessKey;

      const response = await fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          ...(accessKey ? { Authorization: `Bearer ${accessKey}` } : {}),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json() as Promise<TResponse>;
    },
  });
};
