#Projekt końcowy Frontowcy - LibraryManger (FRONT)

# LibraryManager (FRONT)

LibraryManager to aplikacja do zarządzania biblioteką. Projekt został stworzony zgodnie ze specyfikacją.



## Funkcje

- Zarządzanie książkami: dodawanie, edycja i usuwanie książek z kolekcji.
- Wyszukiwanie: szybkie znajdowanie książek na podstawie tytułu.
- Intuicyjny interfejs oparty na komponentach Ant Design.
- Zarządzanie stanem za pomocą Zustand.
- Obsługa asynchronicznych danych dzięki React Query.

## Stos technologiczny

- **Framework:** React 19.0.0
- **Język:** TypeScript 5.7.2
- **Stylowanie:** Ant Design (v5.24.1)
- **Zarządzanie stanem:** Zustand (v5.0.3)
- **Routing:** React Router 7.1.5
- **Narzędzie budujące:** Vite (v6.1.0)
- **Frameworki testowe:** Playwright, Testing Library, Vitest

## Wymagania

Przed uruchomieniem lub zbudowaniem projektu upewnij się, że posiadasz zainstalowane:

- Node.js (wersja 18 lub nowsza),
- npm (Node Package Manager).

Do działania wymagany jest również backend, który jest osobnym repozytorium.

## Instalacja

1. Sklonuj repozytorium:

   ```bash
   git clone https://github.com/your-username/LibraryManager-Front.git
   ```

2. Przejdź do katalogu projektu:

   ```bash
   cd LibraryManager-Front
   ```

3. Zainstaluj zależności:

   ```bash
   npm install
   ```

## Rozwój

Aby uruchomić aplikację w trybie deweloperskim, użyj:

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem `http://localhost:5173`.

## Budowanie projektu

Aby stworzyć wersję produkcyjną, uruchom:

```bash
npm run build
```

Optymalna wersja aplikacji zostanie zapisana w katalogu `dist`.

## Testowanie

Projekt zawiera automatyczne testy komponentów i funkcjonalności. Aby uruchomić testy, wykonaj:

```bash
npm test
```

Lub aby wygenerować raport pokrycia testami:

```bash
npm run coverage
```

## Lintowanie i formatowanie

Aby przeprowadzić lintowanie kodu i naprawić problemy ze stylem, użyj:

```bash
npm run lint
```

Formatowanie kodu za pomocą Prettiera możesz uruchomić poleceniem:

```bash
npm run format
```


## Licencja

Ten projekt jest licencjonowany na zasadach licencji **MIT**. Szczegóły znajdziesz w pliku [LICENSE](./LICENSE).

## Podziękowania

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Ant Design](https://ant.design/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Testing Library](https://testing-library.com/)
