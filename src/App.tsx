import 'react-native-gesture-handler';
import React, { Component, ReactPropTypes } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-community/async-storage';

import AppProvider from './shared/hooks/index';

import Routes from './routes';

class App extends Component {
  constructor(props: ReactPropTypes) {
    super(props);
    OneSignal.init('40a822e0-e4e2-4a0d-8212-7651d3cc1b87');

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount(): void {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  // disparado quando recebermos e o app estiver aberto
  onReceived = (data: unknown): void => {
  };

  // executa quando o usuário clica em uma notificação quando o app está fechado (pode mandar ele pra alguma tela)
  onOpened = (notification: unknown): void => {
    // console.log('#ONOPENED - notification => ', notification);
  };

  // usado para relacionar um user logado com o id de notificação
  // enviar notificação pra um usuário específico
  // armazenar no local storage -> envia pro server e associa na tabela de user
  onIds = async (id: { pushToken: string; userId: string }): Promise<void> => {
    // console.log('#ONIDS - id => ', id);

    await AsyncStorage.setItem(
      '@GoyazBarber:device-id',
      JSON.stringify(id.userId),
    );
  };

  render(): JSX.Element {
    return (
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#000" />

        <AppProvider>
          <Routes />
        </AppProvider>
      </NavigationContainer>
    );
  }
}

export default App;
