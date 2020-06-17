import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';

import { IProvider } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<IProvider>)`
  padding: 32px 24px 16px;
`;

export const ProviderContainer = styled(RectButton)`
  background: #18171d;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 16px;

  flex-direction: row;
  align-items: center;
`;

export const ProviderAvatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderName = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  color: #f4ede8;
`;
