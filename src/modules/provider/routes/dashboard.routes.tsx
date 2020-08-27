import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';

import Dashboard from '../pages/Dashboard';
import CreateAppointmentPage from '../pages/Dashboard/CreateAppointmentPage';
import AppointmentPage from '../pages/Dashboard/AppointmentPage';

const Stack = createStackNavigator();

const stackPartnersOptions = {
  headerTintColor: '#fff',
  cardStyle: {
    backgroundColor: 'black',
  },
};

const Partners: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator screenOptions={stackPartnersOptions} headerMode="screen">
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CreateAppointmentPage"
        component={CreateAppointmentPage}
        options={{
          title: 'Criar agendamento',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Dashboard');
              }}
            >
              <Icon name="chevron-left" size={20} color="#fff" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#17181d',
            shadowOffset: {
              height: 0,
            },
            height: Platform.OS === 'ios' ? 100 : 80,
          },
          headerTitleStyle: {
            fontFamily: 'RobotoSlab-Regular',
            fontSize: 20,
          },
          headerLeftContainerStyle: {
            marginLeft: 30,
          },
        }}
      />

      <Stack.Screen
        name="AppointmentPage"
        component={AppointmentPage}
        options={{
          title: 'Agendamento',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Dashboard');
              }}
            >
              <Icon name="chevron-left" size={20} color="#fff" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#17181d',
            shadowOffset: {
              height: 0,
            },
            height: Platform.OS === 'ios' ? 100 : 80,
          },
          headerTitleStyle: {
            fontFamily: 'RobotoSlab-Regular',
            fontSize: 20,
          },
          headerLeftContainerStyle: {
            marginLeft: 30,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default Partners;
