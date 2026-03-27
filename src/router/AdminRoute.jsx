// AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router';

const AdminRoute = ({ children }) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const userRole = sessionStorage.getItem("userRole");

  if (isLoggedIn && userRole === "admin") {
    return children; 
  }

  return <Navigate to="/DashBoard" replace />;
};

export default AdminRoute;