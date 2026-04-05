import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ProductTable from './ProductTable';

describe('ProductTable', () => {
  it('renders product rows and triggers edit/delete handlers', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const product = { id: 7, name: 'Monitor', description: '27-inch', price: 299.5, stock:100 };

    render(<ProductTable products={[product]} onEdit={onEdit} onDelete={onDelete} />);

    expect(screen.getByText('Monitor')).toBeTruthy();
    expect(screen.getByText('$299.50')).toBeTruthy();
    expect(screen.getByText('100')).toBeTruthy();


    await user.click(screen.getByRole('button', { name: /edit/i }));
    await user.click(screen.getByRole('button', { name: /delete/i }));

    expect(onEdit).toHaveBeenCalledWith(product);
    expect(onDelete).toHaveBeenCalledWith(7);
  });
});
