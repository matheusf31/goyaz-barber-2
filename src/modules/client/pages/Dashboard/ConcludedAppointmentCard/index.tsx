import React, { useMemo } from 'react';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  AppointmentCardContainer,
  InfoContainer,
  ProviderName,
  GenericInfo,
} from './styles';

import { IAppointments } from '../index';

interface IConcludedAppointmentCardProps {
  appointment: IAppointments;
}

const ConcludedAppointmentCard: React.FC<IConcludedAppointmentCardProps> = ({
  appointment,
}) => {
  const formatedDate = useMemo(() => {
    return format(
      parseISO(appointment.date),
      "dd 'de' MMMM',' cccc 'às' kk:mm",
      {
        locale: pt,
      },
    );
  }, [appointment.date]);

  return (
    <Container>
      <AppointmentCardContainer>
        <InfoContainer>
          <Icon
            name="user"
            size={16}
            color="#ff9000"
            style={{ marginTop: 2 }}
          />
          <ProviderName>{appointment.provider.name}</ProviderName>
        </InfoContainer>

        <InfoContainer>
          <Icon
            name="clock"
            size={16}
            color="#ff9000"
            style={{ marginTop: 2 }}
          />
          <GenericInfo>{`${formatedDate}`}</GenericInfo>
        </InfoContainer>

        <InfoContainer>
          <Icon
            name="dollar-sign"
            size={16}
            color="#ff9000"
            style={{ marginTop: 2 }}
          />
          <GenericInfo>R$ {appointment.price}</GenericInfo>
        </InfoContainer>

        <InfoContainer>
          <Icon
            name="scissors"
            size={16}
            color="#ff9000"
            style={{ marginTop: 2 }}
          />
          <GenericInfo>
            {appointment.service.charAt(0).toUpperCase() +
              appointment.service.slice(1)}
          </GenericInfo>
        </InfoContainer>
      </AppointmentCardContainer>
    </Container>
  );
};

export default ConcludedAppointmentCard;
