import React from 'react';
import { Product } from '../types/product';
import ProductTable from './ProductTable';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
  return (
    <div>
      <h2 className="page-title title-sm">Product List</h2>
      <ProductTable products={products} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

export default ProductList;