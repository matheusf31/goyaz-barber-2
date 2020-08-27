import styled from 'styled-components/native';

export const AppointmentContainer = styled.View`
  border-radius: 10px;

  background: #f4f4f4;
`;

export const AppointmentContainerInfo = styled.View`
  flex-direction: row;
  align-items: center;

  margin-left: 30px;
`;

export const Avatar = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

export const AppointmentContainerDetails = styled.View`
  flex: 1;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const DetailsContainer = styled.View`
  flex-direction: row;
  align-items: center;

  padding: 5px 5px;
`;

export const DetailsText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #17181d;
  margin-left: 10px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  margin-top: 20px;
  height: 40px;
`;

export const ConcludeAppointmentButton = styled.TouchableHighlight.attrs({
  underlayColor: 'green',
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #3bbc39;
  border-bottom-right-radius: 10px;
`;

export const CancelAppointmentButton = styled.TouchableHighlight.attrs({
  underlayColor: '#6F2323',
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #bc3939;
  border-bottom-left-radius: 10px;
`;

export const NonConcludedButton = styled.TouchableHighlight.attrs({
  underlayColor: 'green',
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #3bbc39;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #17181d;
`;

export const ConfirmInfo = styled.View`
  padding: 20px 0;
`;

export const ConfirmText = styled.Text`
  align-self: center;
  font-weight: bold;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const ConfirmButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const ConcludeConfirm = styled.TouchableOpacity`
  margin: 0 10px 10px 10px;
`;
