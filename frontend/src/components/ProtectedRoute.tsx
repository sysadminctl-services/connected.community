import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Si hay token, simplemente renderiza el componente hijo que corresponda a la ruta
  return <Outlet />;
};