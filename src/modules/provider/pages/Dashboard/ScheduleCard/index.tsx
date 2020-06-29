import React, { useCallback } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  InfoContainer,
  ScheduleTimeText,
  ScheduleArrowLeftIcon,
  AppointmentContainer,
  AppointmentInfoContainer,
  AppointmentTimeText,
  AppointmentInfo,
  AppointmentInfoText,
  AppointmentInfoIcon,
} from './styles';

import { ISchedule } from '../index';

interface IScheduleCardProps {
  schedule: ISchedule;
}

const ScheduleCard: React.FC<IScheduleCardProps> = ({ schedule }) => {
  const navigation = useNavigation();

  const handleButtonClick = useCallback(() => {
    if (schedule.appointment) {
      navigation.navigate('AppointmentPage', {
        schedule,
      });
    } else {
      navigation.navigate('CreateAppointmentPage', {
        date: schedule.timeFormatted,
      });
    }
  }, [schedule, navigation]);

  return (
    <TouchableWithoutFeedback onPress={handleButtonClick}>
      <Container
        hasAppointment={!!schedule.appointment}
        available={schedule.available}
      >
        {!schedule.appointment && (
          <InfoContainer>
            <ScheduleTimeText>{schedule.time}</ScheduleTimeText>

            {!schedule.past && (
              <ScheduleArrowLeftIcon
                name="chevron-left"
                size={22}
                color="#000"
              />
            )}
          </InfoContainer>
        )}

        {schedule.appointment && (
          <AppointmentContainer>
            <AppointmentTimeText style={{ fontFamily: 'RobotoSlab-Medium' }}>
              {schedule.time}
            </AppointmentTimeText>

            <AppointmentInfoContainer
              style={{ alignItems: 'flex-start', flex: 2 }}
            >
              <AppointmentInfo>
                <AppointmentInfoIcon name="user" size={14} color="#000" />
                <AppointmentInfoText>
                  {schedule.appointment.user
                    ? schedule.appointment.user.name
                    : schedule.appointment.foreign_client_name}
                </AppointmentInfoText>
              </AppointmentInfo>

              <AppointmentInfo>
                <AppointmentInfoIcon name="scissors" size={14} color="#000" />
                <AppointmentInfoText>
                  {schedule.appointment.service}
                </AppointmentInfoText>
              </AppointmentInfo>

              <AppointmentInfo>
                <AppointmentInfoIcon
                  name="dollar-sign"
                  size={14}
                  color="#000"
                />
                <AppointmentInfoText>
                  R$ {schedule.appointment.price}
                </AppointmentInfoText>
              </AppointmentInfo>
            </AppointmentInfoContainer>

            {schedule.appointment.concluded ? (
              <Icon
                name="check-all"
                size={26}
                color="#000"
                style={{ marginRight: 30 }}
              />
            ) : (
              <Icon
                name="gesture-tap"
                size={26}
                color="#000"
                style={{ marginRight: 30 }}
              />
            )}
          </AppointmentContainer>
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default ScheduleCard;
