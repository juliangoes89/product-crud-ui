import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import CreateProductPage from './CreateProductPage';
import { createProduct } from '../api/products';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../api/products', () => ({
  createProduct: vi.fn(),
}));

vi.mock('../components/ProductForm', () => ({
  default: ({ onSubmit }: { onSubmit: (product: { name: string; description: string; price: number }) => Promise<void> }) => (
    <div>
      <button onClick={() => onSubmit({ name: 'Phone', description: 'Smartphone', price: 899 })}>Mock Submit</button>
    </div>
  ),
}));

describe('CreateProductPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates a product and navigates to home after 2000 milliseconds', async () => {
    const user = userEvent.setup();
    vi.mocked(createProduct).mockResolvedValueOnce({ id: 1, name: 'Phone', description: 'Smartphone', price: 899, stock: 100 });

    render(<CreateProductPage />);

    await user.click(screen.getByRole('button', { name: 'Mock Submit' }));

    expect(createProduct).toHaveBeenCalledWith({ name: 'Phone', description: 'Smartphone', price: 899 });
    expect(mockNavigate).not.toHaveBeenCalled();
    setTimeout(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    }, 2100);
  });

  it('shows an error when create fails', async () => {
    const user = userEvent.setup();
    vi.mocked(createProduct).mockRejectedValueOnce(new Error('create failed'));

    render(<CreateProductPage />);

    await user.click(screen.getByRole('button', { name: 'Mock Submit' }));

    expect(await screen.findByText('Failed to create product. Please try again.')).toBeTruthy();
  });

  it('navigates home when cancel is clicked', async () => {
    const user = userEvent.setup();

    render(<CreateProductPage />);

    await user.click(screen.getByRole('button', { name: /cancel/i }));

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
