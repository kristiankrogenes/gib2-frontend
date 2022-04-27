import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Map from './pages/Map';
// import RegisterPage from './pages/RegisterPage';
// import LoginPage from './pages/LoginPage';
import Login from './pages/Login';
import Register from './pages/Register';
import GasStations from './pages/GasStations';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import About from './pages/About';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: localStorage.getItem('access_token') ? (
        <DashboardLayout />
      ) : (
        <Navigate to="/login" replace />
      ),
      children: [
        { element: <Navigate to="/dashboard/map" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'map', element: <Map /> },
        { path: 'gasstations', element: <GasStations /> },
        { path: 'about', element: <About /> },
      ],
    },
    {
      path: '/auth',
      element: <DashboardLayout />,
      children: [
        { path: 'register', element: <RegisterPage /> },
        { path: 'login', element: <LoginPage /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
