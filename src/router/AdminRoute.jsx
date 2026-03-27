import React from 'react';
import { Navigate, Outlet } from 'react-router';

const AdminRoute = () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const userRole = sessionStorage.getItem("userRole");

  // Jodi logged in thake ebong role admin hoy, tobei bhetore dhukte dibe
  if (isLoggedIn && userRole === "admin") {
    return <Outlet />;
  }

  // Admin na hole ba login na thakle Dashboard ba Login page-e pathiye dibe
  return <Navigate to="/dashboard" replace />;
};

export default AdminRoute;