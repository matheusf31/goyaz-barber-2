import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Feather';

import Dashboard from '../pages/Dashboard';
import Clients from '../pages/Clients';
import AppointmentsInfo from '../pages/AppointmentsInfo';
import Profile from '../../../shared/pages/Profile';

interface ITabBarIcon {
  focused: boolean;
}

const Tab = createBottomTabNavigator();

const tabBarOptions = {
  keyboardHidesTabBar: true,
  activeTintColor: '#ff9000',
  inactiveTintColor: '#fff',
  style: {
    backgroundColor: '#17181d',
    marginTop: 1,
    paddingTop: 5,
    height: Platform.OS === 'ios' ? '11%' : 65,
  },
  labelStyle: {
    marginBottom: Platform.OS === 'ios' ? 15 : 6,
  },
};

const dashboardOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ focused }: ITabBarIcon) => (
    <Icon name="calendar" size={20} color={focused ? '#ff9000' : '#fff'} />
  ),
};

const clientsOptions = {
  tabBarLabel: 'Clientes',
  tabBarIcon: ({ focused }: ITabBarIcon) => (
    <Icon name="users" size={20} color={focused ? '#ff9000' : '#fff'} />
  ),
};

const profileOptions = {
  tabBarLabel: 'Perfil',
  tabBarIcon: ({ focused }: ITabBarIcon) => (
    <Icon name="user" size={20} color={focused ? '#ff9000' : '#fff'} />
  ),
};

const appointmentsInfoOptions = {
  tabBarLabel: 'Caixa',
  tabBarIcon: ({ focused }: ITabBarIcon) => (
    <Icon name="dollar-sign" size={20} color={focused ? '#ff9000' : '#fff'} />
  ),
};

const ProviderRoutes: React.FC = () => (
  <Tab.Navigator tabBarOptions={tabBarOptions}>
    <Tab.Screen
      name="Dashboard"
      component={Dashboard}
      options={dashboardOptions}
    />
    <Tab.Screen
      name="AppointmentsInfo"
      component={AppointmentsInfo}
      options={appointmentsInfoOptions}
    />
    <Tab.Screen name="Clients" component={Clients} options={clientsOptions} />
    <Tab.Screen name="Perfil" component={Profile} options={profileOptions} />
  </Tab.Navigator>
);

export default ProviderRoutes;
