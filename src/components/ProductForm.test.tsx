import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ProductForm from './ProductForm';

describe('ProductForm', () => {
  it('submits product payload in create mode', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(<ProductForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/name/i), 'Keyboard');
    await user.type(screen.getByLabelText(/description/i), 'Mechanical keyboard');
    await user.type(screen.getByLabelText(/price/i), '129.99');

    await user.click(screen.getByRole('button', { name: /create product/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Keyboard',
      description: 'Mechanical keyboard',
      price: 129.99,
    });
  });

  it('shows update button and prefilled values in edit mode', () => {
    render(
      <ProductForm
        product={{ id: 1, name: 'Mouse', description: 'Wireless mouse', price: 25 }}
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.getByDisplayValue('Mouse')).toBeTruthy();
    expect(screen.getByDisplayValue('Wireless mouse')).toBeTruthy();
    expect(screen.getByRole('button', { name: /update product/i })).toBeTruthy();
  });
});
