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

/** Appointment */
export const AppointmentContainer = styled.View`
  flex-direction: row;

  justify-content: space-around;
  align-items: center;
`;

export const AppointmentTimeContainer = styled.View`
  flex: 1;
  align-items: center;
`;

export const AppointmentTimeText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 14px;
`;

export const AppointmentInfoContainer = styled.View`
  flex: 1.4;
`;

export const AppointmentInfo = styled.View`
  flex-direction: row;
  padding: 2px 0;
`;

export const AppointmentInfoText = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-family: 'RobotoSlab-Regular';
  font-size: 14px;
  margin-left: 10px;
`;

export const AppointmentInfoIcon = styled(FeatherIcon)`
  margin-top: 2px;
`;

export const AppointmentIconContainer = styled.View`
  flex: 1;
  align-items: center;
`;
