import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import EditProductPage from './EditProductPage';
import { fetchProduct, updateProduct } from '../api/products';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: '7' }),
  };
});

vi.mock('../api/products', () => ({
  fetchProduct: vi.fn(),
  updateProduct: vi.fn(),
}));

vi.mock('../components/ProductForm', () => ({
  default: ({ onSubmit }: { onSubmit: (product: { name: string; description: string; price: number }) => Promise<void> }) => (
    <div>
      <button onClick={() => onSubmit({ name: 'Updated', description: 'Updated desc', price: 55 })}>Mock Update</button>
    </div>
  ),
}));

describe('EditProductPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads product and updates successfully', async () => {
    const user = userEvent.setup();
    vi.mocked(fetchProduct).mockResolvedValueOnce({ id: 7, name: 'Old', description: 'Old desc', price: 20 });
    vi.mocked(updateProduct).mockResolvedValueOnce({ id: 7, name: 'Updated', description: 'Updated desc', price: 55 });

    render(<EditProductPage />);

    expect(await screen.findByText('Edit Product')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Mock Update' }));

    expect(updateProduct).toHaveBeenCalledWith('7', {
      name: 'Updated',
      description: 'Updated desc',
      price: 55,
    });
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('shows fetch error message when product cannot be loaded', async () => {
    vi.mocked(fetchProduct).mockRejectedValueOnce(new Error('fetch failed'));

    render(<EditProductPage />);

    expect(await screen.findByText('Failed to fetch product')).toBeTruthy();
  });

  it('shows update error when update fails', async () => {
    const user = userEvent.setup();
    vi.mocked(fetchProduct).mockResolvedValueOnce({ id: 7, name: 'Old', description: 'Old desc', price: 20 });
    vi.mocked(updateProduct).mockRejectedValueOnce(new Error('update failed'));

    render(<EditProductPage />);

    await screen.findByText('Edit Product');
    await user.click(screen.getByRole('button', { name: 'Mock Update' }));

    await waitFor(() => {
      expect(screen.getByText('Failed to update product')).toBeTruthy();
    });
  });

  it('navigates home when cancel is clicked', async () => {
    const user = userEvent.setup();
    vi.mocked(fetchProduct).mockResolvedValueOnce({ id: 7, name: 'Old', description: 'Old desc', price: 20 });

    render(<EditProductPage />);

    await screen.findByText('Edit Product');
    await user.click(screen.getByRole('button', { name: /cancel/i }));

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
