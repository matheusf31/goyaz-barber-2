import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Feather';

import Dashboard from '../pages/Dashboard';

import NewAppointment from './newappointment.routes';

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
    height: Platform.OS === 'ios' ? 100 : 65,
  },
  labelStyle: {
    marginBottom: 10,
  },
};

const dashboardOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ focused }: ITabBarIcon) => (
    <Icon name="calendar" size={20} color={focused ? '#ff9000' : '#fff'} />
  ),
};

const newAppointmentsOptions = {
  // unmountOnBlur: true,
  tabBarVisible: false,
  tabBarLabel: 'Agendar',
  tabBarIcon: ({ focused }: ITabBarIcon) => (
    <Icon name="plus" size={20} color={focused ? '#ff9000' : '#fff'} />
  ),
};

const ClientRoutes: React.FC = () => (
  <Tab.Navigator tabBarOptions={tabBarOptions}>
    <Tab.Screen
      name="Dashboard"
      component={Dashboard}
      options={dashboardOptions}
    />
    <Tab.Screen
      name="Agendar"
      component={NewAppointment}
      options={newAppointmentsOptions}
    />
  </Tab.Navigator>
);

export default ClientRoutes;
