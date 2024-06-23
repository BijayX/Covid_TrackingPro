// components/PrivateRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
  <h1>Unauthorized</h1>

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
