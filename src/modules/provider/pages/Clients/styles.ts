import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { IClients } from './index';

export const Container = styled.SafeAreaView`
  margin: 0 24px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 26px;
  font-family: 'RobotoSlab-Medium';

  margin-top: 30px;
  margin-bottom: 20px;
`;

export const ClientsList = styled(FlatList as new () => FlatList<IClients>)`
  margin-top: 30px;
`;
