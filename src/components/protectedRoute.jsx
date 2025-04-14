import { Navigate } from 'react-router-dom';
import { isAuthenticated, verifyToken } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    verifyToken();
    return <Navigate to="/auth" replace />;
  }
  return children;
};

export default ProtectedRoute;
