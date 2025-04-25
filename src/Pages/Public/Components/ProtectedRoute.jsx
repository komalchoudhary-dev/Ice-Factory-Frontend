import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../../UserContext';

const ProtectedRoute = ({ children }) => {
  const { userPhone } = useContext(UserContext);
  
  if (!userPhone) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default ProtectedRoute;