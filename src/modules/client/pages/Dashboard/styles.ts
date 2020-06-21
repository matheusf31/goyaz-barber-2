import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { IAppointments } from '.';

export const Container = styled.ScrollView``;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 18px;
  margin: 0 24px 24px;
`;

export const AppointmentsList = styled(
  FlatList as new () => FlatList<IAppointments>,
)``;

export const ConcludedAppointmentsList = styled(
  FlatList as new () => FlatList<IAppointments>,
)``;
