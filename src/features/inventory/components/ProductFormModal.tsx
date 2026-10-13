import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { productSchema, type ProductFormInputs } from '../schemas/product.schema';
import type { Product } from '../types/inventory.types';

interface ProductFormModalProps {
  visible: boolean;
  onHide: () => void;
  productToEdit: Product | null;
  onSave: (data: ProductFormInputs) => Promise<void>;
}

// Datos mock para los selectores del ERP
const MOCK_CATEGORIES = [
  { label: 'Tecnología', value: 1 },
  { label: 'Mobiliario', value: 2 },
  { label: 'Papelería', value: 3 },
];

export const ProductFormModal = ({ visible, onHide, productToEdit, onSave }: ProductFormModalProps) => {
  const isEditMode = !!productToEdit;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      code: '',
      name: '',
      description: '',
      price: 0,
      stock: 0,
      minStock: 0,
      categoryId: undefined,
    },
  });

  // Efecto para rellenar el formulario si entramos en modo edición
  useEffect(() => {
    if (productToEdit) {
      reset({
        code: productToEdit.code,
        name: productToEdit.name,
        description: productToEdit.description,
        price: productToEdit.price,
        stock: productToEdit.stock,
        minStock: productToEdit.minStock,
        categoryId: productToEdit.category.id,
      });
    } else {
      reset({
        code: '',
        name: '',
        description: '',
        price: 0,
        stock: 0,
        minStock: 0,
        categoryId: undefined,
      });
    }
  }, [productToEdit, reset, visible]);

  const onSubmit = async (data: ProductFormInputs) => {
    await onSave(data);
    onHide();
  };

  const footerContent = (
    <div className="flex justify-end gap-2 mt-4">
      <Button label="Cancelar" icon="pi pi-times" outlined severity="danger" onClick={onHide} disabled={isSubmitting} />
      <Button label={isEditMode ? 'Actualizar' : 'Guardar'} icon="pi pi-check" severity="success" onClick={handleSubmit(onSubmit)} loading={isSubmitting} />
    </div>
  );

  return (
    <Dialog
      header={isEditMode ? '📝 Editar Producto' : '📦 Registrar Nuevo Producto'}
      visible={visible}
      style={{ width: '500px' }}
      modal
      onHide={onHide}
      footer={footerContent}
      className="p-fluid font-sans"
    >
      <form className="flex flex-col gap-4 mt-2">
        {/* Código y Nombre */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="code" className="text-sm font-semibold text-gray-700">Código ERP</label>
            <Controller
              name="code"
              control={control}
              render={({ field }) => <InputText {...field} id="code" disabled={isEditMode} className={errors.code ? 'p-invalid' : ''} placeholder="PROD-01" />}
            />
            {errors.code && <small className="p-error text-xs">{errors.code.message}</small>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-semibold text-gray-700">Nombre</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <InputText {...field} id="name" className={errors.name ? 'p-invalid' : ''} />}
            />
            {errors.name && <small className="p-error text-xs">{errors.name.message}</small>}
          </div>
        </div>

        {/* Categoría */}
        <div className="flex flex-col gap-1">
          <label htmlFor="categoryId" className="text-sm font-semibold text-gray-700">Categoría</label>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <Dropdown
                {...field}
                id="categoryId"
                options={MOCK_CATEGORIES}
                placeholder="Seleccione una categoría"
                className={errors.categoryId ? 'p-invalid' : ''}
              />
            )}
          />
          {errors.categoryId && <small className="p-error text-xs">{errors.categoryId.message}</small>}
        </div>

        {/* Descripción */}
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm font-semibold text-gray-700">Descripción</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <InputTextarea {...field} id="description" rows={3} autoResize className={errors.description ? 'p-invalid' : ''} />}
          />
          {errors.description && <small className="p-error text-xs">{errors.description.message}</small>}
        </div>

        {/* Precio e Inventario */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="price" className="text-sm font-semibold text-gray-700">Precio</label>
            <Controller
              name="price"
              control={control}
              render={({ field }) => <InputNumber id="price" value={field.value} onValueChange={(e) => field.onChange(e.value)} mode="currency" currency="MXN" locale="es-MX" className={errors.price ? 'p-invalid' : ''} />}
            />
            {errors.price && <small className="p-error text-xs">{errors.price.message}</small>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="stock" className="text-sm font-semibold text-gray-700">Stock Inicial</label>
            <Controller
              name="stock"
              control={control}
              render={({ field }) => <InputNumber id="stock" value={field.value} onValueChange={(e) => field.onChange(e.value)} useGrouping={false} className={errors.stock ? 'p-invalid' : ''} />}
            />
            {errors.stock && <small className="p-error text-xs">{errors.stock.message}</small>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="minStock" className="text-sm font-semibold text-gray-700">Mínimo</label>
            <Controller
              name="minStock"
              control={control}
              render={({ field }) => <InputNumber id="minStock" value={field.value} onValueChange={(e) => field.onChange(e.value)} useGrouping={false} className={errors.minStock ? 'p-invalid' : ''} />}
            />
            {errors.minStock && <small className="p-error text-xs">{errors.minStock.message}</small>}
          </div>
        </div>
      </form>
    </Dialog>
  );
};