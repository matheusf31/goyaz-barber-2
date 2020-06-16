import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import AuthRoutes from '../shared/routes/auth.routes';
import ClientRoutes from '../modules/client/routes/client.routes';
import ProviderRoutes from '../modules/provider/routes/provider.routes';

import { useAuth } from '../shared/hooks/auth';

const Routes: React.FC = () => {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (profile) {
    return profile.provider ? <ProviderRoutes /> : <ClientRoutes />;
  }

  return <AuthRoutes />;
};

export default Routes;
