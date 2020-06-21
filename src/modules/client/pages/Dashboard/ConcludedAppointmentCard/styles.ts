import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  /** Esse valor é devido ao meu TabBottom do react navigation */
  margin-bottom: ${Platform.OS === 'ios' ? 120 : 150}px;
`;

export const AppointmentCardContainer = styled.View`
  margin: 0 16px 0px 42px;
  padding: 10px 14px;
  border-radius: 10px;
  background: #18171d;
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  padding: 5px 0;
`;

export const ProviderName = styled.Text`
  font-weight: bold;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
  margin-left: 10px;
`;

export const GenericInfo = styled.Text`
  color: #fff;
  font-size: 14px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 10px;
`;
