import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 20px;
`;

export const AppointmentCardContainer = styled.View`
  margin: 0 16px 0px 42px;
  padding: 14px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: #18171d;

  align-items: center;
`;

export const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

export const AppointmentInfoContainer = styled.View``;

export const InfoContainer = styled.View`
  flex-direction: row;
  margin-bottom: 15px;

  align-items: center;
`;

export const ProviderName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-weight: bold;
  font-size: 18px;
  color: #fff;
  margin: 10px 0 20px;
  align-self: center;
`;

export const GenericInfo = styled.Text`
  color: #fff;
  font-size: 14px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 10px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  margin: 0 16px 0px 42px;
`;

export const MessageButtonContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #3bbc39;
  border-bottom-left-radius: 10px;

  height: 40px;
`;

export const CancelAppointmentButtonContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #bc3939;
  border-bottom-right-radius: 10px;
`;

export const Cancel = styled.TouchableOpacity``;

export const Contact = styled.TouchableOpacity`
  margin-right: 5px;
`;

export const CancelationCardContainer = styled.View`
  margin: 0 16px 0px 36px;
  padding: 20px 20px;
  background: #18171d;
  border-radius: 10px;

  align-items: center;
  justify-content: space-around;
`;

export const CancelationInfo = styled.View`
  padding: 20px 0;
`;

export const TextCancelation = styled.Text`
  align-self: center;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
  font-family: 'RobotoSlab-Regular';
`;

export const CancelButtonsContainer = styled.View`
  flex-direction: row;
`;

export const CancelCancelation = styled.TouchableOpacity`
  margin-right: 10px;
`;

export const ConfirmCancelation = styled.TouchableOpacity``;
