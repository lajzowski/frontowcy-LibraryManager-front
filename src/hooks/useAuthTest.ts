import { useEffect } from 'react';
import { useGetQuery } from './useGetQuery.ts';
import { useUserLoginStore } from './useUserLoginStore.ts';
import { useParams } from 'react-router';

export const useAuthTest = () => {
  const { accessKey, clear } = useUserLoginStore(); // Dostęp do klucza użytkownika
  const { error, refetch, isError } = useGetQuery(
    'user/auth-test',
    undefined,
    undefined,
    { enabled: false } // Ważne: zapytanie wyłączone automatycznie
  );
  const params = useParams(); // Parametry trasy, aby wykrywać zmiany stron

  useEffect(() => {
    // Nie sprawdzamy, jeśli użytkownik nie jest zalogowany
    if (!accessKey) return;

    const verifyAuthStatus = async () => {
      await refetch(); // Wywołanie refetch w celu sprawdzenia autoryzacji
    };

    verifyAuthStatus();
  }, [params]); // Hook uruchomi się za każdym razem, gdy zmieniają się parametry strony lub accessKey

  useEffect(() => {
    // Logika wylogowania w przypadku błędu `401`
    if (isError && error?.message.includes('401')) {
      console.log('Błąd autoryzacji. Wylogowanie użytkownika.');
      clear(); // Czyszczenie danych o użytkowniku
    }
  }, [isError]); // Hook reaguje na zmiany w błędzie

  return null; // Zwracamy `null`, ponieważ hook nie renderuje niczego
};
