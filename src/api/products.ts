import axios from 'axios';
import { Product } from '../types/product';

const API_BASE_URL = import.meta.env.PROD ? (import.meta.env.VITE_API_BASE_URL || '') : '';
const API_URL = API_BASE_URL ? `${API_BASE_URL}/api/products` : '/api/products';
export type ProductInput = Omit<Product, 'id'>;

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>(API_URL);
    return response.data;
};

export const fetchProduct = async (id: string | number): Promise<Product> => {
    const response = await axios.get<Product>(`${API_URL}/${id}`);
    return response.data;
};

export const createProduct = async (product: ProductInput): Promise<Product> => {
    const response = await axios.post<Product>(API_URL, product);
    return response.data;
};

export const updateProduct = async (id: string | number, product: ProductInput): Promise<Product> => {
    const response = await axios.put<Product>(`${API_URL}/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id: string | number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};