vi.mock('react-router', () => ({ useNavigate: vi.fn() }));
vi.mock('@tanstack/react-query', () => ({ useQueryClient: vi.fn() }));

import { afterEach, beforeAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Resetowanie testów
afterEach(() => {
  cleanup();
});

beforeAll(() => {
  vi.stubGlobal('getComputedStyle', () => ({
    getPropertyValue: () => '',
  }));
});
// Mockowanie window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false, // Domyślnie brak dopasowania
    media: query,
    onchange: null,
    // Współczesne (prawidłowe) metody eventowe
    addListener: vi.fn(), // Deprecated, ale wymagane przez Ant Design
    removeListener: vi.fn(), // Deprecated, ale wymagane przez Ant Design
    addEventListener: vi.fn(), // Nowsze metody
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
