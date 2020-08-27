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
  font-size: 22px;
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
  background: ${props => (props.selected ? '#ff9000' : '#17181d')};
  border-radius: 10px;
  margin-bottom: 10px;

  flex: 1;

  margin-right: 5px;
  margin-left: 5px;

  align-items: center;
`;

export const ServiceName = styled.Text<IServiceNameProps>`
  color: ${props => (props.selected ? '#17181d' : '#fff')};
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
  margin-right: 10px;

  align-items: center;
`;

export const ServiceInfoDurationContainer = styled.View`
  flex-direction: row;
  margin-left: 10px;

  align-items: center;
`;

export const ServiceInfoText = styled.Text<IServiceNameProps>`
  color: ${props => (props.selected ? '#17181d' : '#fff')};
  font-family: 'RobotoSlab-Regular';
  font-size: 12px;
  margin-left: 5px;
`;

/** Confirm Container */
export const ConfirmContainer = styled.View`
  margin: 0px 5px;

  border-radius: 10px;
  background: #17181d;
`;

export const ConfirmContainerInfo = styled.View`
  flex-direction: row;
  align-items: center;

  /* background: red; */
  padding: 10px 20px;
`;

export const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

export const ConfirmContainerDetails = styled.View`
  flex: 1;
`;

export const DetailsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 4px 15px;
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

export const CreateAppointmentButton = styled.TouchableOpacity`
  height: 46px;
  background: #ff9000;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const CreateAppointmentButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #17181d;
  font-size: 16px;
`;
