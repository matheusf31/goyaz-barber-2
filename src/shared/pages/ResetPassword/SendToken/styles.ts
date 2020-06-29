import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';

import Button from '../../../components/Button';

export const BackButton = styled.TouchableOpacity`
  margin: 60px 30px 0;

  ${Platform.OS === 'android' &&
  css`
    margin: 30px 20px 0;
  `}
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  margin: 20px 30px;
`;

export const Title = styled.Text`
  align-self: flex-start;
  color: #fff;
  font-family: 'RobotoSlab-Regular';
  font-weight: bold;
  font-size: 24px;
  margin: 24px 0 44px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
`;

export const ResetButton = styled.TouchableOpacity`
  margin-top: 20px;
  margin-bottom: -20px;
  /* border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.5); */
`;

export const ResetText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
`;
