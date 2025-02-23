import { create } from 'zustand/react';
import { persist } from 'zustand/middleware';
import { UserInterface } from '../types/user.interface.ts';

interface Store {
  accessKey: string | null;
  setAccessKey: (accessKey: string) => void;
  user: UserInterface | null;
  setUser: (user: UserInterface) => void;
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
