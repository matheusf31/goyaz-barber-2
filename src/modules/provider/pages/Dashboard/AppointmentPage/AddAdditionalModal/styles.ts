import styled from 'styled-components/native';

export const ModalViewBox = styled.View`
  background: #fff;
  align-self: center;
  width: 90%;
  margin-top: -30%;

  border-radius: 10px;
  padding: 20px 30px;
`;

export const ModalHeader = styled.View`
  align-items: center;
  justify-content: center;
`;

export const ModalText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 22px;
  color: #17181d;
`;

export const ModalForm = styled.View`
  margin-top: 20px;
`;

export const ModalInputContainer = styled.View`
  height: 40px;

  border-radius: 1px;
  border-bottom-width: 1px;
  border-bottom-color: #17181d;

  margin: 10px 0 5px;

  flex-direction: row;
  align-items: center;
`;

export const ModalInput = styled.TextInput`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #17181d;
  font-family: 'RobotoSlab-Regular';
`;

export const ModalButton = styled.TouchableOpacity`
  height: 50px;
  margin-top: 30px;

  border-radius: 10px;
  background: #8fd684;

  align-items: center;
  justify-content: center;
`;

export const ModalButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #17181d;
  font-family: 'RobotoSlab-Medium';
`;
