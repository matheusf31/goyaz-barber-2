import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { IPartiners } from './index';

export const Container = styled.ScrollView`
  margin: 0 24px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 26px;
  font-family: 'RobotoSlab-Medium';

  margin-top: 30px;
  margin-bottom: 20px;
`;

export const PartinerList = styled(
  FlatList as new () => FlatList<IPartiners>,
)``;

export const AddPartinerButton = styled.TouchableOpacity`
  align-self: center;
`;
