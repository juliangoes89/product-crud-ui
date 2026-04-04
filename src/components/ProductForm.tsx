import React, { useState } from 'react';
import { Product } from '../types/product';
import { ProductInput } from '../api/products';

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: ProductInput) => Promise<void> | void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit }) => {
  const [name, setName] = useState<string>(product ? product.name : '');
  const [description, setDescription] = useState<string>(product ? product.description : '');
  const [price, setPrice] = useState<number | ''>(product ? product.price : '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData: ProductInput = {
      name,
      description,
      price: Number(price),
    };

    await onSubmit(productData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
          required
        />
      </div>
      <div className="field">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product description"
          required
        />
      </div>
      <div className="field">
        <label htmlFor="price">Price:</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
          placeholder="0.00"
          required
        />
      </div>
      <button className="btn btn-primary" type="submit">{product ? 'Update Product' : 'Create Product'}</button>
    </form>
  );
};

export default ProductForm;