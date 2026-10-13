import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type Product, type PaginatedResponse } from '../types/inventory.types';
import { type ProductFormInputs } from '../schemas/product.schema';

export const inventoryApi = createApi({
  reducerPath: 'inventoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
    prepareHeaders: (headers) => {
      // Inyectamos el JWT de manera directa desde el almacenamiento local
      const token = localStorage.getItem('auth_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Products'], // Usado para el manejo inteligente de caché
  endpoints: (builder) => ({
    // Query: Petición GET para listar productos
    getProducts: builder.query<PaginatedResponse<Product>, { page: number; size: number }>({
      query: ({ page, size }) => `/products?page=${page}&size=${size}`,
      providesTags: ['Products'],
    }),
    
    // Mutation: Petición POST para crear producto
    createProduct: builder.mutation<Product, ProductFormInputs>({
      query: (newProduct) => ({
        url: '/products',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: ['Products'], // Invalida la caché para forzar el refetch automático
    }),

    // Mutation: Petición PUT para actualizar producto
    updateProduct: builder.mutation<Product, { id: number; data: ProductFormInputs }>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),

    // Mutation: Petición DELETE para eliminar producto
    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

// RTK Query genera automáticamente Custom Hooks estrictamente tipados basados en los nombres de los endpoints
export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = inventoryApi;