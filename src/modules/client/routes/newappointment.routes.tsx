import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';

import SelectProvider from '../pages/NewAppointment/SelectProvider';
import SelectDate from '../pages/NewAppointment/SelectDate';
import SelectServiceAndConfirm from '../pages/NewAppointment/SelectServiceAndConfirm';

const Stack = createStackNavigator();

const stackNewOptions = {
  headerTintColor: '#fff',
  headerLeftContainerStyle: {
    marginLeft: 30,
  },
  cardStyle: {
    backgroundColor: 'black',
  },
  // animationEnabled: false,
};

const NewAppointment: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator screenOptions={stackNewOptions} headerMode="screen">
      <Stack.Screen
        name="SelectProvider"
        component={SelectProvider}
        options={{
          title: 'Barbeiros',
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
        name="SelectDate"
        component={SelectDate}
        options={{
          title: 'Data',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SelectProvider');
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
        name="SelectServiceAndConfirm"
        component={SelectServiceAndConfirm}
        options={{
          title: 'Serviços',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SelectDate');
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

export default NewAppointment;
