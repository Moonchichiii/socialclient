import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useCurrentUser } from "../contexts/CurrentUserContext";

const ProtectedRoute = ({ children }) => {
  const currentUser = useCurrentUser();
  const location = useLocation();
  if (!currentUser) {   
    return <Navigate to="/login" state={{ from: location }} replace />;
  }  
  return children;
};
export default ProtectedRoute;
