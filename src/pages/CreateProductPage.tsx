import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { createProduct, ProductInput } from '../api/products';

const CreateProductPage: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (product: ProductInput) => {
        try {
            await createProduct(product);
            navigate('/');
        } catch {
            setError('Failed to create product. Please try again.');
        }
    };

    return (
        <div className="page">
            <section className="surface">
                <h1 className="page-title">Create Product</h1>
                <p className="subtle">Add a new item to your catalog.</p>
                {error && <p className="error">{error}</p>}
                <ProductForm onSubmit={handleSubmit} />
                <button className="btn btn-secondary mt-16" onClick={() => navigate('/')}>Cancel</button>
            </section>
        </div>
    );
};

export default CreateProductPage;