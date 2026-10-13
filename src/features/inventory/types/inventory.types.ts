export interface Category {
  id: number;
  name: string;
  code: string;
}

export interface Supplier {
  id: number;
  companyName: string;
  contactName: string;
  phone: string;
}

export interface Product {
  id: number;
  code: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  minStock: number;
  category: Category;
  supplier: Supplier;
  status: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK';
  createdAt: string;
}

// Interfaz para la respuesta paginada típica de Spring Boot (Pageable)
export interface PaginatedResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}