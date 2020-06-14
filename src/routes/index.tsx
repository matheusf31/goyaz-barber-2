import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../modules/shared/SignIn';
import SignUp from '../modules/shared/SignUp';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
  </Auth.Navigator>
);

export default AuthRoutes;
