import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { Navigate } from 'react-router-dom';

export const Login = () => {
  const auth = useAuth();

  useEffect(() => {
    if (auth.isAuthenticated === false) {
      void auth.signinRedirect();
    }
  }, [auth, auth.isAuthenticated]);

  return (
    <div>
      {auth.isAuthenticated === null && 'loading'}
      {auth.isAuthenticated && <Navigate to="/callback" />}
    </div>
  );
};
