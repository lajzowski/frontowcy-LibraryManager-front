import { create } from 'zustand/react';
import { persist } from 'zustand/middleware';
import { UserI } from '../types/user.interface.ts';

interface Store {
  accessKey: string | null;
  setAccessKey: (accessKey: string) => void;
  user: UserI | null;
  setUser: (user: UserI) => void;
  clear: () => void;
}

export const useUserLoginStore = create<Store>()(
  persist(
    (set) => ({
      accessKey: null,
      setAccessKey: (a) => {
        set(() => ({
          accessKey: a,
        }));
      },
      user: null,
      setUser: (u) => {
        set(() => ({
          user: u,
        }));
      },
      clear: () => {
        set(() => ({
          accessKey: null,
          user: null,
        }));
      },
    }),
    {
      name: 'user-access-key', // Klucz w localStorage
    }
  )
);
