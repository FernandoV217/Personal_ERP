import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { inventoryApi } from '../../features/inventory/services/inventoryApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [inventoryApi.reducerPath]: inventoryApi.reducer, // Reductor dinámico de RTK Query
  },
  // El middleware de RTK Query habilita características como el almacenamiento en caché e invalidación
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(inventoryApi.middleware),
});

// Tipos inferidos para TypeScript (Muy importante para la vacante)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;