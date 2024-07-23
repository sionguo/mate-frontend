import { useAuth } from 'react-oidc-context';
import { Navigate } from 'react-router-dom';

export const Callback = () => {
  const auth = useAuth();

  if (auth.isAuthenticated === true && auth.user) {
    console.log(auth);
    return <Navigate to="/" />;
  }
  return <>loading</>;
};
