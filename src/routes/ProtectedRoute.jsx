import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCurrentUser } from "../contexts/CurrentUserContext";

const ProtectedRoute = ({ children }) => {
  const currentUser = useCurrentUser();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default ProtectedRoute;
