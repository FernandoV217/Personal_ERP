import apiClient from '../../../app/api/apiClient';
import { type Product, type PaginatedResponse } from '../types/inventory.types';
import { type ProductFormInputs } from '../schemas/product.schema';

export const inventoryService = {
  // Obtiene los productos de forma paginada (ideal para el Pageable de Spring Boot)
  getProducts: async (page = 0, size = 10): Promise<PaginatedResponse<Product>> => {
    const response = await apiClient.get<PaginatedResponse<Product>>('/products', {
      params: { page, size }
    });
    return response.data;
  },

  // Obtiene un solo producto por ID
  getProductById: async (id: number): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  // Crea un nuevo producto
  createProduct: async (product: ProductFormInputs): Promise<Product> => {
    const response = await apiClient.post<Product>('/products', product);
    return response.data;
  },

  // Actualiza un producto existente
  updateProduct: async (id: number, product: ProductFormInputs): Promise<Product> => {
    const response = await apiClient.put<Product>(`/products/${id}`, product);
    return response.data;
  },

  // Elimina un producto logicamente o físicamente
  deleteProduct: async (id: number): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  }
};