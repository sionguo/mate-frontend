import { AuthProvider, AuthProviderProps, useAuth } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';

import { authedRoutes, noneAuthedRoutes } from './route';

function App() {
  const oidcConfig: AuthProviderProps = {
    authority: `${import.meta.env.MATE_AUTHORITY}`,
    client_id: `${import.meta.env.MATE_CLIENT_ID}`,
    redirect_uri: `${window.location.origin}/callback`,
    response_type: 'code',
    scope: 'openid profile email offline_access',
    post_logout_redirect_uri: `${window.location.origin}/`,
    response_mode: 'query',
    loadUserInfo: true,
  };

  const AuthGuard = () => {
    const auth = useAuth();
    if (auth.isLoading) {
      return <>loading</>;
    }
    if (!auth.isAuthenticated) {
      return <BrowserRouter>{noneAuthedRoutes}</BrowserRouter>;
    }
    if (auth.error) {
      return <div>{auth.error.message}</div>;
    }
    return <BrowserRouter>{authedRoutes}</BrowserRouter>;
  };

  return (
    <AuthProvider {...oidcConfig}>
      <AuthGuard />
    </AuthProvider>
  );
}

export default App;
