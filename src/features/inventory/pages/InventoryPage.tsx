import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { type Product } from '../types/inventory.types';
import { ProductFormModal } from '../components/ProductFormModal';
import { type ProductFormInputs } from '../schemas/product.schema';

// Importación de los Custom Hooks Reactivos de RTK Query
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from '../services/inventoryApi';

export const InventoryPage = () => {
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // 1. Consumo asíncrono con caché automatizada (Cargamos página 0, tamaño 50)
  const { data, isLoading, isError, error, refetch } = useGetProductsQuery({ page: 0, size: 50 });
  const products = data?.content || [];

  // 2. Desestructuración de desencadenadores de mutación
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleOpenCreate = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (formData: ProductFormInputs) => {
    try {
      if (selectedProduct) {
        // Ejecuta PUT /api/v1/products/{id} y auto-refresca la lista
        await updateProduct({ id: selectedProduct.id, data: formData }).unwrap();
      } else {
        // Ejecuta POST /api/v1/products y auto-refresca la lista
        await createProduct(formData).unwrap();
      }
    } catch (err: any) {
      alert(err?.data?.message || 'Error al procesar la operación en el ERP.');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar este producto del ERP?')) {
      try {
        await deleteProduct(id).unwrap();
      } catch (err: any) {
        alert(err?.data?.message || 'Error al eliminar el registro.');
      }
    }
  };

  // Plantillas de Renderizado de Celdas (Igual que antes)
  const priceBodyTemplate = (rowData: Product) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(rowData.price);
  const statusBodyTemplate = (rowData: Product) => {
    const severityMap: Record<Product['status'], 'success' | 'warning' | 'danger'> = { ACTIVE: 'success', INACTIVE: 'danger', OUT_OF_STOCK: 'warning' };
    return <Tag severity={severityMap[rowData.status]} value={rowData.status === 'ACTIVE' ? 'Activo' : rowData.status === 'INACTIVE' ? 'Inactivo' : 'Sin Stock'} />;
  };

  const actionBodyTemplate = (rowData: Product) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" rounded severity="success" size="small" onClick={() => handleOpenEdit(rowData)} />
      <Button icon="pi pi-trash" rounded severity="danger" size="small" onClick={() => handleDeleteProduct(rowData.id)} />
    </div>
  );

  const renderHeader = () => (
    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-t-lg border-b border-gray-200">
      <div className="flex items-center gap-4">
        <h3 className="text-xl font-bold text-gray-800 m-0">Catálogo de Productos</h3>
        <Button label="Nuevo Producto" icon="pi pi-plus" severity="info" size="small" onClick={handleOpenCreate} />
      </div>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." className="w-80" />
      </span>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-75">
        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="4" />
        <p className="text-gray-500 mt-4 text-sm font-medium">Sincronizando estados con RTK Query...</p>
      </div>
    );
  }

  if (isError) {
    const errorMsg = (error as any)?.data?.message || 'Error al sincronizar datos.';
    return (
      <div className="p-4">
        <Message severity="error" text={errorMsg} className="w-full justify-start mb-4" />
        <Button label="Forzar reintento" icon="pi pi-refresh" className="p-button-outlined" onClick={refetch} />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <DataTable value={products} paginator rows={10} globalFilter={globalFilter} header={renderHeader()} emptyMessage="No hay productos registrados.">
        <Column field="code" header="Código" sortable className="font-semibold text-gray-600"></Column>
        <Column field="name" header="Nombre" sortable></Column>
        <Column field="category.name" header="Categoría" sortable></Column>
        <Column field="price" header="Precio Base" body={priceBodyTemplate} sortable></Column>
        <Column field="stock" header="Disponibles" sortable></Column>
        <Column field="status" header="Estado" body={statusBodyTemplate} sortable></Column>
        <Column header="Acciones" body={actionBodyTemplate} style={{ minWidth: '8rem' }}></Column>
      </DataTable>

      <ProductFormModal
        visible={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        productToEdit={selectedProduct}
        onSave={handleSaveProduct}
      />
    </div>
  );
};