import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/store/hooks';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirige al login y guarda la ruta previa para regresar al usuario tras iniciar sesión
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};