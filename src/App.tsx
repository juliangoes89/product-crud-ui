import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage';
import ProductsPage from './pages/ProductsPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/create" element={<CreateProductPage />} />
      <Route path="/edit/:id" element={<EditProductPage />} />
    </Routes>
  );
};

export default App;