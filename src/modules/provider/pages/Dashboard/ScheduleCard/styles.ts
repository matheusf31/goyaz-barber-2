import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface IContainerProps {
  hasAppointment: boolean;
  available: boolean;
}

export const Container = styled.View<IContainerProps>`
  background: #fff;
  height: 80px;
  margin: 5px 0;
  border-radius: 10px;

  ${props => {
    if (props.hasAppointment) {
      return css`
        background: #3bbc39;
      `;
    }

    if (!props.available) {
      return css`
        opacity: 0.6;
      `;
    }

    return css``;
  }}

  align-items: center;
  justify-content: center;
`;

export const InfoContainer = styled.View`
  flex-direction: row;

  width: 100%;
  justify-content: center;
  align-items: center;
  /* background: red; */
`;

export const ScheduleTimeText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;

  /* color: #fff; */
`;

export const ScheduleArrowLeftIcon = styled(FeatherIcon)`
  position: absolute;
  right: 10px;
`;

export const AppointmentContainer = styled.View`
  flex-direction: row;

  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

export const AppointmentInfoContainer = styled.View`
  flex: 1;
  margin-left: 100px;
`;

export const AppointmentInfo = styled.View`
  flex-direction: row;
  padding: 2px 0;
`;

export const AppointmentInfoText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 14px;
  margin-left: 10px;

  /* color: #fff; */
`;

export const AppointmentTimeText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 14px;
  margin-left: 40px;

  /* color: #fff; */
`;

export const AppointmentInfoIcon = styled(FeatherIcon)`
  margin-top: 2px;
`;
