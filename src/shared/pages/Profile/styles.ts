import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  margin-bottom: 120px;

  margin-top: ${Platform.OS === 'ios' ? 80 : 20}px;

  padding: 0 30px;
`;

export const UserAvatarButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  align-self: center;
`;

export const Title = styled.Text`
  font-size: 22px;
  color: #fff;
  font-family: 'RobotoSlab-Medium';
  margin: 34px 0 24px;
`;
