import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { FlatList } from 'react-native';

import { IClients } from './index';

export const Container = styled.View`
  padding: 0 24px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 26px;
  font-family: 'RobotoSlab-Medium';

  margin-top: ${Platform.OS === 'ios' ? 80 : 30}px;
  margin-bottom: 20px;
`;

export const ClientsList = styled(FlatList as new () => FlatList<IClients>)`
  margin-top: 30px;
`;
