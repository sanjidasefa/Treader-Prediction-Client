import React from 'react';
import { Navigate, Outlet } from 'react-router';

const AdminRoute = () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const userRole = sessionStorage.getItem("userRole");

  if (isLoggedIn && userRole === "admin") {
    return <Outlet />;
  }

  return <Navigate to="/dashboard" replace />;
};

export default AdminRoute;