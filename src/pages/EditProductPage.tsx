import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProduct, ProductInput, updateProduct } from '../api/products';
import ProductForm from '../components/ProductForm';
import { Product } from '../types/product';

const EditProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getProduct = async () => {
            if (!id) {
                setError('Invalid product id');
                setLoading(false);
                return;
            }

            try {
                const fetchedProduct = await fetchProduct(id);
                setProduct(fetchedProduct);
            } catch {
                setError('Failed to fetch product');
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [id]);

    const handleSubmit = async (updatedProduct: ProductInput) => {
        if (!id) return;

        try {
            await updateProduct(id, updatedProduct);
            navigate('/');
        } catch {
            setError('Failed to update product');
        }
    };

    if (loading) return <div className="page">Loading...</div>;
    if (error) return <div className="page error">{error}</div>;
    if (!product) return <div className="page">Product not found</div>;

    return (
        <div className="page">
            <section className="surface">
                <h1 className="page-title">Edit Product</h1>
                <p className="subtle">Update product details and save your changes.</p>
                <ProductForm product={product} onSubmit={handleSubmit} />
                                <button className="btn btn-secondary mt-16" onClick={() => navigate('/')}>Cancel</button>
            </section>
        </div>
    );
};

export default EditProductPage;