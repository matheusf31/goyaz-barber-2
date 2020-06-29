import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { IWeekInfo } from './index';

export const Container = styled.SafeAreaView``;

export const InfosContainer = styled.ScrollView``;

export const InfosContainerTitle = styled.Text`
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
  margin: 0 20px 10px 20px;
  color: #fff;
`;

export const AppointmentWeekInfoList = styled(
  FlatList as new () => FlatList<IWeekInfo>,
)`
  margin: 10px 20px;
`;

export const AppointmentMonthCardContainer = styled.View`
  background: #fff;
  margin: 10px 20px;
  border-radius: 10px;

  padding: 10px;
`;

export const TableInfosContainer = styled.View``;

export const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 2px 20px;
`;

export const TableInfosText = styled.Text`
  font-size: 15px;
  font-family: 'RobotoSlab-Medium';
`;

export const Separator = styled.View`
  margin: 20px 0;
  align-self: center;
  height: 1px;
  width: 50px;
  background: #ff9000;
`;
