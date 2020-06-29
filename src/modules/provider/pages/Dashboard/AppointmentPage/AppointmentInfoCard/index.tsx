import React, { useState, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { format, parseISO, formatRelative, differenceInDays } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../../../../../shared/services/api';

import defaultAvatar from '../../../../../../shared/assets/defaultavatar.png';

import {
  AppointmentContainer,
  AppointmentContainerInfo,
  Avatar,
  AppointmentContainerDetails,
  DetailsContainer,
  DetailsText,
  ButtonsContainer,
  ConcludeAppointmentButton,
  CancelAppointmentButton,
  NonConcludedButton,
  ButtonText,
  ConfirmInfo,
  ConfirmText,
  ConfirmButtonsContainer,
  ConcludeConfirm,
} from './styles';

import { IAppointment } from '../../index';

interface IAppointmentCardProps {
  appointment: IAppointment;
  onAppointmentUpdate: React.Dispatch<React.SetStateAction<IAppointment>>;
}

const AppointmentInfoCard: React.FC<IAppointmentCardProps> = ({
  appointment,
  onAppointmentUpdate,
}) => {
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [confirmConclude, setConfirmConclude] = useState(false);
  const [confirmNonConclude, setConfirmNonConclude] = useState(false);

  const navigation = useNavigation();

  const handleCancelAppointment = useCallback(async () => {
    await api.delete(`appointments/provider/delete/${appointment.id}`);

    navigation.navigate('Dashboard');
  }, [appointment.id, navigation]);

  const handleConcludeAppointment = useCallback(async () => {
    try {
      const response = await api.patch(
        `appointments/provider/conclude/${appointment.id}`,
        {
          concluded: !appointment.concluded,
        },
      );

      onAppointmentUpdate(response.data);
    } catch (err) {
      Alert.alert('Erro ao concluir o agendamento.', err.response.data.message);
    } finally {
      setConfirmConclude(false);
      setConfirmNonConclude(false);
    }
  }, [appointment.concluded, appointment.id, onAppointmentUpdate]);

  const formatedDate = useMemo(() => {
    const parsedDate = parseISO(appointment.date);

    if (differenceInDays(parsedDate, new Date()) >= 6) {
      const dateFormated = formatRelative(parsedDate, new Date(), {
        locale: pt,
      });

      return `${dateFormated} às ${format(parsedDate, 'kk:mm')}`;
    }

    return formatRelative(parsedDate, new Date(), {
      locale: pt,
    });
  }, [appointment.date]);

  return (
    <AppointmentContainer>
      {!confirmCancel && !confirmConclude && !confirmNonConclude && (
        <>
          <AppointmentContainerInfo>
            {appointment.user && appointment.user.avatar_url ? (
              <Avatar
                source={{
                  uri: appointment.user.avatar_url,
                }}
              />
            ) : (
              <Avatar source={defaultAvatar} />
            )}

            <AppointmentContainerDetails>
              <DetailsContainer>
                <Icon
                  name="user"
                  size={18}
                  color="#ff9000"
                  style={{ marginTop: 2 }}
                />
                <DetailsText>
                  {appointment.user
                    ? appointment.user.name
                    : appointment.foreign_client_name}
                </DetailsText>
              </DetailsContainer>

              <DetailsContainer>
                <Icon
                  name="scissors"
                  size={18}
                  color="#ff9000"
                  style={{ marginTop: 2 }}
                />
                <DetailsText>
                  {appointment.service.charAt(0).toUpperCase() +
                    appointment.service.slice(1)}
                </DetailsText>
              </DetailsContainer>

              <DetailsContainer>
                <Icon
                  name="clock"
                  size={18}
                  color="#ff9000"
                  style={{ marginTop: 2 }}
                />
                <DetailsText>{formatedDate}</DetailsText>
              </DetailsContainer>
            </AppointmentContainerDetails>
          </AppointmentContainerInfo>

          <ButtonsContainer>
            {appointment.concluded && (
              <NonConcludedButton onPress={() => setConfirmNonConclude(true)}>
                <ButtonText>Marcar como não concluído</ButtonText>
              </NonConcludedButton>
            )}

            {!appointment.concluded && (
              <>
                <CancelAppointmentButton onPress={() => setConfirmCancel(true)}>
                  <ButtonText>Cancelar</ButtonText>
                </CancelAppointmentButton>

                <ConcludeAppointmentButton
                  onPress={() => setConfirmConclude(true)}
                >
                  <ButtonText>Concluir</ButtonText>
                </ConcludeAppointmentButton>
              </>
            )}
          </ButtonsContainer>
        </>
      )}

      {confirmCancel && (
        <>
          <ConfirmInfo>
            <ConfirmText>Deseja mesmo cancelar o agendamento?</ConfirmText>
          </ConfirmInfo>

          <ConfirmButtonsContainer>
            <ConcludeConfirm onPress={() => setConfirmCancel(false)}>
              <Icon name="x" size={30} color="#f64c75" />
            </ConcludeConfirm>

            <ConcludeConfirm onPress={() => handleCancelAppointment()}>
              <Icon name="check" size={30} color="#3bbc39" />
            </ConcludeConfirm>
          </ConfirmButtonsContainer>
        </>
      )}

      {confirmConclude && (
        <>
          <ConfirmInfo>
            <ConfirmText>Deseja mesmo concluir o agendamento?</ConfirmText>
          </ConfirmInfo>

          <ConfirmButtonsContainer>
            <ConcludeConfirm onPress={() => setConfirmConclude(false)}>
              <Icon name="x" size={30} color="#f64c75" />
            </ConcludeConfirm>

            <ConcludeConfirm onPress={() => handleConcludeAppointment()}>
              <Icon name="check" size={30} color="#3bbc39" />
            </ConcludeConfirm>
          </ConfirmButtonsContainer>
        </>
      )}

      {confirmNonConclude && (
        <>
          <ConfirmInfo>
            <ConfirmText>Deseja mesmo marcar como não concluído?</ConfirmText>
          </ConfirmInfo>

          <ConfirmButtonsContainer>
            <ConcludeConfirm onPress={() => setConfirmNonConclude(false)}>
              <Icon name="x" size={30} color="#f64c75" />
            </ConcludeConfirm>

            <ConcludeConfirm onPress={() => handleConcludeAppointment()}>
              <Icon name="check" size={30} color="#3bbc39" />
            </ConcludeConfirm>
          </ConfirmButtonsContainer>
        </>
      )}
    </AppointmentContainer>
  );
};

export default AppointmentInfoCard;
