import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import AuthRoutes from '../shared/routes/auth.routes';
import ClientRoutes from '../modules/client/routes';
import ProviderRoutes from '../modules/provider/routes';

import { useAuth } from '../shared/hooks/auth';

const Routes: React.FC = () => {
  const { profile, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      SplashScreen.hide();
    }
  }, [loading]);

  if (profile && profile.banned) {
    Alert.alert('Alerta!', 'Você foi banido da aplicação.');

    return <AuthRoutes />;
  }

  if (profile) {
    return profile.provider ? <ProviderRoutes /> : <ClientRoutes />;
  }

  return <AuthRoutes />;
};

export default Routes;
