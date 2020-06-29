import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface IServiceContainerProps {
  selected: boolean;
}

interface IServiceNameProps {
  selected: boolean;
}

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
  color: #18171d;
  font-family: 'RobotoSlab-Regular';
  font-size: 14px;
  margin-left: 5px;
`;
