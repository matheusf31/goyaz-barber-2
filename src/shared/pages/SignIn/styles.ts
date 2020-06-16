import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding: 0 30px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #fff;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
  margin-bottom: 24px;

  /* border-bottom-width: 1px;
  border-bottom-color: #f4ede8; */
`;

export const ForgotPasswordText = styled.Text`
  /* color: #f4ede8; */
  color: #f4ede8;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  margin-bottom: 90px;

  flex-direction: row;
  align-self: center;
`;

export const CreateAccountText = styled.Text`
  /* color: #f4ede8; */
  color: #f4ede8;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';

  margin-left: 10px;
`;
