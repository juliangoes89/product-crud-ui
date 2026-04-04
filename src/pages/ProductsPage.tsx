import React, { useEffect, useState } from 'react';
import { deleteProduct, fetchProducts } from '../api/products';
import ProductList from '../components/ProductList';
import { Product } from '../types/product';
import { Link, useNavigate } from 'react-router-dom';

const ProductsPage: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const fetchedProducts = await fetchProducts();
                setProducts(fetchedProducts);
            } catch {
                setError('Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const handleEdit = (product: Product) => {
        navigate(`/edit/${product.id}`);
    };

    const handleDelete = async (productId: number) => {
        try {
            await deleteProduct(productId);
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
        } catch {
            setError('Failed to delete product');
        }
    };

    if (loading) {
        return <div className="page">Loading...</div>;
    }

    if (error) {
        return <div className="page error">{error}</div>;
    }

    return (
        <div className="page">
            <section className="surface">
                <h1 className="page-title">Products</h1>
                <p className="subtle">Manage your catalog with a clean Material-style interface.</p>
                <div className="top-actions">
                    <span className="subtle">Total: {products.length}</span>
                    <Link className="btn btn-primary" to="/create">Create Product</Link>
                </div>
            </section>

            <section className="surface mt-16">
            <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
            </section>
        </div>
    );
};

export default ProductsPage;