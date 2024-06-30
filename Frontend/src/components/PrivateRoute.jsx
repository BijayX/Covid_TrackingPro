// // components/PrivateRoute.js
// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate, Outlet } from 'react-router-dom';

// const PrivateRoute = () => {
//   const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
//   <h1>Unauthorized</h1>

//   return token ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;


import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const isValidToken = (token) => {
  // Placeholder function for token validation logic
  // This can include checking token format, expiration, etc.
  if (!token) return false;

  //  check for expiration if your token is a JWT
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = payload.exp && (payload.exp * 1000) < Date.now();
    return !isExpired;
  } catch (e) {
    return false;
  }
};

const PrivateRoute = () => {
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');

  return isValidToken(token) ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
