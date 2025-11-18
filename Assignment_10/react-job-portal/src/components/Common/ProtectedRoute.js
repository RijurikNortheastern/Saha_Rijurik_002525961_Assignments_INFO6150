import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert, Container } from '@mui/material';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    if (!user || !allowedRoles.includes(user.type)) {
      return (
        <Container sx={{ mt: 4 }}>
          <Alert severity="error">
            Access Denied: You don't have permission to view this page.
            {user?.type && ` Your role: ${user.type}. Required role: ${allowedRoles.join(' or ')}`}
          </Alert>
        </Container>
      );
    }
  }

  return children;
};

export default ProtectedRoute;