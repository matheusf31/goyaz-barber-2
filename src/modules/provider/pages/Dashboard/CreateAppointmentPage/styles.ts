import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { RectButton } from 'react-native-gesture-handler';

import { IClients, IServices } from './index';

interface IServiceContainerProps {
  selected: boolean;
}

interface IServiceNameProps {
  selected: boolean;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 0 24px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';

  margin-top: 30px;
  margin-bottom: 20px;
`;

export const ClientsList = styled(FlatList as new () => FlatList<IClients>)`
  margin-top: 30px;
`;

export const ForeignButtonContainer = styled.TouchableHighlight`
  margin-bottom: 15px;
  padding: 20px 20px;
  border-radius: 10px;
  background: #ff9000;

  align-items: center;
`;

export const ForeignButtonText = styled.Text`
  color: #18171d;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
`;

export const ForeignInputContainer = styled.View`
  width: 100%;
  height: 55px;
  padding: 0 16px;

  border-radius: 10px;
  border-bottom-width: 1px;
  border-color: #f4ede8;

  flex-direction: row;
  align-items: center;
`;

export const ForeignIcon = styled(FeatherIcon)`
  margin-right: 16px;
`;

export const ForeignInput = styled.TextInput`
  flex: 1;
  height: 100%;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const ServicesList = styled(FlatList as new () => FlatList<IServices>)``;

export const ServiceContainer = styled(RectButton)<IServiceContainerProps>`
  padding: 12px 18px;
  background: ${props => (props.selected ? '#ff9000' : '#fff')};
  border-radius: 10px;
  margin-right: 12px;

  align-items: center;
`;

export const ServiceName = styled.Text<IServiceNameProps>`
  color: #18171d;
  font-family: 'RobotoSlab-Regular';
  font-weight: bold;
  font-size: 14px;
`;
