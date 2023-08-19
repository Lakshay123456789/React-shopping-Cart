import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, allowedRoles, role, ...rest }) => {
  if (allowedRoles.includes(role)) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;