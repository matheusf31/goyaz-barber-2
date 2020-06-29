import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';

import PartinersList from '../pages/Partiners';
import PartinersInfo from '../pages/Partiners/PartinersInfo';
import AddPartiner from '../pages/Partiners/AddPartiner';

const Stack = createStackNavigator();

const stackPartinersOptions = {
  headerTintColor: '#fff',
  cardStyle: {
    backgroundColor: 'black',
  },
};

const Partiners: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator screenOptions={stackPartinersOptions} headerMode="screen">
      <Stack.Screen
        name="PartinersList"
        component={PartinersList}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PartinersInfo"
        component={PartinersInfo}
        options={{
          title: 'Caixa do parceiro',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PartinersList');
              }}
            >
              <Icon name="chevron-left" size={20} color="#fff" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#18171d',
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
        name="AddPartiner"
        component={AddPartiner}
        options={{
          title: 'Adicionar parceiro',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PartinersList');
              }}
            >
              <Icon name="chevron-left" size={20} color="#fff" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#18171d',
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

export default Partiners;
