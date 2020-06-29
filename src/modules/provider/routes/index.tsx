import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Feather';

import Clients from '../pages/Clients';
import AppointmentsInfo from '../pages/AppointmentsInfo';
import Profile from '../../../shared/pages/Profile';
import PartinersRoutes from './partiners.routes';
import DashboardRoutes from './dashboard.routes';

interface ITabBarIcon {
  focused: boolean;
}

const Tab = createBottomTabNavigator();

const tabBarOptions = {
  keyboardHidesTabBar: true,
  activeTintColor: '#ff9000',
  inactiveTintColor: '#fff',
  style: {
    backgroundColor: '#18171d',
    paddingTop: Platform.OS === 'ios' ? 5 : 0,
    height: Platform.OS === 'ios' ? '10.5%' : 60,
  },
  labelStyle: {
    marginBottom: Platform.OS === 'ios' ? 15 : 10,
  },
};

const dashboardRoutesOptions = {
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

const partinersRoutesOptions = {
  tabBarLabel: 'Parceiros',
  tabBarIcon: ({ focused }: ITabBarIcon) => (
    <Icon name="user-check" size={20} color={focused ? '#ff9000' : '#fff'} />
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
      name="DashboardRoutes"
      component={DashboardRoutes}
      options={dashboardRoutesOptions}
    />
    <Tab.Screen
      name="AppointmentsInfo"
      component={AppointmentsInfo}
      options={appointmentsInfoOptions}
    />
    <Tab.Screen name="Clients" component={Clients} options={clientsOptions} />
    <Tab.Screen
      name="PartinersRoutes"
      component={PartinersRoutes}
      options={partinersRoutesOptions}
    />
    <Tab.Screen name="Perfil" component={Profile} options={profileOptions} />
  </Tab.Navigator>
);

export default ProviderRoutes;
