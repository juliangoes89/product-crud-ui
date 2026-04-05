import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ProductsPage from './ProductsPage';
import { deleteProduct, fetchProducts } from '../api/products';

// Mock api calls
vi.mock('../api/products', () => ({
  fetchProducts: vi.fn(),
  deleteProduct: vi.fn(),
}));

describe('ProductsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads and renders products', async () => {
    //Setup
    vi.mocked(fetchProducts).mockResolvedValueOnce([
      { id: 1, name: 'Laptop', description: 'Business laptop', price: 1500, stock: 100 },
    ]);
    
    //Act
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>,
    );

    //Assert
    expect(screen.getByText(/loading/i)).toBeTruthy();

    expect(await screen.findByText('Products')).toBeTruthy();
    expect(screen.getByText('Laptop')).toBeTruthy();
    expect(screen.getByText('Total: 1')).toBeTruthy();
  });

  it('shows an error message when fetch fails', async () => {
    //Setup
    vi.mocked(fetchProducts).mockRejectedValueOnce(new Error('Network error'));
    
    //Act
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>,
    );
    
    //Assert
    expect(await screen.findByText('Failed to fetch products')).toBeTruthy();
  });

  it('deletes a product and updates the list', async () => {
    //Setup
    const user = userEvent.setup();
    vi.mocked(fetchProducts).mockResolvedValueOnce([
      { id: 2, name: 'Headset', description: 'Noise cancelling', price: 220, stock: 100  },
    ]);
    vi.mocked(deleteProduct).mockResolvedValueOnce(undefined);
    
    //Act
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>,
    );

    //Assert
    expect(await screen.findByText('Headset')).toBeTruthy();
    await user.click(screen.getByRole('button', { name: /delete/i }));

    await waitFor(() => {
      expect(screen.queryByText('Headset')).toBeNull();
    });
    expect(deleteProduct).toHaveBeenCalledWith(2);
  });
});
