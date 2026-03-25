import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layout/MainLayout';
import Introduction from '../components/Introduction/Introduction';
import Dashboard from '../components/Dashboard/Dashboard';
import Login from '../components/Login/Login';

const router =  createBrowserRouter([
{
  path: '/',
  element : <MainLayout></MainLayout>,
  children : [
    {
      path: '/',
      element : <Introduction></Introduction>
    },
    {
      path : '/DashBoard',
      element : <Dashboard></Dashboard>
    },
    {
      path : '/Login',
      element : <Login></Login>
    }
  ]
}
])

export default router;