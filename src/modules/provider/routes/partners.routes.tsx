import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';

import PartnersList from '../pages/Partners';
import PartnersInfo from '../pages/Partners/PartnersInfo';
import AddPartner from '../pages/Partners/AddPartner';

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
        name="PartnersList"
        component={PartnersList}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PartnersInfo"
        component={PartnersInfo}
        options={{
          title: 'Caixa do parceiro',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PartnersList');
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
        name="AddPartner"
        component={AddPartner}
        options={{
          title: 'Adicionar parceiro',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PartnersList');
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
