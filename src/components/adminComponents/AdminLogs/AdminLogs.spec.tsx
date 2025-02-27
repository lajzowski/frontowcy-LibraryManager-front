import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AdminLogs } from './AdminLogs';
import { useGetQuery } from '../../../hooks/useGetQuery';

// Mockujemy hook, aby symulować różne stany danych
vi.mock('../../../hooks/useGetQuery', () => ({
  useGetQuery: vi.fn(),
}));

describe('AdminLogs Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders error state with 401 message', () => {
    (useGetQuery as Mock).mockReturnValue({
      data: null,
      error: { message: '401' },
      isLoading: false,
    });

    render(<AdminLogs />);

    // Sprawdzamy, czy komunikat o błędzie został wyświetlony
    expect(screen.getByText('401')).toBeInTheDocument();
  });
});
