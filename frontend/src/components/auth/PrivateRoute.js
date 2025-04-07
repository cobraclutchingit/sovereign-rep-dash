import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  // If still loading auth state, show nothing or a loading spinner
  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }
  
  // If not authenticated, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // If authenticated, render the protected component
  return children;
};

export default PrivateRoute;
