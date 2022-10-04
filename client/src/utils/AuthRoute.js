import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from './AuthContext';

function AuthRoute({ component: Component }) {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to='/' /> : <Component />;
}

export default AuthRoute;