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
  margin: 20px 24px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 26px;
  font-family: 'RobotoSlab-Medium';

  margin: 30px 0 20px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 10px;
`;
