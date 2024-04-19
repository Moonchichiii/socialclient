import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCurrentUser } from "../contexts/CurrentUserContext";


const ProtectedRoute = ({ children }) => {
  const currentUser = useCurrentUser();
  return currentUser ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
