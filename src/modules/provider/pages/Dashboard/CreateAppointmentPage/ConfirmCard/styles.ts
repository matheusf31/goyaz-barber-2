import styled from 'styled-components/native';

export const ConfirmContainer = styled.View`
  border-radius: 10px;

  background: #f4f4f4;
`;

export const ConfirmContainerInfo = styled.View`
  flex-direction: row;
  align-items: center;

  margin-left: 30px;
`;

export const Avatar = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

export const ConfirmContainerDetails = styled.View`
  flex: 1;
  margin-left: 20px;
  margin-top: 10px;
`;

export const DetailsContainer = styled.View`
  flex-direction: row;
  align-items: center;

  padding: 5px 15px;
`;

export const DetailsText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #18171d;
  margin-left: 10px;
`;

export const CreateAppointmentButton = styled.TouchableHighlight`
  height: 46px;
  background: #ff9000;

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const CreateAppointmentButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #18171d;
  font-size: 16px;
`;
