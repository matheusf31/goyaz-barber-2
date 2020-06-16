import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 55px;
  background: #ff9000;
  border-radius: 10px;

  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #252429;
  font-size: 16px;
`;
