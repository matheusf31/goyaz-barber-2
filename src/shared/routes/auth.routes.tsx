import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import SendToken from '../pages/ResetPassword/SendToken';
import Reset from '../pages/ResetPassword/Reset';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
    <Auth.Screen name="SendToken" component={SendToken} />
    <Auth.Screen name="Reset" component={Reset} />
  </Auth.Navigator>
);

export default AuthRoutes;
