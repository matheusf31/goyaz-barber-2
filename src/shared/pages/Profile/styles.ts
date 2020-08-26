import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;

  margin: 40px 30px 140px 30px;
`;

export const UserAvatarButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  align-self: center;
`;

export const Title = styled.Text`
  font-size: 26px;
  color: #fff;
  font-family: 'RobotoSlab-Medium';
  margin: 34px 0 24px;
`;
