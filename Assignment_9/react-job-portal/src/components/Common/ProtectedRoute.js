import React from 'react';
import { Navigate } from 'react-router-dom';
import sessionManager from '../../utils/sessionManager';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionManager.isSessionValid();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;