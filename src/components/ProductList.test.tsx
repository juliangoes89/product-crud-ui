import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ProductList from './ProductList';
import { Product } from '../types/product';

const productTableSpy = vi.fn();

vi.mock('./ProductTable', () => ({
  default: (props: {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (productId: number) => void;
  }) => {
    productTableSpy(props);
    return <div data-testid="product-table-mock">ProductTable Mock</div>;
  },
}));

describe('ProductList', () => {
  it('renders the list title', () => {
    render(<ProductList products={[]} onEdit={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText('Product List')).toBeTruthy();
    expect(screen.getByTestId('product-table-mock')).toBeTruthy();
  });

  it('passes products and callbacks to ProductTable', () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const products: Product[] = [
      { id: 1, name: 'Laptop', description: 'Business laptop', price: 1200 },
      { id: 2, name: 'Mouse', description: 'Wireless mouse', price: 25 },
    ];

    render(<ProductList products={products} onEdit={onEdit} onDelete={onDelete} />);

    expect(productTableSpy).toHaveBeenCalled();
    const lastCallArgs = productTableSpy.mock.calls[productTableSpy.mock.calls.length - 1];
    expect(lastCallArgs[0]).toMatchObject({
      products,
      onEdit,
      onDelete,
    });
  });
});
