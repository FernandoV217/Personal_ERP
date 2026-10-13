import type { Product } from "../types/inventory.types";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    code: 'PROD-001',
    name: 'Laptop Intel i7 16GB',
    description: 'Computadora portátil empresarial de alta gama',
    price: 1250.00,
    stock: 45,
    minStock: 10,
    category: { id: 1, name: 'Tecnología', code: 'TEC' },
    supplier: { id: 1, companyName: 'Dell Enterprise', contactName: 'Juan Pérez', phone: '+1234567' },
    status: 'ACTIVE',
    createdAt: '2026-01-15T08:30:00Z'
  },
  {
    id: 2,
    code: 'PROD-002',
    name: 'Monitor UltraWide 34"',
    description: 'Monitor curvo ideal para multitarea',
    price: 450.00,
    stock: 8,
    minStock: 12, // Esto disparará una alerta visual de stock bajo
    category: { id: 1, name: 'Tecnología', code: 'TEC' },
    supplier: { id: 2, companyName: 'LG Solutions', contactName: 'Ana Gómez', phone: '+7654321' },
    status: 'ACTIVE',
    createdAt: '2026-02-20T10:15:00Z'
  },
  {
    id: 3,
    code: 'PROD-003',
    name: 'Escritorio Ergonómico L',
    description: 'Mueble de oficina con altura regulable',
    price: 320.00,
    stock: 0,
    minStock: 5,
    category: { id: 2, name: 'Mobiliario', code: 'MOB' },
    supplier: { id: 3, companyName: 'OfficeDesign S.A.', contactName: 'Carlos Ruiz', phone: '+9876543' },
    status: 'OUT_OF_STOCK',
    createdAt: '2026-03-05T14:00:00Z'
  }
];