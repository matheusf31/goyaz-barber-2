import React, { useMemo, useState, useCallback } from 'react';
import { Linking } from 'react-native';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/Feather';
import WppIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import defaultAvatar from '../../../../../shared/assets/defaultavatar.png';

import {
  Container,
  AppointmentCardContainer,
  Avatar,
  AppointmentInfoContainer,
  InfoContainer,
  CancelationInfo,
  ProviderName,
  GenericInfo,
  Cancel,
  Contact,
  ButtonsContainer,
  MessageButtonContainer,
  CancelAppointmentButtonContainer,
  CancelationCardContainer,
  TextCancelation,
  CancelButtonsContainer,
  CancelCancelation,
  ConfirmCancelation,
} from './styles';

import { IAppointments } from '../index';

interface IAppointmentCardProps {
  appointment: IAppointments;
  onCancelAppointment(): void;
}

const AppointmentCard: React.FC<IAppointmentCardProps> = ({
  appointment,
  onCancelAppointment,
}) => {
  const [confirm, setConfirm] = useState(false);

  const formatedDate = useMemo(() => {
    return format(
      parseISO(appointment.date),
      "dd 'de' MMMM',' cccc 'às' kk:mm",
      {
        locale: pt,
      },
    );
  }, [appointment.date]);

  const handleAppointmentCancel = useCallback(() => {
    onCancelAppointment();

    setConfirm(false);
  }, [onCancelAppointment]);

  return (
    <Container>
      {!confirm && (
        <>
          <AppointmentCardContainer>
            {appointment.provider.avatar_url ? (
              <Avatar
                source={{
                  uri: appointment.provider.avatar_url,
                }}
              />
            ) : (
              <Avatar source={defaultAvatar} />
            )}

            <AppointmentInfoContainer>
              <ProviderName>{appointment.provider.name}</ProviderName>

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
                  name="phone"
                  size={16}
                  color="#ff9000"
                  style={{ marginTop: 2 }}
                />
                <GenericInfo>{appointment.provider.phone}</GenericInfo>
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
            </AppointmentInfoContainer>
          </AppointmentCardContainer>

          <ButtonsContainer>
            <MessageButtonContainer>
              <Contact
                onPress={() => {
                  Linking.openURL(
                    `whatsapp://send?phone=55${appointment.provider.phone}`,
                  );
                }}
              >
                <WppIcon name="whatsapp" size={24} color="#fff" />
              </Contact>
            </MessageButtonContainer>

            <CancelAppointmentButtonContainer>
              <Cancel onPress={() => setConfirm(true)}>
                <Icon name="x-circle" size={24} color="#fff" />
              </Cancel>
            </CancelAppointmentButtonContainer>
          </ButtonsContainer>
        </>
      )}

      {confirm && (
        <CancelationCardContainer>
          <CancelationInfo>
            <TextCancelation>
              Deseja mesmo cancelar o agendamento?
            </TextCancelation>
          </CancelationInfo>

          <CancelButtonsContainer>
            <CancelCancelation onPress={() => setConfirm(false)}>
              <Icon name="x" size={25} color="#f64c75" />
            </CancelCancelation>

            <ConfirmCancelation onPress={handleAppointmentCancel}>
              <Icon name="check" size={25} color="#54F64C" />
            </ConfirmCancelation>
          </CancelButtonsContainer>
        </CancelationCardContainer>
      )}
    </Container>
  );
};

export default AppointmentCard;
