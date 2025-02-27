import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import { Login } from './Login';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('../../hooks/useCreateMutation', () => ({
  useCreateMutation: vi.fn(() => ({
    mutate: vi.fn((data, { onSuccess, onError }) => {
      // Mock behavior: call onSuccess or onError based on test requirements
      if (data.shouldSucceed) {
        onSuccess?.({ message: 'Resource created successfully!' });
      } else {
        onError?.(new Error('Error creating resource'));
      }
    }),
  })),
}));

vi.mock('../../layout/Content/Content.tsx', () => ({
  Content: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('Komponent Login', () => {
  it('should display an error when no password is provided', async () => {
    render(<Login />);

    const button = screen.getByTestId('button-submit');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Proszę wpisać hasło.')).toBeInTheDocument();
    });
  });
});
