import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';

import { IServices } from './index';

interface IServiceContainerProps {
  selected: boolean;
}

interface IServiceNameProps {
  selected: boolean;
}

export const Container = styled.View`
  margin: 0 24px;
`;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 20px;
  margin: 30px 0px 10px;
`;

export const ServicesContainer = styled.View``;

export const ServicesList = styled(
  FlatList as new () => FlatList<IServices>,
).attrs({
  showsHorizontalScrollIndicator: false,
})`
  padding: 14px 0px;
`;

export const ServiceContainer = styled(RectButton)<IServiceContainerProps>`
  padding: 12px 18px;
  background: ${props => (props.selected ? '#ff9000' : '#18171d')};
  border-radius: 10px;
  margin-bottom: 10px;

  margin-right: 8px;
  margin-left: 8px;

  flex: 1;

  align-items: center;
`;

export const ServiceName = styled.Text<IServiceNameProps>`
  color: ${props => (props.selected ? '#18171d' : '#fff')};
  font-family: 'RobotoSlab-Regular';
  font-weight: bold;
  font-size: 18px;
`;

export const ServiceInfoContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

export const ServiceInfoPriceContainer = styled.View`
  flex-direction: row;
  margin-right: 15px;

  align-items: center;
`;

export const ServiceInfoDurationContainer = styled.View`
  flex-direction: row;
  margin-left: 15px;

  align-items: center;
`;

export const ServiceInfoText = styled.Text<IServiceNameProps>`
  color: ${props => (props.selected ? '#18171d' : '#fff')};
  font-family: 'RobotoSlab-Regular';
  font-size: 14px;
  margin-left: 5px;
`;

/** Confirm Container */

export const ConfirmContainer = styled.View`
  margin-top: 10px;

  border-radius: 10px;
  background: rgba(0, 0, 0, 0.7);
`;

export const ConfirmContainerInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

export const ConfirmContainerDetails = styled.View``;

export const DetailsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 15px;
`;

export const DetailsName = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  font-weight: bold;
  color: #f4ede8;
  margin-left: 10px;
`;

export const DetailsText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 14px;
  color: #f4ede8;
  margin-left: 10px;
`;

export const CreateAppointmentButton = styled(RectButton)`
  height: 46px;
  background: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const CreateAppointmentButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #18171d;
  font-size: 16px;
`;
