import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layout/MainLayout';
import Introduction from '../components/Introduction/Introduction';
import Dashboard from '../components/Dashboard/Dashboard';
import Login from '../components/Login/Login';
import PrivateRoute from './PrivateRoute';
import LogicCentral from '../components/Dashboard/LOGIC/LogicCentral';
import AdminRoute from './AdminRoute';

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
      element : <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
    },
    {
      path : '/LogicCentral',
      element : <PrivateRoute><AdminRoute><LogicCentral></LogicCentral></AdminRoute></PrivateRoute>
    },
    {
      path : '/Login',
      element : <Login></Login>
    }
  ]
}
])

export default router;