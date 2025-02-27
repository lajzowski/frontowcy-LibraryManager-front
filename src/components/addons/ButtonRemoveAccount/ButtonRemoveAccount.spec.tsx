import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ButtonRemoveAccount } from './ButtonRemoveAccount';
import { Mock, vi } from 'vitest';
import { useUserLoginStore } from '../../../hooks/useUserLoginStore';
import { useGetQuery } from '../../../hooks/useGetQuery';
import { useCreateMutation } from '../../../hooks/useCreateMutation';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';

vi.mock('../../../hooks/useUserLoginStore');
vi.mock('../../../hooks/useGetQuery');
vi.mock('../../../hooks/useCreateMutation');

describe('ButtonRemoveAccount', () => {
  const mockNavigate = vi.fn();
  const mockClear = vi.fn();
  const mockMutate = vi.fn();
  const mockQueryClient = { clear: vi.fn() };

  beforeEach(() => {
    (useUserLoginStore as unknown as Mock).mockReturnValue({
      user: { id: '123' },
      clear: mockClear,
    });

    (useGetQuery as Mock).mockReturnValue({
      data: [{ id: '1', returnDate: null }],
      error: null,
      isLoading: false,
    });

    (useCreateMutation as Mock).mockReturnValue({ mutate: mockMutate });
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useQueryClient as Mock).mockReturnValue(mockQueryClient);
  });

  it('renders the button', () => {
    render(<ButtonRemoveAccount />);
    expect(screen.getByText('Rezygnacja z członkostwa')).toBeInTheDocument();
  });

  it('shows loading state when data is fetching', () => {
    (useGetQuery as Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });
    render(<ButtonRemoveAccount />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays 401 when user is not logged in', () => {
    (useUserLoginStore as unknown as Mock).mockReturnValue({ user: null });
    render(<ButtonRemoveAccount />);
    expect(screen.getByText('401')).toBeInTheDocument();
  });

  it('removes account when there are no borrowed books', async () => {
    (useGetQuery as Mock).mockReturnValue({
      data: [{ id: '1', returnDate: '2024-01-01' }],
      error: null,
      isLoading: false,
    });
    render(<ButtonRemoveAccount />);

    fireEvent.click(screen.getByText('Rezygnacja z członkostwa'));
    await waitFor(() => {
      expect(screen.getByText('Usuwanie konta')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Tak, chce usunąć konto'));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        { id: '123' },
        expect.objectContaining({
          onSuccess: expect.any(Function),
        })
      );
    });
  });

  it('clears store and navigates on successful deletion', async () => {
    (useGetQuery as Mock).mockReturnValue({
      data: [{ id: '1', returnDate: '2024-01-01' }],
      error: null,
      isLoading: false,
    });

    mockMutate.mockImplementation((_data, { onSuccess }) => {
      onSuccess();
    });

    render(<ButtonRemoveAccount />);
    fireEvent.click(screen.getByText('Rezygnacja z członkostwa'));
    fireEvent.click(screen.getByText('Tak, chce usunąć konto'));

    await waitFor(() => {
      expect(mockClear).toHaveBeenCalled();
      expect(mockQueryClient.clear).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/account-removed');
    });
  });
});
