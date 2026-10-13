import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../../components/router/ProtectedRoute';
import { MainLayout } from '../../components/layout/MainLayout';
import { LoginPage } from '../../features/auth/pages/LoginPage';
import { InventoryPage } from '../../features/inventory/pages/InventoryPage';

const DashboardMock = () => (
  <div>
    <h2 className="text-2xl font-bold mb-2">📊 Dashboard Principal</h2>
    <p>¡Felicidades! Estás en una zona protegida por JWT.</p>
  </div>
);

const router = createBrowserRouter([
  // Rutas Públicas
  {
    path: '/login',
    element: <LoginPage />,
  },
  // Rutas Privadas Protegidas
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/dashboard',
            element: <DashboardMock />,
          },
          {
            path: '/inventario',
            element: <InventoryPage />, // <- Registrada en el sistema de rutas protegidas
          },
          // Redirección por defecto dentro del sistema protegido
          {
            path: '*',
            element: <Navigate to="/dashboard" replace />,
          }
        ]
      }
    ]
  },
  // Redirección global si entran a la raíz de la app
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  }
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};