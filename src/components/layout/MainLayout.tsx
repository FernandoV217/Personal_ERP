import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { logout } from '../../app/store/authSlice';

export const MainLayout = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar simple simulada */}
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold font-sans">NexusERP</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">Bienvenido, <strong>{user?.username || user?.username || 'Usuario'}</strong></span>
          <button 
            onClick={() => dispatch(logout())}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Contenido Dinámico de las Páginas */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        <Outlet />
      </main>
    </div>
  );
};