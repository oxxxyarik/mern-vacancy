import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

//проверяет, авторизован ли пользователь
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;